import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useActivitiesDays() {
  const token = useToken();
  const {
    data: activitieDays,
    loading: activitieDaysLoading,
    error: activitieDaysError,
  } = useAsync(() => activitiesApi.getActivitiesDate(token));

  return {
    activitieDays,
    activitieDaysError,
    activitieDaysLoading,
  };
}
