export interface Transaction {
  id: string;
  name: string;
	value: number;
  categoryId: string;
  bankAccountId: string;
	date: string;
	type: "INCOME" | "EXPENSE";
  category?: {
    id: string;
    name: string;
    icon: string;
  }
};
