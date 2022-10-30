# Swiss Passport Example

Below we introduce a step by step guidance of utilizing [ Semantic (Label) ](/specification/#label-overlay) and [ Presentation  ](/specification/#presentation-overlays) Overlays in action for rendering credential – Swiss Passport specimen.

## Create OCA Bundle

The process starts with defining the passport schema, including all the attributes, their types, formats, etc. For this purpose, [ an empty XLS template ](https://github.com/THCLab/oca-ecosystem/blob/main/examples/template.xlsx) can be used or an already pre-baked template, available [here](https://github.com/THCLab/oca-ecosystem/blob/main/examples/swiss_passport/digital_passport.xlsx). We will continue with the latter template.

The next step is to create [ OCA Bundle ](/ecosystem/oca-bundle) from the template and to do so, we will use the [ OCA Browser ](/ecosystem/oca-browser) feature named `Develop`. Within our Sandbox, we host OCA Browser and we will use it to create the Bundle. The browser is accessible [here](https://browser.oca.argo.colossi.network/#/).

In the `Select OCA File` we use [pre-baked template](https://github.com/THCLab/oca-ecosystem/blob/main/examples/swiss_passport/digital_passport.xlsx). `Select OCA references files` we leave empty and for `Credential` and `Form` layout, we use [these layouts](https://github.com/THCLab/oca-ecosystem/tree/main/examples/swiss_passport/layouts).

To conduct the conversion, click on the `convert` button. If it succeeds, below you shall see the following: `Success! Click here to download OCA Bundle`.

## Form and Credential preview

As the Bundle is created, we go to the next [ OCA Browser ](/ecosystem/oca-browser) feature named [ `Preview` ](https://browser.oca.argo.colossi.network/#/preview).

In the `Pick OCA Bundle ZIP file` upload the Bundle created in the previous step. As a result, in the `FORM` tab the form preview will be rendered. This is the preview of the OCA Bundle using presentation overlays in the WEB space.

::: tip Form and Credential translations
The [pre-baked template](https://github.com/THCLab/oca-ecosystem/blob/main/examples/swiss_passport/digital_passport.xlsx) comes with two translations: English and French. Any number can be added, but for the sake of this example, we use only these two.

In the preview, both, so the Form and Credential contain a select widget to change the translation.
:::

In the `CREDENTIAL` tab a passport specimen can be seen. Notice it is only the preview of the layout and schema. The data entries are missing. For preview all these combined we will use different tool that can be accessible [here](https://demo.oca.argo.colossi.network/credential.html).

We reuse the same OCA Bundle we created in the previous step. In the `Preview record SAID` we use pre-prepared data record with SAID: `ESEFRI_In7btcko9ov2IElxTKogunrDcv187n9Be7Kvc`. The data record behind is given as follows:
```json
{
  "documentType": "PA",
  "issuingState": "CHE",
  "issuingStateCode": "che",
  "documentNumber": "c0000000",
  "primaryIdentifier": "John",
  "secondaryIdentifier": "Citizen",
  "nationality": "CHE",
  "dateOfBirth": "28.01.0000",
  "personalNumber": "",
  "sex": "M",
  "placeOfBirth": "Luzern LU",
  "optionalPersonalData": "170",
  "dateOfIssue": "11.07.0000",
  "issuedBy": "Luzern LU",
  "dateOfExpiry": "11.07.0000"
}
```
It is stored on [https://data-vault.argo.colossi.network/](https://data-vault.argo.colossi.network/). As a next step, click `Load` that triggers rendering the preview. This time data record is visible.

::: tip Custom data record
For preview any data record can be used. To do so, visit [https://data-vault.argo.colossi.network/](https://data-vault.argo.colossi.network/) page where Swagger interface is available. Use the `GET /files/{DRI}` endpoint and then `try it out` button. As input provide known SAID: `ESEFRI_In7btcko9ov2IElxTKogunrDcv187n9Be7Kvc` and download the JSON file.

Changed JSON you can reupload to [https://data-vault.argo.colossi.network/](https://data-vault.argo.colossi.network/) via `POST /files` endpoint and use the returned SAID as input for the `Preview record SAID` field.
:::

## Adding authentication taste

Whether the data can be proven to come from a verifiable source is the responsibility of an upper layer – the authentication layer. The authentication layer relies on public key cryptography. During the verification process, by verifying the signature along with the payload, it gives the non-repudiable answer whether the data has tampered.

In the following demo we introduce novel, authentication layer-related concepts:
- [ACDC](https://www.ietf.org/archive/id/draft-ssmith-acdc-02.html) – Authentic Chained Data Containers;
- [DKMS](http://dkms.colossi.network/) – Decentralised Key Management System.

[Here](https://demo.oca.argo.colossi.network/acdc.html) we demonstrate a [ compact ACDC ](https://www.ietf.org/archive/id/draft-ssmith-acdc-02.html#name-compact-acdc) that represents the passport credential. The sample credential in the `Issue` section is defined as follows:
```json
{
  "v":"ACDC10JSON00011c_",
  "i":"DdUXsE9lsnc5vbSOQVG8khiqe-ICXd6F-Gf5nkfWRxFs",
  "s":"Eohm-VG6JcT2HwU9IvM_Ujp6lIgwhg34TvXUtVqv_L3I",
  "a":"ESEFRI_In7btcko9ov2IElxTKogunrDcv187n9Be7Kvc",
  "p":[],
  "r":[],
  "d":"EQD7oAeqJOWoWYzrI1cu_Bzipr3RcpBsGkThK_L1eUEA"
}
```
It is a map of key-value pairs, where `s` and `a` are interesting in particular. `s` stands for `schema`, and `a` stands for `attributes`. In `s` we use SAID of the OCA Bundle from the above example and in `a` we use data record SAID from the above example. By doing this, we embedded OCA into the ACDC.

The ACDC itself is not yet signed and we sign it using public key cryptography. For the sake of the example, assume the key pair is generated from a 32 bytes seed `MDM0ZjczNmEyMGM1NDUyZGI3M2E3ODU1MTVjOGJiZTU=`. Using private key of such key pair, this creates the 64 bytes length signature `T6XBbjKSISmpJN9WMRxw3ay+6oL3ww0K0AbQGLP4Mx3McTd8LMQ0Un0RKUnHtH5WR2yhb6r+SSuO43iZddloDA==`.  (using `ED25519` algorithm). We can verify the signature using JavaScript and `tweetnacl` library. The following code snippet presents the verification:
```js
let nacl = require("tweetnacl");

let keypair = nacl.sign.keyPair.fromSeed(
  Buffer.from("MDM0ZjczNmEyMGM1NDUyZGI3M2E3ODU1MTVjOGJiZTU=", "base64")
);
let result = nacl.sign.detached.verify(
  Buffer.from(`{"v":"ACDC10JSON00011c_","i":"DdUXsE9lsnc5vbSOQVG8khiqe-ICXd6F-Gf5nkfWRxFs","s":"Eohm-VG6JcT2HwU9IvM_Ujp6lIgwhg34TvXUtVqv_L3I","a":"ESEFRI_In7btcko9ov2IElxTKogunrDcv187n9Be7Kvc","p":[],"r":[],"d":"EQD7oAeqJOWoWYzrI1cu_Bzipr3RcpBsGkThK_L1eUEA"}`, "utf8"),
  Buffer.from(
    "T6XBbjKSISmpJN9WMRxw3ay+6oL3ww0K0AbQGLP4Mx3McTd8LMQ0Un0RKUnHtH5WR2yhb6r+SSuO43iZddloDA==",
    "base64"
  ),
  keypair.publicKey
);
console.log(result); // true
```

Skipping all the details related to the authentication layer, that take place before the presentation layer is employed, we can finally `render credential` directly from an ACDC credential to see the passport specimen preview. The OCA Bundle containing all the details for presentation is unknown to the ACDC, therefore it has to be resolved from a third-party service, where the Bundle is stored. It can be an [OCA Repository](/ecosystem/oca-repository) instance, however, it is not essential. OCA Bundle can be stored anywhere from `AWS S3` to `IPFS`.
