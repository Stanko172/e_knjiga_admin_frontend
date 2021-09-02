<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="permissions"
      :loading="loading"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>
              <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
              </v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{  }">
              <v-btn
                color="primary"
                fab
                medium
                dark
                @click="getAllPermissions"
              >
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <v-text-field
                        v-model="editedItem.title"
                        label="Naziv"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Odustani
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Spremi
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Jeste li sigurni da želite izbrisati?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Odustani</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">Potvrdi</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          fab
          dark
          small
          color="green"
          @click="editItem(item)"
        >
          <v-icon dark>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn
          class="mx-2"
          fab
          dark
          small
          color="red"
          @click="deleteItem(item)"
        >
          <v-icon dark>
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <div class="floating-action-button">
      <v-btn
        class="mx-2"
        fab
        dark
        large
        color="primary"
        @click="createItem"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Datum kreiranja', value: 'created_at' },
        { text: 'Naziv', value: 'title' },
        { text: 'Akcije', value: 'actions', sortable: false },
      ],
      breadcrumbs:[
        {
          text: 'administracija',
          disabled: false,
          href: '/',
        },
        {
          text: 'permisije',
          disabled: false,
          href: '/permisije',
        },
      ],
      editedItem: {
        id: 0,
        title: ''
      },
      defaultItem: {
        id: 0,
        title: ''
      },
    }),

    computed: {
      ...mapState('permission', ['permissions', 'loading']),
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      ...mapActions('permission', ['getAllPermissions', 'savePermission', 'deletePermission']),
      initialize () {
        this.getAllPermissions()
      },

      createItem(item){
        this.editedIndex = -1
        this.editedItem = (({ title }) => ({ title }))(item);
        this.dialog = true
      },

      editItem (item) {
        this.editedIndex = this.permissions.indexOf(item)
        this.editedItem = (({ id, title }) => ({ id, title }))(item);
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.permissions.indexOf(item)
        this.editedItem = (({ id }) => ({ id }))(item);
        console.log("Delete", this.editedItem)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.deletePermission(this.editedItem.id)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        this.savePermission(this.editedItem)
        this.close()
      },
    },
  }
</script>

<style scoped>
  .floating-action-button{
    position:fixed;
    height:60px;
    bottom:40px;
    right:20px;
  }
</style>