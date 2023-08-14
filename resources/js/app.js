import { createApp } from 'vue';
import ExampleComponent from './components/ExampleComponent.vue';
import ProductComponent from './components/ProductComponent.vue';
import VueProgressBar from '@aacassandra/vue3-progressbar'; // Import the progress bar

const options = {
  color: "#0d6efd",
  failedColor: "red",
  thickness: "5px",
  transition: {
    speed: "0.2s",
    opacity: "0.6s",
    termination: 300,
  },
  autoRevert: true,
  location: "top",
  inverse: false,
};

const app = createApp({
    // App options here
});

// Register components
app.component('example-component', ExampleComponent);
app.component('product-component', ProductComponent);

// Use the VueProgressBar plugin
app.use(VueProgressBar, options);

app.mount('#app');
