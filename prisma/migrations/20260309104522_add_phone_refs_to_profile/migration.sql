-- CreateEnum
CREATE TYPE "PhoneRefs" AS ENUM ('CALL', 'WHATSAPP', 'TELEGRAM');

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "phoneRefs" "PhoneRefs"[];
