import axios from "axios";
import { createStore } from "vuex";

// Crie um novo store instance.
const store = createStore({
  state: {
    alunos: [],
  },
  mutations: {
    setAlunos(state, alunos) {
      state.alunos = alunos;
    },
  },
  actions: {
    async getAlunos({ commit }) {
      const response = await axios.get("http://localhost:8802/");
      commit("setAlunos", response.data);
    },
  },
});

export default store;
