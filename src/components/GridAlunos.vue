<template>
  <div class="mt-16">
    <v-container>
      <v-data-table
        :headers="headers"
        :items="$store.state.alunos"
        density="compact"
        item-key="name"
        class="elevation-1"
      >
        <!-- <template v-slot:[`item.actions`]="{ item }">
          <v-icon class="me-2" size="small" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
        </template> -->
        <template v-slot:item="{ item }">
          <tr>
            <!-- :class seria adicionar uma classe atraves de js -->
            <!-- v-slot neste caso seria atribuir um slot para cada item, contendo seus td abaixos e suas ações -->
            <td>{{ item.nome }}</td>
            <td>{{ item.sobrenome }}</td>
            <td>{{ item.nota_1 }}</td>
            <td>{{ item.nota_2 }}</td>
            <td :class="getRowClass(item)">{{ item.nota_final }}</td>
            <td>
              <v-icon class="me-2" size="small" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon size="small" @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-container>

    <ModalEdit
      :dialog="dialog"
      :editedItem="editedItem"
      @close="closeModal"
      @save="saveChanges"
    />

    <ModalDelete
      :dialog="dialogDelete"
      :idAluno="idAluno"
      @close="closeModal"
      @delete="deleteAluno"
    />
  </div>
</template>

<script>
import ModalEdit from "./ModalEdit.vue";
import ModalDelete from "./ModalDelete.vue";

export default {
  components: {
    ModalEdit,
    ModalDelete,
  },
  data() {
    return {
      idAluno: {
        id: null,
      },
      dialog: false, // Modal de edição
      dialogDelete: false, // Modal de exclusão
      editedItem: {
        id: null,
        nome: "",
        sobrenome: "",
        nota_1: null,
        nota_2: null,
      },
      headers: [
        { title: "Nome", align: "start", key: "nome" },
        { title: "Sobrenome", align: "start", key: "sobrenome" },
        { title: "Nota A1", align: "start", key: "nota_1" },
        { title: "Nota A2", align: "start", key: "nota_2" },
        { title: "Nota Final", align: "start", key: "nota_final" },
        { title: "Actions", key: "actions", sortable: false },
      ],
    };
  },
  created() {
    this.$store.dispatch("getAlunos");
  },
  methods: {
    getRowClass(item) {
      return item.nota_final < 6 ? "text-red" : "text-blue";
    },
    editItem(item) {
      this.editedItem = { ...item }; // Copia os dados do aluno para a prop
      this.dialog = true; // Abre o modal de edição
    },
    deleteItem(item) {
      this.idAluno = item; // Define o item a ser deletado
      this.dialogDelete = true; // Abre o modal de exclusão
    },
    closeModal() {
      this.dialog = false; // Fecha o modal de edição
      this.dialogDelete = false; // Fecha o modal de exclusão
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
    async deleteAluno(idItem) {
      try {
        await this.$store.dispatch("deleteAlunos", idItem.id);
        this.closeModal();
      } catch (error) {
        console.error("Erro ao excluir aluno:", error.message);
      }
    },
  },
};
</script>

<style>
</style>


