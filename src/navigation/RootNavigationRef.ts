import {
  createNavigationContainerRef,
  CommonActions,
} from '@react-navigation/native';
import { Routes } from '../constants';

export const navigationRef = createNavigationContainerRef();

export function resetToAuth() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: Routes.login }],
      }),
    );
  }
}
