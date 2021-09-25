<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="data"
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
            max-width="500px"
          >
            <template v-slot:activator="{  }">
              <v-btn
                color="primary"
                fab
                medium
                dark
                @click="fetchAllRentalRequests"
              >
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
            <v-card>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Jeste li sigurni da želite izbrisati zahtjev?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-textarea
                    class="mx-2"
                    v-model="message"
                    rows="1"
                    prepend-icon="mdi-comment"
                ></v-textarea>
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
              @click="accept(item)"
            >
              <v-icon dark>
                mdi-check-bold
              </v-icon>
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              fab
              dark
              small
              color="red"
              @click="reject(item)"
            >
              <v-icon dark>
                mdi-delete
              </v-icon>
            </v-btn> 
          </v-col>
        </v-row>        
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import moment from 'moment'
  export default {
    data: () => ({
      dialogDelete: false,
      message: '',
      breadcrumbs: [
        {
          text: 'administracija',
          disabled: false,
          href: '/',
        },
        {
          text: 'iznajmljivanja',
          disabled: false,
          href: '/iznajmljivanja/zahtjevi',
        },
        {
          text: 'zahtjevi',
          disabled: false,
          href: '/iznajmljivanja/zahtjevi',
        }
      ],
      headers: [
        { text: 'Datum kreiranja', value: 'created_at' },
        { text: 'Korisnik', value: 'user.name' },
        { text: 'Knjiga', value: 'book.name' },
        { text: 'Na stanju', value: 'book.amount' },
        { text: 'Akcije', value: 'actions', sortable: false, width:'12.5%' }
      ],
      item: {}

    }),

    computed: {
      ...mapState('rental', ['data', 'loading']),
    },

    created () {
      this.initialize()
      this.moment = moment
    },

    methods: {
      ...mapActions('rental', ['fetchAllRentalRequests', 'acceptRentalRequest', 'rejectRentalRequest']),
      initialize () {
        this.fetchAllRentalRequests()
      },
      closeDelete () {
        this.item = {}

        this.dialogDelete = false
      },
      deleteItemConfirm(){
          const payload = {
              request_id: this.item.id,
              message: this.message,
              user_email: this.item.user.email
          }

          this.rejectRentalRequest(payload)
          this.dialogDelete = false
      },
      accept(item){
          const payload = {
              request_id: item.id,
              user_id: item.user.id,
              book_id: item.book.id,
              user_email: item.user.email
          }

          this.acceptRentalRequest(payload)
      },
      reject(item){
          this.dialogDelete = true

          this.item = item
      }
    },
  }
</script>