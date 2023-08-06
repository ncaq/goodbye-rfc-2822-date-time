[![lint](https://github.com/ncaq/goodbye-rfc-2822-date-time/actions/workflows/lint.yml/badge.svg)](https://github.com/ncaq/goodbye-rfc-2822-date-time/actions/workflows/lint.yml)
[![Mozilla Add-on](https://img.shields.io/amo/users/goodbye-rfc-2822-date-time.svg)](https://addons.mozilla.org/ja/firefox/addon/goodbye-rfc-2822-date-time/)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/users/ncpepaiocdmmmonbikofmggdphoheoge.svg)](https://chrome.google.com/webstore/detail/goodbye-rfc-2822-date-tim/ncpepaiocdmmmonbikofmggdphoheoge)

# goodbye-rfc-2822-date-time

## English

This project is a web browser extension that aims to convert date and time notations into a user-friendly form.

For example, the [RFC 2822](https://tools.ietf.org/html/rfc2822) format (e.g. `Dec 22, 2018`) is very easy to understand for people in the US.

However, for us Japanese, the notation is not always intuitive.
I especially have a hard time remembering English month names (e.g. `Oct`), and I often wonder what month `Oct` was? octopus? I am not sure which month you are referring to.

By installing this extension, it is possible to convert the date and time notation to the natural notation of each user's native language, or change it to [ISO 8601](https://www.iso.org/standard/70907.html).

Specifically, if you are using GitHub in Japanese, notations such as `2018年12月23日` will be converted into a form that is easy for us Japanese to understand, such as `Dec 23, 2018`.
In this way, the extension eliminates confusion about the notation of date and time.

## Japanese

このプロジェクトはwebブラウザ向けの拡張機能で、日時の表記をユーザーにとって分かりやすい形に変換することを目指しています。

例えば[RFC 2822](https://tools.ietf.org/html/rfc2822)形式の日時表記(`Dec 22, 2018`等)は、アメリカの人々には非常に理解しやすい形となっています。

しかし、私たち日本人にとってはその表記方法は必ずしも直感的ではありません。
特に私は英語の月名(例:`Oct`)を覚えるのが難しく、`Oct`は何月だったっけ?タコ?など、どの月を指しているのか分からなくなります。

そこで、この拡張機能を導入することで、日時表記を各ユーザーの母国語による自然な表記に変換したり、[ISO 8601](https://www.iso.org/standard/70907.html)に変更したりすることが可能になります。

具体的には、GitHubを日本語で利用している場合には、`Dec 23, 2018`といった表記が`2018年12月23日`というように、我々日本人にとって分かりやすい形に変換されます。
このように、拡張機能を利用することで日時の表記に関する混乱を解消します。

# Support website(current)

* [GitHub](https://github.com/)
* [Stack Overflow like sites](https://stackexchange.com/sites)
* [Hackage](https://hackage.haskell.org/)

# Distribution

* [Firefox](https://addons.mozilla.org/firefox/addon/goodbye-rfc-2822-date-time/)
* [Chrome](https://chrome.google.com/webstore/detail/goodbye-rfc-2822-date-tim/ncpepaiocdmmmonbikofmggdphoheoge)

# Use library mainly

[Day.js](https://day.js.org/)

# How to build and package(required by Mozilla)

~~~console
yarn --frozen-lockfile
yarn package
~~~
