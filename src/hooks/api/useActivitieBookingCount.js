import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useActivitiesBookingCount(activitieId) {
  const token = useToken();
  
  const {
    data: activitieBookingCount,
    loading: activitieBookingCountLoading,
    error: activitieBookingCountError,
    act: getActivitieBookingCount,
  } = useAsync(() => activitiesApi.getActivitiesBookingCount({ token, activitieId }));

  return {
    activitieBookingCount,
    activitieBookingCountLoading,
    activitieBookingCountError,
    getActivitieBookingCount,
  };
}
