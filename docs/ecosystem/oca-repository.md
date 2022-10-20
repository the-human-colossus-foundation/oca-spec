# OCA Repository

The **OCA repository** is a key concept of the OCA Ecosystem. It enables to manage and store [ OCA Bundles ](/ecosystem/oca-bundle). The interface is exposed through [ REST API ](https://repository.oca.argo.colossi.network/).

The OCA repository operates under governance. It can be public (open access) or
private (limited access).

## Applications

- Storage for [ OCA Bundles ](/ecosystem/oca-bundle);
- Distribute [ OCA Bundles ](/ecosystem/oca-bundle) among many co-existing repositories for high availability.
- Access [ OCA Bundles ](/ecosystem/oca-bundle) from any OCA Repository, no matter whether it is trusted or not. 

## Download and installation

- Navigate to the [OCA Repository GitHub repository](https://github.com/THCLab/oca-repository) to get the sources of reference implementation.
- A viable alternative is to directly download Docker image that contains [ the latest release ](https://hub.docker.com/r/humancolossus/oca-repository). Note OCA Repository requires Elastic Search to operate. Navigate to the [sample Ecosystem Docker Compose file](https://github.com/THCLab/oca-ecosystem/blob/main/docker-compose.yml#L22) that contains the setup.

## Usage

See [OpenAPI Specification](https://repository.oca.argo.colossi.network/) to get all available endpoints.


## Concepts

- OCA Repository implements [ content centric networking ](https://en.wikipedia.org/wiki/Content_centric_networking) (CCN) concept tu uniquely identify all the resources stored in the repository. The resources are identified through [SAID's](https://datatracker.ietf.org/doc/html/draft-ssmith-said) so by calculating the product of the one way hash function, that becomes the identifier of the resource. By deriving SAID's from the content it creates cryptographic binding between identifier and the content.
- No ambiguity of the content thanks to unambiguous identifiers.
- OCA Repository is searchable by employing [ Elastic Search ](https://www.elastic.co/) engine.


## Sandbox

An example of the OCA repository is hosted under Argo playground:

[https://repository.oca.argo.colossi.network/](https://repository.oca.argo.colossi.network/)

It is an example of public OCA repository where anyone can publish their own schema. Keep in mind that for this repository there is no authentication nor authorization.
