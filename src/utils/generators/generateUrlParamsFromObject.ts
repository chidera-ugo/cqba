interface Args {
  data: any;
  acceptedPathParams?: string[];
  doesNotContainFirstQueryParam?: boolean;
}

export const generateUrlParamsFromObject = ({
  data,
  acceptedPathParams,
  doesNotContainFirstQueryParam,
}: Args) => {
  if (acceptedPathParams?.length) {
    const params = [];

    for (const item of acceptedPathParams) {
      params.push(data[item]);
    }

    return params.filter((i) => !!i).join('/');
  }

  let params = '';

  if (!data) return params;

  Object.keys(data).forEach(function (key) {
    const val = data[key];

    if (
      typeof val === 'undefined' ||
      val === null ||
      val === '' ||
      (typeof val === 'string' && !val.length)
    )
      return '';

    return (params += key + '=' + val + '&');
  });

  params = params.substring(0, params?.length - 1);

  return `${doesNotContainFirstQueryParam ? '' : '?'}${params}`;
};
