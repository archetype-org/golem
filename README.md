# Golem

Golem is a JavaScript CLI-Tool for creating, testing, and deploying Urbit apps, as well as integrating with decentralized package managment registires such as Egyn. 

Rather than building additional tools for Urbit, Golem is the mud and the piping — providing a minimally opinionated full-stack framework for combining the existing tools for Urbit development as well as integrating new ones. 

## About

### Included Tools

* Developer Pill
* Docs

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

Golem is in open alpha and is not available via npm yet. To test it, clone from gi with:

```
git clone git@github.com:archetype-org/golem.git
```

And then, move the project into a folder in your `$PATH`, (or alternatively run it with a relative path to `./golem/index.js`)

## Reference & Usage

### Create

You can create a blank app by default or build one from template with the commands below:

#### Basic

To create an empty project which includes the minimal gall agent and no frontend. If you are using golem globally installed, run:

```
golem new <my-project>
```

If you are using relative paths instead use:

```
node ./golem/index.js new <my-project>
```

#### Create From Template

To instead create a project from a specific template you can supply the template name like so:

```
golem new <my-project> <template-name>
```

(or locally):

```
node ./golem/index.js new <my-project> <template-name>
```

##### Some Available Templates:

Here are a couple templates available in the CLI and example commands

CRUD (DB) Template — this template provides a sur, lib, and mar files for one datatype and uses them in the `on-poke` and `on-peek` arms of the agent. The setup is meant to be easily extensible either by adding properties or additional data types. 

```
node ./golem/index.js new <my-project> crud
```

Sail (CRM) Template — this template includes all the piping in the CRUD template as well as an opinionated setup for serving Sail UI from the same agent, inlcuding separation of UI components into files.

```
node ./golem/index.js new <my-project> sail
```

### Build & Serve

Once you are in the project folder you can build the test envs by running:

```
cd <my-project>
golem build
```

(or with local install):

```
cd <my-project>
node ../golem/index.js build
```

at the moment, Golem does not automate commits because the click CLI is broken for MacOs. So the first time you build you will receive an error informing you that you need to run two dojo commands, do so with `shell`:

```
node ../golem/index.js shell
```

And once dojo starts run:

```
|new-desk %<my-project>
|commit %<my-project>
```

This is a temporary measure. Once we finish JS Support for running threads with the Clack.js library, the only command you will need to run AND commit is `golem build`

### Dojo Shell Access

You can access the shell at any time with:

```
golem shell
```

(or locally):

```
cd <my-project>
node ./golemindex.js build
```

### Fetch Dependancies

TBD

### Publish

TBD


