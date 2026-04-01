# Apex Pack Tracker — CLAUDE.md

## プロジェクト概要

Apex Legends のパック開封を記録し、天井（レジェンダリー保証）を管理するための非公式 PWA。
Android ホーム画面にインストール可能。アプリストア配布なし。

- **URL**: https://navi-ray.github.io/apex-pack-tracker/
- **リポジトリ**: https://github.com/navi-RAY/apex-pack-tracker
- **技術スタック**: React + Vite + TypeScript、PWA（vite-plugin-pwa）、gh-pages でデプロイ

---

## 開発経緯

### パックシステムの仕様

- **通常パック**: レジェンダリー天井 30
- **スーパーレジェンダリー（ヘアルーム）**: 天井 500、通常パック開封と連動カウント
- **イベントパック**: 別カウント、天井なし

通常パックを開封したとき、スーパーレジェンダリーのカウントも同時に進む実装になっている。

### アイコン設計方針

キャラクターの顔や体を描こうとするラインアートを試みたが、44px のサイズでは潰れて識別不能になるため断念。各キャラクターの「最も象徴的な一要素」を**塗りつぶしのシンボル形状**として描く方針に変更。

- fill ベース（線ではなく面）
- 単一の支配的な形状
- カットアウト（`fill={bg}`）で細部を表現

各キャラクターのシンボル対応:
| キャラ | シンボル |
|---|---|
| Pathfinder | スマイルロボット顔 |
| Wraith | ボイドポータル縦楕円 |
| Bloodhound | ペスト医師マスク（ゴーグル×2＋嘴） |
| Gibraltar | ドームシールド |
| Lifeline | 医療十字 |
| Bangalore | スモークグレネード |
| Octane | 稲妻ボルト |
| Horizon | 土星リング |
| Valkyrie | 翼シルエット |
| Loba | ダイヤモンドジュエル |
| Caustic | ガスマスク（両サイドのキャニスター） |
| Crypto | 監視ドローン |
| Fuse | 手榴弾＋ピン |
| Mirage | 本体＋ゴーストクローン×2 |
| Rampart | トリプルバレルミニガン |
| Revenant | スカル |
| Ash | 左半分塗り・右半分輪郭の分割顔 |
| Mad Maggie | 破壊ボール＋チェーン |
| Newcastle | 城の塔（胸壁付き） |
| Seer | 蝶の翼 |
| Vantage | スコープ照準 |
| Catalyst | フェロフルイドスパイク |
| Ballistic | 弾丸カートリッジ |
| Conduit | シールド＋稲妻抜き |
| Alter | ボイドポータル同心楕円 |

### UI 方針

- Google 翻訳を無効化: `<meta name="google" content="notranslate">`、`<html lang="ja">`
- サイト内は全て自然な日本語のみ（英語テキスト禁止）
- Google 翻訳・AI 翻訳テキストの使用禁止
- 背景: `#10101c`、カード: `#1a1a28`、アクセントはパック種別カラーのみ
- カード内の数字を大きく（80px）、視認性優先

---

## デプロイ手順

```bash
npm run build
npm run deploy   # gh-pages ブランチに dist/ を公開
git push origin main
```

---

## 残課題

- アイテムデータが全キャラ未実装（モックデータのみ）
- Google AdSense 導入検討中
