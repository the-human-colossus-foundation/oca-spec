# Getting started

## Create the Bundles with OCAFile

1. Download the [OCA Bin](https://github.com/THCLab/oca-bin/releases) for your platform.
1. Create a new file named `example.ocafile` with the following content:

   ```ocafile
   -- name=test-bundle
   # Example credential schema
   ADD ATTRIBUTE d=Text i=Text passed=Boolean
   ADD META en PROPS name="Entrance credential" description="Entrance credential"
   ADD CHARACTER_ENCODING ATTRS d=utf-8 i=utf-8 passed=utf-8
   ADD CONFORMANCE ATTRS d=M i=M passed=M
   ADD LABEL en ATTRS d="Schema digest" i="Credential Issuee" passed="Passed"
   ```

1. Run the `oca-bin` command line interface:

   ::: tip Init config
   When running the `oca` command for the first time, it will ask for the config initialization: `OCA config not found do you want to initialize it in your home directory? (y/N) y`
   :::

   ```bash
   ./oca build --ocafile example.ocafile

   # Result: OCA bundle created in local repository with SAID: EFhaY1-6ynjvxNUPY4HnbB-OXr05wULXE4Yet3FHzGP6
   # and name: test-bundle
   ```

1. List Bundles in the local Repository:

   ```bash
   ./oca list

   SAID: EFhaY1-6ynjvxNUPY4HnbB-OXr05wULXE4Yet3FHzGP6, name: test-bundle
   ```

1. Get the OCA Bundle for the above SAID:

   ```bash
   ./oca get --said EFhaY1-6ynjvxNUPY4HnbB-OXr05wULXE4Yet3FHzGP6
   ```

   Result:

   <div style="max-height: 400px; overflow-y: auto;">

   ```json
   {
     "bundle": {
       "d": "EFhaY1-6ynjvxNUPY4HnbB-OXr05wULXE4Yet3FHzGP6",
       "capture_base": {
         "d": "EL4q2aahA0RN-ftw97E_fmbVDVTyDbIaQR2B44HGsqFG",
         "type": "spec/capture_base/1.0",
         "classification": "",
         "attributes": {
           "d": "Text",
           "i": "Text",
           "passed": "Boolean"
         },
         "flagged_attributes": []
       },
       "overlays": {
         "character_encoding": {
           "d": "EOFWz7wYV2aQZzFRZf5_7hGoYOE3TeHl_iHoIsTQHX7h",
           "type": "spec/overlays/character_encoding/1.0",
           "capture_base": "EL4q2aahA0RN-ftw97E_fmbVDVTyDbIaQR2B44HGsqFG",
           "attribute_character_encoding": {
             "d": "utf-8",
             "i": "utf-8",
             "passed": "utf-8"
           }
         },
         "meta": [
           {
             "d": "ELHseD741CQMbFp49of8qNjgdyKd9gubDvcAjIqCVQKw",
             "language": "eng",
             "type": "spec/overlays/meta/1.0",
             "capture_base": "EL4q2aahA0RN-ftw97E_fmbVDVTyDbIaQR2B44HGsqFG",
             "description": "Entrance credential",
             "name": "Entrance credential"
           }
         ],
         "label": [
           {
             "d": "EHAJTB4yLtruZC6fmfCwlGmUDtlkIHrjTNOwrlvkmAtP",
             "language": "eng",
             "type": "spec/overlays/label/1.0",
             "capture_base": "EL4q2aahA0RN-ftw97E_fmbVDVTyDbIaQR2B44HGsqFG",
             "attribute_labels": {
               "d": "Schema digest",
               "i": "Credential Issuee",
               "passed": "Passed"
             },
             "attribute_categories": [],
             "category_labels": {}
           }
         ],
         "conformance": {
           "d": "EKzjcqJuiOKTVeSMRYNZsWnUsmnEiyv-8Uj1knydBfbU",
           "type": "spec/overlays/conformance/1.0",
           "capture_base": "EL4q2aahA0RN-ftw97E_fmbVDVTyDbIaQR2B44HGsqFG",
           "attribute_conformance": {
             "d": "M",
             "i": "M",
             "passed": "M"
           }
         }
       }
     },
     "dependencies": []
   }
   ```

   </div>

## Interact with the OCA Repository

All the above steps were executed locally, without interacting with any OCA Repository. Let's now publish the Bundle to the OCA Repository.

1. Run `./oca config`. It will print the current configuration that looks like (depending on your platform):

   ```bash
   Local repository: "/home/<user>/.oca/oca_repository"
   OCA Cache: "/home/<user>/.oca/oca_cache"
   Index DB: "/home/<user>/.oca/read_db"
   ```

   Assumig the same platform as above, the config file is stored in `/home/<user>/.oca/config.toml`

1. Add the OCA Repository hosted within HCF Sandbox:

   ```toml
   repository_url = "https://repository.oca.argo.colossi.network/"
   ```

1. Publish the Bundle to the OCA Repository:

   ```bash
   ./oca publish --said EFhaY1-6ynjvxNUPY4HnbB-OXr05wULXE4Yet3FHzGP6
   ```

1. The Bundle is now resolvable also remotely:
   ```bash
   curl -X 'GET' \
   'https://repository.oca.argo.colossi.network/api/oca-bundles/EFhaY1-6ynjvxNUPY4HnbB-OXr05wULXE4Yet3FHzGP6' \
   -H 'accept: application/json'
   ```

## Setup own OCA Repository

Setup the [OCA Repository](/ecosystem/oca-repository.md#download-and-installation)
