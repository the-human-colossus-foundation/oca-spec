# OCA Repository

The **OCA repository** is a key concept of the OCA Ecosystem. It enables to manage, store and share OCA Objects like: [ OCA Bundles ](/ecosystem/oca-bundle) and [ OCAFiles ](/specification/ocafile). The interface is exposed through [ REST API ](https://repository.oca.argo.colossi.network/).

The OCA repository operates under governance. It can be public (open access) or private (limited access).

## Applications

The OCA repository serves as a central component in the ecosystem, providing storage, management, and sharing capabilities for various semantic needs. It supports multiple use cases, such as:

- Storing verifiable credential schemas
- Managing schemas for capturing and transforming data from IoT devices
- Acting as a repository for document schemas
- And more

## Download and installation

- Navigate to the [OCA Repository GitHub repository](https://github.com/THCLab/oca-repository-rs) to get the sources of reference implementation.
- A viable alternative is to directly download Docker image that contains the latest release

```
docker pull humancolossus/oca-repository:latest
```

## Usage

See [OpenAPI Specification](https://repository.oca.argo.colossi.network/) to get all available endpoints.

## Concepts

- OCA Repository implements [ content centric networking ](https://en.wikipedia.org/wiki/Content_centric_networking) (CCN) concept tu uniquely identify all the resources stored in the repository. The resources are identified through [SAID's](https://datatracker.ietf.org/doc/html/draft-ssmith-said) so by calculating the product of the one way hash function, that becomes the identifier of the resource. By deriving SAID's from the content it creates cryptographic binding between identifier and the content.
- No ambiguity of the content thanks to unambiguous identifiers.

## Sandbox

An example of the OCA repository is hosted under Argo playground:

[https://repository.oca.argo.colossi.network/](https://repository.oca.argo.colossi.network/)

It is an example of public OCA repository where anyone can publish their own schema. Keep in mind that for this repository there is no authentication nor authorization means everything uploaded there is available publicy to everyone, use only for testing.
