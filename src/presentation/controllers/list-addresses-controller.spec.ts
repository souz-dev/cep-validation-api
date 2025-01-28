import { ListAddressesController } from "@/presentation/controllers/list-addresses-controller";
import { ListAddresses } from "@/domain/usecases/list-addresses";

import { ok, serverError } from "@/presentation/helpers/http-helper";
import { mockAddressModel } from "./mock-address";

const makeSut = () => {
  const listAddressesStub = {
    list: jest.fn().mockResolvedValue([mockAddressModel()]),
  };

  const sut = new ListAddressesController(listAddressesStub);
  return { sut, listAddressesStub };
};

describe("ListAddresses Controller", () => {
  test("Should return 500 if ListAddresses throws", async () => {
    const { sut, listAddressesStub } = makeSut();
    jest.spyOn(listAddressesStub, "list").mockRejectedValueOnce(new Error());

    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(
      serverError(new Error("Internal server error"))
    );
  });

  test("Should return 200 on success", async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(ok([mockAddressModel()]));
  });
});
