import { ListAddressesController } from "@/presentation/controllers/list-addresses-controller";
import { DbListAddresses } from "@/data/usecases/db-list-addresses";
import { PrismaClient } from "@prisma/client";
import { PrismaAddressRepository } from "@/infra/db/prisma/prisma-addres-repository";

export const makeListAddressesController = (): ListAddressesController => {
  const prisma = new PrismaClient();
  const addressRepository = new PrismaAddressRepository(prisma);
  const dbListAddresses = new DbListAddresses(addressRepository);
  return new ListAddressesController(dbListAddresses);
};
