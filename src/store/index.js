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
      try {
        const response = await axios.get("http://localhost:8802/");
        commit("setAlunos", response.data);
      } catch (error) {
        throw new Error("Falha ao obter alunos: " + error.message);
      }
    },
    async updateAlunos({ dispatch }, { id, alunoData }) {
      try {
        await axios.put(`http://localhost:8802/${id}`, alunoData);
        await dispatch("getAlunos"); // Atualiza a lista de alunos chamando getAlunos
      } catch (error) {
        throw new Error("Falha ao atualizar dados do aluno: " + error.message);
      }
    },
    async deleteAlunos({ dispatch }, id) {
      try {
        await axios.delete(`http://localhost:8802/${id}`);
        await dispatch("getAlunos"); // Atualiza a lista de alunos chamando getAlunos
      } catch (error) {
        throw new Error("Falha ao excluir dados do aluno: " + error.message);
      }
    },
    async postAlunos({ dispatch }, alunoData) {
      try {
        await axios.post(`http://localhost:8802/`, alunoData);
        await dispatch("getAlunos"); // Atualiza a lista de alunos chamando getAlunos
      } catch (error) {
        throw new Error("Falha ao adicionar dados do aluno: " + error.message);
      }
    },
  },
});

export default store;
