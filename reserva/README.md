# Reserva（動くプロトタイプ）

個人店・1人事業者向けの「予約 + 自動リマインド」SaaS のフロントエンド試作です。
企画書は [`../docs/saas/PLAN.md`](../docs/saas/PLAN.md) を参照。

## これは何か

- **お客様に見せて反応を確かめるための、動くデモ**です。
- データはブラウザの localStorage に保存され、**バックエンドはまだありません**。
- 認証・クラウド保存・課金（Supabase / Stripe）は次の段階で載せます。

## 画面

| 画面 | 内容 |
|---|---|
| トップ（LP） | サービス紹介・料金プラン。デモへの導線 |
| 管理画面（オーナー用） | 予約一覧・KPI・予約の追加/来店済み/無断キャンセル |
| 公開予約ページ（お客様用） | メニュー → 日時 → 情報入力 → 予約完了の流れ |
| 設定 | 店名・営業時間・予約間隔・メニューの編集 |

## 動かし方

```bash
cd reserva
npm install
npm run dev      # 開発サーバー
npm run build    # 本番ビルド（dist/）
npm run preview  # ビルド結果をプレビュー
```

ブラウザで開いたら、トップの「管理画面のデモを触る」「お客様の予約画面を見る」から体験できます。
左下の「デモデータを初期状態に戻す」でいつでもリセットできます。

## 技術構成

- React 19 + Vite + TypeScript
- Tailwind CSS v4
- 状態管理は localStorage + `useSyncExternalStore`（`src/store.ts`）

## 次のステップ（バックエンド化）

1. `src/store.ts` の localStorage 部分を Supabase に差し替え
2. ログイン（Supabase Auth）を追加し、店舗ごとにデータを分離（RLS）
3. Stripe でサブスク課金
4. リマインドメール送信（Resend）を実装
