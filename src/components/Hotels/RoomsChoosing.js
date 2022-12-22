import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useHotelRooms from '../../hooks/api/useHotelRooms';
import usePostBooking from '../../hooks/api/usePostBooking';
import Room from './Room';

export default function ChooseRoom({ selectedHotel }) {
  const [ selectedRoom, setSelectedRoom ] = useState(null);

  const { hotelRooms, hotelRoomsError, hotelRoomsLoading, getHotelRooms } = useHotelRooms(selectedHotel);
  const { postBooking } = usePostBooking(selectedRoom);

  useEffect(() => {
    getHotelRooms();
  }, [selectedHotel]);
 
  let rooms = [];
  if(!hotelRoomsError && !hotelRoomsLoading ) {
    rooms = hotelRooms.Rooms;
  }

  function confirmRoom() {
    postBooking();
    setSelectedRoom(null);
  }

  return (
    <>
      <Message>Ótima pedida! Agora escolha seu quarto:</Message>
      <Rooms>
        {rooms.map((room, index) => <Room room={room} selected={{ selectedRoom, setSelectedRoom }} key={index}/>)}
      </Rooms>
      {(selectedRoom)? <BookRoomButton onClick={() => confirmRoom()}>RESERVAR QUARTO</BookRoomButton> : <></>}
    </>
  );
}

const Message = styled.p`
  color: #8E8E8E;
  margin-bottom: 32px;
`;

const Rooms = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const BookRoomButton = styled.button`
  width: 182px;
  height: 37px;
  background-color: #E0E0E0;
  border: transparent;
  border-radius: 4px;
  margin: 30px 0px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
`;
