<template>
  <Modal>
    <div
      v-if="!loading && character.status"
      :class="[`character--${character.status.toLowerCase()}`, `character--${character.id}`]"
      class="details"
    >
      <figure class="figure">
        <img class="figure__asset avatar" :src="character.image" :alt="`${character.name} image`" />
        <figcaption class="figure__caption">
          <div class="tag tag--status">{{ character.status }}</div>
          <div class="tag" :class="`tag--${getTypeSlug(character.species)}`">{{ character.species }}</div>
        </figcaption>
      </figure>
      <div class="deatils__info">
        <template v-for="(val, key) in character" :key="`${character.id}-info-${key}`">
          <div v-if="getInfo(key)" class="row">
            <div class="col col-heading">{{ getInfo(key).key }}</div>
            <div class="col col-value">{{ getInfo(key).val }}</div>
          </div>
        </template>
      </div>
    </div>
    <Loader v-else />
  </Modal>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import axios from 'axios'
import eventBus from '@/plugins/eventBus'
import utils from '@/mixin'
import Loader from '@/components/Loader.vue'
import Modal from '@/components/Modal.vue'

export default {
  naem: 'Details',
  components: {
    Loader,
    Modal
  },
  setup() {
    const api = process.env.VUE_APP_API_ROOT
    const data = reactive({
      id: 0,
      character: {},
      loading: false
    })

    onMounted(() => {
      eventBus.$on('loadCharacter', (character) => {
        loadCharacter(character)
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

    return {
      ...toRefs(data),
      ...utils(),
      getInfo
    }
  }
}
</script>

<style lang="scss">
.figure {
  position: relative;
  max-width: 80%;
  margin-bottom: var(--spacing);
  margin-left: auto;
  margin-right: auto;
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

.row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  &:first-of-type {
    .col-heading {
      border-top-color: var(--blue-dark);
    }
  }

  &:last-of-type {
    .col {
      border-bottom: 1px solid var(--blue-dark);
    }
  }
}

.col {
  align-self: stretch;
  padding: var(--spacing-quarter) var(--spacing-half);
  border: 1px solid var(--blue-dark);
  border-bottom: none;
}

.col-heading {
  width: 40%;
  border-top-color: var(--white);
  background-color: var(--blue-dark);
  color: var(--white);
}

.col-value {
  width: 60%;
}
</style>
