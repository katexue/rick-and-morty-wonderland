<template>
  <div class="errorPage">
    <h1>404</h1>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
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
    const msg = ref(props.errorMsg)

    console.log(route.params)
    msg.value = route.params.errorMsg

    return { msg }
  }
}
</script>
