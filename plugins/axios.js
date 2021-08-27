export default function ({ $axios }, inject) {
  const api = $axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    baseURL: 'http://localhost:8000/api',
  });
  api.onRequest((config) => {
    console.log('Making request to ' + config.url);
  });
  const dataApi = $axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    baseURL: 'http://localhost:8001/api',
  });

  //   api.setBaseURL('http://localhost:8000/api');
  inject('api', api);
  inject('dataApi', dataApi);
}
