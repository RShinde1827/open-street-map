import { ActionReducer, MetaReducer } from '@ngrx/store';
import { logout } from './open-street-map.action';

export function clearState(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {

    if (action.type === logout.type) {
      state = undefined;
    }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer[] = [clearState];