import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { ButtonSizeEnum, ButtonVariantEnum } from './types';

type Props = {
  className?: string;
  text?: string;
  onClick?: () => void;
  isDisabled?: boolean;
  size?: ButtonSizeEnum;
  variant?: ButtonVariantEnum;
  isLoading?: boolean;
  loadingText?: string;
  isSuccessful?: boolean;
  successfulText?: string;
  successfulIcon?: JSX.Element;
  fullWith?: boolean;
  type?: 'submit' | 'reset' | 'button';
} & PropsWithChildren;

const sizeClasses = {
  large: 'px-4 py-3',
  medium: 'px-3 py-2',
  small: 'p-1',
};

const variantClasses = {
  filled: 'bg-purple-700 hover:bg-purple-600 text-white ',
  outline: 'border border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white',
  text: 'text-purple-700 hover:text-purple-500 w-auto',
};

const Button: FC<Props> = ({
  text,
  className,
  onClick,
  variant = ButtonVariantEnum.FILLED,
  size = ButtonSizeEnum.LARGE,
  isDisabled,
  isLoading,
  loadingText,
  isSuccessful,
  successfulText,
  successfulIcon,
  fullWith,
  children,
  type,
}) => (
  <button
    type={type}
    className={classNames(
      'flex items-center justify-center rounded-md text-center font-bold transition duration-300 w-32',
      sizeClasses[size],
      variantClasses[variant],
      {
        'pointer-events-none cursor-not-allowed': isLoading || isSuccessful || isDisabled,
        'w-full': fullWith,
      },
      className,
    )}
    onClick={onClick}
    disabled={isDisabled}>
    {isLoading && <>{loadingText}</>}
    {isSuccessful && (
      <>
        {successfulIcon}
        {successfulText}
      </>
    )}
    {!isLoading && !isSuccessful && (children || text)}
  </button>
);

export default Button;
