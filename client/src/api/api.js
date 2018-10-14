import { getStore } from '../globalStore';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const beUrl = () => {
  const state = getStore().getState();
  return state.url;
} 

const getApiUrl = async () => {
  try {
    const rawResponse = await fetch(`/api-url`);
    const response = await rawResponse.json();
    return response.url;
  } catch (err) {
    return null;
  }
}

const logAEvent = async (type, action) => {
  console.log("logAEvent", type);
  const body = JSON.stringify({
    type,
    action,
   });

  await fetch(`${beUrl()}/log-action`, {
    method: 'POST',
    headers,
    body,
  });
  return;
}

const startAgain = async () => {
  const response = await fetch(`${beUrl()}/new-game`);
  return response.json();
}


const fetchLogs = async () => {
  const response = await fetch(`${beUrl()}/logs?size=10`);
  const jsonResponse = await response.json();
  return jsonResponse.logs || [];
}

export default {
  logAEvent,
  startAgain,
  fetchLogs,
  getApiUrl,
}