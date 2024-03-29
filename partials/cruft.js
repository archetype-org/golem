function cruft (shipName, deskName) {
  const files = [
    {
      path: `apps/${deskName}/desk`,
      name: "sys.kelvin",
      content: `[%zuse 412]`
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
    },
  ]
  return files
}

export {
  cruft,
}
