import { AddressModel } from "@/domain/usecases/models/addres";

export const mockAddressModel = (): AddressModel => ({
  id: "any_id",
  name: "John Doe",
  email: "john@example.com",
  cep: "88040600",
  state: "SC",
  city: "Florianópolis",
  street: "Rua Example",
  district: "Centro",
  createdAt: new Date(),
  updatedAt: new Date(),
});
