<template>
  <Modal>
    <div
      v-if="!loading && character.status"
      :class="[`character--${character.status.toLowerCase()}`, `character--${character.id}`]"
      class="details"
    >
      <figure :class="{ 'avatar-loading': avatarLoading[character.id] }" class="figure">
        <img
          @load="onAvatarLoaded"
          :src="character.image"
          :alt="`${character.name} image`"
          class="figure__asset avatar"
        />
        <figcaption class="figure__caption">
          <div class="tag tag--status">{{ character.status }}</div>
          <div class="tag" :class="`tag--${getTypeSlug(character.species)}`">{{ character.species }}</div>
        </figcaption>
      </figure>
      <div class="details__info">
        <template v-for="(val, key) in character" :key="`${character.id}-info-${key}`">
          <div v-if="getInfo(key)" class="row">
            <div class="col col-heading">{{ getInfo(key).key }}</div>
            <div :class="`col--${key}`" class="col col-value">{{ getInfo(key).val }}</div>
          </div>
        </template>
      </div>
      <div class="details__episodes">
        <button @click="toggleEpisodes()" class="button episodes__action">
          {{ expanded ? 'Hide' : 'Show' }} {{ character.episode.length }} episodes {{ expanded ? '-' : '+' }}
        </button>
        <transition name="fade">
          <Episodes v-show="expanded" :loading="loadingEpisodes" :expanded="expanded" :episodes="episodes" />
        </transition>
      </div>
    </div>
    <Loader v-else class="details__loader" />
  </Modal>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import axios from 'axios'
import eventBus from '@/plugins/eventBus'
import utils from '@/mixin'
import Episodes from '@/components/Episodes.vue'
import Loader from '@/components/Loader.vue'
import Modal from '@/components/Modal.vue'

export default {
  name: 'Details',
  components: {
    Episodes,
    Loader,
    Modal
  },
  setup() {
    const api = process.env.VUE_APP_API_ROOT
    const data = reactive({
      id: 0,
      character: {},
      expanded: false,
      episodes: [],
      loading: true,
      loadingEpisodes: true,
      avatarLoading: {}
    })

    onMounted(() => {
      eventBus.$on('loadCharacter', (character) => {
        if (data.character.id !== character.id) {
          data.character = {}
          data.expanded = false
          data.episodes = []
          data.loading = true
          data.avatarLoading = {
            [character.id]: true
          }

          loadCharacter(character)
        }

        eventBus.$emit('onModalOpen', true)
      })
    })

    const loadCharacter = async (target) => {
      try {
        const response = await axios.get(`${api}${target.id}`)

        if (response.data) {
          data.character = response.data
          data.loading = false
        }
      } catch (error) {
        if (error.response.data.error) {
          data.error = `<span class="pickle">${target.name}</span> must be a myth... We can't find anything!`
        }

        console.error('Error happened while fetching via API', error)
      }
    }

    const loadEpisolde = async (url) => {
      try {
        const response = await axios.get(url)

        if (response.data) {
          return response.data
        }
      } catch (error) {
        if (error.response.data.error) {
          return {
            error: error.response.data.error
          }
        }

        console.error('Error happened while fetching via API', error)
      }
    }

    const toggleEpisodes = async () => {
      if (data.expanded) {
        data.expanded = false
      } else {
        data.expanded = true

        if (!data.episodes.length) {
          for (let i = 0; i < data.character.episode.length; i++) {
            const url = data.character.episode[i]

            const episode = await loadEpisolde(url)

            if (episode.error) {
              console.log(episode.error)
            } else {
              data.episodes.push(episode)
            }
          }

          data.loadingEpisodes = false
        }
      }
    }

    const getInfo = (attr) => {
      switch (attr) {
        case 'name':
          return {
            key: 'Name',
            val: data.character.name
          }
        case 'gender':
          return {
            key: 'Gender',
            val: data.character.gender
          }
        case 'location':
          return {
            key: 'Location',
            val: data.character.location.name
          }
        case 'origin':
          return {
            key: 'Origin',
            val: data.character.origin.name
          }
        default:
          return false
      }
    }

    const onAvatarLoaded = () => {
      data.avatarLoading = {
        ...data.avatarLoading,
        [data.character.id]: false
      }
    }

    return {
      ...toRefs(data),
      ...utils(),
      getInfo,
      toggleEpisodes,
      onAvatarLoaded
    }
  }
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0);
}

.details {
  @include medium-up {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: var(--spacing-half);
  }
}

.details__loader {
  margin-left: auto;
  margin-right: auto;
}

.figure {
  --figure-w-s: 80%;
  --figure-w: 40%;

  position: relative;
  max-width: var(--figure-w-s);
  margin-bottom: var(--spacing);
  margin-left: auto;
  margin-right: auto;

  @include medium-up {
    margin: 0;
    width: var(--figure-w);
  }

  &.avatar-loading {
    height: 0;
    padding-bottom: var(--figure-w-s);
    background-color: var(--grey-light);

    @include medium-up {
      margin: 0;
      padding-bottom: var(--figure-w);
    }
  }
}

.figure__asset {
  z-index: 1;
  position: relative;
  display: block;

  .character--dead & {
    opacity: 0.4;
  }
}

.figure__caption {
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: var(--spacing-quarter);
  background: rgba(var(--black-rgb), 0.6);

  .tag {
    margin-top: 0;

    @include medium-up {
      font-size: var(--body-font-size);
    }
  }
}

.tag {
  & + .tag {
    margin-left: var(--spacing-half);
  }
}

@keyframes glow {
  0% {
    text-shadow: 0 0 1px var(--white), 0 0 2px var(--red), 0 0 3px var(--pink-light), 0 0 4px var(--pink-light);
  }

  100% {
    text-shadow: 0 0 2px var(--pink-light), 0 0 3px var(--white), 0 0 4px var(--white), 0 0 5px var(--white);
  }
}

.tag--status {
  border: none;
  background: none;
  font-size: var(--body-font-size-small);
  font-weight: var(--medium-font-weight);

  .character--alive & {
    color: var(--pink-light);
    animation: glow 1s ease-in-out infinite alternate;
  }

  .character--dead & {
    color: var(--grey-light);
  }
}

.details__info {
  @include medium-up {
    margin: 0;
    width: calc(60% - var(--spacing));
  }
}

.row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  &:first-of-type {
    .col-value {
      border-top: 1px solid var(--blue-dark);
    }

    .col-heading {
      border-bottom: 1px solid var(--blue-dark);
      border-top-color: var(--blue-dark);
    }
  }
}

.col {
  align-self: stretch;
  padding: var(--spacing-quarter) var(--spacing-half);
  border: 1px solid var(--blue-dark);
}

.col-heading {
  width: 40%;
  border-bottom: none;
  border-top-color: var(--white);
  background-color: var(--blue-dark);
  color: var(--white);
}

.col-value {
  width: 60%;
  border-top: none;
}

.col--name {
  font-weight: var(--medium-font-weight);
}

.details__episodes {
  text-align: center;

  @include medium-up {
    width: 100%;
  }
}

.episodes__action {
  overflow: hidden;
  display: inline-flex;
  max-width: 100%;
  padding: var(--spacing-half) var(--spacing);
  border-radius: 4px;
  margin: var(--spacing) auto;
  background-color: var(--green);

  &:focus {
    outline-color: var(--green-dark);
  }
}
</style>
