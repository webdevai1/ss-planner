'use client';
import { Button, ButtonVariantEnum, InputEmpty } from '@/modules/core';
import classNames from 'classnames';
import { Day, Expense } from '../../types';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { omHappy, omSad } from '@/modules/core/assets/img';
import Image from 'next/image';

type DayCardProps = {
  className?: string;
  day: Day;
  onAddExpense: (dayIndex: number, newExpense: Expense) => void;
  dayIndex: number;
  updateExpenses: (
    dayIndex: number,
    expenseIndex: number,
    value: {
      price: number;
      category: string;
    },
  ) => void;
};

const DayCard = ({ className, day, onAddExpense, dayIndex, updateExpenses }: DayCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newExpense, setNewExpense] = useState<{ price: number; category: string }>({
    price: 0,
    category: '',
  });

  const {
    setValue,
    getValues,
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const handleAddExpense = () => {
    onAddExpense(dayIndex, newExpense);
    setNewExpense({ price: 0, category: '' });
  };

  const totalAmount = day.expenses.reduce((total, expense) => total + expense.price, 0);

  return (
    <div className={classNames('w-full border-2 border-purple-50 rounded-md', className)}>
      <span className='flex justify-center items-center p-2 font-semibold text-sm bg-purple-50/50 text-purple-950 uppercase'>
        {`${day.date} - ${day.day} - ${day.amountPerDay}`}
      </span>
      {!day.expenses.length && (
        <div className='flex justify-center items-center h-12'>
          <span className='font-semibold text-xs text-purple-950'>No costs today</span>
        </div>
      )}
      {day.expenses.map(({ price, category }, index) => {
        const inputNamePrice = `price-${dayIndex}-${index}`;
        const inputNameCategory = `category-${dayIndex}-${index}`;

        return (
          <div
            key={`${price}-${category}-${index}`}
            className='items-center border-t border-purple-50  grid grid-cols-6'>
            <div className='col-span-2 border-r border-purple-50 py-2 px-1'>
              <InputEmpty
                value={isEditing ? watch(inputNamePrice) : watch(inputNamePrice) || price}
                className='w-full'
                placeholder='Sum'
                type='number'
                {...register(inputNamePrice, { required: true, value: price })}
                onBlur={() => {
                  const values = getValues();
                  updateExpenses(dayIndex, index, { price: +values[inputNamePrice], category });
                  setIsEditing(false);
                  reset();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const values = getValues();
                    updateExpenses(dayIndex, index, { price: +values[inputNamePrice], category });
                    setIsEditing(false);
                    reset();
                  }
                }}
                onChange={(e) => {
                  const { value } = e.target as HTMLInputElement;
                  setValue(inputNamePrice, value);
                  setIsEditing(true);
                }}
              />
            </div>
            <div className='col-span-4  py-2 px-1'>
              <InputEmpty
                value={isEditing ? watch(inputNameCategory) : watch(inputNameCategory) || category}
                className='w-full'
                placeholder='Category'
                {...register(inputNameCategory, { required: true, value: category })}
                onBlur={() => {
                  const values = getValues();
                  updateExpenses(dayIndex, index, { price, category: values[inputNameCategory] });
                  setIsEditing(false);
                  reset();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const values = getValues();
                    updateExpenses(dayIndex, index, { price, category: values[inputNameCategory] });
                    setIsEditing(false);
                    reset();
                  }
                }}
                onChange={(e) => {
                  const { value } = e.target as HTMLInputElement;
                  setValue(inputNameCategory, value);
                  setIsEditing(true);
                }}
              />
            </div>
          </div>
        );
      })}

      {!!totalAmount && (
        <div className='flex justify-center items-center h-12 border-t border-purple-50 gap-2'>
          <span
            className={classNames('font-semibold text-base text-purple-950', {
              'text-red-500': totalAmount > day.amountPerDay,
              'text-green-600': totalAmount < day.amountPerDay,
            })}>
            {totalAmount.toFixed(2)}
          </span>
          {totalAmount < day.amountPerDay ? (
            <Image src={omHappy} alt='' width={30} />
          ) : (
            <Image src={omSad} alt='' width={30} />
          )}
        </div>
      )}

      <div className='border-t border-purple-50'>
        <Button
          text='Add line +'
          variant={ButtonVariantEnum.TEXT}
          className='!w-full hover:bg-purple-50 rounded-none rounded-b text-xs disabled:bg-slate-100'
          type='button'
          onClick={handleAddExpense}
          isDisabled={day.expenses.some(
            (item, index) => index === day.expenses.length - 1 && item.price === 0,
          )}
        />
      </div>
    </div>
  );
};

export default DayCard;
