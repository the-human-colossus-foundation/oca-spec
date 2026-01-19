# OCA File

The **OCA File** is a concept that enables the expression of OCA Objects using
a Domain Specific Language (DSL). The
[specification](/specification/ocafile.md) informative sections elaborate on
the demand for a human-readable and machine-actionable language.

OCAFile conceptually encompasses the [OCA Bundle](/ecosystem/oca-bundle.md)
concept and enables the creation and manipulation of it.

## Examples

As a reference, the community maintains example OCAFILEs at
[https://github.com/THCLab/ocafile-examples/](https://github.com/THCLab/ocafile-examples/)

## Usage

OCAFile provides instructions for creating OCA Objects, such as Capture Bases
and Overlays. The instructions reflect the [OCA
specification](/specification/README.md).

### OCAFile in a nutshell

The construction of an OCAfile begins with the pivotal step of creating a
Capture Base through the `ADD ATTRIBUTE` command. This step is foundational,
setting the stage for the schema's development. The subsequent use of
`ADD <overlay-type>` for binding overlay types to the capture base introduces
additional layers of complexity and functionality. Together, these commands
form the bedrock of the OCAfile, enabling the creation of robust, multifaceted
schemas that are capable of capturing and representing complex data structures
and relationships within the OCA framework.

### Create an OCAFile

Let's start with an example and then discuss instructions step by step. The
following example is a simple `Entrance Credential` example:

:::code-tabs

@tab OCAFILE

```ocafile
--name=EntranceCredential
ADD ATTRIBUTE d=Text i=Text passed=Boolean
ADD OVERLAY META
    language="en"
    name="Entrance credential"
    description="Entrance credential"

ADD OVERLAY CHARACTER_ENCODING
    attribute_character_encodings
      d="utf-8"
      i="utf-8"
      passed="utf-8"

ADD OVERLAY LABEL
    language="en"
    attribute_labels
      d="Schema digest"
      i="Credential Issuee"
      passed="Passed"

ADD OVERLAY LABEL
    language="pl"
    attribute_labels
      d="Identyfikator"
      i="Wydawca"
      passed="Pozwolenie"

ADD ATTRIBUTE select=Text

ADD OVERLAY ENTRY_CODE
    attribute_entry_codes
      select=["o1", "o2", "o3"]

ADD OVERLAY ENTRY
    language="en"
    attribute_entries
        select
          "o1"="Adult"
          "o2"="Childe"
          "o3"="Veteran"

ADD OVERLAY ENTRY
    language="pl"
    attribute_entries
      select
        "o1"="Dorosły"
        "o2"="Dziecko"
        "o3"="Weteran"

```

@tab OCA Bundle
```json
{
  "v": "OCAS02JSON000779_",
  "digest": "EBT1L4uMvzLqfqNfJHWa5csmFdhuKpnGl8CZ2Zg_Di2N",
  "capture_base": {
    "digest": "EB6HHwQ08-Ri0r31WhMeC9YEc-1Mnexqv24uomb9lvMK",
    "type": "capture_base/2.0.0",
    "attributes": {
      "d": "Text",
      "i": "Text",
      "passed": "Boolean",
      "select": "Text"
    }
  },
  "overlays": [
    {
      "digest": "ECRBbLUFUph6fyzjTd8FYfJnl0bBgPhnDj17jT2tZScz",
      "capture_base": "EB6HHwQ08-Ri0r31WhMeC9YEc-1Mnexqv24uomb9lvMK",
      "type": "overlay/meta/2.0.0",
      "language": "en",
      "description": "Entrance credential",
      "name": "Entrance credential"
    },
    {
      "digest": "EDOAghIdFd69D3sbja3B0YuJ4uUMZhG8JVwEz8n2U8ff",
      "capture_base": "EB6HHwQ08-Ri0r31WhMeC9YEc-1Mnexqv24uomb9lvMK",
      "type": "overlay/character_encoding/2.0.0",
      "attribute_character_encodings": {
        "d": "utf-8",
        "i": "utf-8",
        "passed": "utf-8"
      }
    },
    {
      "digest": "EPXsr4aNXltHt5cW6eia5GtqRLum_IP-TuOHK2152p5y",
      "capture_base": "EB6HHwQ08-Ri0r31WhMeC9YEc-1Mnexqv24uomb9lvMK",
      "type": "overlay/label/2.0.0",
      "language": "en",
      "attribute_labels": {
        "d": "Schema digest",
        "i": "Credential Issuee",
        "passed": "Passed"
      }
    },
    {
      "digest": "EP9qv4L-S3c7oDtwtucY4_MSKnleEX90VB2K5N0G63KT",
      "capture_base": "EB6HHwQ08-Ri0r31WhMeC9YEc-1Mnexqv24uomb9lvMK",
      "type": "overlay/label/2.0.0",
      "language": "pl",
      "attribute_labels": {
        "d": "Identyfikator",
        "i": "Wydawca",
        "passed": "Pozwolenie"
      }
    },
    {
      "digest": "EHloPRRj5Yp8yUQ27rs1C-betjKO3H8PWPQgSIQ9TTPI",
      "capture_base": "EB6HHwQ08-Ri0r31WhMeC9YEc-1Mnexqv24uomb9lvMK",
      "type": "overlay/entry_code/2.0.0",
      "attribute_entry_codes": {
        "select": [
          "o1",
          "o2",
          "o3"
        ]
      }
    },
    {
      "digest": "ECHC9jkzeLKlJ_j2svVt2HLTJCHzMBvQl4WUI_TOcHIO",
      "capture_base": "EB6HHwQ08-Ri0r31WhMeC9YEc-1Mnexqv24uomb9lvMK",
      "type": "overlay/entry/2.0.0",
      "language": "en",
      "attribute_entries": {
        "select": {
          "o1": "Adult",
          "o2": "Childe",
          "o3": "Veteran"
        }
      }
    },
    {
      "digest": "EMzDRU7yBEp0sdVFj5fIZScZ5_u_eI3rDvboAsAY20WX",
      "capture_base": "EB6HHwQ08-Ri0r31WhMeC9YEc-1Mnexqv24uomb9lvMK",
      "type": "overlay/entry/2.0.0",
      "language": "pl",
      "attribute_entries": {
        "select": {
          "o1": "Dorosły",
          "o2": "Dziecko",
          "o3": "Weteran"
        }
      }
    }
  ]
}
```
:::

_Source: [entrance-credential.ocafile](https://github.com/THCLab/ocafile-examples/blob/main/2.0/entrance_credential.ocafile)_

Explanation:

- The `ADD ATTRIBUTE` command defines the attributes of the OCA Capture Base.
- The `ADD OVERLAY META` command adds overlay which enahnce the OCA Bundle's metadata.
- The `ADD OVERLAY CHARACTER_ENCODING` command adds overlay which defines the character encoding of the attributes (`Character Encoding Overlay`).
- The `ADD OVERLAY LABEL` command adds overlay which defines the labels for the attributes (`Label Overlay`).
- The `ADD OVERLAY ENTRY_CODE` command adds overlay which defines the entry code for the attributes (`Entry Code Overlay`).
- The `ADD OVERLAY ENTRY` command adds overlay which defines the entries for the attributes (`Entry Overlay`).

### Build an OCAFile

You can build an OCAFile using the OCA Bin. The following command builds the `Entrance Credential` example:

```bash
$ ./oca build --ocafile entrance-credential.ocafile

# OCA bundle created in local repository with SAID: EBT1L4uMvzLqfqNfJHWa5csmFdhuKpnGl8CZ2Zg_Di2N
# and name: EntranceCredential
```

### Alter an OCAFile

You can alter an OCAFile and add instructions to modify or extend an existing Bundle. You can do it by appending the `entrance-credential.ocafile` from above or using the `FROM` command. We demonstrate the latter approach. Let's add a new attribute to the `Entrance Credential` example:

```ocafile
--name=ExpiringEntranceCredential
FROM EBAv1B7UV1Du-80pvb78UU4cj68LtHJPidFChkgIFpsH # This is the SAID of the EntranceCredential
ADD ATTRIBUTE expires=DateTime
ADD OVERLAY LABEL
    language="en"
    attribute_labels
        expires="Expiration date"

ADD OVERLAY LABEL
    language="pl"
    attribute_labels
        expires="Data wygaśnięcia"
```

_Source: [expiring_entrance_credential.ocafile](https://github.com/THCLab/ocafile-examples/blob/main/2.0/expiring_entrance_credential.ocafile)_

Let's now build the `Expiring Entrance Credential`:

```bash
$ ./oca build --ocafile expiring-entrance-credential.ocafile

# OCA bundle created in local repository with SAID: EIu4f-p5tIMPuJ0LnQ1DqaxAPS3liknremFRUOrTqWcy
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
ADD OVERLAY LABEL
    language="en"
    attribute_labels
        name="Name"
        address="Address"

ADD OVERLAY LABEL
    language="pl"
    attribute_labels
        name="Nazwa klienta"
        address="Adres"
```

_`invoice.ocafile`_

```ocafile
--name=Invoice
ADD ATTRIBUTE issued=DateTime customer=refn:Customer
ADD OVERLAY LABEL
    language="en"
    attribute_labels
        issued="Issued date"
        customer="Customer"

ADD OVERLAY LABEL
    language="pl"
    attribute_labels
        issued="Data wystawienia"
        customer="Klient"
```

Running the `OCA Bin`:

```bash
$ ./oca build  --ocafile customer.ocafile
# OCA bundle created in local repository with SAID: ELu_Ye6niycz1wtMWpXYtUNVQTD8x65BcB5B33Z9XvDL
# and name: Customer

$ ./oca build  --ocafile invoice.ocafile
# OCA bundle created in local repository with SAID: EMla9w8NDb2RLInJNHEOuPJ4SQ6ifMeh83bTJmxiCeNL
# and name: Invoice
```

We have two OCAFiles: `customer.ocafile` and `invoice.ocafile`. The
`customer.ocafile` defines a unique name using the `--name=Customer` directive.

The `invoice.ocafile` defines the `customer` attribute as
`customer=refn:Customer`. It establishes a relationship between the `Invoice`
and `Customer` OCA Bundles and specifically says that `Invoice has one
Customer`.

#### Has many

Let's define the `Line Item` OCAFile for the invoice:

```ocafile
--name=LineItem
ADD ATTRIBUTE product=Text quantity=Numeric price=Numeric
ADD OVERLAY CONFORMANCE
    attribute_conformances
      product=M
      quantity=M
      price=M

ADD OVERLAY LABEL
    language="en"
    attribute_labels
        product="Product"
        quantity="Quantity"
        price="Price"

ADD OVERLAY LABEL
    language="pl"
    attribute_labels
        product="Produkt"
        quantity="Ilość"
        price="Cena"
```

_`line-item.ocafile`_

and extend the `invoice.ocafile` from [Has one](#has-one) section:

```ocafile
-- name=InvoiceWithLineItems
FROM EMla9w8NDb2RLInJNHEOuPJ4SQ6ifMeh83bTJmxiCeNL

ADD ATTRIBUTE lineItems=Array[refn:LineItem]
ADD OVERLAY LABEL
    language="en"
    attribute_labels
        lineItems="Line Items"

ADD OVERLAY LABEL
    language="pl"
    attribute_labels
        lineItems="Pozycje"

ADD OVERLAY CARDINALITY
    attribute_carinalities
        lineItems="1-"
```

_`invoice-with-line-items.ocafile`_

Running the `OCA Bin`:

```bash
$ ./oca build  --ocafile line-item.ocafile

# OCA bundle created in local repository with SAID: EHeMfChSsMV771D0skqpqYp5A-h8JH41scQ45Lv3Co36
# and name: LineItem

$ ./oca build  --ocafile invoice-with-line-items.ocafile
# OCA bundle created in local repository with SAID: EPgR99LHRtfc2odbCR_Fw4D38G090CmVJYeZVaRwaWjU
# and name: InvoiceWithLineItems
```

The `invoice-with-line-items.ocafile` extends the `Invoice` OCA Bundle with the
`lineItems` attribute, an array of `LineItem`. It establishes a relationship
between the `Invoice` and `LineItem` OCA Bundles and says that `Invoice has
many Line Items`.
