StackStorm Exchange Index
=========================

Welcome to `index`: the only StackStorm-Exchange repository to not contain a StackStorm pack.
Indulge your natural curiosity: take a look around and learn a little about how StackStorm 
Exchange works from the inside!

This is a supplementary repository for StackStorm Exchange, containing the current pack index, 
a simple web front-end, and CI materials: scripts, schemas, and configs.

The CI pipeline in all StackStorm Exchange packs is based on CircleCI (see `.circle/circle.yml` 
for the reference config). It performs linting checks and schema validations, runs pack tests (if 
present), and updates the index when necessary. 

Once the index is updated, it's stored as a static JSON file (see `index/`). While there are 
certain drawbacks to this approach, there's no outstanding issues until we start counting our 
packs by hundreds.

The web front-end just consumes and renders the index; it's written in React, and there's no 
server side to it at all. And just look at that page: packs, packs everywhere! Maybe it's time
to go create another one instead of reading this?

That's all folks!
