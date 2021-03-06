import { EARNED_FETCH_EARNED_BEGIN, EARNED_FETCH_EARNED_DONE, EARNED_RESET } from '../constants';
import { config } from '../../../config/config';
import { potsByNetwork } from '../../../config/vault';

const initialEarned = (() => {
  const earned = [];
  for (let net in config) {
    for (const pot of potsByNetwork[net]) {
      earned[pot.id] = {};
      if ('bonuses' in pot && pot.bonuses.length) {
        for (const bonus of pot.bonuses) {
          earned[pot.id][bonus.id] = '0';
        }
      }
    }
  }

  return earned;
})();

const initialState = {
  earned: initialEarned,
  lastUpdated: 0,
  isEarnedLoading: false,
  isEarnedFirstTime: true,
};

const earnedReducer = (state = initialState, action) => {
  switch (action.type) {
    case EARNED_FETCH_EARNED_BEGIN:
      return {
        ...state,
        isBalancesLoading: state.isEarnedFirstTime,
      };
    case EARNED_FETCH_EARNED_DONE:
      return {
        ...state,
        earned: action.payload.earned,
        lastUpdated: action.payload.lastUpdated,
        isEarnedLoading: false,
        isEarnedFirstTime: false,
      };
    case EARNED_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export default earnedReducer;
