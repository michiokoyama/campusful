import { Article, Category, User, PrismaClient, ArticleType } from '@prisma/client'

const initData = async (
  conn: PrismaClient,
  category: Category[],
  user: User[],
): Promise<Article[]> => {
  const categoryIdMap = (name: string) => {
    return category.find((a) => a.name === name).id
  }
  const userIdMap = (name: string) => {
    return user.find((a) => a.name === name).id
  }

  const data = [
    {
      title: '就職か進学か迷ったときにやったこと',
      content: 'テスト本文',
      categoryId: categoryIdMap('学問・進学'),
      authorId: userIdMap('キャンパス太郎'),
      type: ArticleType.Article,
    },
    {
      title:
        '外交官になりたくてガーナに飛び込んだら、本当にやりたいことが分かった話。',
      content:
        '幼少期から計15年間サッカーに打ち込み、幼稚園、小学生、中学生、高校生とどのチームでもキャプテンを経験しました。それ以外にも児童会長や学級委員長になるなど、幼少期は組織のリーダーになることが多かったです。学業面においても、塾に通っていたことなどもあり成績は良く、お陰様で、第一志望だった千葉県立千葉高校に入学しました。',
      categoryId: categoryIdMap('留学'),
      authorId: userIdMap('テストユーザー'),
      type: ArticleType.Article,
    },
  ]
  await conn.article.createMany({
    data,
    skipDuplicates: true,
  })

  return await conn.article.findMany()
}

const truncateTable = async (conn: PrismaClient): Promise<void> => {
  await conn.article.deleteMany()
}
export const article = {
  initData,
  truncateTable,
}
