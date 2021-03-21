<template>
  <section class="errorPage container">
    <h1>404</h1>
    <p class="error-message">{{ msg }}</p>
    <img src="@/assets/404.png" alt="404 not found image" />
  </section>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'

export default {
  props: {
    errorMsg: {
      type: String,
      default: 'Guess what!!!'
    }
  },
  setup(props) {
    const route = useRoute()
    const data = reactive({
      msg: props.errorMsg
    })

    if (route.params.errorMsg) {
      data.msg = route.params.errorMsg
    }

    return { ...toRefs(data) }
  }
}
</script>

<style lang="scss">
.errorPage {
}
</style>
