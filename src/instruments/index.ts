import { defineCustomElement } from "vue";

import FormVue from "./form.ce.vue";

class RebillyInstrumentsInstance {
  constructor() {
    const RebillyInstrumentsForm = defineCustomElement(FormVue);
    customElements.define("rebilly-instruments", RebillyInstrumentsForm);
  }
  mount(config = {}) {
    const mountPoint = document.querySelector(".new-rebilly-instruments");
    const form = document.createElement("rebilly-instruments");

    form.setAttribute("config", JSON.stringify(config));

    mountPoint?.appendChild(form);
  }
}

export default new RebillyInstrumentsInstance();
