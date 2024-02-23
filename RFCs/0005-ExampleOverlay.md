# 0005 - OCA Example overlays
- Authors: Carly Huitema / Paul Knowles
- Status: PROPOSED
- Status Note: none
- Supersedes: none
- Start Date: 2024-02-16

## Summary
An overlay for providing examples of correct entries which may be used when collecting data from users.

## Motivation
When collecting data from users, providing examples help users grasp the expected format or content of the data they need to input. This clarity reduces ambiguity and minimizes errors, enhancing overall data quality.

## Tutorial

### Schema example

The following code describes an example schema to which the example overlays will reference.

Capture base:
```
{
  "type": "spec/capture_base/1.0",
  "digest": "Etszl9LgLUjllI950rd2lO6rF5-BP_jGzXGBPkFZCZFA",
  "classification": "RDF106",
  "attributes": {
    "Albumin_concentration": "Numeric",
    "Glucose_concentration": "Numeric",
    "Sample _name": "Text",
    "Sample_type": "Text"
  },
  "flagged_attributes": []
}
```
Entry code overlay
```
{
  "capture_base": "Etszl9LgLUjllI950rd2lO6rF5-BP_jGzXGBPkFZCZFA",
  "digest": "EHg4AoXVKZrgFMN_c91qo4b9sgF3mWAtAtqn7no85Ldo",
  "type": "spec/overlays/entry_code/1.0",
  "attribute_entry_codes": {
    "Sample_type": [
      "BLD001",
      "BLD002",
      "BLD003",
      "BLD004",
      "BLD005"
    ]
  }
}
```
Entry overlay
```
{
  "capture_base": "Etszl9LgLUjllI950rd2lO6rF5-BP_jGzXGBPkFZCZFA",
  "digest": "EiX132uHOFWph3kwBvjnkalbGDYagttuKr97olGRLOy4",
  "type": "spec/overlays/entry/1.0",
  "language": "en",
  "attribute_entries": {
    "Sample_type": {
      "BLD001": "No_preserv_no_anti-coag",
      "BLD002": "K2_EDTA",
      "BLD003": "sodium_citrate",
      "BLD004": "sodium_heparin",
      "BLD005": "acid_citrate_dextrose"
    }
  }
}

{
  "capture_base": "Etszl9LgLUjllI950rd2lO6rF5-BP_jGzXGBPkFZCZFA",
  "digest": "EiX132uHOFWph3kwBvjnkalbGDYagttuKr97olGRLOy4",
  "type": "spec/overlays/entry/1.0",
  "language": "ar",
  "attribute_entries": {
    "Sample_type": {
      "BLD001": "لا يحتوي على مواد حافظة ولا مضاد للتخثر",
      "BLD002": "K2 EDTA",
      "BLD003": "سترات الصوديوم",
      "BLD004": "الهيبارين الصوديوم",
      "BLD005": "حمض سترات الدكستروز"
    }
  }
}
```
### Examples of example overlays.
Examples can be provided for some or all of the attributes in a schema and examples may be language/local specific.
```
{
  "capture_base": "Etszl9LgLUjllI950rd2lO6rF5-BP_jGzXGBPkFZCZFA",
  "digest": "XXXX",
  "type": "spec/overlays/example/1.0",
  "language": "en-CA",
  "examples": {
    "Albumin_concentration": "52.69",
    "Glucose_concentration": "8.7",
    "Sample _name": "Carlys_sample",
    "Sample_type": "BLD003"
  }
}

{
  "capture_base": "Etszl9LgLUjllI950rd2lO6rF5-BP_jGzXGBPkFZCZFA",
  "digest": "XXXX",
  "type": "spec/overlays/example/1.0",
  "language": "ar",
  "examples": {
    "Albumin_concentration": "52.69",
    "Glucose_concentration": "8.7",
    "Sample _name": "عينة",
    "Sample_type": "BLD003"
  }
}
```

## Reference

## Drawbacks
Creators will need to check that their examples would pass data validation according to the schema rules (e.g. the Sample_type example must be a valid entry code such as BLD003 and not VD0005).

## Rational and Alternatives
There are currently no way to provide examples except as another notation within an information overlay.

## Prior Art

## Unresolved questions

## Implementations

