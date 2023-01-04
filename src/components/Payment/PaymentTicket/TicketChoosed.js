import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export default function TicketChoosed( { ticket, ticketError, ticketLoading }) {
  if(ticketError || ticketLoading) {
    return (
      <StyledTypography variant="h6">
        Ingresso escolhido
      </StyledTypography>
    );
  }

  return (
    <>
      <StyledTypography variant="h6">
        Ingresso escolhido
      </StyledTypography>

      <TicketByUser>
        <OptionsBox>
          <h1> {ticket?.TicketType.name} </h1>
          <h4>R$ {ticket?.TicketType.price} </h4>
        </OptionsBox>     
      </TicketByUser>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 10px!important;
  color:#8E8E8E;
`;

const TicketByUser = styled.div`
margin-bottom:30px;
height: 108px;
`;

const OptionsBox = styled.div`
 width: 290px;
 height: 108px;
 border: 1px solid #cecece;
 border-radius: 20px;
 display: flex;
 justify-content: center;
 align-items: center;
 flex-direction: column;
 background-color:#FFEED2;
 h1{
    font-size: 16px;
    color:#454545;
    line-height: 19px;
    margin-bottom: 8px;
 }
 h4{
    font-size: 14px;
    color: #898989;
    line-height: 16px;
 }

`;
