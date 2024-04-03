<template id="custom-select-template">
  <div class="custom-select" ref="select">
    <input v-if="false">
    <div class="select-styled" @click="toggleOptions">{{ selectedOption }}</div>
    <ul class="select-options" v-show="isOpen">
      <li v-for="option in options" :key="option.value" @click="selectOption(option)">{{ option.text }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SelectApp',
  props: ["options", 'selectedOption', 'name'],
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleOptions() {
      this.isOpen = !this.isOpen;
      const onClickOutside = e => this.isOpen = this.$refs.select.contains(e.target) && this.isOpen;
      document.addEventListener('click', onClickOutside);
      this.$on('hook:beforeDestroy', () => document.removeEventListener('click', onClickOutside));
    },
    selectOption(option) {
      this.isOpen = false;
      this.$emit('selectOption', {
        selectedOption: option.text,
        name: this.name,
      });
    },
  }

}
</script>

<style lang="css">
@import "./../assets/style.css";
</style>