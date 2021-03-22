<template>
  <section class="errorPage container">
    <h1 class="error-title">404 ERROR</h1>
    <p class="error-message h3">{{ msg }}</p>
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
      default: `The universe's gone BANANA 🍌`
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
.error-title {
  font-family: var(--title-font-family);
  color: var(--green);
  text-shadow: var(--white) 0px 0px 3px, var(--green-dark) 0px 0px 6px;
}
</style>
