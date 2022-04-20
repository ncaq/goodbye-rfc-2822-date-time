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
