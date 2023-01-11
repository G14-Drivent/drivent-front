import { Typography } from '@material-ui/core';
import styled from 'styled-components';

import ActivitieContainer from './ActivitieContainer';
import useActivities from '../../hooks/api/useActivities';
import useCreateActivitieBooking from '../../hooks/api/useCreateActivitieBooking';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function SpacesContainer({ containerInfo }) {
  const dateId = containerInfo.selectedDay;
  const spaceId = containerInfo.space.id;

  const [ selectedActivitie, setSelectedActivitie ] = useState(null);

  const { activities, activitiesLoading, activitiesError, getActivities } = useActivities(dateId, spaceId);
  const { postCreateActivitieBooking, createActivitieBookingLoading, createActivitieBookingError } = useCreateActivitieBooking();

  useEffect(() => {
    getActivities(dateId, spaceId);
  }, [dateId, spaceId]);

  useEffect(() => {
    if(!selectedActivitie) return;
    if(window.confirm('Reservar atividade?')) {
      postCreateActivitieBooking(selectedActivitie)
        .then(() => toast('Reservado com sucesso!'))
        .catch((error) => toast('Falha ao reservar!'));
      setSelectedActivitie(null);
    }
    return;
  }, [selectedActivitie]);

  if (activitiesLoading)
    return (
      <SpacesContainerStyle>
        <SpaceStyle>
          {containerInfo.space.name}
          <SpaceActivities>
            Carregando atividades...
          </SpaceActivities>
        </SpaceStyle>
      </SpacesContainerStyle>
    );

  if (activitiesError)
    return (
      <SpacesContainerStyle>
        <SpaceStyle>
          {containerInfo.space.name}
          <SpaceActivities>
            Erro ao carregar atividades...
          </SpaceActivities>
        </SpaceStyle>
      </SpacesContainerStyle>
    );

  if (!activitiesError || !activitiesLoading)
    return (
      <SpacesContainerStyle>
        <SpaceStyle>
          {containerInfo.space.name}
          <SpaceActivities>

            {activities?.map((activitiesInfo) =>
              <ActivitieContainer 
                selectedActivitie={ selectedActivitie }
                setSelectedActivitie={ setSelectedActivitie }
                activitiesInfo={ activitiesInfo } 
              />
            )}

          </SpaceActivities>
        </SpaceStyle>
      </SpacesContainerStyle>
    );
}

const SpacesContainerStyle = styled(Typography)`
  display: flex;
`;

const SpaceStyle = styled(Typography)`
  min-height: 460px;
  width: 288px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-left: -1px;
`;

const SpaceActivities = styled(Typography)`
  min-height: 440px;
  width: 288px;
  border: 1px solid #d7d7d7;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
