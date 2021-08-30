import { createApp } from 'vue';

// ===== Routing =====

import router from './routing';

// ===== State Management =====

// ===== Entrypoint =====

import App from './App.vue';

// ==== PrimeVue ====

import PrimeVue from 'primevue/config';

import Panel from 'primevue/panel';
import Menu from 'primevue/menu';
import TieredMenu from 'primevue/tieredmenu';
import CascadeSelect from 'primevue/cascadeselect';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import OverlayPanel from 'primevue/overlaypanel';

import 'primevue/resources/themes/saga-blue/theme.css';       
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

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

app.use(router);

app.use(PrimeVue);

app.component('font-awesome-icon', FontAwesomeIcon);

app.component('Panel', Panel);
app.component('Menu', Menu);
app.component('TieredMenu', TieredMenu);
app.component('CascadeSelect', CascadeSelect);
app.component('InputText', InputText);
app.component('Button', Button);
app.component('Divider', Divider);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('OverlayPanel', OverlayPanel);

app.mount('#app');