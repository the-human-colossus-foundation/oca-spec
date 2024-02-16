# 0004 - OCA Framing overlays
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
Examples can be provided for some or all of the attributes in a schema.

```
{
  "capture_base": "Etszl9LgLUjllI950rd2lO6rF5-BP_jGzXGBPkFZCZFA",
  "digest": "XXXX",
  "type": "spec/overlays/example/1.0",
  "examples": {
    "Albumin_concentration": "52.69",
    "Glucose_concentration": "8.7",
    "Sample _name": "Sample_1",
    "Sample_type": "BLD003"
  }
}
```

## Reference

## Drawbacks
Users will need to check that their examples would pass data validation according to the schema rules (e.g. the Sample_type example must be a valid entry code).

## Rational and Alternatives
There are currently no way to provide examples except as another notation within an information overlay.

## Prior Art

## Unresolved questions

## Implementations

