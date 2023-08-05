import dayjs from "dayjs";
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
          const dateTimeElement = next.lastElementChild;
          if (
            dateTimeElement instanceof HTMLSpanElement &&
            dateTimeElement.textContent
          ) {
            const parsed = dayjs(dateTimeElement.textContent);
            // 数回呼び出されるからべき等性が保てない
            if (parsed.isValid()) {
              dateTimeElement.textContent = parsed.format("llll");
            }
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
        null,
      ),
    );
    replaceTableDateTime(
      document.evaluate(
        `//th[text() = "Uploaded"]`,
        document,
        null,
        XPathResult.ANY_TYPE,
        null,
      ),
    );
  }

  // eslint-disable-next-line class-methods-use-this
  observe(): void {
    // do nothing
  }
}
