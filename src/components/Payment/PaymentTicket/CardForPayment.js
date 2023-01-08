import { useState } from 'react';
import React from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import usePayment from '../../../hooks/api/usePayment';
import { toast } from 'react-toastify';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const CARD_OPTIONS = {
  shapes: {
    borderRadius: 12,
    borderWidth: 0.5,
  },
  primaryButton: {
    shapes: {
      borderRadius: 20,
    },
  },
  colors: {
    primary: '#fcfdff',
    background: '#ffffff',
    componentBackground: '#f3f8fa',
    componentBorder: '#f3f8fa',
    componentDivider: '#000000',
    primaryText: '#000000',
    secondaryText: '#000000',
    componentText: '#000000',
    placeholderText: '#73757b',
  },
};

export default function CardForPayment( { ticket, Paid, SetPaid } ) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardDateExp, setCardDateExp] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardIssuer, setCardIssuer] = useState('');
  const [cardFocus, setCardFocus] =  useState('');

  const { postPayment } = usePayment();

  const stripe = useStripe();
  const elements = useElements();

  function handleInputFocus(e) {
    setCardFocus(e.target.name);
  };

  async function handleForm(e) {
    e.preventDefault();
    try{
      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement
      });
      const payment = {
        ticketId: ticket.id,
        cardData: {
          id: paymentMethod,
          issuer: cardIssuer,
          name: cardName,
          number: cardNumber,
          cvv: cardCVC,
          expirationDate: cardDateExp,
        }
      };
      if(!error) {
        await postPayment(payment);
        SetPaid(!Paid);
      }
    }catch(err) {
      toast('não foi possível realizar seu pagamento');
    }
  };

  function handleCallback({ issuer }) {
    setCardIssuer((issuer).toUpperCase());
  }

  return(
    <>
      <StyledTypography variant='h6' id='StyledTy'>
      Pagamento
      </StyledTypography>
      <FormCardContainer id='PaymentForm'>
        <Form onSubmit={handleForm} id='Form'>
          <ContainerInfos id='ContainerInfos'>
            <CardContainer id='CardContainer'>
              <Cards
                cvc={cardCVC}
                expiry={cardDateExp}
                focused={cardFocus}
                name={cardName}
                number={cardNumber}
                callback={handleCallback}
              />
            </CardContainer>
            <ContainerForm id='ContainerForm'>
              <CardElement options={CARD_OPTIONS}/>
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
width:100%;
justify-content:space-evenly;
`;

const CardContainer = styled.div`
margin-left: 0px;
margin-right:30px;
`;

const Form = styled.form`
width:100%;
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
