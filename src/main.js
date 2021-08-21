import { createApp } from 'vue';

import App from './App.vue';

// ==== PrimeVue ====

import PrimeVue from 'primevue/config';

import CascadeSelect from 'primevue/cascadeselect';
import Button from 'primevue/button';

import 'primevue/resources/themes/saga-blue/theme.css';       
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

// ==== Bootstrap ====

import 'bootstrap/dist/css/bootstrap.min.css';

// ==== Custom Css ====

import './styles/grow.css';
import './styles/pointer.css';

// ==== FontAwesome ====

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fas);
library.add(fab);
library.add(far);

import { dom } from '@fortawesome/fontawesome-svg-core';

dom.watch();

// ==== App Setup ====

const app = createApp(App);

app.use(PrimeVue);

app.component('font-awesome-icon', FontAwesomeIcon);

app.component('CascadeSelect', CascadeSelect);
app.component('Button', Button);

app.mount('#app');