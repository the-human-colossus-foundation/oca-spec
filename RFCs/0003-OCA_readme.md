# 0003 - OCA README
- Authors: Carly Huitema
- Status: REJECTED
- Status Note: Decision by DSWG on 2023-10-05
- Supersedes: none
- Start Date: 2023-02-10

## Summary
OCA README is human-accessible representation of the OCA bundle for human access, OCA discoverability, and schema preservation/archiving.

## Motivation
For helping humans to understand OCA Bundles. Requirements for a datasets schema to be this accessible are:
- Human readable
- Easy to read
- Low tech (.txt)
- Contains some helper information to aid interpretation
- Easy to generate from an OCA bundle for easy development
- Contains references to SAIDs of bundle for findability

Based on experience with users, the JSON formats (while readable to those familiar) present a great barrier for generalist users of the OCA specification and it is a format that is inaccessible to people who need to use specialized devices to access information (e.g. screen readers).

## Tutorial
Each OCA Bundle can be represented as a single .txt file - the OCA README. 

OCA README should be contained within the .zip bundle archive of an OCA schema. This is to help ensure that .zip files found by those who are unfamiliar with the schema format will be able to learn more about OCA and understand the contents of the bundle easily. 

All information within the capture_base layer and all overlays present in the OCA Bundle are included in the OCA README. There is also a short header of information that includes references to the standards used and briefly describes the contents of OCA README. As references to the original standards (via archival DOI identifier(s)), descriptions of the OCA format witin OCA README are as short as possible but no shorter.

## Reference
An example OCA README is included here.

```
This is a human-readable format of an OCA schema
OCA_READ_ME/1.0
README SAID: xxxxxxxxxxxxxxxxxxxxxxxx

Reference for Overlays Capture Architecture (OCA): 
https://doi.org/10.5281/zenodo.7707467
Reference for OCA_READ_ME/1.0:
<when available>

In OCA, a schema consists of a capture_base which documents the attributes and their most basic features.
A schema may also contain overlays which add details to the capture_base.
For each overlay and capture_base a hash of their original contents has been calculated and is reported here as the SAID value.

This READ ME format documents the capture_base and overlays that were associated together in a single OCA Bundle.
OCA_MANIFEST lists all components of the OCA Bundle.
For the OCA_BUNDLE, each section between rows of ****'s contains the details of one "layer type/version" of the OCA Bundle.

BEGIN_OCA_MANIFEST
******************************************
Bundle SAID: XXXXXXX

"capture_base" SAID: "EVnvZJj9NrgJcyjB9Hltx6r1w1fi20mVG23vv7eI2sC8
"character_encoding" SAID: "ETCBOek8JY83XCtZTOUyXlcnTczEdytLp-xpC7eDGRGY"
"entry (en)" SAID: "EJUu256bPq40VO1IpbAyKDlErOZFbix141GerLcOfgh4"
"entry_code" SAID: "E3PGUpSlSQDrmDabXs4_neknGV-5eLYD-5VstMOBimRM"
"format" SAID: "ESxH42FcC2WcnWrJHIeuXr55MoS9EWGl8PUiA-SwTwok"
"information (en)" SAID: "E0P9nrVxglX0G0nQxqUUT2M_-gUUAO-Il3zVBDfD-W4E"
"label (en)" SAID: "EEx61pSoWiYrfcqavqh3xQl-WVGB9MAgOFRVCqXbUKjY"
"meta (en)" SAID: "EKBw_KVlzdxI6tvopUHwdUc2DhmMrGWaZ3h7q1pWi-nA"
"unit" SAID: "E_XuB6gNgVuOjy2pHQvD6wz1KZy8SPUsVTjxYiH0b250"
******************************************
END_OCA_MANIFEST


BEGIN_OCA_BUNDLE
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
Layer name: meta/1.0
SAID: EKBw_KVlzdxI6tvopUHwdUc2DhmMrGWaZ3h7q1pWi-nA
language: en

schema name: Insect Counting
schema description: A schema for insect counts developed at the University of Guelph as an ADC test schema

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
The alternative is to not create the file and expect that users will be able to understand the JSON files of an OCA Bundle and also find correct information about the OCA schema format.

## Prior Art

## Unresolved questions

TBD

## Implementations

The following lists the implementations (if any) of this RFC. Please do a pull request to add your implementation. If the implementation is open source, include a link to the repo or to the implementation within the repo.

*Implementation Notes* [may need to include a link to test results](README.md#accepted).

Name / Link | Implementation Notes
--- | --- |
ocafile | TBD | Rust implementation of OCAfile
