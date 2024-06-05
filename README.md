# About this repo
2024/5/18 BIPROGY開催のハッカソン[BIPROGY DX HACK](https://www.biprogy.com/recruit/hackathon/index_hackason.html)でチームで作成したWebアプリ
「オンラインで質問がし辛い」というユーザーのニーズを対象として、作業者の進捗情報を可視化するタスク管理Webアプリを作成
自分はフロントエンドとグループリーダーを担当
優秀賞(8チーム中2位)を受賞

# Getting Started

## Docker

### Starting Docker

Build
```bash
docker compose build
```

Up
```bash
docker compose up
```

localhost:3000を開く

### コンテナに入る
```bash
docker compose run app sh
```

#### コンテナ内操作
Lint
```bash
npm run lint
```

Build
```bash
npm run build
```

# Original repo
[https://github.com/taiyo2001/biprogy-hackathon-2024-frontend]