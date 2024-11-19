'use client';

import { Header } from '@/modules/core';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col justify-between'>
      <Header />
      <div className='flex justify-center min-h-screen mt-20'>
        <div className='max-w-[1400px] w-full'>{children}</div>
      </div>
      <div className='w-full h-24 flex justify-center items-center border-t-2 border-purple-700'>
        Smart Spender - 2024
      </div>
    </div>
  );
};

export default DashboardLayout;
