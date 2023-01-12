import TicketChoosed from './TicketChoosed';
import CardForPayment from './CardForPayment';
import useTicket from '../../../hooks/api/useTicket';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

export default function PaymentTicket( { Paid, SetPaid } ) {
  const { ticket, ticketError, ticketLoading } = useTicket();
  const PUBLIC_KEY = 'pk_test_51MN7GmLwQdiTCVGUYQFRdR9aSc37kqqta5pEu9tCXR48K0MtQv16PzPDUAnRGv8UfObPRRw83a3fIETZtnkuv9SL00W1hjlZG8';

  const stripeTestPromise = loadStripe(PUBLIC_KEY);
  return (
    <Elements stripe={stripeTestPromise}>
      <TicketChoosed ticket={ ticket } ticketError={ ticketError } ticketLoading={ ticketLoading }/>
      <CardForPayment ticket={ ticket } Paid={ Paid } SetPaid={ SetPaid }/>
    </Elements>
  );
}
