---
sidebar_position: 3
---

# ServerlessNestedStack

For information on using the ServerlessNestedStack see the [ServerlessConstruct](/docs/serverless/serverlessConstruct) documentation. They are essentially the same but the Construct is wrapped with a NestedStack for convenience.

## ServerlessNestedStackProps

```typescript
export interface ServerlessNestedStackProps
  extends Omit<NestedStackProps, 'removalPolicy' | 'timeout'>,
    ServerlessConstructProps {
  stackTimeout?: Duration;
}
```

## Usage Example

```typescript
import { ServerlessNestedStack } from 'full-stack-pattern';

class BigStack extends Stack {
  constructor(scope: Construct, id: string, props: BigStackProps) {
    super(scope, id, props);

    new ServerlessNestedStack(this, 'Serverless', {
      /* see ServerlessConstruct docs */
    });
  }
}
```
