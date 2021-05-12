import {
  APIGatewayProxyResult,
  APIGatewayProxyWithCognitoAuthorizerEvent,
  Context
} from 'aws-lambda';
import { Handler, Request } from 'express';

type LambdaHandler = (
  event: APIGatewayProxyWithCognitoAuthorizerEvent,
  context: Context
) => Promise<APIGatewayProxyResult>;

interface WrapperOptions {
  functionName?: string;
  defaultHeaders?: {
    [header: string]: string | number | boolean;
  };
}

function buildRequestHeaders(_headers: Request['headers']) {
  const headers: APIGatewayProxyWithCognitoAuthorizerEvent['headers'] = {};
  for (const [name, value] of Object.entries(_headers)) {
    headers[name] = Array.isArray(value) ? value.join(' ') : value;
  }
  return headers;
}

function buildQueryString(query: Request['query']) {
  const params: APIGatewayProxyWithCognitoAuthorizerEvent['queryStringParameters'] = {};
  for (const [key, value] of Object.entries(query)) {
    params[key] = Array.isArray(value) ? value.join(' ') : `${value}`;
  }
  return params;
}

function buildResponseHeaders({
  response,
  options
}: {
  response: APIGatewayProxyResult;
  options?: WrapperOptions;
}) {
  const headers = new Map(Object.entries(options?.defaultHeaders ?? {}));
  if (response.headers) {
    for (const [name, value] of Object.entries(response.headers)) {
      if (!headers.has(name)) {
        headers.set(name, value);
        continue;
      }
      const existing = headers.get(name);
      headers.set(name, `${existing} ${value}`);
    }
  }
  if (response.multiValueHeaders) {
    for (const [name, value] of Object.entries(response.multiValueHeaders)) {
      if (!headers.has(name)) {
        headers.set(name, value.join(' '));
        continue;
      }
      const existing = headers.get(name);
      headers.set(name, `${existing} ${value.join(' ')}`);
    }
  }
  return headers;
}

export function wrapLambda(handler: LambdaHandler, options?: WrapperOptions): Handler {
  return async (req, res, next) => {
    const event = {
      body: req.body,
      httpMethod: req.method,
      headers: buildRequestHeaders(req.headers),
      path: req.path,
      pathParameters: req.params,
      queryStringParameters: buildQueryString(req.query)
    } as APIGatewayProxyWithCognitoAuthorizerEvent;

    const context = {
      awsRequestId: 'express',
      callbackWaitsForEmptyEventLoop: true,
      functionName: options?.functionName ?? 'express',
      functionVersion: '1',
      getRemainingTimeInMillis: () => 42,
      invokedFunctionArn: 'arn',
      logGroupName: 'log-group-name',
      logStreamName: 'log-stream-name',
      memoryLimitInMB: '128'
    } as Context;

    try {
      const response = await handler(event, context);
      res.status(response.statusCode);

      const headers = buildResponseHeaders({ response, options });
      for (const [name, value] of headers.entries()) {
        res.setHeader(name, `${value}`);
      }

      if (response.body) {
        res.send(response.body);
      }
      return res.end();
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };
}