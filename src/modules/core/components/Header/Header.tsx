'use client';
import Image from 'next/image';
import React from 'react';
import { Button, ButtonSizeEnum, ButtonVariantEnum } from '@/modules/core';
import { useAuthActions } from '@/modules/auth';
import { CaretRight } from '@phosphor-icons/react';
import { signOut } from 'firebase/auth';
import { auth } from '../../../../../firebaseConfig';
import { usePeriodActions } from '@/modules/dashboard';

const Header = () => {
  const { resetAccess } = useAuthActions();
  const { resetPeriod } = usePeriodActions();

  const handleLogOut = () => {
    resetPeriod();
    resetAccess();
    signOut(auth);
  };
  return (
    <header className='h-20 text-white p-1 border-b-2 border-purple-700 fixed w-full bg-white z-10'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='container mx-auto flex items-center'>
          {/* <Image
            src={Logo}
            width={60}
            height={50}
            alt=''
            className='text-white stroke-white fill-white'
          /> */}
          <span className='text-purple-700 font-semibold'>Smart Spender</span>
        </div>
        <Button
          text='Log out'
          size={ButtonSizeEnum.SMALL}
          variant={ButtonVariantEnum.TEXT}
          onClick={handleLogOut}
          className=''>
          <div className='flex items-center !w-24'>
            <span>Log out</span>
            <CaretRight size={20} className='fill-purple-700' weight='bold' />
          </div>
        </Button>
      </div>
    </header>
  );
};

export default Header;
