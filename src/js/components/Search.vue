<template>
  <form action="" class="form">
    <div class="field__row">
      <label for="character-search" class="label">Search characters</label>
      <div class="field__group">
        <input
          id="character-search"
          type="search"
          name="search"
          aria-label="Search using character name"
          placeholder="Type in character name to search"
          class="field field--text"
        />
        <button type="submit">
          {{ Go}}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  setup() {
    
  }
}
</script>
