export const httpMethods = ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'] as const;
export type HttpMethod = typeof httpMethods[number];
export function isHttpMethod(value: unknown): value is HttpMethod {
  return typeof value === 'string' && httpMethods.includes(value.toUpperCase() as HttpMethod);
}
