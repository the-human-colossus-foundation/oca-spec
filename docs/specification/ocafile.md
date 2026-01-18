---
sidebarDepth: 5
description: OCAFile specification
---

# OCAFile Technical Specification

<dl>
    <dt>
        Version:
    </dt>
    <dd>
        v2.0.0
    </dd>
  <dt>
      Latest published version:
  </dt>
  <dd>

  [https://oca.colossi.network/specification/ocafile](/specification/ocafile)

  </dd>
  <dt>
      Previous published version:
  </dt>
  <dd>

  [https://oca.colossi.network/specification/ocafile-v1.0.0](/specification/ocafile-v1.0.0)

  </dd>
</dl>
<dl>
  <dt>
Authors:
  </dt>
<dd>

Robert Mitwicki ([ Human Colossus Foundation ](https://humancolossus.foundation/))<br>
Michal Pietrus ([ ArgonAUTHs ](https://argonauths.eu/))

</dd>
  <dt>
Copyrights:
  </dt>
<dd>
Human Colossus Foundation, EUPL v1.2 licence.
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
examples, and notes in this specification, are for informational only
and are not mandatory for compliance. All other sections of this specification
are normative and define the required rules and standards that must be followed
to ensure conformity with the `OverlayFile` Specification.

The keywords "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD",
"SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this
document are to be interpreted when, and only when, they appear in all capitals,
as described in RFC 2119 \[[RFC2119](#ref-RFC2119)\].


## Introduction

_This section is informative_

This document introduces `OCAfile`, a long-term maintenance and authoring concept
for `OCA Bundles`. `OCAfile` defines a textual representation of OCA Bundles based
on a purpose-built Domain-Specific Language (DSL).

The `OCAfile` DSL is designed to support the creation, modification, and
maintenance of `OCA Bundles` in a deterministic, human-readable, and
tool-friendly manner. `OCAfiles` MAY be authored directly by individuals using
general-purpose text editors, or generated and managed by specialized tooling,
including graphical editors, which serialize their internal state into the
`OCAfile` syntax.

By providing a canonical, text-based representation, `OCAfile` aims to improve
long-term maintainability, version control integration, reproducibility, and
interoperability of `OCA Bundles` across tools and ecosystems.

## Purpose

_This section is informative_

The purpose of this specification is to define the `OCAfile` syntax for the
creation and maintenance of `OCA Bundles`.

The `OCAfile` syntax consists of text-based operations that are designed to be
both human-readable and machine-readable. The syntax prioritizes clarity,
composability, and determinism, enabling authors to express `OCA Bundle`
structure and semantics in a concise and unambiguous form.

By standardizing this syntax, the specification aims to facilitate consistent
`OCA Bundle` authoring across manual workflows and automated tooling, while
supporting long-term maintenance, review, and version control practices.


## Main characteristics

_This section is informative_

### Determinism Through Layered Architecture

`OCAfile` employs a deterministic, layered architecture based on an append-only
provenance log. Each operation applied to an `OCA Bundle` is recorded as a new
log entry, forming an immutable history of bundle evolution.

Each log entry is defined as:

```
digest(previous entry) | current entry
```
The cryptographic digest of this concatenation uniquely identifies the
resulting layer. As a consequence, each layer is deterministically derived from
all preceding layers.

Layer digests serve as vertices in a directed acyclic graph (DAG), enabling
unambiguous resolution and reuse of previously defined layers. This structure
allows newly constructed `OCA Bundles` to reference or implicitly benefit from
existing bundles when shared components—such as attribute definitions—are
identical. Determinism is therefore preserved across independent authoring
workflows.

### Text-Based Format

`OCAfile` uses a text-based representation to ensure readability, inspectability,
and ease of authoring. The textual format supports both manual editing and
automated generation without loss of semantic fidelity.

### Domain-Specific Language (DSL)

`OCAfile` defines a dedicated domain-specific language (DSL) that is both
human-readable and machine-readable. The DSL provides explicit constructs for
creating and modifying `OCA Bundles` while preserving deterministic layering
semantics.

The DSL is designed to support the full lifecycle of an `OCA Bundle`, enabling
incremental construction, modification, and long-term maintenance through
ordered operations.

### Version Control System Compatibility

As a text-based format, `OCAfile` is inherently compatible with version control
systems (VCS). This enables meaningful diffing, history tracking, branching,
and merging, which are not feasible with binary representations. VCS
compatibility supports collaborative development and long-term stewardship of
`OCA Bundles`.

## OCAfile DSL

### Grammar

_This section is informative_

This specification defines a formal grammar for `OCAfile`. The complete and
authoritative grammar definition is provided separately and SHALL be used as
the reference for parsing and validation. It can be found
[here](https://raw.githubusercontent.com/THCLab/oca-rs/refs/heads/v2/oca-file/src/ocafile.pest)

### Meta Directives

An `OCAfile` SHOULD declare meta directives at the beginning of the file. Meta
directives define descriptive metadata associated with the `OCAfile` itself.

Each meta directive:
- MUST appear before any non-directive content
- MUST terminate with a newline character
- MUST consist of a key-value pair in the following form:

```
-- directive=value
```
Both directive and value MUST match the regular expression:

```
[a-zA-Z0-9\-]+
```

### Supported Meta Directives

The following meta directives are defined by this specification:

- `name`: Defines a human-meaningful name for the OCAfile. This name MAY be used as
a named reference in conjunction with the refn prefix when defining references
(see References).
- `version`: Defines the version identifier of the OCAfile.

:::code-tabs

@tab OCAFILE
```
--name=passport-example
--version=2.0
ADD ATTRIBUTE dateOfBirth=DateTime documentNumber=Text $
               documentType=[ Text ] fullName=Text $
               height=Numeric issuingState=Text photoImage=Binary $
               sex=Text ocrTextLines=[[ Text ]]
```
:::

_Example 1. Code snippet presenting usage of meta directives name and version_

### Commands

All `OCAfile` commands are case-insensitive.

A command represents an operation applied to an `OCA Bundle`. Commands are used
to:

- Define the base OCA Bundle from which a new bundle is derived
- Add new objects
- Modify existing objects
- Remove existing objects

Commands are processed sequentially and contribute to the provenance log of the
`OCA Bundle`.

#### `FROM` Operation

The `FROM` operation is used to bootstrap an `OCAfile` from an existing `OCA Bundle`.
It establishes the base bundle upon which all subsequent commands operate.

```
FROM <SAID>
```

:::code-tabs

@tab OCAFILE (BMI)
```
--name=patient-bmi
# from patient.ocafile
FROM EJnT654wrORxfcNJ1yqVhqd0uRHihOSfepmB0OR1jPxf
ADD ATTRIBUTE wgt=Numeric hgt=Numeric

# Add meta data
ADD Overlay Meta
  language="en"
  name="Patient BMI"
  description="Standard 1 Patient BMI"

# Add character encoding
ADD Overlay CHARACTER_ENCODING
  attribute_character_encodings
    wgt="utf-8"
    hgt="utf-8"
```

@tab OCAFILE (Patient)
```
--name=patient
ADD ATTRIBUTE first_name=Text last_name=Text

# Add meta data
ADD Overlay Meta
  language="en"
  name="Patient Record"
  description="Standard 1 Patient record"

# Add character encoding
ADD Overlay CHARACTER_ENCODING
  attribute_character_encodings
    first_name="utf-8"
    last_name="utf-8"

ADD OVERLAY LABEL
  language="en"
  attribute_labels
    first_name="First Name"
    last_name="Last Name"
```
:::
_Example 2: OCAFILE presenting usage of FROM command_

- `<SAID>` identifies the base `OCA Bundle` using its Self-Addressing Identifier.

If present, the FROM command MUST be the first command in the OCAfile.

An `OCAfile` MAY omit the FROM command, in which case a new OCA Bundle is created
from an empty base.


#### `ADD` Operation

The `ADD` operation introduces new elements into the `OCA Bundle`.

```
ADD <ATTRIBUTE | OVERLAY>
```

Where:

-`ATTRIBUTE` adds one or more attributes to the capture base (see Attribute
Object).
- `OVERLAY` adds a new overlay to the `OCA Bundle` (see Overlay).

#### `ALTER` Operation

The `ALTER` operation modifies existing elements while preserving provenance.

```
ALTER <ATTRIBUTE | OVERLAY>
```

The targeted element `MUST` already exist in the `OCA Bundle`.

If the referenced element does not exist, the processor `MUST` raise an error.

Each `ALTER` operation results in a new layer in the provenance log.

#### `REMOVE` Operation

The `REMOVE` operation deletes an existing element from the `OCA Bundle`.

```
REMOVE <ATTRIBUTE | OVERLAY>
```

The targeted element `MUST` already exist in the `OCA Bundle`.

If the referenced element does not exist, the processor `MUST` raise an error.

Removal operations are recorded in the provenance log.

### Attribute Object

An Attribute object represents an attribute in the capture base. It defines the
attribute name and its associated type.

Example:
```
ADD ATTRIBUTE name=Text age=Numeric
```

### Attribute Types

Attribute types MUST be selected from the types defined by the OCA
specification.

### Primitive Types

The following primitive attribute types are supported as per [OCA
specification](/specification/readme.md#attribute-type):

- `Binary`: Represents binary values, such as images or encoded data.
- `Boolean`: Represents a boolean value (true or false).
- `DateTime`: Represents a date, time, or combined date-time value.
- `Numeric`: Represents any numeric value.
- `Text`: Represents arbitrary textual content.
- `Reference`: Reference to another object
- `[<data type>]`: Arrray of supported data type

### References

References are used to refer to other OCA objects.

The following reference types are defined:

- Named reference (`refn`) A human-readable reference that `MUST` use the following
form:
```
refn:<name>
```

The referenced name MUST be defined using the name meta directive.

SAID-based reference (`refs`) A cryptographic reference that MUST use the
following form:

```
refs:<OCA object SAID>
```

:::code-tabs

@tab OCAFILE
```
--name=patient-record
ADD ATTRIBUTE patient=refn:patient bmi=refs:EPFtQVmMXhqy8wj07JYPjfTc4zCyRsNRB7141nE22CaV date=DateTime author=Text

ADD OVERLAY META
  language="en"
  name="Patient record"
  description="Patient medical records with BMI calculation"

ADD OVERLAY LABEL
  language="en"
  attribute_labels
    patient="Patient"
    bmi="Body Mass Index"
    date="Date"
    author="Author"

ADD OVERLAY LABEL
  language="pl"
  attribute_labels
    patient="Pacjent"
    bmi="Wskaźnik BMI"
    date="Data"
    author="Autor"

```
:::

_Example 3: OCAFILE presenting usage of refs and refn as a linked object_

### Collection Types

Collection types allow the definition of ordered collections of elements.

The following collection type is defined:

```
Array[<Collection type> | <Primitive type> | <Reference>]
```

Collections MAY contain primitive types, references, or nested collection types.

## References

### Informative References

<dt id="ref-RFC2119">
[RFC2119]
</dt>
<dd>

Bradner, S. Key words for use in RFCs to Indicate Requirement Levels, BCP 14, RFC 2119, DOI 10.17487/RFC2119 (March 1997) [https://www.rfc-editor.org/rfc/rfc2119](https://www.rfc-editor.org/rfc/rfc2119)

</dd>

