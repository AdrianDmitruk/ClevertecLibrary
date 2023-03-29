import { TOKEN_JWT } from '../constans';
import { logout } from '../redux/auth/slice';
import { store } from '../redux/store';

export const logoutUser = () => () => {
  store.dispatch(logout());
  localStorage.removeItem(TOKEN_JWT);
};
