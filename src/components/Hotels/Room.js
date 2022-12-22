import styled from 'styled-components';
import { IoPerson, IoPersonOutline } from 'react-icons/io5';
import UserContext from '../../contexts/UserContext';
import { useContext } from 'react';

export default function Room({ room: { id, name, capacity, Booking }, selected: { selectedRoom, setSelectedRoom } }) {
  const occupants = generateOccupants({ id, Booking, capacity, selectedRoom });
  const fullRoom = (capacity <= Booking.length);

  if(!fullRoom) {
    return (
      <RoomContainer selected={selectedRoom===id} onClick={() => setSelectedRoom(id)}>
        <h5>
          {name}
        </h5>
        <div>
          {occupants}
        </div>
      </RoomContainer>  
    );
  } else {
    return (    
      <RoomContainer full={true} selected={selectedRoom===id}>
        <h5>
          {name}
        </h5>
        <div>
          {occupants}
        </div>
      </RoomContainer>
    );
  }
}

function generateOccupants({ id, Booking, capacity, selectedRoom }) {
  const { userData: { user } } = useContext(UserContext);
  const fullRoom = (capacity <= Booking.length);
  const isSelected = (selectedRoom === id);

  let occupantsList = [];
  
  for(let i=0; i<capacity-Booking.length-(isSelected?1:0); i++) {
    occupantsList.push(<IoPersonOutline />);
  }
  if(isSelected) {
    occupantsList.push(<IoPerson color='#FF4791'/>);    
  }

  for(let j=0; j<Booking.length; j++) {
    if(Booking[j].userId === user.id) {
      occupantsList.push(<IoPerson color='#FF4791'/>);
    } else if(fullRoom) {
      occupantsList.push(<IoPerson color='8C8C8C'/>);
    } else {
      occupantsList.push(<IoPerson />);
    }
  }
  return occupantsList;
}

const RoomContainer = styled.div`
  width: 190px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 15px 15px 0px;
  border: 1px solid #CECECE;
  border-radius: 10px;
  padding: 10px 10px 10px 16px;
  background-color: ${props => (props.selected)? '#FFEED2;' : '#FFFFFF;'};
  ${props => (props.full)? 'background-color: #CECECE; color: #8C8C8C;' : ''};
`;
