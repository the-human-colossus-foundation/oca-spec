
## Abstract
The post millennial generation has witnessed an explosion of captured data points which has sparked profound possibilities in both Artificial Intelligence (AI) and Internet of Things (IoT) solutions. This has spawned the collective realization that society’s current technological infrastructure is simply not equipped to fully protect personally identifiable information (PII) or to entice corporations to break down internal data silos, streamline data harmonization processes and ultimately resolve worldwide data duplication and storage resource issues.

The FAIR Data Principles are a set of guiding principles in order to make data findable, accessible, interoperable and reusable (Wilkinson et al., 2016). These principles provide guidance for scientific data management and stewardship and are relevant to all stakeholders in the current digital ecosystem.

In line with the FAIR principles, data harmonization and interoperability processes between internal departments and functions is a high priority for corporate organizations but the current cognitive framework available for data capture across all industry sectors is hampered by limitations to the foundational data object architecture.


## Status of This Document
This document is a specification of Overlays Capture Architecture. It has no official standing of any kind and does not represent the support or consensus of any standards organization.


## Introduction
### Overview
This section is non-normative.

Overlays Capture Architecture (OCA) is a solution for data capture with a built- in mechanism to protect Personal Identifiable Information (PII) data and provides a means for data harmonization from the moment of inputting the data into the system.

A schema, a machine-readable definition of the semantics of a data structure, is typically created as a single data object. However, OCA represents a schema as a multi-dimensional object consisting of a stable capture base and linked overlays, data objects that provide additional extensions, coloration, and functionality to the base object. Any sponsor can use a pre-existing capture base and build their own suite of linked overlays to add extra context to transform how information is displayed to a viewer or to guide an agent in how to apply a custom process to schema data.

OCA was primarily devised for data object interoperability and privacy compliant data sharing. The architecture promises to significantly enhance the ability to pool data more effectively in terms of simplicity, accuracy, and allocation of resources. The degree of separation between capture bases and overlays allows multiple parties to use the same base objects for similar data capture requirements thus providing a standard base from which to decentralize data.


### Benefits
This section is non-normative.

OCA offers many advantages, including:

- Data pooling. Decoupling can occur at any time as overlays are linked objects. With all coloration stored in the overlays, combining data from related sources becomes much easier. Overlays can be removed from the base objects before the data merging process begins and reapplied to ensure consistent coloration post data pooling.
- Stable capture bases. Most schema updates tend to be done at the application stage. In the case of OCA, all extension, coloration, and functionality definitions are applied in the overlays. This enables issuers to edit one or more of the linked objects to create simple updates rather than having to reissue capture bases on an ongoing basis.
- Flagged attributes for encryption. Using the Blinding Identity Taxonomy (BIT) as a reference, issuers can flag attributes in the capture base that could potentially unblind the identity of a governing entity. With attributes flagged at the base object layer, all corresponding data can be treated as sensitive throughout the data lifecycle and encrypted or removed at any stage making associated entity identification impossible.
- Data decentralization. Capture base definitions can remain in their purest form thus providing a standard base from which to decentralize data. Once the data holder has given adequate consent, data controllers can contribute anonymous data to decentralized data sharing hubs upon which 3rd parties can trigger accurate criteria searches for matched data. This eliminates the need for data silos and encourages consented data sharing. The data holder is empowered by self-determination regarding secondary use of their personal data.
- Internationalization. As character set encoding definitions are captured in a separate linked data object, a single report definition can contain different attribute forms for different languages available to users, based on a user’s locale and other language preferences.


### OCA characteristics

OCA is built to provide data harmonization architecture for Dynamic Data Economy (DDE). For that reason OCA strongly relies on security characteristics which are necessary to achieve authenticity. Each OCA object is equipped with a Self-Addressing Identifier (SAI) which is cryptographically bound to the content of the object. SAI assures immutability, it can be deterministically generated directly from the content and verified without need to interact with any service or provider. This approach promotes content-based networks where we care about what it is and not where it is, leading towards a more decentralized ecosystem.


## OCA object

Each OCA object is defined by its `type` which is represented as [SAI](https://github.com/WebOfTrust/said).
`type` defines the structure of the objects (e.g. which attributes are mandatory, what metadata can be found etc.) according to referenced specification. `type` SAI are resolvable resources which can serve as validation mechanisms to underlying structure. `type` object is template


Currently recognize types by official specification:
- `capture_base/1.0`
- `overalys/meta/1.0`
- `overlays/character_encoding/1.0`
- `overlays/entry_code/1.0`
- `overlays/formating/1.0`
- `overlays/label/1.0`
- `overlays/mapping/1.0`
- `overlays/information/1.0`

## Capture base

A capture base is a stable base object that defines a single set of data in its purest form thus providing a standard base from which to decentralise data.

Attribute names and types are defined in the capture base. The construct also contains a blinding block which allows the issuer to flag any attributes that could potentially unblind the identity of a governing entity. With these attributes flagged at the base layer, all corresponding data can be treated as sensitive throughout the data lifecycle and encrypted or removed at any stage thus reducing the risk of identifying governing entities in blinded datasets.


Example using json serialization format:

```json
{
  "type": "102d1290jd1290jd10921d902j1d029jd1290dj/spec/capture_base/1.0",
  "classification": "GICS:35102020",
  "attributes": {
    "EQ5D01": "Text",
    "EQ5D02": "Text",
    "EQ5D03": "Text",
    "EQ5D04": "Text",
    "EQ5D05": "Text",
    "EQVAS": "Number"
  },
  "pii_attributes": []
}

```

Capture base MUST consist of:
- type attribute which using SAI to points to the version of OCA specification for capture base object.
- attributes - key, value list of attributes with its types. Supported types are:
	- string - any text data representation
  - numeric - any number representation
  - dateTime - data and time representation
  - boolean - boolean value representation
  - binary - any binary data
  - array - list of any other types
  - object - data object
  - reference - SAI pointing to another object

Notice types are not treated as typical `types` in programming languages, rather as a data types which capturing the meaning of the specific attribute.
The main purpose for the `capture base types` is to ensure that the data pooling is always solid.

Capture base SHOULD in addition consist of:
- flagged_attributes - an array with list of the attributes which should be flagged as sensitive
- classification: an array with one or more classification codes, which can identify the context of the captured data. E.g. GICS code.


## Overlays
### Introduction
A linked object that provides an extra layer of contextual and/or conditional information to a capture base. Overlays can be used by an issuer or viewer to transform how information is displayed to a viewer or to guide a verifier or holder in how to apply a custom process to schema data.

The purpose of the Overlay is introduce dynamic properties to static capture base. All overlays are linked back to the capture base via SAI assuring about the immutability and providing base for secure attribution.

### Core overlays
Core overlays are the overlays which are mandatory in certian conditions for each capture base. Core overlays are necessary for overall data harmonization and facilitiating unify data language.

#### Meta overlay

Meta overlay provide the mean to enrich schema with human readbale information about the capture base. It allows to provide internationalization for any capture base object.

Meta overlay MUST consist of:

- type attribute which using SAI to points to the version of OCA specification for encoding overlay object.
- capture_base - SAI of capture base object to which overlay applies
- language - ISO code of the language used for human readable values
- name - human readable name of the capture base
- description - human readable description of the capture base

Example using json serialization format:
```json
{
   // the object type - defining object type via SAI
   "type": "102jd1082jd10892jd1029jd1029jd1902j/spec/overlay/meta/1.0",
   // the linking identifier for the capture base
   "capture_base": "5vLMW87oJu5wzQPDtQmD2PQ5auPBxneiMKtW7Yck6hsH",
   // specified language
   "language": "en_US",
   "name": "Driving License",
   "description": "Driving license schema used in UE, official ISO standard 1234567"
 }
```

#### Character encoding overlay
An Character encoding overlay is used to define character set encoding (e.g. UTF-8, ISO-8859-1, Windows-1251, Base58Check, etc.) used to capture input data.

Character encoding overlay MUST consist of:

- type attribute which using SAI to points to the version of OCA specification for encoding overlay object.
- capture_base - SAI of capture base object to which overlay applies
- default_chracter_encoding - default character set encoding for all attributes if not specified individually

Character encoding overlay SHOULD consist of:

- attr_character_encoding - key, value list of attribute name and set encoding, overwriting default encoding specified in the object. This attribute is optional and should be used if there is a need to specify encoding on the attribute level.

Example using json serialization format:
```json
{
   // the object type - defining object type via SAI
   "type": "102jd1082jd10892jd1029jd1029jd1902j/spec/overlay/character_encoding/1.0",
   // the linking identifier for the capture base
   "capture_base": "5vLMW87oJu5wzQPDtQmD2PQ5auPBxneiMKtW7Yck6hsH",
   // default character set encoding used for all attributes if not specified
   "default_character_encoding": "utf-8",
   // defined character set encodings
   "attr_character_encoding": {
     "email": "utf-8",
     "firstname": "utf-8",
     "lastname": "utf-8",
     "salutation": "utf-8",
     "birthdate": "utf-8",
     "gender": "utf-8"
   }
 }
```

#### Entry Overlay
Entry Overlay is used to add predefined field values to schema attributes to avoid free form text fields. It is useful when schema is used as a capture form and interacts with human beings, to make sure that the data are entered correctly and help users to pick from existing values instead of typing free form text.

Entry overlay MUST consist of:

- type attribute which uses SAI to points to the version of OCA specification for encoding overlay object.
- capture_base - SAI of capture base object to which overlay applies
- language - ISO code of the language used for human readable values
- attr_entries - key, value object consisting of attribute identifier and it's default values in the form of an array.



Example using json serialization format:
```json
{
    // the object type - defining object type via SAI
    "type": "spec/overlay/entry/1.0",
    // the linking identifier for the capture base
    "capture_base": "5vLMW87oJu5wzQPDtQmD2PQ5auPBxneiMKtW7Yck6hsH",
    // specified language
    "language": "en_US",
    // defined entries
    "attr_entries": {
      "salutation": [
        "Mr",
        "Mrs",
        "Ms",
        "Mstr"
      ],
      "gender": [
        "Female",
        "Male"
      ]
    }
  }
```
#### Format overlay
Defines format of the data input.

Format overlay MUST consist of:

- type attribute which uses SAI to points to the version of OCA specification for encoding overlay object.
- capture_base - SAI of capture base object to which overlay applies
- attr_formats - key, value object consisting of attribute identifier and it's format.


Example using json serialization format:
```json
{
    // the object type - defining object type via SAI
    "type": "spec/overlay/entry/1.0",
    // the linking identifier for the capture base
    "capture_base": "hl:5vLMW87oJu5wzQPDtQmD2PQ5auPBxneiMKtW7Yck6hsH",
    // defined formats
    "attr_formats": {
      "birthdate": "DD/MM/YYYY"
    }
  }
```

#### Label overlay
Label overlay is used to add human readable labels to schema base attributes (incl. category labels).

Label overlay MUST consist of:

- type attribute which uses SAI to points to the version of OCA specification for encoding overlay object.
- capture_base - SAI of capture base object to which overlay applies
- language - ISO code of the language used for human readable values
- attr_labels - key, value object consisting of attribute identifier and it's human readbale label.
- attr_categories - an array with the category identifier "_cat-1_" etc.
- cat_lables - key, value object consisting of category identifier and its human readbale label
- cat_attributes - key, value object consisting of category identifier and an array with list of the attributes belonging to that category.

Example using json serialization format:

```json
{
    // the object type - defining object type via SAI
    "type": "spec/overlay/label/1.0",
    // the linking identifier for the capture base
    "capture_base": "5vLMW87oJu5wzQPDtQmD2PQ5auPBxneiMKtW7Yck6hsH",
    // specified language
    "language": "en_US",
    // defined attribute labels
    "attr_labels": {
      "email": "Email:",
      "firstname": "Given names:",
      "lastname": "Surname:",
      "salutation": "Preferred salutation:",
      "birthdate": "Date of birth:",
      "gender": "Sex:"
    },
    // defined categories
    "attr_categories": [
      "_cat-1_"
    ],
    // defined category labels
    "cat_labels": {
      "_cat-1_": "Personal"
    },
    // defined category attributes
    "cat_attributes": {
      "_cat-1_": [
        "email",
        "firstname",
        "lastname",
        "salutation",
        "birthdate",
        "gender"
      ]
    }
  }
```


### Optional Overlays

There is no limitation on how many and what types of the overlays could be applied within OCA. Here we collected optional overalays which are helpful in the process of data collection and data harmonization.

#### Mapping overlay
Mapping overlay maps OCA attributes into internal systems which are not compatible with OCA yet. Allows to bridge legacy system with new data harmonization approach.

Mapping overlay MUST consist of:
- type attribute which uses SAI to points to the version of OCA specification for encoding overlay object.
- capture_base - SAI of capture base object to which overlay applies
- att_mapping - key, value object consisting of attribute identifier and corresponding identifier in the legacy system.

Example using json serialization format:
```json
{
    // the object type - declaring the structure of the object
    "type": "spec/overlay/mapping/1.0",
    // the role of the main beneficiary of the overlay
   "capture_base": "5vLMW87oJu5wzQPDtQmD2PQ5auPBxneiMKtW7Yck6hsH",
    // defined mappings
    "attr_mapping": {
      "email": "EMAIL",
      "firstname": "FRSTNAME",
      "lastname": "LASTNAME",
      "salutation": "TITLE",
      "birthdate": "BRTHDTC",
      "gender": "SEX"
    }
  }
```
#### Information overlay
Information Overlay is used to add instructional, informational or legal prose to assist the data entry process.

Information overlay MUST consist of:
- type attribute which uses SAI to points to the version of OCA specification for encoding overlay object.
- capture_base - SAI of capture base object to which overlay applies
- language - ISO code of the language used for human readable values
- att_information - key, value object consisting of attribute identifier and human readbale information.


Example using json serialization format:
```json
{
    // the object type - declaring the structure of the object
    "type": "spec/overlay/information/1.0",
    // the linking identifier for the schema base
    "capture_base": "5vLMW87oJu5wzQPDtQmD2PQ5auPBxneiMKtW7Yck6hsH",
    // specified language
    "language": "en_US",
    // defined information
    "attr_information": {
      "email": "An email address.",
      "firstname": "A person's first (given) name.",
      "lastname": "A person's surname.",
      "salutation": "A person's desired salutation.",
      "birthdate": "A person's birthdate and optionally birthtime in RFC 3339 format.",
      "gender": "A person's gender."
    }
  }
```



#### Subset overlay
Subset overlay allows to create subset of capture base. E.g. limit the amount of attributes needed for specific use case without loosing the context of used schema base.
Example using json serialization format:
```json
{
    // the object type - declaring the structure of the object
    "type": "spec/overlay/subset/1.0",
    // the linking identifier for the schema base
    "capture_base": "hl:5vLMW87oJu5wzQPDtQmD2PQ5auPBxneiMKtW7Yck6hsH",
    // list of attributes to be included in the schema subset
    "attr_subset": [
      "firstname",
      "lastname"
    ]
  }
```
#### Unit Overlay
Stores information about unit used to capture the input data. E.g. kilometrs, metr, centimetrs etc.

Example using json serialization format:

Example using json serialization format:
```json
{
    // the object type - defining object type via SAI
    "type": "spec/overlay/unit/1.0",
    // the linking identifier for the capture base
    "capture_base": "5vLMW87oJu5wzQPDtQmD2PQ5auPBxneiMKtW7Yck6hsH",
    // defined units
    "attr_units": {
      "age": "days"
    }
  }
```

##. Security Considerations
This section is non-normative.

TODO

## Privacy Considerations
This section is non-normative.

TODO

