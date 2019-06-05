import moment from "moment";
// 他に全部のロケールを読み込む方法があれば誰か教えて下さい
// せめてre exportしてファイルを分けたかったですがside effectを消去してしまうためうまくいかなかった
/* eslint-disable sort-imports */
import "moment/locale/af";
import "moment/locale/ar";
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

abstract class Site {
  // // 変更を監視しているオブジェクト
  observers: MutationObserver[] = [];

  // 生成されたらmomentの地域設定してコンソールに起動したログを残す.
  constructor() {
    // momentのグローバル地域設定.
    moment.locale(window.navigator.language);
    // eslint-disable-next-line no-console
    console.log(`goodbye-rfc-2822-date-time: ${moment().format("LLLL")}`);
  }

  // サイトを検知する.
  // 検知できなかったら`undefined`を返します.
  static detect(): Site | undefined {
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
        "askubuntu.com"
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

  // 初期化と書き換えの実行
  init() {
    this.initListener();
    this.run();
  }

  // 全てのページで行う初期監視
  initListener() {
    // AutoPagerizeでページが読み込まれた場合に対応
    document.body.addEventListener(
      "AutoPagerize_DOMNodeInserted",
      () => this.run
    );
    // 履歴書き換える系のSPAに効果があるかもしれない(未確認)
    window.addEventListener("popstate", () => this.run);
  }

  // ページに変更が入ったら呼び出される
  run() {
    // 監視を中断し,
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    // 全画面の書き換えを行い,
    this.replace();
    // 監視を再開する
    this.observe();
  }

  // 実際の画面の書き換えを行う
  abstract replace(): void;

  // サイトの監視を開始する
  // デフォルトでは
  abstract observe(): void;
}

// [GitHub](https://github.com/)
class GitHub extends Site {
  // eslint-disable-next-line class-methods-use-this
  replace() {
    // issueの書き込み時間
    GitHub.relativeTimes().forEach(relativeTime => {
      if (relativeTime instanceof HTMLElement) {
        const title = relativeTime.getAttribute("title");
        if (title) {
          relativeTime.innerText = title;
        }
      }
    });
    // コミット履歴の区切り
    [...document.getElementsByClassName("commit-group-title")].forEach(
      commitGroupTitle => {
        if (commitGroupTitle instanceof HTMLElement) {
          commitGroupTitle.innerText = commitGroupTitle.innerText.replace(
            /(Commits on )(\w+ \d+, \d+)/,
            (_, p1, p2) => {
              return p1 + moment(p2).format("LLLL");
            }
          );
        }
      }
    );
    // milestoneの期日
    // 使えそうなclassが設定されてないのでカレンダーアイコンから日時を辿る
    [...document.getElementsByClassName("octicon-calendar")].forEach(
      svgOcticonCalendar => {
        const iconParent = svgOcticonCalendar.parentElement;
        if (iconParent instanceof HTMLElement) {
          const milestoneMetaItem = iconParent.parentElement;
          if (milestoneMetaItem instanceof HTMLElement) {
            const textNode =
              milestoneMetaItem.childNodes[
                milestoneMetaItem.childNodes.length - 1
              ];
            if (textNode instanceof Text) {
              const text = textNode.wholeText.trim();
              const parsed = moment(text, "[Due by] MMMM DD, YYYY", "en");
              if (parsed.isValid()) {
                milestoneMetaItem.replaceChild(
                  document.createTextNode(
                    parsed.locale(window.navigator.language).format("LL")
                  ),
                  textNode
                );
              }
            }
          }
        }
      }
    );
  }

  observe() {
    // GitHubはbody以下全部書き換えてページ遷移する(Turbolinks?)のでそれの監視
    const observer = new MutationObserver(mutations => {
      mutations.forEach(() => {
        this.run();
      });
    });
    this.observers.push(observer);
    [...document.getElementsByTagName("body")].forEach(body => {
      if (body instanceof HTMLElement) {
        observer.observe(body, { childList: true });
      }
    });
    // issueの日時は何かのイベントで自動的に書き換わってしまうのでそれに対応
    // 書き換えを検知する要素は1つだけで十分
    // 全部検知しようとしたら流石に重すぎた
    const relativeTimeFirst = GitHub.relativeTimes()[0];
    if (relativeTimeFirst) {
      observer.observe(relativeTimeFirst, { childList: true });
    }
  }

  // issueの日時など
  static relativeTimes(): Element[] {
    return [...document.getElementsByTagName("relative-time")];
  }
}

// [Introduction | Hackage](http://hackage.haskell.org/)
class Hackage extends Site {
  // eslint-disable-next-line class-methods-use-this
  replace() {
    // XPathを使った結果の文字列を書き換える
    function replaceTableDateTime(ths: XPathResult) {
      const th = ths.iterateNext();
      if (th instanceof HTMLElement) {
        const next = th.nextElementSibling;
        if (next instanceof HTMLElement) {
          const dateTimeText = next.childNodes[next.childNodes.length - 1];
          if (dateTimeText instanceof Text && dateTimeText.textContent) {
            dateTimeText.textContent = dateTimeText.textContent.replace(
              /( at )(.+)/,
              (match, p1, p2) => {
                const parsed = moment(p2, "dddd MMMM DD HH:mm:ss Z YYYY", "en");
                // 数回呼び出されるからべき等性が保てない
                if (parsed.isValid()) {
                  return (
                    p1 + parsed.locale(window.navigator.language).format("LLLL")
                  );
                }
                return match;
              }
            );
          }
        }
      }
    }

    replaceTableDateTime(
      document.evaluate(
        `//th[text() = "Revised"]`,
        document,
        null,
        XPathResult.ANY_TYPE,
        null
      )
    );
    replaceTableDateTime(
      document.evaluate(
        `//th[text() = "Uploaded"]`,
        document,
        null,
        XPathResult.ANY_TYPE,
        null
      )
    );
  }

  // eslint-disable-next-line class-methods-use-this
  observe() {}
}

// [Hot Questions - Stack Exchange](https://stackexchange.com/)
class StackExchange extends Site {
  // eslint-disable-next-line class-methods-use-this
  replace() {
    // エントリーの投稿日時
    [
      ...document.querySelectorAll(".relativetime, .relativetime-clean")
    ].forEach(relativeTime => {
      if (relativeTime instanceof HTMLElement) {
        const title = relativeTime.getAttribute("title");
        if (title) {
          relativeTime.innerText = moment(title).format("LLLL");
        }
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  observe() {}
}

// エントリーポイントにする関数
function main() {
  const site = Site.detect();
  if (site) {
    site.init();
  }
}

// 起動
main();
