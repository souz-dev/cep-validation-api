import { DbDeleteAddress } from "@/data/usecases/db-delete-addresses";
import { PrismaAddressRepository } from "@/infra/db/prisma/prisma-addres-repository";
import { DeleteAddressController } from "@/presentation/controllers/delete-address-controller";
import { PrismaClient } from "@prisma/client";

export const makeDeleteAddressController = (): DeleteAddressController => {
  const prisma = new PrismaClient();
  const addressRepository = new PrismaAddressRepository(prisma);
  const dbDeleteAddress = new DbDeleteAddress(addressRepository);
  return new DeleteAddressController(dbDeleteAddress);
};
