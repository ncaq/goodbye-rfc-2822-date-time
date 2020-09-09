import moment from "moment";

export default abstract class Site {
  // // 変更を監視しているオブジェクト
  observers: MutationObserver[] = [];

  // 生成されたらmomentの地域設定してコンソールに起動したログを残す.
  constructor() {
    // momentのグローバル地域設定.
    moment.locale(window.navigator.language);
    // eslint-disable-next-line no-console
    console.log(`goodbye-rfc-2822-date-time: ${moment().format("LLLL")}`);
  }

  // 初期化と書き換えの実行
  init(): void {
    this.initListener();
    this.run();
  }

  // 全てのページで行う初期監視
  initListener(): void {
    // AutoPagerizeでページが読み込まれた場合に対応
    document.body.addEventListener(
      "AutoPagerize_DOMNodeInserted",
      () => this.run
    );
    // 履歴書き換える系のSPAに効果があるかもしれない(未確認)
    window.addEventListener("popstate", () => this.run);
  }

  // ページに変更が入ったら呼び出される
  run(): void {
    // 監視を中断し,
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
    // 全画面の書き換えを行い,
    this.replace();
    // 監視を再開する
    this.observe();
  }

  // 実際の画面の書き換えを行う
  abstract replace(): void;

  // サイトの監視を開始する
  abstract observe(): void;
}
