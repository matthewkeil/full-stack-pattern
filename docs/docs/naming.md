---
sidebar_position: 2
---

# Naming

I will start by saying that this is more of a "using aws" discussion than a how-to. However, most of the constructs in this library make use of a `prefix` parameter and this is a discussion about when/why/how to use it.

Naming is a hotly contested topic but one of critical importance. There are a couple big picture goals that this process will attempt to help with.

1. Resource naming collisions
2. Upgradability of resources through iterations of development
3. Searchability/Findability of resources when working in the console

None of these topics is "easy" and we will discuss how we can leverage cdk to help enforce those requirements are both met and easy to manage. For the rest of this page of instructions, assume the following variables are defined in your cdk app file. In many instances I use an external configuration file to hold branch specific configuration values and I append these to the config object.

```typescript
/**
 * NOTE: Resource names for many things (lambda/role names) are limited to 64 characters
 */

/**
 * Best Client is your client so shorten to 'bc'. Often there will only be one
 * client's work in an account but if you do dev work in a team/personal account
 * this is helpful to keep clients resources isolated and to avoid naming
 * collisions when deploying the same stack for multiple clients
 */
const client = 'bc';

/**
 * shortening project names too much can cause confusion for large clients so
 * keep them brief. Try to avoid acronyms though as they can be confusing when
 * working in the console
 */
const project = 'some-project';

/**
 * this should be the branch name that you are working on. if your branch names
 * are very very long you may want to shorten
 */
const stage = 'fancy-feature';
```

## Resource Names (ie. Physical Id's)

Let the battle royale begin. Naming is an opinionated art by definition. Opinions abound, and be damned (not really... please speak up if you want to contribute to our shared knowledge). I take a different tack from the 'best practices' espoused by the CDK team. They recommend not using any names! They auto generate everything for you but there are a number of issues that come up with this when using the cdk in the real world, for real clients, in real production.

#### Why not let cdk name the resources for you?

It is possibler to let cdk generate physical resource names, but they are usually not very human readable. They build them using the cdk path of the resource being created. They are great from a computer perspective but when building projects for clients there tend to be a lot of puzzled looks when they are trying to debug their systems' after you have turned over the keys. By keeping names obvious it allows people to more easily find what they are looking for. They cdk also defaults to PascalCase for names and I tend to find this difficult to read when looking at a list of 100 resources. I find that kebab-case is easier when looking for resources in the console. The word breaks tend to jump off the page a bit easier which makes reading the name, and thus the function of the resource, easier.

#### Considerations

Too long and they are a pain to read. They will also eventually hit a length limit.

Too short and naming collisions and confused faces will be common. No one wants to waste time deploying a stack only to realize that an existing role has the same name as one you are trying to build. And que the 5-10+ minute cloudformation development cycle, only to mash the deploy command again. No bueno.

#### The `prefix`

This is where the `prefix` comes in. It's something I cooked up over my years working in the cloud and its incredibly handy. I had a few clients I was working for and I developed out of my personal account. I also had a couple of personal projects that were progressing on the side. Each of those had a few active branches. This led to lots of stuff being in the account. Having a handy way to find everything is wonderful but better yet, by sticking to the system, no more naming collisions. Creating a branch created a new stack, with a different name, and differently name resources inside. Automagically.

I created the prefix in the shell deploy script (this was before cdk and TS everything) and used it like `aws cloudformation create-stack --stack-name $PREFIX --parameter-overrides Prefix=$PREFIX`. I then `!Join`'d the `!Ref` in every resource name in the cloudformation template.

```yaml
Parameters:
  Prefix:
    Type: String
Resources:
  PutDynamoStuff:
    Type: AWS::Lambda::Function
    Properties:
      FunctionName: !Join ['-', [!Ref Prefix, 'put-dynamo-stuff']]
```

Easy solution.

Today with TS all the things, you can just include the line below, if its not already in your cdk project, and make your life easier.

```typescript
const prefix = `${client}-${project}-${stage}`;
```

Then pass the prefix into your constructs.

```typescript
import { Lambda, toPascal } from 'full-stack-pattern';

const prefix = `${client}-${project}-${stage}`;

const lambda = new Lambda(this, 'PutDynamoStuff', {
  prefix,
  name: 'put-dynamo-stuff'
});
```

When synthesized you will end up with a template that contains the excerpt below.

```yaml
Resources:
  BcSomeProjectFancyFeaturePutDynamoStuffFunction:
    Type: AWS::Lambda::Function
    Properties:
      FunctionName: bc-some-project-fancy-feature-put-dynamo-stuff
      # other props...
  BcSomeProjectFancyFeaturePutDynamoStuffRole:
    Type: AWS::IAM::Role
    Properties:
      RoleName: bc-some-project-fancy-feature-put-dynamo-stuff
      # other props...
  BcSomeProjectFancyFeaturePutDynamoStuffPolicy:
    Type: AWS::IAM::Role
    Properties:
      PolicyName: bc-some-project-fancy-feature-put-dynamo-stuff
      # other props...
```

## CloudFormation Resource Names (ie. Logical Id's)

This is the less difficult part of the process as it mostly affects the generated templates and cloud assembly. Generally these will be obfuscated away and will not be important. You will only need to know them when debugging templates or resource issues (resources getting replaced not updated, etc).

In the example below, note the resource name, physical id, and logical id. Pay attention to how the construct translates into the template snippet.

```typescript
import { App, Stack, StackProps } from '@aws-cdk/core';
import { Lambda, toPascal, toKebab } from 'full-stack-pattern';
import { getAppConfig } from './getAppConfig';

const { client, project, stage } = getAppConfig();
const prefix = `${client}-${project}-${stage}`;

class ProjectStack extends Stack {
  constructor(scope: cdk.Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const resourceName = 'get-dynamo-record';
    const lambda = new Lambda(this, toPascal(resourceName), {
      name: resourceName,
      prefix,
      dontOverrideLogicalId: true
    });
  }
}

const app = new `App`();
new ProjectStack(app, 'ProjectStack', {});
```

```yaml
Resources:
  ProjectStackLambdaGetDynamoRecordLambda953CA2B5:
    Type: AWS::Lambda::Function
    Properties:
      FunctionName: bc-some-project-fancy-feature-get-dynamo-record
```

Notice how the construct names get concatenated together to create the logical id. In most situations this is not an issue and can actually serve to make life easier. For novices, cdk makes it easy to avoid template naming issues by ensuring that the resources all have unique logical id's. What I've found in practice is that this can be very problematic with application updates and rewriting of cdk constructs. When refactoring constructs, the path through the resource tree can change as the cdk constructs evolve. Once you start getting constructs nested within constructs, as a well organized cdk project should, the logical id's will change as the construct nesting changes.

Because the logical id is build from the tree of resources, if you decide to change how your cdk code is structured, the logical ids change which leads to resource replacement instead of updates. This is very, very, very (three very's) bad for stateful resource like databases...

As an example we had a construct in production for a number of clients. We added features to the construct and as the code base grew we decided to refactor the code into a few constructs that worked together in a nested hierarchy. Because the tree of constructs changed, so did the logical id and cloudformation thought we were attempting to create a new resource, not update the existing one. This caused all sorts of headaches. For lambdas its not so critical as they are stateless, but for cognito user pools and dynamo tables, this is a mission critical issue.

The other major caveat is for long-running application development. At time of writing this, I work for a professional services firm and we deploy an application as part of our package. Over the years it has be deployed with raw cloudformation and was then upgraded to SAM, which is essentially just fancy cloudformation. When upgrading the application in place we needed to match the existing logicalId's for critical resources so that when we updated the stack, cloudformation does not attempt to delete/recreate the dynamo tables (never drop a table in prod!!) or userPools (breaking sso and deleting users).

As a default this library will attempt to generate the logicalId's for resources. This override can be disabled. In the example above, the `dontOverrideLogicalId` property was set to `true` which allows the cdk generated logicalId. This option is available for all constructs in this library.

It is also possible to override the logicalId with whatever value you would like, for applicable constructs. This is particularly important for things like dynamo, where you created a table with SAM or native cloudformation, and want to upgrade the deployment to use cdk. Check these docs to see which resources allow this to be passed in so they match the existing resource.

In the example below we used the same construct from above, but without `dontOverrideLogicalId` (ie as `undefined`) and note the difference in the cloudformation output.

```yaml
Resources:
  BcSomeProjectFancyFeatureGetDynamoRecordFunction:
    Type: AWS::Lambda::Function
    Properties:
      FunctionName: bc-some-project-fancy-feature-get-dynamo-record
```
