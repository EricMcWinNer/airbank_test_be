-- CreateTable
CREATE TABLE "Transaction" (
    "real_id" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("real_id")
);
