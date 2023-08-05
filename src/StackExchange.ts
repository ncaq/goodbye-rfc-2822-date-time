import dayjs from "dayjs";
import Site from "./Site";

/** [Hot Questions - Stack Exchange](https://stackexchange.com/) */
export default class StackExchange extends Site {
  // eslint-disable-next-line class-methods-use-this
  replace(): void {
    // エントリーの投稿日時
    [...document.querySelectorAll(".relativetime")].forEach((relativeTime) => {
      if (relativeTime instanceof HTMLElement) {
        const title = relativeTime.getAttribute("title");
        if (title == null) {
          return;
        }
        const parsed = dayjs(title);
        if (parsed.isValid()) {
          relativeTime.innerText = parsed.format("lll");
        }
      }
    });
    // コメントの投稿日時
    [...document.querySelectorAll(".relativetime-clean")].forEach(
      (relativeTime) => {
        if (relativeTime instanceof HTMLElement) {
          const t = relativeTime.getAttribute("title")?.match(/.+Z/)?.[0];
          if (t == null) {
            return;
          }
          const parsed = dayjs(t);
          if (parsed.isValid()) {
            relativeTime.innerText = parsed.format("lll");
          }
        }
      },
    );
  }

  // eslint-disable-next-line class-methods-use-this
  observe(): void {
    // do nothing
  }
}
