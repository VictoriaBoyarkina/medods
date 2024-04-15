<template id="custom-select-template">
  <div class="custom-select form-group-item tooltip" @keydown.enter="toggleOptionsKeyboard" ref="select" @keydown="handleArrows">
    <div class="select-styled" @click="toggleOptions" :class="{ invalid: error }">{{ selectedOption }}</div>
    <ul class="select-options" v-if="isOpen">
      <li
        v-for="option in options"
        :key="option.value"
        ref="optionRefs"
        tabindex='-1'
        @click="selectOption(option)"
        @keydown.enter="selectOption(option)"
      >{{ option.text }}</li>
    </ul>
    <div class="invalid-tooltip" v-if="error">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref, defineProps, getCurrentInstance } from 'vue';

const isOpen = ref(false);
const select = ref(null);
const optionRefs = ref([]);

const props = defineProps(['selectedOption', 'options', 'error', 'errorMessage', 'name']);

const onClickOutside = e => isOpen.value = select.value.contains(e.target) && isOpen.value;

const toggleOptions = () => {
  isOpen.value = !isOpen.value;
  document.addEventListener('click', onClickOutside);
};

const toggleOptionsKeyboard = (e) => {
  if (e.target === document.activeElement) {
    isOpen.value = !isOpen.value;
  }
  document.addEventListener('click', onClickOutside);
};

const handleArrows = (e) => {
  if (isOpen.value) {
    if (e.keyCode === 38 || e.keyCode === 40) {
      e.preventDefault();
      const focusedOptionIndex = getFocusedOptionIndex();
      let nextOptionIndex;
      if (e.keyCode === 38) {
        nextOptionIndex = (focusedOptionIndex - 1) < 0 ? props.options.length - 1 : focusedOptionIndex - 1
      } else {
        nextOptionIndex = (focusedOptionIndex + 1) < props.options.length ? focusedOptionIndex + 1 : 0;
      }
      const nextOptionRef = optionRefs.value[nextOptionIndex];
      if (nextOptionRef) {
        nextOptionRef.focus();
      }
    }
  }
};

const getFocusedOptionIndex = () => {
    for (let i = 0; i < props.options.length; i++) {
    const optionElement = optionRefs.value[i];
    if (optionElement && optionElement === document.activeElement) {
      return i;
    }
  }
  return -1; // No option is focused
};

const instance = getCurrentInstance();

const selectOption = (option) => {
  isOpen.value = false;
  instance.emit('selectOption', {
    selectedOption: option.text,
    name: props.name,
  });
};

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside);
});
</script>