# サイト構成ロードマップ

## 現状

- 静的HTML（`index.html` 1枚）のランディングページ
- Cloudflare Pages でホスティング

## 方針

Cloudflare Pages をそのまま活かしつつ、段階的に機能を拡張する。

---

## Phase 1：Astroへ移行 ＋ ブログ追加（優先）

- 現在の静的HTMLを **Astro** に移植
- デザイン・CSSはそのまま移植
- ブログ記事は Markdownファイル（`.md`）で管理
  - `src/content/blog/` 以下に記事を置く
  - GitHubにpushするだけで公開される
- Cloudflare Pages のビルド設定を Astro 向けに変更（`npm run build` / output: `dist/`）

**URL構成（予定）：**
```
/          ← 既存ランディングページ
/blog      ← ブログ一覧
/blog/xxx  ← 個別記事
```

---

## Phase 2：物販（Shopifyハイブリッド構成）

- **Shopify Starterプラン（$5/月）** でShopify Buyボタンを取得
- Astroサイト内に埋め込むだけで販売開始できる
- または `/shop` ページを設けてボタンを集約

**URL構成（予定）：**
```
/shop      ← Shopify Buyボタン埋め込みページ
```

---

## Phase 3：本格EC化（将来）

- 商品が増えたら Shopify Basicプラン（$25/月〜）にアップグレード
- `shop.（ドメイン）` をShopifyに向けてサブドメイン運用も可
- Cloudflare Pages側のランディング・ブログはそのまま維持

---

## 技術スタック（移行後）

| レイヤー | 技術 |
|---------|------|
| フレームワーク | Astro |
| コンテンツ | Markdown（`.md`） |
| ホスティング | Cloudflare Pages |
| EC（将来） | Shopify Buyボタン or Shopify Starter |
