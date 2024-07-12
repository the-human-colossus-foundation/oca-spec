# OCA File

The **OCA File** is a concept that enables the expression of OCA Objects using a Domain Specific Language (DSL). The [specification](/specification/ocafile.md) informative sections elaborate on the demand for a human-readable and machine-actionable language.

OCAFile conceptually encompasses the [OCA Bundle](/ecosystem/oca-bundle.md) concept and enables the creation and manipulation of it.

## Usage

OCAFile provides instructions for creating OCA Objects, such as Capture Bases and Overlays. The instructions reflect the [OCA specification](/specification/README.md).

### OCAFile in a nutshell

The construction of an OCAfile begins with the pivotal step of creating a Capture Base through the `ADD ATTRIBUTE` command. This step is foundational, setting the stage for the schema's development. The subsequent use of `ADD <overlay-type> ATTRS` for binding overlay types to the capture base introduces additional layers of complexity and functionality. Together, these commands form the bedrock of the OCAfile, enabling the creation of robust, multifaceted schemas that are capable of capturing and representing complex data structures and relationships within the OCA framework.

### Create an OCAFile

Let's start with an example and then discuss instructions step by step. The following example is a simple `Entrance Credential` example:

```ocafile
--name=EntranceCredential
ADD ATTRIBUTE d=Text i=Text passed=Boolean
ADD META en PROPS name="Entrance credential" description="Entrance credential"
ADD CHARACTER_ENCODING ATTRS d=utf-8 i=utf-8 passed=utf-8
ADD CONFORMANCE ATTRS d=M i=M passed=M
ADD LABEL en ATTRS d="Schema digest" i="Credential Issuee" passed="Passed"
ADD LABEL pl ATTRS d="Identyfikator" i="Wydawca" passed="Pozwolenie"
ADD ATTRIBUTE select=Text
ADD ENTRY_CODE ATTRS select=["o1", "o2", "o3"]
ADD ENTRY en ATTRS select={"o1": "Adult", "o2": "Childe", "o3": "Veteran"}
ADD ENTRY pl ATTRS select={"o1": "Dorosły", "o2": "Dziecko", "o3": "Weteran"}
```

_Source: [entrance-credential.ocafile](https://github.com/THCLab/ocafile-examples/blob/main/entrance-credential.ocafile)_

Explanation:

- The `ADD ATTRIBUTE` command defines the attributes of the OCA Capture Base.
- The `ADD META` command defines the OCA Bundle's metadata.
- The `ADD CHARACTER_ENCODING` command defines the character encoding of the attributes (`Character Encoding Overlay`).
- The `ADD CONFORMANCE` command defines the conformance of the attributes (`Conformance Overlay`).
- The `ADD LABEL` command defines the labels for the attributes (`Label Overlay`).
- The `ADD ENTRY_CODE` command defines the entry code for the attributes (`Entry Code Overlay`).
- The `ADD ENTRY` command defines the entries for the attributes (`Entry Overlay`).

### Build an OCAFile

You can build an OCAFile using the OCA Bin. The following command builds the `Entrance Credential` example:

```bash
$ ./oca build --ocafile entrance-credential.ocafile

# OCA bundle created in local repository with SAID: EKvrSBy4Nu29oFF-q4NubgvTLWe4G3yRcEo3zoFjr9hd
# and name: EntranceCredential
```

### Alter an OCAFile

You can alter an OCAFile and add instructions to modify or extend an existing Bundle. You can do it by appending the `entrance-credential.ocafile` from above or using the `FROM` command. We demonstrate the latter approach. Let's add a new attribute to the `Entrance Credential` example:

```ocafile
--name=ExpiringEntranceCredential
FROM EKvrSBy4Nu29oFF-q4NubgvTLWe4G3yRcEo3zoFjr9hd # This is the SAID of the EntranceCredential
ADD ATTRIBUTE expires=DateTime
ADD CONFORMANCE ATTRS expires=M
ADD LABEL en ATTRS expires="Expiration date"
ADD LABEL pl ATTRS expires="Data wygaśnięcia"
```

_Source: `expiring-entrance-credential.ocafile`_

Let's now build the `Expiring Entrance Credential`:

```bash
$ ./oca build --ocafile expiring-entrance-credential.ocafile

# OCA bundle created in local repository with SAID: EHGzoceOvAbrgDHZZXTPAOD_zzVhuVjTwF9DAXEmynfE
# and name: ExpiringEntranceCredential
```

## Commands

::: tip
All commands are case-insensitive. The commands are written in uppercase for clarity.
:::

### ADD

The `ADD` operation enables the actual creation of OCA Objects.

#### ADD ATTRIBUTE

Adds attributes to the Capture Base. Supports adding multiple attributes at once.

```ocafile
ADD ATTRIBUTE d=Text i=Text passed=Boolean
```

_Example: `ADD ATTRIBUTE`_

#### ADD FLAGGED_ATTRIBUTES

Adds flagged attributes, so-called [ PIIs ](https://en.wikipedia.org/wiki/Personal_data), to the Capture Base. Supports adding multiple attributes at once:

```ocafile
ADD FLAGGED_ATTRIBUTES name surname email
```

_Example: `ADD FLAGGED_ATTRIBUTES`_

#### ADD CHARACTER_ENCODING

Adds character encoding to the attributes. Supports adding multiple attributes at once.

```ocafile
ADD CHARACTER_ENCODING ATTRS d=utf-8 i=utf-8 passed=utf-8
```

_Example: `ADD CHARACTER_ENCODING`_

Supported encodings:

- `base64`
- `utf-8`
- `iso-8859-1`
- `utf-16`
- `utf-16be`
- `utf-16le`

#### ADD FORMAT

Specifies attribute format. Useful, i.e., for binary data.

```ocafile
ADD ATTRIBUTE image=Binary
ADD FORMAT ATTR image="image/png"
```

_Example: `ADD FORMAT`_

#### ADD LABEL

Adds localized human-readable labels to the attributes. Supports adding multiple attributes at once.

The `LABEL` command is localized and expects the `ISO 639` language code in the command input.

```ocafile
ADD LABEL en ATTRS d="Schema digest" i="Credential Issuee" passed="Passed"
ADD LABEL pl ATTRS d="Identyfikator" i="Wystawca" passed="Pozwolenie"
```

_Example: `ADD LABEL`_

#### ADD META

Adds localized human-readable metadata to the OCA Bundle. Support `name` and `description` properties.

The `META` command is localized and expects the `ISO 639` language code in the command input.

```ocafile
ADD META en PROPS name="Entrance credential" description="Entrance credential"
```

_Example: `ADD META`_

#### ADD CARDINALITY

Adds [ cardinality ](https://en.wikipedia.org/wiki/Cardinality) property to the attributes. Supports adding multiple attributes at once.

```ocafile
ADD ATTRIBUTE tools=Array[Text]
ADD CARDINALITY ATTRS tools="1-"
```

_Example: `ADD CARDINALITY`_

See [the spec](/specification/README.md#cardinality-overlay) for the available cardinality options.

#### ADD CONFORMANCE

Adds conformance property to the attributes. Supports adding multiple attributes at once.

```ocafile
ADD CONFORMANCE ATTRS passed=M
```

_Example: `ADD CARDINALITY`_

The attribute conformance can be set to either M (mandatory) or O (optional).

#### ADD ENTRY_CODE

Adds entry codes to the attribute. Supports adding multiple attributes at once.

```ocafile
ADD ENTRY_CODE ATTRS gender=["m", "f", "o"]
```

_Example: `ADD ENTRY_CODE`_

#### ADD ENTRY

Adds entries to the attribute. Supports adding multiple attributes at once.

```ocafile
ADD ENTRY en ATTRS gender={"m": "Male", "f": "Female", "o": "Other"}
ADD ENTRY pl ATTRS gender={"m": "Mężczyzna", "f": "Kobieta", "o": "Inne"}
```

_Example: `ADD ENTRY`_

### FROM

The `FROM` operation extends an existing OCA Bundle without modifying it. It creates a new OCA Bundle with a new SAID that includes the original Bundle.

```ocafile
FROM EKvrSBy4Nu29oFF-q4NubgvTLWe4G3yRcEo3zoFjr9hd

ADD ATTRIBUTE expires=DateTime
#...more commands...
```

## Basic Types

OCAFile supports all the types defined in [OCA specification](/specification/README.md#attribute-type). The following types are available:

- `Array`
- `Binary`
- `Boolean`
- `DateTime`
- `Numeric`
- `Text`

## References

To establish relationships among OCA Bundles, OCAFile supports references. The reference mechanism mimics [foreign key](https://en.wikipedia.org/wiki/Foreign_key) concept widely known in relational databases.

The process of creating a relationship between OCA Bundles consists of two steps:

1. Define an OCAFile that will be referred to (`origin OCAFile`).
2. Refer to the origin OCAFile in another OCAFile (`destination OCAFile`).

### Reference types

There are two ways to establish a relationship between OCA Bundles

#### `refs` directive

In the `destination OCAFile`, use the `refs` prefix that resolves to `SAID reference` and expects the SAID of the referred OCA Bundle (the product of `origin OCAFile`).

```ocafile
ADD ATTRIBUTE customer=refs:ENqVB-2SpRIJTaqeaGfQNKQ580rvDc1QUJUswJYyze7Y
```

_`refs` example. Customer SAID refers to `customer.ocafile` defined below._

The `customer` attribute defined using `refs` gets the same characteristics as any other attribute. It can have labels, conformance, and other properties.

#### `refn` directive

In the `destination OCAFile`, use the `refn` prefix that resolves to a `named reference` and expects the name of the referred OCA Bundle. The name of the Bundle is set implicitly using `--name` directive in its source OCAFile. Furthermore, it resolves locally using only the [ OCA Bin ](/ecosystem/oca-bin.md) command line interface.

The `refn` directive creates a reference that can be resolved using a human-readable name rather than a digest (`SAID`). This is useful when working with a large number of OCAFiles as it reduces the complexity of maintaining references via immutable SAIDs. Working with `origin OCAFile` doesn't require the SAID change in `destination OCAFile` every time it changes.

```ocafile
ADD ATTRIBUTE customer=refn:Customer
```

_`refn` example. Customer SAID refers to `customer.ocafile` defined below._

The `customer` attribute defined using `refn` gets the same characteristics as any other attribute. It can have labels, conformance, and other properties.

::: warning
The `refn` directive works solely in a local environment in collaboration with the [ OCA Bin ](/ecosystem/oca-bin.md).
:::

### Relationships

#### Has one

Let's consider the following OCAFiles as an example:

_`customer.ocafile`_

```ocafile
--name=Customer
ADD ATTRIBUTE name=Text address=Text
ADD LABEL en ATTRS name="Name" address="Address"
ADD LABEL pl ATTRS name="Nazwa klienta" address="Adres"
```

_`invoice.ocafile`_

```ocafile
--name=Invoice
ADD ATTRIBUTE issued=DateTime customer=refn:Customer
ADD CONFORMANCE ATTRS issued=M
ADD LABEL en ATTRS issued="Issued date"
ADD LABEL pl ATTRS issued="Data wystawienia"
ADD LABEL en ATTRS customer="Customer"
ADD LABEL pl ATTRS customer="Klient"
```

Running the `OCA Bin`:

```bash
$ ./oca build  --ocafile customer.ocafile
# OCA bundle created in local repository with SAID: ENqVB-2SpRIJTaqeaGfQNKQ580rvDc1QUJUswJYyze7Y
# and name: Customer

$ ./oca build  --ocafile invoice.ocafile
# OCA bundle created in local repository with SAID: EC2TrdZ8koM8w-zUZm1r0LUcUp9VHFrcuMOrs7WmsD0Z
# and name: Invoice
```

We have two OCAFiles: `customer.ocafile` and `invoice.ocafile`. The `customer.ocafile` defines a unique name using the `--name=Customer` directive.

The `invoice.ocafile` defines the `customer` attribute as `customer=refn:Customer`. It establishes a relationship between the `Invoice` and `Customer` OCA Bundles and specifically says that `Invoice has one Customer`.

#### Has many

Let's define the `Line Item` OCAFile for the invoice:

```ocafile
--name=LineItem
ADD ATTRIBUTE product=Text quantity=Numeric price=Numeric
ADD CONFORMANCE ATTRS product=M quantity=M price=M
ADD LABEL en ATTRS product="Product" quantity="Quantity" price="Price"
ADD LABEL pl ATTRS product="Produkt" quantity="Ilość" price="Cena"
```

_`line-item.ocafile`_

and extend the `invoice.ocafile` from [Has one](#has-one) section:

```ocafile
-- name=InvoiceWithLineItems
# FROM currently lacks the `refn` support :-(
FROM EC2TrdZ8koM8w-zUZm1r0LUcUp9VHFrcuMOrs7WmsD0Z # This is the SAID of the Invoice

ADD ATTRIBUTE lineItems=Array[refn:LineItem]
ADD LABEL en ATTRS lineItems="Line Items"
ADD LABEL pl ATTRS lineItems="Pozycje"
ADD CARDINALITY ATTRS lineItems="1-"
```

_`invoice-with-line-items.ocafile`_

Running the `OCA Bin`:

```bash
$ ./oca build  --ocafile line-item.ocafile

# OCA bundle created in local repository with SAID: ED-lSEZPr1W5M7zRgYEWbnBwhNawOgnesrXUB34_mD6o
# and name: LineItem

$ ./oca build  --ocafile invoice-with-line-items.ocafile
# OCA bundle created in local repository with SAID: EEYxTLl68T_Yl1EYzcW40bqefsvrggw5-6cWYqFUmIAz
# and name: InvoiceWithLineItems
```

The `invoice-with-line-items.ocafile` extends the `Invoice` OCA Bundle with the `lineItems` attribute, an array of `LineItem`. It establishes a relationship between the `Invoice` and `LineItem` OCA Bundles and says that `Invoice has many Line Items`.
