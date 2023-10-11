function crudDesk (shipName, deskName) {
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
      path: `apps/${deskName}/desk/app`,
      name: `${deskName}.hoon`,
      content: `
/-  item
/+  default-agent, dbug
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0  [%0 =items:item]
+$  card  card:agent:gall
--
%-  agent:dbug
=|  state-0
=*  state  -
^-  agent:gall
|_  =bowl:gall
+*  this  .
    def   ~(. (default-agent this %.n) bowl)
::
++  on-init
  ^-  (quip card _this)
  \\\`this
::
++  on-save
  ^-  vase
  !>(state)
::
++  on-load
  |=  old-state=vase
  ^-  (quip card _this)
  =/  old  !<(versioned-state old-state)
  ?-  -.old
    %0  \\\`this(state old)
  ==
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  |^
  ?>  =(src.bowl our.bowl)
  ?+    mark  (on-poke:def mark vase)
      %item-action
    =^  cards  state
      (handle-poke !<(action:item vase))
    [cards this]
  ==
  ++  handle-poke
    |=  =action:item
    ^-  (quip card _state)
    ?-    -.action
        %create
      ?:  (~(has by items) now.bowl)
        \\\$(now.bowl (add now.bowl ~s0..0001))
      :_  state(items (~(put by items) now.bowl [name.action]))
      :~  :*  %give  %fact  ~[/updates]  %item-update
              !>(\\\`update:item\\\`[%create now.bowl name.action])
          ==
      ==
    ::
        %delete
      :_  state(items (~(del by items) id.action))
      :~  :*  %give  %fact  ~[/updates]  %item-update
              !>(\\\`update:item\\\`action)
          ==
      ==
    ::
        %update
      :-  :~  :*  %give  %fact  ~[/updates]  %item-update
              !>(\\\`update:item\\\`action)
          ==  ==
      %=  state
        items  %+  ~(jab by items)
                 id.action
               |=(i=item:item i(name name.action))
      ==
    ==
  --
::
++  on-watch  on-watch:def
++  on-leave  on-leave:def
++  on-peek   on-peek:def
++  on-agent  on-agent:def
++  on-arvo   on-arvo:def
++  on-fail   on-fail:def
--
`
    }, {
      path: `apps/${deskName}/desk/mar/item`,
      name: `action.hoon`,
      content: `
/-  item
|_  =action:item
++  grab
  |%
  ++  noun  action:item
  --
++  grow
  |%
  ++  noun  action
  --
++  grad  %noun
--`
    }, {
      path: `apps/${deskName}/desk/mar/item`,
      name: `update.hoon`,
      content: `
/-  item
|_  =update:item
++  grab
  |%
  ++  noun  update:item
  --
++  grow
  |%
  ++  noun  update
  --
++  grad  %noun
--`
    }, {
      path: `apps/${deskName}/desk/sur`,
      name: `item.hoon`,
      content: `
|%
+$  id  @
+$  name  @t
+$  item  [=name]
+$  items  (map id item)
+$  action
  $%  [%create =name]
      [%delete =id]
      [%update =id =name]
  ==
+$  update
  $%  [%create =id =name]
      [%delete =id]
      [%update =id =name]
      [%initial =items]
  ==
--
`
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
  return { files }
}

module.exports = {
  crudDesk,
}
