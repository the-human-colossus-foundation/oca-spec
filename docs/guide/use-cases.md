# Use cases

Although "data harmonisation" is the core characteristic of the Semantic domain, OCA must also support the "objectual integrity" of any digital object and its relationships with other objects.

## Use case #1: Data transformation using overlays
Data transformation is a crucial data management requirement for integration, migration, data warehousing, and data preparation, involving converting data from one format to another (e.g., a database file, XML document or Excel spreadsheet). These modifications typically involve converting a raw data source into a cleansed, validated, and ready-to-use format.
OCA allows an issuer to transform data morphologically, operating on subsets of data while maintaining information over the data supply chain. Applied to machine learning (ML), OCA thus enables direct linkage of an ML-generated image with the training data used to produce the final result.
Separating overlays from the defined capture base offers a harmonisation solution between data models and data representation formats and from unstructured to structured data. Data harmonisation involves transforming datasets to fit together structurally while ensuring the definitional and contextual meaning of the source data is uniformly understood by all interacting actors, regardless of how it was collected initially.

![Use case transformation](/images/use-case-transformation.png)
_Figure 3. Data transformation. Decentralised semantics offer a harmonisation solution between data models and data representation formats, or from unstructured to structured data._

By issuing and controlling a set of proprietary transformation overlays, purpose-driven service providers can securely map source attribute names, entry codes, or unit conversions to a standard capture base defined by either a centralised organisation or a multistakeholder data governance administration. Capture bases provide a substrate for data harmonisation. Specifically, a cryptographic link is established from the transformation overlays to a consensually-defined capture base, ensuring the integrity of those objectual relationships and facilitating a secure means for data harmonisation.

Transformation overlays include: 
- Attribute mapping
- Entry code mapping
- Subset
- Unit mapping

## Use case #2: Object presentation using overlays
In many instances of object presentation, the legal entity that issues the original data capture form may differ from the entity that issues the presentation objects required to produce an associated credential. For example, national passport issuance provides an opportunistic use case to demonstrate the advantages of this particular characteristic.

The International Civil Aviation Organization (ICAO) [3], a specialised agency of the United Nations [4], is tasked with planning and developing standards for safe international air transport. ICAO’s primary role is to provide standards that will help regulate aviation worldwide. One of those standards is ICAO Document 9303 [5] (endorsed by the International Organization for Standardization (ISO) [6] and the International Electrotechnical Commission (IEC) [7] as ISO/IEC 7501-1 [8]), a global standard for machine-readable travel documents (MRTD), including the data capture requirements of a machine-readable passport (MRP). As a result, ICAO is well-positioned to be the primary issuer of a standard capture base and the core overlays required for MRP form inputs, semantics, and presentation.

However, the issuance of any presentation objects needed to produce a national passport with branded design requirements would be under the remit of issuing governmental agencies, including cantonal passport offices in the country and at its embassies or consulates overseas. As an example for Switzerland, the Swiss Government is the authority to act as the primary issuer of presentation overlays to produce a branded Swiss passport, a credential identifying a traveller as a Swiss citizen or national with a right to protection while abroad, and a right to return to Switzerland.
The capture base and overlays are identifiable by Self-Addressing IDentifiers (SAID) [9], a particular type of content-addressable identifier based on a self-referential cryptographic digest. These identifiers are deterministic. In other words, there is no randomness in the identifier generation process, ensuring the objectual integrity of the digital objects and their relationships.

![Use case presentation](/images/use-case-presentation.png)
_Figure 4. Dynamic presentation. The decentralised control of presentation overlays within a governed ecosystem enables the autonomous rendering of different transient objects cryptographically bound to the same capture base._

In this particular use case, authorised Swiss governmental agencies would inevitably store an instance of the ICAO-issued MRP objects in local repositories. However, the SAIDs of those digital objects would remain unchanged from the original identifiers held in an ICAO repository. As the object identifiers are deterministic, the dynamic presentation of national passports, in this case, can be established securely by maintaining a cryptographic thread from the presentation overlays to a standard capture base for global standardisation. Note that a national passport is an example of a credential presentation. However, for different use cases, the presentation of other transient object types, such as digital forms, contracts, and receipts, would also benefit from the dynamic issuance of presentation overlays.

Presentation overlays include: 
- Layout
- Sensitive

## Use case #3: Internationalisation using language-specific overlays
Internationalisation involves designing and developing a product for target audiences that vary in culture, region, or language. The internationalisation of transient digital objects across ecosystems is essential for service providers to participate in a global market. 

Let us take Switzerland as an example of a multilingual country. It is officially quadrilingual, with German, French, Italian, and Romansh as its national languages. However, many other minority languages, such as English, are becoming increasingly important. Since Switzerland is a federation, the sovereign cantons define their official language according to the primary language spoken by their inhabitants.

![Use case i18n](/images/use-case-i18n.png)
_Figure 5. Internationalisation. Switzerland is a quadrilingual country. The decentralised control of language-specific overlays would enable cantonal authorities to translate official documents issued by the Swiss national federal government into their region’s official language(s)._

Presenting information for a purpose-driven activity in a language understandable to all recipients has commonly involved replicating digital forms, credentials, notices, and contracts into various languages based on user preferences. With federated or centralised governance authorities maintaining digital objects in multiple languages, internal data management inefficiencies are common to many organisations, institutions, and governments.

The FAIR (Findable, Accessible, Interoperable, and Reusable) data principles [10] support the reusability of digital assets. Still, many legal entities have difficulty streamlining data management practices and processes to comply with these guiding principles.

OCA offers a solution for the internationalisation of digital objects within data ecosystems by enabling various authorised entities to control a different set of language-specific overlays for a particular transient object, such as a digital form, with a data governance administration defining and issuing a standard capture base and core language-agnostic or default language overlays. 

With cantonal participation being an essential ingredient of Swiss-style federalism, separating language-specific overlays from any capture bases and core language-agnostic overlays issued by the federal government would enable a collaborative solution to internationalisation. In this scenario, decentralised semantics allow sets of language-specific overlays to be controlled and maintained by different cantons depending on their primary spoken language. In other words, distributed control of language-specific overlays would enable regional authorities to manage the official translation of any document issued by a national federal government into their region’s official language(s).

The above example is globally scalable, with OCA enabling the translation of any digital object under established governance while preserving its objectual integrity. More importantly, it significantly impacts objectual inclusiveness within digital systems. Within an ecosystem, OCA allows for transient object design in a particular language, where additional interoperable language-specific overlays, including those for minority or indigenous languages, can be added dynamically.

Whether defining schemas within a centralised organisation or a multistakeholder data governance administration, OCA offers a network-agnostic solution for data harmonisation within any governance framework.

Language-specific overlays include:
- Entry
- Information
- Label
- Meta

## Use case #4: Distributed custodianship of task-specific objects
Distributed custodianship of capture bases, overlays, code tables, and other assets enables the responsibility of separate tasks to reside with different actors without compromising the objectual integrity of the overall semantic structure. As a result, multiple actors from various institutions can contribute to developing schemas for complex use cases, supply chains, and data flows supported by multistakeholder data governance administrations and frameworks.

## Use case #5: Internet of Things (IoT) applications using overlays
The Internet of Things (IoT) describes physical objects (or groups of such objects) with sensors, processing ability, software, and other technologies that connect and exchange data with other devices and systems over the Internet or other communications networks. IoT data collection involves using sensors to track the performance of devices connected to the Internet of Things. In addition, the sensors track the status of the IoT network by collecting and transmitting real-time data that is stored and retrieved at any moment.

IoT applications make continuous, thorough measurements possible through low-power and wireless sensor nodes. Many existing IoT measurement mechanisms focus on obtaining real-time measurements, enabling improved insights on changes in the measurand. The closeness between the measurement's result and the measurand's true value indicates the measurement's accuracy. As such, a unit, a factor used to express the quantity of the measurand, often accompanies the measurement as a standardised quantity defined and adopted by convention or law.

Aligning measurement units is particularly important in areas requiring data sharing or conversion between units. For example, independent IoT sensors may use different units to represent their measurements, and a mapping is needed when consolidating their data.


![Use case presentation](/images/use-case-transformation2.png)
_Figure 6. Unit conversions for measurements captured by IoT devices. Unit mapping overlays can be strongly bound to capture bases containing unit overlays with unit conversion tables providing recipes for seamless measurement conversions._

By issuing and controlling unit mapping overlays, purpose-driven service providers can provide source units for continuous measurements captured and transmitted by IoT devices. Capture bases and associated unit overlays issued and controlled by data governance administrations offer a target for unit harmonisation with unit conversion tables providing the recipe for seamless measurement conversions. Specifically, a cryptographic link is established from the unit mapping overlays to consensually-defined capture bases and unit overlays, ensuring the integrity of those objectual relationships and facilitating a secure means for unit harmonisation.

Overlays required for unit conversions include:
- Unit mapping (source)
- Unit (target)
