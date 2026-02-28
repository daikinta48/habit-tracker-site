# 新規コンテンツ追加チェックリスト

## A. 新しいページを追加するとき

### 1. ページファイル作成（`src/pages/xxx.astro`）

`BaseLayout` に以下を必ず渡す：

```astro
<BaseLayout
  title="ページタイトル - Habit Tracker"
  description="このページ固有の説明文（120〜160文字推奨）"
  canonicalPath="/xxx"
>
```

- `title` — 全ページでユニークにする
- `description` — 全ページでユニークにする（コピペ禁止）
- `canonicalPath` — 必ず設定する（省略すると `Astro.url.pathname` が使われるが明示が望ましい）

### 2. `public/sitemap.xml` を更新

新しい `<url>` ブロックを追加する：

```xml
<url>
  <loc>https://smallwinsjp.com/xxx</loc>
  <lastmod>YYYY-MM-DD</lastmod>   <!-- 本日の日付 -->
  <changefreq>monthly</changefreq>
  <priority>0.6</priority>
</url>
```

目安：

| ページ種別 | priority | changefreq |
|-----------|----------|------------|
| トップページ | 1.0 | weekly |
| ブログ一覧 | 0.8 | weekly |
| 特集・機能ページ | 0.6〜0.7 | monthly |
| 法的ページ（利用規約等） | 0.3 | yearly |

### 3. `astro.config.mjs` の `lastmod` を更新

```js
sitemap({
  lastmod: new Date('YYYY-MM-DD'),  // ← 本日の日付に更新
}),
```

---

## B. ブログ記事を追加するとき

### 1. ファイル作成（`src/content/blog/slug-name.md`）

frontmatter に必須項目を設定：

```yaml
---
title: "記事タイトル（キーワードを含める）"
description: "記事の要約（120〜160文字推奨・検索結果に表示される）"
pubDate: YYYY-MM-DD
tags: ["習慣化", "三日坊主"]   # 既存タグを優先、新タグは慎重に
---
```

- `slug-name` はURLになるので半角英数字・ハイフンのみ使う
- `description` はユニークな内容にする
- canonical / OGP / JSON-LD はレイアウトが自動生成するので不要

### 2. 記事を更新したとき（updatedDate）

```yaml
updatedDate: YYYY-MM-DD
```

### 3. `astro.config.mjs` の `lastmod` を更新

```js
sitemap({
  lastmod: new Date('YYYY-MM-DD'),  // ← 本日の日付に更新
}),
```

> ブログ一覧（`public/sitemap.xml`）の lastmod も合わせて更新すると丁寧。

---

## C. デプロイ前の最終確認

```
□ npm run build でエラーなし
□ canonicalPath を設定したか
□ description がユニークか
□ public/sitemap.xml に新ページを追加したか
□ astro.config.mjs の lastmod を更新したか
□ OGP 画像が必要なら ogImage を指定したか
```

---

## D. 自動で生成されるもの（対応不要）

| 生成物 | 担当 |
|--------|------|
| `sitemap-index.xml` / `sitemap-0.xml` | `@astrojs/sitemap` がビルド時に自動生成 |
| ブログ記事の canonical / OGP / JSON-LD | `BlogPostLayout.astro` が自動生成 |
| タグページの canonical | `[tag].astro` が自動生成 |
| セキュリティヘッダー | `public/_headers`（変更不要） |
| GA4 タグ | `BaseLayout.astro`（変更不要） |

---

## E. OGP 画像をページごとに変えたいとき

```astro
<BaseLayout
  ...
  ogImage="/assets/images/your-custom-ogp.jpg"  <!-- 1200×630px 推奨 -->
>
```

省略時は `/assets/images/appstore_creative/1.jpg` が使われる。
