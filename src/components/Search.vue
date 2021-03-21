<template>
  <form action="" class="search form" @submit.prevent="searchCharacters()">
    <div class="field__row">
      <label for="character-search" class="label">Search characters by name</label>
      <div class="field__group">
        <input
          id="character-search"
          type="search"
          name="name"
          aria-label="Search using character name"
          placeholder="Type in name"
          class="field field--text"
          :value="search"
          @input="updateSearchKey($event.target.value)"
        />
        <button type="submit" class="submit">
          {{ search && search !== '' ? 'Go' : 'Feeling lucky?' }}
        </button>
      </div>
    </div>
    <div v-if="key" class="field__row search-keys">
      <router-link :to="{ path: '/', query: {} }" class="clear-search" title="Click to clear search">
        {{ key }}
      </router-link>
    </div>
  </form>
</template>

<script>
import { reactive, toRefs, watch } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup(props, { emit }) {
    // const router = useRouter()
    const route = useRoute()
    const data = reactive({
      search: '',
      key: route.query.name
    })

    const updateSearchKey = (val) => {
      data.search = val
    }

    const searchCharacters = () => {
      emit('onSearchChange', data.search)
    }

    watch(
      () => route.query.name,
      (search) => {
        data.key = search
        data.search = search
      }
    )

    return {
      ...toRefs(data),
      updateSearchKey,
      searchCharacters
    }
  }
}
</script>

<style lang="scss">
.search {
  --submit-width: 100px;

  margin-bottom: var(--spacing-middle);
}

.field__group {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: nowrap;
}

.label {
  display: block;
  width: 100%;
  margin-bottom: var(--spacing-quarter);
  font-weight: var(--medium-font-weight);
  color: var(--charcoal);
}

.field__row {
  & + .field__row {
    margin-top: var(--spacing-half);
  }
}

.field {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
}

.field--text {
  width: calc(100% - var(--submit-width) - var(--spacing-quarter));
  padding: var(--spacing-quarter);
  border: 1px solid var(--black);
  border-radius: 0;
  box-shadow: none;
  font-size: var(--body-font-size);

  &:focus {
    outline: none;
    border-color: var(--blue);
    box-shadow: 0px 0px 2px var(--blue);
  }
}

.submit {
  display: inline-flex;
  width: var(--submit-width);
  padding: var(--spacing-quarter) var(--spacing-half);
  align-self: stretch;
  align-items: center;
  justify-content: center;
  text-shadow: var(--white) 0px 0px 1px;
  background: var(--charcoal);
  font-weight: var(--medium-font-weight);
  font-size: var(--body-font-size-small);
  color: var(--blue);
}

.clear-search {
  position: relative;
  display: inline-block;
  padding: 3px var(--spacing-half) 3px var(--spacing);
  border: 2px solid var(--blue-dark);
  line-height: 1;

  &:before {
    content: 'x';
    position: absolute;
    top: 50%;
    left: var(--spacing-quarter);
    transform: translateY(-50%);
    font-weight: var(--bold-font-weight);
    color: var(--blue-dark);
    line-height: 1;
    cursor: pointer;
  }
}
</style>
