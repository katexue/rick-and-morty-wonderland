<template>
  <section v-bind="$attrs" class="characters">
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
import { reactive, toRefs, computed, onMounted } from 'vue'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useStore } from 'vuex'
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
  const store = useStore()
  const pageTitle = 'Rick and Morty Wonderland'
  const data = reactive({
    qty: 20,
    currentPage: parseInt(route.params.page, 10),
    search: route.query.name || '',
    nextPage: computed(() => {
      return data.currentPage + 1
    })
  })

  document.title = process.env.VUE_APP_TITLE_PREFIX ? `${process.env.VUE_APP_TITLE_PREFIX} ${pageTitle}` : pageTitle

  onMounted(async () => {
    if (route.meta.reloadPage || !store.getters['characters/getCharacters'].length) {
      loadPage(data.currentPage)
    }
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
    await store.dispatch('characters/loadPage', {
      qty: data.qty,
      page: page,
      search: data.search
    })
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

  return {
    ...toRefs(data),
    loadNextPage,
    getCharacterIndex,
    searchCharacters,
    loading: computed(() => store.getters['characters/getLoadingStatus']),
    information: computed(() => store.getters['characters/getInformation']),
    characters: computed(() => store.getters['characters/getCharacters']),
    error: computed(() => store.getters['characters/getErrorMessage'])
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
