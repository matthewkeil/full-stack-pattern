---
sidebar_position: 3
---

# CognitoNestedStack

For information on using the CognitoNestedStack see the [CognitoConstruct](/docs/cognito/cognitoConstruct) documentation. They are essentially the same but the Construct is wrapped with a NestedStack for convenience.

## CognitoNestedStackProps

```typescript
export interface CognitoNestedStackProps
  extends Omit<NestedStackProps, 'removalPolicy' | 'timeout'>,
    CognitoConstructProps {
  stackTimeout?: Duration;
}
```

## Usage Example

```typescript
import { CognitoNestedStack } from 'full-stack-pattern';

class BigStack extends Stack {
  constructor(scope: Construct, id: string, props: BigStackProps) {
    super(scope, id, props);

    new CognitoNestedStack(this, 'Cognito', {
      /* see CognitoConstruct docs */
    });
  }
}
```
