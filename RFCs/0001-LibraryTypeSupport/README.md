# Title 0001: OCA Repository Library Type Support
- Authors: John Walker, (jwalker@semanticclarity.com), Mukundan Parthasarathy, (mukund@semanticclarity.com)
- Status: [PROPOSED](/README.md#proposed)
- Status Note: Just starting RFC proposal.
- Supersedes: N/A
- Start Date: 2020-09-21

## Summary
Expand the library types supported in the OCA Repository {OCA Repo URL}/{Namespace}/Lib/...

We would like the full REST API support for the generalized pattern:  {OCA-Repo-Base-URL}/FHIR-OCA/Lib/\<profile>/\<project>/\<type>

Extend types supported,  "content-type" values:

                                                -> "application/fhir+json"

                                                -> "application/json"

                                                -> "application/schema+json"

                                                -> "text/plain"


"Profile" maps to the FHIR Profile used as reference to build the FHIR OCA schema from, per example: "us-core"

"Project" maps to the implementable project the profile will be used in, per example: "USImmunize"

"Type"  maps to the content type necessary to build the required schema, per example: "application/schema+json"

            {OCA Repo Base URL}/FHIR-OCA/Lib/us-core/USImmunize/json-schema/ -> support for "application/schema+json"
                                                    
            {OCA Repo Base URL}/FHIR-OCA/Lib/us-core/USImmunize/json/ -> support for "application/json"
                                                                      -> support for "application/fhir+json"

            {OCA Repo Base URL}/FHIR-OCA/Lib/us-core/USImmunize/reference-list/ -> supports "text/plain"
                                                                                -> supports "application/json"
                                                                                -> supports "application/fhir+json"        							 
## Motivation

We are requesting this to support the FHIR base schema and overlay authoring process for FHIR OCA.

## Tutorial

To create a new FHIR OCA base schema and overlays for a use case as example supporting Immunization credentials:

- In order to create the FHIR OCA immunization base schema we need to refer to the FHIR base Immunization schema. This object would have content-type of "application/schema+json". 
- The process above would be recursively repeated for e.g. Patient, Practioner, Organization ...
- Where required, frequently used reference lists of standard values would be referred to from within overlay definitions. It is assumed that these would be available via hashlinks.

- All resources named above are assumed to be retrieved via hashlinks using the OCA repository REST API. 

- Content type desired for such resources will be set during content 'upload' using POST request.

- All lookups for these resources will be supported by hashlinks returned during the above POST request.

- FHIR-OCA authoring roles shall be able to create and retrieve and operate on sub-directories of "{OCA Repo Base URL}/FHIR-OCA/Lib/..."
	- For each lib types above, ability to create and populate the following container types:
	  Profile   e.g. "us-core"
	  Profile/Project   e.g. "us-core"/"USImmunize"



This enhancement proposal is aimed at FHIR OCA contributors. 

## Reference

To be provided later in the RFC lifecyce - Provide guidance for implementers, procedures to inform testing,
interface definitions, formal function prototypes, error codes,
diagrams, and other technical details that might be looked up.
Strive to guarantee that:

- Interactions with other features are clear.
- Implementation trajectory is well defined.
- Corner cases are dissected by example.

## Drawbacks

Why should we *not* do this? We are not aware of any drawbacks to this RFC request.

## Rationale and alternatives

- Why is this design the best in the space of possible designs? We believe this design provides for an efficient extension to support content types required for the creation and retrieval of FHIR OCA schemas and their related overlays.
- What other designs have been considered and what is the rationale for not choosing them? Because of the significant nesting depth and context inclusion that exists in FHIR resource json objects it is not realistic to construct FHIR OCA Base schemas from "scratch"; leveraging the Profile and Structure Definition practices used in the FHIR community supports the design decsion.
- What is the impact of not doing this? Not implementing this will complicate and impede the creation and conversion of FHIR json resources into qualified FHIR OCA "Base" and Populated schemas.

## Prior art

Discuss prior art, both the good and the bad, in relation to this proposal.
A few examples of what this can include are:

- Does this feature exist in other ecosystems and what experience have
their community had?
- For other teams: What lessons can we learn from other attempts?
- Papers: Are there any published papers or great posts that discuss this?
If you have some relevant papers to refer to, this can serve as a more detailed
theoretical background.

This section is intended to encourage you as an author to think about the
lessons from other implementers, provide readers of your proposal with a
fuller picture. If there is no prior art, that is fine - your ideas are
interesting to us whether they are brand new or if they are an adaptation
from other communities.

Note that while precedent set by other communities is some motivation, it
does not on its own motivate an enhancement proposal here.

## Unresolved questions

- What parts of the design do you expect to resolve through the
enhancement proposal process before this gets merged?
- What parts of the design do you expect to resolve through the
implementation of this feature before stabilization?
- What related issues do you consider out of scope for this
proposal that could be addressed in the future independently of the
solution that comes out of this doc?

## Implementations

The following lists the implementations (if any) of this RFC. Please do a pull request to add your implementation. If the implementation is open source, include a link to the repo or to the implementation within the repo.

*Implementation Notes* [may need to include a link to test results](README.md#accepted).

Name / Link | Implementation Notes
--- | ---
 |
