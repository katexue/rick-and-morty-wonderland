<template>
  <section class="errorPage container">
    <h1>404</h1>
    <p>{{ msg }}</p>
  </section>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'

export default {
  props: {
    errorMsg: {
      type: String,
      default: 'Gosh error!'
    }
  },
  setup(props) {
    const route = useRoute()
    const data = reactive({
      msg: props.errorMsg
    })

    data.msg = route.params.errorMsg

    return { ...toRefs(msg) }
  }
}
</script>
