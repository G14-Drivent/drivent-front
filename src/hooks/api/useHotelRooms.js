import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelsApi from '../../services/hotelsApi';

export default function useHotelRooms(id) {
  const token = useToken();
  const {
    data: hotelRooms,
    loading: hotelRoomsLoading,
    error: hotelRoomsError,
    act: getHotelRooms,
  } = useAsync(() => hotelsApi.getHotelRooms({ id, token }));

  return {
    hotelRooms,
    hotelRoomsLoading,
    hotelRoomsError,
    getHotelRooms
  };
}
