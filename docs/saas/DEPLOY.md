# デモを公開URLにする手順

営業で「このURL見てください」と言える状態にする。**全て無料**でできます。

> ⚠️ 注意: 既存の Apex Pack Tracker が `gh-pages` ブランチで公開中です。
> そこへ普通にデプロイすると Apex サイトを上書きしてしまうので、下記の方法を使ってください。

---

## おすすめ：Vercel（一番ラク・5分）

Apex サイトに一切影響しない、完全に独立した公開先。

1. https://vercel.com に GitHub アカウントで登録
2. 「Add New → Project」→ このリポジトリ `apex-pack-tracker` を Import
3. 設定で **Root Directory を `reserva` に指定**
4. Framework は Vite が自動検出される。そのまま「Deploy」
5. 数十秒で `https://xxxx.vercel.app` のURLが発行される 🎉

→ このURLをDMに貼るだけ。以後 git push する度に自動更新されます。

---

## 代替：Netlify Drop（アカウント登録すら不要・最速）

1. 手元で `cd reserva && npm install && npm run build` を実行
2. https://app.netlify.com/drop を開く
3. できた `reserva/dist` フォルダを画面にドラッグ＆ドロップ
4. 即座に公開URLが出る

→ お試しに一番速い。ただし更新は毎回ドラッグし直し。

---

## 代替：GitHub Pages のサブパス（Apexを壊さない形）

同じ `gh-pages` 内の別フォルダに置けば共存できます。少し手間。

1. `reserva/vite.config.ts` の base を公開パスに合わせる
   ```ts
   base: '/apex-pack-tracker/reserva/',
   ```
2. ビルド: `cd reserva && npm run build`
3. `reserva/dist` の中身を、既存の公開内容を消さずに
   `gh-pages` ブランチの `/reserva/` フォルダへ配置して push
4. 公開URL: `https://navi-ray.github.io/apex-pack-tracker/reserva/`

→ Vercel の方が圧倒的にラクなので、基本は Vercel 推奨。

---

## 公開できたら

1. URLをスマホで開いて、表示・予約フローを自分で確認
2. `GO-TO-MARKET.md` のDMテンプレに、そのURLを貼る
3. 見込み客 3人に送る

> 公開して終わりではなく、**人に見せて初めて意味がある**。
