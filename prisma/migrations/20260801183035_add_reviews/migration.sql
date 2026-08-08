-- CreateEnum
CREATE TYPE "ReviewTarget" AS ENUM ('DISH', 'ROOM', 'EXPERIENCE');

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "target" "ReviewTarget" NOT NULL,
    "item_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reviews_target_item_id_user_id_key" ON "reviews"("target", "item_id", "user_id");

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
