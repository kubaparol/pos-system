import { useQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { accessTokenCookie } from '@/lib/cookies';

import { me } from '@/api/api.service';
import type { UserResponse } from '@/api/api.types';

export const ME_QUERY_KEY = 'logged-user-data';

export const getMeQuery = () => ({
  queryKey: [ME_QUERY_KEY] as const,
  queryFn: () => me(),
});

export const useMeQuery = () => {
  const hasToken = !!accessTokenCookie.get();

  return useQuery<AxiosResponse<UserResponse>, Error>({
    ...getMeQuery(),
    enabled: hasToken,
  });
};
