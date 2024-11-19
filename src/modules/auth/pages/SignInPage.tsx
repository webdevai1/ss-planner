import { Button, ButtonSizeEnum, ButtonVariantEnum, Input } from '@/modules/core';
import { useForm } from 'react-hook-form';
import { useAuthActions } from '../slices';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../firebaseConfig';

type SignInFormType = {
  email: string;
  password: string;
};

const SignInPage = () => {
  const router = useRouter();
  const { grantAccess } = useAuthActions();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormType>();

  const onSubmit = ({ email, password }: SignInFormType) => {
    signInWithEmailAndPassword(auth, email, password)
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

  const handleSignUp = () => {
    router.push('sign-up');
  };

  return (
    <div className='flex justify-center flex-col items-center h-full'>
      <span className='text-3xl font-medium mt-14'>Hi, let&apos;s sign In</span>
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
          error={`${errors.email?.message || ''}`}
        />
        <Input
          type='password'
          placeholder='Password'
          {...register('password', {
            required: 'Password is Required',
          })}
          error={`${errors.password?.message || ''}`}
        />
        <span className='flex text-sm items-center -mb-4'>
          Don`t have an account?
          <Button
            text='Sign up'
            size={ButtonSizeEnum.SMALL}
            variant={ButtonVariantEnum.TEXT}
            className='p-0 w-12'
            type='button'
            onClick={handleSignUp}
          />
        </span>
        <Button type='submit' text='Sign in' fullWith />
      </form>
    </div>
  );
};

export default SignInPage;
