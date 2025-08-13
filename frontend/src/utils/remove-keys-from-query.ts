import qs from 'query-string';

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export const removeKeysFromQuery = (props: RemoveUrlQueryParams) => {
  const { params, keysToRemove } = props;

  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  );
};
