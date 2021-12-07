---
sidebar_position: 2
---

# CoreStack

For information on using the CoreStack see the [CoreConstruct](/docs/core/coreConstruct) documentation. They are essentially the same but the Construct is wrapped with a Stack for convenience.

## CoreStackProps

```typescript
export interface CoreStackProps extends StackProps, CoreConstructProps {}
```

## Usage Example

```typescript
import { CoreStack } from 'full-stack-pattern';

class BigStack extends Construct {
  constructor(scope: Construct, id: string, props: BigStackProps) {
    super(scope, id, props);

    new CoreStack(this, 'Core', {
      /* see CoreConstruct docs */
    });
  }
}
```
