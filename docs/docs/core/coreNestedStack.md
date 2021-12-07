---
sidebar_position: 3
---

# CoreNestedStack

For information on using the CoreNestedStack see the [CoreConstruct](/docs/core/coreConstruct) documentation. They are essentially the same but the Construct is wrapped with a NestedStack for convenience.

## CoreNestedStackProps

```typescript
export interface CoreNestedStackProps
  extends Omit<NestedStackProps, 'removalPolicy' | 'timeout'>,
    CoreConstructProps {
  stackTimeout?: Duration;
}
```

## Usage Example

```typescript
import { CoreNestedStack } from 'full-stack-pattern';

class BigStack extends Stack {
  constructor(scope: Construct, id: string, props: BigStackProps) {
    super(scope, id, props);

    new CoreNestedStack(this, 'Core', {
      /* see CoreConstruct docs */
    });
  }
}
```
