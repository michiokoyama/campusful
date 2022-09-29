#!/bin/bash
set -eu

THIS_DIR=$(cd $(dirname $0); pwd)

cd $THIS_DIR/../web/backend
npm run build
cd $THIS_DIR/../web/frontend
npm run build
cd $THIS_DIR
tar --exclude node_modules -zcvf campusful.tgz ../web
scp -i ~/.ssh/my-key.pem -r ./campusful.tgz ec2-user@52.192.229.183:/home/ec2-user/repos
# build後にサーバにSCPした方が良い
# scp後の残タスク
# - フロントエンドのindex.tsxでgraphqlのリクエスト先設定 "http://ec2-52-192-229-183.ap-northeast-1.compute.amazonaws.com:4000/graphql"
# - 既存のnodeプロセスをkill
# - npx prisma generate && npx prisma migrate dev
# - バックエンドでnpm run start
# - フロントエンドでserve -s build