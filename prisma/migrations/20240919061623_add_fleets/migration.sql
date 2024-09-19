-- CreateTable
CREATE TABLE "Fleet" (
    "id" TEXT NOT NULL,
    "ships" INTEGER NOT NULL,
    "empireId" TEXT NOT NULL,

    CONSTRAINT "Fleet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Fleet" ADD CONSTRAINT "Fleet_empireId_fkey" FOREIGN KEY ("empireId") REFERENCES "Empire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
