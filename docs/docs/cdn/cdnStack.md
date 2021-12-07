---
sidebar_position: 2
---

# CDNStack

For information on using the CDNStack see the [CDNConstruct](/docs/cdn/cdnConstruct) documentation. They are essentially the same but the Construct is wrapped with a Stack for convenience.

## CDNStackProps

```typescript
export interface CDNStackProps extends StackProps, CDNConstructProps {}
```

## Usage Example

```typescript
import { CDNStack } from 'full-stack-pattern';

class BigStack extends Construct {
  constructor(scope: Construct, id: string, props: BigStackProps) {
    super(scope, id, props);

    new CDNStack(this, 'CDN', {
      /* see CDNConstruct docs */
    });
  }
}
```
