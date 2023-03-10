# 0002: OCA_bundle_archive
- Authors: Carly Huitema
- Status: PROPOSED
- Status Note: none
- Supersedes: none
- Start Date: 2023-02-10

## Summary
OCA Bundle Archive is an archival, human-accessible version of the OCA bundle for data preservation. When archiving data, the data could be stored with both the machine-actionable OCA Bundle, and the more human readable OCA Bundle Archive versions.

## Motivation
For archiving data (specifically research data) we are thinking of time scales of 50+ years of accessibility after creation. Requirements for a datasets schema to be this accessible are:
- Human readable
- Easy to read
- Low tech (.txt)
- Contains some helper information to aid interpretation
- Easy to generate from an OCA bundle for easy development

There are also mandates for depositing data that the material must be accessible (e.g. in a non-propriatary format, easy to use and understand).

Based on experience with users, the JSON formats (while readable to those familiar) present a great barrier for generalist users of the OCA specification and it is a format that is all but inaccessible to people who need to use specialized devices to access information (e.g. screen readers).

## Tutorial
Each OCA Bundle can be represented as a single .txt file - the OCA Bundle Archive.

OCA Bundle Archive files can be stored with data (and together with the OCA Bundle) as a human accessible version of the information about the data schema held within the OCA Bundle. 

All information within the capture_base layer and all overlays present in the OCA Bundle are included in the OCA Bundle Archive. There is also a short header of information that includes references to the standards used and briefly describes the contents of OCA Bundle Archive. As references to the original standards (via archival DOI identifier(s)), descriptions of the OCA format witin OCA Bundle Archive are as short as possible but no shorter.

## Reference
An example OCA Bundle Archive is included here.

```
This is an archival format of the machine-readable OCA schema in a human-readable format
OCA_Bundle_Archive/1.0

Reference for Overlays Capture Architecture (OCA): 
https://doi.org/10.5281/zenodo.7707467
Reference for OCA_Bundle_Archive/1.0:
<when available>

In OCA, a schema consists of a capture_base which documents the attributes and their most basic features.
A schema may also contain overlays which add details to the capture_base.
For each overlay and capture_base a hash of their original contents has been calculated and is reported here as the SAID value.

This archival format documents the capture_base and overlays that were associated together in a single OCA Bundle.
Each section between rows of ****'s contains the details of one "layer type/version" of the OCA Bundle.


BEGIN_OCA_BUNDLE
******************************************
Layer name: meta/1.0
SAID: EKBw_KVlzdxI6tvopUHwdUc2DhmMrGWaZ3h7q1pWi-nA
language: en

schema name: Insect Counting
schema description: A schema for insect counts developed at the University of Guelph as an ADC test schema

******************************************
Layer name: capture_base/1.0
SAID: EVnvZJj9NrgJcyjB9Hltx6r1w1fi20mVG23vv7eI2sC8
Classification: CRDC:RDF40

Schema attribute: attribute type
	analysisDate: DateTime
	collectionDate: DateTime
	insectCount: Numeric
	insectType: Numeric
	insectWeight: Array[Numeric]
	location: Text

******************************************
Layer name: unit/1.0
SAID: E_XuB6gNgVuOjy2pHQvD6wz1KZy8SPUsVTjxYiH0b250

Schema attribute: unit
	insectWeight: mg

******************************************
Layer name: label/1.0
SAID: EEx61pSoWiYrfcqavqh3xQl-WVGB9MAgOFRVCqXbUKjY
language: en

Schema attribute: label
	analysisDate: Date of Analysis
	collectionDate: Date of Collection
	insectCount: Insect Count
	insectType: Insect Type
	insectWeight: Insect Weight(s)
	location: Campus location

******************************************	
Layer name: information/1.0
SAID: E0P9nrVxglX0G0nQxqUUT2M_-gUUAO-Il3zVBDfD-W4E
language: en

Schema attribute: information
	analysisDate: Data of analysis of samples (all in a single day)
	collectionDate: Date of sample collection
	insectCount: number of specified honeybees
	insectType: species of honeybee counted and weighed
	insectWeight: weights of honebees that were weighed: note not every collected bee was weighed
	location: Campus location where the samples were collected on the date of sample collection

******************************************	
Layer name: character_encoding/1.0
SAID: ETCBOek8JY83XCtZTOUyXlcnTczEdytLp-xpC7eDGRGY
default_character_encoding: utf-8

Schema attribute: character_encoding
	analysisDate: utf-8
	collectionDate: utf-8
	insectCount: utf-8
	insectType: utf-8
	insectWeight: utf-8
	location: utf-8
	
******************************************	
Layer name: entry_code/1.0
SAID: E3PGUpSlSQDrmDabXs4_neknGV-5eLYD-5VstMOBimRM

Schema attribute: associated entry codes
        insectType: ["501", "527"]
        location: ["BAFF", "TH"]

******************************************	
Layer name: entry/1.0
SAID: EJUu256bPq40VO1IpbAyKDlErOZFbix141GerLcOfgh4
language: en

For each schema attribute 
the associated entry codes: entry labels

	insectType:
		501: Carniolan honey bee
		527: Russian honey bee

	location:
		BAFF: Bedrock Aquifer Field Facility
        TH: Townsend House

******************************************
END_OCA_BUNDLE
```

## Drawbacks
We are introducing another filetype in the OCA Ecosystem for the representation of OCA schema information.

## Rational and Alternatives
The alternative is to not create the file and expect that users will be able to understand the JSON files of an OCA Bundle.
In the context of research data archiving, users will also have to recreate the schema data by hand in a .txt or .csv format to meet mandates of accessibility.

## Prior Art

## Unresolved questions

TBD

## Implementations

The following lists the implementations (if any) of this RFC. Please do a pull request to add your implementation. If the implementation is open source, include a link to the repo or to the implementation within the repo.

*Implementation Notes* [may need to include a link to test results](README.md#accepted).

Name / Link | Implementation Notes
--- | --- |
ocafile | TBD | Rust implementation of OCAfile
