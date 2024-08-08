# 0006 - Standard Overlay Changes
- Authors: Carly Huitema / Paul Knowles
- Status: PROPOSED
- Status Note: none
- Supersedes: none
- Start Date: 2024-08-08

## Summary
An update to the standard overlay to ensure standards can be unambiguously identified and to harmonise the reference information to the framing overlay. 

## Motivation
Response to [issue #45](https://github.com/the-human-colossus-foundation/oca-spec/issues/45).

The standard overlay allows the addition of information to a schema to help users harmonize data inputs. Data may be required to be inputted in according to a standard, and there are many standards that users may want to incorporate into their schema. The standard overlay provides a specific location for this information as well as a format for it to be documented in. If this overlay is not available then documentation of standards will likely be moved to numerous non-standard locations (e.g. attribute name ="Chemical_name_in_IUPAC_standard", or information="The inhibitor chemical used for the testing. Note, use the IUPAC chemical name). It would be unfortunate if the information overlay becomes overburdened with multiple roles for the user when a standards overlay meets this need.

The standard overlay should include more information to help users unambiguously identify the standards used in the schema. This will harmonize this overlay with the framing overlay use of framing references as well as complement the framing functionalities. There are frames for attributes, entry codes, and units. Entries that are not limited to a specific list but follow a specific standard would be addressed using the Standard overlay. Currently the standard specification permits only a single identifier, but not all standards can be unambiguously identified and found using a single identifier. A minimal set of metadata is necessary to be specific as to the exact standard being referenced. 

## Tutorial

The following should replace the [standard overlay](https://github.com/the-human-colossus-foundation/oca-spec/blob/master/docs/specification/README.md#standard-overlay)


##### Standard Overlay

A Standard Overlay defines a documented agreement or technical specification published by a standards organisation used to represent, format, define, structure, tag, transmit, manipulate, use, and manage data.

In addition to the `capture_base` and `type` attributes (see [Common attributes](#common-attributes)), the Standard Overlay MUST include the following attribute:

- `attr_standards`

  The `attr_standards` attribute maps key-value pairs where the key is the attribute name and the value is the standard.

There are many international standards organisations establishing tens of thousands of standards covering almost every conceivable topic. The three largest and most well-established standards organisations are the International Organization for Standardization (ISO), the International Electrotechnical Commission (IEC) \[[IEC](#ref-IEC)\], and the International Telecommunication Union (ITU) \[[ITU](#ref-ITU)\].  Standards can be referenced by the required value `standard_id` which should use (where available) persistent identifiers to reference the standard. Examples of persistent identifiers include URNs, PURLs, DOIs, and SAIDs. Other details about the standard are optional (`standard_label`, `standard_location`, and `standard_version`) and can help users identify and use the correct standard.

```json
{
  "capture_base": "EVyoqPYxoPiZOneM84MN-7D0oOR03vCr5gg1hf3pxnis",
  "type": "spec/overlays/standard/1.1",
  "attr_standards": {
    "dateOfBirth": {
      "standard_id": "urn:iso:std:iso:8601:-1:en",
      "standard_label": "ISO 8601",
      "standard_location": "https://www.iso.org/obp/ui/#iso:std:iso:8601:-1:ed-1:v1:en",
      "standard_version": "1-2019"
    },
    "chemical": {
      "standard_id": "https://doi.org/10.1515/iupac",
      "standard_label": "IUPAC nomenclature",
      "standard_location": "https://iupac.org/what-we-do/nomenclature/",
      "standard_version": ""
    }
  }
}
```

_Example 7. Code snippet for a Standard Overlay._

## Reference

## Drawbacks

## Rational and Alternatives

## Prior Art

## Unresolved questions

## Implementations

