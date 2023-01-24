<template>
  <div>
    <input
      v-model="inputUser"
      type="text"
      placeholder="ім'я студента"
      required
    />
    <button @click="login">Ввійти</button>
    <p v-if="isUser">Такого студента не існує</p>
  </div>
</template>

<script>
const API_HOST = process.env.API_HOST;
export default {
  data() {
    return {
      inputUser: "",
      isUser: false,
    };
  },
  methods: {
    login() {
      this.axios
        .get(`${API_HOST}/students/name/` + this.inputUser)
        .then((response) => {
          if (response.data === null || response.data.name == "CastError") {
            setTimeout(() => {
              this.isUser = false;
            }, 5000);
            this.isUser = true;
            this.inputUser = "";
            return;
          }
          this.$store.commit("setUser", response.data);
          this.$router.push("/");
        });
    },
  },
};
</script>

<style module></style>
