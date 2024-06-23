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
    async postAlunos(context, alunoData) {
      try {
        const response = await axios.post("http://localhost:8802/", alunoData);
        return response.data;
      } catch (error) {
        throw new Error("Falha ao postar dados do aluno: " + error.message);
      }
    },
  },
});

export default store;
