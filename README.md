## 概要

本レポジトリは自らの力試しとしてゆめみのフロントエンドコーディング試験（一般に公開されている試験）の課題を実装した際の成果物です。

- フロントエンドコーディング試験
  https://notion.yumemi.co.jp/0e9ef27b55704d7882aab55cc86c999d
- デプロイ先
  https://population-chart-olive.vercel.app/

なお、課題に取り組んだ合計時間は 21 時間程度です。

## 工夫した点・アピールポイント

- Storybook と Mock Service Worker を使用し各コンポーネントを独立させて開発を行った。
- 粒度に注意しながらコミットを行った。具体的には、できるだけ小さく、アトミック（全てのテストを通過しエラーがない状態）になるようにコミットを行った。
- チームで開発においてコードレビューを受けることを念頭に変更履歴が理解しやすいストーリーになるように
  コミットの順番を入れ替えるなどした。また、ポイントとなるコミットには理由を詳しく記述した。
- `ErrorBoundary`でラップする単位は「あるコンポーネントでエラーが起きたとき他のコンポーネントが使用できることに意味があるか」という観点で考えた。この考えから、都道府県リストとグラフのどちらかがエラーを起こすとこのアプリ自体の意味（機能）が失われると考え、両方のコンポーネントを単一の`ErrorBoundary`でラップした。
- いわゆる render hooks パターンを用いることで Home コンポーネントの責務を明確化した。（Home コンポーネントが知る必要がない state 更新ロジックを含む関数を Home コンポーネントから見えなくした。）
- グラフ線の色について、カラーユニバーサルデザインを意識して色を選んだ。
- recharts のバグについて recharts の GitHub レポジトリから情報を探し出し解決した。

## その他・備考

`getStaticProps`を使用し全ての都道府県の人口推移データをビルド時に取得することで、
ユーザーがアプリを使用する際の通信回数を減らすことができる。
この実装では都道府県がチェックされるごとに通信を行う必要がないのでレスポンスはより早くより快適な UX になると考えられる。
なお、この実装は use-get-static-props-to-get-population ブランチで行っている。
