# OCA Bin

The **OCA Bin** is a command line tool that is the entry point to interact with the OCA Ecosystem. It provides a set of commands to manage OCAFiles as well as OCA Bundles.

## Installation

The OCA Bin is distributed as a standalone executable. You can download the latest version from the [OCA Bin GitHub Releases](https://github.com/THCLab/oca-bin/releases) page.

## Usage

```bash
$ ./oca -h
Tool to deal with OCA ecosystem

Usage: oca [OPTIONS] [COMMAND]

Commands:
  init          Initialize new local repository
  config        Show configuration where data are stored
  build         Build oca objects out of ocafile
  validate      Validate oca objects out of ocafile
  publish       Publish oca objects into online repository
  sign          Sign specific object to claim ownership
  show          Show ocafile for specify said
  get           Get oca bundle for specify said
  list          List of all oca objects stored in local repository
  presentation  Generate or parse presentation for oca object
  tui           Launches a terminal user interface application to browse OCA objects
  mapping       Generate json file with all fields of oca object for specified said
  help          Print this message or the help of the given subcommand(s)

Options:
  -c, --config-path <CONFIG_PATH>
  -h, --help                       Print help
  -V, --version                    Print version
```
