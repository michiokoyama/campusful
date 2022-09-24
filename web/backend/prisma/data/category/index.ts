import { Category, PrismaClient } from '@prisma/client'

const initData = async (conn: PrismaClient): Promise<Category[]> => {
  const data = [
    {
      name: '学問・進学',
    },
    {
      name: '就活',
    },
    {
      name: '留学',
    },
    {
      name: 'インターン・アルバイト',
    },
    {
      name: '部活・サークル',
    },
    {
      name: '趣味',
    },
    {
      name: '時事問題',
    },
    {
      name: 'その他',
    },
  ]
  await conn.category.createMany({
    data,
    skipDuplicates: true,
  })

  return await conn.category.findMany()
}

const truncateTable = async (conn: PrismaClient): Promise<void> => {
  await conn.category.deleteMany()
}
export const category = {
  initData,
  truncateTable,
}
