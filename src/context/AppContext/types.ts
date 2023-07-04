import { IUser } from 'types/Auth';

export interface State {
  isInitializing: boolean;
  user: IUser | null;
  redirectUrl: string;
  tokens: Tokens | null;
  screenSize: {
    tablet: boolean;
    miniTablet: boolean;
    mobile: boolean;
    desktop: boolean;
  } | null;
}

export type Action =
  | { type: 'setRedirectUrl'; payload: string }
  | { type: 'setIsInitializing'; payload: boolean }
  | { type: 'setScreenSize'; payload: State['screenSize'] }
  | { type: 'accessToken'; payload: string }
  | { type: 'saveTokens'; payload: Tokens }
  | { type: 'removeTokens' }
  | { type: 'saveCurrentUser'; payload: IUser }
  | { type: 'signout' };

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
