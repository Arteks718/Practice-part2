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
import axios from "axios";
import Modal from "./Modal.vue";
import { ref } from "vue";

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
  },
  setup() {
    const isOpen = ref(false);
    return { isOpen };
  },
  mounted: function () {
    axios
      .get("http://34.82.81.113:3000/students/" + this.id)
      .then((response) => {
        this.student = response.data;
      });
  },
};
</script>

<style scoped>
#modal-image {
  width: 100%;
}
.container {
  display: flex;
  margin-top: 50px;
}
.container > * {
  margin: 0 25px;
}
.item-image,
.item-info {
  min-width: 400px;
}
.item-image img {
  max-width: 100%;
}
.item-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.item-info button {
  height: 35px;
  width: 50%;
  padding: 0;
  margin: 0;
}
.item-info a {
  display: block;
  height: 100%;
  width: 100%;
  vertical-align: middle;
  text-decoration: none;
  font-size: 16px;
  color: black;
}
.item-info > div > * {
  margin: 20px 0;
}
span {
  font-weight: 400;
}
</style>
