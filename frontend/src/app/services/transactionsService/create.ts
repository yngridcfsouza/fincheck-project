import { httpClient } from "../httpClient";

export interface NewTransactionParams {
	name: string;
	bankAccountId: string;
	categoryId: string;
	value: number;
	date: string;
	type: "INCOME" | "EXPENSE";
}

export async function create(params: NewTransactionParams) {
  const { data } = await httpClient.post("/transactions", params);

  return data;
}
