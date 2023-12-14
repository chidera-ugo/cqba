import { Action, State } from 'context/AppContext/types';
import { deleteFromLocalStore, saveToLocalStore } from 'lib/localStore';

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setRedirectUrl': {
      return { ...state, redirectUrl: action.payload };
    }
    case 'setIsInitializing': {
      return { ...state, isInitializing: action.payload };
    }
    case 'setScreenSize': {
      return { ...state, screenSize: action.payload };
    }
    case 'update_has_set_pin':
      return { ...state, hasSetPin: action.payload };
    case 'update_has_choosen_plan':
      return { ...state, hasChoosenPlan: action.payload };
    case 'saveTokens': {
      const tokens = action.payload;

      saveToLocalStore('tokens', tokens, true);

      return { ...state, tokens };
    }
    case 'removeTokens': {
      deleteFromLocalStore('tokens');
      return { ...state, tokens: null };
    }
    case 'setCurrentUser': {
      return {
        ...state,
        user: action.payload,
        isInitializing: false,
      };
    }
    case 'signout': {
      deleteFromLocalStore('tokens', true);

      return {
        ...state,
        user: null,
        isInitializing: false,
        tokens: null,
        hasChoosenPlan: false,
        hasSetPin: false,
      };
    }
    default:
      return state;
  }
}
