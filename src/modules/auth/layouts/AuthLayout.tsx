'use client';

import { bannerSignUp } from '@/modules/core/assets/img';
import Image from 'next/image';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='grid grid-cols-5 h-full'>
      <div className='col-span-3'>
        <Image
          alt='Hero Picture'
          src={bannerSignUp}
          className='size-full max-h-screen object-cover'
        />
      </div>
      <div className='col-span-2 h-full'>
        <div className='h-full'>{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
