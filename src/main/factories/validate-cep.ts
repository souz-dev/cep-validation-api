import { DbValidateCep } from "@/data/usecases/db-validate-cep";
import { BrasilApiValidator } from "@/infra/cep-validator/brasil-api-validator";
import { PrismaAddressRepository } from "@/infra/db/prisma/prisma-addres-repository";
import { ValidateCepController } from "@/presentation/controllers/validate-cep-controller";
import { PrismaClient } from "@prisma/client";

export const makeValidateCepController = (): ValidateCepController => {
  const prisma = new PrismaClient();
  const brasilApiValidator = new BrasilApiValidator();
  const addressRepository = new PrismaAddressRepository(prisma);
  const dbValidateCep = new DbValidateCep(
    brasilApiValidator,
    addressRepository
  );
  return new ValidateCepController(dbValidateCep, addressRepository);
};
