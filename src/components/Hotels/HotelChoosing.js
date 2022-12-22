import { Typography } from '@material-ui/core';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useHotels from '../../hooks/api/useHotels';
import Hotel from './Hotel';
import ChooseRoom from './RoomsChoosing';
import useTicket from '../../hooks/api/useTicket';

export default function ChooseHotel() {
  const { hotels, hotelsError, hotelsLoading } = useHotels();
  const [ selectedHotel, setSelectedHotel ] = useState(null);

  const { getTicket } = useTicket();
  const [ticketinfo, setTicketinfo] = useState(false);
  const [ticketpaid, setTicketpaid] = useState(false);

  useEffect(() => {
    getEnroll();
  }, []);

  async function getEnroll() {
    const ticketApi = await getTicket();
    if(ticketApi.TicketType.includesHotel === true) setTicketinfo(true);
    if(ticketApi.status === 'PAID') setTicketpaid(true);
  }

  if(hotelsLoading || hotelsError || !hotels?.length) 
    return (
      <>
        <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
        <Message>Não há hoteis disponíveis</Message> 
      </>
    );

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {(ticketinfo)?
        ((ticketpaid)?
          <>
            <Message>Primeiro escolha o hotel</Message>
            <Hotels>
              {hotels.map((hotel, index) => <Hotel hotel={hotel} selected={{ selectedHotel, setSelectedHotel }} key={index} />)}
            </Hotels>
            {(selectedHotel)? <ChooseRoom selectedHotel={selectedHotel} /> : <></>}
          </>
          : 
          <HotelTitle>
            Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem
          </HotelTitle> 
        )
        :
        (
          <HotelTitle>
            Sua modalidade de ingresso não inclui hospedagem <br/>
            Prossiga para a escolha de Atividades
          </HotelTitle> 
        )
      }
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const Message = styled.p`
  color: #8E8E8E;
  margin-bottom: 18px;
`;

const Hotels = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 52px;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const HotelTitle = styled.div`
  font-family: 'Roboto', sans-serif;
  color: #8e8e8e;
  display: flex;
  flex-direction: flex;
  justify-content: center;
  align-items:center;
  height:20%;
  width: 50%;
  margin-left:25%;
  margin-top:30%;
`;
