## Introduction

*This section is informative*

Since day one, OCA constructs, called OCA Bundles, were created using XLS spreadsheets. The XLS-based template defined within a spreadsheet enabled the creation of matrices with rows as attributes and columns as metadata for these attributes. As versatile as error-prone, this solution is.

A different, unified and deterministic solution is required to enable the true power of long-term maintenance of OCA Bundles, the most fundamental building blocks of the OCA Ecosystem.

This document proposes a novel OCA Bundle long-term maintenance concept: `OCAfile`. The OCAfile consists of layers and is equipped with a custom Domain-Specific Language (DSL) to leverage OCA Bundles creation.

## Main characteristics

*This section is informative*

### Deterministic through layered architecture

The OCAfile benefits from the concept of versioning each new operation by building a provenance log of all operations made upon the Bundle since the genesis operation. Recall that a provenance log is an append-only log that consists of items, where each new item is defined as follows: `digest(previous item) | current item`. Calculating the digest upon it gives the current item (layer) digest. See [below](/en/HCF/Technologies/OCA/OCAfile/design#layers-step-by-step) for a step-by-step example.

As digests determine layers, any new OCA Bundle construct might already benefit from a previously defined OCA Bundle. That is because both OCA Bundles might involve the same attribute names, for example. The directed acyclic graph keeps the layers in vertices (their digests). It ensures the unambiguous resolution of any layer.

### Text based format

The OCAfile remains text based for readability 

### Pleasant DSL

The OCAfile relies on a domain-specific language (DSL) that is human and machine-readable to achieve deterministic layering. The DSL enables the creation and manipulation of the OCA Bundle during its lifetime.

### Version control system compliant

As opposed to binary files, text files enable meaningful changes control under a version control system (VCS).
