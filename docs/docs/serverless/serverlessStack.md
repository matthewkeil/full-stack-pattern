---
sidebar_position: 2
---

# ServerlessStack

For information on using the ServerlessStack see the [ServerlessConstruct](/docs/serverless/serverlessConstruct) documentation. They are essentially the same but the Construct is wrapped with a Stack for convenience.

## ServerlessStackProps

```typescript
export interface ServerlessStackProps extends StackProps, ServerlessConstructProps {}
```

## Usage Example

```typescript
import { ServerlessStack } from 'full-stack-pattern';

class BigStack extends Construct {
  constructor(scope: Construct, id: string, props: BigStackProps) {
    super(scope, id, props);

    new ServerlessStack(this, 'Serverless', {
      /* see ServerlessConstruct docs */
    });
  }
}
```
