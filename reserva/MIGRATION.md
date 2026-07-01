# Reserva を新しいリポジトリに移す手順

このフォルダ（`reserva/`）は完全に独立して動くので、
新しいリポジトリに丸ごと置けば、Apex とは無関係な自分のプロジェクトになります。

---

## なぜ手動移行が要るのか

今の Claude セッションは `apex-pack-tracker` リポジトリに固定されていて、
**別のリポジトリを作る・そこに push する権限がありません**。
なので「新しい入れ物を用意する」ところだけはあなたの操作が必要です。
（それさえ済めば、新セッションを新リポジトリで開始して続きを一緒に作れます）

---

## 手順（コピペで実行）

### 1. GitHub で新しい空リポジトリを作る
- リポジトリ名: 例 `reserva`
- README や .gitignore は**付けない**（空で作る）
- 作成後の `https://github.com/あなた/reserva.git` を控える

### 2. 手元に Reserva だけを取り出して push

お渡しした `reserva-standalone.tgz` を使う場合：

```bash
# 新リポジトリをクローン
git clone https://github.com/あなた/reserva.git
cd reserva

# tgz の中身（reserva/ の中身）をこのフォルダ直下に展開
tar xzf ~/Downloads/reserva-standalone.tgz --strip-components=1

# 動作確認
npm install
npm run dev      # ブラウザで開いて確認

# 問題なければ push
git add .
git commit -m "Reserva 予約SaaS 初期実装"
git branch -M main
git push -u origin main
```

> `--strip-components=1` は、tgz 内の `reserva/` という階層を1つ剥がして
> 中身をリポジトリ直下に置くための指定です。

### 3. 新リポジトリで Claude セッションを開始
- 新しい Claude Code セッションを **`reserva` リポジトリを指定して**開始
- そこから続きの開発（LINEリマインド・バックエンド化・課金など）を進められます
- Apex は一切絡みません

---

## 移行後にやること（新リポジトリで）

- `reserva/README.md` を新リポジトリのトップ README に昇格
- 公開URL化（`../docs/saas/DEPLOY.md` 参照 / Vercel が最速）
- バックエンド化（Supabase）→ 課金（Stripe）の順で本物のSaaSへ

---

## 補足：このApexリポジトリ側の掃除

新リポジトリへ移し終えたら、この `apex-pack-tracker` 側の
`reserva/` と `docs/saas/`・`docs/freelance/` は不要になります。
残しても害はありませんが、消したい場合は移行完了を確認してから削除してください。
