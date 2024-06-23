<template>
  <div class="mt-16">
    <v-container>
      <v-data-table
        v-if="$store.state.alunos.length > 0"
        :headers="headers"
        :items="$store.state.alunos"
        density="compact"
        item-key="name"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon class="me-2" size="small" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-container>

    <ModalEdit
      :dialog="dialog"
      :editedItem="editedItem"
      @close="closeModal"
      @save="saveChanges"
    />
  </div>
</template>

<script>
import ModalEdit from "./ModalEdit.vue";

export default {
  components: {
    ModalEdit,
  },
  data() {
    return {
      dialog: false,
      editedItem: {
        id: null,
        nome: "",
        sobrenome: "",
        nota_1: null,
        nota_2: null,
      },
      headers: [
        { title: "Nome", align: "start", sortable: false, key: "nome" },
        { title: "Sobrenome", align: "end", key: "sobrenome" },
        { title: "Nota A1", align: "end", key: "nota_1" },
        { title: "Nota A2", align: "end", key: "nota_2" },
        { title: "Nota Final", align: "end", key: "nota_final" },
        { title: "Actions", key: "actions", sortable: false },
      ],
    };
  },
  created() {
    this.$store.dispatch("getAlunos");
  },
  methods: {
    editItem(item) {
      this.editedItem = { ...item }; // Copia os dados do aluno para a prop
      this.dialog = true; // Abre o modal de edição
    },
    deleteItem(item) {
      console.log("Excluir item:", item);
      // Implemente a lógica de exclusão aqui, se necessário
    },
    closeModal() {
      this.dialog = false; // Fecha o modal de edição
    },
    async saveChanges(editedAluno) {
      try {
        await this.$store.dispatch("updateAlunos", {
          id: editedAluno.id,
          alunoData: {
            nome: editedAluno.nome,
            sobrenome: editedAluno.sobrenome,
            nota_1: editedAluno.nota_1,
            nota_2: editedAluno.nota_2,
          },
        });

        this.closeModal(); // Fecha o modal após salvar
      } catch (error) {
        console.error("Erro ao atualizar aluno:", error.message);
      }
    },
  },
};
</script>

<style>
</style>
