import {
  badRequest,
  serverError,
  notFound,
  noContent,
} from "../helpers/http-helper";
import { DeleteAddress } from "@/domain/usecases/delete-addresses";
import { DeleteAddressController } from "./delete-address-controller";
import { AddressModel } from "@/domain/usecases/models/address";
import { mockAddressModel } from "./mock-address";

const makeDeleteAddress = (): DeleteAddress => {
  class DeleteAddressStub implements DeleteAddress {
    async delete(id: string): Promise<AddressModel> {
      return Promise.resolve(mockAddressModel());
    }
  }
  return new DeleteAddressStub();
};

interface SutTypes {
  sut: DeleteAddressController;
  deleteAddressStub: DeleteAddress;
}

const makeSut = (): SutTypes => {
  const deleteAddressStub = makeDeleteAddress();
  const sut = new DeleteAddressController(deleteAddressStub);
  return {
    sut,
    deleteAddressStub,
  };
};

describe("DeleteAddressController", () => {
  it("should return 400 if no ID is provided", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      params: {},
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new Error("Missing address id")));
  });

  it("should call DeleteAddress with correct ID", async () => {
    const { sut, deleteAddressStub } = makeSut();
    const deleteSpy = jest.spyOn(deleteAddressStub, "delete");

    const httpRequest = {
      params: { id: "valid_id" },
    };

    await sut.handle(httpRequest);
    expect(deleteSpy).toHaveBeenCalledWith("valid_id");
  });

  it("should return 404 if address is not found", async () => {
    const { sut, deleteAddressStub } = makeSut();
    jest
      .spyOn(deleteAddressStub, "delete")
      .mockRejectedValueOnce(new Error("Address not found"));

    const httpRequest = {
      params: { id: "invalid_id" },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(notFound(new Error("Address not found")));
  });

  it("should return 500 if DeleteAddress throws", async () => {
    const { sut, deleteAddressStub } = makeSut();
    jest.spyOn(deleteAddressStub, "delete").mockRejectedValueOnce(new Error());

    const httpRequest = {
      params: { id: "any_id" },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(
      serverError(new Error("Internal server error"))
    );
  });

  it("should return 204 on success", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      params: { id: "valid_id" },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(noContent());
  });
});
