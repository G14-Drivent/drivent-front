import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { RxEnter, RxCrossCircled } from 'react-icons/rx';
import useActivitiesBookingCount from '../../hooks/api/useActivitieBookingCount';

export default function ActivitieContainer({ activitiesInfo }) {
  const activitieId = activitiesInfo.id;

  const [isItFull, setIsItFull] = useState(true);
  const [activitieVacancy, setActivitieVacancy] = useState(activitiesInfo.capacity);

  const { activitieBookingCount } = useActivitiesBookingCount(activitieId);

  function attVacancy() {
    setActivitieVacancy(Number(activitiesInfo.capacity) - activitieBookingCount?.activitiesBookingCount);
    if (activitieVacancy === 0) {
      setIsItFull(false);
    };
  };

  useEffect(() => {
    attVacancy();
  }, [activitieBookingCount]);

  return (
    <ActivitieStyle duration={activitiesInfo.duration}>
      <ActivitieInfoBox>

        <ActivitieName>
          {activitiesInfo.name}
        </ActivitieName>

        <ActivitieHour>
          {activitiesInfo.start}:00 - {activitiesInfo.start + activitiesInfo.duration}:00
        </ActivitieHour>

      </ActivitieInfoBox>
      
      <ActivitieVacancyBox isItFull={isItFull}>
        {isItFull? <RxEnter /> : <RxCrossCircled />}
        <ActivitieStatus>
          {isItFull? <>{activitieVacancy} vagas</> : <>Esgotado</>}
        </ActivitieStatus>
      </ActivitieVacancyBox>
    </ActivitieStyle>
  );
}

const ActivitieStyle = styled(Typography)`
  display: flex;

  min-height: 80px;
  height: ${props => props.duration * 80}px;
  width: 265px;

  margin-top: 10px!important;
  background: #F1F1F1;
  border-radius: 5px;
  padding: 10px 0 10px 10px;
`;

const ActivitieInfoBox = styled(Typography)`
  display: flex;
  flex-direction: column;

  width: 200px;
  height: 100%;
  border-right: 1px solid #CFCFCF;
`;

const ActivitieVacancyBox = styled(Typography)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 65px;
  color: ${props => (props.isItFull)? '#078632;' : '#CC6666;'};
`;

const ActivitieName = styled(Typography)`
  font-size: 12px!important;
  font-weight: 700!important;
`;

const ActivitieHour = styled(Typography)`
  font-size: 12px!important;
  font-weight: 400!important;
`;

const ActivitieStatus = styled(Typography)`
  font-size: 9px!important;
  font-weight: 400!important;
`;
