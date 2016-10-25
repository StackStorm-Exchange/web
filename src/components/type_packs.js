<script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/1.1.4/typed.min.js"></script>

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