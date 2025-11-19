-- CreateTable
CREATE TABLE "Users" (
    "id" BIGSERIAL NOT NULL,
    "publicId" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "userName" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_publicId_key" ON "Users"("publicId");
