-- CreateTable
CREATE TABLE "Source" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "author" TEXT NOT NULL,
    "sourceId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Source.key_unique" ON "Source"("key");

-- AddForeignKey
ALTER TABLE "Like" ADD FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE CASCADE ON UPDATE CASCADE;
