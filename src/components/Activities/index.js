import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { useState } from 'react';

import Days from './Days';
import SpacesContainer from './SpaceContainer';

import useEnrollment from '../../hooks/api/useEnrollment';
import useTicket from '../../hooks/api/useTicket';
import useActivitiesDays from '../../hooks/api/useActivitiesDays';
import useActivitiesSpace from '../../hooks/api/useActivitiesSpace';

export default function PaymentScreen() {
  const { enrollment, enrollmentError, enrollmentLoading } = useEnrollment();
  const { ticket, ticketError, ticketLoading } = useTicket();
  const { activitieDays, activitieDaysLoading, activitieDaysError } = useActivitiesDays();
  const { activitieSpace } = useActivitiesSpace();

  const [selectedDay, setSelectedDay] = useState(null);

  if(enrollmentLoading || enrollmentError || enrollment === null)
    return(
      <>
        <StyledTypography variant="h4">Escolha de atividades</StyledTypography>

        <StyledCenteredText>
          <StyledTypography variant='h6'>
          Você precisa completar sua incrição antes de prosseguir para escolha de atividades.
          </StyledTypography>
        </StyledCenteredText>
      </>
    );

  if(ticket?.TicketType.isRemote === true && !ticketLoading && !ticketError)
    return (
      <>
        <StyledTypography variant="h4">Escolha de atividades</StyledTypography>

        <StyledCenteredText>
          <StyledTypography variant='h6'>
            Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.
          </StyledTypography>
        </StyledCenteredText>
      </>
    );

  if(ticket?.status === 'RESERVED' && !ticketLoading && !ticketError)
    return (
      <>
        <StyledTypography variant="h4">Escolha de atividades</StyledTypography>

        <StyledCenteredText>
          <StyledTypography variant='h6'>
            Você precisa ter confirmado pagamento antes de fazer a escolha de atividades
          </StyledTypography>
        </StyledCenteredText>
      </>
    );

  if(!activitieDaysLoading || !activitieDaysError || activitieDays?.length)
    return (
      <>
        <StyledTypography variant="h4">Escolha de atividades</StyledTypography>

        {(selectedDay)? <></> : 
          <StyledTypography variant="h6">
            Primeiro, filtre pelo dia do evento:
          </StyledTypography>
        }

        <DaysContainer>
          {activitieDays?.map((day) => <Days day={ day } selected={{ selectedDay, setSelectedDay }}/>)}
        </DaysContainer>

        {(selectedDay)? <SpaceContainerStyle>{activitieSpace?.map((space) => <SpacesContainer containerInfo={{ space, selectedDay }} />)}</SpaceContainerStyle> : <></>}
      </>
    );
}

const StyledCenteredText = styled(Typography)`
  height: 80%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const DaysContainer = styled(Typography)`
  display: flex;
  padding-bottom: 40px;
`;

const SpaceContainerStyle = styled(Typography)`
  display: flex;
`;
