import { httpClient } from "../httpClient";

export interface UpdateTransactionParams {
  id: string;
	name: string;
	bankAccountId: string;
	categoryId: string;
	value: number;
	date: string;
	type: "INCOME" | "EXPENSE";
}

export async function update({
  id,
  ...params
}: UpdateTransactionParams) {
  const { data } = await httpClient.put(`/transactions/${id}`, params);

  return data;
}
