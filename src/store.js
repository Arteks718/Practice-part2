import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state: {
    count: 0,
    theme: "white",
    user: null,
  },
  mutations: {
    setCount: (state, count) => (state.count = count),
    setTheme: (state) => {
      if (state.theme == "white") state.theme = "black";
      else if (state.theme == "black") state.theme = "white";
    },
    setUser: (state, user) => (state.user = user),
  },
  getters: {
    getCount: (state) => {
      return state.count;
    },
    getTheme: (state) => {
      return state.theme;
    },
    getUser: (state) => {
      return state.user;
    }
  },
  plugins: [createPersistedState()],
});
export default store;
