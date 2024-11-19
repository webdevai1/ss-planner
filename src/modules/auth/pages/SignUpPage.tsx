import { Button, ButtonSizeEnum, ButtonVariantEnum, Input } from '@/modules/core';
import { useForm } from 'react-hook-form';
import { useAuthActions } from '../slices';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../firebaseConfig';

type SignUpFormType = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpPage = () => {
  const router = useRouter();
  const { grantAccess } = useAuthActions();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFormType>();

  const onSubmit = ({ email, password, confirmPassword }: SignUpFormType) => {
    if (password !== confirmPassword) {
      return setError('confirmPassword', { message: 'Passwords do not match' });
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        user.getIdTokenResult().then((data) => {
          const expiresIn = data.claims.exp ? +data.claims.exp : 0;
          grantAccess({
            accessToken: data.token,
            expiresIn: expiresIn,
            refreshToken: '',
          });
        });
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        console.log('%c jordan errorCode', 'color: lime;', error);
      });
  };

  const handleSignIn = () => {
    router.push('sign-in');
  };

  return (
    <div className='flex justify-center flex-col items-center h-full'>
      <span className='text-3xl font-medium mt-14'>Hi, let&apos;s sign Up</span>
      <form className='flex flex-col w-full gap-6 p-8' onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder='Email'
          {...register('email', {
            required: 'Email is Required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: '',
            },
          })}
          error={errors.email?.message}
        />
        <Input
          type='password'
          placeholder='Password'
          {...register('password', {
            required: 'Password is Required',
          })}
          error={errors.password?.message}
        />
        <Input
          type='password'
          placeholder='Confirm Password'
          {...register('confirmPassword', { required: 'Confirm Password is Required' })}
          error={errors.confirmPassword?.message}
        />
        <span className='flex text-sm items-center -mb-4'>
          Already have an account?
          <Button
            text='Sign In'
            size={ButtonSizeEnum.SMALL}
            variant={ButtonVariantEnum.TEXT}
            className='p-0 w-14'
            type='button'
            onClick={handleSignIn}
          />
        </span>
        <Button type='submit' text='Sign up' fullWith />
      </form>
    </div>
  );
};

export default SignUpPage;
