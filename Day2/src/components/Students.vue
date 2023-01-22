<template>


    <div id="app">
      <h2>Кількість студентів: {{ studentsCount }}</h2>
      <table class="table table-dark">
        <tr>
          <th>ПІБ</th>
          <th>Наявність ПР</th>
          <th>Група</th>
          <th>Оновлення</th>
          <th>Видалення</th>
        </tr>
        <tr v-for="(item, index) in students" v-bind:key="item._id">
          <td>
            <router-link v-bind:to="'/student-info/' + item._id">
              {{ item.name }}
            </router-link>
          </td>
          <td><input type="checkbox" v-model="item.isDonePr" /></td>
          <td>{{ item.group }}</td>
          <td class="update">
            <i
              class="fas fa-edit"
              @click="updateShow(item._id, index), openBlockofUpdate()"
            ></i>
          </td>
          <td class="delete">
            <a href="#" id="deleteStudent" @click="deleteStudent(item._id)"
              >Видалити</a
            >
          </td>
        </tr>
      </table>
      <div class="functions">
        <div class="student">
          <button id="openBlock" @click="openBlockofAdd()">
            Додати нового студента
          </button>
          <div id="addStudent" v-if="isOpenBlockAdd">
            <div>
              <label>ПІБ студента</label>
              <input v-model="student.name" />
            </div>
            <div>
              <label for="pr">Наявність ПР</label>
              <input type="checkbox" v-model="student.isDonePr" />
            </div>
            <div>
              <label for="group">Група</label>
              <select v-model="student.group">
                <option value="RPZ 19 1/9">RPZ 19 1/9</option>
                <option value="RPZ 19 2/9">RPZ 19 2/9</option>
              </select>
            </div>
            <div>
              <label for="">Додати фото</label>
              <input type="text" v-model="student.photo" />
            </div>
            <button @click="addStudent()">Добавити</button>
          </div>
        </div>
        <div class="student">
          <button id="openBlock" @click="openBlockofUpdate()">
            Оновити студента
          </button>
          <div id="updateStudent" v-if="isOpenBlockUpdate">
            <div>
              <label>ПІБ студента</label>
              <input v-model="tempStudents.name" />
            </div>
            <div>
              <label for="pr">Наявність ПР</label>
              <input type="checkbox" v-model="tempStudents.isDonePr" />
            </div>
            <div>
              <label for="group">Група</label>
              <select v-model="tempStudents.group">
                <option value="RPZ 19 1/9">RPZ 19 1/9</option>
                <option value="RPZ 19 2/9">RPZ 19 2/9</option>
              </select>
            </div>
            <div>
              <label for="">Оновити фото</label>
              <input type="text" v-model="tempStudents.photo" />
            </div>
            <button @click.prevent="updateStudent()">Оновити</button>
          </div>
        </div>
      </div>

      <section></section>

      <section class="exchange">
        <h2>Currency Converter</h2>
        <article class="enterAmount">
          <label for="amount">Enter Amount:</label>
          <input type="number" name="amount" v-model="amount" />
        </article>
        <article class="convert">
          <label for="">Convert From:</label>
          <select name="from" id="" v-model="convertFrom">
            <option value="UAH">UAH</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
          <label for="">Convert To:</label>
          <select name="to" id="" v-model="convertTo">
            <option value="UAH">UAH</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </article>
        <button @click="getCurrency">Convert</button>
        <h3>Answer {{ rate }}</h3>
      </section>
    </div>
</template>

<script>
const API_HOST = process.env.API_HOST;

export default {
  props: {
    id: "",
  },
  data() {
    return {
      students: [],
      tempStudents: [],
      tempIndex: "",
      student: { name: "", isDonePr: false, group: "", photo: "" },
      convertFrom: "",
      convertTo: "",
      amount: "",
      rate: "",
      isOpenBlockAdd: false,
      isOpenBlockUpdate: false,
    };
  },
  mounted() {
    this.axios.get(`${API_HOST}/students`).then((response) => {
      this.students = response.data;
      this.$store.commit("setCount", this.students.length);
    });
  },
  computed: {
    studentsCount() {
      return this.$store.getters.getCount;
    },
    getTheme(){
      return this.$store.getters.getTheme;
    }
  },
  methods: {
    deleteStudent(studId) {
      this.axios.delete(`${API_HOST}/students/${studId}`).then((response) => {
        this.students = this.students.filter((elem) => {
          return elem._id !== studId;
        });
        this.$store.commit("setCount", this.students.length);
      });
    },
    addStudent() {
      this.axios
        .post(`${API_HOST}/students`, {
          ...this.student,
        })
        .then((response) => {
          this.students.push(response.data);
          this.isOpenBlockAdd = false;
          this.$store.commit("setCount", this.students.length);
        });
    },
    updateShow(studId, index) {
      this.tempStudents = {
        ...this.students.find((elem) => elem._id == studId),
      };
      this.tempIndex = index;
    },
    updateStudent() {
      this.axios
        .put(`${API_HOST}/students/${this.tempStudents._id}`, {
          ...this.tempStudents,
        })
        .then((response) => {
          this.students[this.tempIndex] = response.data;
          this.tempStudents = [];
          this.isOpenBlockUpdate = false;
        });
    },
    getCurrency() {
      this.axios
        .get(
          "https://api.apilayer.com/exchangerates_data/convert?to=" +
            this.convertTo +
            "&from=" +
            this.convertFrom +
            "&amount=1",
          {
            headers: {
              apikey: "0sjTljESXiA3z56QG2VZ0P0Rjp7wGkfg",
            },
          }
        )
        .then((data) => {
          console.log(data.data.info.rate);
          this.rate =
            this.amount +
            " " +
            this.convertFrom +
            " equals " +
            (data.data.info.rate * this.amount).toFixed(3) +
            " " +
            this.convertTo;
        });
    },
    openBlockofAdd: function () {
      this.isOpenBlockAdd = true;
    },
    openBlockofUpdate: function () {
      this.isOpenBlockUpdate = true;
    },

  },
};
</script>

<style scoped>
@import "../assets/students-style.css";
@import "../assets/style.css";
</style>
