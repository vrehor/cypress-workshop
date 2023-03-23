/* TODO: decide whether we want to include Firebase auth as of default
import 'firebase/auth';
import firebase from './firebase';
export default firebase.auth();
*/

import { LOCAL_STORAGE_AUTH_KEY } from '../constants';

type CurrentUser = {
  getIdToken: () => Promise<string | undefined>;
};

type Auth = {
  currentUser: CurrentUser | undefined;
};

export default {
  currentUser: {
    getIdToken: () =>
      Promise.resolve(sessionStorage.getItem(LOCAL_STORAGE_AUTH_KEY)),
  },
} as Auth;
