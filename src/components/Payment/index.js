import { useEffect, useState } from 'react';
import SelectingTicketType from './SelectingTicketType/index';
import useEnrollment from '../../hooks/api/useEnrollment';
import { GreenVerifyer } from './greenVerifyer';
import useTicket from '../../hooks/api/useTicket';
import TicketChoosed from './PaymentTicket/TicketChoosed';
import {
  ColumRow,
  Row,
  Title,
  StyledDiv,
  InfoTitle,
  EnrollTitle
} from './section';

export function PaymentPage() {
  const [Paid, SetPaid] = useState(false);
  const [Enroll, SetEnroll
  ] = useState('');

  const { getEnrollment } = useEnrollment();
  const { getTicket } = useTicket();

  const { ticket, ticketError, ticketLoading } = useTicket();

  useEffect(() => {
    GetPayment();
    getEnroll();
  }, []);

  async function getEnroll() {
    const enrollapi = await getEnrollment();
    SetEnroll(enrollapi.name); 
  }

  async function GetPayment() {
    const payment = await getTicket();
    if(payment.status === 'PAID') {
      SetPaid(payment.status); 
    }
  }
  return (
    <StyledDiv>
      {Enroll? 
      
        <>
          <Row>
            {Paid? 
              <>
                <Row>
                  <Title>Ingresso e pagamento</Title>
                </Row>
                <TicketChoosed ticket={ ticket } ticketError={ ticketError } ticketLoading={ ticketLoading }/>
              </>:  
              <SelectingTicketType Paid={ Paid } SetPaid={ SetPaid }/>}
          </Row>
          <Row>
            {Paid? 
              <InfoTitle>
                <ColumRow>  
                  <GreenVerifyer></GreenVerifyer>  
                  <Row>
                    <p className='InfoTitle'>Pagamento confirmado</p>
                    <p className='Info'>Prossiga para escolha de hospedagem e atividades</p>
                  </Row>
                </ColumRow>
              </InfoTitle> : 
              <></>
            }
          </Row>
        </> 
        : 
        <Row>
          <Title>Ingresso e pagamento</Title> 
          <EnrollTitle>
            Você precisa completar sua incrição antes de prosseguir para escolha de ingresso
          </EnrollTitle>
        </Row>
      }
    </StyledDiv>
  );
}

