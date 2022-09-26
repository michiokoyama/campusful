import { PrismaClient } from '@prisma/client'
import { area } from './data/area'
import { article } from './data/article'
import { category } from './data/category'
import { comment } from './data/comment'
import { university } from './data/university'
import { user } from './data/user'
const prisma = new PrismaClient()

async function main() {
  await comment.truncateTable(prisma)
  await article.truncateTable(prisma)
  await user.truncateTable(prisma)
  await university.truncateTable(prisma)
  await area.truncateTable(prisma)
  await category.truncateTable(prisma)

  const categoryData = await category.initData(prisma)
  const areaData = await area.initData(prisma)
  const univData = await university.initData(prisma, areaData)
  const userData = await user.initData(prisma, univData)
  const articleData = await article.initData(prisma, categoryData, userData)
  await comment.initData(prisma, articleData, userData)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
