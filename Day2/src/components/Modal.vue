<template>
  <transition name="fade">
    <div class="vue-modal" v-show="open">
      <transition name="slide">
        <div class="vue-modal-inner" v-show="open">
          <div class="vue-modal-content">
            <slot />
            <button type="button" @click="$emit('close')">Close</button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { onMounted, onUnmounted } from "vue";
export default {
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  setup(_, { emit }) {
    const close = () => {
      emit("close");
    };

    const handleKeyup = (event) => {
      if (event.keyCode === 27) {
        close();
      }
    };

    onMounted(() => document.addEventListener("keyup", handleKeyup));
    onUnmounted(() => document.removeEventListener("keyup", handleKeyup));

    return { close };
  },
};
</script>

<style scoped>
@import "../assets/modal-style.css";
</style>
