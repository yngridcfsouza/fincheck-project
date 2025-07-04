import type { BankAccount } from "../../entities/BankAccount";
import { sleep } from "../../utils/sleep";
import { httpClient } from "../httpClient";

type BankAccountsResponse = Array<BankAccount>;

export async function getAll() {
  await sleep()

  const { data } = await httpClient.get<BankAccountsResponse>("/bank-accounts");

  return data;
}
