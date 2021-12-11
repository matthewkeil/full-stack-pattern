---
slug: advanced-cdk-debugging
title: Advanced CDK Debugging
authors:
  name: Matthew Keil
  title: Advanced CDK Debugging
  url: https://github.com/matthewkeil
  image_url: https://avatars.githubusercontent.com/u/18608739?v=4
tags: [aws, cdk, debugging]
---

```bash
/Users/ninjaDevYo/Documents/best-client/fancy-project/node_modules/@aws-cdk/core/lib/private/resolve.ts:163
      throw new Error('Found an encoded list token string in a scalar string context. Use \'Fn.select(0, list)\' (not \'list[0]\') to extract elements from token lists.');
            ^
Error: Found an encoded list token string in a scalar string context. Use 'Fn.select(0, list)' (not 'list[0]') to extract elements from token lists.
```

```typescript
new CfnOutput(this, 'NameServers', {
  value: this.hostedZone.hostedZoneNameServers.join(', ') ?? 'private hosted zone'
});
```

```typescript
new CfnOutput(this, 'NameServers', {
  value: this.hostedZone.hostedZoneNameServers
    ? Fn.join(', ', this.hostedZone.hostedZoneNameServers)
    : 'private hosted zone'
});
```
