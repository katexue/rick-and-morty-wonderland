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
}

.copyright {
  font-size: var(--body-font-size-extra-small);
}
</style>
