import _ from 'lodash';
// data {<hub_id>: {<sensor_id>:{"value":5,"signal":41,"charge":50,"timestamp":1627295791.662961}}}
// events {<hub_id>:{<sensor_id>:{<event_name>:{"ip":"172.19.0.1","timestamp":1627296043.195067}}}}
// state {<hub_id> : {<sensor_id> : {'last_seen_at': 1627296043, is_online: true}}}
export const state = () => ({
  devices: {},
});

export const getters = {
  getHubState: (state) => (hubId) => state.devices[hubId]?.system,
  getSensorState: (state) => (hubId, sensorId) =>
    state.devices[hubId]?.[sensorId],
};

export const mutations = {
  ADD_STATE(state, message) {
    state.devices = message;
    state.devices = { ...state.devices };
  },
  UPDATE_STATE(state, message) {
    _.merge(state.devices, message);
    state.devices = { ...state.devices };
  },
  SET_HUB_OFFLINE(state, { hubId, timestamp }) {
    const hubState = state.devices[hubId];
    hubState.system.last_message_at = timestamp;
    hubState.system.ip = null;

    for (const sensorState of Object.values(hubState)) {
      sensorState.is_online = false;
    }

    state.devices = { ...state.devices };
  },
  SET_HUB_ONLINE(state, { hubId, timestamp, ip }) {
    state.devices[hubId].system.last_message_at = timestamp;
    state.devices[hubId].system.is_online = true;
    state.devices[hubId].system.ip = ip;
    state.devices = { ...state.devices };
  },
};
