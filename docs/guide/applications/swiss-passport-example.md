# Swiss Passport Example

Below we introduce a step by step guidance of utilizing [ Semantic (Label) ](/specification/#label-overlay) and [ Presentation  ](/specification/#presentation-overlays) Overlays in action for rendering credential – Swiss Passport specimen.

## Create OCA Bundle

The process starts with defining passport schema, including all the attributes, their types, formats and so on. For this purpose, [ empty XLS template ](https://github.com/THCLab/oca-ecosystem/blob/main/examples/template.xlsx) can be used or already pre-baked template, available [here](https://github.com/THCLab/oca-ecosystem/blob/main/examples/swiss_passport/digital_passport.xlsx). We will continue with the latter template.

Next step is to create [ OCA Bundle ](/ecosystem/oca-bundle) from the template and to do so, we will use the [ OCA Browser ](/ecosystem/oca-browser) feature named `Develop`. Within our Sandbox, we host OCA Browser and we will use it to create the Bundle. The browser is accessible [here](https://browser.oca.argo.colossi.network/#/).

In the `Select OCA File` we use [pre-baked template](https://github.com/THCLab/oca-ecosystem/blob/main/examples/swiss_passport/digital_passport.xlsx). `Select OCA references files` we leave empty and for `Credential` and `Form` layout, we use [these layouts](https://github.com/THCLab/oca-ecosystem/tree/main/examples/swiss_passport/layouts).

To conduct the conversion, click on the `convert` button. If it succeeds, below you shall see the following: `Success! Click here to download OCA Bundle`.

## Form and Credential preview

As the Bundle is created, we go to the next [ OCA Browser ](/ecosystem/oca-browser) feature named [ `Preview` ](https://browser.oca.argo.colossi.network/#/preview).

In the `Pick OCA Bundle ZIP file` upload the Bundle created in the previous step. As a result, in the `FORM` tab the form preview will be rendered. This is the preview of the OCA Bundle using presentation overlays in the WEB.

In the `CREDENTIAL` tab a passport specimen can be seen. Notice it is only the preview of the layout and schema. The data entries are missing. For preview all these combined we will use different tool that can be accessible [here](https://demo.oca.argo.colossi.network/credential.html).

There, we reuse the same OCA Bundle we created in the previous step.In the `Preview record SAID` we use pre-prepared data entry with SAID: `ESEFRI_In7btcko9ov2IElxTKogunrDcv187n9Be7Kvc`. It is stored on [https://data-vault.argo.colossi.network/](https://data-vault.argo.colossi.network/). As a next step, click `Load` that triggers rendering the preview. This time data entry is visible.

::: tip Custom data entry
For preview any data entry can be used. To do so, visit [https://data-vault.argo.colossi.network/](https://data-vault.argo.colossi.network/) page where Swagger interface is available. Use the `GET /files/{DRI}` endpoint and then `try it out` button. As input provide known SAID: `ESEFRI_In7btcko9ov2IElxTKogunrDcv187n9Be7Kvc` and download the JSON file.

Changed JSON you can reupload to [https://data-vault.argo.colossi.network/](https://data-vault.argo.colossi.network/) via `POST /files` endpoint and use the returned SAID as input for the `Preview record SAID` field.
:::
