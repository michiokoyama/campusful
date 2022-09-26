import { Article, Comment, User, PrismaClient } from '@prisma/client'

const initData = async (
  conn: PrismaClient,
  article: Article[],
  user: User[],
): Promise<Comment[]> => {
  const userIdMap = (name: string) => {
    return user.find((a) => a.firstName === name).id
  }
  const data = [
    {
      content: 'ありがとうございます。参考になりました。',
      articleId: article[3].id,
      authorId: userIdMap('太郎'),
    },
    {
      content: 'ガーナの治安はどうでしょうか？',
      articleId: article[3].id,
      authorId: userIdMap('花子'),
    },
    {
      content: `同じく２０代女優で人気を二分する広瀬すずちゃんが居るのでぶっちぎりではないと思うのですが、
      すずちゃんと比べて環奈ちゃんの特異な点は、やはりその顔面にあると思います。
      どちらも超絶美人には違いないのですが、
      環奈ちゃんの場合は、より現実離れした二次元的な顔の造形をしていると思います。`,
      articleId: article[2].id,
      authorId: userIdMap('太郎'),
    },
    {
      content: '反対です。',
      articleId: article[0].id,
      authorId: userIdMap('太郎'),
    },
  ]
  await conn.comment.createMany({
    data,
    skipDuplicates: true,
  })

  return await conn.comment.findMany()
}

const truncateTable = async (conn: PrismaClient): Promise<void> => {
  await conn.comment.deleteMany()
}
export const comment = {
  initData,
  truncateTable,
}
