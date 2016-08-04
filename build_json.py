import os
import json
import yaml
from glob import glob

packs = []

for filename in glob('packs/*.yaml'):
  with open(filename, 'r') as pack:
    packs.append(yaml.load(pack))

with open('packs.json', 'w') as outfile:
    json.dump(packs, outfile)
