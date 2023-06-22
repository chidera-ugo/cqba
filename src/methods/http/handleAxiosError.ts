import { Tokens } from 'context/AppContext';
import { isHtmlResponse } from 'methods/http/isHtmlResponse';
import { handleRefreshToken } from 'methods/http/handleRefreshToken';

export async function handleAxiosError(
  e: any,
  onSuccess: (tokens: Tokens) => void,
  onError: (message?: string) => void
) {
  const data = e?.response?.data;

  const statusCode = data?.statusCode;

  if (isHtmlResponse(data)) return onError();

  if (statusCode === 401 && !e.config.url.includes('/v1/auth/')) {
    const previousRequest = e.config;

    if (!previousRequest.sent) {
      previousRequest.sent = true;

      const data = await handleRefreshToken(onError);

      if (!data.access_token || !data.refresh_token) return;

      onSuccess({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      });

      previousRequest.headers['Authorization'] = `Bearer ${data.access_token}`;

      return previousRequest;
    } else {
      onError(e?.response?.data?.message);
      return;
    }
  }

  return Promise.reject(e);
}
