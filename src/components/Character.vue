<template>
  <div class="character" :class="[`character--${character.status.toLowerCase()}`, `character--${character.id}`]">
    <div class="character__id">{{ index }}.</div>
    <img :src="character.image" :alt="`${character.name} avatar image`" class="avatar" />
    <button @click="toggleCharacter()" class="character__action">
      <div class="character__name">
        {{ character.name }}
      </div>
      <div class="tag" :class="`tag--${type}`">{{ species }}</div>
    </button>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from 'vue'

export default {
  props: {
    character: {
      type: Object,
      default: () => {
        return {}
      }
    },
    index: {
      type: Number,
      default: 1
    }
  },
  setup(props, { emit }) {
    const cData = reactive({
      species: props.character.species,
      type: computed(() => {
        return cData.species.toLowerCase().replace(/\s/g, '')
      })
    })

    const toggleCharacter = () => {
      emit('onModalOpen', { id: props.character.id })
    }

    return {
      ...toRefs(cData),
      toggleCharacter
    }
  }
}
</script>

<style lang="scss">
.character {
  --avatar-size-s: 50px;
  --avatar-size: 100px;

  position: relative;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  padding-left: var(--spacing);

  .item-large & {
    padding-left: calc(var(--spacing) + var(--spacing-quarter));
  }
}

.character__id {
  position: absolute;
  top: 50%;
  left: 0;
  margin-right: var(--spacing-half);
  transform: translateY(-50%);
  font-family: var(--heading-font-family);
  font-size: var(--body-font-size-small);
}

.avatar {
  width: var(--avatar-size-s);
  height: auto;
  // margin-right: var(--spacing-half);

  .character--1 & {
    box-shadow: 0px 0px 10px var(--blue);
  }

  .character--2 & {
    box-shadow: 0px 0px 10px var(--brown);
  }
}

.character__action {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: calc(100% - var(--avatar-size-s) - var(--spacing-half));
  padding: 0;
  text-align: left;
}

.character__name {
}

.tag {
  padding: 1px 5px;
  border: 1px solid var(--blue);
  border-radius: 4px;
  margin-top: var(--spacing-quarter);
  background: rgba(var(--blue-rgb), 0.2);
  font-size: var(--body-font-size-extra-small);
  color: var(--blue);
  white-space: nowrap;

  &--alien {
    border-color: var(--green);
    background: rgba(var(--green-rgb), 0.2);
    color: var(--green);
  }

  &--mythologicalcreature {
    border-color: var(--green-dark);
    background: rgba(var(--green-dark-rgb), 0.2);
    color: var(--green-dark);
  }

  &--unknown {
    border-color: var(--brown);
    background: rgba(var(--brown-rgb), 0.2);
    color: var(--brown);
  }

  &--humanoid {
    border-color: var(--blue-dark);
    background: rgba(var(--blue-dark-rgb), 0.2);
    color: var(--blue-dark);
  }

  &--cronenberg {
    border-color: var(--pink);
    background: rgba(var(--pink-rgb), 0.2);
    color: var(--pink);
  }

  &--disease {
    border-color: var(--red);
    background: rgba(var(--red-rgb), 0.2);
    color: var(--red);
  }

  &--robot {
    border-color: var(--yellow);
    background: rgba(var(--yellow-rgb), 0.2);
    color: var(--yellow);
  }
}
</style>
