# Getting started

## Introduction

OCA is a pattern (architecture) that defines a new representation of data
semantics. Official OCA documentation is under development hosted by [Human
Colossus Foundation](https://humancolossus.foundation). For years concept of OCA
was incubated within communities like [Inputs and Semantics Working
Group](https://wiki.trustoverip.org/display/HOME/Inputs+and+Semantics+Working+Group)
at [Trust over
IP](https://trustoverip.org/working-groups/decentralized-semantics/). And
Hyperledger Aries
[RFC-0014](https://github.com/hyperledger/aries-rfcs/tree/main/concepts/0013-overlays).

Developers can follow current specification work in the [official
repository](https://the-human-colossus-foundation.github.io/oca-spec/).

Due to a rapidly-evolving OCA core specification, future implementations may
differ somewhat. The most up to date implementation is Rust, which would provide
bindings to other languages.

- [Rust](https://github.com/THCLab/oca-rust) 
- [Typescript/JavaScript](https://www.npmjs.com/package/oca.js) through FFI layer.
  
Those core libraries allow the creation, parsing and management of OCA objects.

## Quick Start

:::tip Pre-requisites
 - Install [docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/)
:::

To serve OCA ecosystem on your machine, run the following commands in your command line:

``` bash
curl https://raw.githubusercontent.com/THCLab/oca-ecosystem/main/docker-compose.yml > docker-compose.yml
docker-compose up
```

This command will serve [OCA Browser](http://localhost:8000) on port 8000 by default.

### with default layouts

- Download [XLS Swiss Passport example](https://github.com/THCLab/oca-ecosystem/raw/main/examples/swiss_passport/digital_passport.xlsx)
- Go to `Develop -> XLS to OCA Converter` and select XLS in `Select OCA File` field
- Click `Convert` button and download generated file (OCA Bundle)
- Download [entries files](https://github.com/THCLab/oca-ecosystem/tree/main/examples/swiss_passport/entries) and upload them to data-vault with listed command:

```bash
for f in examples/swiss_passport/entries/*; do;
  curl -X POST "http://localhost:9293/api/v1/files" -H "accept: */*" -H "Content-Type: multipart/form-data" -F "file=@$f";
done;
```

Hosting entries in Data Vault allows to reuse complex entries in many OCAs. You can link Entry Code Overlay or Entries Overlay with entries in Data Vault by it's SAI instead of keeping all entries data inside Overlays.

- Go to `Preview` and select OCA Bundle file
- As a result OCA Form and Credential are rendered with default layouts

### custom layouts

- Download [XLS Swiss Passport example](https://github.com/THCLab/oca-ecosystem/raw/main/examples/swiss_passport/digital_passport.xlsx) and [layouts files](https://github.com/THCLab/oca-ecosystem/tree/main/examples/swiss_passport/layouts)
- Download [assets files](https://github.com/THCLab/oca-ecosystem/tree/main/examples/swiss_passport/assets) and upload them to data-vault with listed command:

```bash
for f in examples/swiss_passport/assets/*; do;
  curl -X POST "http://localhost:9293/api/v1/files" -H "accept: */*" -H "Content-Type: multipart/form-data" -F "file=@$f";
done;
```

Assets may be images, fonts etc. used in custom layout.

- In `Develop -> XLS to OCA Converter` select XLS file as before
- In `Select Credential Layout file` and `Select Form Layout file` fields select downloaded layouts files
- Click `Convert` button and download generated file (OCA Bundle)
- Download [entries files](https://github.com/THCLab/oca-ecosystem/tree/main/examples/swiss_passport/entries) and upload them to data-vault with listed command:

```bash
for f in examples/swiss_passport/entries/*; do;
  curl -X POST "http://localhost:9293/api/v1/files" -H "accept: */*" -H "Content-Type: multipart/form-data" -F "file=@$f";
done;
```

- Go to `Preview` and select OCA Bundle file
- As a result OCA Form and Credential are rendered with custom defined layouts

[Learn more](/guide/getting-started.html#defining-custom-layouts) about defining custom layouts

### OCA References

> TODO

## Tutorial

### Defining OCA in xls file

- Download [template](https://github.com/THCLab/oca-ecosystem/raw/main/examples/template.xlsx) file
- In `Main` sheet columns A, B, C and D stores definition of [Capture Base](/v1.0.0.html#capture-base)
- Columns from E to N stores definition of [Overlays](/v1.0.0.html#overlays) that are not language specific
- Other sheets named by [ISO_639-1 language code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) stores definition of language specific [Overlays](/v1.0.0.html#overlays)

