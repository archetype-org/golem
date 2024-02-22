function crudAgent (shipName, deskName) {
  const files = [
    {
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
  :_
  this(items ~)
  :*
    ~
  ==
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
      =/  id  (mod now.bowl (pow 10 10))
      ?:  (~(has by items) id)
        \\\$(now.bowl (add id 1))
      :_  state(items (~(put by items) id [name.action]))
      :~  :*  %give  %fact  ~[/updates]  %item-update
              !>(\\\`update:item\\\`[%create id name.action])
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
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?+    path  (on-peek:def path)
      [%x %items ~]
    \\\`\\\`items+!>(items)
  :: todo: add example for 'retrive one'
  ::
  ==
++  on-agent  on-agent:def
++  on-arvo   on-arvo:def
++  on-fail   on-fail:def
--
`
    },
  ]
  return files
}

export {
  crudAgent,
}
