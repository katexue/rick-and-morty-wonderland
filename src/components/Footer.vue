<template>
  <footer class="footer">
    <div class="container">
      <p class="copyright">&copy;{{ new Date().getFullYear() }} Rick and Morty Wonderland. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  background-color: var(--yellow);

  .container {
    @include small-up {
      padding-top: var(--spacing-double);
      padding-bottom: var(--spacing-double);
    }

    @include medium-up {
      padding-top: var(--spacing-double);
      padding-bottom: var(--spacing-double);
    }
  }
}

.copyright {
  font-size: var(--body-font-size-extra-small);

  @include medium-up {
    font-size: var(--body-font-size-small);
  }
}
</style>
