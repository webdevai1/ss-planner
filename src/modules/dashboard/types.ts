export type Expense = {
  price: number;
  category: string;
};

export type Day = {
  date: string;
  day: string;
  amountPerDay: number;
  expenses: Expense[] | [];
};

export type PeriodType = {
  id: string;
  period?: string | null;
  amountOnPeriod?: number;
  dateStart?: string;
  dateEnd?: string;
  days: Day[];
};
