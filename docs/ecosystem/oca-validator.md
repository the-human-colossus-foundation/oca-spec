# OCA Validator

**OCA Validator** enables entry (or an array of entries) verification against predefined rules, given by the [ OCA Bundle ](/ecosystem/oca-bundle). The verification executed on an entry, that is a map of key-value pairs, encompasses:
- type checking, so whether a value matches expected type or can be implicitly coerced to it;
- task (overlay) specific verification, including:
  - [ character encoding overlay ](/specification/#character-encoding-overlay)
  - [ format overlay ](/specification/#format-overlay)
  - [ cardinality overlay ](/specification/#cardinality-overlay)
  - [ conformance overlay ](/specification/#conformance-overlay)
  - [ entry code overlay ](/specification/#entry-code-overlay)

## Installation

### Rust
```
[dependencies]
oca_conductor = "0.2.6"
```
### Typescript and JavaScript (Node.JS based)

- For `oca-transformer`
  ```bash
  npm i oca-data-transformer
  ```
- For `oca-validator`
  ```bash
  npm i oca-data-validator
  ```

## Usage

### Rust

See tests available for `transformer` and `validator` modules under [ https://github.com/THCLab/oca-conductor/tree/main/conductor/src ](https://github.com/THCLab/oca-conductor/tree/main/conductor/src)

### Typescript and JavaScript (Node.JS based)

```typescript
import { resolveFromZip, Validator } from "oca-data-validator";

const oca = resolveFromZip(`oca_bundle.zip`);
let validator = new Validator(oca);

const result = validator.validate({
  'email': 'test@example.com',
  'licenses': ["A"],
});

console.log(result); // true
```

See [here](https://github.com/THCLab/oca-conductor/tree/main/bindings/node.js/pkg/validator/test) for more integration tests.
