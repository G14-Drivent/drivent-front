import { useState } from 'react';
import React from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import usePayment from '../../../hooks/api/usePayment';
import { toast } from 'react-toastify';

export default function CardForPayment( { ticket, Paid, SetPaid } ) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardDateExp, setCardDateExp] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardIssuer, setCardIssuer] = useState('');
  const [cardFocus, setCardFocus] =  useState('');
 
  const { postPayment } = usePayment();
        
  function handleInputFocus(e) { 
    setCardFocus(e.target.name);
  };
   
  async function handleForm(e) {
    e.preventDefault();
    const payment = {
      ticketId: ticket.id,
      cardData: {
        issuer: cardIssuer,
        name: cardName,
        number: cardNumber,
        cvv: cardCVC,
        expirationDate: cardDateExp,
      }
    };
    try{
      await postPayment(payment);
      SetPaid(!Paid);
    }catch(err) {
      toast('não foi possível realizar seu pagamento');
    };
  };

  function handleCallback({ issuer }) {
    setCardIssuer((issuer).toUpperCase());
  } 

  return(
    <> 
      <StyledTypography variant="h6" id="StyledTy">
      Pagamento
      </StyledTypography>
      <FormCardContainer id="PaymentForm">
        <Form onSubmit={handleForm} id="Form">
          <ContainerInfos id="ContainerInfos">
            <CardContainer id="CardContainer">
              <Cards
                cvc={cardCVC}
                expiry={cardDateExp}
                focused={cardFocus}
                name={cardName}
                number={cardNumber}
                callback={handleCallback}
              /> 
            </CardContainer>  
            <ContainerForm id="ContainerForm">
              <ContainerName id="ContainerName">
                <Input
                  type="text"
                  id="number" required
                  value={cardNumber}
                  maxLength="16"
                  placeholder="Card Number"
                  onChange={ (e) => setCardNumber(e.target.value)} 
                  onFocus={ (e) => handleInputFocus(e) }
                />
                <Info>E.g..: 49..., 51..., 36..., 37...</Info>
              </ContainerName>
              <Input
                type="text"
                id="name"required
                value={cardName}
                maxLength="17"
                placeholder="Name"
                onChange={ (e) => setCardName(e.target.value)} 
                onFocus={ (e) => handleInputFocus(e) }
              />
              <BoxInfo id="BoxInfo">
                <Input2
                  type="text"
                  id="expiry" required
                  autoComplete='off'
                  maxLength="4"
                  value={cardDateExp}
                  placeholder="Valid Thru"
                  onChange={ (e) => setCardDateExp(e.target.value)} 
                  onFocus={ (e) => handleInputFocus(e) }
                />
                <Input3
                  type="text"
                  id="cvc" required
                  maxLength="3"
                  autoComplete='off'
                  value={cardCVC}
                  placeholder="CVC"
                  onChange={ (e) => setCardCVC(e.target.value)} 
                  onFocus={ (e) => handleInputFocus(e) }
                />
              </BoxInfo> 
            </ContainerForm>
          </ContainerInfos>
          <Button>
            FINALIZAR PAGAMENTO  
          </Button>
        </Form>
      </FormCardContainer > 
    </> 
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 10px!important;
  color:#8E8E8E;
`;

const FormCardContainer = styled.div`
display:flex;
`;

const ContainerInfos = styled.div`
display:flex;
`;

const ContainerForm = styled.div`
display:flex;
flex-direction:column;
justify-content:space-evenly;
`;

const CardContainer = styled.div`
margin-left: 0px;
margin-right:30px;
`;

const BoxInfo = styled.div`
display:flex;
justify-content:space-between;
`;

const Form = styled.form`
display:flex;
flex-direction:column;
`;

const Input = styled.input`
width:290px;
height:45px;
border-radius:5px;
border-color:#E0E0E0;
padding:10px;
font-size:16px;
border: 1px solid #8e8e8e;
`;

const Input2 = styled(Input)`
width:200px;
`;

const Input3 = styled(Input)`
width:70px;
`;

const ContainerName = styled.div`

`;

const Info = styled.h1`
color:gray;
font-size:15px;
margin-top:5px;
`;

const Button = styled.button`
width: 182px;
height: 37px;
background: #E0E0E0;
box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
border-radius: 4px;
border: 1px solid #e0e0e0;
font-size: 14px;
margin-top: 45px;
color: black;
font-family: 'Roboto';
line-height: 16px;
text-align: center;
`;
