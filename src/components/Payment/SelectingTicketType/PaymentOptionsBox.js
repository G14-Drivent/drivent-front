import styled from 'styled-components';

export default function PaymentOptionsBox({ variant='contained', children, ...props }) {
  return (
    <StyledPaymentOptionsBox variant={variant} {...props}>
      {children}
    </StyledPaymentOptionsBox>
  );
}

const StyledPaymentOptionsBox = styled.div`
  width: 145px;
  height: 145px;
  border: 1px solid #cecece;
  border-radius: 20px;
  margin: 0 12px 0 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
