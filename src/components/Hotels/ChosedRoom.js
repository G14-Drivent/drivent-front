import styled from 'styled-components';
import { useState, useEffect } from 'react';
import useHotelRooms from '../../hooks/api/useHotelRooms';

export default function HotelCard({ bookinginfo }) {
  const id = bookinginfo.Room.hotelId;
  const { getHotelRooms } = useHotelRooms(id);
  const [Hotel, SetHotel] = useState();
  const [capacityString, SetcapacityStrign] = useState('');

  useEffect(() => {
    GetHotelInformation();
  }, [bookinginfo]);

  async function GetHotelInformation() {
    const HotelBooked = await getHotelRooms();
    SetHotel(HotelBooked);
    if(bookinginfo.Room.capacity === 1) {
      SetcapacityStrign('Single');
    }
    if(bookinginfo.Room.capacity === 2) {
      SetcapacityStrign('Double');
    }
    if(bookinginfo.Room.capacity === 3) {
      SetcapacityStrign('Tri');
    }
  }
  
  return(
    <>
      <HotelContainer >
        <img src={Hotel?.image} alt='hotel' />
        <h4>{Hotel?.name}</h4> 
        <h5>Quarto Reservado</h5>
        <h5 className='info'>{bookinginfo.Room.name} ({capacityString}) </h5>
        <h5>Pessoas no seu Quarto</h5>
        {(bookinginfo.occupants > 1)? 
          <h5 className='info'>Você e mais {bookinginfo.occupants - 1}</h5> : 
          <h5 className='info'>Você</h5>}

      </HotelContainer>
    </>
  );
}

const HotelContainer = styled.div`
  width: 196px;
  height: 264px;
  background-color: ${props => (props.selected)? '#FFEED2;' : '#EBEBEB;'};
  border-radius: 10px;
  margin-right: 19px;
  padding: 16px 14px 16px 14px;
  color:#3b3b3b;
  h4 {
    margin-top: 10px;
    margin-bottom: 15px;
    color: #343434;
    font-size: 20px;
  }
  h5 {
    margin-top: 5px;
    font-size: 12px;
    font-weight: bold;
  }
  img {
    width: 168px;
    height: 109px;
    border-radius: 5px;
  }
  .info{
    font-weight: 400;
  }
  background-color:#ffeed2;
`;
