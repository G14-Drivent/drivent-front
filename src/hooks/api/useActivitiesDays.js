import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesDaysApi from '../../services/activitiesDaysApi';

export default function useActivitiesDays() {
  const token = useToken();
  const {
    data: activitieDays,
    loading: activitieDaysLoading,
    error: activitieDaysError,
  } = useAsync(() => activitiesDaysApi.getActivitiesDate(token));

  return {
    activitieDays,
    activitieDaysError,
    activitieDaysLoading,
  };
}
