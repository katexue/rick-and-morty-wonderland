<template>
  <teleport to="#end-of-body">
    <div :class="{ 'modal--active': modalOpen }" class="modal">
      <div @click="closeModal()" class="modal-overlay"></div>
      <div class="modal__container">
        <button class="modal__close">
          <Close @click="closeModal()" class="close__icon" />
        </button>
        <div class="modal__inner">
          <div class="modal__content">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
// import { onMounted, reactive, toRefs } from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
// import eventBus from '@/plugins/eventBus'
import Close from '@/assets/close.svg'

export default {
  name: 'Modal',
  components: {
    Close
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const modalOpen = computed(() => store.getters['modal/getModalStatus'])

    const closeModal = () => {
      store.dispatch('modal/closeModal', () => {
        document.body.style.overflow = ''
        router.push({
          name: 'Characters',
          params: {
            page: route.params.page
          },
          query: route.query
        })
      })
    }

    return {
      modalOpen,
      closeModal
    }
  }
}
</script>

<style lang="scss">
.modal {
  --modal-z-index: 10;
  --modal-transition: 200ms;

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  -webkit-overflow-scrolling: touch;

  z-index: -1;
  opacity: 0;
  visibility: hidden;

  transition: all var(--modal-transition) ease-in;
}

.modal--active {
  z-index: var(--modal-z-index);
  opacity: 1;
  visibility: visible;
}

.modal-overlay {
  z-index: calc(var(--modal-z-index) + 1);

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background: rgba(var(--blue-dark-rgb), 0.8);
}

.modal__container {
  --modal-spacing-s: var(--spacing-middle);
  --modal-spacing: var(--spacing-double);

  z-index: calc(var(--modal-z-index) + 2);
  overflow: hidden;
  position: fixed;
  top: 50%;
  left: 50%;

  width: 80vw;
  max-width: $max-viewport-width-s;
  // height: auto;
  // min-height: 80vh;
  height: 80vh;
  // max-height: 680px;
  padding-top: var(--modal-spacing-s);
  padding-bottom: var(--modal-spacing-s);
  transform: translate(-50%, -50%);
  background-color: var(--white);

  @include medium-up {
    padding-top: var(--modal-spacing);
    padding-bottom: var(--modal-spacing);
  }
}

.modal__close {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  z-index: calc(var(--modal-z-index) + 2);
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  padding: 0;
  border: none;
  border-radius: 0;
  margin: 0;

  @include medium-up {
    // top: var(--spacing-quarter);
    // right: var(--spacing-quarter);
    width: 40px;
  }
}

.modal__inner {
  overflow: auto;
  // position: relative;
  width: calc(100% - var(--spacing-double));
  height: calc(80vh - var(--modal-spacing-s) - var(--modal-spacing-s));
  margin-left: auto;
  margin-right: auto;

  @include medium-up {
    width: calc(100% - var(--spacing-quad));
    height: calc(80vh - var(--modal-spacing) - var(--modal-spacing));
  }
}

.modal__content {
  padding-top: var(--spacing-half);
  padding-bottom: var(--spacing);
}
</style>
