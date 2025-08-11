import { useMutation } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { accessTokenCookie } from '@/lib/cookies';

import { signIn } from '@/api/api.service';
import type { SignInDto, SignInResponse } from '@/api/api.types';

export const useLoginMutation = () => {
  return useMutation<AxiosResponse<SignInResponse>, Error, SignInDto>({
    mutationFn: (data: SignInDto) => signIn(data),
    onSuccess: (response) => {
      const { token } = response.data.data;
      accessTokenCookie.set(token);
    },
  });
};
