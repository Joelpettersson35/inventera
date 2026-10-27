-- CreateTable
CREATE TABLE "Shelf" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Shelf_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Box" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shelfId" TEXT NOT NULL,

    CONSTRAINT "Box_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoxArticle" (
    "boxId" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "BoxArticle_pkey" PRIMARY KEY ("boxId","articleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shelf_name_key" ON "Shelf"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Box_shelfId_name_key" ON "Box"("shelfId", "name");

-- CreateIndex
CREATE INDEX "BoxArticle_articleId_idx" ON "BoxArticle"("articleId");

-- AddForeignKey
ALTER TABLE "Box" ADD CONSTRAINT "Box_shelfId_fkey" FOREIGN KEY ("shelfId") REFERENCES "Shelf"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoxArticle" ADD CONSTRAINT "BoxArticle_boxId_fkey" FOREIGN KEY ("boxId") REFERENCES "Box"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoxArticle" ADD CONSTRAINT "BoxArticle_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
