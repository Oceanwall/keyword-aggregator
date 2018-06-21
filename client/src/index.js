import React from 'react';
import ReactDOM from 'react-dom';
import App from './MainApp/App.js';
import registerServiceWorker from './ServiceWorkers/registerServiceWorker.js';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
