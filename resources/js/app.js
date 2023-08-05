import { createApp } from 'vue';
import ExampleComponent from './components/ExampleComponent.vue';
import ProductComponent from './components/ProductComponent.vue';

const app = createApp({
    // App options here
});

app.component('example-component', ExampleComponent);
app.component('product-component', ProductComponent);

app.mount('#app');
