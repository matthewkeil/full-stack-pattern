---
sidebar_position: 3
---

# CDNNestedStack

For information on using the CDNNestedStack see the [CDNConstruct](/docs/cdn/cdnConstruct) documentation. They are essentially the same but the Construct is wrapped with a NestedStack for convenience.

## CDNNestedStackProps

```typescript
export interface CDNNestedStackProps
  extends Omit<NestedStackProps, 'removalPolicy' | 'timeout'>,
    CDNConstructProps {
  stackTimeout?: Duration;
}
```

## Usage Example

```typescript
import { CDNNestedStack } from 'full-stack-pattern';

class BigStack extends Stack {
  constructor(scope: Construct, id: string, props: BigStackProps) {
    super(scope, id, props);

    new CDNNestedStack(this, 'CDN', {
      /* see CDNConstruct docs */
    });
  }
}
```
