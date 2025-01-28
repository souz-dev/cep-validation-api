import { AddressModel } from "@/domain/usecases/models/address";

export const mockAddressModel = (): AddressModel => ({
  id: "any_id",
  name: "John Doe",
  email: "john@example.com",
  cep: "88040600",
  state: "SC",
  city: "Florianópolis",
  street: "Rua Example",
  district: "Centro",
  createdAt: new Date("2025-01-27T23:08:10.216Z"),
  updatedAt: new Date("2025-01-27T23:08:10.216Z"),
});
