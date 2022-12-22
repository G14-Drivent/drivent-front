import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function usePostBooking(roomId) {
  const token = useToken();

  const {
    loading: postBookingLoading,
    error: postBookingError,
    act: postBooking
  } = useAsync(() => bookingApi.post({ roomId }, token));

  return {
    postBookingLoading,
    postBookingError,
    postBooking,
  };
}
