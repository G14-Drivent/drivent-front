import styled from 'styled-components';

export const StyledDiv = styled.div`
font-size: 16px;
display: flex;
flex-direction: column;
padding: 10px;
`;

export const Title = styled.h1`
font-size: 32px;
margin-left:0px;
display:flex;
align-items: left;
margin-top: -5px;
`;

export const SectionTitle = styled.div`
margin-top:20px;
font-size: 24px;
margin-bottom: 10px;
color: #8e8e8e;
`;

export const ChoosedTicket = styled.div`
margin-top:17px;
width:290px;
height:108px;
background-color:#FFEED2;
border-radius:15px;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
.Title{
  color: #454545;
}
.Price{
  margin-top:5px;
  color:#898989;
}
`;

export const Row = styled.div`
font-family: 'Roboto', sans-serif;
display: flex;
flex-direction: column;
justify-content: flex-start;
width: 100%;
`;
export const ColumRow = styled.div`
font-family: 'Roboto', sans-serif;
display: flex;
flex-direction: flex;
justify-content: flex-start;
width: 100%;
`;

export const InfoTitle = styled.div`
color: #454545;
font-weight:bold;
font-size:16px;
.Info{
  margin-left:20px;
  margin-top:5px;
  font-weight:400;
}
.InfoTitle{
  color: #454545;
  margin-left:20px;
  font-weight:bold;
  font-size:16px;
}
`;
export const EnrollTitle = styled.div`
font-family: 'Roboto', sans-serif;
color: #8e8e8e;
display: flex;
flex-direction: flex;
justify-content: center;
align-items:center;
height:100%;
width: 50%;
margin-left:25%;
margin-top:30%;
`;
