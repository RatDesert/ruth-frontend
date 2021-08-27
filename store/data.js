import _ from 'lodash';
// data {<hub_id>: {<sensor_id>:{"value":5,"signal":41,"charge":50,"timestamp":1627295791.662961}}}
// events {<hub_id>:{<sensor_id>:{<event_name>:{"ip":"172.19.0.1","timestamp":1627296043.195067}}}}
// state {<hub_id> : {<sensor_id> : {'last_seen_at': 1627296043, is_online: true}}}
export const state = () => ({
  data: {},
});

export const getters = {
  getDataById: (state) => (hubId, sensorId) => state.data[hubId]?.[sensorId],
};

export const mutations = {
  ADD_DATA(state, message) {
    _.merge(state.data, message);
    state.data = { ...state.data };
  },
};
