import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useActivitiesSpace() {
  const token = useToken();
  const {
    data: activitieSpace,
    loading: activitieSpaceLoading,
    error: activitieSpaceError,
  } = useAsync(() => activitiesApi.getActivitiesSpace(token));

  return {
    activitieSpace,
    activitieSpaceLoading,
    activitieSpaceError,
  };
}
