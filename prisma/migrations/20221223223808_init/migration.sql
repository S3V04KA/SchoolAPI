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
    "classId" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL DEFAULT 1,
    "letter" TEXT NOT NULL DEFAULT 'А',
    "classRate" DOUBLE PRECISION NOT NULL DEFAULT 3,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
