import axios from 'axios';
import { baseURL } from 'hooks/api/useHttp';
import { getFromLocalStore } from 'lib/localStore';

export async function handleRefreshToken(onError: () => void) {
  const tokens = getFromLocalStore('tokens');

  if (!tokens || !tokens?.refreshToken) return;

  try {
    const response = await axios.post(
      `${baseURL}/v1/auth/refresh`,
      {},
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.refreshToken}`,
        },
      }
    );

    return response.data;
  } catch (e) {
    onError();
  }
}
