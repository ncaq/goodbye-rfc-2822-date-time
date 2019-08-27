import moment from "moment";

import Site from "./Site";

// [Introduction | Hackage](http://hackage.haskell.org/)
export default class Hackage extends Site {
  // eslint-disable-next-line class-methods-use-this
  replace(): void {
    // XPathを使った結果の文字列を書き換える
    function replaceTableDateTime(ths: XPathResult): void {
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
  observe(): void {
    // do nothing
  }
}
