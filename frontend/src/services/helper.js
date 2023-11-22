import axios from 'axios';
const SUB_URL = 'http://localhost:3001/subscriptions';
async function regSw() {
    if ('serviceWorker' in navigator) {
        let url = 'http://localhost:3000/sw.js';
        const reg = await navigator.serviceWorker.register(url, { scope: '/' });
        console.log('service config is', { reg });
        return reg;
    }
    throw Error('serviceworker not supported');
}

async function subscribe(serviceWorkerReg) {

    let subscription = await serviceWorkerReg.pushManager.getSubscription();
    
    if (subscription === null) {
        subscription = await serviceWorkerReg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: 'BG78A44qvf78ct_e_T7oidlwAZLlTe8MexJu5MqKVF7ZgMEo9fUPH4K9TCWUPEwKW1RAOXaA4dqy6Af_hz_KyAo',
        });

        axios.post(`${SUB_URL}/subscribe`, subscription)
  .then(response => {
    // Log the response to the console
    console.log('Response:', response);

    // You can also access specific properties of the response if needed
    // For example, to log the response data:
    // console.log('Response data:', response.data);
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error('Error:', error);
  });

    }
}

async function unsubscribe(serviceWorkerReg) {
    let subscription = await serviceWorkerReg.pushManager.getSubscription();
    console.log({ subscription });
    if (subscription) {
        // Unsubscribe the existing subscription
        subscription.unsubscribe();
        console.log('Previous subscription unsubscribed');
    }
}

async function popup(serviceWorkerReg, title, description) {
    let subscription = await serviceWorkerReg.pushManager.getSubscription();
    console.log({ subscription });
    axios.post(`${SUB_URL}/notification`, {subscription, title, description} )
  .then(response => {
    console.log('Response:', response);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

export { regSw, subscribe, unsubscribe, popup };