<template>
  <div>
    <v-sheet class="mx-auto mt-10" max-width="300">
      <v-form @submit.prevent="submit">
        <v-text-field
          v-model="alunoNome"
          :rules="rules"
          label="Nome do Aluno"
          class="w-full md:w-1/2 p-2"
        ></v-text-field>
        <v-text-field
          v-model="alunoSobrenome"
          :rules="rules"
          label="Sobrenome do Aluno"
          class="w-full md:w-1/2 p-2"
        ></v-text-field>
        <v-text-field
          v-model="nota1"
          :rules="rules"
          label="Nota A1"
          class="w-full md:w-1/2 p-2"
          type="number"
        ></v-text-field>
        <v-text-field
          v-model="nota2"
          :rules="rules"
          label="Nota A2"
          class="w-full md:w-1/2 p-2"
          type="number"
        ></v-text-field>

        <v-btn :loading="loading" class="mt-2 w-full" text type="submit" block>
          Cadastrar
        </v-btn>
      </v-form>
      <div v-if="successMessage" class="text-green-500 mt-4">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="text-red-500 mt-4">
        {{ errorMessage }}
      </div>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alunoNome: "",
      alunoSobrenome: "",
      nota1: null,
      nota2: null,
      loading: false,
      rules: [],
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    async submit() {
      this.loading = true;
      this.successMessage = "";
      this.errorMessage = "";
      const alunoData = {
        nome: this.alunoNome,
        sobrenome: this.alunoSobrenome,
        nota_1: this.nota1,
        nota_2: this.nota2,
      };
      try {
        await this.$store.dispatch("postAlunos", alunoData);
        this.successMessage = "Aluno cadastrado com sucesso!";
      } catch (error) {
        this.errorMessage = "Erro ao cadastrar aluno: " + error.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
/* Adicione estilos adicionais aqui, se necessário */
</style>
