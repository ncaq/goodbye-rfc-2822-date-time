import moment from "moment";

import Site from "./Site";

// [Hot Questions - Stack Exchange](https://stackexchange.com/)
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
        const m = moment(title);
        if (m.isValid()) {
          relativeTime.innerText = m.format("LLLL");
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
          const m = moment(t);
          if (m.isValid()) {
            relativeTime.innerText = m.format("LLLL");
          }
        }
      }
    );
  }

  // eslint-disable-next-line class-methods-use-this
  observe(): void {
    // do nothing
  }
}
