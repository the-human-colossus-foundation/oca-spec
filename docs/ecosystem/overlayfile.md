# Overlayfile

`.overlayfile` - is a text file with definition of the overlay used to cleary define structure/schema of given overlay. It is used by community to define within their ecosystem overlays which are necessary for their use cases. Clear definition allows for easy sharing of those information within but as well outside of specific ecosystem. Seperation of the overlay definition from it usage allows in the future to apply proper governance of both and provide solid support of the tooling.

The `overlayfile` can be used to define the schema of a new overlay, allowing it to be composed into an overlayset and imported into `oca-bin` or other tools for validation purposes. This supports the process of creating bundles out of `OCAFILE`. The Overlays ecosystem can use overlay registries, which consist of OCAFILES containing definitions of such overlays, to distribute overlays. This allows for the easy import and reuse of these objects across different ecosystems.


# Overlayfile in OCA Ecosystem

Overlayfile is used mainly for validation purposes and support of any community overlay in OCA Ecosystem. Definition is machine readable and can be used to validate the overlay against the schema defined in the overlayfile. This allows for easy sharing of overlays across different ecosystems and provides a standardized way of defining and validating overlays.

Below diagram show dependencies between overlayfile, OCAFILE and OCA Bundle.

![Overlayfile](/images/Overlayfile.png)

## Benefits

- out of the box validation using standard tooling for OCA
- custom overlays and community driven overlay development
- increase interoperability without sacrificing flexibility allowing each ecosystem to define their own set of overlays

## Usage

The simples way to start building overlayfile is to use `oca-bin` which provides validation and possibility to test it directly with `OCAFILE `

### Example use case

Let’s assume we want to create an ecosystem that leverages the Overlays Capture Architecture (OCA) as a semantic layer for our data. Whether the data takes the form of complex research records, structured documents, or simple verifiable credentials, we always begin by defining the meaning of the data itself. Before any schema is created, a governance process is established to set the baseline rules — specifying which overlays, definitions, and conventions are to be used by schema creators. This ensures that everyone in the ecosystem, but as well other ecosystem, can have a common understanding of the information being modeled. Once these rules are in place, individual contributors can create schemas tailored to specific use cases while remaining fully interoperable with others. Because all participants adhere to the same overlay definitions, their schemas can be easily understood and processed using standard OCA ecosystem tooling, enabling seamless parsing, transformation, and interaction across different domains.

The simples way to start is to use base line overlays from OCA Specification and
extend it according to your needs. [Core
overlays](https://github.com/the-human-colossus-foundation/overlays-repository/blob/main/core.overlayfile)
as well can serve as a reference definitions which make the whole process
simpler.

Let's create our first overlayfile

```
ADD OVERLAY information
  VERSION 1.0.0
  ADD ATTRIBUTES language=Lang
  ADD OBJECT attribute_information
    with keys ATTR-NAMES
    with values TEXT
```

Now we can validate it using `oca-bin` tool

```bash
> oca-bin validate -o information.overlayfile
```

If everything goes well we should see:

```
Validation Successful
```

Now we are ready to use it in our OCAFILE, let's add it to our local overlayfile registry. `oca-bin config` would show you where `overlay_definition_path` is located. Simply copy your file into that directory. E.g.:

```bash
> cp information.overlayfile $(oca-bin config | awk -F"'" '/overlay_definition_path/ {print $2}')
```

Now let's create OCAFILE with our new overlay:

```
--name=bmi
ADD ATTRIBUTE first_name=Text last_name=Text wgt=Numeric hgt=Numeric

# Add meta data
ADD Overlay Meta
  language="en"
  name="Patient BMI"
  description="Standard 1 Patient BMI"

# Add character encoding
ADD Overlay CHARACTER_ENCODING
  attribute_character_encoding
    first_name="utf-8"
    last_name="utf-8"
    wgt="utf-8"
    hgt="utf-8"

ADD Overlay Information
  language="pl"
  attribute_information
    first_name="Imię pacjenta"
    last_name="Nazwisko pacjenta"
    wgt="Waga pacjenta"
    hgt="Wzrost pacjenta"
```
_bmi.ocafile_

Save file and build using `oca-bin build`

```bash
> oca-bin build -f bmi.ocafile
```

Now you can see in your local repository newly created oca bundle:

```bash
> oca-bin list
SAID: EPzk3xTq4q8zBwnRo-TC1rrvR_LVQOMCMjl6ij8hTkhI, name: bmi
```

and if we inspect the OCA Bundle we should get:

```bash
> oca-bin get -s EPzk3xTq4q8zBwnRo-TC1rrvR_LVQOMCMjl6ij8hTkhI
{
  "digest": "ENZVf16tqGEYrsxtvKHWLqbFiQt0gxfJb5OyWtM7adGR",
  "capture_base": {
    "digest": "EHZSMO2EFsXy8r5XogQ381-VmOiTUQYjV3WNkBfWYaCH",
    "type": "capture_base/2.0.0",
    "attributes": {
      "first_name": "Text",
      "hgt": "Numeric",
      "last_name": "Text",
      "wgt": "Numeric"
    }
  },
  "overlays": [
    {
      "digest": "EEP2Ri2aoUO4eOyJ2YtakT3WYF5bNfox_6fGRo9wwPuy",
      "capture_base": "EHZSMO2EFsXy8r5XogQ381-VmOiTUQYjV3WNkBfWYaCH",
      "type": "meta/2.0.0",
      "language": "en",
      "description": "Standard 1 Patient BMI",
      "name": "Patient BMI"
    },
    {
      "digest": "EI-srXiraePymApfgooUGWpFnr-s4ZPMEtzbqCAxLG7L",
      "capture_base": "EHZSMO2EFsXy8r5XogQ381-VmOiTUQYjV3WNkBfWYaCH",
      "type": "character_encoding/2.0.0",
      "attribute_character_encoding": {
        "first_name": "utf-8",
        "last_name": "utf-8",
        "wgt": "utf-8",
        "hgt": "utf-8"
      }
    },
    {
      "digest": "ELKGKEF0EHl92SWtp2PobJ4i3hIMxT0i7IFeA6ISKoQd",
      "capture_base": "EHZSMO2EFsXy8r5XogQ381-VmOiTUQYjV3WNkBfWYaCH",
      "type": "information/1.0.0",
      "language": "pl",
      "attribute_information": {
        "first_name": "Imię pacjenta",
        "last_name": "Nazwisko pacjenta",
        "wgt": "Waga pacjenta",
        "hgt": "Wzrost pacjenta"
      }
    }
  ]
}
```
