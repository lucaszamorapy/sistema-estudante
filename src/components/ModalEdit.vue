<template>
  <v-dialog v-model="localDialog" max-width="500px">
    <v-card>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="editedAluno.nome"
                label="Nome"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="editedAluno.sobrenome"
                label="Sobrenome"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="editedAluno.nota_1"
                label="Nota A1"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="editedAluno.nota_2"
                label="Nota A2"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-btn color="red darken-1" variant="text" @click="close">
          Cancelar
        </v-btn>
        <v-btn color="blue darken-1" variant="text" @click="save">
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
    editedItem: Object,
  },
  data() {
    return {
      localDialog: false,
      editedAluno: {
        id: null,
        nome: "",
        sobrenome: "",
        nota_1: null,
        nota_2: null,
      },
    };
  },
  watch: {
    dialog(newVal) {
      // Quando a prop dialog mudar, atualiza localDialog para manter sincronia, useEffect da vida
      this.localDialog = newVal;
    },

    editedItem(newVal) {
      // Copia os dados recebidos para a variável local editedAluno, useEffect da vida
      this.editedAluno = { ...newVal };
    },
    immediate: true, // Ativa o watch imediatamente na montagem do componente
  },

  methods: {
    close() {
      this.$emit("close");
    },
    save() {
      this.$emit("save", this.editedAluno);
    },
  },
};
</script>

<style>
</style>
