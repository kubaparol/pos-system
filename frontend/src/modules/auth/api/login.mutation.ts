import { useMutation } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

import { accessTokenCookie } from '@/lib/cookies';
import { queryClient } from '@/lib/query-client';

import { signIn } from '@/api/api.service';
import type { SignInDto, SignInResponse } from '@/api/api.types';

import { getMeQuery } from '@/modules/users/api/me.query';
import { pathKeys } from '@/router/path-keys';

export const useLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation<AxiosResponse<SignInResponse>, Error, SignInDto>({
    mutationFn: (data: SignInDto) => signIn(data),
    onSuccess: async (response) => {
      const { token } = response.data.data;
      accessTokenCookie.set(token);
      await queryClient.fetchQuery(getMeQuery());
      navigate(pathKeys.home);
    },
  });
};
