<template>
  <header class="header">
    <div class="container">
      <div class="logo">
        <router-link to="/" class="header__link">
          <Logo class="logo__asset" />
        </router-link>
      </div>
      <router-link to="/" class="title header__link">Rick and Morty Wonderland</router-link>
    </div>
  </header>
</template>

<script>
import Logo from '@/assets/logo.svg'

export default {
  name: 'Header',
  components: {
    Logo
  }
}
</script>

<style lang="scss">
.header {
  --header-title-size-s: 28px;
  --header-title-size: 34px;
  --header-title-color: var(--blue);

  background-color: var(--black);

  .container {
    display: flex;
    align-items: center;

    padding-top: var(--spacing-half);
    padding-bottom: var(--spacing-half);

    @include medium-up {
      padding-top: var(--spacing);
      padding-bottom: var(--spacing);
    }
  }
}

.header__link {
  display: block;
}

.title {
  margin-left: var(--spacing);
  font-family: var(--title-font-family);
  font-size: var(--header-title-size-s);
  line-height: 125%;
  color: var(--header-title-color);
  text-shadow: var(--white) 0px 0px 1px, var(--white) 0px 0px 6px, var(--white) 0px 0px 2px;

  @include medium-up {
    font-size: var(--header-title-size);
  }
}

.logo__asset {
  --logo-size-s: 40px;
  --logo-size: 80px;

  display: block;
  width: var(--logo-size-s);
  height: auto;

  @include medium-up {
    width: var(--logo-size);
  }
}
</style>
