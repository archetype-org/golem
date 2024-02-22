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

`golem`, is a CLI, install golem globally via `npm` or `yarn`:
```
npm install -g @archetype-org/golem
```

## Reference & Usage

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

##### Some Available Templates:

Here are a couple templates available in the CLI and example commands

CRUD (DB) Template — this template provides a sur, lib, and mar files for one datatype and uses them in the `on-poke` and `on-peek` arms of the agent. The setup is meant to be easily extensible either by adding properties or additional data types. 

```
golem new <my-project> crud
```

Sail (CRM) Template — this template includes all the piping in the CRUD template as well as an opinionated setup for serving Sail UI from the same agent, inlcuding separation of UI components into files.

```
golem new <my-project> sail
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

### Fetch Dependancies

TBD

### Publish

TBD


