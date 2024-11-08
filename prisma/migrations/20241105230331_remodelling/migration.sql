/*
  Warnings:

  - The primary key for the `access_token` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "access_token" DROP CONSTRAINT "access_token_user_id_fkey";

-- DropForeignKey
ALTER TABLE "password" DROP CONSTRAINT "password_user_id_fkey";

-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_user_id_fkey";

-- AlterTable
ALTER TABLE "access_token" DROP CONSTRAINT "access_token_pkey",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ALTER COLUMN "access_token_id" DROP DEFAULT,
ALTER COLUMN "access_token_id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "access_token_pkey" PRIMARY KEY ("access_token_id");
DROP SEQUENCE "access_token_access_token_id_seq";

-- AlterTable
ALTER TABLE "password" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ALTER COLUMN "password_id" DROP DEFAULT,
ALTER COLUMN "password_id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "password_pkey" PRIMARY KEY ("password_id");
DROP SEQUENCE "password_password_id_seq";

-- AlterTable
ALTER TABLE "profile" DROP CONSTRAINT "profile_pkey",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "profile_id" DROP DEFAULT,
ALTER COLUMN "profile_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "profile_pkey" PRIMARY KEY ("profile_id");
DROP SEQUENCE "profile_profile_id_seq";

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
ALTER COLUMN "user_id" DROP DEFAULT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("user_id");
DROP SEQUENCE "user_user_id_seq";

-- CreateTable
CREATE TABLE "music" (
    "music_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "album_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "music_pkey" PRIMARY KEY ("music_id")
);

-- CreateTable
CREATE TABLE "music_stream_url" (
    "music_stream_url_id" TEXT NOT NULL,
    "music_stream_url" TEXT,
    "music_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "music_stream_url_pkey" PRIMARY KEY ("music_stream_url_id")
);

-- CreateTable
CREATE TABLE "music_metadata" (
    "music_metadata_id" TEXT NOT NULL,
    "music_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "music_metadata_pkey" PRIMARY KEY ("music_metadata_id")
);

-- CreateTable
CREATE TABLE "music_on_artist" (
    "music_on_artist_id" TEXT NOT NULL,
    "music_id" TEXT NOT NULL,
    "artist_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "music_on_artist_pkey" PRIMARY KEY ("music_on_artist_id")
);

-- CreateTable
CREATE TABLE "music_on_futured_artist" (
    "music_on_futured_artist_id" TEXT NOT NULL,
    "music_id" TEXT NOT NULL,
    "futured_artist_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "music_on_futured_artist_pkey" PRIMARY KEY ("music_on_futured_artist_id")
);

-- CreateTable
CREATE TABLE "album" (
    "album_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "album_pkey" PRIMARY KEY ("album_id")
);

-- CreateTable
CREATE TABLE "album_on_artist" (
    "album_on_artist_id" TEXT NOT NULL,
    "album_id" TEXT NOT NULL,
    "artist_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "album_on_artist_pkey" PRIMARY KEY ("album_on_artist_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "music_stream_url_music_id_key" ON "music_stream_url"("music_id");

-- CreateIndex
CREATE UNIQUE INDEX "music_metadata_music_id_key" ON "music_metadata"("music_id");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "password" ADD CONSTRAINT "password_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_token" ADD CONSTRAINT "access_token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "music" ADD CONSTRAINT "music_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "album"("album_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "music_stream_url" ADD CONSTRAINT "music_stream_url_music_id_fkey" FOREIGN KEY ("music_id") REFERENCES "music"("music_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "music_metadata" ADD CONSTRAINT "music_metadata_music_id_fkey" FOREIGN KEY ("music_id") REFERENCES "music"("music_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "music_on_artist" ADD CONSTRAINT "music_on_artist_music_id_fkey" FOREIGN KEY ("music_id") REFERENCES "music"("music_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "music_on_artist" ADD CONSTRAINT "music_on_artist_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "music_on_futured_artist" ADD CONSTRAINT "music_on_futured_artist_music_id_fkey" FOREIGN KEY ("music_id") REFERENCES "music"("music_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "music_on_futured_artist" ADD CONSTRAINT "music_on_futured_artist_futured_artist_id_fkey" FOREIGN KEY ("futured_artist_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "album_on_artist" ADD CONSTRAINT "album_on_artist_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "album"("album_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "album_on_artist" ADD CONSTRAINT "album_on_artist_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
