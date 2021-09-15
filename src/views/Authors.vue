<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="writers"
      :loading="loading"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:[`item.created_at`]="{ item }">
        {{  moment(item.created_at).format("YYYY-MM-DD HH:mm:ss")  }}
      </template>
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
                @click="fetchAllWriters"
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
                        v-model="editedItem.name"
                        label="Ime"
                      ></v-text-field>

                      <v-text-field
                        v-model="editedItem.surname"
                        label="Prezime"
                      ></v-text-field>

                      <v-text-field
                        v-model="editedItem.bday"
                        label="Rođenje"
                      ></v-text-field>

                      <v-text-field
                        v-model="editedItem.dday"
                        label="Smrt"
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
              <v-card-title class="text-h5">Jeste li sigurni da želite izbrisati pisca?</v-card-title>
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
        <v-row>
          <v-col cols="6">
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
          </v-col>
          <v-col cols="6">
            <v-btn
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
          </v-col>
        </v-row>        
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
import {mapState, mapActions} from 'vuex'
import moment from 'moment'
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      breadcrumbs: [
        {
          text: 'administracija',
          disabled: false,
          href: '/',
        },
        {
          text: 'pisci',
          disabled: false,
          href: '/pisci',
        }
      ],
      headers: [
        { text: 'Datum kreiranja', value: 'created_at' },
        { text: 'Ime', value: 'name' },
        { text: 'Prezime', value: 'surname' },
        { text: 'Rođenje', value: 'bday' },
        { text: 'Smrt', value: 'dday' },
        { text: 'Akcije', value: 'actions', sortable: false, width:'12.5%' }
      ],
      message: '',
      editedIndex: -1,
      editedItem: {
        name: '',
        surname: '',
        bday: '',
        dday: ''
      },
      defaultItem: {
        name: '',
        surname: '',
        bday: '',
        dday: ''
      },

    }),

    computed: {
      ...mapState('writer', ['writers', 'loading']),
      formTitle () {
        return this.editedIndex === -1 ? 'Dodaj pisca' : 'Uredi pisca'
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
      this.moment = moment
    },

    methods: {
      ...mapActions('writer', ['fetchAllWriters', 'createWriter', 'updateWriter', 'deleteWriter']),
      initialize () {
        this.fetchAllWriters()
      },

      editItem (item) {
        this.editedIndex = this.writers.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      remove(item, type){
        if(type == "genre"){
          this.editedItem.genres = this.editedItem.genres.filter( genre => genre.id != item.id)        
        }else{
          this.editedItem.writers = this.editedItem.writers.filter( writer => writer.id != item.id) 
        }
      },

      deleteItem (item) {
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.deleteWriter(this.editedItem.id)

        this.message = ''
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
      createItem(){
        this.editedIndex = -1
        this.dialog = true
      },
      save () {
        if (this.editedIndex > -1) {
          this.updateWriter(this.editedItem)
        } else {
          this.createWriter(this.editedItem)
        }
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