<template>
  <Header />
  <router-view class="wrapper"></router-view>
  <Footer />
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss">
@import '@/scss/index.scss';

:root {
  --header-h-s: 90px;
  --footer-h-s: 55px;
  --footer-h-m: 92px;
  --header-h: 120px;
  --footer-h: 94px;
}

.wrapper {
  min-height: calc(100vh - (var(--header-h-s) + var(--footer-h-s)));

  @include small-up {
    min-height: calc(100vh - (var(--header-h-s) + var(--footer-h-m)));
  }

  @include medium-up {
    min-height: calc(100vh - (var(--header-h) + var(--footer-h)));
  }
}
</style>
