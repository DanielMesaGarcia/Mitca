import axios from 'axios';
const API_URL = 'http://localhost:3001';

async function regSw () {
  if ('serviceWorker' in navigator) {
    let url = process.env.PUBLIC_URL + '/sw.js';
    const reg = await navigator.serviceWorker.register (url, {scope: '/'});
    console.log ('service config is', {reg});
    return reg;
  }
  throw Error ('serviceworker not supported');
}

async function subscribe (serviceWorkerReg) {
    let subscription = await serviceWorkerReg.pushManager.getSubscription ();
    if (subscription === null) {
      subscription = await serviceWorkerReg.pushManager.subscribe ({
        userVisibleOnly: true,
        applicationServerKey: 'BG78A44qvf78ct_e_T7oidlwAZLlTe8MexJu5MqKVF7ZgMEo9fUPH4K9TCWUPEwKW1RAOXaA4dqy6Af_hz_KyAo',
      });
      axios.post (`${API_URL}/subscribe`, subscription);
  }
}

  export {regSw, subscribe};

  