function hubAgent (shipName, deskName) {
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
  ++  tell
    |=  update=update:item
    ^-  (list card)
    :~  :*  %give  %fact  ~[/updates]  %item-update
            !>(update)
        ==
    ==
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
    ?:  =(our.bowl ~zod)  ~
    :~
      [%pass /items %agent [~zod %hub] %watch /updates]
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
                $(now.bowl (add id 1))
              :_  state(items (~(put by items) id [name.action our.bowl]))
              (tell \\\`update:item\\\`[%create id name.action our.bowl])
            ::
                %delete
              :_  state(items (~(del by items) id.action))
              (tell \\\`update:item\\\`action)
            ::
                %update
              :-  (tell \\\`update:item\\\`[%update id.action name.action our.bowl])
              %=  state
                items  %+  ~(jab by items)
                         id.action
                       |=(i=item:item i(name name.action, src our.bowl))
              ==
            ==
          --
        ::
        ++  on-watch
          |=  =path
          ^-  (quip card _this)
          ?+    path  (on-watch:def path)
              [%updates ~]
            %-  (slog leaf+"Subscribed to updates." ~)
            :_  this
            :~  [%give %fact ~[/updates] %item-update !>([%initial items])]
            ==
          ==
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
        ++  on-agent
          |=  [=wire =sign:agent:gall]
          ^-  (quip card _this)
          |^
          ?+    wire  (on-agent:def wire sign)
              [%items ~]
            ?+    -.sign  (on-agent:def wire sign)
                %watch-ack
              ?~  p.sign
                ((slog '%hub: Subscribed to ~zod!' ~) \\\`this)
              ((slog '%hub: Could NOT Subscribe to ~zod!' ~) \\\`this)
            ::
                %kick
              %-  (slog '%hub: Got kick, resubscribing...' ~)
              :_  this
                :~  [%pass /items %agent [src.bowl %hub] %watch /updates]
                ==
            ::
                %fact
              ?+    p.cage.sign  (on-agent:def wire sign)
                  %item-update
                (handle-update !<(update:item q.cage.sign))
              ==
            ==
          ==
          ++  handle-update
            |=  =update:item
            ~&  "Got update"
            ~&  update
            ?-    -.update
                %initial
              (hear (~(uni by items) items.update))
                %create
              (hear (~(put by items) id.update [name=name.update src=src.update]))
                %update
              (hear (~(put by items) id.update [name=name.update src=src.update]))
                %delete
              (hear (~(del by items) id.update))
            ==
          ++  hear
            |=  items=$_(+.state)
            :-  ~  
            %=  this  state
              %=  state  items
                items
              ==
            ==
          --
        ++  on-arvo   on-arvo:def
        ++  on-fail   on-fail:def
        --      
  `
      },
    ]
    return files
  }
  
  export {
    hubAgent,
  }
  