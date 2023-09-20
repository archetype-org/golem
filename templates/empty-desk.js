function emptyDesk (shipName, deskName) {
  const files = [
    {
      path: `apps/${deskName}/desk`,
      name: "sys.kelvin",
      content: `[%zuse 414]`
    }, {
      path: `apps/${deskName}/desk`,
      name: "desk.docket-0",
      content: `:~
  title+'${deskName}'
  info+'A cool app that does amazing things'
  color+0xd9.b06d
  version+[0 1 0]
  website+'https://urbit.org'
  license+'MIT'
  base+'${deskName}'
  glob-ames+[~${shipName} 0v0]
==`
    }, {
      path: `apps/${deskName}/desk`,
      name: "desk.bill",
      content: `:~  %${deskName}
==`
    }, {
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
    }, {
      path: 'ships',
      name: 'ships.json',
      content: JSON.stringify({
        ships: [
          {
            pier: shipName,
            desks: [ `${deskName}`]
          }
        ]
      }, null, 2)
    }
  ]
  return { files }
}

module.exports = {
  emptyDesk,
}
