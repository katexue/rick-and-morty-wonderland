<template>
  <div class="character" :class="[`character--${character.status.toLowerCase()}`, `character--${character.id}`]">
    <div class="character__id">{{ index }}.</div>
    <div @click="toggleCharacter()" class="avatar-wrap">
      <img :src="character.image" :alt="`${character.name} avatar image`" class="avatar" />
    </div>
    <button @click="toggleCharacter()" class="character__action">
      <div class="character__name">
        {{ character.name }}
      </div>
      <div class="tag" :class="`tag--${getTypeSlug(character.species)}`">{{ species }}</div>
    </button>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import eventBus from '@/plugins/eventBus'
import utils from '@/mixin'

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
  setup(props) {
    const data = reactive({
      species: props.character.species
    })

    const toggleCharacter = () => {
      eventBus.$emit('onModalOpen', true)
      eventBus.$emit('loadCharacter', {
        id: props.character.id,
        name: props.character.name
      })
    }

    return {
      ...toRefs(data),
      ...utils(),
      toggleCharacter
    }
  }
}
</script>

<style lang="scss">
.character {
  --avatar-size-s: 50px;
  --avatar-size: 80px;

  position: relative;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  padding-left: var(--spacing);

  @include small-up {
    padding-left: var(--spacing-middle);
  }

  &--dead {
    .avatar-wrap {
      position: relative;
      &:before {
        content: 'Dead';
        z-index: 2;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: var(--grey-dark);
      }

      .avatar {
        z-index: 1;
        opacity: 0.4;
      }
    }
  }

  .item-large & {
    padding-left: calc(var(--spacing) + var(--spacing-quarter));

    @include small-up {
      padding-left: var(--spacing-double);
    }
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

  @include small-up {
    font-size: var(--body-font-size);
  }
}

.avatar-wrap {
  width: var(--avatar-size-s);

  @include medium-up {
    width: var(--avatar-size);
  }
}

.avatar {
  width: 100%;
  height: auto;

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

  @include medium-up {
    flex-direction: row;
    align-items: center;
    width: calc(100% - var(--avatar-size) - var(--spacing));
    padding: var(--spacing-half) 0;
  }
}

.character__name {
  // font-family: var(--heading-font-family);
  font-weight: var(--medium-font-weight);

  @include medium-up {
    font-size: 18px;
  }
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

  @include medium-up {
    margin-top: 0;
    margin-left: var(--spacing);
    font-size: var(--body-font-size-small);
  }
}
</style>
