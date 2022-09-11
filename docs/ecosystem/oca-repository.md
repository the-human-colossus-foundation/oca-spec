# OCA Repository
TODO

## Introduction

The **OCA repository** is a key service of the Overlays Capture Architecture.
Through the OCA repository, a user can access consistent schemas as well as the
capture bases and overlays used to define those structures.

The OCA repository operates under governance. It can be public (open access) or
private (limited access).

## Concepts

- ...

OCA Repository is a component for storing and sharing OCA objects freely. True
object interoperability suggests that an object's storage location needs not to
be the primary focus but instead the file content. 
OCA Repository is decentralised by nature, synchronised with other components to
enable OCA objects' searchability in a distributed ecosystem.

An OCA repository can be a public-access or private-access repository for
storing OCA objects.

Elastic search powers the current repository implementation and exposes a simple
API (see [OpenAPI Spec](https://repository.oca.argo.colossi.network/)) to the
user.

## Features

- Users can search for a schema in the repository
- Users can retrieve a schema from the repository
- Users can publish a schema to the repository

## Reference implementation

See https://github.com/THCLab/oca-repository

## Sandbox

An example of the OCA repository is hosted under Argo playground:

[https://repository.oca.argo.colossi.network/](https://repository.oca.argo.colossi.network/)

It is an example of public OCA repository where anyone can publish their own
schema. Keep in mind that for this repository there is no authentication nor
authorization, the reason for that is that we are operating on an immutable
object which are identified by Self-Addressing Identifiers -
[SAID](https://datatracker.ietf.org/doc/html/draft-ssmith-said) which makes it
impossible to override someone else content
