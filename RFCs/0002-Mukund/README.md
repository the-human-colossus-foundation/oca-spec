# Title 0002: OCA Base schema support for FHIR Conformance resources (FHIR profiles, extensions)
- Authors: [Mukundan Parthasarathy, John Walker]
- Status: [PROPOSED](/README.md#proposed)
- Status Note:
- Supersedes:
- Start Date: 2020-09-24

## Summary

This RFC addresses the issue of handling FHIR resource extensions and profiles.

FHIR platform specification supports many different representation formats such as xml, json, rdf etc. It is a "platform specification" because any non-trivial use (interoperable healthcare applications in clinical domain) requires customizing to account for jurisdictions, healthcare ecosystem practices, local regulations, education etc.

Therefore it is imperative that the FHIR-OCA specification supports FHIR Profiling & FHIR Extension mechanisms currently in use.

## Motivation

Why are we doing this?
This RFC would allow leveraging existing FHIR R4 profiling and extension tool sets and ecosystem (such as FHIR Profile and Extensions registry, Implementation Guides etc). This will ensure not only correctness of OCA representation of FHIR profiles and extensions, but also do so without introducing incompatibilities or verification risks.

What use cases does it support?
This RFC is required for any real-world clinical use case development with FHIR-OCA. For example, the US has "us-core" FHIR Profile. Canada has CA-Core, as do most other countries that actively participate in the FHIR community.

What is the expected outcome?
-OCA Base schema enhancement: Additional OCA Base schema property to indicate that the base schema being defined is a FHIR Profile or Extension, requiring a mandatory "requires conformance" flagging attribute. This shall be a processing step BEFORE any overlay processing occurs. The value shall include approved FHIR Profile or Extension name.

-OCA Base schema enhancement: Additional OCA Base schema property that is a "conformance link" to a json resource that defines a "computable" compliance requirements model w.r.t the Profile and/or Extension specification. Typically this would be a FHIR json document of type StructureDefinition.

-FHIR-OCA specification update: During the processing of such a Base schema (i.e Profile or Extension type with "conformance" fields), the FHIR OCA schema processor is expected to fully process the "conformance" specification (StructureDefinition) which would then create a "conforming" instance of the FHIR resource i.e conforming to the Profile and Extension requirements.

## Tutorial
- Use cases in scope: This feature is aimed at authors of FHIR-OCA artifacts (base schemas, overlays) for the purposes of creating fully self-describing data (OCA Base schema, overlays accompanying instance data). This facilitates creation of a tamper resistant data object that can be directly linked e.g. verifiable credentials.

-Import FHIR Profile and Extension resources in to FHIR-OCA infrastructure. This includes FHIR base schema, ValueSets, Profile and Extension resources from Implementation Guides (these are the Conformance resources required to validate the profiles and extensions).

-Author "extended" or "profile" FHIR-OCA counterpart base schema and overlays using the above FHIR resources.


## Reference
http://hl7.org/fhir/profiling.html
- In particular, FHIR-OCA authors are expected to only deal with structural aspects of conformance (i.e FHIR StructureDefinition, not other types).

- Interactions with other features such as executing StructureDefinition compliance checks against FHIR resources embedded in OCA base schema needs to be fully tested for compatibility (i.e FHIR-OCA authors are not expected to change existing FHIR conformance resources).

## Drawbacks
None, this is required for clinical use of FHIR-OCA in major healthcare ecosystems.

## Rationale and alternatives

- Leveraging existing FHIR Profile and Extension resources, tool ecosystem and conformance resources/validators removes the onus on FHIR-OCA authors/reduces w.r.t operational risks.

- Other designs considered: Because of the significant nesting depth and context inclusion that exists in FHIR resource json objects it is not realistic to construct FHIR OCA Base schemas from "scratch". This approach would be extremely complex and error prone.

- Impact of not doing this will be serious: FHIR-OCA cannot be used for any real-world use cases based on FHIR profiles or extensions.

## Prior art
- FHIR community has defined a very mature model for profiles and extensions. There is a mature ecosystem of tools and technologies: FHIRPath for expressing structural and semantic constraints over multiple formats (xml,json etc)
http://www.hl7.org/fhir/structuredefinition.html
https://hl7.org/fhir/2018May/fhirpath.html
http://www.fhir.org/guides/registry/
https://registry.fhir.org/

## Unresolved questions

- What parts of the design do you expect to resolve through the
enhancement proposal process before this gets merged?
- What parts of the design do you expect to resolve through the
implementation of this feature before stabilization?
- What related issues do you consider out of scope for this
proposal that could be addressed in the future independently of the
solution that comes out of this doc?
-Blinding attributes mapping to FHIR resources

## Implementations

The following lists the implementations (if any) of this RFC. Please do a pull request to add your implementation. If the implementation is open source, include a link to the repo or to the implementation within the repo.

*Implementation Notes* [may need to include a link to test results](README.md#accepted).

Name / Link | Implementation Notes
--- | ---
 |
