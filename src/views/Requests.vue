<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="requests"
      sort-by="calories"
      class="elevation-1"
      :loading="!loaded"
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
              @click="getAllRequests"
            >
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Korisnički podaci: </span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <p v-if="!loaded">Molimo pričekajte dok se zahtjev izvrši!</p>
                  <div v-else>
                    <h2>E-mail: {{ request.email }}</h2>
                    <h2>OTP: {{ request.otp }}</h2>
                  </div>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Zatvori
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px" >
            <v-card>
              <v-card-title class="text-h5">Razlog odbijanja zahtjeva:</v-card-title>
              <v-card-text>
                <v-spacer></v-spacer>
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      class="mx-2"
                      v-model="message"
                      rows="1"
                      prepend-icon="mdi-comment"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" class="d-flex justify-end">
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                  </v-col>
                </v-row>
                <v-spacer></v-spacer>
              </v-card-text>
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
            mdi-check-bold
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
      <template v-slot:no-data>
       Nema podataka
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import {mapState, mapActions} from 'vuex'
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Datum kreiranja', value: 'created_at' },
        { text: 'Ime', value: 'name' },
        { text: 'Prezime', value: 'surname' },
        { text: 'E-mail', value: 'email' },
        { text: 'Poslovnica', value: 'shop_office_id' },
        { text: 'Akcije', value: 'actions' },
      ],
      message: '',
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        surname: '',
        email: '',
        shop_office_id: 1,
      },
      defaultItem: {
        name: '',
        surname: '',
        email: '',
        shop_office_id: 1,
      },
      breadcrumbs: [
        {
          text: 'administracija',
          disabled: false,
          href: '/',
        },
        {
          text: 'zahtjevi',
          disabled: false,
          href: '/zahtjevi',
        }
      ]

    }),

    computed: {
      ...mapState('request', ['requests', 'request', 'loaded']),
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
      ...mapActions('request', ['getAllRequests', 'confirmRequest', 'deleteRequest']),
      initialize () {
        this.getAllRequests()
      },

      editItem (item) {
        this.editedItem = Object.assign({}, item)
        this.dialog = true

        const payload = {
          'membership_request_id': this.editedItem.id,
          'is_ot_password': 1
        }
        this.confirmRequest(payload)
      },

      deleteItem (item) {
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        const payload = {
          'membership_request_id': this.editedItem.id,
          'message': this.message
        }
        this.deleteRequest(payload)

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
    },
  }
</script>

<style scoped>

</style>