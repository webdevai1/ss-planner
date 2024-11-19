import React from 'react';
import classNames from 'classnames';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  placeholder?: string;
}

const InputEmpty: React.FC<InputProps> = ({
  error,
  startIcon,
  placeholder = 'Type here...',
  endIcon,
  className,
  ...rest
}) => {
  return (
    <div className='flex items-center'>
      {startIcon && <div className='mr-2'>{startIcon}</div>}
      <input
        placeholder={placeholder}
        className={classNames(
          ' outline-none px-2 py-1',
          {
            'border-red-500': error,
          },
          className,
        )}
        {...rest}
      />
      {endIcon && <div className='ml-2'>{endIcon}</div>}
    </div>
  );
};

export default InputEmpty;
