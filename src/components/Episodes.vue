<template>
  <ol v-if="!loading && error === ''" class="episodes">
    <li v-for="(ep, index) in episodes" :key="`episode-${ep.episode}-${ep.id}`" class="episode">
      <div class="episode__id">{{ index + 1 }}. {{ ep.episode }}</div>
      <div class="episode__date">{{ ep.air_date }}</div>
      <div class="episode__name">{{ ep.name }}</div>
    </li>
  </ol>
  <p v-else-if="!loading && error !== ''" class="episodes--error">{{ error }}</p>
  <p v-else class="h2">Loading...</p>
</template>

<script>
export default {
  name: 'Episodes',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    expanded: {
      type: Boolean,
      default: false
    },
    episodes: {
      type: Array,
      default: () => []
    },
    error: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.episodes {
  text-align: left;
  transform-origin: center top;
}

.episode {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;

  & + .episode {
    padding-top: var(--spacing-half);
    border-top: 1px solid var(--grey-light);
    margin-top: var(--spacing-half);
  }
}

.episode__id {
  font-size: var(--body-font-size-small);
  color: var(--green-dark);
  font-weight: var(--medium-font-weight);
}

.episode__date {
  text-align: right;
  font-size: var(--body-font-size-small);
  color: var(--brown);
  font-weight: var(--medium-font-weight);
}

.episode__name {
  width: 100%;
  margin-top: var(--spacing-quarter);
  font-family: var(--heading-font-family);
  font-weight: var(--medium-font-weight);
}
</style>
