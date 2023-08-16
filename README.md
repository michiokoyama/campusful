# リポジトリ概要
大学生向け知識共有サービス「Campusful」の開発用リポジトリです。
UIのイメージは[Quora](https://jp.quora.com/)が近いです。
結局リリースまでは至りませんでしたが、供養も兼ねてpublicにしています。

# 技術スタック
## frontend
 - TypeScript
 - React
 - Recoil
   - 状態管理
 - Chakra UI
   - Component Library
 - Draft.js
   - エディタ

## backend
個人開発のため、開発のスピードやfrontendとの型共有が可能である点にメリットを感じ TypeScript/Node.JSを採用しました。

 - TypeScript
 - Node.js
 - NestJS
 - prisma/GraphQL
   - ORM
 - PostgreSQL

# 環境構築
## backend環境構築
### DB起動およびサンプルデータ投入
```
cd ./web/backend/db
docker-compose up -d
npx prisma migrate dev --name init
```

### app起動
```
cd ./web/backend
yarn start dev  # for dev
yarn start  # for prd
```

## frontend環境構築
### app起動
```
cd ./web/frontend
yarn start dev  # for dev
yarn start  # for prd
```
