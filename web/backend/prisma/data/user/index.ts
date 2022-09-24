import { User, PrismaClient, University } from '@prisma/client'

const initData = async (
  conn: PrismaClient,
  university: University[]
): Promise<User[]> => {
  const universityIdMap = (name: string) => {
    return university.find((a) => a.name === name).id
  }
  const data = [
    {
      // todo: 性別を取得、苗字と名前で分ける
      name: 'キャンパス太郎',
      email: 'test1@gmail.com',
      universityId: universityIdMap('東京大学'),
    },
    {
      name: 'テストユーザー',
      email: 'test2@gmail.com',
      universityId: universityIdMap('慶應義塾大学'),
    },
  ]
  await conn.user.createMany({
    data,
    skipDuplicates: true,
  })

  return await conn.user.findMany()
}

const truncateTable = async (conn: PrismaClient): Promise<void> => {
  await conn.user.deleteMany()
}
export const user = {
  initData,
  truncateTable,
}
