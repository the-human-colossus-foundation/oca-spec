# OCA Ecosystem

We have built a suite of tools and components to enable broad adoption of the
architecture to facilitate implementations in a production environment. OCA core
requirements continue to evolve in line with the development of these middleware
assets.

## OCA Repository

OCA Repository is a component for storing and sharing OCA objects freely. True
object interoperability suggests that an object's storage location needs not to
be the primary focus but instead the file content. OCA follows a [content
centric networking](https://en.wikipedia.org/wiki/Content_centric_networking)
(CCN) approach with a [Self-Addressing
Identifiers](https://datatracker.ietf.org/doc/html/draft-ssmith-said) (SAID)
referencing each object.

OCA Repository is decentralised by nature, synchronised with other components to
enable OCA objects' searchability in a distributed ecosystem.

An OCA repository can be a public-access or private-access repository for
storing OCA objects.

Elastic search powers the current repository implementation and exposes a simple
API (see [OpenAPI Spec](https://repository.oca.argo.colossi.network/)) to the
user.

- License: EUPL 1.2
- OCA Repository on Argo: [https://repository.oca.argo.colossi.network/](https://repository.oca.argo.colossi.network/)
- Source code: [https://github.com/THCLab/oca-search-engine](https://github.com/THCLab/oca-search-engine)

## OCA Data Vault

OCA Data Vault is a simple PoC data storage implementation showcasing how to
consume and provide data described by OCA.

This project implementation is for showcasing purposes only, not for production
systems or real-life use cases.

- License: EUPL 1.2
- Data Valut on Argo: [https://data-vault.argo.colossi.network/](https://data-vault.argo.colossi.network/)
- Source code: [https://github.com/THCLab/oca-data-vault](https://github.com/THCLab/oca-data-vault)
