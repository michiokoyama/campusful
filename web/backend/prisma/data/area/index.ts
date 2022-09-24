import { Area, PrismaClient } from '@prisma/client'

const initData = async (conn: PrismaClient): Promise<Area[]> => {
  const data = [
    {
      name: '北海道',
    },
    {
      name: '東京',
    },
  ]
  await conn.area.createMany({
    data,
    skipDuplicates: true,
  })

  return await conn.area.findMany()
}

const truncateTable = async (conn: PrismaClient): Promise<void> => {
  await conn.area.deleteMany()
}
export const area = {
  initData,
  truncateTable,
}
