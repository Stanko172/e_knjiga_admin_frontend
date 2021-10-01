<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="coupons"
      :loading="loading"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:[`item.created_at`]="{ item }">
        {{  moment(item.created_at).format("YYYY-MM-DD HH:mm:ss")  }}
      </template>

      <template v-slot:[`item.users`]="{ item }">
        {{  item.users.name  }}
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
                @click="fetchAllCoupons"
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
                        v-model="editedItem.code"
                        label="Kod"
                      ></v-text-field>

                      <v-text-field
                        type="number"
                        v-model="editedItem.price"
                        label="Vrijednost"
                      ></v-text-field>

                      <v-select
                      v-model="editedItem.users"
                      :items="users"
                      :item-text="(item) => item.name"
                      :item-value="(item) => item"
                      label="Korisnik"
                      solo
                      ></v-select>

                      <v-menu
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            v-model="editedItem.time_from"
                            label="Vrijedi od"
                            hint="YYYY-MM-DD format"
                            persistent-hint
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="editedItem.time_from"
                            no-title
                        ></v-date-picker>
                      </v-menu>

                      <v-menu
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            v-model="editedItem.time_to"
                            label="Vrijedi do"
                            hint="YYYY-MM-DD format"
                            persistent-hint
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="editedItem.time_to"
                            no-title
                        ></v-date-picker>
                      </v-menu>

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
              <v-card-title class="text-h5">Jeste li sigurni da želite izbrisati kupon?</v-card-title>
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
          text: 'kuponi',
          disabled: false,
          href: '/kuponi',
        }
      ],
      headers: [
        { text: 'Datum kreiranja', value: 'created_at' },
        { text: 'Kod', value: 'code' },
        { text: 'Vrijednost', value: 'price' },
        { text: 'Vrijedi od', value: 'time_from' },
        { text: 'Vrijedi do', value: 'time_to' },
        { text: 'Korisnik', value: 'users' },
        { text: 'Akcije', value: 'actions', sortable: false}
      ],
      message: '',
      editedIndex: -1,
      editedItem: {
        code: '',
        price: '',
        time_from: '',
        time_to: ''
      },
      defaultItem: {
        code: '',
        price: '',
        time_from: '',
        time_to: ''
      },

    }),

    computed: {
      ...mapState('coupon', ['coupons', 'users', 'loading']),
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
      ...mapActions('coupon', ['fetchAllCoupons', 'fetchAllUsers', 'createCoupon', 'updateCoupon', 'deleteCoupon']),
      initialize () {
        this.fetchAllCoupons()
        this.fetchAllUsers()
      },

      editItem (item) {
        this.editedIndex = this.coupons.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.deleteCoupon(this.editedItem.id)

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
          this.updateCoupon(this.editedItem)
        } else {
          this.createCoupon(this.editedItem)
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