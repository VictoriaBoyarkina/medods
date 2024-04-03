<template>
    <div v-if="show" class="toast">
      {{ message }}
    </div>
  </template>
  
  <script>
  export default {
    name: 'ToastNotify',
    props: {
      message: String,
      duration: {
        type: Number,
        default: 3000
      }
    },
    data() {
      return {
        show: true
      };
    },
    watch: {
      message(newVal) {
        if (newVal) {
          this.show = true;
          setTimeout(() => {
            this.show = false;
          }, this.duration);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .toast {
    position: fixed;
    top: 20px;
    right: 20px;
    transform: translateX(-50%);
    background-color: #333;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    z-index: 1000;
  }
  </style>