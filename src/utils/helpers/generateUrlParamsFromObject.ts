export const generateUrlParamsFromObject = ({
  data,
  acceptedPathParams,
  isNotFirst,
}: {
  data: any;
  acceptedPathParams?: string[];
  isNotFirst?: boolean;
}) => {
  if (acceptedPathParams?.length) {
    const params = [];

    for (const i of acceptedPathParams) {
      params.push(data[i]);
    }

    return params.filter((i) => !!i).join('/');
  }

  let params = '';

  if (!data) return params;

  Object.keys(data).forEach(function (key) {
    return (params += key + '=' + data[key] + '&');
  });
  params = params.substring(0, params?.length - 1);
  return `${isNotFirst ? '' : '?'}${params}`;
};
