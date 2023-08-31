# 0002 - OCA attribute ordering overlay

- Authors: Decentralised Semantics Working Group
- Status: PROPOSED
- Status Note: none
- Supersedes: none
- Start Date: 2023-07-28 


## Summary

The DSWG has been actively discussing the issue of facilitating attribute ordering as a specific overlay task within an OCA bundle. Participants have presented various use cases, highlighting the need for an effective ordering mechanism. After thorough discussions, it is evident that the current OCA standard and documentation must offer a suitable solution.

In data management practices, "attribute ordering" refers to arranging or sequencing attributes (columns or fields) within a database table or dataset. When you work with structured data, such as in relational databases or spreadsheets, each row represents a record, and each column represents a specific attribute or characteristic of that record.

The attribute ordering determines the position of each attribute in the table or dataset. For example, let's consider a simple table representing customer data:

Customer ID | First Name | Last Name | Email             | Phone Number
------------|------------|-----------|-------------------|--------------
001         | John       | Doe       | john@example.com  | 555-123-4567
002         | Jane       | Smith     | jane@example.com  | 555-987-6543

*Table 1. Attribute ordering.*

In this example, the attribute ordering is:

1. Customer ID
1. First Name
1. Last Name
1. Email
1. Phone Number

The order of attributes is essential for organizing and retrieving data efficiently. Attribute ordering of data may impact the following aspects:

* **Readability and Understanding**: A well-organized attribute ordering can make it easier for analysts, developers, and data consumers to understand the dataset's structure and quickly identify the necessary information.

* **Consistency between datasets**: The attribute ordering should be consistent when analysing and exchanging data with other systems, such as spreadsheets.

It's important to note that attribute ordering is mainly relevant to structured data formats like databases and spreadsheets. In contrast, unstructured data, such as text documents or images, does not have a predefined attribute ordering.

This Request For Comments (RFC) presents the question and proposal to the DDE tech team. Technical assessment of this proposal is essential in guiding our future efforts to detail the requirements accurately.


## Motivation

The presentation of a complex data object relies on the overlays within an OCA Bundle. It is essential to implement an ordering mechanism to facilitate the ordering of attributes for users, ensuring the integrity of the data object by including ordering information within the OCA Bundle rather than leaving it to the discretion of the presentation.

Preserving the attribute order is crucial in many schemas. Users must evaluate if a schema is fit for purpose by interpreting and understanding the information it contains. Alphabetical ordering is unsuitable for larger schemas. Attribute order is instrumental in helping users comprehend and utilize datasets effectively.

For instance, a schema may contain shipping location attributes (name, address, city, postal code, country) followed by billing location attributes with similar information. Users need a solution to facilitate attribute reordering for interpreting and utilizing data. Strictly relying on a default ordering of schema attributes by alphabetical order may lead to bad data management practices and difficulties in analyzing and comprehending the data. Some users may resort to prefixing attribute names with numbers (e.g., 1_firstName, 2_lastName) to maintain order, but this approach contradicts the principle of having distinct tasks for each overlay and interferes with searching functionalities in the OCA Repository.
 

## Tutorial

Discussions in the DSWG have led to the following proposal:

1. *An overlay for attribute order presentation*. The "Ordering Overlay" is an optional tool for displaying the numerical ordering of attributes in a dataset, providing a reference guide for understanding its structure. There can only be one ordering overlay per OCA bundle. The decision to order or leave attributes unordered depends on the data management requirements and the downstream implementation. The flexibility allows for adaptability and accommodation of diverse data handling scenarios, optimizing data readability and accessibility for various stakeholders involved in data analysis and decision-making processes.

```{
   "capture_base":"E6dVEHR0obA673USLKJpuvv6qZ9pKnKd-iSCHrsHBue4",
   "type":"spec/overlays/ordering/1.0",
   "attribute-order":{
      "customerID":"1",
      "firstName":"3",
      "lastName":"2",
      "emailAddress":"5",
      "phoneNumber":"4"
   }
}```

*Example 1. Code snippet for an Ordering Overlay.*

Customer ID | Last Name | First Name | Phone Number | Email
------------|-----------|------------|--------------|-----------------
001         | Doe       | John       | 555-123-4567 | john@example.com
002         | Smith     | Jane       | 555-987-6543 | jane@example.com

*Table 2. Attribute ordering as defined in the Ordering Overlay in Example 1.*

Following the definition supplied in the Ordering Overlay, the attribute ordering is:

1. Customer ID
1. Last Name
1. First Name
1. Phone Number
1. Email


## Reference

See DSWG meeting minutes from 2023/07/23 here for more information on the group’s deliberations on the topic.


## Drawbacks

**Consideration #1**: One drawback is that it necessitates the addition of a new overlay to the existing standard (OCA Specification v1.0). This modification implies recording the expansion of the standard to accommodate the inclusion of additional overlays. While this approach may provide attribute ordering, it could lead to complexities and possible compatibility issues with systems following the previous standard version. The proposal could consider carefully evaluating backward compatibility and a clear versioning strategy to ensure smooth integration with existing implementations.
 
**Consideration #2**: Another consideration is that it relies heavily on developers' diligence and adherence to the OCA implementation guidelines when no ordering information is in the bundle. If developers strictly adhere to the guidelines, it could result in data objects needing proper ordering information. The proposal could incorporate built-in checks and validation mechanisms that encourage adherence to the OCA guidelines to mitigate this risk. Additionally, providing more precise documentation and training for developers on adhering to the guidelines could help maintain data consistency.


## Prior Art

There are similarities between attribute ordering and text block ordering in TeX, a typesetting system for complex document formatting. In TeX, text block ordering involves two key components. Firstly, based on the text's natural linearity, canonical ordering determines the order of all TeX objects within the document. Secondly, TeX utilizes a low-level primitive called "\counter" to define various types of counters managed at a lower level and not directly dealt with by end users. Instead, end users interact with higher-level structures like "\chapter" and "\section," which depend on these counters. Remarkably, even these higher-level structures offer parameters that can be set by end users, providing customization options (e.g., ordering references according to specific rules). The discussion highlights the importance of balancing low-level control and high-level structure when implementing effective attribute ordering mechanisms.
 

## Unresolved questions

Technology feasibility


## Implementations

