import moment from "moment";

import Site from "./Site";

// [Hot Questions - Stack Exchange](https://stackexchange.com/)
export default class StackExchange extends Site {
  // eslint-disable-next-line class-methods-use-this
  replace(): void {
    // エントリーの投稿日時
    [
      ...document.querySelectorAll(".relativetime, .relativetime-clean"),
    ].forEach((relativeTime) => {
      if (relativeTime instanceof HTMLElement) {
        const title = relativeTime.getAttribute("title");
        if (title) {
          relativeTime.innerText = moment(title).format("LLLL");
        }
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  observe(): void {
    // do nothing
  }
}
