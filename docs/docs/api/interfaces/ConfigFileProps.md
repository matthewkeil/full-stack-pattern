---
id: "ConfigFileProps"
title: "Interface: ConfigFileProps<T>"
sidebar_label: "ConfigFileProps"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `unknown`\> |

## Properties

### bucketName

• **bucketName**: `string`

The bucketName of where to upload the file

#### Defined in

[providers/configFileProvider/index.ts:20](https://github.com/matthewkeil/full-stack-pattern/blob/47a3018/providers/configFileProvider/index.ts#L20)

___

### config

• **config**: `T`

The actual configuration that will get turned into the file.  Library

- uses YAML.stringify(config) for .yaml and .yml files
- uses JSON.stringify(config) for .json files
- creates a js file by stringifying the object with JSON.stringify and
  wrapping it with `var CONFIG_FILE = JSON.parse('${stringified}');`.
  Makes it globally available to the code in the browser via
  <head><script type="text/javascript" src="/config.js" /></head>

#### Defined in

[providers/configFileProvider/index.ts:46](https://github.com/matthewkeil/full-stack-pattern/blob/47a3018/providers/configFileProvider/index.ts#L46)

___

### fileName

• **fileName**: `string`

The filename for the config file.  Supports .yml, .yaml, .json, or .js
extensions.

#### Defined in

[providers/configFileProvider/index.ts:26](https://github.com/matthewkeil/full-stack-pattern/blob/47a3018/providers/configFileProvider/index.ts#L26)

___

### mergeExisting

• `Optional` **mergeExisting**: false \| true

Will go to the file in S3 and merge the passed configuration with the
existing configuration that is already in the file in S3.  Useful when
only part of the config changes by environment but the rest is fixed
and complex

#### Defined in

[providers/configFileProvider/index.ts:34](https://github.com/matthewkeil/full-stack-pattern/blob/47a3018/providers/configFileProvider/index.ts#L34)
