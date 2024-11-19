'use client';
import React, { SetStateAction, useState } from 'react';
import { Basic } from 'unsplash-js/dist/methods/users/types';
import { createApi } from 'unsplash-js';
import Image from 'next/image';

import { DialogWrapper } from '@/core/components';
import { Input } from '@/core/ui';
import { useBannerActions } from '@/core/slices';
import { useTypedSelector } from '@/store';
import { getTotalPeriodAmount } from '@/modules/dashboard/utils';

const unsplash = createApi({
  accessKey: `${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
});

type BasicType = {
  urls: {
    small: string;
    full: string;
  };
  alt_description: string;
} & Basic;

const PhotoBanner = () => {
  const [photos, setPhotos] = useState<BasicType[] | undefined>();
  const { setBannerImage } = useBannerActions();
  const { bannerImage } = useTypedSelector((state) => state.banner);
  const { period } = useTypedSelector((state) => state.period);

  const totalAmount = getTotalPeriodAmount(period);

  const searchPhotos = async (query: string) => {
    const response = await unsplash.search.getPhotos({
      query,
      perPage: 20,
      orientation: 'landscape',
    });
    const data = response.response?.results;
    setPhotos(data as SetStateAction<BasicType[] | undefined>);
  };

  const handleImage = (photo: BasicType | undefined) => {
    setBannerImage({ bannerImage: photo?.urls.full! || '' });
  };

  return (
    <div
      className='bg-purple-500 p-10 h-96 rounded flex items-end justify-end'
      style={{
        backgroundImage: `url("${bannerImage || 'https://images.unsplash.com/photo-1521117184087-0bf82f2385ab?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1OTIxNTl8MHwxfHNlYXJjaHw0fHxsaW5lc3xlbnwwfHx8fDE3MTM0NTkxNDh8MA&ixlib=rb-4.0.3&q=85'}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <DialogWrapper
        openElement={
          <span className='text-sm p-2 bg-white/50 hover:bg-black/20 hover:text-white rounded-md duration-300'>
            Change cover
          </span>
        }>
        <div className='w-full'>
          <span>Search:</span>
          <Input type='text' onChange={(e) => searchPhotos(e.target.value)} />
          <div className='h-96 overflow-y-scroll grid grid-cols-4 gap-1 mt-8'>
            {photos?.map((photo) => (
              <Image
                key={photo.id}
                src={photo.urls.small}
                alt={photo.alt_description}
                width={200}
                height={200}
                className='col-span-1 cursor-pointer hover:opacity-80 duration-200 !aspect-square  object-cover rounded'
                onClick={() => handleImage(photo)}
              />
            ))}
          </div>
        </div>
      </DialogWrapper>
    </div>
  );
};

export default PhotoBanner;
