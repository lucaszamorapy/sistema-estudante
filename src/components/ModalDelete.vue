<template>
  <v-dialog v-model="localDialog" max-width="500px">
    <v-card>
      <v-card-title class="headline">Confirmação de Exclusão</v-card-title>
      <v-card-text> Tem certeza que deseja excluir este aluno? </v-card-text>
      <v-card-actions>
        <v-btn color="red darken-1" text @click="close"> Cancelar </v-btn>
        <v-btn color="blue darken-1" text @click="confirmDelete">
          Excluir
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
    idAluno: Object,
  },
  data() {
    return {
      localDialog: false,
    };
  },
  watch: {
    dialog(newVal) {
      // Quando a prop dialog mudar, atualiza localDialog para manter sincronia
      this.localDialog = newVal;
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    confirmDelete() {
      this.$emit("delete", this.idAluno); // Emite evento de exclusão para o componente pai
    },
  },
};
</script>

<style>
</style>
