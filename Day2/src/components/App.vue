<template>
  <div id="app">
    <input type="text" name="search" v-model="search" /><br />
    <table class="table table-dark">
      <tr v-for="(item, index) in students" v-bind:key="item._id">
        <td>{{ item.name }}</td>
        <td><input type="checkbox" v-model="item.isDonePr" /></td>
        <td>{{ item.group }}</td>
        <td>
          <i class="fas fa-edit" @click="updateShow(item._id, index)"></i>
        </td>
        <td><a href="#" @click="deleteStudent(item._id)">Видалити</a></td>
      </tr>
    </table>
    <section>
      <input v-model="student.name" />
      <input type="checkbox" v-model="student.isDonePr" />
      <select v-model="student.group">
        <option value="RPZ 19 1/9">RPZ 19 1/9</option>
        <option value="RPZ 19 2/9">RPZ 19 2/9</option>
      </select>
      <button @click="addStudent()">Add student</button>
    </section>

    <section>
      <input v-model="tempStudents.name" />
      <input type="checkbox" v-model="tempStudents.isDonePr" />
      <select v-model="tempStudents.group">
        <option value="RPZ 19 1/9">RPZ 19 1/9</option>
        <option value="RPZ 19 2/9">RPZ 19 2/9</option>
      </select>
      <button @click.prevent="updateStudent()">Update student</button>
    </section>

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
import axios from "axios";

export default {
  data() {
    return {
      students: [],
      tempStudents: [],
      tempIndex: "",
      newmark: "",
      newgroup: "",
      newisDonePr: "",
      newname: "",
      search: "",
      piece: "",
      student: { name: "", isDonePr: false, group: "" },
      convertFrom: "",
      convertTo: "",
      amount: "",
      rate: "",
    };
  },
  mounted() {
    axios.get("http://34.82.81.113:3000/students").then((response) => {
      this.students = response.data;
    });
  },
  methods: {
    addStudent() {
      axios
        .post("http://34.82.81.113:3000/students", {
          ...this.student,
        })
        .then((response) => {
          this.students.push(response.data);
        });
    },
    deleteStudent(studId) {
      axios
        .delete(`http://34.82.81.113:3000/students/${studId}`)
        .then((response) => {
          this.students = this.students.filter((elem) => {
            return elem._id !== studId;
          });
        });
    },
    updateShow(studId, index) {
      this.tempStudents = {
        ...this.students.find((elem) => elem._id == studId),
      };
      this.tempIndex = index;
    },
    updateStudent() {
      axios
        .put(`http://34.82.81.113:3000/students/${this.tempStudents._id}`, {
          ...this.tempStudents,
        })
        .then((response) => {
          this.students[this.tempIndex] = response.data;
          this.tempStudents = [];
        });
    },
    getCurrency() {
      axios
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
  },
};
</script>

<style scoped></style>
