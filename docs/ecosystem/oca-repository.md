# OCA Repository

The **OCA repository** is a key concept of the OCA Ecosystem. It enables the management, storage, and sharing of OCA Objects like [ OCA Bundles ](/ecosystem/oca-bundle), Capture Bases, and Overlays. Furthermore, it comes with pre-baked support for [ OCAFiles ](/specification/ocafile). The interface is exposed through [ REST API ](https://repository.oca.argo.colossi.network/).

## Download and installation

### Docker image

Download the Docker image that contains the latest release

```bash
docker pull humancolossus/oca-repository:latest
```

### Getting the sources

Navigate to the [OCA Repository GitHub repository](https://github.com/THCLab/oca-repository-rs) to get the sources of the reference implementation.

## Usage

See [OpenAPI Specification](https://repository.oca.argo.colossi.network/) to get all available endpoints.

## Features

::: tip
The example OCAFile used in the following sections is the [entrance-credential.ocafile](https://github.com/THCLab/ocafile-examples/blob/main/entrance-credential.ocafile), which has been truncated for clarity and brevity to the first five instructions.
:::

### OCAFile integration

The OCA Repository supports the creation of the OCA Bundles using [OCAFile](/specification/ocafile) format. The OCAFile integration introduces a Domain Specific Language to manipulate the Bundles and also, under the hood, adds a crucial ecosystem feature that is the full provenance of the Bundle.

#### Creating OCA Bundles

Repository exposes the `POST /oca-bundles` endpoint that consumes the OCAFile, creates the OCA Bundle, and returns its SAID. Example:

```bash
curl -X 'POST' \
  'https://repository.oca.argo.colossi.network/api/oca-bundles' \
  -H 'accept: application/json' \
  -H 'Content-Type: text/plain' \
  -d 'ADD ATTRIBUTE d=Text i=Text passed=Boolean
ADD META en PROPS name="Entrance credential" description="Entrance credential"
ADD CHARACTER_ENCODING ATTRS d=utf-8 i=utf-8 passed=utf-8
ADD CONFORMANCE ATTRS d=M i=M passed=M
ADD LABEL en ATTRS d="Schema digest" i="Credential Issuee" passed="Passed"
'
```

Result: `{"success":true,"said":"EFhaY1-6ynjvxNUPY4HnbB-OXr05wULXE4Yet3FHzGP6"}`

#### Getting OCAFile from SAID

Repository exposes `GET /oca-bundles/{said}/ocafile` endpoint that returns the OCAFile that was used to create the OCA Bundle. Example:

```bash
curl -X 'GET' \
  'https://repository.oca.argo.colossi.network/api/oca-bundles/EFhaY1-6ynjvxNUPY4HnbB-OXr05wULXE4Yet3FHzGP6/ocafile'
```

Result:

```bash
ADD ATTRIBUTE d=Text i=Text passed=Boolean
ADD META en PROPS  description="Entrance credential" name="Entrance credential"
ADD CHARACTER_ENCODING ATTRS d="utf-8" i="utf-8" passed="utf-8"
ADD CONFORMANCE ATTRS d="M" i="M" passed="M"
ADD LABEL en ATTRS d="Schema digest" i="Credential Issuee" passed="Passed"
```

The repository recreates the OCAFile from the steps (see below) used to create the OCA Bundle rather than keeping the original OCAFile in a raw format.

### Getting the OCA Bundle

Repository exposes `GET /oca-bundles/{said}` endpoint that returns the OCA Bundle. By default, it provides the Bundle for the SAID it points to. However, it can also provide the whole object graph, including all the Bundle dependencies (see [Nested object graphs](#nested-object-graphs)). Example:

```bash
curl -X 'GET' \
  'https://repository.oca.argo.colossi.network/api/oca-bundles/EFhaY1-6ynjvxNUPY4HnbB-OXr05wULXE4Yet3FHzGP6' \
  -H 'accept: application/json'
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

### Getting OCA Objects by their SAID

Repository exposes `GET /objects?said=SAID1,SAID2,SAID N` endpoint that returns the OCA Objects by their SAID. Example:

```bash
curl -X 'GET' \
  'https://repository.oca.argo.colossi.network/api/objects?said=ELHseD741CQMbFp49of8qNjgdyKd9gubDvcAjIqCVQKw%2CEHAJTB4yLtruZC6fmfCwlGmUDtlkIHrjTNOwrlvkmAtP%2CEL4q2aahA0RN-ftw97E_fmbVDVTyDbIaQR2B44HGsqFG'
```

Result:

<div style="max-height: 400px; overflow-y: auto;">

```json
{
  "success": true,
  "objects": [
    {
      "d": "ELHseD741CQMbFp49of8qNjgdyKd9gubDvcAjIqCVQKw",
      "language": "eng",
      "type": "spec/overlays/meta/1.0",
      "capture_base": "EL4q2aahA0RN-ftw97E_fmbVDVTyDbIaQR2B44HGsqFG",
      "description": "Entrance credential",
      "name": "Entrance credential"
    },
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
    },
    {
      "d": "EL4q2aahA0RN-ftw97E_fmbVDVTyDbIaQR2B44HGsqFG",
      "type": "spec/capture_base/1.0",
      "classification": "",
      "attributes": {
        "d": "Text",
        "i": "Text",
        "passed": "Boolean"
      },
      "flagged_attributes": []
    }
  ]
}
```

</div>

It is possible to get multiple OCA Objects by providing their SAIDs in the query string and simultaneously get Overlays and Capture Bases.

### Getting OCA Bundle provenance log

Repository exposes `GET /oca-bundles/{said}/steps` endpoint that returns the list of steps that are the consequence of executing the OCAFile. Example:

```bash
curl -X 'GET' \
  'https://repository.oca.argo.colossi.network/api/oca-bundles/EFhaY1-6ynjvxNUPY4HnbB-OXr05wULXE4Yet3FHzGP6/steps'
```

Result:

<div style="max-height: 400px; overflow-y: auto;">

```json
[
  {
    "from": null,
    "operation": {
      "type": "Add",
      "object_kind": "CaptureBase",
      "content": {
        "attributes": {
          "d": "Text",
          "i": "Text",
          "passed": "Boolean"
        }
      }
    }
  },
  {
    "from": "EEetWoTwxk1JePUotqfOkelgaeriDMAM5v6NkBFQ4qar",
    "operation": {
      "type": "Add",
      "object_kind": "Meta",
      "content": {
        "attributes": {},
        "properties": {
          "lang": "en",
          "name": "Entrance credential",
          "description": "Entrance credential"
        }
      }
    }
  },
  {
    "from": "EDU46MgAMqamTZt0k_exlYr1-r1LtbwTaAlrheREcBSs",
    "operation": {
      "type": "Add",
      "object_kind": "CharacterEncoding",
      "content": {
        "attributes": {
          "d": "utf-8",
          "i": "utf-8",
          "passed": "utf-8"
        },
        "properties": {}
      }
    }
  },
  {
    "from": "EEqnqNRtMJARLKdLixVnz2ehJJU4W2txepFTKpgQXuHJ",
    "operation": {
      "type": "Add",
      "object_kind": "Conformance",
      "content": {
        "attributes": {
          "d": "M",docs:dev
          "i": "M",
          "passed": "M"
        },
        "properties": {}
      }
    }
  },
  {
    "from": "ENlzjZ5JLeBFYYm3mchz5uYIgsVtOOm9kNHic7QxQGJv",
    "operation": {
      "type": "Add",
      "object_kind": "Label",
      "content": {
        "attributes": {
          "d": "Schema digest",
          "i": "Credential Issuee",
          "passed": "Passed"
        },
        "properties": {
          "lang": "en"
        }
      }
    }
  }
]
```

</div>

Each OCAFile command reflects a step in the provenance log. Furthermore, each step, except the genesis step, contains the `from` field that is the SAID of the previous step. This way, the full provenance of the OCA Bundle is stored in the repository.

### Search for OCA Bundles

Repository exposes the `GET /oca-bundles/search?q={phrase}` endpoint that returns the list of OCA Bundles that match the search criteria. It searches against the information captured from the `Meta` overlay. The search result is unique per SAID of the OCA Bundle but may overlap with Bundles having similar `Meta` information. Example:

```bash
curl -X 'GET' \
  'https://repository.oca.argo.colossi.network/api/oca-bundles/search?q=entrance'
```

Result:

<div style="max-height: 400px; overflow-y: auto;">

```json
{
  "r": [
    {
      "oca_bundle": {
        "v": "OCAB10JSON000646_",
        "d": "EF5ERATRBBN_ewEo9buQbznirhBmvrSSC0O2GIR4Gbfs",
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
            ...
        }
      },
      "metadata": {
        "phrase": "<mark>Entrance</mark> credential",
        "scope": "meta_overlay",
        "score": 2.1572110652923584
      }
    },
    {
      "oca_bundle": {
        "v": "OCAB10JSON00051e_",
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
            ...
        }
      },
      "metadata": {
        "phrase": "<mark>Entrance</mark> credential",
        "scope": "meta_overlay",
        "score": 2.1572110652923584
      }
    }
  ],
  "m": {
    "total": 2,
    "page": 1
  }
}
```

</div>

The above code snippet demonstrates two entries in the search result — similar OCA Bundles but with distinct SAIDs.

### Explore relationships of the Bundles

Repository exposes the `GET /explore/{SAID}` endpoint that returns the list of related objects concerning the SAID. It examines the relatives of the SAID and will look for OCA Bundles, Capture Bases, and Overlays. In the example below, we use SAID `EFhaY1-6ynjvxNUPY4HnbB-OXr05wULXE4Yet3FHzGP6` that represents the OCA Bundle, and as a result, we get the related Capture Base and Overlays so the actual content of the Bundle.

```bash
curl -X 'GET' \
  'https://repository.oca.argo.colossi.network/api/explore/EFhaY1-6ynjvxNUPY4HnbB-OXr05wULXE4Yet3FHzGP6'
```

Result:

<div style="max-height: 400px; overflow-y: auto;">

```json
{
  "success": true,
  "object_type": {
    "object_kind": "OCABundle",
    "content": {
      "said": "refn:"
    }
  },
  "relatives": [
    {
      "said": "EL4q2aahA0RN-ftw97E_fmbVDVTyDbIaQR2B44HGsqFG",
      "object_type": {
        "object_kind": "CaptureBase",
        "content": {}
      }
    },
    {
      "said": "EKzjcqJuiOKTVeSMRYNZsWnUsmnEiyv-8Uj1knydBfbU",
      "object_type": "Overlay",
      "metadata": {
        "kind": {
          "object_kind": "Conformance",
          "content": {}
        }
      }
    },
    {
      "said": "ELHseD741CQMbFp49of8qNjgdyKd9gubDvcAjIqCVQKw",
      "object_type": "Overlay",
      "metadata": {
        "kind": {
          "object_kind": "Meta",
          "content": {}
        }
      }
    },
    {
      "said": "EOFWz7wYV2aQZzFRZf5_7hGoYOE3TeHl_iHoIsTQHX7h",
      "object_type": "Overlay",
      "metadata": {
        "kind": {
          "object_kind": "CharacterEncoding",
          "content": {}
        }
      }
    },
    {
      "said": "EHAJTB4yLtruZC6fmfCwlGmUDtlkIHrjTNOwrlvkmAtP",
      "object_type": "Overlay",
      "metadata": {
        "kind": {
          "object_kind": "Label",
          "content": {}
        }
      }
    }
  ]
}
```

</div>

<br>

Using the SAID `EHAJTB4yLtruZC6fmfCwlGmUDtlkIHrjTNOwrlvkmAtP` that is the SAID of the Label Overlay from the above example, we can get the relatives of this particular Overlay:

<div style="max-height: 400px; overflow-y: auto;">

```json
{
  "success": true,
  "object_type": {
    "object_kind": "Label",
    "content": {}
  },
  "relatives": [
    {
      "said": "EF5ERATRBBN_ewEo9buQbznirhBmvrSSC0O2GIR4Gbfs",
      "object_type": {
        "object_kind": "OCABundle",
        "content": {
          "said": "refn:"
        }
      }
    },
    {
      "said": "EFhaY1-6ynjvxNUPY4HnbB-OXr05wULXE4Yet3FHzGP6",
      "object_type": {
        "object_kind": "OCABundle",
        "content": {
          "said": "refn:"
        }
      }
    },
    {
      "said": "EL4q2aahA0RN-ftw97E_fmbVDVTyDbIaQR2B44HGsqFG",
      "object_type": {
        "object_kind": "CaptureBase",
        "content": {}
      }
    }
  ]
}
```

</div>

### Getting OCA Bundle data entry in XLSX

Repository exposes the `GET /oca-bundles/{said}/data-entry` endpoint that returns the OCA Bundle data entry in the XLSX format. Example:

```bash
curl -X 'GET' \
  'https://repository.oca.argo.colossi.network/api/oca-bundles/EFhaY1-6ynjvxNUPY4HnbB-OXr05wULXE4Yet3FHzGP6/data-entry'
```

The result is a downloadable XLSX file that contains the following spreadsheets:

- `Schema Description` - contains the description of the OCA Bundle
- `Data Entry` - contains the data entry of the OCA Bundle

### Nested object graphs

OCAFile DSL allows for the creation of nested object graphs. The Repository supports this feature and allows for the creation of complex OCA Bundles. Let's consider the following example:

<div style="max-height: 400px; overflow-y: auto;">

```bash
###
# Part schema
###
ADD ATTRIBUTE name=Text
ADD META en PROPS name="Part" description="Part schema"
ADD META pl PROPS name="Część" description="Schema części"
ADD LABEL en ATTRS name="Name"
ADD LABEL pl ATTRS name="Nazwa"
ADD ATTRIBUTE photo=Binary
ADD LABEL en ATTRS photo="Photo"
ADD LABEL pl ATTRS photo="Zdjęcie"
ADD ATTRIBUTE distance=Text
ADD LABEL en ATTRS distance="Distance"
ADD LABEL pl ATTRS distance="Dystans"
ADD ENTRY_CODE ATTRS distance=["o1", "o2", "o3", "o4", "o5", "o6", "o7"]
ADD ENTRY en ATTRS distance={"o1": "One", "o2": "Two", "o3": "Three", "o4": "Four", "o5": "Five", "o6": "Six", "o7": "Seven"}
ADD ENTRY pl ATTRS distance={"o1": "Jeden", "o2": "Dwa", "o3": "Trzy", "o4": "Cztery", "o5": "Pięć", "o6": "Sześć", "o7": "Siedem"}
# Result: EK8ZDbKt_v_J7MzoM5NADM7O-ZxLz8aLLzc3q3ynxYir



###
# Address schema
###
ADD ATTRIBUTE street=Text zip=Text city=Text
ADD META en PROPS name="Address" description="Address schema"
ADD META pl PROPS name="Adres" description="Schema adresu"
ADD CONFORMANCE ATTRS city=M street=M
ADD LABEL en ATTRS\
	street="Street"\
	zip="Zip code"\
	city="City"
ADD LABEL pl ATTRS\
	street="Ulica"\
	zip="Kod pocztowy"\
	city="Miasto"
# Result: EF3es_NZ7VbrwW6EjOy6aWMG5Lr-wdtiToPeKsciTMvg



###
# Manufacturer schema
###
ADD ATTRIBUTE name=Text
ADD META en PROPS name="Manufacturer" description="Manufacturer schema"
ADD META pl PROPS name="Producent" description="Schema producenta"
ADD CONFORMANCE ATTRS name=M
ADD LABEL en ATTRS\
	name="Name"
ADD LABEL pl ATTRS\
	name="Nazwa"

ADD ATTRIBUTE address=refs:EF3es_NZ7VbrwW6EjOy6aWMG5Lr-wdtiToPeKsciTMvg
ADD LABEL en ATTRS address="Address"
ADD LABEL pl ATTRS address="Adres"

ADD ATTRIBUTE parts=Array[refs:EK8ZDbKt_v_J7MzoM5NADM7O-ZxLz8aLLzc3q3ynxYir]
ADD LABEL en ATTRS parts="Parts"
ADD LABEL pl ATTRS parts="Części"
# Result: ENhKUnRBWEXp8dZsbawEJy0Xz_Mk26M4NBuK1SFGljgJ



###
# Device schema
###
ADD ATTRIBUTE name=Text description=Text
ADD META en PROPS name="Device" description="Urządzenie schema"
ADD META pl PROPS name="Urządzenie" description="Schema urządzenia"
ADD LABEL en ATTRS\
	name="Name"\
	description="Description"
ADD LABEL pl ATTRS\
	name="Nazwa"\
	description="Opis"

ADD ATTRIBUTE manufacturer=refs:ENhKUnRBWEXp8dZsbawEJy0Xz_Mk26M4NBuK1SFGljgJ
ADD CONFORMANCE ATTRS manufacturer=M
ADD LABEL en ATTRS manufacturer="Manufacturer"
ADD LABEL pl ATTRS manufacturer="Producent"
ADD ATTRIBUTE device_type=Text
ADD LABEL en ATTRS device_type="Device type"
ADD LABEL pl ATTRS device_type="Typ urządzenia"
ADD ENTRY_CODE ATTRS device_type=["o1", "o2", "o3", "o4", "o5", "o6", "o7"]
ADD ENTRY en ATTRS device_type={"o1": "Steam engine", "o2": "Teleport", "o3": "Diesel", "o4": "Electric", "o5": "Hybrid", "o6": "Solar", "o7": "Wind"}
ADD ENTRY pl ATTRS device_type={"o1": "Maszyna parowa", "o2": "Teleport", "o3": "Dizel", "o4": "Elektryczny", "o5": "Hybryda", "o6": "Solar", "o7": "Wiatr"}
# Result: EI1ZC4rgLDf0FFTyBXrsLX6pvT22lbSEmScTEzFsbBgk
```

</div>

The repository enables fetching of the whole graph at once using the `w=true` query parameter. The following example demonstrates how to get the whole graph of the Device schema:

```bash
curl -X 'GET' \
  'https://repository.oca.argo.colossi.network/api/oca-bundles/EI1ZC4rgLDf0FFTyBXrsLX6pvT22lbSEmScTEzFsbBgk?w=true' \
  -H 'accept: application/json'
```

Result:

<div style="max-height: 400px; overflow-y: auto;">

```json
{
  "bundle": {
    "d": "EI1ZC4rgLDf0FFTyBXrsLX6pvT22lbSEmScTEzFsbBgk",
    "capture_base": {
      "d": "ECXtBLtLNbnMvF_Lvtu30HQOAz-df_Jvy25RL2XY2-mA",
      "type": "spec/capture_base/1.0",
      "classification": "",
      "attributes": {
        "description": "Text",
        "device_type": "Text",
        "manufacturer": "refs:ENhKUnRBWEXp8dZsbawEJy0Xz_Mk26M4NBuK1SFGljgJ",
        "name": "Text"
      },
      "flagged_attributes": []
    },
    "overlays": {
      "meta": [
        {
          "d": "EH7ne4n9CK-Sx1OOX7R8KYpSPwN6u8VM98W_Fpy0EVC7",
          "language": "eng",
          "type": "spec/overlays/meta/1.0",
          "capture_base": "ECXtBLtLNbnMvF_Lvtu30HQOAz-df_Jvy25RL2XY2-mA",
          "description": "Urządzenie schema",
          "name": "Device"
        },
        {
          "d": "EBxyDTMiyoyI9VfJn8CJYXZf-1NmCn72-yPFSkX1srPH",
          "language": "pol",
          "type": "spec/overlays/meta/1.0",
          "capture_base": "ECXtBLtLNbnMvF_Lvtu30HQOAz-df_Jvy25RL2XY2-mA",
          "description": "Schema urządzenia",
          "name": "Urządzenie"
        }
      ],
      "label": [
        {
          "d": "EJwCY4bCFJTz5qEaDQBp82nX2MZ1ESgoSlL0w6TF0m-4",
          "language": "eng",
          "type": "spec/overlays/label/1.0",
          "capture_base": "ECXtBLtLNbnMvF_Lvtu30HQOAz-df_Jvy25RL2XY2-mA",
          "attribute_labels": {
            "description": "Description",
            "device_type": "Device type",
            "manufacturer": "Manufacturer",
            "name": "Name"
          },
          "attribute_categories": [],
          "category_labels": {}
        },
        {
          "d": "EGZ-1qzGFgvLZw_MLuI7kQXwaaDUUtgpA9FsZqhbMbAS",
          "language": "pol",
          "type": "spec/overlays/label/1.0",
          "capture_base": "ECXtBLtLNbnMvF_Lvtu30HQOAz-df_Jvy25RL2XY2-mA",
          "attribute_labels": {
            "description": "Opis",
            "device_type": "Typ urządzenia",
            "manufacturer": "Producent",
            "name": "Nazwa"
          },
          "attribute_categories": [],
          "category_labels": {}
        }
      ],
      "conformance": {
        "d": "EHb9G_RDMGG6JF37U_l-8Xd6UcXM52GpXE-T6ooY9cXu",
        "type": "spec/overlays/conformance/1.0",
        "capture_base": "ECXtBLtLNbnMvF_Lvtu30HQOAz-df_Jvy25RL2XY2-mA",
        "attribute_conformance": {
          "manufacturer": "M"
        }
      },
      "entry_code": {
        "d": "EGSaliLy9uzna904qwBhJ7ZTjmhrtKqtheUCyFJTRdrB",
        "type": "spec/overlays/entry_code/1.0",
        "capture_base": "ECXtBLtLNbnMvF_Lvtu30HQOAz-df_Jvy25RL2XY2-mA",
        "attribute_entry_codes": {
          "device_type": ["o1", "o2", "o3", "o4", "o5", "o6", "o7"]
        }
      },
      "entry": [
        {
          "d": "EE9bOQaDPj46yBv7_dLIyG4tawb6GejVb-Gm0T8rg87e",
          "language": "eng",
          "type": "spec/overlays/entry/1.0",
          "capture_base": "ECXtBLtLNbnMvF_Lvtu30HQOAz-df_Jvy25RL2XY2-mA",
          "attribute_entries": {
            "device_type": {
              "o1": "Steam engine",
              "o2": "Teleport",
              "o3": "Diesel",
              "o4": "Electric",
              "o5": "Hybrid",
              "o6": "Solar",
              "o7": "Wind"
            }
          }
        },
        {
          "d": "EEbhUjN2L7WYXz99qQddr52xqqLWqP7__C9XDP802npm",
          "language": "pol",
          "type": "spec/overlays/entry/1.0",
          "capture_base": "ECXtBLtLNbnMvF_Lvtu30HQOAz-df_Jvy25RL2XY2-mA",
          "attribute_entries": {
            "device_type": {
              "o1": "Maszyna parowa",
              "o2": "Teleport",
              "o3": "Dizel",
              "o4": "Elektryczny",
              "o5": "Hybryda",
              "o6": "Solar",
              "o7": "Wiatr"
            }
          }
        }
      ]
    }
  },
  "dependencies": [
    {
      "d": "ENhKUnRBWEXp8dZsbawEJy0Xz_Mk26M4NBuK1SFGljgJ",
      "capture_base": {
        "d": "ECzr8kxl1ge_BnaWt0XVyOFeavuerJnS1a9EUC_MfJzy",
        "type": "spec/capture_base/1.0",
        "classification": "",
        "attributes": {
          "address": "refs:EF3es_NZ7VbrwW6EjOy6aWMG5Lr-wdtiToPeKsciTMvg",
          "name": "Text",
          "parts": ["refs:EK8ZDbKt_v_J7MzoM5NADM7O-ZxLz8aLLzc3q3ynxYir"]
        },
        "flagged_attributes": []
      },
      "overlays": {
        "meta": [
          {
            "d": "EFbAaM139Iz9KmkRw4vcyAeAOZmHTE9Cbkbt28jKMVYi",
            "language": "eng",
            "type": "spec/overlays/meta/1.0",
            "capture_base": "ECzr8kxl1ge_BnaWt0XVyOFeavuerJnS1a9EUC_MfJzy",
            "description": "Manufacturer schema",
            "name": "Manufacturer"
          },
          {
            "d": "EGzVZNFQca_Vy9c7lR2-lun3fr6VDqnIh26WkC7dNUsd",
            "language": "pol",
            "type": "spec/overlays/meta/1.0",
            "capture_base": "ECzr8kxl1ge_BnaWt0XVyOFeavuerJnS1a9EUC_MfJzy",
            "description": "Schema producenta",
            "name": "Producent"
          }
        ],
        "label": [
          {
            "d": "ELaKIZCsMlVhxDqAwt8AfZhKu01eRNOIUdgCvTiud-SK",
            "language": "eng",
            "type": "spec/overlays/label/1.0",
            "capture_base": "ECzr8kxl1ge_BnaWt0XVyOFeavuerJnS1a9EUC_MfJzy",
            "attribute_labels": {
              "address": "Address",
              "name": "Name",
              "parts": "Parts"
            },
            "attribute_categories": [],
            "category_labels": {}
          },
          {
            "d": "EEVrJHjV622DwV0F5cB4B-HAIuW1UMdh6W2Jm3lqIOBz",
            "language": "pol",
            "type": "spec/overlays/label/1.0",
            "capture_base": "ECzr8kxl1ge_BnaWt0XVyOFeavuerJnS1a9EUC_MfJzy",
            "attribute_labels": {
              "address": "Adres",
              "name": "Nazwa",
              "parts": "Części"
            },
            "attribute_categories": [],
            "category_labels": {}
          }
        ],
        "conformance": {
          "d": "EN0H507OR637f5F4Mnfy-qJB8zRuEwdF3ues0IOx6Tp_",
          "type": "spec/overlays/conformance/1.0",
          "capture_base": "ECzr8kxl1ge_BnaWt0XVyOFeavuerJnS1a9EUC_MfJzy",
          "attribute_conformance": {
            "name": "M"
          }
        }
      }
    },
    {
      "d": "EF3es_NZ7VbrwW6EjOy6aWMG5Lr-wdtiToPeKsciTMvg",
      "capture_base": {
        "d": "EKug1hApJt2_i7ZUeY0UxqlEKKVPMEmGWIJLmmLDeAGD",
        "type": "spec/capture_base/1.0",
        "classification": "",
        "attributes": {
          "city": "Text",
          "street": "Text",
          "zip": "Text"
        },
        "flagged_attributes": []
      },
      "overlays": {
        "meta": [
          {
            "d": "EGFqH9Lo5iy5O8jRsN1hs-N6JMpd122YTtbXMQ-AZzZ7",
            "language": "eng",
            "type": "spec/overlays/meta/1.0",
            "capture_base": "EKug1hApJt2_i7ZUeY0UxqlEKKVPMEmGWIJLmmLDeAGD",
            "description": "Address schema",
            "name": "Address"
          },
          {
            "d": "EOw7AoPLQFrX9CITKHoHCb8DkYv8RMxRK0vHUOIjfqVN",
            "language": "pol",
            "type": "spec/overlays/meta/1.0",
            "capture_base": "EKug1hApJt2_i7ZUeY0UxqlEKKVPMEmGWIJLmmLDeAGD",
            "description": "Schema adresu",
            "name": "Adres"
          }
        ],
        "label": [
          {
            "d": "EPMoaW2fIlE0vlKuUCCM5isSBdjBwWTsrddARAj1EFEh",
            "language": "eng",
            "type": "spec/overlays/label/1.0",
            "capture_base": "EKug1hApJt2_i7ZUeY0UxqlEKKVPMEmGWIJLmmLDeAGD",
            "attribute_labels": {
              "city": "City",
              "street": "Street",
              "zip": "Zip code"
            },
            "attribute_categories": [],
            "category_labels": {}
          },
          {
            "d": "EDPjG5qXTWZhnS16fVOUhtVtFtNsn5XJNUVxzYy-Fsu8",
            "language": "pol",
            "type": "spec/overlays/label/1.0",
            "capture_base": "EKug1hApJt2_i7ZUeY0UxqlEKKVPMEmGWIJLmmLDeAGD",
            "attribute_labels": {
              "city": "Miasto",
              "street": "Ulica",
              "zip": "Kod pocztowy"
            },
            "attribute_categories": [],
            "category_labels": {}
          }
        ],
        "conformance": {
          "d": "ELUXC2leOe3zttvBZN5NdcCauNwPTqvq5_UVd3kRTxqt",
          "type": "spec/overlays/conformance/1.0",
          "capture_base": "EKug1hApJt2_i7ZUeY0UxqlEKKVPMEmGWIJLmmLDeAGD",
          "attribute_conformance": {
            "city": "M",
            "street": "M"
          }
        }
      }
    },
    {
      "d": "EK8ZDbKt_v_J7MzoM5NADM7O-ZxLz8aLLzc3q3ynxYir",
      "capture_base": {
        "d": "EH6c7FzxclerXPmETZBfkd6KkdKIcICfz-AGCBXOsnmq",
        "type": "spec/capture_base/1.0",
        "classification": "",
        "attributes": {
          "distance": "Text",
          "name": "Text",
          "photo": "Binary"
        },
        "flagged_attributes": []
      },
      "overlays": {
        "meta": [
          {
            "d": "EGrYXfPk3yF8v4zyJmuLPRRldvSQHbBXKzGA5nMsqW1g",
            "language": "eng",
            "type": "spec/overlays/meta/1.0",
            "capture_base": "EH6c7FzxclerXPmETZBfkd6KkdKIcICfz-AGCBXOsnmq",
            "description": "Part schema",
            "name": "Part"
          },
          {
            "d": "EMT92goQoYP2m1B68LIervv7KAGk4UxQVQxCW38bW800",
            "language": "pol",
            "type": "spec/overlays/meta/1.0",
            "capture_base": "EH6c7FzxclerXPmETZBfkd6KkdKIcICfz-AGCBXOsnmq",
            "description": "Schema części",
            "name": "Część"
          }
        ],
        "label": [
          {
            "d": "EIyR_gR-sm_deNaFZ06Sr70Bv2pJmj_-cHzLrdFxkM0S",
            "language": "eng",
            "type": "spec/overlays/label/1.0",
            "capture_base": "EH6c7FzxclerXPmETZBfkd6KkdKIcICfz-AGCBXOsnmq",
            "attribute_labels": {
              "distance": "Distance",
              "name": "Name",
              "photo": "Photo"
            },
            "attribute_categories": [],
            "category_labels": {}
          },
          {
            "d": "EDfaj4tvGcSLGCAzHiI634XaE886EgmOR2EOC38WKjrh",
            "language": "pol",
            "type": "spec/overlays/label/1.0",
            "capture_base": "EH6c7FzxclerXPmETZBfkd6KkdKIcICfz-AGCBXOsnmq",
            "attribute_labels": {
              "distance": "Dystans",
              "name": "Nazwa",
              "photo": "Zdjęcie"
            },
            "attribute_categories": [],
            "category_labels": {}
          }
        ],
        "entry_code": {
          "d": "ECVqQ4Ivc1zE-vko2e2yQ7BgNJdnkwH1xJJV9ydoKfJH",
          "type": "spec/overlays/entry_code/1.0",
          "capture_base": "EH6c7FzxclerXPmETZBfkd6KkdKIcICfz-AGCBXOsnmq",
          "attribute_entry_codes": {
            "distance": ["o1", "o2", "o3", "o4", "o5", "o6", "o7"]
          }
        },
        "entry": [
          {
            "d": "EPzMsbS4e0qHsZ7Q-0bQaDJoG1i7sWoxuOcMJ_XueosH",
            "language": "eng",
            "type": "spec/overlays/entry/1.0",
            "capture_base": "EH6c7FzxclerXPmETZBfkd6KkdKIcICfz-AGCBXOsnmq",
            "attribute_entries": {
              "distance": {
                "o1": "One",
                "o2": "Two",
                "o3": "Three",
                "o4": "Four",
                "o5": "Five",
                "o6": "Six",
                "o7": "Seven"
              }
            }
          },
          {
            "d": "ENh0nUZqZSHBwYdbLkj82lwwkcpRMFFgror4A0Dx0vOw",
            "language": "pol",
            "type": "spec/overlays/entry/1.0",
            "capture_base": "EH6c7FzxclerXPmETZBfkd6KkdKIcICfz-AGCBXOsnmq",
            "attribute_entries": {
              "distance": {
                "o1": "Jeden",
                "o2": "Dwa",
                "o3": "Trzy",
                "o4": "Cztery",
                "o5": "Pięć",
                "o6": "Sześć",
                "o7": "Siedem"
              }
            }
          }
        ]
      }
    }
  ]
}
```

</div>

The result comprises the root Bundle, the Device Bundle, and all its dependencies — Manufacturer and Part Bundles and the Address Bundle. The basic schema of the response is as follows:

```json
{
  "bundle": "ROOT Bundle",
  "dependencies": ["Bundle 1", "Bundle 2", "Bundle N"]
}
```

## Concepts

- OCA Repository implements [content-centric networking ](https://en.wikipedia.org/wiki/Content_centric_networking) (CCN) concept to uniquely identify all the resources stored in the Repository. The resources are identified through [SAID's](https://datatracker.ietf.org/doc/html/draft-ssmith-said), so calculating the product of the one-way hash function becomes the identifier of the resource. Deriving SAIDs from the content creates a cryptographic binding between the identifier and the content.
- The [DAG](https://en.wikipedia.org/wiki/Directed_acyclic_graph)-based internal structure of the Repository allows for the full provenance of all the Bundles. Thanks to the OCAFile DSL, the Repository's internal state can store every single command as a node in the graph. The graph direction constitutes the order of the commands.
- OCAFile as the DSL for the Repository brings the following properties:
  - Idempotent commands – the same command can be executed multiple times without changing the state.
  - Commutative property of the commands – the order of the commands does not matter.

## Applications

It can support multiple use cases, such as:

- Storing verifiable credential schemas
- Managing schemas for capturing and transforming data from IoT devices
- Acting as a repository for document schemas
- And more

## Sandbox

An example of the OCA repository is hosted under Argo playground:

[https://repository.oca.argo.colossi.network/](https://repository.oca.argo.colossi.network/)

It is an example of a public OCA repository where anyone can publish their schema. Remember that this Repository does not require authentication or authorization, which means everything uploaded there is available publicly to everyone and used only for testing.
