'use client';
import { Fragment, useEffect } from 'react';

import { DayCard } from '@/dashboard/components';
import { useTypedSelector } from '@/store';
import { usePeriodActions } from '@/dashboard/slices';
import { getTotalPeriodAmount } from '@/dashboard/utils';
import { useAuthUser } from '@/modules/auth';
import { useFetchPeriodsForUserQuery, useUpdatePeriodDocumentMutation } from '@/dashboard/api';

const DayCardsContainer = () => {
  const { user } = useAuthUser();

  const { period } = useTypedSelector((state) => state.period);
  const { accessToken } = useTypedSelector((state) => state.auth);
  const { addPeriodExpense, updateExpenses, setPeriod } = usePeriodActions();

  const { data } = useFetchPeriodsForUserQuery(user?.uid);
  const [updatePeriodMutation] = useUpdatePeriodDocumentMutation();

  const onAddExpense = (dayIndex: number, newExpense: { price: number; category: string }) => {
    addPeriodExpense({ newExpense: { ...newExpense, dayIndex } });
    updatePeriodMutation({ documentId: data?.docId || '', newData: period });
  };

  const onUpdateExpenses = (
    dayIndex: number,
    expenseIndex: number,
    value: { price: number; category: string },
  ) => {
    updateExpenses({ expense: { ...value, dayIndex, expenseIndex } });
    updatePeriodMutation({ documentId: data?.docId || '', newData: period });
  };

  const totalAmount = getTotalPeriodAmount(period);

  useEffect(() => {
    if (data?.period && !period.amountOnPeriod && accessToken) {
      setPeriod({ period: data?.period });
    }
  }, [accessToken, data, period.amountOnPeriod, setPeriod]);

  return (
    <div className='grid grid-cols-5 gap-3 items-start'>
      <div className='text-xl text-purple-950 font-semibold'>Total - {totalAmount}</div>
      {period?.days?.map((item, index) => {
        if ((index + 1) % 6 === 0 || index === 0) {
          return (
            <Fragment key={`${index}-header`}>
              <div className='col-span-5 w-full bg-purple-50 p-1 rounded'>
                Cash on the period: {item.amountPerDay * 5}{' '}
              </div>
              <DayCard
                key={item.date}
                className='col-span-1'
                day={item}
                dayIndex={index}
                onAddExpense={onAddExpense}
                updateExpenses={onUpdateExpenses}
              />
            </Fragment>
          );
        }
        return (
          <DayCard
            key={item.date}
            className='col-span-1'
            day={item}
            dayIndex={index}
            onAddExpense={onAddExpense}
            updateExpenses={onUpdateExpenses}
          />
        );
      })}
    </div>
  );
};

export default DayCardsContainer;
