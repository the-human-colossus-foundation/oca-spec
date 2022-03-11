# FAQ

## How do you define the data capture and exchange process?

OCA defines both schema (for persistent database records) and forms (for
transient credentials) in data capture. For example, in the covid certificate
scenario, this would be the granular data capture definitions required for
structured vaccination credentials, COVID-19 antigen test credentials, and
COVID-19 citizen recovery credentials.

OCA brings a common architecture for defining source structures from which to
transform to a specific target structure in terms of data exchange. For example,
for the covid certificate scenario, this would be the transformation process
  from OCA schemas to W3C-compliant Verifiable Credentials.

OCA offers a solution to two distinct areas of data management: (i.) data
harmonisation, which involves transforming datasets to fit together in a common
architecture; and (ii.) semantic harmonisation, the process of ensuring that –
as part of data harmonisation – the meaning and context of data remains
uniformly understood by all interacting actors, regardless of how it was
collected initially. In other words, OCA harmonises database models. In
addition, it is a solution to semantic harmonisation between data models and
data representation formats.


## Since the capture base in OCA defines a purest single dataset as the stable base, what is the principle of defining purest?

By “purest”, we mean the most generic base objects to preserve data context and
enable seamless global data harmonisation.

The main objective of OCA is to ensure that data context is not lost further
into the data pipeline. Instead of each different jurisdiction defining its
capture bases, OCA encourages the reuse of existing artefacts (capture bases and
overlays) by allowing jurisdictions to extend schema definitions based on their
local rules and regulations for preserving context. By encouraging the reuse of
OCA artefacts, the chance for data language unification increases. Since
creating one global data model for all use cases is impossible, OCA focuses on
unifying context, not on attribute names and set naming conventions. In this
way, OCA enables seamless global data harmonisation across jurisdictions. As
with other ontologies, global data governance authorities would define the
schema definitions and share them with associated jurisdictional authorities.

In context, data harmonisation would involve every national public health agency
creating a mapping overlay to map from their source attributes to those defined
in a generic capture base. The capture base should be uniform for all countries,
jurisdictions and locales. Ideally, the standard format of the capture bases
would be defined and agreed upon by an international consortium of data
governance authorities (e.g., public health agencies). In the covid credential
scenario, eHealth Network effectively took on that role for the EU. The World
Health Organisation would be a good option for obtaining global consensus on
standard capture bases for a global pandemic.

## Why is OCA useful for data decentralisation?

By data decentralisation, we mean freeing up data for societal benefit. For
example, in the covid certificate scenario, the World Health Organisation could
search for structured real-time data for global analytics and trend analysis to
monitor the disease response throughout the pandemic. OCA supports this process
by providing a stable foundation for data harmonisation where all captured data
is in a uniform structure for data aggregation.

Because data lakes contain contextual issues with stored data, OCA aligns with a
trustworthy data mesh instead where data resides within purpose-based domains.
This ethos changes the current mindset from siloed aggregation with weak data
context ("I have it but do not understand it") to requesting data from
decentralised sources with well-structured context ("I understand it and have
access when needed"). OCA enables this mindset shift by decoupling semantic
context from the data, allowing both semantic queries and semantic+data queries.
In addition, interfaces provide access to the data where OCA definitions help
construct criteria requests based on well-maintained context.

OCA supports a content-based network where self-addressing identifiers represent
the data rather than the data location, allowing explicit consent and data
sharing rules to be cryptographically bound to the payload while allowing
permissioned access to data for social benefit in global, jurisdictional, or
local ecosystems. In short, OCA does not dictate how or where countries,
jurisdictions and locales should store data. That is up to the requirements of
the use case and any business requirements. For example, in the covid
certificate scenario, as long as the World Health Organisation can request
access to stored anonymised data for each country (formatted to OCA), the
structured data could be used for trend analysis.

## How does OCA protect privacy?

It is important to note that OCA is a data capture architecture. It defines the
format of data capture at the point of system ingestion. It is not a rules
engine. In other words, if a verifier wants to cache data, they can do that.
That is their business. However, OCA does contain a blinding block, which allows
the issuer to flag any attributes that could potentially unblind the identity of
a governing entity. With identifying attributes flagged in the capture base, all
corresponding data can be treated as sensitive throughout the data lifecycle and
encrypted or removed at any stage, thus reducing the risk of identifying
governing entities in blinded datasets. OCA does not dictate how flagged data
should be encrypted. That is a secondary process step that a rules engine would
define.

By introducing deterministic identifiers for all semantic objects (i.e.,
self-addressing identifiers), data remains traceable throughout the ecosystem.
In addition, the Data Subject can control data usage throughout the lifecycle by
leveraging ACDC (Authentic Chain Data Containers). Auditors also have a
mechanism to efficiently audit the transaction log, checking if the verifier has
consent for caching the data.

## Will OCA be used in the rules engine mentioned in the GHP blueprint?

Rules engines are software systems that execute one or more business rules in a
runtime production environment. They would deal with any executable processing
beyond the initial data capture process, including algorithmic processing such
as masking rules and encryption techniques on flagged data. Take processing of
an event recipient’s name where an OCA capture base contains the attributes
givenName (e.g., “Paul”), middleName (e.g., “Kaine”), and familyName (e.g.,
“Knowles”), for example. A particular jurisdiction (e.g., the Canadian
government) might only want to see the resolution of the first letter of the
given name and the family name (e.g., “P Knowles”). A rules engine, not OCA,
would perform that processing step. In other words, in the context of the GHP
blueprint, OCA schema attributes can be referenced by rules engines. The rules
engines would define the data resolution in a paper-based or digital credential
according to the requirements of the jurisdiction it serves.

OCA artefacts are verifiable, a necessary characteristic for a secure system.
Without that characteristic, weak fundamentals would underpin any associated
rules definitions, introducing an added security risk to the system.


## What is the bottleneck of rule engine and OCA implementation?

The main bottleneck is a lack of funding to help drive the first GHP reference
implementation. A few expert developers and subject matter experts are
continuing to contribute to the reference implementation cause, but we have to
pay developers for their time. It would be great to see some corporate
organisations that will benefit from the GHP implementation work set aside some
funds to help expedite the development process. As things currently stand, that
has not happened yet. OCA can ensure high data quality, but we need a strong
reference implementation guide to pitch to governments to demonstrate globally
interoperable health and travel passes in a production environment. Lack of
funding is the main bottleneck at this stage.

## Could you please explain "OCA follows a content-centric networking (CCN) approach with a SAID referencing each object"?

A content-centric network is an approach where the focus is not where the data
is but what it is. That changes security applications, where self-addressing
identifiers represent the data rather than the data location. In this manner,
security can be applied to the data as it moves through the data lifecycle. On
the flip side, if securing the data location were the focus, different security
rules could apply for each different location.

To confuse matters, the identity community is now using self-addressing
identifiers (SAI) rather than Self-Addressing Identifier (SAID). The joys
of working with moving semantic terminology! In any case, to consider data to be
both authentic and secure, SAIs must be applied.

OCA supports a content-based network where SAIs represent the data rather than
the data location, allowing explicit consent and data sharing rules to be
cryptographically bound to the data payload while allowing permissioned access
to data for social benefit in global, jurisdictional, or local ecosystems.

## If some authentic organization proposes a new solution B that defines a standard schema/format and directly maps each countries/regions current schema/format to this standard schema/format, what is the advantage of OCA compared with this solution B

As described in the official documentation, the beauty of OCA is that the
architecture is extensible by design. Thus, in addition to the core overlays,
there will inevitably be other optional overlays to include in the stack in
future: e.g., a Mapping Overlay, a Type Overlay, a Unit Overlay, and a
Cardinality Overlay. Overlay extensibility makes OCA a powerful solution for
semantic harmonisation, ensuring that the meaning and context of data remains
uniformly understood by all interacting actors.

OCA provides a seamless solution for language translations (one does not need to
duplicate the other JSON layers to translate into other languages). However, it
goes much deeper than that. It works better for ALL colouration points in a
schema. It is all about maintaining rich context throughout the journey of the
data lifecycle. That cannot happen at an attribute level without preserving the
context of each attribute in association with the other attributes in the
schema. In other words, context is maintained at a schema level, not at an
attribute level. For example, an issuer may need to store cardinality
information for each attribute (i.e., Required/Optional). That can change per
jurisdiction, but, more importantly, the governance decision behind each of
those inputs is dependent on the attribute's relationship with all of the other
schema attributes in context. Once that rich context is lost and the data
resides in an aggregated data set for statistical analysis, the generated
insights can become inaccurate. OCA was built specifically for that purpose.

Without OCA, issuers face the same problems that exist in the current data
landscape. OCA is an architecture that addresses harmonisation, security and
extensibility of its artefacts over time.
