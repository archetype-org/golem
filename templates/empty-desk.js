import { cruft } from '../partials/cruft.js'

function emptyDesk (shipName, deskName) {
  const files = [
    ...cruft(shipName, deskName),
   {
      path: `apps/${deskName}/desk/app`,
      name: `${deskName}.hoon`,
      content: `
    /+  default-agent, dbug
|%
+$  card  card:agent:gall
--
%-  agent:dbug
^-  agent:gall
|_  =bowl:gall
+*  this  .
    def   ~(. (default-agent this %.n) bowl)
++  on-init
  ^-  (quip card _this)
  \\\`this
++  on-save   on-save:def
++  on-load   on-load:def
++  on-poke   on-poke:def
++  on-watch  on-watch:def
++  on-leave  on-leave:def
++  on-peek   on-peek:def
++  on-agent  on-agent:def
++  on-arvo   on-arvo:def
++  on-fail   on-fail:def
--`
    },
  ]
  return { files }
}

export default emptyDesk

