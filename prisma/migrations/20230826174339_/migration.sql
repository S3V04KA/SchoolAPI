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
    "orders" INTEGER[] DEFAULT ARRAY[0, 0, 0, 0, 0]::INTEGER[],
    "dateOfCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Complex_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_role_id_key" ON "Role"("role", "id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_roleId_fkey" FOREIGN KEY ("role", "roleId") REFERENCES "Role"("role", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Complex" ADD CONSTRAINT "Complex_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
