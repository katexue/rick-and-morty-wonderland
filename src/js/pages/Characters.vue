<template>
  <section class="characters">
    <div class="container">
      <h1 class="heading">Characters in Rick and Morty</h1>
      <ul class="list">
        <li
          v-for="character in characters"
          :key="`character-${character.id}`"
          :class="{
            'item-large': currentPage > 4
          }"
          class="list__item"
        >
          <Character :character="character" @onModalOpen="toggleModal" />
        </li>
      </ul>
      <Pagination :currentPage="currentPage" :pages="information.pages" :nextPage="nextPage" @onPageChange="loadNextPage" />
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import { useRoute } from 'vue-router'
import {
  reactive,
  toRefs,
  computed,
  onMounted
} from 'vue'
import Character from '../components/Character.vue'
import Pagination from '../components/Pagination.vue'

export default {
  name: 'Characters',
  components: {
    Character,
    Pagination
  },
  setup() {
    const route = useRoute()
    const api = 'https://rickandmortyapi.com/api/character/'
    const charsData = reactive({
      qty: 20,
      currentPage: parseInt(route.params.page, 10),
      information: {},
      characters: [],
      nextPage: computed(() => {
        return charsData.currentPage + 1
      })
    })

    onMounted(async () => {
      await loadPage(charsData.currentPage)
    })

    const loadPage = async (page) => {
      const response = await axios.get(`${api}?page=${page}&count=${charsData.qty}`)

      if (response.data) {
        const {
          info,
          results
        } = response.data

        charsData.information = { ...info }
        charsData.characters = results
      }
    }

    const toggleModal = (data) => {
      console.log(data)
    }

    const loadNextPage = async (nextPage) => {
      charsData.currentPage = nextPage
      await loadPage(nextPage)
    }

    return {
      ...toRefs(charsData),
      loadNextPage,
      toggleModal
    }
  }
}
</script>

<style lang="scss">
@import './src/scss/_settings.scss';

.characters {
  @include small-up {
    // color: purple;
  }
}

.list__item {
  & + .list__item {
    margin-top: var(--spacing);
  }
}
</style>
