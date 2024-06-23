<template>
  <v-app>
    <v-main class="container">
      <FormsAlunos />
      <GridAlunos />
    </v-main>
  </v-app>
</template>

<script>
import FormsAlunos from "./components/FormsAlunos.vue";
import GridAlunos from "./components/GridAlunos.vue";
export default {
  components: { FormsAlunos, GridAlunos },
  name: "App",

  data: () => ({
    //
  }),
};
</script>
