---
sidebarDepth: 5
description: Overlayfile specification
---

# Overlayfile Technical Specification

<dl>
    <dt>
        Version:
    </dt>
    <dd>
        v1.0.0-rc1
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
examples, and notes in this specification, are for informational purposes only
and are not mandatory for compliance. All other sections of this specification
are normative and define the required rules and standards that must be followed
to ensure conformity with the `OverlayFile` Specification.

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD",
"SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this
document are to be interpreted when, and only when, they appear in all capitals,
as described in RFC 2119 \[[RFC2119](#ref-RFC2119)\].

## Introduction

_This section is informative_

The OverlayFile (.overlayfile) defines structure of an Overlay in the OCA ecosystem. It provides a formal and machine-readable way to describe how overlays are composed, what elements they contain, and how they should be interpreted by OCA ecosystem.

Unlike [OCAFILEs](/specification/ocafile.md), which describe the structure of data capture and its semantic overlays, an `OverlayFile` describes the overlay definition itself — not its instance or usage.
This distinction allows for:

- Decoupling of definition from usage, enabling independent community driven governance and development.
- Reusable overlay definitions across ecosystems.
- Tooling support for validation, introspection, and bundle composition.

OverlayFiles can be distributed for example via [Overlay Registries](https://github.com/the-human-colossus-foundation/overlays-repository), which are collections of `OverlayFiles` containing definitions of community or ecosystem-specific overlays. This encourages interoperability and collaboration between different domains.

## Purpose

_This section is informative_

The primary purpose of the `OverlayFile` is to enable community-driven development of Overlays beyond those defined in the official [OCA specification](/specification/). By decoupling overlay definition from its usage, `OverlayFiles` allow communities and ecosystems to define, share, and evolve their own overlays independently. This separation makes it possible to support and validate community overlays within the broader OCA ecosystem while maintaining compatibility with official OCA tooling and governance models.

## File Format

OverlayFiles use a domain-specific language (DSL) that is both human-readable and machine-parseable.
The `.overlayfile` extension is mandatory.

Each `.overlayfile` defines one or more overlays and their internal structure, including their version, elements, and key/value rules.

Example
```
ADD OVERLAY hcf:information
  VERSION 1.0.0
  ADD OBJECT attribute_information
    WITH keys attr-names
    WITH values Text
```

## Syntax Specification

Basic rules:
- all keywords are matched case-insensitively
- indentation/whitespace is insignificant
- overlayfile MUST consist of one or more overlays definitions
- any attribute or object specify in the definition must appear in final overlay
- adding optional attributes which validation would not check is possible with ellipsis `...`
- validator would allow one overlay per bundle unless `UNIQUE KEYS` are speficy
- overlayfile can consist one or more overlays definitions
- comments begin with `#` and continue until the end of the line.

Overlay definition always starts with `ADD OVERLAY` command followed by `overlay-id` which SHALL consist of human-readable namespace and MUST consist of human-readable name separated by `:`. Followed by newline overlay body MUST consist of:
- `VERSION` using [Semantic Versioning](https://semver.org)
- At least one [element](#element-types)

and MAY contain:
- `UNIQUE KEY` - A keyword followed by an element name defines a unique key, which would allow multiple overlays with the same name in OCA Bundle. E.g. language attribute in Label overlay allowing for more then one overlay in the bundle.

Example:
```
ADD OVERLAY <namespace:name>
  VERSION <semver>
  UNIQUE KEYS <element-name>
  <ELEMENT_BLOCKS>
```

### Supported Element Types

Each overlay definition MUST consist of at least one element that describe its internal structure.
An element defines what kind of data is expected, what types of values they accept and in case of `OBJECT` which keys are valid.

Overlayfile supports of following element types:
- Attribute - one or more keys with it's type
- Object - list of key-value pairs
- Array - list of values

#### Attributes

`Attribute` can be defined:

As single key with specific type, for example:

```
ADD ATTRIBUTES key=Text
```

As list of keys with their respective types, for example:

```
ADD ATTRIBUTES key1=Text key2=Text
```

As array of keys, with values clause, for example:

```
ADD ATTRIBUTES [key1 key2 key3]
   with values Text
```

As an open array with values clause, for example:

```
ADD ATTRIBUTES [key1 key2 key3 ...]
   with values Text
```

`...` - ellipsis means that any number of attributes can be added to the overlay as optional attributes.

#### Object

`Object` can be defined:

```
ADD OBJECT name
   with keys <attr-names|Text>
   with values <values-types>
```

Values type supporting object type allows to create nested object, for example:

```
ADD OBJECT name
   with keys <Text>
   with values Object
     with values Text
     with values Object
       with values Text
       with values Any
```
#### Array

Element of array can be defined:

```
ADD ARRAY name
   with values <values-types>
```

Example:

```
ADD OVERLAY sensitiv
  VERSION 2.0.0
  ADD ARRAY attributes
    with values ATTR-NAMES
```
### Keys type

There are two types of keys which can be used in an object:

- `Text` - any arbitrary string
- `attr-names` - the key of the object needs to be one of the attribute defined in capture base with which overlay would be used. The validation would check whether the given attribute exists in the capture base; if not, an error would be returned.
### Values Type

Values types are used to validate elements within overlay and they are defined as follows:

- `Object` - Validate if attribute is object or nested object with keys type and values type
- `Array` - Validate if attribute is an array of values
- `Binary` - Validate if attribute is binary data
- `Text` - Validate if attribute is any arbitrary string (including numbers and other characters)
- `Lang` - Validate if attribute is a valid language code according to ISO 639-1 with country code (ISO 3166-1 alpha-2) or ISO 639-3
- `Ref` - Validate if attribute is a reference in form of SAID to another object
- `Any` - Allow for any type, validation would be skipped for such element

## ABNF

Please refer to the below ABNF specification for more details.

```abnf
; OVERLAYFILE ABNF
; References:
; - RFC 5234 (ABNF core rules)
; Notes:
; - All keywords are matched case-insensitively
; - Indentation/whitespace is insignificant except where shown.
; - Parsers SHOULD ignore additional blank lines and comments.

overlayfile     = *( wsp* ( overlay-block / comment / eol ) )

overlay-block   = overlay-header eol
                  wsp* version-line
                  *( element-block / wsp* comment / eol )

overlay-header  = "ADD" wsp+ "OVERLAY" wsp+ overlay-id

overlay-id      = [ namespace ":" ] name
namespace       = ident
name            = ident

version-line    = "VERSION" wsp+ semver eol

element-block   = wsp* ((element-attr / element-object) eol
                   / wsp* comment
                   / eol )

element-attr    = "ADD" wsp+ "ATTRIBUTES" wsp+ ( element-name / ( element_array *1 attr-with-clause )
element-object  = "ADD" wsp+ "OBJECT" wsp+ element-name with-clause

element-name    = ident
element-array   = [ wsp* element-name (( wsp+ element-name )* / (wsp+ ellipsis) ) ]
ellipsis        = "..."

with-values-clauses   = "WITH" wsp+ values-clause
with-clause     = "WITH" wsp+ ( keys-clause / values-clause )

keys-clause     = "KEYS"  wsp+ key-type
values-clause   = "VALUES" wsp+ multi-value-type

key-type        = "ATTR-NAMES" / "TEXT"
multi-value-type = value-type 1*( "|" value-type )
value-type      = "TEXT"
                / "BINARY"
                / "LANG"
                / "ANY"
                / "REF"
                / "ARRAY" with-values-clauses*
                / object-type

; ----------------------------
; OBJECT schema (as a value)
; ----------------------------

object-type         = %i"OBJECT"
                      [ wsp* eol
                        *( wsp* object-spec-line ) ]

object-spec-line    = with-clause eol

; ----------------------------
; Lexical rules
; ----------------------------

ident           = ident-start *ident-rest
ident-start     = ALPHA / "_"
ident-rest      = ALPHA / DIGIT / "_" / "-" / "."

; Semantic Versioning 2.0.0
semver          = numeric-id "." numeric-id "." numeric-id
                  [ "-" pre-release ] [ "+" build ]

numeric-id      = "0" / ( %x31-39 *DIGIT )             ; "0" or non-zero leading
pre-release     = dot-sep 1*pr-identifier
build           = dot-sep 1*build-identifier
pr-identifier   = alphanum / ( alphanum *( alphanum / "-" ) alphanum )
build-identifier= alphanum / ( alphanum *( alphanum / "-" ) alphanum )
alphanum        = ALPHA / DIGIT
dot-sep         = 1*( ".")
                 ; permissive: treat one-or-more dots as separators to allow
                 ; simple error recovery; STRICT parsers SHOULD require a single "."

; Comments & line endings
comment         = "#" *( %x20-7E / HTAB ) eol          ; from "#" to EOL
eol             = CRLF / LF
wsp             = SP / HTAB

; ----------------------------
; Core imports (RFC 5234)
; ----------------------------
ALPHA           = %x41-5A / %x61-7A
DIGIT           = %x30-39
SP              = %x20
HTAB            = %x09
CRLF            = %x0D.0A
LF              = %x0A

```
