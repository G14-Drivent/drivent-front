import { Typography } from '@material-ui/core';
import styled from 'styled-components';

import ActivitieContainer from './ActivitieContainer';
import useActivities from '../../hooks/api/useActivities';

export default function SpacesContainer({ containerInfo }) {
  const dateId = containerInfo.selectedDay;
  const spaceId = containerInfo.space.id;
  const { activities, activitiesLoading, activitiesError } = useActivities(dateId, spaceId);
  
  if(!activitiesError && !activitiesLoading) {
    console.log(activities);
  }
  
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
            
            <ActivitieContainer activitieInfo={ activities } />

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
