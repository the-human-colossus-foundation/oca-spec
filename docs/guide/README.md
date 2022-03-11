#  Overlays Capture Architecture


![OCA](/images/oca.png)

OCA is a standardized global solution for data capture and exchange which
protects sensitive data and provides a positive alternative to current
architectures.

A schema, a machine-readable definition of the semantics of a data structure, is
typically created as a single data object. However, OCA represents a schema as a
multi-dimensional object consisting of a stable schema base and linked overlays,
data objects that provide additional extensions, coloration, and functionality
to the base object. Any sponsor can use a pre-existing schema base and build
their own suite of linked overlays to add extra context to transform how
information is displayed to a viewer or to guide an agent in how to apply a
custom process to schema data.


## Benefits

OCA offers many advantages, including:
- Simplified data pooling. Decoupling can occur at any time as overlays are
  linked objects. With all colouration definitions stored in the overlays,
  combining data from related sources becomes seamless. Overlays can be removed
  from the base objects before the data merging process and reapplied to ensure
  consistent colouration post data pooling.
- Stable capture bases. Most schema updates occur at the application stage. In
  the case of OCA, all extension and colouration definitions are applied in the
  overlays, enabling issuers to edit one or more of the linked objects to create
  simple updates rather than reissue capture bases on an ongoing basis.
- Flagged attributes for encryption. By referencing the Blinding Identity
  Taxonomy (BIT), issuers can flag attributes in the capture base that could
  potentially unblind the identity of a governing entity. With attributes
  flagged at the base object layer, all corresponding data can be treated as
  sensitive throughout a data lifecycle and encrypted or removed at any stage,
  making associated governing entity identification impossible.
- Data decentralisation. Capture base definitions can remain in their purest
  form as a standard base to decentralise data. Thus, once the data holder has
  given adequate consent, data controllers can contribute anonymous data upon
  which 3rd parties can trigger granular criteria searches for matched data,
  eliminating the need for data silos and encouraging consented data sharing. In
  addition, self-determination regarding the secondary use of personal data
  empowers the data holder.
- Internationalisation. A separate linked data object captures character set
  encoding definitions. Thus, a single report definition can contain different
  attribute forms for different languages available to users, based on a
  user's locale and other language preferences.

## OCA characteristics
OCA is built to provide data harmonization architecture for Dynamic Data Economy
(DDE). For that reason OCA strongly relies on security characteristics which are
necessary to achieve authenticity. Each OCA object is equipped with a
[Self-Addressing
Identifier](https://weboftrust.github.io/ietf-said/draft-ssmith-said.html) (SAI)
which is cryptographically bound to the content of the object. SAI assures
immutability, it can be deterministically generated directly from the content
and verified without need to interact with any service or provider. This
approach promotes content-based networks where we care about what it is and not
where it is, leading towards a more decentralized ecosystem.
## OCA Ecosystem


![OCA Ecosystem](/images/oca-ecosystem.png)
