# OCA Parser

The **OCA Parser** enables creating OCA Bundles from XLS files. Using favorite XLS editor, the OCA Capture Base along with its overlays can be constructed. See our [template file](https://github.com/THCLab/oca-parser-xls/raw/main/templates/template.xlsx) to get overview of how it has to be defined so that parser can read it properly and transform into OCA bundle.

OCA Parser is delivered as a binary and runs from command line interface.

:::tip
It can be a viable alternative to use OCA Parser as a WEB service. Visit [OCA Browser](https://browser.oca.argo.colossi.network/#/) page that allows to create OCA Bundles as well.
:::

## Download and installation

Navigate to the [releases page](https://github.com/THCLab/oca-parser-xls/releases) to get latest available release.

## Usage

Parser provides `parse` command for parsing XLS files. See `./parser.bin parse -h` for more help.

### Creating OCA bundle from XLS file

When OCA Bundle has been defined in XLS, use the following command to parse it into OCA bundle: `./parser.bin parse oca -p some_xls_file.xlsx` Additionally `--zip` flag can be used that packs the bundle into zip file.
An OCA Bundle may contain layout files that define the layout of OCA Capture Base on screen. Currently two types of layouts are supported and can be added into the bundle:
- credential layout – for OCA bundle presentation purposes,
- form layout – for OCA bundle data capture, or in other words how to render the form.

To add them into the bundle, `parse` command requires additional flags:
- `--credential-layout <credential-layout>` Path to YAML file with Credential Layout.
- `--form-layout <form-layout>` Path to YAML file with Form Layout.

##### Example

Navigate to [the example](https://github.com/THCLab/oca-ecosystem/tree/main/examples/custom_layouts) and download XLS file along with layouts. Use the following command: 
```
./parser.bin parse oca -p simple_oca.xlsx --credential-layout credential.yml  --form-layout form.yml --zip
```
to create the OCA bundle that includes both layout files.


### Creating OCA Code Table from XLS file

Parser has yet another parsing utility to create proper structure. When the Entry Overlay ought to refer to an external standard, ie. country codes or simply becomes too big in size to be a part of OCA bundle, it can be referred to an external source through its digest. This external source is the OCA Code Table that provides the entries.

See [example code table](https://github.com/THCLab/oca-ecosystem/raw/main/examples/ISO_3166-1_alpha-2.xlsx) created for the purpose to be ISO compliant for country codes. Using this code table, entry codes can be created using the following command:
```
./parser.bin parse  entries -p ISO_3166-1_alpha-2.xlsx  --zip
```

Finally, an empty template file can be found [here](https://github.com/THCLab/oca-ecosystem/raw/main/examples/oca-code-table-template.xlsx).
