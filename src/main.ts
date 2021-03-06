// 他に全部のロケールを読み込む方法があれば誰か教えて下さい
// せめてre exportしてファイルを分けたかったですがside effectを消去してしまうためうまくいかなかった
import "moment/locale/ar";
import "moment/locale/af";
import "moment/locale/ar-dz";
import "moment/locale/ar-kw";
import "moment/locale/ar-ly";
import "moment/locale/ar-ma";
import "moment/locale/ar-sa";
import "moment/locale/ar-tn";
import "moment/locale/az";
import "moment/locale/be";
import "moment/locale/bg";
import "moment/locale/bm";
import "moment/locale/bn";
import "moment/locale/bo";
import "moment/locale/br";
import "moment/locale/bs";
import "moment/locale/ca";
import "moment/locale/cs";
import "moment/locale/cv";
import "moment/locale/cy";
import "moment/locale/da";
import "moment/locale/de";
import "moment/locale/de-at";
import "moment/locale/de-ch";
import "moment/locale/dv";
import "moment/locale/el";
import "moment/locale/en-au";
import "moment/locale/en-ca";
import "moment/locale/en-gb";
import "moment/locale/en-ie";
import "moment/locale/en-il";
import "moment/locale/en-nz";
import "moment/locale/eo";
import "moment/locale/es";
import "moment/locale/es-do";
import "moment/locale/es-us";
import "moment/locale/et";
import "moment/locale/eu";
import "moment/locale/fa";
import "moment/locale/fi";
import "moment/locale/fo";
import "moment/locale/fr";
import "moment/locale/fr-ca";
import "moment/locale/fr-ch";
import "moment/locale/fy";
import "moment/locale/gd";
import "moment/locale/gl";
import "moment/locale/gom-latn";
import "moment/locale/gu";
import "moment/locale/he";
import "moment/locale/hi";
import "moment/locale/hr";
import "moment/locale/hu";
import "moment/locale/hy-am";
import "moment/locale/id";
import "moment/locale/is";
import "moment/locale/it";
import "moment/locale/ja";
import "moment/locale/jv";
import "moment/locale/ka";
import "moment/locale/kk";
import "moment/locale/km";
import "moment/locale/kn";
import "moment/locale/ko";
import "moment/locale/ku";
import "moment/locale/ky";
import "moment/locale/lb";
import "moment/locale/lo";
import "moment/locale/lt";
import "moment/locale/lv";
import "moment/locale/me";
import "moment/locale/mi";
import "moment/locale/mk";
import "moment/locale/ml";
import "moment/locale/mn";
import "moment/locale/mr";
import "moment/locale/ms";
import "moment/locale/ms-my";
import "moment/locale/mt";
import "moment/locale/my";
import "moment/locale/nb";
import "moment/locale/ne";
import "moment/locale/nl";
import "moment/locale/nl-be";
import "moment/locale/nn";
import "moment/locale/pa-in";
import "moment/locale/pl";
import "moment/locale/pt";
import "moment/locale/pt-br";
import "moment/locale/ro";
import "moment/locale/ru";
import "moment/locale/sd";
import "moment/locale/se";
import "moment/locale/si";
import "moment/locale/sk";
import "moment/locale/sl";
import "moment/locale/sq";
import "moment/locale/sr";
import "moment/locale/sr-cyrl";
import "moment/locale/ss";
import "moment/locale/sv";
import "moment/locale/sw";
import "moment/locale/ta";
import "moment/locale/te";
import "moment/locale/tet";
import "moment/locale/tg";
import "moment/locale/th";
import "moment/locale/tl-ph";
import "moment/locale/tlh";
import "moment/locale/tr";
import "moment/locale/tzl";
import "moment/locale/tzm";
import "moment/locale/tzm-latn";
import "moment/locale/ug-cn";
import "moment/locale/uk";
import "moment/locale/ur";
import "moment/locale/uz";
import "moment/locale/uz-latn";
import "moment/locale/vi";
import "moment/locale/x-pseudo";
import "moment/locale/yo";
import "moment/locale/zh-cn";
import "moment/locale/zh-hk";
import "moment/locale/zh-tw";

import GitHub from "./GitHub";
import Hackage from "./Hackage";
import Site from "./Site";
import StackExchange from "./StackExchange";

// サイトを検知する.
// 検知できなかったら`undefined`を返します.
function detect(): Site | undefined {
  // GitHub
  if (window.location.hostname === "github.com") {
    return new GitHub();
  }

  // Hackage
  if (window.location.hostname === "hackage.haskell.org") {
    return new Hackage();
  }

  // 即座にわかる範囲のメジャーなStack Exchangeドメイン
  if (
    [
      "stackexchange.com",
      "stackoverflow.com",
      "superuser.com",
      "askubuntu.com",
    ].includes(window.location.hostname)
  ) {
    return new StackExchange();
  }
  // フッタを解析して判断を下す
  // 割と重いのであまり使いたくない
  const footer = document.getElementsByTagName("footer")[0];
  if (
    footer instanceof HTMLElement &&
    footer.innerText.includes("Stack Exchange")
  ) {
    return new StackExchange();
  }

  return undefined;
}

// エントリーポイントにする関数
function main(): void {
  const site = detect();
  if (site) {
    site.init();
  }
}

// 起動
main();
