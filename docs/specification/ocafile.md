---
sidebarDepth: 5
description: OCAFile specification
---

# OCAFile Technical Specification

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

## Introduction

_This section is informative_

This document proposes a novel OCA Bundle long-term maintenance concept: `OCAfile`. It is equipped with a Domain-Specific Language (DSL) to leverage OCA Bundles creation. With proposed DSL, `OCAfile's` can be created by individuals using any type of text editor, as well as by more tailored graphical editors that internally serialize their state into `OCAfile's` syntax.

## Purpose

_This section is informative_

Define OCAFile syntax to create OCA Bundles. Syntax consists of text-based operations that are pleasant to read and write and are at the same time, machine readable.

## Main characteristics

_This section is informative_

### Deterministic through layered architecture

The OCAfile benefits from the concept of versioning each new operation by building a provenance log of all commands. Recall that a provenance log is an append-only log that consists of items, where each new item is defined as follows: `digest(previous item) | current item`. Calculating the digest upon it gives the current item (layer) digest.

As digests determine layers, any new OCA Bundle construct might already benefit from a previously defined OCA Bundle. That is because both OCA Bundles might involve the same attribute names, for example. The directed acyclic graph keeps the layers in vertices (their digests). It ensures the unambiguous resolution of any layer.

### Text based format

The OCAfile remains text based for readability

### Pleasant DSL

The OCAfile relies on a domain-specific language (DSL) that is human and machine-readable to achieve deterministic layering. The DSL enables the creation and manipulation of the OCA Bundle during its lifetime.

### Version control system compliant

As opposed to binary files, text files enable meaningful changes control under a version control system (VCS).

## OCAfile DSL

OCAfile has the exhaustive grammar available [here](https://raw.githubusercontent.com/THCLab/oca-rs/main/oca-file/src/ocafile.pest).

### Preprocessor directives

Each OCAfile MAY have preprocessor directives defined at the beginning of each file. Preprocessor directives terminate with either a newline character or the command. They define additional metadata of the OCAfile. Each directive MUST consist of a key, followed by a value: `# directive=value`. Both must match `[a-zA-Z0-9\-]+` regular expression.

The OCAfile MUST support the following directives:

- The `escape` directive sets the character used to escape characters in an OCAfile. If not specified, the default escape character is `\`.
- The `newline` directive sets the line separation character in the OCAfile. If not specified, the default escape character is `\n`.

### Meta directives

Each OCAfile MAY have meta directives defined at the beginning of each file. Meta directives terminate with a newline character. They define additional metadata of the OCAfile. Each directive MUST consist of a key, followed by a value: `-- directive=value`. Both must match `[a-zA-Z0-9\-]+` regular expression.

- The `name` directive sets the human meaningful name of the OCAfile. It is a named reference to be used along with the `refn` prefix when defining references (see below for Reference).
- The `version` directive sets the version of the OCAfile.

### Commands

A `Command` is defined as:

```
[OPERATION] [OCA OBJECT] [ARGUMENTS]
```

`Command` MUST be case-insensitive. A `Command` starts from one of the keywords specified below and terminates with the `newline` character.

#### `Command` operation

- `ADD <ATTRIBUTE | FLAGGED_ATTRIBUTES | CLASSIFICATION | OCA OBJECT>` – adds the new element in the given object
- `ALTER <ATTRIBUTE | FLAGGED_ATTRIBUTES | CLASSIFICATION | OCA OBJECT>` – modifies existing elements to keep a provenance log of a specific attribute
- `REMOVE <ATTRIBUTE | FLAGGED_ATTRIBUTES | CLASSIFICATION | OCA OBJECT>` – removes element in a given object. If it does not exist, it must throw an error
- `FROM <SAID>` – sets the base `OCA Bundle` for subsequent instructions using its SAID. If in use, the command with `FROM` must be the first command in OCAFile.

#### `Command` support for OCA objects

The following OCA objects have the OCAFile equivalent:

- capture base
  - attributes management
  ```
  <Operation> ATTRIBUTE <Attribute Name>=<Attribute Type>
  ```
  - PII's management
  ```
  <Operation> FLAGGED_ATTRIBUTES <Attribute Name 1> <Attribute Name 2> <Attribute Name N>
  ```
  - Classification management
  ```
  <Operation> CLASSIFICATION <Classification Name>
  ```
- character-econding
  ```
  <Operation> CHARACTER_ENCODING ATTRS <Attribute Name>="<Encoding>"
  ```
- format
  ```
  <Operation> FORMAT ATTR <Attribute Name>="<Content Type>"
  ```
- label
  ```
  <Operation> LABEL <2-chars country code> ATTRS <Attribute Name>="<Localized Label>"
  ```
- meta
  ```
  <Operation> META <2-chars country code>
  PROPS
    description="<OCA Bundle description>"
    name="<Meaningful name of the Bundle>"
  ```
- cardinality
  ```
  <Operation> CARDINALITY ATTRS <Attribute Name>="<X-Y>"
  ```
- conformance
  ```
  <Operation> CONFORMANCE ATTRS <Attribute Name>="<M|O>"
  ```
  The default value is `O`.
- entry-code
  ```
  <Operation> ENTRY_CODE ATTRS <Attribute Name>=["Option 1", "Option 2", "Option N"]
  ```
- entry
  ```
  <Operation> ENTRY ATTRS <Attribute Name>={"Option 1": "Localized Label 1", "Option 2": "Localized Label 2", "Option N": "Localized Label N"}
  ```
- unit
  ```
  <Operation> UNIT <metric system> ATTRS <Attribute Name>="<Unit>"
  ```

#### Available attribute types

##### Primitive types

- `Binary`
- `Boolean`
- `DateTime`
- `Numeric`
- `Text`

##### Collection types

Collection types allow for the definition of arrays of elements. The following collection types are available:

- `Array[<Collection type> | <Primitive type> | <Reference>]`

##### References

References are used to refer to other OCA objects. The following reference types are available:

- `refn` refers to a named reference. It MUST start with the `refn` prefix: `refn:<human readable reference name>`. `refn` MUST point to a named reference defined in the `name` directive.
- `refs` refers to a SAID-based reference. It MUST start with the `refs` prefix: `refs:<OCA object SAID>`.
