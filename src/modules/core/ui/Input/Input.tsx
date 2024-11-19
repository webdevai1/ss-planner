import React, { InputHTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';

type InputProps = {
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  placeholder?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { error, startIcon, placeholder = 'Type here...', endIcon, className, ...props },
  ref,
) => {
  return (
    <div className='relative'>
      <div
        className={classNames('flex items-center border rounded-md w-full border-purple-700', {
          'border-red-600': error,
        })}>
        {startIcon && <div className='mr-2'>{startIcon}</div>}
        <input
          ref={ref}
          placeholder={placeholder}
          className={classNames(
            'flex-1 outline-none px-4 py-3 rounded-md disabled:bg-disabled-100',
            {
              'border-red-500': error,
            },
            className,
          )}
          {...props}
        />
        {endIcon && <div className='ml-2'>{endIcon}</div>}
      </div>
      {error && <span className='absolute top-full text-red-500 mt-1 text-xs'>{error}</span>}
    </div>
  );
};

export default forwardRef(Input);
