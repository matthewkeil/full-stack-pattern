---
sidebar_position: 2
---

# CognitoStack

For information on using the CognitoStack see the [CognitoConstruct](/docs/cognito/cognitoConstruct) documentation. They are essentially the same but the Construct is wrapped with a Stack for convenience.

## CognitoStackProps

```typescript
export interface CognitoStackProps extends StackProps, CognitoConstructProps {}
```

## Usage Example

```typescript
import { CognitoStack } from 'full-stack-pattern';

class BigStack extends Construct {
  constructor(scope: Construct, id: string, props: BigStackProps) {
    super(scope, id, props);

    new CognitoStack(this, 'Cognito', {
      /* see CognitoConstruct docs */
    });
  }
}
```
