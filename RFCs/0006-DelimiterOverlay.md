# 0006 - OCA delimiter overlays
- Authors: Carly Huitema / Paul Knowles
- Status: PROPOSED
- Status Note: none
- Supersedes: none
- Start Date: 2024-02-22

## Summary
In order to understand any array attributes of a dataset it is important to know what delimiter and escape character the array data uses. This information can be supplied by an array delimiter overlay.

## Motivation
It is important for a data users to understand what (if any) delimiters and escape characters are used for any array attributes in a dataset the schema applies to. This is important for several reasons:

1. Parsing and Data Processing: Knowing the array delimiter and escape character is essential for accurately parsing and processing the dataset programmatically. Different delimiters and escape characters may require specific handling to correctly interpret the data. Without this information, developers may encounter errors or inconsistencies when working with the dataset.
2. Data Integrity: The array delimiter and escape character are integral parts of the dataset's structure. Documenting them helps ensure that users interpret the data correctly, reducing the risk of misinterpretation or data corruption. By clearly specifying these characters, dataset creators can help maintain the integrity and reliability of the data.
3. Handling Special Characters: Sometimes, datasets contain special characters that need to be escaped to be correctly interpreted. Documenting the escape character allows users to understand how these special characters are represented in the dataset and how to handle them during data processing.
4. Interoperability: When datasets are shared or exchanged between different systems or platforms, specifying the array delimiter and escape character promotes interoperability. Users from different environments can understand how the data is structured and processed, ensuring compatibility and smooth data exchange.
5. Documentation Clarity: Comprehensive documentation improves dataset usability. Including details about the array delimiter and escape character enhances the clarity of the documentation, making it easier for users to understand and work with the dataset effectively.
6. Standardization: Following consistent documentation practices across datasets promotes standardization and best practices. Including the array delimiter and escape character as part of dataset documentation aligns with this principle, making datasets easier to understand and work with for a wider audience.

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
    "Albumin_concentrations": "Array[Numeric]",
    "Glucose_concentrations": "Array[Numeric]",
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
```
### Examples of a delimiter overlay.
Delimiters and escape characters can be provided for some or all of the array attributes in a schema. Delimiters/escape characters may be different for each attribute.
```
{
  "capture_base": "Etszl9LgLUjllI950rd2lO6rF5-BP_jGzXGBPkFZCZFA",
  "digest": "XXXX",
  "type": "spec/overlays/example/1.0",
  "language": "en-CA",
  "attribute_framing": {
    "Albumin_concentration": {
      "delimiter": ",",
      "escape": "\\"
    },
    "Glucose_concentration": {
      "delimiter": ";",
      "escape": ""
    }
  }
}
```
An example data for this schema would be:

|Albumin_concentrations|Glucose_concentrations|Sample _name|Sample_type|
|---|---|---|---|
|32,33.6,39,36.5|101;103;102;99;96|test sample|BLD001|

## Reference


## Drawbacks


## Rational and Alternatives
Currently, if the data uses a delimiter and escape character for any array datatype there is no place to specify this in the schema.

## Prior Art


## Unresolved questions

## Implementations


