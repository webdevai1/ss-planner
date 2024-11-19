import { PeriodType } from '../types';

export const getTotalPeriodAmount = (period: PeriodType) => {
  return period.days.reduce((total, day) => {
    const dayTotal = day.expenses.reduce((dayTotal, expense) => dayTotal + expense.price, 0);
    return +(total + dayTotal).toFixed(1);
  }, 0);
};
