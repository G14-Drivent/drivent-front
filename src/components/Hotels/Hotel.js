import styled from 'styled-components';
import useHotelRooms from '../../hooks/api/useHotelRooms';

export default function Hotel({ hotel: { id, name, image }, selected: { selectedHotel, setSelectedHotel } }) {
  const { hotelRooms, hotelRoomsError, hotelRoomsLoading } = useHotelRooms(id);
  let roomtypes = '';
  let vacancy = 0;

  if(!hotelRoomsError && !hotelRoomsLoading ) {
    roomtypes = roomTypesText(hotelRooms.roomTypes);
    vacancy = hotelRooms.vacancy;
  }

  return (
    <>
      <HotelContainer selected={selectedHotel===id} onClick={() => setSelectedHotel(id)}>
        <img src={image} alt='' />
        <h4>{name}</h4>
        <h5>Tipos de acomodação</h5>
        <h5>{roomtypes}</h5>
        <SmallJump/>
        <h5>Vagas disponíveis</h5>
        <h5>{vacancy}</h5>
      </HotelContainer>
    </>
  );
}

function roomTypesText({ single, double, triple }) {
  let list = [];
  let text = 'Nenhum';

  if(single) list.push('Single');
  if(double) list.push('Double');
  if(triple) list.push('Triple');

  if(list.length === 1) {
    text = list[0];
  } else if(list.length === 2) {
    text = list.join(' e ');
  } else if (list.length === 3) {
    text = `${list[0]}, ${list[1]} e ${list[2]}`;
  }
  return text;
}

const HotelContainer = styled.div`
  width: 196px;
  height: 264px;
  background-color: ${props => (props.selected)? '#FFEED2;' : '#EBEBEB;'};
  border-radius: 10px;
  margin-right: 19px;
  padding: 16px 14px 16px 14px;
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
`;

const SmallJump = styled.div`
  margin-top: 15px;
`;
