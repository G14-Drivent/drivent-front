import api from './api';

export async function getActivitiesDate(token) {
  const response = await api.get('/activities/days', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getActivitiesSpace(token) {
  const response = await api.get('activities/space', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getActivities({ token, dateId, spaceId }) {
  const response = await api.get(`/activities/${dateId}/${spaceId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getActivitiesBookingCount({ token, activitieId }) {
  const response = await api.get(`/activities/booking/${activitieId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function postActivitieBooking({ token, activitieId }) {
  const response = await api.post(`/activities/booking/${activitieId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
