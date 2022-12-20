import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import useReserveTicket from '../../../hooks/api/useReserveTicket';
import Button from '../../Form/Button';
import { toast } from 'react-toastify';

export default function ReserveOption({ value, isRemote, includesHotel, ticketType }) {
  const { postReserveTicket } = useReserveTicket();

  async function goToReservationPage() {
    const ticketTypeId = ticketType.filter(type => (type.isRemote === isRemote && type.includesHotel === includesHotel))[0].id;

    const body = {
      ticketTypeId: ticketTypeId,
    };

    try {
      await postReserveTicket(body);
      toast('Ticket reservado com sucesso!');
    } catch (error) {
      toast('Ticket não pode ser reservado.');
    }
  };
  
  return (
    <TicketTypeModelBar>
      <StyledTypography variant="h6">
        Fechado! O total ficou em <span style={{ fontWeight: 'bold' }} >R$ {value}</span>. Agora é só confirmar:
      </StyledTypography>
      <SubmitContainer>
        <Button onClick={goToReservationPage}>
          Reservar ingresso
        </Button>
      </SubmitContainer>
    </TicketTypeModelBar>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 10px!important;
`;

const TicketTypeModelBar = styled.div`
  height: 50px;
  display: flex;
  flex-direction: column;
`;

const SubmitContainer = styled.div`
  margin-top: 10px!important;
  width: 100%!important;

  > button {
    margin-top: 0 !important;
  }
`;