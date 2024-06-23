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
    async updateAlunos({ commit }, { id, alunoData }) {
      try {
        const response = await axios.put(
          `http://localhost:8802/${id}`,
          alunoData
        );
        commit("setAlunos", response.data); // Atualiza a lista de alunos no state
        return response.data; // Retorna os dados atualizados do aluno
      } catch (error) {
        throw new Error("Falha ao atualizar dados do aluno: " + error.message);
      }
    },
    async deleteAlunos({ commit }, id) {
      try {
        const response = await axios.delete(`http://localhost:8802/${id}`);
        commit("setAlunos", response.data); // Atualiza a lista de alunos no state
        return response.data; // Retorna os dados atualizados do aluno
      } catch (error) {
        throw new Error("Falha ao atualizar dados do aluno: " + error.message);
      }
    },
  },
});

export default store;
