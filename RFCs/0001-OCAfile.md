# 0001: OCAFile
- Authors: [Robert Mitwicki](robert.mitwicki@humancolossus.org), [Michał Pietrus](michal.pietrus@argonauths.eu)
- Status: [DEMONSTRATED](/README.md#demonstrated)
- Status Note: Proposed concept is already in implementation phase
- Supersedes: none
- Start Date: 2022-01-12

## Summary

Since day one, OCA constructs, called OCA Bundles, were created using XLS spreadsheets. The XLS-based template defined within a spreadsheet enabled the creation of matrices with rows as attributes and columns as metadata for these attributes. As versatile as error-prone, this solution is.

A different, unified and deterministic solution is required to enable the true power of long-term maintenance of OCA Bundles, the most fundamental building blocks of the OCA Ecosystem.

This document proposes a novel OCA Bundle long-term maintenance concept: OCAfile. The OCAfile consists of layers and is equipped with a custom Domain-Specific Language (DSL) to leverage OCA Bundles creation.

## Motivation

Provide user friendly interface for creation and managing OCA objects.
Assumption is that it would drive the adoption and increase interoperability of
created objects through lower the barrier of finding and reusing already existing work.

### Deterministic through layered architecture The OCAfile benefits from the
concept of versioning each new operation by building a provenance log of all
operations made upon the Bundle since the genesis operation. Recall that a
provenance log is an append-only log that consists of items, where each new item
is defined as follows: digest(previous item) | current item. Calculating the
digest upon it gives the current item (layer) digest. See below for a
step-by-step example.

As digests determine layers, any new OCA Bundle construct might already benefit
from a previously defined OCA Bundle. That is because both OCA Bundles might
involve the same attribute names, for example. The directed acyclic graph keeps
the layers in vertices (their digests). It ensures the unambiguous resolution of
any layer.

### Text based format The OCAfile remains text based for readability

### Pleasant DSL The OCAfile relies on a domain-specific language (DSL) that is
human and machine-readable to achieve deterministic layering. The DSL enables
the creation and manipulation of the OCA Bundle during its lifetime.

### Version control system compliant As opposed to binary files, text files
enable meaningful changes control under a version control system (VCS).


## Tutorial

Each OCA bundle is represented and tracked via file called `OCAfile`. This file
is writen with domain-specific language which allows user to create new or
manipulate existing OCA bundles throughout their lifetime.

Those files can be easily share and distributed which would allow to increase
the reusability of the objects.

User starts with creation of `OCAfile` and defining preprocessor directives.

Each OCAfile MAY have preprocessor directives defined at the beginning of each
file. Preprocessor directives terminate with either a newline character or the
command. They define additional metadata of the OCAfile. Each directive MUST
consist of a key, followed by a value: `# directive=value`. Both must match
`[a-zA-Z0-9\-]+` regular expression.

The OCAfile MUST support the following directives:

- The syntax directive provides the possibility to define the version of DSL
  used to define a specific bundle. If not specified, it uses the latest version
  available for the OCA Tool.
- The escape directive sets the character used to escape characters in an
  OCAfile. If not specified, the default escape character is \.
- The newline directive sets the line separation character in the OCAfile. If
  not specified, the default escape character is \n.

Following that user can define one or more commands.

A Command is defined as:

    [OPERATION] [OCA OBJECT] [ARGUMENTS]


Command MUST be case-insensitive. A Command starts from one of the keywords specified below and terminates with the newline character.

Command keywords:
- ADD - add the new element in the given object
- ALTER - modify existing element to keep provenance log of specific attribute
- REMOVE - remove element in given object, if does not exist, does nothing (should throw an error)
- FROM - sets the base OCA Bundle for subsequent instructions. ARG: SAID of OCA Bundle. If the OCAfile does not start with FROM instruction it assume that it will be new bundle.

Commands MUST furthermore adhere to the following OCA objects:

- capture base
- character-econding
- format
- information
- label
- meta
- standard
- cardinality
- conditional
- conformance
- entry-code
- entry
- unit
- attribute-mapping
- entry-code-mapping
- subset
- unit-mapping
- layout
- sensitive


### Example: User schema definition

Schema Creation

    ADD META name user
    ADD META description yet another user schema
    ADD ATTR firstname
    ADD ATTR lastname

Each command execution generate new SAID. Final SAID of above operations would
be SAID: EGRvM555oQVuCaBd0rvveThB+cLf5/Z7KhOFlbgcICLQ

Schema change

    FROM EGRvM555oQVuCaBd0rvveThB+cLf5/Z7KhOFlbgcICLQ # Extends/alters previously defined schema

    ALTER ATTR lastname RENAME TO surname

Outcome SAID: E9kkpiK6cOJB9j3DDyWHKLbzE/EGtsRQ66Mg2iUYYKhg


### Example: Big schema


    # syntax=1.0.0 (DSL)
    # escape=\

    ADD CLASSIFICATION GICS:45102010

    ADD ATTRIBUTE documentNumber Text
    ADD INFORMATION en ATTR documentNumber "Unique identification number of the document."

    ADD ATTRIBUTE fullName Text


    FROM OCA_BUNDLE123

    ADD ATTRIBUTE height Numeric # SAID
    ADD ATTRIBUTE documentType Array[Text]
    ADD ATTRIBUTE issuingState Text
    ADD ATTRIBUTE photoImage Binary
    ADD ATTRIBUTE sex Text

    ADD CHARACTER_ENCODING ATTR photoImage base64
    ADD FLAGGED_ATTRIBUTES documentNumber fullName dateOfBirth photoImage

    ADD CHARACTER_ENCODING DEFAULT utf-8 # SAID OCA BUNDLE


    # default always ATTR

    ADD FORMAT dateOfBirth YYYY-MM-DD
    ADD FORMAT documentNumber [A-Z0-9]{9}
    ADD FORMAT photoImage image/jpeg
    ADD FORMAT sex [A-Z]{1}

    # ADD INFORMATION <lang> attr <attribute_name> <value>
    # For each <lang> overlay would be created

    ADD INFORMATION en ATTR documentType "The word for \"passport\" in the language of the issuing State or organization."
    ADD INFORMATION en ATTR dateOfBirth "Holder’s date of birth as recorded by the issuing State or organization."
    ADD INFORMATION en ATTR fullName "Full name of the passport holder."
    ADD INFORMATION en ATTR height "Recorded height of the passport holder."
    ADD INFORMATION en ATTR issuingState "Name of the State or organization responsible for issuing the passport."
    ADD INFORMATION en ATTR photoImage "Portrait image of the passport holder."
    ADD INFORMATION en ATTR sex "Sex of the passport holder."




    # ADD LABEL <lang> ATTR <attribute_name> <value>
    # ADD LABEL <lang> CATEGORY <category_name> <category_label>
    # <lang> - iso country code

    ADD LABEL en ATTR documentNumber "Passport Number"
    ADD LABEL en ATTR documentType "Document"
    ADD LABEL en ATTR dateOfBirth "Date of birth"
    ADD LABEL en ATTR fullName "Full name"
    ADD LABEL en ATTR height "Height"
    ADD LABEL en ATTR issuingState "Issuing State of organization (in full)"
    ADD LABEL en ATTR photoImage "Portrait image"
    ADD LABEL en ATTR sex "Sex"

    ADD LABEL en META description "Opis"



    ADD UNIT si ATTR height cm



    ADD LABEL en ATTR dateOfBirth Date of birth
    ADD LABEL en CATEGORY CAT1 "Mandatory header"

    ADD UNIT_MAPPING METRIC_SYSTEM si CODE_TABLE  E3YDLacdI1GSGWhHywzrb5B0hOL/9TYWBsUkXC8fA4EY ATTR blood_glucose mg/dL


    ADD LABEL en cos "wartość"

    ADD LABEL en CATEGORY _cat-1_ "Mandatory header"
    ADD LABEL en CATEGORY _cat-2_ "Mandatory personal data elements"

    # ADD META <lang> <key> <value>

    ADD META en name "Digital Passport"
    ADD META en description "An example of a Digital Passport schema"
    ADD META en affiliation "The Government of Antarctica"

    # ADD STANDARD <attr_name> <value>
    ADD STANDARD dateOfBirth "ISO 8601"

    # ADD CARDINALITY <attr_name> <value>
    ADD CARDINALITY documentType "1-2"

    # ADD CONDITIONAL <attr_name> <conditional_expression>
    ADD CONDITIONAL ATTR height "${0}=='PM'"
    ADD CONDITIONAL DEPENDENCIES height [documentType]

    # ADD CONFORMANCE <attr_name> <value>
    # default is optional so only those which are listed are mandatory. if attribute already exist value can be altered
    ADD CONFORMANCE dateOfBirth M
    ADD CONFORMANCE documentNumber M


    # ADD ENTRY_CODE <attr> <value>
    ADD ENTRY_CODE documentType ["PE", "PM"]
    ADD ENTRY_CODE issuingState "EGyWgdQR9dW_I5oHlHBMoO9AA_eMeb2p3XzcCRCBbKCM"

### Ecosystem

`OCAfile` would allow user to easily track the changes, version it and distribute
via OCA Repository or other medium. The idea is that having `OCAfile` as a layers
which are represented by individual `SAID` alow us to compare OCA bundle easier,
find common ancestors and do graph dependencies.

`OCAfile` provide user full history on that how the bundle was created and can
be treated as full recipe how to recreate the final outcome.

## Reference

`OCAfile` idea is based on very well known `Dockerfile` approach which allows
users to create more complex containers then schema. It is well adopted in the
technical world and should help with adoption of `OCAfile` as the approach is
not new. Lot of developers should be faimilar with it already and those who are
not technical should still find it relatively easy to describe what schema
should look like.

## Drawbacks

You can't use excel with that approach.

## Rationale and alternatives

This approach to represent OCA Bundle:
- provides human and machine-readable format
- allows to track history of oca bundle and its evolution
- provide easy way to track it with version control system
- opens possibility for applying authentication layer on top while creating the
  objects
- allows to create more complex and accurate comparision between OCA bundles
- easy to maintain compare to xls

Without this appraoch would be hard for new comers to create their schemas on
their own. Current options are:
- use xls as a template and convert to OCA bundle (json serialization) - not
  scalable, hard to share
- write by hand OCA bundle with json - easy to make mistake, hard to track
  changes

## Prior art

The concept is borrowed from Docker ecosystem which is well established and well
known. We can assume that same approach for OCA ecosystem can help to drive the
adoption and lower the barrier of entry. Simple and easy to use DSL, can bring
possibility to build similar tooling and services as we can observe in Docker
ecosystem.

## Unresolved questions

TBD

## Implementations

The following lists the implementations (if any) of this RFC. Please do a pull request to add your implementation. If the implementation is open source, include a link to the repo or to the implementation within the repo.

*Implementation Notes* [may need to include a link to test results](README.md#accepted).

Name / Link | Implementation Notes
--- | --- |
ocafile | https://github.com/THCLab/oca-rs/tree/main/oca-file | Rust implementation of OCAfile
