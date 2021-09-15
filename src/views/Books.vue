<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="books"
      :loading="loading"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:[`item.created_at`]="{ item }">
        {{  moment(item.created_at).format("YYYY-MM-DD HH:mm:ss")  }}
      </template>
      <template v-slot:[`item.writers`]="{ item }">
        <v-chip
          v-for="(writer, index) in item.writers"
          :key="index"
          class="ma-2"
        >
          {{ writer.name }} {{ writer.surname }}
        </v-chip>
      </template>
      <template v-slot:[`item.genres`]="{ item }">
        <v-chip
          v-for="(genre, index) in item.genres"
          :key="index"
          class="ma-2"
        >
          {{ genre.name }}
        </v-chip>
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
                @click="fetchAllBooks"
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
                        label="Naziv"
                      ></v-text-field>

                      <v-text-field
                        v-model="editedItem.amount"
                        type="number"
                        label="Količina"
                      ></v-text-field>

                      <v-text-field
                        v-model="editedItem.price"
                        type="number"
                        label="Cijena"
                      ></v-text-field>

                      <v-textarea
                        name="input-7-1"
                        filled
                        label="Opis"
                        auto-grow
                        v-model="editedItem.description"
                      ></v-textarea>

                      <v-combobox
                        v-model="editedItem.writers"
                        :items="writers"
                        :item-text="item => item.name + ' ' + item.surname"
                        chips
                        clearable
                        label="Pisci"
                        multiple
                        prepend-icon="mdi-filter-variant"
                        solo
                      >
                        <template v-slot:selection="{ attrs, item, select, selected }">
                          <v-chip
                            v-bind="attrs"
                            :input-value="selected"
                            close
                            @click="select"
                            @click:close="remove(item, 'writer')"
                          >
                            <strong>{{ item.name }} {{ item.surname }}</strong>&nbsp;
                          </v-chip>
                        </template>
                      </v-combobox>
                      <v-combobox
                        v-model="editedItem.genres"
                        :items="genres"
                        :item-text="item => item.name"
                        chips
                        clearable
                        label="Pisci"
                        multiple
                        prepend-icon="mdi-filter-variant"
                        solo
                      >
                        <template v-slot:selection="{ attrs, item, select, selected }">
                          <v-chip
                            v-bind="attrs"
                            :input-value="selected"
                            close
                            @click="select"
                            @click:close="remove(item, 'genre')"
                          >
                            <strong>{{ item.name }}</strong>&nbsp;
                          </v-chip>
                        </template>
                      </v-combobox>
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
              <v-card-title class="text-h5">Jeste li sigurni da želite izbrisati knjigu?</v-card-title>
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
          text: 'knjige',
          disabled: false,
          href: '/knjige',
        }
      ],
      headers: [
        { text: 'Datum kreiranja', value: 'created_at' },
        { text: 'Naziv', value: 'name' },
        { text: 'Količina', value: 'amount' },
        { text: 'Cijena', value: 'price' },
        { text: 'Pisci', value: 'writers' },
        { text: 'Žanrovi', value: 'genres' },
        { text: 'Akcije', value: 'actions', sortable: false, width:'12.5%' }
      ],
      message: '',
      editedIndex: -1,
      editedItem: {
        name: '',
        amount: '',
        price: '',
        description: '',
        genres: [],
        writers: []
      },
      defaultItem: {
        name: '',
        amount: '',
        price: '',
        description: '',
        genres: [],
        writers: []
      },

    }),

    computed: {
      ...mapState('book', ['books', 'writers', 'genres', 'loading']),
      formTitle () {
        return this.editedIndex === -1 ? 'Dodaj knjigu' : 'Uredi knjigu'
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
      ...mapActions('book', ['fetchAllBooks', 'fetchAllWriters', 'fetchAllGenres', 'updateBook', 'createBook', 'deleteBook']),
      initialize () {
        this.fetchAllGenres()
        this.fetchAllWriters()
        this.fetchAllBooks()
      },

      editItem (item) {
        this.editedIndex = this.books.indexOf(item)
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
        this.deleteBook(this.editedItem.id)

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
          this.updateBook(this.editedItem)
        } else {
          this.createBook(this.editedItem)
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