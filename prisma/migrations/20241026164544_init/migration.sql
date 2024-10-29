/*
  Warnings:

  - The primary key for the `profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profile" DROP CONSTRAINT "profile_pkey",
DROP COLUMN "id",
ADD COLUMN     "profile_id" SERIAL NOT NULL,
ADD CONSTRAINT "profile_pkey" PRIMARY KEY ("profile_id");

-- CreateTable
CREATE TABLE "access_token" (
    "access_token_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "access_token_pkey" PRIMARY KEY ("access_token_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "access_token_user_id_key" ON "access_token"("user_id");

-- AddForeignKey
ALTER TABLE "access_token" ADD CONSTRAINT "access_token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
