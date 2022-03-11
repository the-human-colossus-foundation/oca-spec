# Getting started

## Introduction

OCA is a pattern (architecture) that defines a new representation of data
semantics. Official OCA documentation is under development hosted by [Human
Colossus Foundation](https://humancolossus.foundation). For years concept of OCA
was incubated within communities like [Inputs and Semantics Working
Group](https://wiki.trustoverip.org/display/HOME/Inputs+and+Semantics+Working+Group)
at [Trust over
IP](https://trustoverip.org/working-groups/decentralized-semantics/). And
Hyperledger Aries
[RFC-0014](https://github.com/hyperledger/aries-rfcs/tree/main/concepts/0013-overlays).

Developers can follow current specification work in the [official
repository](https://the-human-colossus-foundation.github.io/oca-spec/).

Due to a rapidly-evolving OCA core specification, future implementations may
differ somewhat. The most up to date implementation is Rust, which would provide
bindings to other languages.

- [Rust](https://github.com/THCLab/oca-rust) with compile targets to other
  languages like JavaScript, Python and more planed.
- Deprecated: ~~[Kotlin](https://github.com/THCLab/oca-kotlin) with compile target to JavaScript~~
- Deprecated: ~~[Ruby](https://github.com/THCLab/oca-ruby)~~

Those core libraries allow the creation, parsing and management of OCA objects.

## OCA libraries

For simplified integration, the community continues to build libraries that use
OCA in different frameworks, networks, and other ecosystems. OCA integration
into enterprise systems can happen through those libraries.

- [oca-form](https://github.com/THCLab/oca-form): a library containing Vue
  components to enable OCA objects to resolve in Vue system applications
  efficiently. This library powers the [OCA
  Editor](https://editor.oca.argo.colossi.network/) and is used in the HCF
  [Aries Toolbox](https://github.com/THCLab/tda-web-client) modification to
  demonstrate safe and secure data flows.

## OCA Ecosystem

We have built a suite of tools and components to enable broad adoption of the
architecture to facilitate implementations in a production environment. OCA core
requirements continue to evolve in line with the development of these middleware
assets.

### OCA Repository

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

### OCA Data Vault


OCA Data Vault is a simple PoC data storage implementation showcasing how to
consume and provide data described by OCA.

This project implementation is for showcasing purposes only, not for production
systems or real-life use cases.


- License: EUPL 1.2
- Data Valut on Argo: [https://data-vault.argo.colossi.network/](https://data-vault.argo.colossi.network/)
- Source code: [https://github.com/THCLab/oca-data-vault](https://github.com/THCLab/oca-data-vault)


## OCA Tools

HCF has facilitated the development of a set of tools to make OCA integration easier for developers.

### OCA Editor

OCA Editor is an easy-to-use middleware solution to enable users to create,
modify and manage OCA objects. The core development team created the tool with
non-technical people in mind. Through a 'drag and drop' approach, anyone can
create and publish OCA schemas. We highly recommend building OCA schemas via
this editor as the first port-of-call.

- License: EUPL 1.2
- OCA Editor on Argo: https://editor.oca.argo.colossi.network/
- Source code: https://github.com/THCLab/oca-editor

## OCA playground

OCA can be tested and developed on Argo, a dedicated sandbox environment hosted
by Human Colossus Foundation.

Link to Argo: [https://argo.colossi.network/](https://argo.colossi.network/)


# References

- [Hyperledger Aries RFC-0013](https://github.com/hyperledger/aries-rfcs/tree/main/concepts/0013-overlays)
- [Inputs and Semantics Working Group](https://wiki.trustoverip.org/display/HOME/Inputs+and+Semantics+Working+Group)
- [Self-Addressing Identifiers](https://datatracker.ietf.org/doc/html/draft-ssmith-said)
