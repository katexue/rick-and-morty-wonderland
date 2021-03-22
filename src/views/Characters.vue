<template>
  <section class="characters">
    <div class="container">
      <Search @onSearchChange="searchCharacters" />
      <h1 class="heading">Characters in Rick and Morty</h1>
      <ul v-if="characters.length && !loading" :class="{ 'list-ready': !loading }" class="list">
        <li
          v-for="(character, index) in characters"
          :key="`character-${character.id}`"
          :class="{
            'item-large': currentPage > 4
          }"
          class="list__item"
        >
          <Character :character="character" :index="getCharacterIndex(index)" />
        </li>
      </ul>
      <p v-if="!characters.length && !loading" v-html="error" class="error-text"></p>
      <Loader v-if="loading" />
      <Pagination
        :currentPage="currentPage"
        :pages="information.pages"
        :nextPage="nextPage"
        @onPageChange="loadNextPage"
      />
    </div>
  </section>
  <Details />
</template>

<script>
import axios from 'axios'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import { reactive, toRefs, computed, onMounted } from 'vue'
import Character from '@/components/Character.vue'
import Search from '@/components/Search.vue'
import Pagination from '@/components/Pagination.vue'
import Loader from '@/components/Loader.vue'
import Details from '@/components/Details.vue'
import eventBus from '@/plugins/eventBus'

export default {
  name: 'Characters',
  components: {
    Character,
    Search,
    Pagination,
    Details,
    Loader
  },
  setup() {
    return charactersSetup()
  }
}

const charactersSetup = () => {
  const router = useRouter()
  const route = useRoute()
  const api = process.env.VUE_APP_API_ROOT
  const pageTitle = 'Rick and Morty Wonderland'
  const data = reactive({
    loading: true,
    qty: 20,
    currentPage: parseInt(route.params.page, 10),
    search: route.query.name || '',
    information: {},
    characters: [],
    error: '',
    nextPage: computed(() => {
      return data.currentPage + 1
    })
  })

  document.title = process.env.VUE_APP_TITLE_PREFIX ? `${process.env.VUE_APP_TITLE_PREFIX} ${pageTitle}` : pageTitle

  onMounted(async () => {
    await loadPage(data.currentPage)
  })

  onBeforeRouteUpdate(async (to, from) => {
    if (to.query.name !== from.query.name) {
      data.search = to.query.name || ''
      data.currentPage = 1
      await loadPage(data.currentPage)
    } else if (to.params.page !== from.params.page) {
      window.scrollTo({ top: 0 })
      data.currentPage = parseInt(to.params.page, 10)
      await loadPage(data.currentPage)
    }
  })

  const searchCharacters = (key) => {
    if (key && key !== '') {
      data.search = key
      data.currentPage = 1
      loadNextPage(1)
    } else {
      const randomId = Math.floor(Math.random() * data.information.count) + 1

      eventBus.$emit('loadCharacter', {
        id: randomId,
        name: '"I\'m feeling lucky!"'
      })
    }
  }

  const loadPage = async (page) => {
    data.loading = true

    try {
      const response = await axios.get(
        `${api}?page=${page}&count=${data.qty}${data.search ? `&name=${data.search}` : ''}`
      )

      if (response.data) {
        const { info, results } = response.data

        data.information = { ...info }
        data.characters = results
      }
    } catch (error) {
      if (error.response.data.error) {
        data.error = `This is quite the pickle, Morty...<br><span class="pickle">${data.search}</span> doesn't exist in this universe!`
      }

      console.error('Error happened while fetching via API', error)
    } finally {
      data.loading = false
    }
  }

  const loadNextPage = async (nextPage) => {
    // data.currentPage = nextPage
    // data.loading = true
    // await loadPage(nextPage)
    const newRoute = {
      name: 'Characters',
      params: {
        page: nextPage
      }
    }

    if (data.search) {
      newRoute.query = {
        name: data.search
      }
    } else if (newRoute.query) {
      delete newRoute.query
    }

    router.push(newRoute)
  }

  const getCharacterIndex = (index) => {
    return index + 1 + data.qty * (data.currentPage - 1)
  }

  // const toggleModal = (data) => {
  //   console.log(data)
  // }

  return {
    ...toRefs(data),
    loadNextPage,
    // toggleModal,
    getCharacterIndex,
    searchCharacters
  }
}
</script>

<style lang="scss">
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
