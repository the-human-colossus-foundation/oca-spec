# OCA Repository

## Introduction


The **OCA repository** is a key service of the Overlays Capture Architecture.
Through the OCA repository, a user can access authentic schemas as well as the
capture bases and overlays used to define those structures.

The OCA repository operates under governance. It can be public (open access) or
private (limited access).

As a service, the OCA repository can access the following OCA tools:
1. *Schema Database* The primary role of the OCA repository is to provide OCA Services with access to schema databases
2. Schema transformation
3. OCA parser


## Uses cases

The following use cases are considered for the design document.

- Users can search for a schema in the repository
- Users can retrieve a schema from the repository
- Users can publish a schema to the repository
- Users can create a new instance of an OCA repository
- Users can create a shadow server for a given OCA repository


## Reference implementation

An example of the OCA repository is hosted under Argo playground:

[https://repository.oca.argo.colossi.network/](https://repository.oca.argo.colossi.network/)

It is an example of public OCA repository where anyone can publish their own
schema. Keep in mind that for this repository there is no authentication nor
authorization, the reason for that is that we are operating on an immutable
object which are identified by Self-Addressing Identifiers -
[SAID](https://datatracker.ietf.org/doc/html/draft-ssmith-said) which makes it
impossible to override someone else content
