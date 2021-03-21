<template>
  <div class="loader"></div>
</template>

<style lang="scss">
@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loader {
  --loader-w-s: 60px;
  --loader-w: 80px;
  --loader-inner-w-s: 48px;
  --loader-inner-w: 64px;
  --loader-colour: var(--blue);

  display: block;
  width: var(--loader-w-s);
  height: var(--loader-w-s);

  @include medium-up {
    width: var(--loader-w);
    height: var(--loader-w);
  }

  &:after {
    content: '';
    display: block;
    width: var(--loader-inner-w-s);
    height: var(--loader-inner-w-s);
    margin: 6px;
    border-radius: 50%;
    border: 6px solid var(--loader-colour);
    border-color: var(--loader-colour) transparent var(--loader-colour) transparent;
    animation: spinner 1.2s linear infinite;

    @include medium-up {
      width: var(--loader-w);
      height: var(--loader-w);
      margin: 8px;
    }
  }
}
</style>
