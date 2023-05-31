import { createApp } from 'vue'
import App from '../view/content/index.vue'

// window.onload = () => {
    const g = document.createElement('div');
    g.setAttribute("id", "maika_extension_app");
    document.body.insertAdjacentElement("afterend", g);

    createApp(App).mount('#maika_extension_app')
// }