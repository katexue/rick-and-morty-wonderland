<template>
  <section class="characters">
    <div class="container">
      <Search />
      <h1 class="heading">Characters in Rick and Morty</h1>
      <ul v-if="characters.length" class="list">
        <li
          v-for="(character, index) in characters"
          :key="`character-${character.id}`"
          :class="{
            'item-large': currentPage > 4
          }"
          class="list__item"
        >
          <Character :character="character" :index="getCharacterIndex(index)" @onModalOpen="toggleModal" />
        </li>
      </ul>
      <p v-else v-html="error" class="error-text"></p>
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
  watch,
  computed,
  onMounted
} from 'vue'
import Character from '../components/Character.vue'
import Search from '../components/Search.vue'
import Pagination from '../components/Pagination.vue'

export default {
  name: 'Characters',
  components: {
    Character,
    Search,
    Pagination
  },
  setup() {
    const route = useRoute()
    const api = 'https://rickandmortyapi.com/api/character/'
    const data = reactive({
      qty: 20,
      currentPage: parseInt(route.params.page, 10),
      search: route.query.name,
      information: {},
      characters: [],
      error: '',
      nextPage: computed(() => {
        return data.currentPage + 1
      })
    })

    watch(
      () => route.query.name,
      async (search) => {
        if (!search) {
          data.search = search
          await loadPage(data.currentPage)
        }
      }
    )

    onMounted(async () => {
      await loadPage(data.currentPage)
    })

    const loadPage = async (page) => {
      try {
        const response = await axios.get(`${api}?page=${page}&count=${data.qty}${data.search ? `&name=${data.search}` : ''}`)


        if (response.data) {
          const {
            info,
            results
          } = response.data

          data.information = { ...info }
          data.characters = results
        }
      } catch (error) {
        if (error.response.data.error) {
          data.error = `This is quite the pickle, Morty...<br><span class="pickle">${data.search}</span> doesn't exist in this universe!`
        }

        console.error('Error happened while fetching via API', error)
      }
    }

    const getCharacterIndex = (index) => {
      return (index + 1) + (data.qty * (data.currentPage - 1))
    }

    const toggleModal = (data) => {
      console.log(data)
    }

    const loadNextPage = async (nextPage) => {
      data.currentPage = nextPage
      await loadPage(nextPage)
    }

    return {
      ...toRefs(data),
      loadNextPage,
      toggleModal,
      getCharacterIndex
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

.error-text {
  color: var(--brown);
}

.pickle {
  text-transform: uppercase;
  color: var(--red);
  font-weight: var(--medium-font-weight);
}
</style>
