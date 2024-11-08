/*
  Warnings:

  - Added the required column `composer` to the `music_metadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genreGenre_id` to the `music_metadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `track` to the `music_metadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `music_metadata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "music_metadata" ADD COLUMN     "composer" TEXT NOT NULL,
ADD COLUMN     "genreGenre_id" TEXT NOT NULL,
ADD COLUMN     "track" INTEGER NOT NULL,
ADD COLUMN     "year" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "music_metadata_genre" (
    "music_metadata_genre" TEXT NOT NULL,
    "music_metadata_id" TEXT NOT NULL,
    "genre_id" INTEGER NOT NULL,

    CONSTRAINT "music_metadata_genre_pkey" PRIMARY KEY ("music_metadata_genre")
);

-- CreateTable
CREATE TABLE "genre" (
    "genre_id" SERIAL NOT NULL,
    "genre_name" TEXT NOT NULL,

    CONSTRAINT "genre_pkey" PRIMARY KEY ("genre_id")
);

-- AddForeignKey
ALTER TABLE "music_metadata_genre" ADD CONSTRAINT "music_metadata_genre_music_metadata_id_fkey" FOREIGN KEY ("music_metadata_id") REFERENCES "music_metadata"("music_metadata_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "music_metadata_genre" ADD CONSTRAINT "music_metadata_genre_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genre"("genre_id") ON DELETE RESTRICT ON UPDATE CASCADE;
