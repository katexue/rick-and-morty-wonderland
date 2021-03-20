<template>
  <header class="header">
    <div class="container">
      <div class="logo">
        <img :src="logoUrl" class="logo__asset" alt="Rick and Morty black logo icon" width="40" height="40" />
      </div>
      <div class="title">
        Rick and Morty Wonderland
      </div>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue'
import logo from 'url:/src/assets/logo.svg'

export default {
  setup() {
    const logoUrl = ref(logo)

    return {
      logoUrl
    }
  }
}
</script>

<style lang="scss">
.header {
  --header-title-size: 28px;
  --header-title-color: var(--blue);

  background-color: var(--black);

  .container {
    display: flex;
    align-items: center;

    padding-top: var(--spacing-half);
    padding-bottom: var(--spacing-half);
  }
}

.title {
  margin-left: var(--spacing);
  font-family: var(--title-font-family);
  font-size: var(--header-title-size);
  line-height: 125%;
  color: var(--header-title-color);
  text-shadow: var(--white) 0px 0px 1px, var(--white) 0px 0px 6px, var(--white) 0px 0px 2px;
}
</style>
