# OCA libraries

For simplified integration, the community continues to build libraries that use
OCA in different frameworks, networks, and other ecosystems. OCA integration
into enterprise systems can happen through those libraries.

- [oca.js](https://www.npmjs.com/package/oca.js):
a WASM package with bindings to JavaScript. It is designed for creating OCA object with builder pattern.
- [oca.js-form-core](https://www.npmjs.com/package/oca.js-form-core) ([source](https://github.com/THCLab/oca.js-form-core)):
a package for parsing OCA object to other structure that is more relevant for handling forms.
- [oca.js-form-html](https://www.npmjs.com/package/oca.js-form-html) ([source](https://github.com/THCLab/oca.js-form-html)):
a package for rendering HTML element of OCA Form or OCA Credential from Structure returned from [oca.js-form-core](https://www.npmjs.com/package/oca.js-form-core).

- Deprecated (use [oca.js-form-html](https://www.npmjs.com/package/oca.js-form-html) instead): ~~[oca-form](https://github.com/THCLab/oca-form): a library containing Vue
  components to enable OCA objects to resolve in Vue system applications
  efficiently. This library powers the [OCA
  Editor](https://editor.oca.argo.colossi.network/) and is used in the HCF
  [Aries Toolbox](https://github.com/THCLab/tda-web-client) modification to
  demonstrate safe and secure data flows.~~
