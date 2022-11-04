---
sidebarDepth: 5
description: Official OCA specification
---
# OCA Technical Specification
<dl>
  <dt>
Latest published version:
  </dt>
<dd>

[https://oca.colossi.network/specification/](https://oca.colossi.network/specification/) ([Download as PDF](https://humancolossus.foundation/s/HCF-Overlays-Capture-Architecture-OCA-v1.pdf))
</dd>
  <dt>
Author:
  </dt>
<dd>

Paul Knowles ([ Human Colossus Foundation ](https://humancolossus.foundation/))
</dd>
  <dt>
Editors:
  </dt>
<dd>

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
Human Colossus Foundation, EUPL v1.2 licence.
</dd>
  <dt>
Governance:
  </dt>
<dd>

The Decentralised Semantics Working Group maintains the OCA specification at [ Human Colossus Foundation ](https://humancolossus.foundation). Comments regarding this specification can be provided as issues on the official [ OCA Github ](https://humancolossus.).
</dd>
  <dt>
Contact:
  </dt>
<dd>

[ contact@humancolossus.org ](mailto:contact@humancolossus.org)
</dd>
</dl>

::: warning Disclaimer
Strictly following DDE Principle 1.4 \[[HCF2022](#ref-HCF2022)\], OCA schema objects MUST be resolvable solely upon the encoded cryptographic digest of their content to ensure objectual integrity. 

All code snippets in this version of the document are in JavaScript Object Notation (JSON) \[[ISO21778](#ref-ISO21778)\] format. However, any serialisation format applies as long as all OCA objects have proper semantics.
:::


## Introduction
_This section is non-normative._

### How does OCA work?
OCA is based on the FAIR data principles \[[FAIR2016](#ref-FAIR2016)\], a set of guiding principles to make data findable, accessible, interoperable, and reusable, to enable scientific data management and stewardship, and to be relevant to all digital economy stakeholders.

OCA represents transient objects (domain-agnostic) and persistent schemas (domain-specific) as multi-dimensional objects consisting of a stable capture base and interoperable overlays. By introducing overlays as linked task-specific objects within the schema stack, the architecture offers an optimal level of efficiency and interoperability in alignment with FAIR principles.

#### What is a Capture Base?
A Capture Base is the purest and simplest form of a schema, defining the structural characteristics of a dataset. It is the foundational layer upon which to bind task-specific objects to enhance the meaning of inputted data.

#### What are Overlays?
Overlays are task-specific objects that provide cryptographically-bound layers of definitional or contextual metadata to a Capture Base. Any actor interacting with a published Capture Base can use Overlays to transform how inputted data and metadata are displayed to a viewer or guide an agent in applying a custom process to captured data.

## OCA object types

An OCA object is either a Capture Base or a task-specific Overlay with a deterministic relationship to a Capture Base. When amalgamated as a Bundle, OCA objects provide the necessary structural, definitional, and contextual information to determine the meaning of inputted data at the time of data capture.

### Capture Base 
A Capture Base is a stable base object that defines a single dataset in its purest form, providing a structural base to harmonise data. The object defines attribute names and types. It also contains a flagging block that allows schema issuers to mark potentially dangerous attributes that may capture identifying information about entities (i.e., personally identifiable information (PII) or quasi-identifiable information (QII)). Once flagged, all corresponding data can be treated as high-risk throughout the data lifecycle and encrypted or removed at any stage, reducing the risk of re-identification attacks against blinded datasets.

The Capture Base consists of the following attributes:
- [ Type ](#type)
- [ Classification ](#classification)
- [ Attributes ](#attributes)
- [ Flagged attributes ](#flagged-attributes)

```json
{
   "type":"spec/capture_base/1.0",
   "classification":"GICS:45102010",
   "attributes":{
      "dateOfBirth":"DateTime",
      "documentNumber":"Text",
      "documentType":"Array[Text]",
      "fullName":"Text",
      "height":"Numeric",
      "issuingState":"Text",
      "photoImage":"Binary",
      "sex":"Text"
   },
   "flagged_attributes":[
      "documentNumber",
      "fullName",
      "dateOfBirth",
      "photoImage"
   ]
}
```
_Example 1. Code snippet for a Capture Base._

#### Type
The `type` attribute identifies the schema object type.

```abnf
type = "spec/capture_base/" sem_ver
sem_ver = DIGIT "." DIGIT
```
 _Listing: ABNF core rules \[[RFC5234](#ref-RFC5234)\]_

#### Classification
The "classification" attribute is for capturing a standardised classification scheme and taxonomy code to identify the primary sector, area, or topic of a published schema's intended use. Taxonomy codes provide a means for classifying schemas into groupings according to similar functions, markets, products, or services, ultimately leading to better search results for users interested in different categories.

Note: All classification schemes are supported. RECOMMENDED schemes include the Global Industry Classification Standard (GICS) \[[GICS](#ref-GICS)\] for industry sector classification and the Sustainable Development Goals (SDGs) \[[UNSDG](#ref-UNSDG)\] for the categorisation of humanitarian advocacy and outreach activities.

```abnf
classification = taxonomy ":" identifier
taxonomy = 1*( ALPHA / DIGIT / "-" )
identifier = 1*( ALPHA / DIGIT / "-" / "." )
```
_Listing: ABNF core rules_

::: tip Example
 For the GICS classification: `"classification": "GICS:10101010"`

 For the SDG classification: `"classification": "SDG:1.1"`
:::

#### Attributes
The "attributes" attribute maps key-value pairs where the key is the attribute name and the value is the attribute type.

##### Attribute name
An attribute name is a string that uniquely identifies an attribute within an OCA layer and is used to reference that attribute by other layers throughout the OCA bundle.

##### Attribute type
An attribute type determines the attribute's syntax and how attributes of that type are compared and sorted. A Capture Base recognises seven core data types:

- __Text__: a data type that defines a human-readable sequence of characters and the words they form, subsequently encoded into computer-readable formats such as ASCII \[[RFC0020](#ref-RFC0020)\].
- __Numeric__: a data type that defines anything relating to or containing numbers. Examples of numeric data types include 8-byte integers, fixed precision and scale numeric data, floating precision number data, integer (whole number) data, and monetary data values.
- __Reference__: a data type that defines a Self-Addressing IDentifier (SAID) \[[SAID](#ref-SAID)\] that references a set of attributes through its associated parent. For example, the reference data type enables the development of nested data objects, where the organisation of information is in layers or where objects contain other similar objects. SAID is an identifier that is deterministically generated from and embedded in the content it identifies, making it and its data mutually tamper-evident.
- __Boolean__: a data type where the data only has two possible variables: true or false. In computer science, Boolean is an identification classifier for calculating logical truth values and algebraic variables.
- __Binary__: a data type that defines a binary code signal, a series of electrical pulses representing numbers, characters, and performed operations. Based on a binary number system, each digit position represents a power of two (e.g., 4, 8, 16, etc.). A set of four binary digits or bits in binary code represents each decimal number (0 to 9). Each digit has two possible states: off and on (usually symbolised by 0 and 1). Combining basic Boolean algebraic operations on binary numbers makes it possible to represent each of the four fundamental arithmetic operations of addition, subtraction, multiplication, and division.
- __DateTime__: a data type that defines the number of seconds or clock ticks that have elapsed since the defined epoch for that computer or platform. Common formats include dates (e.g., YYYY-MM-DD), times (e.g., hh:mm:ss), dates and times concatenated (e.g., `YYYY-MM-DDThh:mm:ss.sss+zz:zz`), and durations (e.g., `PnYnMnD`). 

  Note: The ISO 8601 \[[ISO8601](#ref-ISO8601)\] date and time format is the RECOMMENDED representation format for the dateTime data type, in which the Unix epoch is `1970-01-01T00:00:00Z`.

  :::tip For the Unix epoch example:
  Data type: `DateTime`<br>
  Character encoding: `UTF-8` (default)<br>
  Standard: `ISO 8601`<br>
  Format: `YYYY-MM-DDThh:mm:ssZ`
  :::
- __Array[data type]__: a data type that defines a structure that holds several data items or elements of the same data type. When you want to store many pieces of data that are related and have the same data type, it is often better to use an array instead of many separate variables (e.g., `Array[Text]`, `Array[Numeric]`, etc.).
 
#### Flagged attributes
Any attributes defined in a Capture Base that may contain identifying information about entities (i.e., personally identifiable information (PII) or quasi-identifiable information (QII)) can be flagged.

The Blinding Identity Taxonomy (BIT) \[[KAN2020](#ref-KAN2020)\] is a practical tool for any practitioner whose organisation has custody or control of a dataset containing identifiable information about entities, including a natural person, organisation, or device with signing capabilities that make that entity uniquely identifiable. For example, data protection officers and schema issuers can use the BIT to flag a list of elements which require cryptographic encoding to reduce the risk of identifying a data principal.

### Overlays
Overlays are cryptographically-linked objects that provide layers of task-oriented definitional or contextual information to a Capture Base. Any actor interacting with a published Capture Base can use Overlays to add metadata to the underlying object, transform how information is displayed to a viewer, or guide an agent in applying a custom process to captured data.

Overlays consist of the following attributes:
- [ Capture base ](#capture-base-1)
- [ Type ](#type-1)
- Overlay-specific attributes
  - See specific overlay types for more information.

#### Common attributes
##### Capture base
The `capture_base` attribute contains the SAID of the Capture Base to cryptographically anchor to that parent object.

##### Type
The `type` attribute identifies the schema object type.

```abnf
type = "spec/overlay/" overlay_name "/" sem_ver
overlay_name = ALPHA
sem_ver = DIGIT "." DIGIT
```
_Listing: ABNF core rules_

##### Language
The International Organization for Standardization (ISO) \[[ISO](#ref-ISO)\] has standardised two lists of language-related codes: the language codes called ISO 639-1 alpha-2 \[[ISO639](#ref-ISO639)\] codes ("Codes for the representation of names of languages") and ISO 3166-1 alpha-2 \[[ISO3166](#ref-ISO3166)\] codes ("Codes for the representation of names of countries"). Both consist of two letters. The language code is written in lowercase while the country code is written in uppercase. However, both ISO classifications may be combined to differentiate regional languages.

The `language` attribute MUST contain either the two-letter language code (lowercase) for a national language or the combined language (lowercase)/country (uppercase) code for a regional language or locale.

![Table 1](/images/spec-table1.png)
_Table 1. An example of ISO standard values for language and combined language/country codes._


#### Semantic Overlays
Semantic overlays provide contextual meaning to describe objects and their relationships.

![Fig 1](/images/spec-fig1.png)
_Figure 1. In a balanced network, semantic overlays determine the meaning and use of what is put in, taken in, or operated on by any process or system._

##### Character Encoding Overlay
A Character Encoding Overlay defines the process of assigning numbers to graphical characters, especially the written characters of human language, allowing them to be stored, transmitted, and transformed using digital computers. Character encoding using internationally accepted standards permits worldwide interchange of text in electronic form.

In addition to the `capture_base` and `type` attributes (see [Common attributes](#common-attributes)), the Character Encoding Overlay MAY include the following attributes:

 - `default_character_encoding`

    The "default_character_encoding" attribute specifies the default character encoding for the attributes contained in the parent Capture Base. 

    The most common default character set is UTF-8 \[[RFC3629](#ref-RFC3629)\], which accounts for 98% of all web pages in the World Wide Web and up to 100.0% for some languages, as of 2021.

- `attr_character_encoding`

    The `attr_character_encoding` attribute maps key-value pairs where the key is the attribute name and the value is the character encoding. 

    Any attributes contained in the `attr_character_encoding` attribute override the behaviour of the `default_character_encoding` attribute.
 
    There are many encoding standards including Base64 \[[RFC4648](#ref-RFC4648)\], UTF-8, and ASCII to name a few. Each standard has a purpose, and applications using those encoding standards expect to receive data compliant with that encoding standard. The most popular types of character encoding are ASCII and Unicode \[[UNICODE](#ref-UNICODE)\]. While ASCII is still supported by nearly all text editors, Unicode is more commonly used because it supports a larger character set. Unicode is often defined as UTF-8, UTF-16 \[[RFC2781](#ref-RFC2781)\], or UTF-32 \[[ISO10646](#ref-ISO10646)\], which refer to different Unicode standards.

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
      "capture_base":"EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis",
      "type":"spec/overlays/character_encoding/1.0",
      "default_character_encoding":"utf-8",
      "attribute_character_encoding":{
          "photoImage":"base64"
      }
    }

    ```
    _Example 2. Code snippet for a Character Encoding Overlay._

##### Format Overlay
A Format Overlay defines an input and display format for data fields. The data format enables conversion of the input buffer to the program variable and displays program variable data to form fields.

In addition to the `capture_base` and `type` attributes (see [Common attributes](#common-attributes)), the Format Overlay MUST include the following attribute: 

- `attribute_formats` 

  The "attribute_formats" attribute maps key-value pairs where the key is the attribute name and the value is the format.

The inputted format values are dependent on the following core data types as defined by the attribute types in the Capture Base:

- __Text__: The inputted format value for this core data type MAY be a regular expression  [REGEX], a sequence of characters that specifies a search pattern in text.

- __Binary__: The inputted format value for this core data type MAY be a MIME type registered with the Internet Assigned Numbers Authority (IANA) \[[IANA](#ref-IANA)\]

- __DateTime__: The inputted format value for this core data type MAY be a date and time representation as defined by ISO 8601, a standard for the worldwide exchange and communication of date and time-related data.

```json
{
   "capture_base":"EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis",
   "type":"spec/overlays/format/1.0",
   "attribute_formats":{
      "dateOfBirth":"YYYY-MM-DD",
      "documentNumber":"[A-Z0-9]{9}",
      "photoImage":"image/jpeg",
      "sex":"[A-Z]{1}"
   }
}
```
_Example 3. Code snippet for a Format Overlay._

##### Information Overlay 
_[language-specific object]_
 
An Information Overlay defines attribute field descriptions and usage notes to assist the data entry process or to add context to presented data.

In addition to the `capture_base`, `type`, and `language` attributes (see [Common attributes](#common-attributes)), the Information Overlay MUST include the following attribute:

- `attribute_information`

  The `attribute_information` attribute maps key-value pairs where the key is the attribute name and the value is the informational prose in a specific language.

```json
{
   "capture_base":"EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis",
   "type":"spec/overlays/information/1.0",
   "language":"en",
   "attribute_information":{
      "dateOfBirth":"Holder’s date of birth as recorded by the issuing State or organization.",
      "documentNumber":"Unique identification number of the document.",
      "documentType":"The word for "passport" in the language of the issuing State or organization.",
      "fullName":"Full name of the passport holder.",
      "height":"Recorded height of the passport holder.",
      "issuingState":"Name of the State or organization responsible for issuing the passport.",
      "photoImage":"Portrait image of the passport holder.",
      "sex":"Sex of the passport holder."
   }
}
```
_Example 4. Code snippet for an Information Overlay (language: en)._

##### Label Overlay 
_[language-specific object]_
 
A Label Overlay defines attribute and category labels. For example, for an attribute named `dateOfBirth`, you may wish to display the label as `Date of birth`, which is more meaningful and user-friendly when displayed to an end user in places such as form inputs and error messages.

In addition to the `capture_base`, `type`, and `language` attributes (see [Common attributes](#common-attributes)), the Label Overlay MUST include the following attribute:

- `attribute_labels`

  The `attribute_labels` attribute maps key-value pairs where the key is the attribute name and the value is a human-meaningful attribute label in a specific language.

and MAY include the following attributes:

- `attribute_categories` 

  The `attribute_categories` attribute contains category identifiers.

- `category_labels `

  The `attribute_categories` attribute maps key-value pairs where the key is the attribute name and the value is a human-meaningful category label in a specific language.

```json
{
   "capture_base":"EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis",
   "type":"spec/overlays/label/1.0",
   "language":"en",
   "attribute_labels":{
      "dateOfBirth":"Date of birth",
      "documentNumber":"Passport Number",
      "documentType":"Document",
      "fullName":"Name",
      "height":"Height",
      "issuingState":"Issuing State or organization (in full)",
      "photoImage":"Portrait image",
      "sex":"Sex"
   },
   "attribute_categories":[
      "_cat-1_",
      "_cat-2_",
      "_cat-3_",
      "_cat-4_"
   ],
   "category_labels":{
      "_cat-1_":"Mandatory header",
      "_cat-2_":"Mandatory personal data elements",
      "_cat-3_":"Mandatory identification feature",
      "_cat-4_":"Optional data elements"
   }
}
```
_Example 5. Code snippet for a Label Overlay (language: en)._

##### Meta Overlay 
_[language-specific object]_
 
A Meta Overlay defines any language-specific information about a schema. It is used for discovery and identification and includes elements such as the schema name and description.

In addition to the `capture_base`, `type`, and `language` attributes (see [Common attributes](#common-attributes)), the Meta Overlay SHOULD include the following attributes:

- `name` 

  The `name` attribute contains the name of the schema in a specific language.

- `description `

  The `description` attribute contains a description of the schema in a specific language.

and MAY include other attributes at the discretion of the overlay producer, such as an "affiliation" attribute in the example below. How the overlay producer conveys the purpose of the additional attributes in the Meta Overlay is outside the scope of this specification.

```json
{
   "capture_base":"EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis",
   "type":"spec/overlays/meta/1.0",
   "language":"en",
   "name":"Digital Passport",
   "description":"An example of a Digital Passport schema",
   "affiliation":"The Government of Antarctica"
}
```
_Example 6. Code snippet for a Meta Overlay (language: en)._

##### Standard Overlay 
A Standard Overlay defines a documented agreement or technical specification published by a standards organisation used to represent, format, define, structure, tag, transmit, manipulate, use, and manage data.

In addition to the `capture_base` and `type` attributes (see [Common attributes](#common-attributes)), the Standard Overlay MUST include the following attribute:

- `attr_standards` 

  The `attr_standards` attribute maps key-value pairs where the key is the attribute name and the value is the standard.

There are many international standards organisations establishing tens of thousands of standards covering almost every conceivable topic. The three largest and most well-established standards organisations are the International Organization for Standardization (ISO), the International Electrotechnical Commission (IEC) \[[IEC](#ref-IEC)\], and the International Telecommunication Union (ITU) \[[ITU](#ref-ITU)\]. Standards tend to contain the acronym of the standards organisation followed by an internal document identifier.

```json
{
   "capture_base":"EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis",
   "type":"spec/overlays/standard/1.0",
   "attr_standards":{
      "dateOfBirth":"ISO 8601"
   }
}
```
_Example 7. Code snippet for a Standard Overlay._


#### Inputs Overlays
Inputs overlays provide predefined inputs for data attestations.


![Fig 2](/images/spec-fig2.png)
_Figure 2. In a balanced network, inputs overlays determine what is put in, taken in, or operated on by any process or system._

##### Cardinality Overlay
A Cardinality Overlay defines the minimum and maximum number of values that an attribute can have. For a relationship, the cardinality interval specifies the minimum and maximum number of relationship targets.

In addition to the `capture_base` and `type` attributes (see [Common attributes](#common-attributes)), the Cardinality Overlay MUST include the following attribute:

- `attr_cardinality` 

  The `attr_cardinality` attribute maps key-value pairs where the key is the attribute name and the value is the cardinality interval.

The logic of cardinality intervals is as follows:

- `n` : The cardinality interval denotes exactly `n` entries;
- `n-` : The cardinality interval denotes a minimum of `n` entries;
- `n-m` : The cardinality interval denotes a minimum of `n` and maximum of `m` entries;
- `-m` : The cardinality interval denotes a maximum of `m` entries.

Note that `n` and `m` are positive integers.

```json
{
   "capture_base":"EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis",
   "type":"spec/overlays/cardinality/1.0",
   "attr_cardinality":{
      "documentType":"1-2"
   }
}
```
_Example 8. Code snippet for a Cardinality Overlay._
 
##### Conditional Overlay
A Conditional Overlay defines conditional expressions (or rules) that trigger specific computations or actions depending on whether, upon evaluation, programmer-defined Boolean expressions return true or false values. Met conditions can have a direct impact on data capture and data validation processes where, for example, expressions:

- MAY facilitate schema extensions;
- MAY enable schema abstractions;
- MAY activate validation processes.

In addition to the `capture_base` and `type` attributes (see [Common attributes](#common-attributes)), the Conditional Overlay MUST include the following attributes:

- `attribute_conditions `

  The `attribute_conditions` attribute maps key-value pairs where the key is the attribute name and the value is the conditional expression. 

  Expressions MAY contain placeholders to be substituted by values defined by the `attribute_dependencies` attribute.

  ```abnf
  conditional-statement = 1*conditional-expression
  conditional-expression = equality-relational / equality-relational logical-operator
  equality-relational = equality-expression / relational-expression
  logical-operator = *SP ("&&" / "||") *SP
  equality-expression = assignment eql-op assignment
  eql-op = "=="/ "!="
  relational-expression  = assignment relational-op assignment
  relational-op = "<" / ">" / "<=" / ">="
  assignment = *SP (ALPHA / DIGIT / "\${" DIGIT "}") *SP
  ```
  _Listing: ABNF core rules_ 

- `attribute_dependencies `

  The `attribute_dependencies` attribute maps key-value pairs where the key is the attribute name and the value is an array value which triggers the evaluation process of the conditional expression defined by the `attribute_conditions` attribute.

```json
{
  "capture_base":"EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis",
  "type":"spec/overlays/conditional/1.0",
  "attribute_conditions":{
      "height":"${0}=='PM'"
  },
  "attribute_dependencies":{
      "height":[
        "documentType"
      ]
  }
}
```
_Example 9. Code snippet for a Conditional Overlay. `${0}` is an integer placeholder that refers to a replacement value during the substitution process. The `attribute_dependencies` attribute provides that replacement value through an array of attributes. Therefore, the placeholder's integer value refers to an array index that points to the value. In other words, `documentType` is bound by the integer placeholder, which triggers the evaluation process of the expression._

##### Conformance Overlay
A Conformance Overlay indicates whether data entry for each attribute is mandatory or optional.

In addition to the `capture_base` and `type` attributes (see [Common attributes](#common-attributes)), the Conformance Overlay MAY include the following attributes:

- `attribute_conformance `

  The `attribute_conformance` attribute maps key-value pairs where the key is the attribute name and the value is the data entry conformance of the attribute, which is set to either `M` (mandatory) or `O` (optional).

```json
{
   "capture_base":"EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis",
   "type":"spec/overlays/conformance/1.0",
   "attribute_conformance":{
      "dateOfBirth":"M",
      "documentNumber":"M",
      "documentType":"M",
      "fullName":"M",
      "height":"O",
      "issuingState":"M",
      "photoImage":"M",
      "sex":"M"
   }
}
```
_Example 10. Code snippet for a Conformance Overlay._

##### Entry Code Overlay
An Entry Code Overlay defines the entry keys in a series of key-value pairs stored in a code table (also known as a "lookup table") or dataset. The key is a unique identifier that points to its associated value.


![Table 2](/images/spec-table2.png)
_Table 2. An example of how the values in an array of key-value pairs provided by an Entry Code Overlay subsequently define a set of pre-defined entry keys in a nested series of key-value pairs. The specified values are often standardised categorisation codes, valuable data inputs for statistical analysis, machine learning (ML), and artificial intelligence (AI) algorithms._

In addition to the `capture_base` and `type` attributes (see [Common attributes](#common-attributes)), the Entry Code Overlay MUST include the following attribute:

- `attribute_entry_codes `

  The `attribute_entry_codes` attribute maps key-value pairs where the key is the attribute name and the value is either:

  - a set of pre-defined entry keys for a nested series of key-value pairs; or

  - a SAID that references a code table from an external data source to retrieve an array of pre-defined entry keys for a nested series of key-value pairs. See [Code Tables](#code-tables) for more information on code tables.

```json
{
   "capture_base":"EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis",
   "type":"spec/overlays/entry_code/1.0",
   "attribute_entry_codes":{
      "documentType":[
         "PE",
         "PM"
      ],
      "issuingState":"EGyWgdQR9dW_I5oHlHBMoO9AA_eMeb2p3XzcCRCBbKCM",
      "sex":[
         "F",
         "M",
         "X"
      ]
   }
}
```
_Example 11. Code snippet for an Entry Code Overlay._
 
##### Entry Overlay
_[language-specific object]_
 
An Entry Overlay defines the entry values in a series of key-value pairs stored in a code table (also known as a "lookup table") or dataset. A value is either the identified data or a pointer to that data.


![Table 3](/images/spec-table3.png)
_Table 3. An example of how an Entry Overlay can leverage a set of pre-defined entry keys in a nested series of key-value pairs provided by an Entry Code Overlay to provide human-meaningful values in a specified national or regional language._

In addition to the `capture_base`, `type`, and `language` attributes (see [Common attributes](#common-attributes)), the Entry Overlay MUST include the following attribute:

- `attribute_entries`

  The `attribute_entries` attribute maps key-value pairs where the key is the attribute name and the value is either:

  - a set of pre-defined values in a nested series of key-value pairs that are human-meaningful and language-dependent where the entry keys are taken from an associated Entry Code Overlay; or

  - a SAID that references a code table from an external data source to retrieve an array of pre-defined values from a nested series of key-value pairs that are human-meaningful and language-dependent where the entry keys are taken from an associated Entry Code Overlay. See [Code Tables](#code-tables) for more information.

```json
{
   "capture_base":"EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis",
   "type":"spec/overlays/entry/1.0",
   "language":"en",
   "attribute_entries":{
      "documentType":{
         "PE":"DIPLOMATIC PASSPORT",
         "PM":"PASSPORT"
      },
      "issuingState":"Els6NxGvFfyL5aiBWR3j7YiaS7F4j4O-F0EIlZu-dO0g",
      "sex":{
         "F":"Female",
         "M":"Male",
         "X":"Unspecified"
      }
   }
}
```
_Example 12. Code snippet for an Entry Overlay (language: en)._

##### Unit Overlay
A Unit Overlay defines the units of measurement adopted by convention or law, used as a standard for measuring the same kind of quantitative data. The RECOMMENDED system to use is the International System of Units (SI) \[[BIPM](#ref-BIPM)\], French Système International d’Unités, an international decimal system of weights and measures derived from and extending the metric system of units. 

Adopted by the 11th General Conference on Weights and Measures (CGPM) in 1960, it is abbreviated SI in all languages. To date, the SI comprises seven base units: the meter (m), the kilogram (kg), the second (s), the ampere (A), the kelvin (K), the candela (cd) and the mole (mol).


![Fig 3](/images/spec-fig3.png)

_Figure 3. The seven defining constants of the SI._

In addition to the `capture_base` and `type` attributes (see [Common attributes](#common-attributes)), the Unit Overlay SHOULD include the following attribute:

- `metric_system`

  The `metric_system` attribute contains the acronym of the chosen system of units (a coherent system of units of measurement) used for defining attribute units.

and MUST include the following attribute:

- `attribute_units`

  The `attribute_units` attribute maps key-value pairs where the key is the attribute name and the value is a standard unit of measurement from a known metric system.

```json
{
   "capture_base":"EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis",
   "type":"spec/overlays/unit/1.0",
   "metric_system":"SI",
   "attribute_units":{
      "height":"cm"
   }
}
```
_Example 13. Code snippet for a Unit Overlay._


#### Transformation Overlays
Transformation overlays provide information to convert data from one format or structure to another, such as raw data to processed, or unstructured to structured.

##### Attribute Mapping Overlay
An Attribute Mapping Overlay defines attribute mappings between two distinct data models. Data mapping provides a preliminary step for data integration tasks, including data transformation or data mediation between a data source and a destination or consolidation of multiple databases into a single database and identifying redundant columns of data for consolidation or elimination.

```json
{
  "capture_base":"Ev_RaB-gIOn8VAB3sg40mINxjiYRxdLVQrgce0aZbFcc",
  "type":"spec/overlays/mapping/1.0",
  "attribute_mapping":{
    "first_name":"firstName",
    "last_name":"surname"
  }
}
```
_Example 14. Code snippet for an Attribute Mapping Overlay._

##### Entry Code Mapping Overlay
An Entry Code Mapping Overlay defines the entry key mappings between two distinct code tables or datasets.

```json
{
   "capture_base":"Ev_RaB-gIOn8VAB3sg40mINxjiYRxdLVQrgce0aZbFcc",
   "type":"spec/overlays/entry_code_mapping/1.0",
   "attr_entry_codes_mapping":{
      "country_code":[
         "AFG:AF",
         "ALB:AL",
         "DZA:DZ",
         "ASM:AS",
         "AND:AD",
         "AGO:AO",
         "AIA:AI",
         "ATA:AQ",
         "ATG:AG",
         "..."
      ]
   }
}
```
_Example 15. Code snippet for an Entry Code Mapping Overlay._

##### Subset Overlay
A Subset Overlay defines a customised version of a published schema containing a subset of source attributes, including their properties, types, codes, and relationship dependencies required for the information exchange.

```json
{
  "capture_base": "EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis",
  "type": "spec/overlays/subset/1.0",
  "attributes": [
    "dateOfBirth",
    "documentNumber",
    "documentType"
  ]
}
```
_Example 16. Code snippet for a Subset Overlay._

##### Unit Mapping Overlay
A Unit Mapping Overlay defines target units for quantitative data when converting between different units of measurement. Conversion of units is the conversion between different units of measurement for the same quantity, typically through multiplicative conversion factors (see [Code Table for Unit mappings](#code-table-for-unit-mappings) for more information on conversion factors) which change the measured quantity value without changing its effects. The process of conversion depends on the specific situation and the intended purpose. This may be governed by regulation, contract, technical specifications or other published standards.

In addition to the `capture_base` and `type` attributes (see [Common attributes](#common-attributes)), the Unit Mapping Overlay MUST include the following attributes:

- `metric_system` 

  The `metric_system` attribute contains the acronym of the chosen system of units (a coherent system of units of measurement) used for defining attribute units.

- `code_table` 

  The `code_table` attribute contains a SAID that references an external code table. See [Code Tables](#code-tables) for more information.

- `attr_units`

  The `attr_units` attribute maps key-value pairs where the key is the attribute name and the value is the desired unit of measurement.

```json
{
  "capture_base":"Ev_RaB-gIOn8VAB3sg40mINxjiYRxdLVQrgce0aZbFcc",
  "type":"spec/overlays/unit/1.0",
  "metric_system":"SI",
  "code_table":"E3YDLacdI1GSGWhHywzrb5B0hOL/9TYWBsUkXC8fA4EY",
  "attr_units":{
    "blood_glucose":"mg/dL"
  }
}
```
_Example 17. Code snippet for a Unit Mapping Overlay._

#### Presentation Overlays
Presentation overlays provide information to display digital documents at the application layer, including digital forms and credentials.

##### Layout Overlay
::: danger [Currently under review by Decentralised Semantics Working Group]
:::

A Layout Overlay defines presentation information required by an application to display a digital document, including a digital form or credential.

::: warning Disclaimer: 
Collaborators in several open communities have shown an interest in leveraging OCA’s "task-specific" ethos to work on new overlay types to ensure that data presentation (see [Presentation](#presentation)) is both extensible and interoperable. Deprecation of the Layout Overlay in favour of a more granular approach is likely in the future.
:::

##### Sensitive Overlay
A Sensitive Overlay defines attributes not necessarily flagged in the Capture Base that need protecting against unwarranted disclosure. For example, data that requires protection for legal or ethical reasons, personal privacy, or proprietary considerations.

In addition to the `capture_base` and `type` attributes (see [Common attributes](#common-attributes)), the Sensitive Overlay MUST include the following attribute:

- `attributes`

  The `attributes` attribute is an array of attributes considered sensitive.

```json
{
  "capture_base": "EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis",
  "type": "spec/overlays/sensitive/1.0",
  "attributes": [
    "sex"
  ]
}
```
_Example 19. Code snippet for a Sensitive Overlay_


### Bundle
An OCA Bundle contains a set of OCA objects consisting of a Capture Base and bound Overlays. An encoded cryptographic digest of the contained objects produces a deterministic identifier for the bundle. 

The following object types are REQUIRED in any OCA bundle to preserve the minimum amount of structural, definitional, and contextual information to capture the meaning of inputted data.

- Capture base
- Character encoding overlay
- Format overlay

The cardinality of several overlay types, particularly the language-specific ones (Entry, Information, Label, and Meta), can be multiple depending on the number of defined supported languages.

```
 EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis.json
├── E3SAKe0z83pfBnhhcZl19PGGKBheb35WeCJ3V6RdqwY8.json
├── Ejx0o0yuwp99vi0V-ssP6URZIXRMGj1oNKIZ1BXi4sHU.json
├── EZv1B5nNl4Rty8CXFTALhr8T6qXeO0CcKliM03sdrkRA.json
├── Eri3NLi1fr4QrKoFfTlK31KvWpwrSgGaZ0LLuWYQaZfI.json
├── EY0UZ8aYAPusaWk_TON8c20gHth2tvZs4eWh7XAfXBcY.json
├── E1mqEb4f6eOMgu5zR857WWlMUwGYwPzZgiM6sWRZkQ0M.json
├── ESEMKWoKKIf5qvngKecV-ei8MwcQc_pPWCH1FrTWajAM.json
├── EyzKEWuMs8kspj4r70_Lc8sdppnDx-hb9QqUQywjmDRY.json
├── EIGknekgJFqjgQ8ah2NwL8zNWbFrllvXVLqezgB6U3Yg.json
├── EgBxL29VsxoZso7YFirlMP334ZuC1mkel-lO7TxPxEq8.json
├── ED9PH0ZBaOci-nbnYfPgYZWGQdkyWxA-nW3REmB3vhu0.json
├── ElJEQGfAvfJEuB7JeNIcvmAPO2DIOaKkpkZyvxO-gQoc.json
├── EpW9bQGs0Lk6k5cJikN0Ep-DN6z29fwZIsbVzMBgTlWY.json
├── EIGj0LQKT9-6gCLV2QZVgi4YQZhrUl0-GKbN7sFTCSAI.json
├── EHDwC_Ucuttrsxh2NVptgBnyG4EMbG5D8QsdbeF9G9-M.json
└── meta.json
```
_Example 20. A representation of an OCA Bundle as a ZIP file containing a Capture Base (first row), multiple Overlays, and a metafile (meta.json) that provides key-value mappings between the file names and the names of the OCA object types. Apart from the metafile, each file name directly represents the encoded cryptographic digest of the file._

See [ Appendix A ](#appendix-a-an-example-of-metafile-content) for more information on the content of a metafile (`meta.json` in the above example).

If well-structured, the metadata in an OCA bundle can facilitate many ways for users to search for information, present results, and even manipulate and present information objects without compromising their integrity.

### Code Tables
A code table is an external dataset structured as either:
- an array of data; or 
- a map of key-value pairs.

A code table MUST be identifiable, verifiable, and resolvable by a SAID.

#### Code Table for Keys
A Code Table for Keys provides an anchor to a reusable dataset for a common purpose, such as a list of country codes. Therefore, this object MAY be a reference target in an Entry Code Overlay. See [Entry Code Overlay](#entry-code-overlay) for more information.

A Code Table for Keys MUST include the following attribute:

- `keys`

  The `keys` attribute is an array of pre-defined entry keys for a nested series of key-value pairs. A key is a unique identifier that points to an associated value.

```json
{
   "keys":[ "AF", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "..." ]
}
```
_Example 21. Code snippet for a Code Table for Keys, providing an anchor for, in this case, two-character ISO country codes._

#### Code Table for Key-Value pairs
A Code Table for Key-Value pairs provides a mapping of input values to output values.

A Code Table for Key-Value pairs MUST include the following attribute:

- `entries`

  The "entries" attribute is a map of key-value pairs, where the key is the input value (the source) and the value is the output value (the product).

```json
{
   "entries":{
      "AFG":"AF", "ALB":"AL", "DZA":"DZ", "ASM":"AS", "AND":"AD",
      "AGO":"AO", "AIA":"AI", "ATA":"AQ", "ATG":"AG", "..."
   }
}
```
_Example 22. Code snippet for a Code Table for Key-Value pairs, providing a mapping from, in this case, three-character to two-character ISO country codes._

#### Code Table for Unit mappings

A Code Table for Unit mappings provides a mapping of input units to output units for quantitative data.

The unit conversion process consists of the following steps:
1. Read source unit.
1. Read target unit.
1. Convert source unit to target unit.

Conversion between units is defined as follows:
```
Target unit = source unit * conversion factor + offset
```

Except when converting between temperature units, offset equals 0 in most cases. 

::: tip An example of Celsius to Kelvin conversion:
 1. Given 37 Celsius
 2. Expect Kelvin
 3. `37 * 1 + 273.15 = 310.15 K`
:::

::: tip An example of Celsius to Fahrenheit conversion:
 1. Given 37 Celsius
 2. Expect Fahrenheit
 3. `37 * 1.8 + 32 = 98.6 F`
:::

Implementers MAY find E.J. Roschke’s "Units and Unit Conversions" (2001) \[[ROS2001](#ref-ROS2001)\] a helpful resource for conversion factors. 

A Code Table for Unit mappings MUST include the following attribute:

- `entries`

  The `entries` attribute is a map of key-value pairs, where the key denotes the conversion from source to target (e.g., `m->mm` or `deg_c->deg_f`) and the value contains the conversion factor and the offset.

  All units and unit prefixes follow the "Data Protocols Lightweight Standards and Patterns for Data" \[[BER2013](#ref-BER2013)\] proposal for describing units associated with numeric quantities.

```json
{
   "entries":{
      "m->mm":{
         "cf":1000
      },
      "m->yd":{
         "cf":1.0936133
      },
      "deg_c->deg_f":{
         "cf":1.8,
         "o":32
      }
   }
}
```
_Example 23. Code snippet for a Code Table for Unit mappings._

Code Table for Unit mappings is in denormalised form, meaning that the conversion between units and unit prefixes is pre-defined for all standard unit conversions for maximum efficiency. 

## Basic concepts
_This section is non-normative._

Characters provide the essential elements required for written language in the physical world. In the digital world, stored sequences of bytes known as "data" represent these elements. However, without a system of interpretation, data has no inherent morphological, definitional, or contextual meaning. This interpretation is provided by "metadata", sets of data that provide meaning to any stored sequence of bytes.

OCA is a core utility architecture for capturing the metadata necessary to interpret and preserve the meaning of inputted data. In addition, the architecture introduces a comprehensive solution to support data validation, transformation, and presentation requirements throughout a data lifecycle.


![Fig 4](/images/spec-fig4.png)

_Figure 4. Universal OCA lifecycle._

### Capture
Data capture is the process of collecting structured and unstructured information electronically and converting it into data readable by a computer.

Data capture MAY involve Semantic, Inputs, and Presentation Overlays.
### Validation
Data validation is the process of checking the integrity, accuracy and structure of data before it is used for a business operation.

Data validation MAY involve Semantic and Inputs Overlays.
### Transformation
Data transformation is the process of converting data from one format to another, typically from the format of a source system into the required format of a destination system.

Data transformation MUST involve Transformation Overlays.
### Presentation
Data presentation is the process of using various graphical formats to visually represent the relationship between two or more data sets so that, based on the results, the reader or verifier can make an informed decision.

Data presentation MAY involve Semantic, Inputs, and Presentation Overlays.

## Conventions and Definitions
The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted when, and only when, they appear in all capitals, as described in RFC 2119 \[[RFC2119](#ref-RFC2119)\].

## References
### Normative References

<dl>
  <dt id="ref-ISO21778">
[ISO21778]
  </dt>
<dd>

ISO/IEC 21778:2017, Information technology — The JSON data interchange syntax (2017) [ https://www.iso.org/standard/71616.html ]( https://www.iso.org/standard/71616.html )
</dd>
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
  <dt id="ref-ISO21778">
[ISO21778]
  </dt>
<dd>

ISO/IEC 21778:2017, Information technology — The JSON data interchange syntax (2017) [ https://www.iso.org/standard/71616.html ]( https://www.iso.org/standard/71616.html )
</dd>

<dt id="ref-SAID">
[SAID]
</dt>
<dd>

Smith, S. Self-Addressing IDentifier (SAID) (2022) [ https://datatracker.ietf.org/doc/html/draft-ssmith-said ](https://datatracker.ietf.org/doc/html/draft-ssmith-said) 
</dd>

<dt id="ref-BER2013">
[BER2013]
</dt>
<dd>

Berkeley, A., Pollock, R., Smith, J. Data Protocols Lightweight Standards and Patterns for Data, Version 0.1 (2013) [http://dataprotocols.org/units/](http://dataprotocols.org/units/)
</dd>

<dt id="ref-BIPM">
[BIPM]
</dt>
<dd>

Bureau International des Poids et Mesures (BIPM). The International System of Units (SI) [https://www.bipm.org/en/measurement-units](https://www.bipm.org/en/measurement-units)
</dd>

<dt id="ref-BRU2019">
[BRU2019]
</dt>
<dd>

Brush, K. Digital ecosystem (2019)
[https://www.techtarget.com/searchcio/definition/digital-ecosystem](https://www.techtarget.com/searchcio/definition/digital-ecosystem)
</dd>

<dt id="ref-FAIR2016">
[FAIR2016]
</dt>
<dd>

Wilkinson, M. et al. The FAIR Guiding Principles for scientific data management and stewardship (2016) [ https://www.nature.com/articles/sdata201618](https://www.nature.com/articles/sdata201618 )
</dd>

<dt id="ref-GICS">
[GICS]
</dt>
<dd>

MSCI. The Global Industry Classification Standard (GICS®) [https://www.msci.com/our-solutions/indexes/gics](https://www.msci.com/our-solutions/indexes/gics)
</dd>

<dt id="ref-HCF2022">
[HCF2022]
</dt>
<dd>

Human Colossus Foundation. Principles of a Dynamic Data Economy (DDE), Version 1.0 (2022) [https://static1.squarespace.com/static/5ead4c8660689c348c80958e/t/62f288b25f9c364d7945e6eb/1660061875006/HCF+DDE+Principles+v1.0.0.pdf](https://static1.squarespace.com/static/5ead4c8660689c348c80958e/t/62f288b25f9c364d7945e6eb/1660061875006/HCF+DDE+Principles+v1.0.0.pdf)
</dd>

<dt id="ref-IANA">
[IANA]
</dt>
<dd>

Internet Assigned Numbers Authority (IANA) [https://www.iana.org/](https://www.iana.org/)
</dd>

<dt id="ref-ICAO">
[ICAO] 
</dt>
<dd>

International Civil Aviation Organization (ICAO) [https://www.icao.int/Pages/default.aspx](https://www.icao.int/Pages/default.aspx)
</dd>

<dt id="ref-ICAO9303">
[ICAO9303]
</dt>
<dd>

Doc 9303, Machine Readable Travel Documents, Eighth Edition - Part 3: Specifications Common to all MRTDs (2021) [https://www.icao.int/publications/Documents/9303_p3_cons_en.pdf](https://www.icao.int/publications/Documents/9303_p3_cons_en.pdf)
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

<dt id="ref-ISO7501">
[ISO7501]
</dt>
<dd>

ISO/IEC 7501-1:2008, Identification cards — Machine readable travel documents — Part 1: Machine-readable passport (2021) [https://www.iso.org/standard/45562.html](https://www.iso.org/standard/45562.html)
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

<dt id="ref-KNO2022">
[KNO2022]
</dt>
<dd>

Knowles, P., Mitwicki, R., Page, P. Decentralised semantics in distributed data ecosystems: Ensuring the structural, definitional, and contextual harmonisation and integrity of deterministic objects and objectual relationships (2022) [http://star.informatik.rwth-aachen.de/Publications/CEUR-WS/Vol-3249/paper4-OSS.pdf](http://star.informatik.rwth-aachen.de/Publications/CEUR-WS/Vol-3249/paper4-OSS.pdf)
</dd>

<dt id="ref-REGEX">
[REGEX]
</dt>
<dd>

DOCS.RS, Crate RegEx (Regular Expression), Version 1.6.0 [ https://docs.rs/regex/latest/regex/#syntax](https://docs.rs/regex/latest/regex/#syntax )
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

Hoffman, P., Yergeau, F. UTF-16, an encoding of ISO 10646, RFC 2781, DOI 10.17487/RFC2781 (February 2000) [ https://www.rfc-editor.org/info/rfc2781](https://www.rfc-editor.org/info/rfc2781 )
</dd>

<dt id="ref-RFC3629">
[RFC3629]
</dt>
<dd>

Yergeau, F. UTF-8, a transformation format of ISO 10646, STD 63, RFC 3629, DOI 10.17487/RFC3629 (November 2003) [https://www.rfc-editor.org/rfc/rfc3629](https://www.rfc-editor.org/rfc/rfc3629)
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

<dt id="ref-UN">
[UN]
</dt>
<dd>

United Nations [https://www.un.org/en/](https://www.un.org/en/)
</dd>

<dt id="ref-UNICODE">
[UNICODE]
</dt>
<dd>

Unicode [https://home.unicode.org/](https://home.unicode.org/)
</dd>

<dt id="ref-UNSDG">
[UNSDG]
</dt>
<dd>

United Nations. Sustainable Development Goals (SDGs) [https://sdgs.un.org/goals](https://sdgs.un.org/goals)
</dd>
</dl>
</div>


## Appendices

### Appendix A. An example of Metafile content

```json
{
  "files": {
    "[EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis] character_encoding": "E3SAKe0z83pfBnhhcZl19PGGKBheb35WeCJ3V6RdqwY8",
    "[EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis] conditional": "Ejx0o0yuwp99vi0V-ssP6URZIXRMGj1oNKIZ1BXi4sHU",
    "[EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis] conformance": "EZv1B5nNl4Rty8CXFTALhr8T6qXeO0CcKliM03sdrkRA",
    "[EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis] entry (en)": "Eri3NLi1fr4QrKoFfTlK31KvWpwrSgGaZ0LLuWYQaZfI",
    "[EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis] entry (fr)": "EY0UZ8aYAPusaWk_TON8c20gHth2tvZs4eWh7XAfXBcY",
    "[EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis] entry_code": "E1mqEb4f6eOMgu5zR857WWlMUwGYwPzZgiM6sWRZkQ0M",
    "[EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis] format": "ESEMKWoKKIf5qvngKecV-ei8MwcQc_pPWCH1FrTWajAM",
    "[EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis] information (en)": "EyzKEWuMs8kspj4r70_Lc8sdppnDx-hb9QqUQywjmDRY",
    "[EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis] information (fr)": "EIGknekgJFqjgQ8ah2NwL8zNWbFrllvXVLqezgB6U3Yg",
    "[EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis] label (en)": "EgBxL29VsxoZso7YFirlMP334ZuC1mkel-lO7TxPxEq8",
    "[EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis] label (fr)": "ED9PH0ZBaOci-nbnYfPgYZWGQdkyWxA-nW3REmB3vhu0",
    "[EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis] layout": "ElJEQGfAvfJEuB7JeNIcvmAPO2DIOaKkpkZyvxO-gQoc",
    "[EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis] meta (en)": "EpW9bQGs0Lk6k5cJikN0Ep-DN6z29fwZIsbVzMBgTlWY",
    "[EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis] meta (fr)": "EIGj0LQKT9-6gCLV2QZVgi4YQZhrUl0-GKbN7sFTCSAI",
    "[EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis] unit": "EHDwC_Ucuttrsxh2NVptgBnyG4EMbG5D8QsdbeF9G9-M",
    "capture_base-0": "EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis"
  },
  "root": "EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis"
}
```
