import { UpdateAddressController } from "@/presentation/controllers/update-address-controller";
import { BrasilApiValidator } from "@/infra/cep-validator/brasil-api-validator";
import { PrismaClient } from "@prisma/client";
import { PrismaAddressRepository } from "@/infra/db/prisma/prisma-addres-repository";
import { DbUpdateAddress } from "@/data/usecases/db-update-addresses";

export const makeUpdateAddressController = (): UpdateAddressController => {
  const prisma = new PrismaClient();
  const brasilApiValidator = new BrasilApiValidator();
  const addressRepository = new PrismaAddressRepository(prisma);
  const dbUpdateAddress = new DbUpdateAddress(
    brasilApiValidator,
    addressRepository
  );
  return new UpdateAddressController(dbUpdateAddress);
};
