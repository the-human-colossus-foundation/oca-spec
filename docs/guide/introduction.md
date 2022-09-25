# Introduction

## Semantic domain
Semantic domain [passive] / the meaning and use of what is put in, taken in, or operated on by any process or system.

### What is Data semantics?
Data semantics is the study of the meaning and use of specific pieces of data in computer programming and other areas that employ data. When studying a language, semantics refers to what individual words mean and what they mean when put together to form phrases or sentences. Data semantics focuses on how a data object represents a concept or object in the real world.

### What is Decentralised semantics?
Decentralised semantics is a term that describes the separation of semantic (“definitional”) and pragmatic (“contextual”) tasks into task-specific objects that, when combined, provide a digital representation of a complex object.

In data processing, metadata is definitional data that provides information about or documentation of other data managed within an application or environment. Contextual data is the background information that provides a broader understanding of an event, person, or item.

![Overlays overview](/images/overlays-overview.png)
_Figure 1. Decentralised semantics. A complex digital object shown as an amalgamation of task-specific objects._

In the domain of decentralised semantics, task-specific objects are called "Overlays". They provide layers of definitional or contextual information to a stable base object called a “Capture Base”.

Decentralised semantics requires the provision of deterministic object identifiers. An object is deemed deterministic if any operation’s result and final state depend solely on the initial state and the operation’s arguments. Object identifiers must be resolvable via the object's digest to be deemed deterministic.

## Why decentralise semantics?
Working across governance boundaries is tricky because there is no common language of communication between [ digital ecosystems ]( https://www.techtarget.com/searchcio/definition/digital-ecosystem ). How can we hope to understand one another when we speak different languages? Add to that the complexities of language evolution and diverse governance frameworks; maintaining proper context is challenging in the current digital landscape.

The primary objective of decentralised semantics is "data harmonisation", which refers to all efforts to combine data from different sources and provide users with an equivalent view of data from various studies. This objective involves the morphologic ("structural"), semantic ("definitional"), and pragmatic ("contextual") harmonisation of digital objects for a common purpose. It also provides an opportunity to structure unstructured data while offering a long-term solution for data language unification within and across distributed data ecosystems.
Pending successful data harmonisation within a distributed data ecosystem, content provided by “overlays” underpins structured search queries for improved insights and analytics.
The key benefit of decentralised semantics is the "distributed custodianship" of task-specific objects (see [Distributed custodianship of task-specific objects](/guide/use-cases.html#use-case-4-distributed-custodianship-of-task-specific-objects) for more information on distributed custodianship) without compromising the objectual integrity of the overall semantic structure. Furthermore, object interoperability is essential in an agile data economy where multiple actors from various institutions participate in complex use cases, supply chains, and data flows supported by multi-stakeholder data governance administrations and frameworks.
Decentralised semantics offers an evolutionary implementation for domain-driven design, an approach to software development that centres the development on programming a domain model with a rich understanding of the processes and rules of a domain.

## What is Overlays Capture Architecture (OCA)?
Overlays Capture Architecture (OCA) is an explicit representation of task-specific objects that have deterministic relationships with other objects. These “Overlays” define individual semantic tasks, which, when combined, provide additional context to the object. An OCA bundle consists of a “Capture Base” and “Overlays”. The sum of its parts represents a contextually-rich schema.

The segregation of overlays by task enables interoperability in the construction process of any digital object without compromising the integrity of the semantic structure, modular components, or the relationship between those objects.

![Overlays to form](/images/overlays-to-form.png)
*Figure 2. Semantic interoperability. Segregating task-specific objects (overlays) within a standard architecture enables different authorised controllers to update specific structural, definitional, or contextual components of the same semantic structure.*

OCA is ontology-agnostic, offering a harmonisation solution between data models and data representation formats while providing a roadmap to resolve privacy-compliant data sharing between servers, networks, and across sectoral or jurisdictional boundaries.

The deterministic interplay between overlays combined with the unicity of the composite bundle is proving to be an exciting field of research. 

## Benefits

OCA offers many advantages, including:
- Simplified data pooling. Decoupling can occur at any time as overlays are
  linked objects. With all colouration definitions stored in the overlays,
  combining data from related sources becomes seamless. Overlays can be removed
  from the base objects before the data merging process and reapplied to ensure
  consistent colouration post data pooling.
- Stable capture bases. Most schema updates occur at the application stage. In
  the case of OCA, all extension and colouration definitions are applied in the
  overlays, enabling issuers to edit one or more of the linked objects to create
  simple updates rather than reissue capture bases on an ongoing basis.
- Flagged attributes for encryption. By referencing the Blinding Identity
  Taxonomy (BIT), issuers can flag attributes in the capture base that could
  potentially unblind the identity of a governing entity. With attributes
  flagged at the base object layer, all corresponding data can be treated as
  sensitive throughout a data lifecycle and encrypted or removed at any stage,
  making associated governing entity identification impossible.
- Data decentralisation. Capture base definitions can remain in their purest
  form as a standard base to decentralise data. Thus, once the data holder has
  given adequate consent, data controllers can contribute anonymous data upon
  which 3rd parties can trigger granular criteria searches for matched data,
  eliminating the need for data silos and encouraging consented data sharing. In
  addition, self-determination regarding the secondary use of personal data
  empowers the data holder.
- Internationalisation. A separate linked data object captures character set
  encoding definitions. Thus, a single report definition c:qaan contain different
  attribute forms for different languages available to users, based on a
  user's locale and other language preferences.

## Concepts

OCA follows a [content centric networking](https://en.wikipedia.org/wiki/Content_centric_networking) (CCN) approach by utilzing [Self-Addressing Identifiers](https://datatracker.ietf.org/doc/html/draft-ssmith-said) (SAID) for deterministic content identification. For that reason OCA strongly relies on cryptographic security characteristics. Each OCA object is equipped with a SAID, which is cryptographically bound to the content of the object. SAID assures immutability and is deterministically generated directly from the content. Furthermore it can be verified without need to interact with any service or provider relying on.

## A brief of history

For several years concept of OCA (formerly ODCA) was incubated within communities like [Inputs and Semantics Working Group](https://wiki.trustoverip.org/display/HOME/Inputs+and+Semantics+Working+Group) at [Trust over IP](https://trustoverip.org/working-groups/decentralized-semantics/) as well as Hyperledger Aries [RFC-0014](https://github.com/hyperledger/aries-rfcs/tree/main/concepts/0013-overlays).

