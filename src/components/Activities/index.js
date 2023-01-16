import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

import Days from './Days';
import SpacesContainer from './SpaceContainer';

import useEnrollment from '../../hooks/api/useEnrollment';
import useTicket from '../../hooks/api/useTicket';
import useActivitiesDays from '../../hooks/api/useActivitiesDays';
import useActivitiesSpace from '../../hooks/api/useActivitiesSpace';

export default function ActivitiesScreen() {
  const { enrollment, enrollmentError, enrollmentLoading } = useEnrollment();
  const { ticket, ticketError, ticketLoading } = useTicket();
  const { activitieDays, activitieDaysLoading, activitieDaysError } = useActivitiesDays();
  const { activitieSpace, activitieSpaceLoading } = useActivitiesSpace();

  const [ days, setDays ] = useState([]);
  const [ spaces, setSpaces ] = useState([]);
  const [ selectedDay, setSelectedDay ] = useState(null);

  useEffect(() => {
    setDays(activitieDays);
    setSpaces(activitieSpace);
  }, [ activitieDaysLoading, activitieSpaceLoading ]);

  if(!ticket || enrollmentLoading || enrollmentError || enrollment === null)
    return(
      <>
        <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
        <ErrorTitle>Você precisa completar sua incrição e ticket antes de prosseguir para escolha de atividades.</ErrorTitle>
      </>
    );

  if(ticket?.TicketType.isRemote === true && !ticketLoading && !ticketError)
    return (
      <>
        <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
        <ErrorTitle>Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.</ErrorTitle>
      </>
    );

  if(ticket?.status === 'RESERVED' && !ticketLoading && !ticketError)
    return (
      <>
        <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
        <ErrorTitle>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</ErrorTitle>
      </>
    );

  if(!activitieDaysLoading && !activitieDaysError && days?.length)
    return (
      <>
        <StyledTypography variant="h4">Escolha de atividades</StyledTypography>

        {(selectedDay)? <></> : 
          <StyledTypography variant="h6">
            Primeiro, filtre pelo dia do evento:
          </StyledTypography>
        }

        <DaysContainer>
          {days?.map((day) => <Days day={ day } selected={{ selectedDay, setSelectedDay }}/>)}
        </DaysContainer>

        {(selectedDay)? <SpaceContainerStyle>{spaces?.map((space) => <SpacesContainer containerInfo={{ space, selectedDay }} />)}</SpaceContainerStyle> : <></>}
      </>
    );
  
  return(
    <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const ErrorTitle = styled.div`
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

const DaysContainer = styled(Typography)`
  display: flex;
  padding-bottom: 40px;
`;

const SpaceContainerStyle = styled(Typography)`
  display: flex;
`;
