<template>
  <div class="app">
    Vue is working!
    <div class="test">Hi!!! {{ counter }}</div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import {
  ref,
  onMounted
} from 'vue'

export default {
  setup() {
    const counter = ref(2)

    const test = () => {
      console.log('test')
    }

    onMounted(async () => {
      const response = await axios.get('https://rickandmortyapi.com/api/character/?page=1&count=20')

      console.log(response)
    })

    return {
      counter,
      test
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss">
@import '../scss/_mixins.scss';

.app {
  font-size: var(--body-font-size-small);

  .test {
    color: red;

    @include small-up {
      color: purple;
    }
  }
}
</style>
