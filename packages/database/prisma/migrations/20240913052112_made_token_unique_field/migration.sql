/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `OnRampTransactions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OnRampTransactions_token_key" ON "OnRampTransactions"("token");
