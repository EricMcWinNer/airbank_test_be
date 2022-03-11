import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const moment = require("moment")

const csv=require('csvtojson')

async function main() {
  let transactionJson = await csv().fromFile("./prisma/seed-sources/Transactions.csv");
  transactionJson = transactionJson.map(trans => ({
    ...trans,
    transactionDate: moment(trans.transactionDate, 'YYYY-MM-DD hh:mm:mm').toDate(),
    createdAt: moment(trans.createdAt, 'YYYY-MM-DD hh:mm:ss').toDate(),
    updatedAt: moment(trans.updatedAt, 'YYYY-MM-DD hh:mm:ss').toDate(),

  }))
  const transactionData: Prisma.TransactionCreateInput[] = transactionJson
  console.log(`Start seeding ...`)
  for (const t of transactionData) {
    const transaction = await prisma.transaction.create({
      data: t,
    })
    console.log(`Created transaction with id: ${transaction.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
