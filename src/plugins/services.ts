import { services } from "../services";

export default {
  install(Vue: any) {
    Vue.prototype.$services = services;
  }
};