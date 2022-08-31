# OCA Browser

The **OCA Browser** is an utility to create and preview OCA Bundles using WEB interface. The OCA Browser supports:
- form preview, so how the data can be captured using this bundle,
- credential preview, so how the data can be presented using this bundle.
## Installation

Navigate to the [OCA Browser repository](https://github.com/THCLab/oca-browser) to download latest source code. It comes with a `Dockerfile` and it is possible to pack it as a service into Docker image and run as a container. 

Alternatively, there is a pre-baked [`docker-compose.yml` file](https://github.com/THCLab/oca-ecosystem/blob/main/docker-compose.yml) that includes OCA Repository, Browser and Data Vault already configured. To run it locally, download the compose file and then run `docker compose up` in the directory with `docker-compose.yml`.

:::tip
It can be a viable alternative to use OCA Browser that is already established. For that, visit [OCA Browser](https://browser.oca.argo.colossi.network/#/) page.
:::

##### Example

Navigate to [the example](https://github.com/THCLab/oca-ecosystem/tree/main/examples/custom_layouts) and download XLS file along with layouts.

- Navigate to the `develop` menu item and provide all required files. If the transformation process succeeded, next to `convert` button a link will pop up that follows to a newly created OCA Bundle.
- Go to `preview` menu item and upload OCA Bundle. A `form` and `credential` preview will be shown.


