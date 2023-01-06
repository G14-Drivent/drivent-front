import useAsync from '../useAsync';
import useToken from '../useToken';
import * as bookingApi from '../../services/bookingApi';

export function useGetBooking() {
  const token = useToken();
  const {
    data: booking,
    loading: bookingsLoading,
    error: bookingError,
    act: getBookings
  } = useAsync(() => bookingApi.getBookings( token ));

  return {
    booking,
    getBookings,
    bookingsLoading,
    bookingError,
  };
}

export function usePostBooking() {
  const token = useToken();

  const {
    loading: postBookingLoading,
    error: postBookingError,
    act: postBooking
  } = useAsync((roomId) => bookingApi.postBooking({ roomId }, token));

  return {
    postBookingLoading,
    postBookingError,
    postBooking,
  };
}

export function useUpdateBooking() {
  const token = useToken();

  const {
    loading: updateBookingLoading,
    error: updateBookingError,
    act: updateBooking
  } = useAsync((bookingId, roomId) => bookingApi.updateBooking(bookingId, { roomId }, token));

  return {
    updateBookingLoading,
    updateBookingError,
    updateBooking,
  };
}
