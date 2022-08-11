# campusful
campufsul開発用レポジトリ

## backend環境構築
### DB起動
```
cd ./backend/db
docker-compose up -d
npx prisma migrate dev --name init
```
