# Golem

Golem is a JavaScript CLI-Tool for creating, testing, and deploying Urbit apps, as well as integrating with decentralized package managment registires such as Egyn. 

Rather than building additional tools for Urbit, Golem is the mud and the piping — providing a minimally opinionated full-stack framework for combining the existing tools for Urbit development as well as integrating new ones. 

## About

### Project Structure

```
/<my-project>
  /apps
  	/<my-project>
  	  /desk
  	    /<desk-template>
  	  /desk-deps
  		/base-dev
  		/garden
  		...<other-desks>
  	  /ui
  	    /<react-template>
  /ships
  	/ships.json
  	/zod (fake)
  	/<other-fake-ships

```

## Getting Started & Setup

`golem`, is a CLI, install golem globally via `npm` or `yarn`:
```
npm install -g @archetype-org/golem
```

# Reference & Usage

## Project Creation 

### Create

You can create a blank app by default or build one from template with the commands below:

#### Basic

To create an empty project which includes the minimal gall agent and no frontend. If you are using golem globally installed, run:

```
golem new <my-project>
```

#### Create From Template

To instead create a project from a specific template you can supply the template name like so:

```
golem new <my-project> <template-name>
```

**NOTE:** For expediency, the create command does not initialize your test ship for the project. Once you have a project, you can initialize it with:

```
cd <my-project>
golem init
```

This should take a few minutes to run.

#### Some Available Templates:

Here are a couple templates available in the CLI and example commands

##### CRUD (DB) Template

This template provides a sur, lib, and mar files for one datatype and uses them in the `on-poke` and `on-peek` arms of the agent. The setup is meant to be easily extensible either by adding properties or additional data types. 

```
golem new <my-project> crud
cd <my-project>
golem init
```

##### Sail (CRM) Template

This template includes all the piping in the CRUD template as well as an opinionated setup for serving Sail UI from the same agent, inlcuding separation of UI components into files.

```
golem new <my-project> sail
cd <my-project>
golem init
```

### Build & Serve

Once you are in the project folder you can build the test envs by running:

```
cd <my-project>
golem build
```

Once this is run, you can find your desk installed in a test ship at `http://localhost`, the UI will still need to be globbed for it to show up, but you can confirm the desk installation by visiting `http://localhost/docket/upload` and finding it in the dropdown. Use the form on that page to upload the contents of the `/<my-project>/ui` folder and you should be able to test it.

### Dojo Shell Access

If you need it, you can access the shell for your test env at any time with:

```
golem shell
```

### Shut Down Fake Ships

golem runs your test ships in the background. You can stop a running urbit ship by running:
```
golem kill
```

This will search for a running urbit ship and kill it. This will kill the ship regardless of if it is a golem project or another fakeship you have running.

## Package Management 

### Install Dependancies

To install a package from the registry, you can use the `install` command like so:

```
golem install @<publisher-name>/<package-name>
```

The publisher name is the NEAR account name of the person or organization that published the package.

### Publish Packages

Publishing uses the near blockchain and IPFS, you will need an account on NEAR's testnet with some NEAR in it for gas. There are no requirments on the IPFS side.

Once you have a NEAR account you must also install the CLI and login with it. Full and up to date instructions can be found [here](https://docs.near.org/docs/tools/near-cli). But the basic steps are:

```
npm install -g near-cli
near login
```

Once logged in, you can publish a package by running:
```
golem publish <package-name> <semantic-version>
```

The package name must match a folder or path in your project, and the semantic version must be a valid semantic version. By default, golem will look for the specified folder or file in the `/lib` folder, but if you specify `/app`, `/sur`, or `/mar`, in the prefix of your path, it will look in the root of that folder instead. Any valid hoon file or folder of hoon files is a valid package.

### Search Packages

You can search the registry for a package to verify that it exists by running:

```
golem search @<publisher-name>/<package-name>
```

the search command in the CLI can't not perform fuzzy matching by default, since the registry contract is decentralized, it is includeded to allow for easy verification of a package's existence without installing it.
