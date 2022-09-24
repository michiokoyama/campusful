import { Area, University, PrismaClient } from '@prisma/client'

const initData = async (
  conn: PrismaClient,
  area: Area[],
): Promise<University[]> => {
  const areaIdMap = (name: string) => {
    return area.find((a) => a.name === name).id
  }
  const data = [
    {
      name: '東京大学',
      // todo: 正しいareaIdを取得する
      areaId: areaIdMap('東京'),
    },
    {
      name: '慶應義塾大学',
      areaId: areaIdMap('東京'),
    },
  ]
  await conn.university.createMany({
    data,
    skipDuplicates: true,
  })

  return await conn.university.findMany()
}

const truncateTable = async (conn: PrismaClient): Promise<void> => {
  await conn.university.deleteMany()
}
export const university = {
  initData,
  truncateTable,
}
