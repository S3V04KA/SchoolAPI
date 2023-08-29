-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'TestName',
    "lastName" TEXT NOT NULL DEFAULT 'TestLastName',
    "patronymic" TEXT NOT NULL DEFAULT 'TestPatronymic',
    "age" INTEGER NOT NULL DEFAULT 6,
    "phoneNumber" TEXT NOT NULL DEFAULT '89005555555',
    "email" TEXT NOT NULL DEFAULT 'email@example.com',
    "dateOfCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "avatarUrl" TEXT NOT NULL DEFAULT 'https://cdn-icons-png.flaticon.com/512/145/145968.png',
    "userRate" DOUBLE PRECISION NOT NULL DEFAULT 3,
    "password" TEXT NOT NULL DEFAULT '1234',
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "login" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL DEFAULT 1,
    "letter" TEXT NOT NULL DEFAULT 'А',
    "classRate" DOUBLE PRECISION NOT NULL DEFAULT 3,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Complex" (
    "id" SERIAL NOT NULL,
    "dateOfCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Complex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "isComplex" BOOLEAN NOT NULL,
    "hidden" BOOLEAN NOT NULL,
    "calories" INTEGER NOT NULL,
    "fats" INTEGER NOT NULL,
    "carbohydrates" INTEGER NOT NULL,
    "proteins" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComplexModel" (
    "id" SERIAL NOT NULL,
    "hide" BOOLEAN NOT NULL,

    CONSTRAINT "ComplexModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ComplexToComplexModel" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ComplexModelToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_role_id_key" ON "Role"("role", "id");

-- CreateIndex
CREATE UNIQUE INDEX "_ComplexToComplexModel_AB_unique" ON "_ComplexToComplexModel"("A", "B");

-- CreateIndex
CREATE INDEX "_ComplexToComplexModel_B_index" ON "_ComplexToComplexModel"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToProduct_AB_unique" ON "_CategoryToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToProduct_B_index" ON "_CategoryToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ComplexModelToProduct_AB_unique" ON "_ComplexModelToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_ComplexModelToProduct_B_index" ON "_ComplexModelToProduct"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_roleId_fkey" FOREIGN KEY ("role", "roleId") REFERENCES "Role"("role", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Complex" ADD CONSTRAINT "Complex_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ComplexToComplexModel" ADD CONSTRAINT "_ComplexToComplexModel_A_fkey" FOREIGN KEY ("A") REFERENCES "Complex"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ComplexToComplexModel" ADD CONSTRAINT "_ComplexToComplexModel_B_fkey" FOREIGN KEY ("B") REFERENCES "ComplexModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ComplexModelToProduct" ADD CONSTRAINT "_ComplexModelToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "ComplexModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ComplexModelToProduct" ADD CONSTRAINT "_ComplexModelToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
