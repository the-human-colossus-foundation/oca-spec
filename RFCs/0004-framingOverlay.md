# 0004 - OCA Framing overlays
- Authors: Carly Huitema / Paul Knowles
- Status: PROPOSED
- Status Note: none
- Supersedes: none
- Start Date: 2024-01-25

## Summary
The need to frame data objects within a specific conceptual context is increasingly evident, especially when dealing with diverse data sources and formats. Framing Overlays in OCA provide an ontology framing solution by adding semantic context and linking data attributes to broader concepts or standards. This RFC seeks to introduce and standardize Framing Overlays within the OCA framework, enhancing semantic interoperability and data harmonization

## Motivation
It is often important to add contextual information to a schema connecting schema concepts to external concepts. Concepts within an OCA schema (e.g. attribute, unit, or entry code) may be equivalent or close to other concepts described by different identifiers in semantic artifacts such as vocabularies and ontologies. For example, there are many different identifiers (or notations) to describe units of measure (e.g. micromolar, uM, umol/L, μM etc.) and it is important to be able to map between these concepts to support shared understanding. A schema may use the unit term uM, while the controlled vocabulary Unified Code for Units of Measure (UCUM) uses umol/L. The schema term may be common in its domain and understood by users, while the UCUM controlled vocabulary is a standard that multiple communities reference for a shared and specific understanding.

There are three types of information within OCA that we have identified that can benefit from this contextual mapping via a framing overlay where the schema concept is mapped to a term drawn from another concept such as an ontology or controlled vocabulary.

1. Attributes where the schema attribute is mapped to a term drawn from another concept such as an ontology or controlled vocabulary.
2. Units where a schema unit is mapped to a unit drawn from another concept.
3. Entry codes where a schema entry code term is mapped to a term drawn from another concept.

An important ontology for mapping concepts is the [Simple Standard for Sharing Ontological Mappings](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9216545/) (SSSOM) [1](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9216545/). This SSSOM ontology addresses the lack of context around framings, such as "are two terms equivalent or merely related? Are they narrow or broad matches? Or are they associated in some other way? Such relationships between the mapped terms are often not documented, which leads to incorrect assumptions and makes them hard to use in scenarios that require a high degree of precision"[1](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9216545/).

In the SSSOM specification: "Each mapping can be described by up to 38 standard metadata ‘slots’, or elements (in version 0.9). Four of these are required for any individual mapping: subject_id, object_id (the pair of entities mapped), predicate_id (the nature of the relationship between the two) and match_type (how the mapping was derived)[replaced with mapping_justification June 2022]. Additional optional metadata elements include author_id, mapping_date and many more."[1](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9216545/)

For framing overlays we propose to use the four required SSSOM mapping elements, and additional SSSOM metadata could be supplied external to OCA in other documentation. For OCA the naming conventions are as follows:

|OCA|SSSOM|
|---|---|
|attribute/unit/entry code term used in OCA|subject_id|
|term_id|object_id|
|predicate_id|predicate_id|
|framing_justification|matching_justification|


We also propose that there can be multiple framing overlays, and each framing overlay should be specific for a single source being mapped to. So that users can know that they are accessing the correct external concept, the external concept must be described by sufficient cataloging information provided within the framing overlay.

We propose the following four pieces of metadata will be useful to correctly identify external resources. Only the identifier (frame_id) should be required.

1. frame_id: Identifier of resource (SAIDs, DOIs, PURLs, or common names e.g. UCUM)
2. frame_label: Label of resource (e.g. Unified Code for Units of Measure)
3. frame_location: Location of resource (e.g. https://ucum.org/)
4. frame_version: Resource version (e.g. 2.1).

The proposed Framing Overlays will facilitate:
* Clearer understanding of data by providing contextual linkages.
* Enhanced data interoperability across different systems and domains.
* Improved data analysis and decision-making through contextual awareness.

## Tutorial

### Schema example

The following code describes an example schema to which example framing overlays will reference.

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
Unit overlay
```
{
  "capture_base": "Etszl9LgLUjllI950rd2lO6rF5-BP_jGzXGBPkFZCZFA",
  "digest": "Ec3I2X4FNoPhi7Raqo1PE3nP977BN4It-ZMmqLvc6z_w",
  "type": "spec/overlays/unit/1.0",
  "metric_system": "",
  "attribute_units": {
    "Albumin_concentration": "mg/dL",
    "Glucose_concentration": "mg/dL"
  }
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
```
### Attribute framing overlay example

There can be multiple attribute framing overlays within a single bundle, but each framing overlay is specific for one external context source (such as a single ontology or vocabulary aka frame_id).  There can be only one overlay per unique frame_id. 

In the attribute framing overlay, for each attribute (which must be unique in the schema) there can be zero or more attribute_framing terms. 

For each attribute there can only be one skos:exactMatch, but there may be additional framing terms for the same attribute (e.g. skos:closeMatch). Unlike attribute to attribute mapping, attribute to concept mapping can be one to many with different levels of matching (e.g. different skos terms). See example below (albumin concentration).

```
{
  "capture_base": "Etszl9LgLUjllI950rd2lO6rF5-BP_jGzXGBPkFZCZFA",
  "digest": "XXXX",
  "type": "spec/overlays/attribute_framing/1.0",
  "Framing_metadata": {
    "frame_id": "SNOMEDCT",
    "frame_label": "Systematized Nomenclature of Medicine Clinical Terms",
    "frame_location": "https://bioportal.bioontology.org/ontologies/SNOMEDCT",
    "frame_version": "2023AA"
  },
  "attribute_framing": {
    "Albumin_concentration": {
      "http://purl.bioontology.org/ontology/SNOMEDCT/365801005": {
        "Predicate_id": "skos:exactMatch",
        "Framing_justification": "semapv:ManualMappingCuration"
      },
      "http://purl.bioontology.org/ontology/SNOMEDCT/365799007": {
        "Predicate_id": "skos:broadMatch",
        "Framing_justification": "semapv:ManualMappingCuration"
      }
    },
    "Glucose_concentration": {
      "http://purl.bioontology.org/ontology/SNOMEDCT/365811003": {
        "Predicate_id": "skos:exactMatch",
        "Framing_justification": "semapv:ManualMappingCuration"
      }
    }
  }
}
```
### Unit framing overlay example

There can be multiple unit framing overlays within a single bundle, one for each specific external context source (such as a single unit ontology or vocabulary aka frame_id). There can be only one overlay per unique frame_id. 

For each unique unit that appears in the schema there can be only one unit_framing term. This term must be skos:exactMatch and only skos:exactMatch is allowed (no other skos terms). This is because units are often associated with quantitative data and it is necessary to preserve accuracy and to use units reported to transform data.

```
{
  "capture_base": "Etszl9LgLUjllI950rd2lO6rF5-BP_jGzXGBPkFZCZFA",
  "digest": "XXXX",
  "type": "spec/overlays/unit_framing/1.0",
  "Framing_metadata": {
    "frame_id": "UCUM",
    "frame_label": "",
    "frame_location": "https://ucum.org/",
    "frame_version": ""
  },
  "unit_framing": {
    "mg/dL": {
      "Term_id": "mg/dL",
      "Predicate_id": "skos:exactMatch",
      "Framing_justification": "semapv:ManualMappingCuration"
    }
  }
}
```
### Entry code framing overlay example

There can be multiple entry code framing overlays within a single bundle, one for each specific external context source (such as a single ontology or vocabulary aka frame_id). There can be only one overlay per unique frame_id. 

For each entry code of each attribute there can only be one skos:exactMatch, but there may be additional framing terms for the same entry code (e.g. skos:closeMatch).

```
{
  "capture_base": "Etszl9LgLUjllI950rd2lO6rF5-BP_jGzXGBPkFZCZFA",
  "digest": "XXXXX",
  "type": "spec/overlays/entry_code_framing/1.0",
  "Framing_metadata": {
    "frame_id": "SNOMEDCT",
    "frame_label": "Systematized Nomenclature of Medicine Clinical Terms",
    "frame_location": "https://bioportal.bioontology.org/ontologies/SNOMEDCT",
    "frame_version": "2023AA"
  },
  "entry_code_framing": {
    "Sample type": {
      "BLD001": {
        "http://purl.bioontology.org/ontology/SNOMEDCT/258581004": {
          "Predicate_id": "skos:closeMatch",
          "Framing_justification": "semapv:ManualMappingCuration"
        }
      },
      "BLD002": {
        "http://purl.bioontology.org/ontology/SNOMEDCT/441510007": {
          "Predicate_id": "skos:broadMatch",
          "Framing_justification": "semapv:ManualMappingCuration"
        }
      },
      "BLD003": {
        "http://purl.bioontology.org/ontology/SNOMEDCT/441510007": {
          "Predicate_id": "skos:broadMatch",
          "Framing_justification": "semapv:ManualMappingCuration"
        }
      },
      "BLD004": {
        "http://purl.bioontology.org/ontology/SNOMEDCT/441510007": {
          "Predicate_id": "skos:broadMatch",
          "Framing_justification": "semapv:ManualMappingCuration"
        }
      },
      "BLD005": {
        "http://purl.bioontology.org/ontology/SNOMEDCT/441510007": {
          "Predicate_id": "skos:broadMatch",
          "Framing_justification": "semapv:ManualMappingCuration"
        }
      }
    }
  }
}
```


## Reference
### Rules for framing overlays
* For each framing overlay there must be a frame_id
* Within each overlay framing type (attribute, unit or entry_code) each frame_id must be unique.
* Not every term must be framed
* For each attribute or entry_code framing there can be only one skos:exactMatch per term.
  * Refer to Unresolved Questions for discussion on if other ontologies can be used for framing (e.g. owl:sameAs)
* For unit framing, each unit used in a schema can be framed only once.
* For unit framing, each unit can only be framed using skos:exactMatch
  * Refer to Unresolved Questions for discussion on if other ontologies can be used for framing (e.g. owl:sameAs) 

### Predicate_id
Recommended to use skos terms for the mapping vocabulary (although other mapping schemas would be supported such as owl:)
|Skos term|Description|
|---|---|
|skos:closeMatch|closeMatch is used to link two concepts that are sufficiently similar that they can be used interchangeably in some information retrieval applications. In order to avoid the possibility of "compound errors" when combining mappings across more than two concept schemes, skos:closeMatch is not declared to be a transitive property.|
|skos:exactMatch|exactMatch is used to link two concepts, indicating a high degree of confidence that the concepts can be used interchangeably across a wide range of information retrieval applications. skos:exactMatch is a transitive property, and is a sub-property of skos:closeMatch.|
|skos:broadMatch|<A> skos:broadMatch <B> where B is broader than A. broadMatch is used to state an associative mapping link between two concepts.|
|skos:narrowMatch|<A> skos:narrowMatch <B> where B is narrower than A. skos:narrowMatch is owl:inverseOf the property skos:broadMatch.|
|skos:relatedMatch|relatedMatch is used to state an associative mapping link between two concepts.|

Source: [SKOS mapping vocabulary](https://www.w3.org/TR/skos-reference/#mapping)

### Framing_justification
Recommended to use the semapv terms for framing justification although other justification schemas would be supported.
|Semapv term|Description|
|---|---|
|semapv:MappingReview|A process that is concerned with determining if a mapping candidate (otherwise determined) is reasonable/correct.|
|semapv:ManualMappingCuration|A matching process that is performed by a human agent and is based on human judgment and domain knowledge.|
|semapv:LogicalReasoning|A matching process based on the inferences made by a logical reasoner.|
|semapv:LexicalMatching|A matching process based on a lexical comparison between one or more syntactic features of the subject with one or more syntactic features of the object.|
|semapv:CompositeMatching|A matching process based on multiple, possibly intertwined, matching approaches.|
|semapv:UnspecifiedMatching|A matching process based on an unspecified comparison.|
|semapv:SemanticSimilarityThresholdMatching||A matching process based on a minimum threshold of a score from a comparison based on a semantic similarity algorithm.|
|semapv:LexicalSimilarityThresholdMatching|A lexical matching process based on a minimum threshold of a score from a comparison based on a lexical similarity algorithm.|
|semapv:MappingChaining|A matching process based on the traversing of multiple mappings.|

Source: SEMAPV: [A Vocabulary for Semantic Mappings](https://github.com/mapping-commons/semantic-mapping-vocabulary) and [use in SSSOM](https://mapping-commons.github.io/sssom/mapping_justification/)

## Drawbacks
The four attributes for cataloguing frames may not be specific enough.

## Rational and Alternatives

There is currently no other way to connect concepts using OCA.

## Prior Art

## Unresolved questions
* Can other terms systems (other than skos and semapv in this example) be used? Can you mix terms systems within a single framing overlay?
* If other terms systems can be used, then rules change such as only one of (skos:exactMatch, owl:sameAs)

## Implementations

[Example Excel Schema Template](/RFCs/supporting_files/0004-UoG_SchemaTemplate_framing.xlsx) for the example from this RFC.

