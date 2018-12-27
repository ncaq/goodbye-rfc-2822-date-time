# goodbye-rfc-2822-date-time

これはwebブラウザ向けの拡張機能です.

This is an extension for web browsers.

私は[RFC 2822](https://tools.ietf.org/html/rfc2822)のような日時表記方法を嫌っています.

I hate the date and time notation method like RFC 2822.

`Dec 22, 2018`のような表記です.

It is notation like `Dec 22, 2018`.

この表記はアメリカ人には良いのでしょうが,
私にはさっぱりわかりません.

Although this notation is good for Americans,
I have no idea at all.

特に私は英語の月表示を覚えられません.

Especially I can not remember English month display.

Octって何?
タコ?
って感じです.

What is Oct?
octopus?
I feel it.

この拡張機能は時刻表記をなるべく母国語に変換します.

This extension converts time notation to native language as much as possible.

日本語で利用すれば`Dec 22, 2018`は`2018年12月22日 土曜日 00:00`と変換されます.

If used in Japanese, `Dec 22, 2018` will be converted to `2018年12月22日 土曜日 00:00`.

# support website(current)

* GitHub
* Stack Overflow like site

# use library mainly

[Moment.js](https://momentjs.com/)

# How to package

~~~
% yarn
% yarn package
~~~
