<template>
  <div class="">
    <v-sheet class="mx-auto mt-10" max-width="300">
      <v-form @submit.prevent="submit">
        <v-text-field
          v-model="alunoNome"
          :rules="[rules.required]"
          label="Nome do Aluno"
          class="w-full md:w-1/2 p-2"
        ></v-text-field>
        <v-text-field
          v-model="alunoSobrenome"
          :rules="[rules.required]"
          label="Sobrenome do Aluno"
          class="w-full md:w-1/2 p-2"
        ></v-text-field>
        <v-text-field
          v-model="nota1"
          :rules="[rules.required, rules.number, rules.min, rules.max]"
          label="Nota A1"
          class="w-full md:w-1/2 p-2"
        ></v-text-field>
        <v-text-field
          v-model="nota2"
          :rules="[rules.required, rules.number, rules.min, rules.max]"
          label="Nota A2"
          class="w-full md:w-1/2 p-2"
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
      rules: {
        required: (value) => !!value || "Campo obrigatório",
        number: (value) => !isNaN(value) || "Deve ser um número",
        min: (value) => value >= 0 || "Deve ser maior ou igual a 0",
        max: (value) => value <= 10 || "Deve ser menor ou igual a 10",
      },
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
/* .form {
  display: flex;
  justify-content: center;
  align-items: center;
} */
</style>
