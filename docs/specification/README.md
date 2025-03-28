---
sidebarDepth: 5
description: Official OCA specification
---

# OCA Technical Specification

<dl>
    <dt>
        Version:
    </dt>
    <dd>
        v2.0.0-rc1
    </dd>
  <dt>
      Latest published version:
  </dt>
  <dd>

  [https://oca.colossi.network/specification/](/specification/) ([Download as PDF](https://humancolossus.foundation/s/HCF-Overlays-Capture-Architecture-OCA-v1.0.2.pdf))

  </dd>
  <dt>
      Previous published version:
  </dt>
  <dd>

  [https://oca.colossi.network/specification/v1.0.1](/specification/v1.0.1) ([Download as PDF](https://humancolossus.foundation/s/HCF-Overlays-Capture-Architecture-OCA-v1.0.1.pdf))

  </dd>
  <dt>
      Contributors:
  </dt>
  <dd>

  Paul Knowles ([ Human Colossus Foundation ](https://humancolossus.foundation/))

  Ryan Barrett (Stratosoft LLC)

  Robert Mitwicki ([ Human Colossus Foundation ](https://humancolossus.foundation/))

  Michal Pietrus ([ ArgonAUTHs ](https://argonauths.eu/))

  Marcin Olichwiruk ([ ArgonAUTHs ](https://argonauths.eu/))

  Philippe Page ([ Human Colossus Foundation ](https://humancolossus.foundation/))

  </dd>
  <dt>
    Copyrights:
  </dt>
  <dd>

Human Colossus Foundationi, [ EUPL v1.2 licence ](https://interoperable-europe.ec.europa.eu/collection/eupl/eupl-text-eupl-12).

  </dd>
  <dt>
    Governance:
  </dt>
  <dd>

  Technology Council maintains the OCA specification at [ Human Colossus Foundation ](https://humancolossus.foundation). Comments regarding this specification can be provided as issues on the official [ OCA Github ](https://github.com/the-human-colossus-foundation/oca-spec/issues).

  </dd>
  <dt>
      Contact:
  </dt>
  <dd>

  [ contact@humancolossus.org ](mailto:contact@humancolossus.org)

  </dd>
</dl>

## Conventions and Definitions

Sections marked as non-normative, along with all authoring guidelines, diagrams,
examples, and notes in this specification, are for informational purposes only
and are not mandatory for compliance. All other sections of this specification
are normative and define the required rules and standards that must be followed
to ensure conformity with the OCA Specification.

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD",
"SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this
document are to be interpreted when, and only when, they appear in all capitals,
as described in RFC 2119 \[[RFC2119](#ref-RFC2119)\].

## Introduction

_This section is non-normative._

### How does OCA work?

OCA is based on the FAIR data principles \[[FAIR2016](#ref-FAIR2016)\], a set of
guiding principles to make data findable, accessible, interoperable, and
reusable, to enable scientific data management and stewardship, and to be
relevant to all digital economy stakeholders.

OCA represents transient objects (domain-agnostic) and persistent schemas
(domain-specific) as multi-dimensional objects consisting of a stable capture
base and interoperable overlays. By introducing overlays as linked task-specific
objects within the schema stack, the architecture offers an optimal level of
efficiency and interoperability in alignment with FAIR principles.

#### What is a Capture Base?

A [Capture Base](#capture-base) is the purest and simplest form of a schema,
defining the structural characteristics of a dataset. It is the foundational
layer upon which to bind task-specific objects to enhance the meaning of
inputted data.

#### What are Overlays?

[Overlays](#overlays) are task-specific objects that provide
cryptographically-bound layers of definitional or contextual metadata to a
[Capture Base](#capture-base). Any actor interacting with a published [Capture
Base](#capture-base) can use [Overlays](#overlays) to enrich the meaning of the
data, transform how inputted data and metadata are displayed to a viewer or
guide an agent in applying a custom process to captured data.

## OCA object types

An `OCA object` is either a [Capture Base](#capture-base) or a task-specific
[Overlay](#overlays) with a deterministic relationship to a [Capture
Base](#capture-base). When amalgamated as a [Bundle](#bundle), OCA objects
provide the necessary structural, definitional, and contextual information to
determine the meaning of inputted data at the time of data capture.

### Common attributes

Each `OCA object` **MUST** include the following attributes, listed in that
order to form its cannonical serialization:

- `digest` - [deterministic identifier](#deterministic-identifier) of the capture base
- `type` - [type](#type) of the object
- object specific attributes (see below)

#### Type

The `type` attribute specifies the OCA object type and its associated version.
The version aligns with the corresponding OCA specification version, ensuring
that the object remains compatible with the specified OCA specification.

```abnf
type = captura-rule / overlay-rule

capture-rule = "capture_base" "/" sem_ver

overlay-rule = "overlay/" overlay_name "/" sem_ver
overlay_name = namespace ":" name / name
namespace = 1*(ALPHA / DIGIT / "-" / "_" / ".")
name = 1*(ALPHA / DIGIT / "-" / "_" / ".")
sem_ver = DIGIT "." DIGIT "." DIGIT
```

_Listing: ABNF type attribute rules \[[RFC5234](#ref-RFC5234)\]_

### Capture Base

A `Capture Base` is a base object that defines a single dataset in its purest
form, providing a structural base to harmonise data. The object defines
attribute names and types.

The Capture Base **MUST** comprises of [common attributes](#common-attributes)
and the following attributes, listed in that order to form its canonical
serialization:

- `attributes` - [attributes](#attributes) of the capture base

```json
{
  "digest": "EFEDyA__ap51wscacOwATP3c51icUeHT6D0tTbInQI9G",
  "type": "capture_base/2.0.0",
  "attributes": {
    "dateOfBirth": "DateTime",
    "documentNumber": "Text",
    "documentType": [ "Text" ],
    "fullName": "Text",
    "height": "Numeric",
    "issuingState": "Text",
    "photoImage": "Binary",
    "sex": "Text",
    "ocrTextLines": [[ "Text" ]]
  },
}
```

_Example 1. Code snippet for a Capture Base._

#### Attributes

The `attributes` attribute maps key-value pairs where the key is the attribute
name and the value is the attribute type.

##### Attribute name

An attribute name is a string that uniquely identifies an attribute within an
OCA layer and is used to reference that attribute by other layers throughout the
OCA bundle. The string can be any valid Unicode code point.

Example of a valid attribute name:
- `FullName`
- `person/name/fullName`
- `王小明`
- `550e8400-e29b-41d4-a716-446655440000`

```abnf
string = 1*(character)
character = %x0000-10FFFF
```

_Listing: ABNF representation of the attribute name_

##### Attribute type

An attribute type determines the attribute's syntax and how attributes of that
type are compared and sorted. A Capture Base recognises seven core data types:

- **Text**: a data type that defines a human-readable sequence of characters and
the words they form, subsequently encoded into computer-readable formats such as
ASCII \[[RFC0020](#ref-RFC0020)\].
- **Numeric**: a data type that defines anything relating to or containing
numbers. Examples of numeric data types include 8-byte integers, fixed precision
and scale numeric data, floating precision number data, integer (whole number)
data, and monetary data values.
- **Reference**: a data type that defines a Self-Addressing IDentifier
([SAID](#ref-SAID)) that references a set of attributes through its associated
parent. For example, the `reference` data type enables the development of nested
data objects, where the organisation of information is in layers or where
objects contain other similar objects.
- **Boolean**: a data type where the data only has two possible variables: true
or false. In computer science, Boolean is an identification classifier for
calculating logical truth values and algebraic variables.
- **Binary**: a data type that defines a binary code signal, a series of
electrical pulses representing numbers, characters, and performed operations.
Based on a binary number system, each digit position represents a power of two
(e.g., 4, 8, 16, etc.). A set of four binary digits or bits in binary code
represents each decimal number (0 to 9). Each digit has two possible states: off
and on (usually symbolised by 0 and 1). Combining basic Boolean algebraic
operations on binary numbers makes it possible to represent each of the four
fundamental arithmetic operations of addition, subtraction, multiplication, and
division.
- **DateTime**: a data type that defines the number of seconds or clock ticks
that have elapsed since the defined epoch for that computer or platform. Common
formats include dates (e.g., YYYY-MM-DD), times (e.g., hh:mm:ss), dates and
times concatenated (e.g., `YYYY-MM-DDThh:mm:ss.sss+zz:zz`), and durations (e.g.,
`PnYnMnD`).
- **[\<data type\>]**: a data type that defines a structure that holds several
data items or elements of the same data type. When you want to store many pieces
of data that are related and have the same data type, it is often better to use
an array instead of many separate variables (e.g., `[Text]`,
`[Numeric]`, `[[Text]]`, etc.).

### Overlays

`Overlay` as a task-specific object provides layers of definitional or
contextual metadata.

In the context of this specification, all listed **overlays** are classified as
**base overlays**. These overlays have been identified through community
consensus as fundamental for ensuring semantic interoperability and are among
the most widely utilized.

The **OCA Specification** intentionally limits the number of **predefined base
overlays** to a **minimum**, allowing the community to take the lead in
developing additional overlays as needed. This approach fosters a **dominant
design** process, enabling the community to determine which **task-specific
overlays** are most meaningful and valuable. See [Community
overlays](#community-overlays) for more details. From perspective of the specification and implementation both **base overlays** and **community overlays** are treated equally.

#### Mandatory attributes

Overlays are cryptographically-linked objects that provide layers of
task-oriented definitional or contextual information to a `Capture Base`. Any
actor interacting with a published `Capture Base` can use `Overlays` to add
metadata to the underlying object, transform how information is displayed to a
viewer, or guide an agent in applying a custom process to captured data.

Overlays in addition to the [common attributes](#common-attributes) `MUST`
comprises the following attributes, listed in that order to form its canonical
serialization:
- `capture_base` - [SAID](#deterministic-identifier) of [ capture_base ](#capture-base)
- Overlay-specific attributes sorted in lexicographic order
  - See specific overlay types for more information.

#### Common attributes

##### Language

To indicate language-specific information, some overlays would include a
`language` attribute to indicate localization of that overlay. Those overlays
are marked in the specification as `[lagnauge-specific object]`

The International Organization for Standardization (ISO) \[[ISO](#ref-ISO)\] has
standardised two lists of language-related codes: the language codes called ISO
639-1 alpha-2 \[[ISO639](#ref-ISO639)\] codes ("Codes for the representation of
names of languages") and ISO 3166-1 alpha-2 \[[ISO3166](#ref-ISO3166)\] codes
("Codes for the representation of names of countries"). Both consist of two
letters. The language code is written in lowercase while the country code is
written in uppercase. However, both ISO classifications may be combined to
differentiate regional languages.

The `language` attribute MUST contain either the two-letter language code
(lowercase) for a national language or the combined language (lowercase)/country
(uppercase) code for a regional language or locale.

![Table 1](/images/spec-table1.png)
_Table 1. An example of ISO standard values for language and combined language/country codes._


#### Character Encoding Overlay

A Character Encoding Overlay defines the process of assigning numbers to
graphical characters, especially the written characters of human language,
allowing them to be stored, transmitted, and transformed using digital
computers. Character encoding using internationally accepted standards permits
worldwide interchange of text in electronic form.

In addition to the [Mandatory attributes](#mandatory-attributes), the Character
Encoding Overlay MUST include the following attributes:

- `attr_character_encoding`

  The `attr_character_encoding` attribute maps key-value pairs where the key is
  the attribute name and the value is the character encoding.

There are many encoding standards including Base64
\[[RFC4648](#ref-RFC4648)\], UTF-8, and ASCII to name a few. Each standard has
a purpose, and applications using those encoding standards expect to receive
data compliant with that encoding standard. The most popular types of
character encoding are ASCII and Unicode \[[UNICODE](#ref-UNICODE)\]. While
ASCII is still supported by nearly all text editors, Unicode is more commonly
used because it supports a larger character set. Unicode is often defined as
UTF-8, UTF-16 \[[RFC2781](#ref-RFC2781)\], or UTF-32
\[[ISO10646](#ref-ISO10646)\], which refer to different Unicode standards.

:::tip An example of character encoding for a text format:
Data type: `Text`<br>
Character encoding: `UTF-8` (default)<br>
Standard: `ReGex`<br>
Format: `[A-Z0-9]{9}`
:::
:::tip An example of binary-to-text encoding for an image format:
Data type: `Binary`<br>
Character encoding: `Base64`<br>
Standard: `ISO/IEC 10918`<br>
Format: `image/jpeg`
:::

  ```json
  {
    "digest": "EPeH3AVhmGMLRT-DGqm6B9RY2q5-bC6ckTrFd__z6FYJ",
    "capture_base": "EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis",
    "type": "spec/overlays/character_encoding/2.0.0",
    "default_character_encoding": "utf-8",
    "attribute_character_encoding": {
      "photoImage": "base64"
    }
  }
  ```

  _Example 2. Code snippet for a Character Encoding Overlay._

#### Format Overlay

A Format Overlay defines an input and display format for data fields. The data
format enables conversion of the input buffer to the program variable and
displays program variable data to form fields.

In addition to the [Mandatory attributes](#mandatory-attributes), the Format
Overlay MUST include the following attribute:

- `attribute_formats`

  The "attribute_formats" attribute maps key-value pairs where the key is the
  attribute name and the value is the format.

The inputted format values are dependent on the following core data types as
defined by the attribute types in the Capture Base:

- **Text**: The inputted format value for this core data type MAY be a regular
expression [REGEX](#ref-REGEX), a sequence of characters that specifies a search pattern in
text.

- **Binary**: The inputted format value for this core data type MAY be a MIME
type registered with the Internet Assigned Numbers Authority (IANA)
\[[IANA](#ref-IANA)\]

- **DateTime**: The inputted format value for this core data type MAY be a date
and time representation as defined by [ISO 8601](#ref-ISO8601), a standard for the worldwide exchange and communication of date and time-related data.

```json
{
  "digest": "EIpe9Ra0tUWTPFrZU-Jo_EufovDqrbFOgwc2YppvTvFD",
  "capture_base": "EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis",
  "type": "spec/overlays/format/2.0.0",
  "attribute_formats": {
    "dateOfBirth": "YYYY-MM-DD",
    "documentNumber": "[A-Z0-9]{9}",
    "photoImage": "image/jpeg",
    "sex": "[A-Z]{1}"
  }
}
```

_Example 3. Code snippet for a Format Overlay._

#### Label Overlay

_[language-specific object]_

A Label Overlay defines human readable attribute names. For example, for an
attribute named `dateOfBirth`, you may wish to call it `Date of birth`, which is
more meaningful and user-friendly when inspected by human.

In addition to the [Mandatory attributes](#mandatory-attributes) and
[language](#language), the Label Overlay MUST include the following attribute:

- `attribute_labels`

  The `attribute_labels` attribute maps key-value pairs where the key is the
  attribute name and the value is a human-meaningful attribute label in a
  specific language.

```json
{
  "digest": "EPstaptvuTLvr6r2b0JBLzxaQzMZKkcKaYZBQTYPrdaL",
  "capture_base": "EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis",
  "type": "spec/overlays/label/2.0.0",
  "language": "en-UK",
  "attribute_labels": {
    "dateOfBirth": "Date of birth",
    "documentNumber": "Passport Number",
    "documentType": "Document",
    "fullName": "Name",
    "height": "Height",
    "issuingState": "Issuing State or organization (in full)",
    "photoImage": "Portrait image",
    "sex": "Sex"
  }
}
```

_Example 5. Code snippet for a Label Overlay (language: en)._

#### Meta Overlay

_[language-specific object]_

A Meta Overlay defines any language-specific information about a schema. It is
used for discovery and identification and includes elements such as the schema
name and description.

In addition to the [Mandatory attributes](#mandatory-attributes) and
[language](#language), the Meta Overlay SHOULD include the following attributes:

- `name`

  The `name` attribute contains the name of the schema in a specific language.

- `description `

  The `description` attribute contains a description of the schema in a specific language.

and MAY include other attributes at the discretion of the overlay producer, such
as an "affiliation" attribute in the example below. How the overlay producer
conveys the purpose of the additional attributes in the Meta Overlay is outside
the scope of this specification.

```json
{
  "digest": "EGzJ1hFOPWD1J5Bq2TA-NR0ssPunJJO_7uxngJNDXcXs",
  "capture_base": "EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis",
  "type": "spec/overlays/meta/2.0.0",
  "language": "en-UK",
  "name": "Digital Passport",
  "description": "An example of a Digital Passport schema",
  "affiliation": "The Government of Antarctica"
}
```

_Example 6. Code snippet for a Meta Overlay (language: en-UK)._

#### Standard Overlay

A Standard Overlay defines a documented agreement or technical specification
published by a standards organisation used to represent, format, define,
structure, tag, transmit, manipulate, use, and manage data.

In addition to the [Mandatory attributes](#mandatory-attributes), the Standard
Overlay MUST include the following attribute:

- `attr_standards`

  The `attr_standards` attribute maps key-value pairs where the key is the
  attribute name and the value is the standard.

There are many international standards organisations establishing tens of
thousands of standards covering almost every conceivable topic. The three
largest and most well-established standards organisations are the International
Organization for Standardization (ISO), the International Electrotechnical
Commission (IEC) \[[IEC](#ref-IEC)\], and the International Telecommunication
Union (ITU) \[[ITU](#ref-ITU)\]. Standards tend to contain the acronym of the
standards organisation followed by an internal document identifier or URN. The naming convention is outside the scope of this specification and is up to the producer of the overlay.

```json
{
  "digest": "EMd8KksaUfkmfzzTJBx4gsTz0d8JaId3Lj4otsY9stXg",
  "capture_base": "EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis",
  "type": "spec/overlays/standard/2.0.0",
  "attr_standards": {
    "dateOfBirth": "ISO 8601"
  }
}
```

_Example 7. Code snippet for a Standard Overlay._

#### Cardinality Overlay

A Cardinality Overlay defines the minimum and maximum number of values that an
attribute can have. For a relationship, the cardinality interval specifies the
minimum and maximum number of relationship targets.

In addition to the [Mandatory attributes](#mandatory-attributes), the
Cardinality Overlay MUST include the following attribute:

- `attr_cardinality`

  The `attr_cardinality` attribute maps key-value pairs where the key is the
  attribute name and the value is the cardinality interval.

The logic of cardinality intervals is as follows:

- `n` : The cardinality interval denotes exactly `n` entries;
- `n-` : The cardinality interval denotes a minimum of `n` entries;
- `n-m` : The cardinality interval denotes a minimum of `n` and maximum of `m` entries;
- `-m` : The cardinality interval denotes a maximum of `m` entries.

Note that `n` and `m` are positive integers.

```json
{
  "digest": "EMWxTY5PLoPOtyb-XgiB3BiRpqlHhxRTW7hqAI50UFsl",
  "capture_base": "EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis",
  "type": "spec/overlays/cardinality/2.0.0",
  "attr_cardinality": {
    "documentType": "1-2"
  }
}
```

_Example 8. Code snippet for a Cardinality Overlay._

#### Conformance Overlay

A Conformance Overlay indicates whether data entry for each attribute is
mandatory or optional.

In addition to the [Mandatory attributes](#mandatory-attributes), the
Conformance Overlay MAY include the following attributes:

- `attribute_conformance `

  The `attribute_conformance` attribute maps key-value pairs where the key is
  the attribute name and the value is the data entry conformance of the
  attribute, which is set to either `M` (mandatory) or `O` (optional).

```json
{
  "digest": "EIP9FA6J_fvw0wjnvjPVQqkoYol627D-NdvkhptxfyDM",
  "capture_base": "EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis",
  "type": "spec/overlays/conformance/2.0.0",
  "attribute_conformance": {
    "dateOfBirth": "M",
    "documentNumber": "M",
    "documentType": "M",
    "fullName": "M",
    "height": "O",
    "issuingState": "M",
    "photoImage": "M",
    "sex": "M"
  }
}
```

_Example 10. Code snippet for a Conformance Overlay._

#### Entry Code Overlay

An Entry Code Overlay defines the entry keys in a series of key-value pairs
stored in a code table (also known as a "lookup table") or dataset. The key is a
unique identifier that points to its associated value.

![Table 2](/images/spec-table2.png)
_Table 2. An example of how the values in an array of key-value pairs provided
by an Entry Code Overlay subsequently define a set of pre-defined entry keys in
a nested series of key-value pairs. The specified values are often standardised
categorisation codes, valuable data inputs for statistical analysis, machine
learning (ML), and artificial intelligence (AI) algorithms._

In addition to the [Mandatory attributes](#mandatory-attributes), the Entry Code
Overlay MUST include the following attribute:

- `attribute_entry_codes `

  The `attribute_entry_codes` attribute maps key-value pairs where the key is
  the attribute name and the value is either:

  - a set of pre-defined entry keys for a nested series of key-value pairs; or

  - a [SAID](#ref-SAID) that references a code table from an external data
  source to retrieve an array of pre-defined entry keys for a nested series of
  key-value pairs. See [Code Tables](#code-tables) for more information on code
  tables.

```json
{
  "digest": "EPiSWiwDzZCVvXSSs2icINxtHC1_S7gKzhFylVz7iGw0",
  "capture_base": "EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis",
  "type": "spec/overlays/entry_code/2.0.0",
  "attribute_entry_codes": {
    "documentType": ["PE", "PM"],
    "issuingState": "EGyWgdQR9dW_I5oHlHBMoO9AA_eMeb2p3XzcCRCBbKCM",
    "sex": ["F", "M", "X"]
  }
}
```

_Example 11. Code snippet for an Entry Code Overlay._

#### Entry Overlay

_[language-specific object]_

An Entry Overlay defines the entry values in a series of key-value pairs stored
in a code table (also known as a "lookup table") or dataset. A value is either
the identified data or a pointer to that data.

![Table 3](/images/spec-table3.png)
_Table 3. An example of how an Entry Overlay can leverage a set of pre-defined
entry keys in a nested series of key-value pairs provided by an Entry Code
Overlay to provide human-meaningful values in a specified national or regional
language._

In addition to the [Mandatory attributes](#mandatory-attributes), and
[languag](#language), the Entry Overlay MUST include the following attribute:

- `attribute_entries`

  The `attribute_entries` attribute maps key-value pairs where the key is the
  attribute name and the value is either:

  - a set of pre-defined values in a nested series of key-value pairs that are
  human-meaningful and language-dependent where the entry keys are taken from an
  associated Entry Code Overlay; or

  - a [SAID](#ref-SAID) that references a code table from an external data
  source to retrieve an array of pre-defined values from a nested series of
  key-value pairs that are human-meaningful and language-dependent where the
  entry keys are taken from an associated Entry Code Overlay. See [Code
  Tables](#code-tables) for more information.

```json
{
  "digest": "EKnniFpc80_9VqcJjHnywYtHZEaq12d5i1Bo6Va6VAiZ",
  "capture_base": "EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis",
  "type": "spec/overlays/entry/2.0.0",
  "language": "en-UK",
  "attribute_entries": {
    "documentType": {
      "PE": "DIPLOMATIC PASSPORT",
      "PM": "PASSPORT"
    },
    "issuingState": "Els6NxGvFfyL5aiBWR3j7YiaS7F4j4O-F0EIlZu-dO0g",
    "sex": {
      "F": "Female",
      "M": "Male",
      "X": "Unspecified"
    }
  }
}
```

_Example 12. Code snippet for an Entry Overlay (language: en-UK)._

#### Unit Overlay

A Unit Overlay defines the units of measurement adopted by convention or law,
used as a standard for measuring the same kind of quantitative data. The
RECOMMENDED system to use is the International System of Units (SI)
\[[BIPM](#ref-BIPM)\], French Système International d’Unités, an international
decimal system of weights and measures derived from and extending the metric
system of units.

Adopted by the 11th General Conference on Weights and Measures (CGPM) in 1960,
it is abbreviated SI in all languages. To date, the SI comprises seven base
units: the meter (m), the kilogram (kg), the second (s), the ampere (A), the
kelvin (K), the candela (cd) and the mole (mol).

![Fig 3](/images/spec-fig3.png)

_Figure 3. The seven defining constants of the SI._

In addition to the [Mandatory attributes](#mandatory-attributes), the Unit
Overlay SHOULD include the following attribute:

- `metric_system`

  The `metric_system` attribute contains the acronym of the chosen system of
  units (a coherent system of units of measurement) used for defining attribute
  units.

and MUST include the following attribute:

- `attribute_units`

  The `attribute_units` attribute maps key-value pairs where the key is the
  attribute name and the value is a standard unit of measurement from a known
  metric system.

```json
{
  "digest": "EC7S-U_CxSesNHEEZ6eZjT1TPxvsJsuND_EeTnbajfW4",
  "capture_base": "EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis",
  "type": "spec/overlays/unit/2.0.0",
  "metric_system": "SI",
  "attribute_units": {
    "height": "cm"
  }
}
```

_Example 13. Code snippet for a Unit Overlay._

#### Attribute Mapping Overlay

An Attribute Mapping Overlay defines attribute mappings between two distinct
data models. Data mapping provides a preliminary step for data integration
tasks, including data transformation or data mediation between a data source and
a destination or consolidation of multiple databases into a single database and
identifying redundant columns of data for consolidation or elimination.

```json
{
  "digest": "EMlNpqhCrG1uGkr6arEAKK_K5VockXzoD6ljMT-nLfxZ",
  "capture_base": "Ev_RaB-gIOn8VAB3sg40mINxjiYRxdLVQrgce0aZbFcc",
  "type": "spec/overlays/mapping/2.0.0",
  "attribute_mapping": {
    "first_name": "firstName",
    "last_name": "surname"
  }
}
```

_Example 14. Code snippet for an Attribute Mapping Overlay._

#### Entry Code Mapping Overlay

An Entry Code Mapping Overlay defines the entry key mappings between two
distinct code tables or datasets.

```json
{
  "digest": "EBDUBwcC2pbACiGcTSVfGiYZktdl_SHUi7zJlSRSgABb",
  "capture_base": "Ev_RaB-gIOn8VAB3sg40mINxjiYRxdLVQrgce0aZbFcc",
  "type": "spec/overlays/entry_code_mapping/2.0.0",
  "attr_entry_codes_mapping": {
    "country_code": [
      "AFG:AF",
      "ALB:AL",
      "DZA:DZ",
      "ASM:AS",
      "AND:AD",
      "AGO:AO",
      "AIA:AI",
      "ATA:AQ",
      "ATG:AG",
    ]
  }
}
```

_Example 15. Code snippet for an Entry Code Mapping Overlay._

#### Sensitive Overlay

A Sensitive Overlay is a specialized construct used to identify and flag
attributes that require protection against unauthorized or unwarranted
disclosure. Attributes marked by a Sensitive Overlay typically include data
subject to legal, ethical, or privacy-related considerations, including but not
limited to Personally Identifiable Information (PII), Quasi-Identifiable
Information (QII)) or proprietary information.

Sensitive Overlays are integral to ensuring compliance with legal and ethical
standards while supporting robust data governance. Implementers must incorporate
mechanisms to respect and enforce the protections designated by these overlays
to maintain conformity with the OCA Specification.

The Blinding Identity Taxonomy (BIT) [KAN2020](#ref-KAN2020) is a practical tool
for any practitioner whose organisation has custody or control of a dataset
containing identifiable information about entities, including a natural person,
organisation, or device with signing capabilities that make that entity uniquely
identifiable. For example, data protection officers and schema issuers can use
the BIT to flag a list of elements which require cryptographic encoding to
reduce the risk of identifying a data principal.


In addition to the `capture_base` and `type` attributes (see [Common
attributes](#common-attributes)), the Sensitive Overlay MUST include the
following attribute:

- `attributes`

  The `attributes` attribute is an array of attributes considered sensitive.

```json
{
  "digest": "EKzY_KAP0U05dQ4_radjWu1TkbBFOh50wIgAEKTNP9R2",
  "capture_base": "EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis",
  "type": "spec/overlays/sensitive/1.0",
  "attributes": ["first_name", "last_name"]
}
```

_Example 19. Code snippet for a Sensitive Overlay_

### Community Overlays

Community overlays are task-specific objects which are integral part of OCA
Bundle. Defined by the community can be used to extend functionality of [OCA
Bundle](#bundle).

Community overlay needs to adhere to the OCA specification and MUST include
[Mandatory attributes](#mandatory-attributes) and MAY include [Common
attributes](#common-attributes) if necessary follwed by any overlay specific
attributes.

The **canonical form** of a **community overlay** follows the same rules as the
**canonical form** of the **base overlay**.

## Bundle

An OCA Bundle is a set of OCA objects which MUST included a `Capture Base` and
MAY consist of any number of `Overlays`. An encoded cryptographic digest of the
contained objects produces a [deterministic
identifier](#deterministic-identifier) for the bundle.

#### Canonical form

OCA Bundles MUST be serializable to be verfied. The serialization algorithm MUST
be deterministic and operate on the canonical form of the Bundle, which ensures
proper ordering of the attributes within OCA Objects. The serialization
algorithm consists of the following rules:

- MUST consist of following attributes in this order: `v`, `d`, `capture_base`, `overlays`
  - `v` - version string defined per section [Bundle Version](#bundle-version)
  - `digest` - deterministic identifier of the bundle
  - `capture_base` - the `Capture Base` object defined as per section [Capture Base](#capture-base)
  - `overlays` - an array, containing all the overlays, sorted ASC by the `digest` attribute

#### Bundle Version

To ensure proper versioning and identification of bundles within the OCA
Specification, we define a standardized string format for the bundle version.
This format encodes critical metadata about the bundle, allowing for consistent
interpretation and management across implementations.

*Bundle Version String Format*

The bundle version string must adhere to the following format:

```
OCAS<major><minor><format><size>_
```

Where:

- `OCAS`: A fixed prefix indicating "OCA Structure". This identifies the string
as conforming to the OCA Specification's versioning scheme.
- `<major>`: A single-digit integer (0-9) representing the major version of the
specification. A change in the major version indicates backward-incompatible
updates to the structure.
- `<minor>`: A single-digit integer (0-9) representing the minor version of the
specification. A change in the minor version indicates backward-compatible
updates.
- `<format>`: A string denoting the serialization format of the bundle.
Supported format is: `JSON`: JavaScript Object Notation
- `<size>`: A six-digit, zero-padded integer representing the size of the object
in hex notation, size of the object is calculated with `d` field with dummy
characters the same lenght as the eventual derived value. The dummy character is
#, that is, ASCII 35 decimal (23 hex).
- '_': A version string terminator.

*Example*:

A valid bundle version string:
```
OCAS11JSON000646_
```

This indicates:
- `OCAS` it is a OCA Bundle.
- The major version is 1.
- The minor version is 1.
- The serialization format is JSON.
- The object size in base64 encoding is 646 bytes.

*Validation*

Consumers of the OCA Specification must implement validation logic to ensure the
bundle version string:
- Matches the defined format and structure.
- Uses only supported serialization formats.
- Accurately represents the object's size in base64 encoding.

Validation failure must result in the rejection of the bundle as non-compliant
with the specification.

*Example*:
```
{
  "bundle": {
    "v": "OCAS11JSON000646_",
    "digest": "EKHBds6myKVIsQuT7Zr23M8Xk_gwq-2SaDRUprvqOXxa",
    "capture_base": {
      "digest": "EBnF9U9XW1EqteIW0ucAR4CsTUqojvfIWkeifsLRuOUW",
      "type": "spec/capture_base/1.0",
      "attributes": {
        "digest": "Text",
        "i": "Text",
        "passed": "Boolean"
      },
      "classification": "",
    },
    "overlays": [
      {
          "digest": "ECZc26INzjxVbNo7-hln6xN3HW3e1r6NGDmA5ogRo6ef",
          "capture_base": "EBnF9U9XW1EqteIW0ucAR4CsTUqojvfIWkeifsLRuOUW",
          "type": "spec/overlays/label/1.0",
          "language": "en-UK",
          "attribute_labels": {
              "digest": "Schema digest",
              "i": "Credential Issuee",
              "passed": "Passed"
          },
      },
      {
          "digest": "ED6Eio9KG2jHdFg3gXQpc0PX2xEI7aHnGDOpjU6VBfjs",
          "capture_base": "EBnF9U9XW1EqteIW0ucAR4CsTUqojvfIWkeifsLRuOUW",
          "type": "spec/overlays/character_encoding/1.0",
          "attribute_character_encoding": {
              "digest": "utf-8",
              "i": "utf-8",
              "passed": "utf-8"
          }
      },
      {
          "digest": "EIBXpVvka3_4lheeajtitiafIP78Ig8LDMVX9dXpCC2l",
          "capture_base": "EBnF9U9XW1EqteIW0ucAR4CsTUqojvfIWkeifsLRuOUW",
          "type": "spec/overlays/information/1.0",
          "language": "en-UK",
          "attribute_information": {
              "digest": "Schema digest",
              "i": "Credential Issuee",
              "passed": "Enables or disables passing"
          }
      },
      {
          "digest": "EJSRe8DnLonKf6GVT_bC1QHoY0lQOG6-ldqxu7pqVCU8",
          "capture_base": "EBnF9U9XW1EqteIW0ucAR4CsTUqojvfIWkeifsLRuOUW",
          "type": "spec/overlays/conformance/1.0",
          "attribute_conformance": {
              "digest": "M",
              "i": "M",
              "passed": "M"
          }
      },
      {
          "digest": "EOxvie-zslkGmFzVqYAzTVtO7RyFXAG8aCqE0OougnGV",
          "capture_base": "EBnF9U9XW1EqteIW0ucAR4CsTUqojvfIWkeifsLRuOUW",
          "type": "spec/overlays/meta/1.0",
          "language": "en-UK",
          "description": "Entrance credential",
          "name": "Entrance credential"
      }

}
```
_Example 20. Code snippet for an OCA Bundle._

## Deterministic Identifier

Within the scope of the OCA specification, Deterministic Identifiers are always
Self-Addressing Identifiers ([SAIDs](#ref-SAID)). These identifiers are encoded
using Base64 URL-safe characters. For detailed information on their
functionality, please refer to the [SAID](#ref-SAID) specification. Below, we
distill the most relevant aspects of SAIDs in the context of the OCA
specification.

### How to calculate SAID

1. Convert the object ([bundle](#bundle) or [capture base](#capture-base) or
[overlay](#overlays)) into its canonical form, ensuring all whitespace is
removed.
2. Chose desired digest algorithm from the list of supported algorithms. See [Appendix A](#appendix-a-list-of-supported-codes-for-said) code tables for available algorithms.
3. Replace the `digest` field value in the serialization with a dummy string of the same length as the chosen digest algorithm, see `Total lenght` in the [table](#appendix-a-list-of-supported-codes-for-said) (e.g. BLAKE3-256 is 32 bytes, which is 44 characters in Base64 URL-Safe). The dummy character is `#` (ASCII 35 in decimal, 0x23 in hex).
4. Compute the digest of the modified serialization, which includes the dummy
`digest` value.
5. Decode the computed digest to bytes, and prepend with padding from the [table](#appendix-a-list-of-supported-codes-for-said).
6. Encode the padded digest to Base64 URL-Safe.
7. Replace the first character of the Base64 URL-Safe output with `Code` from the [table](#appendix-a-list-of-supported-codes-for-said).
8. Replace the dummy characters with the computed SAID value.

### How to verify object

1. Read `digest` field value from the object.
2. Convert the object ([bundle](#bundle) or [capture base](#capture-base) or
[overlay](#overlays)) into its canonical form, ensuring all whitespace is
removed.
3. Read first character of the `digest`, find it in the [table](#appendix-a-list-of-supported-codes-for-said) and read `Total lenght` value and `Algorithm`.
4. Compute the digest of the modified serialization, which includes the dummy
`digest` value.
5. Decode the computed digest to bytes, and prepend with padding from the [table](#appendix-a-list-of-supported-codes-for-said).
6. Encode the padded digest to Base64 URL-Safe.
7. Replace the first character of the Base64 URL-Safe output with `Code` from the [table](#appendix-a-list-of-supported-codes-for-said).
4. Replace the `digest` field value in the serialization with a dummy string of the lenght of `Total length` read from previous step. The dummy character is # (ASCII 35 in decimal, 0x23 in hex).
5. Compute the digest of the modified serialization with the algorithm from step 3.
6. Compered the computed digest with the `digest` field value from the object.

### Pseudo code

Below is a pseudo code for calculating SAID. With the following assumption:
- ALGORITHM_DIGEST_LENGTH is the length of the digest in bytes which can be read from the `Total length` in [table](#appendix-a-list-of-supported-codes-for-said).
- ALGORITHM is the algorithm which can be read from the `Algorithm` in [table](#appendix-a-list-of-supported-codes-for-said).
- ALGORITHM_CODE is the code which can be read from the `Code` in [table](#appendix-a-list-of-supported-codes-for-said).

```python
function calculateSAID(payload):
    leading_byte = [0x00]

    # Step 0: Temporarily replace the digest field with a dummy string of the correct length
    payload.digest = "#".repeat(ALGORITHM_DIGEST_LENGTH)

    # Step 1: Calculate the cryptographic digest of the modified payload
    digest = calculate_hash(payload, ALGORITHM)

    # Step 2: Prepend a 0x00 byte to the digest
    combined = concatenate(leading_byte, digest)

    # Step 3: Encode the result in URL-safe Base64 (no padding)
    base64_url = base64_url_safe_encode(combined)

    # Step 4: Replace the first character with the algorithm code and return
    said = ALGORITHM_CODE + substring(base64_url, 1)

```
## Code Tables

A code table is an external dataset structured as either:

- an array of data; or
- a map of key-value pairs.

A code table MUST be identifiable, verifiable, and resolvable by a [SAID](#ref-SAID).

### Code Table for Keys

A Code Table for Keys provides an anchor to a reusable dataset for a common
purpose, such as a list of country codes. Therefore, this object MAY be a
reference target in an Entry Code Overlay. See [Entry Code
Overlay](#entry-code-overlay) for more information.

A Code Table for Keys MUST include the following attribute:

- `keys`

  The `keys` attribute is an array of pre-defined entry keys for a nested series
  of key-value pairs. A key is a unique identifier that points to an associated
  value.

```json
{
  "keys": ["AF", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "..."]
}
```

_Example 21. Code snippet for a Code Table for Keys, providing an anchor for, in
this case, two-character ISO country codes._

### Code Table for Key-Value pairs

A Code Table for Key-Value pairs provides a mapping of input values to output
values.

A Code Table for Key-Value pairs MUST include the following attribute:

- `entries`

  The "entries" attribute is a map of key-value pairs, where the key is the
  input value (the source) and the value is the output value (the product).

```json
{
   "entries":{
      "AFG":"AF", "ALB":"AL", "DZA":"DZ", "ASM":"AS", "AND":"AD",
      "AGO":"AO", "AIA":"AI", "ATA":"AQ", "ATG":"AG", "..."
   }
}
```

_Example 22. Code snippet for a Code Table for Key-Value pairs, providing a mapping from, in this case, three-character to two-character ISO country codes._

## References

### Normative References

<dl>
<dt id="ref-SAID">
    [SAID]
</dt>
<dd>

Smith, S. Self-Addressing IDentifier (SAID) (2022) [ https://datatracker.ietf.org/doc/html/draft-ssmith-said ](https://datatracker.ietf.org/doc/html/draft-ssmith-said)

</dd>
</dl>

### Informative References

<div>
<dl>

<dt id="ref-BIPM">
[BIPM]
</dt>
<dd>

Bureau International des Poids et Mesures (BIPM). The International System of Units (SI) [https://www.bipm.org/en/measurement-units](https://www.bipm.org/en/measurement-units)

</dd>

<dt id="ref-FAIR2016">
[FAIR2016]
</dt>
<dd>

Wilkinson, M. et al. The FAIR Guiding Principles for scientific data management and stewardship (2016) [ https://www.nature.com/articles/sdata201618](https://www.nature.com/articles/sdata201618)

</dd>

<dt id="ref-IANA">
[IANA]
</dt>
<dd>

Internet Assigned Numbers Authority (IANA) [https://www.iana.org/](https://www.iana.org/)

</dd>

<dt id="ref-IEC">
[IEC]
</dt>
<dd>

International Electrotechnical Commission (IEC) [https://iec.ch/homepage](https://iec.ch/homepage)

</dd>

<dt id="ref-ISO">
[ISO]
</dt>
<dd>

International Organization for Standardization (ISO) [https://www.iso.org/home.html](https://www.iso.org/home.html)

</dd>

<dt id="ref-ISO639">
[ISO639]
</dt>
<dd>

ISO 639-1:2002, Codes for the representation of names of languages — Part 1: Alpha-2 code (2019) [https://www.iso.org/standard/22109.html](https://www.iso.org/standard/22109.html)

</dd>

<dt id="ref-ISO3166">
[ISO3166]
</dt>
<dd>

ISO 3166-1:2020, Codes for the representation of names of countries and their subdivisions — Part 1: Country code (2020) [https://www.iso.org/standard/72482.html](https://www.iso.org/standard/72482.html)

</dd>

<dt id="ref-ISO8601">
[ISO8601]
</dt>
<dd>

ISO 8601:2019, Date and time format (2019) [https://www.iso.org/iso-8601-date-and-time-format.html](https://www.iso.org/iso-8601-date-and-time-format.html)

</dd>

<dt id="ref-ISO10646">
[ISO10646]
</dt>
<dd>

ISO/IEC 10646:2020, Information technology — Universal coded character set (UCS) (2020) [https://www.iso.org/standard/76835.html](https://www.iso.org/standard/76835.html)

</dd>

<dt id="ref-ITU">
[ITU]
</dt>
<dd>

International Telecommunication Union (ITU) [https://www.itu.int/en/Pages/default.aspx](https://www.itu.int/en/Pages/default.aspx)

</dd>

<dt id="ref-KAN2020">
[KAN2020]
</dt>
<dd>

Knowles, P., Klingenstein, K., Wunderlich, J. Blinding Identity Taxonomy (BIT), Version 1.0 (2020, Kantara Initiative) [https://docs.kantarainitiative.org/Blinding-Identity-Taxonomy-Report-Version-1.0.pdf](https://docs.kantarainitiative.org/Blinding-Identity-Taxonomy-Report-Version-1.0.pdf)

</dd>

<dt id="ref-REGEX">
[REGEX]
</dt>
<dd>

DOCS.RS, Crate RegEx (Regular Expression), Version 1.6.0 [ https://docs.rs/regex/latest/regex/#syntax](https://docs.rs/regex/latest/regex/#syntax)

</dd>

<dt id="ref-RFC0020">
[RFC0020]
</dt>
<dd>

Cerf, V. ASCII format for network interchange, STD 80, RFC 20, DOI 10.17487/RFC0020 (October 1969) [https://www.rfc-editor.org/info/rfc20](https://www.rfc-editor.org/info/rfc20)

</dd>

<dt id="ref-RFC2119">
[RFC2119]
</dt>
<dd>

Bradner, S. Key words for use in RFCs to Indicate Requirement Levels, BCP 14, RFC 2119, DOI 10.17487/RFC2119 (March 1997) [https://www.rfc-editor.org/rfc/rfc2119](https://www.rfc-editor.org/rfc/rfc2119)

</dd>

<dt id="ref-RFC2781">
[RFC2781]
</dt>
<dd>

Hoffman, P., Yergeau, F. UTF-16, an encoding of ISO 10646, RFC 2781, DOI 10.17487/RFC2781 (February 2000) [ https://www.rfc-editor.org/info/rfc2781](https://www.rfc-editor.org/info/rfc2781)

</dd>

<dt id="ref-RFC4648">
[RFC4648]
</dt>
<dd>

Josefsson, S. The Base16, Base32, and Base64 Data Encodings, RFC 4648, DOI 10.17487/RFC4648 (October 2006) [https://www.rfc-editor.org/info/rfc4648](https://www.rfc-editor.org/info/rfc4648)

</dd>

<dt id="ref-RFC5234">
[RFC5234]
</dt>
<dd>

Crocker, D., Ed., Overell, P. Augmented BNF for Syntax Specifications: ABNF, RFC 5234 (January 2008) [https://datatracker.ietf.org/doc/html/rfc5234](https://datatracker.ietf.org/doc/html/rfc5234)

</dd>

<dt id="ref-UNICODE">
[UNICODE]
</dt>
<dd>

Unicode [https://home.unicode.org/](https://home.unicode.org/)

</dd>

</dl>
</div>


### Appendix A. List of supported codes for SAID

| Code | Algorithm | Total Lenght | Padding|
|------|------------|----------|--|
| E	| Blake3-256 Digest	|	44 | 0x00
| F	| Blake2b-256 Digest|	44 | 0x00
| G	| Blake2s-256 Digest|	44 | 0x00
| H	| SHA3-256 Digest	  |	44 | 0x00
| I	| SHA2-256 Digest	  |	44 | 0x00
