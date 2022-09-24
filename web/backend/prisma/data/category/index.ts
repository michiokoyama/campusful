import { Category, PrismaClient } from '@prisma/client'

const initData = async (conn: PrismaClient): Promise<Category[]> => {
  const data = [
    {
      id: 1,
      name: '学問・進学',
    },
    {
      id: 2,
      name: '就活',
    },
    {
      id: 3,
      name: '留学',
    },
    {
      id: 4,
      name: 'インターン・アルバイト',
    },
    {
      id: 5,
      name: '部活・サークル',
    },
    {
      id: 6,
      name: '趣味',
    },
    {
      id: 7,
      name: '時事問題',
    },
    {
      id: 8,
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
