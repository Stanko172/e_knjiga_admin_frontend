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
      <template v-slot:[`item.picked_up`]="{ item }">
          {{ item.picked_up === 1 ? 'Da' : 'Ne' }}
      </template>
      <template v-slot:[`item.returned`]="{ item }">
        {{ item.returned === 1 ? 'Da' : 'Ne' }}
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
                @click="fetchAllRentalRequestsConfirmed"
              >
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
            <v-card>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-row>
          <v-col cols="6">
            <v-btn
              dark
              small
              color="green"
              @click="togglePickedUp(item)"
            >
             {{ item.picked_up === 1 ? 'Nije preuzeto' : 'Preuzeto' }}
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              dark
              small
              color="red"
              @click="toggleReturned(item)"
            >
            {{ item.returned === 1 ? 'Nije vraćeno' : 'Vraćeno' }}
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
          text: 'potvrdeno',
          disabled: false,
          href: '/iznajmljivanja/potvrdeno',
        }
      ],
      headers: [
        { text: 'Datum kreiranja', value: 'created_at' },
        { text: 'Korisnik', value: 'user.name' },
        { text: 'Knjiga', value: 'book.name' },
        { text: 'Na stanju', value: 'book.amount' },
        { text: 'Preuzeto', value: 'picked_up' },
        { text: 'Vraćeno', value: 'returned' },
        { text: 'Akcije', value: 'actions', sortable: false }
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
      ...mapActions('rental', ['fetchAllRentalRequestsConfirmed', 'pickedUp', 'returned']),
      initialize () {
        this.fetchAllRentalRequestsConfirmed()
      },
      togglePickedUp(item){
           this.pickedUp(item.id)
      },
      toggleReturned(item){

          this.returned(item.id)
      },

    },
  }
</script>