import './vendor/typed.min.js';

const type_packs = function (packs) {
  var packNames = packs.map(function(pack) {
    return pack.name;
  });
  $("#pack-install").typed({
    strings: packNames,
    shuffle: true,
    backDelay: 2000,
    loop: true,
    showCursor: false
  });
};

export default type_packs;
