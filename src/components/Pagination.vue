<template>
  <div class="pagination">
    <button :disabled="prevPage <= 0" @click="changePage(prevPage)" class="page-prev">
      <PrevIcon class="page__icon icon-prev" />
    </button>
    <button v-if="prevPage > 2" @click="changePage(1)" class="page">1</button>
    <div v-if="prevSeparator" class="separator">...</div>
    <button
      v-for="page in activePages"
      :key="`page${page}`"
      :class="{ 'page-current': currentPage === page }"
      @click="changePage(page)"
      class="page"
    >
      {{ page }}
    </button>
    <div v-if="nextSeparator" class="separator">...</div>
    <button v-if="pages - nextPage > 1" @click="changePage(pages)" class="page">{{ pages }}</button>
    <button :disabled="nextPage >= pages" @click="changePage(nextPage)" class="page page-prev">
      <NextIcon class="page__icon icon-next" />
    </button>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from 'vue'
import PrevIcon from '@/assets/chevron-left.svg'
import NextIcon from '@/assets/chevron-right.svg'

export default {
  name: 'Pagination',
  components: {
    PrevIcon,
    NextIcon
  },
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    pages: {
      type: Number,
      default: 1
    },
    nextPage: {
      type: Number,
      default: 2
    }
  },
  setup(props, { emit }) {
    const data = reactive({
      prevKey: 3,
      nextKey: 2,
      activePages: computed(() => {
        let range = []

        if (props.pages < 5) {
          range = props.pages
        } else {
          for (let i = 0; i < 5; i++) {
            const gap1 = 5 % props.currentPage
            const gap2 = props.pages - props.currentPage

            if (props.currentPage < data.prevKey) {
              range.push(props.currentPage + (i - gap1))
            } else if (gap2 < data.nextKey) {
              range.push(props.currentPage + (i - 4 + gap2))
            } else {
              range.push(props.currentPage + (i - 2))
            }
          }
        }

        return range
      }),
      prevPage: computed(() => {
        return props.currentPage - 1
      }),
      prevSeparator: computed(() => {
        return props.currentPage - data.prevKey > 0
      }),
      nextSeparator: computed(() => {
        return props.currentPage + data.nextKey < props.pages
      })
    })

    const changePage = (pageId) => {
      emit('onPageChange', pageId)
    }

    return {
      ...toRefs(data),
      changePage
    }
  }
}
</script>

<style lang="scss">
.pagination {
  --page-transition: 120ms;

  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--spacing-double);
}

.page {
  --page-size: 24px;

  overflow: hidden;
  position: relative;
  display: block;
  width: var(--page-size);
  height: var(--page-size);
  line-height: 1;
  transform-origin: center bottom;

  &:focus {
    outline: none;
  }

  &:hover {
    &:after {
      height: var(--page-size);
    }
  }

  &:after {
    content: '';
    z-index: -1;
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 0;
    background-color: var(--green);

    transition: height var(--page-transition) ease-in;
  }
}

.page-prev,
.page-next {
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.page-current {
  &:after {
    height: var(--page-size);
  }
}

.page__icon {
  display: block;
}
</style>
