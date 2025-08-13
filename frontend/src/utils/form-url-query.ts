import qs from 'query-string';

export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export const formUrlQuery = (props: UrlQueryParams) => {
  const { params, key, value } = props;

  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  );
};
