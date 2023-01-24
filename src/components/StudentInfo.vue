<template>
  <div class="container">
    <div class="item-image">
      <img :src="student.photo" @click="isOpen = true" alt="" />
    </div>
    <div class="item-info">
      <div>
        <h3>
          Студент: <span>{{ student.name }}</span>
        </h3>
        <h3>
          Наявність ПР: <span>{{ isDontePrOfStudent }}</span>
        </h3>
        <h3>
          Група: <span>{{ student.group }}</span>
        </h3>
        <h3>
          Кількість студентів : <span>{{ studentsCount }}</span>
        </h3>
      </div>
      <button><a href="#">Повернутися на головну</a></button>
    </div>
  </div>

  <Modal :open="isOpen" @close="isOpen = !isOpen">
    <img id="modal-image" :src="student.photo" @click="isOpen = true" alt="" />
  </Modal>
</template>

<style></style>

<script>
import Modal from "./Modal.vue";
import { ref } from "vue";

const API_HOST = process.env.API_HOST;

export default {
  components: {
    Modal,
  },
  props: {
    id: "",
  },
  data() {
    return {
      student: {},
    };
  },
  computed: {
    isDontePrOfStudent() {
      return this.student.isDonePr
        ? "Практина робота здана"
        : "Практина робота не здана";
    },
    studentsCount() {
      return this.$store.getters.getCount;
    },
  },
  setup() {
    const isOpen = ref(false);
    return { isOpen };
  },
  mounted: function () {
    this.axios.get(`${API_HOST}/students/` + this.id).then((response) => {
      this.student = response.data;
    });
  },
};
</script>

<style scoped>
@import "../assets/students-info-style.css";
@import "../assets/style.css";
</style>
