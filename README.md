# Gulpで作成する静的サイトジェネレーター

静的サイトを作る案件で自分がよくつかってるいるgulpfileです。やっていることは単純です。

- pug - pugフォルダと同じディレクトリ構造でpugファイルをdistフォルダ内にhtmlファイルに変換
- js - gulpfile内で指定したファイルを一つのjsファイルにまとめてminifyしています。
- img - 画像ファイルをminifyしてdistフォルダ内に出力
- scss - scssをベンダープレフィックスしてcssにコンパイルしてdistのフォルダ内に出力

## コマンド

```
# npmインストール
npm i

# ファイルをdistに出力
gulp

# ファイルを監視して適宜出力
gulp watch

# browserSyncしながらファイルも監視して適宜出力
gulp watch-bs
```
