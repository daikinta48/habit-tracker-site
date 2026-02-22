# サイト構成ロードマップ

## 現状

- Astro 静的サイト（Cloudflare Pages でホスティング）
- ブログ記事15件公開済み
- SEO基盤（sitemap・JSON-LD・OGP・canonical）実装済み

## 方針

Cloudflare Pages をそのまま活かしつつ、段階的に機能を拡張する。

---

## Phase 1：Astroへ移行 ＋ ブログ追加 ✅ 完了

- [x] 静的HTMLを Astro に移植
- [x] ブログ記事を Markdown で管理（`src/content/blog/`）
- [x] タグ・関連記事・読了時間の実装
- [x] Google Analytics 導入

### SEO基盤 ✅ 完了

- [x] `@astrojs/sitemap` で sitemap-index.xml を自動生成
- [x] `robots.txt` を作成（Sitemap URL 明記）
- [x] BaseLayout に canonical・OGP完全実装（og:url / og:image / og:site_name / og:locale）
- [x] Twitter Card メタタグ
- [x] BlogPosting JSON-LD（各ブログ記事）
- [x] BreadcrumbList JSON-LD（各ブログ記事）
- [x] WebSite / SoftwareApplication / FAQPage JSON-LD（トップページ）
- [x] Cloudflare _headers にセキュリティヘッダー・長期キャッシュを追加

### SEO残タスク（コードで対応不可）

- [ ] **OG画像を作成する** — 1200×630px の画像を `/public/assets/images/og-default.jpg` に追加
  - 現在はアプリスクリーンショット（`appstore_creative/1.jpg`）を流用中
  - SNSシェア時の見栄えが大きく変わるので優先度高
- [ ] **Google Search Console にサイトマップを登録**
  - URL: `https://habit-tracker-site.pages.dev/sitemap-index.xml`
  - カスタムドメイン取得後は URL を更新して再登録
- [ ] **カスタムドメイン取得・設定**
  - 取得後に `astro.config.mjs` の `site:` と `public/robots.txt` の Sitemap URL を更新
  - Cloudflare Pages のカスタムドメイン設定を行う

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

## 技術スタック

| レイヤー | 技術 |
|---------|------|
| フレームワーク | Astro 5 |
| コンテンツ | Markdown（`.md`） |
| ホスティング | Cloudflare Pages |
| サイトマップ | @astrojs/sitemap |
| EC（将来） | Shopify Buyボタン or Shopify Starter |
