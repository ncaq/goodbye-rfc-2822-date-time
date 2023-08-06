import dayjs from "dayjs";
import Site from "./Site";

/**
 * GitHubが自前ライブラリの、
 * {@link https://www.npmjs.com/package/@github/relative-time-element relative-time-element}
 * で処理している要素を取得します。
 * 代表例としてはissueの日時やファイルの更新日などに使われています。
 */
function relativeTimes(): Element[] {
  return [...document.getElementsByTagName("relative-time")];
}

function replaceRelativeTimes(): void {
  relativeTimes().forEach((relativeTime) => {
    const lang = window.navigator.languages[0];
    if (relativeTime instanceof HTMLElement) {
      // relativeTimeの値を更新するとフォーマットも最新版に更新されるようなので、
      // 更新の必要性を伝えるために、
      // 親要素の属性だけではなくこちらの属性設定も必要です。
      relativeTime.setAttribute("lang", lang);
      const pe = relativeTime.parentElement;
      if (pe instanceof HTMLElement) {
        // relativeTime自体が書き換えられるとlang属性も消えてしまうので、
        // 親属性にも設定してしまいます。
        // 現在は`closest`で取得しているため有効です。
        pe.setAttribute("lang", lang);
      }
    }
  });
}

/** コミット履歴の区切りに対処します。 */
function replaceCommitTimeliner(): void {
  [...document.querySelectorAll(".TimelineItem-body > h2")].forEach(
    (commitGroupTitle) => {
      if (commitGroupTitle instanceof HTMLElement) {
        commitGroupTitle.innerText = commitGroupTitle.innerText.replace(
          /(Commits on )(\w+ \d+, \d+)/,
          (match, p1: string, p2: string) => {
            const parsed = dayjs(p2, "ll");
            if (parsed.isValid()) {
              return p1 + parsed.format("ll");
            }
            return match;
          },
        );
      }
    },
  );
}

/** milestoneの期日に対処します。 */
function replaceMilestone(): void {
  // 使えそうなclassが設定されてないのでカレンダーアイコンから日時を辿ります。
  [...document.getElementsByClassName("octicon-calendar")].forEach(
    (svgOcticonCalendar) => {
      const iconParent = svgOcticonCalendar.parentElement;
      if (iconParent instanceof HTMLElement) {
        const milestoneMetaItem = iconParent.parentElement;
        if (milestoneMetaItem instanceof HTMLElement) {
          const textNode = milestoneMetaItem.lastChild;
          if (textNode instanceof Text) {
            const text = textNode.wholeText
              .trimEnd()
              .replace(
                /(\s*Due by )(\w+ \d+, \d+)/,
                (match, p1: string, p2: string) => {
                  const parsed = dayjs(p2, "LL");
                  if (parsed.isValid()) {
                    return p1 + parsed.format("LL");
                  }
                  return match;
                },
              );
            textNode.replaceWith(document.createTextNode(text));
          }
        }
      }
    },
  );
}

/** [GitHub](https://github.com/) */
export default class GitHub extends Site {
  // eslint-disable-next-line class-methods-use-this
  replace(): void {
    replaceRelativeTimes();
    replaceCommitTimeliner();
    replaceMilestone();
  }

  observe(): void {
    // GitHub固有のobserverを追加します。
    const observer = new MutationObserver((mutations): void => {
      mutations.forEach(() => {
        this.run();
      });
    });
    this.observers.push(observer);

    // GitHubはbody以下全部書き換えてページ遷移することがある(Turbolinks?)のでそれの監視をします。
    [...document.getElementsByTagName("body")].forEach((body) => {
      if (body instanceof HTMLElement) {
        observer.observe(body, { childList: true });
      }
    });
  }
}
