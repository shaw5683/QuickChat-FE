import Vue from 'vue'
import Alert from './alert'

const alert = (option = {}) => {
  const AlertComponent = Vue.extend(Alert)
  const app = document.querySelector('#app')
  const vm = new AlertComponent({
    el: document.createElement('div')
  })
  Object.assign(vm, option)
  vm.$on('close', () => {
    vm.show = false
    window.setTimeout(() => {
      app.removeChild(vm.$el)
      vm.$destroy()
    }, 1000)
  })
  app.appendChild(vm.$el)
}

export default alert
