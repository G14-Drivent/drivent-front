import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useCreateActivitieBooking() {
  const token = useToken();

  const {
    data: activitieBooking,
    loading: createActivitieBookingLoading,
    error: createActivitieBookingError,
    act: postCreateActivitieBooking,
  } = useAsync((activitieId) => activitiesApi.postActivitieBooking({ activitieId, token }));

  return {
    activitieBooking,
    createActivitieBookingLoading,
    createActivitieBookingError,
    postCreateActivitieBooking
  };
}
