import './vendor/typed';

const type_packs = (packs) => {
  const packNames = packs.map(pack => pack.name);
  $('#pack-install').typed({
    strings: packNames,
    shuffle: true,
    backDelay: 2000,
    loop: true,
    showCursor: false,
  });
};

export default type_packs;
