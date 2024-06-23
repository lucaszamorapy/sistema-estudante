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
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="editedItem.nome"
                    label="Nome"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="editedItem.sobrenome"
                    label="Sobrenome"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="editedItem.nota_1"
                    label="Nota A1"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="editedItem.nota_2"
                    label="Nota A2"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-btn color="blue darken-1" variant="text" @click="close">
              Cancelar
            </v-btn>
            <v-btn color="blue darken-1" variant="text" @click="save">
              Salvar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
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
  }),
  created() {
    this.$store.dispatch("getAlunos");
  },
  methods: {
    editItem(item) {
      this.editedItem = { ...item }; // Copia os dados do aluno para o modal
      this.dialog = true; // Abre o modal de edição
    },
    deleteItem(item) {
      console.log("Excluir item:", item);
      // Implemente a lógica de exclusão aqui, se necessário
    },
    close() {
      this.dialog = false; // Fecha o modal de edição
    },
    save() {
      // Implemente a lógica para salvar as alterações do aluno
      console.log("Salvar alterações para:", this.editedItem);
      this.close(); // Fecha o modal após salvar
    },
  },
};
</script>

<style>
</style>
