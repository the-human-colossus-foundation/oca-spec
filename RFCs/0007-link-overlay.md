# 0007: Link Overlay

- Authors: Marcin Olichwiruk, Michal Pietrus
- Status: [PROPOSED](/README.md#proposed)
- Status Note: Proposed concept is already in implementation phase
- Supersedes: none
- Start Date: 2024-06-01 (date you started working on this idea)

## Summary

The Link Overlay defines explicit, unidirectional relationships between attributes in a source and target Bundle.

## Motivation

The current OCA specification introduces transformation Overlays, specifically the [Attribute Mapping Overlay](https://oca.colossi.network/specification/#attribute-mapping-overlay), which facilitates the creation of mappings between attribute names in a source Bundle and arbitrary attribute names in third-party data sources.

We propose an enhanced approach that establishes a unidirectional and explicit relationship between attribute pairs in a source Bundle and a target Bundle. This approach creates not only attribute-level mappings but also an explicit linkage between the Bundles themselves. By referencing both the source and target Bundles unambiguously, this mechanism provides a stronger mapping than the Attribute Mapping Overlay.

## Tutorial

A code snippet given in OCAFile:

```
ADD LINK refn:other-bundle ATTRS
    name    = first_name
    surname = last_name
    height  = hgt
    weight  = wgt
```

The above code snippet creates a link between the current Bundle and the `other-bundle`. The `name` attribute in the current Bundle is mapped to the `first_name` attribute in the `other-bundle`. Similarly, the `surname` attribute is mapped to the `last_name` attribute, and so on.

## Reference

- In addition to the `capture_base`, `type`, and `language` attributes (see [Common attributes](#common-attributes)), the Entry Overlay MUST include the following attribute:
  - `target_bundle` - the digest of the Bundle that the Link Overlay is pointing to.
  - `attribute_mapping` - a dictionary that maps attribute names in the source Bundle to attribute names in the target Bundle.
- When serialized to JSON it shall have the following structure:
  ```
    {
        "d": "Overlay Digest",
        "capture_base": "Capture Base Digest",
        "type": "spec/overlays/link/1.0",
        "target_bundle": "Target Bundle Digest",
        "attribute_mapping": {
            "name": "first_name",
            "surname": "last_name",
            "height": "hgt",
            "weight": "wgt"
        }
    }
  ```

## Drawbacks

The nature of linking between Bundles effectively narrows its applicability solely to a OCA-based use cases. Both source and target must have OCA Bundle counterparts.

## Rationale and alternatives

- If strong linking between Bundles is not required, [Attribute Mapping Overlay](https://oca.colossi.network/specification/#attribute-mapping-overlay) is a more lightweight alternative.

## Prior art

- [Attribute Mapping Overlay](https://oca.colossi.network/specification/#attribute-mapping-overlay)

## Unresolved questions

- Is linking a proper name for the underlying concept?

## Implementations

The following lists the implementations (if any) of this RFC. Please do a pull request to add your implementation. If the implementation is open source, include a link to the repo or to the implementation within the repo.

_Implementation Notes_ [may need to include a link to test results](README.md#accepted).

| Name / Link | Implementation Notes                                                 |
| ----------- | -------------------------------------------------------------------- |
| oca-rs      | [https://github.com/THCLab/oca-rs](https://github.com/THCLab/oca-rs) |
