import { User, PrismaClient, University, GenderType } from '@prisma/client'

const initData = async (
  conn: PrismaClient,
  university: University[]
): Promise<User[]> => {
  const universityIdMap = (name: string) => {
    return university.find((a) => a.name === name).id
  }
  const data = [
    {
      firstName: '太郎',
      lastName: 'キャンパス',
      gender: GenderType.Man,
      email: 'test1@gmail.com',
      universityId: universityIdMap('東京大学'),
    },
    {
      firstName: '花子',
      lastName: 'テスト',
      email: 'test2@gmail.com',
      gender: GenderType.Woman,
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
