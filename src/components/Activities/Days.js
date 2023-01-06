import styled from 'styled-components';

export default function Days({ day, selected: { selectedDay, setSelectedDay } }) {
  const date = day?.date.toString().substr(5, 5);
  const dateMonth = date.slice(0, 2);
  const dateDay = date.slice(3, 5);
  
  return (
    <DayStyled selected={selectedDay===day?.id} onClick={() => setSelectedDay(day?.id)}>
      <h6>
        {day?.weekday}, {dateDay}/{dateMonth}
      </h6>
    </DayStyled>
  );
}

const DayStyled = styled.div`
  cursor: pointer;
  min-width: 130px;
  height: 40px;
  background-color: ${props => (props.selected)? '#FFD37D;' : '#e0e0e0;'};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  margin: 0 10px;
  padding: 0 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  h6 {
    font-size: 14px;
  }
`;
