<template>
  <v-app>
    <v-main>
      <div v-for="(aluno, index) in $store.state.alunos" :key="index">
        <p>{{ aluno.nome }}</p>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
  created() {
    this.$store.dispatch("getAlunos");
  },
};
</script>
