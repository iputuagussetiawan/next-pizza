/*
  Warnings:

  - Added the required column `token` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "token" TEXT;

-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "quantity" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "token" TEXT NOT NULL;
