<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="users"
      :loading="loading"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:[`item.created_at`]="{ item }">
        {{  moment(item.created_at).format("YYYY-MM-DD HH:mm:ss")  }}
      </template>
      <template v-slot:[`item.permissions`]="{ item }">
        <v-chip
          v-for="(role, index) in item.roles"
          :key="index"
          class="ma-2"
        >
          {{ role.title }}
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
                @click="getAllUsers"
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
                        label="Korisničko ime"
                      ></v-text-field>

                      <v-text-field
                        v-model="editedItem.email"
                        label="E-mail"
                      ></v-text-field>

                      <v-text-field
                        v-model="password"
                        label="Lozinka"
                      ></v-text-field>

                      <v-combobox
                        v-model="editedItem.roles"
                        :items="items"
                        chips
                        clearable
                        label="Role"
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
                            @click:close="remove(item)"
                          >
                            <strong>{{ item.title }}</strong>&nbsp;
                          </v-chip>
                        </template>
                        <template v-slot:item="{ item }">
                          <span>{{item.title}}</span>
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
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Datum kreiranja', value: 'created_at' },
        { text: 'Korisničko ime', value: 'name' },
        { text: 'E-mail', value: 'email' },
        { text: 'Role', value: 'permissions' },
        { text: 'Akcije', value: 'actions', sortable: false },
      ],
      breadcrumbs:[
        {
          text: 'administracija',
          disabled: false,
          href: '/',
        },
        {
          text: 'korisnici',
          disabled: false,
          href: '/korisnici',
        },
      ],
      editedItem: {
        id: 0,
        name: '',
        email: '',
        roles: []
      },
      defaultItem: {
        id: 0,
        name: '',
        email: '',
        roles: []
      },
      password: ''
    }),

    computed: {
      ...mapState('user', ['users', 'loading']),
      ...mapState('role', ['roles']),
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      items(){
        let filteredItems = this.editedItem.roles.map(item => item.title)
        return this.roles.filter(x => !filteredItems.includes(x.title));
      }
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
      ...mapActions('user', ['getAllUsers', 'editUser', 'createUser', 'deleteUser']),
      ...mapActions('role', ['getAllRoles']),
      initialize () {
        this.getAllUsers()
        this.getAllRoles()
      },

      createItem(){
        this.editedIndex = -1
        this.dialog = true
      },

      editItem (item) {
        this.editedIndex = this.users.indexOf(item)
        let permItem = JSON.parse(JSON.stringify(item));

        this.editedItem = (({ id, name, roles }) => ({ id, name, roles }))(permItem);
        this.dialog = true
      },

      remove (item) {
        this.editedItem.roles.splice(this.editedItem.roles.indexOf(item), 1)
        this.editedItem.roles = [...this.editedItem.roles]
      },

      getRemovedItems(){
        let filteredItems = this.editedItem.roles.map(item => item.title)
        let removedItems = this.users[this.editedIndex].roles.filter(x => !filteredItems.includes(x.title));

        return removedItems
      },

      deleteItem (item) {
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = (({ id, name, roles }) => ({ id, name, roles }))(item);
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.deleteUser(this.editedItem.id)
        this.closeDelete()
      },

      close () {
        this.getAllUsers()
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.getAllUsers()
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if(this.editedIndex > -1){
          const payload = {
            'id': this.users[this.editedIndex].id,
            'removed_items': this.getRemovedItems(),
            'edited_items': this.editedItem.roles
          }
          this.editUser(payload)
        }else{
          let payload = {
            'name': this.editedItem.name,
            'email': this.editedItem.email,
            'password': this.password,
            'roles': this.editedItem.roles
          }
          this.createUser(payload)
        }
        this.password = ''
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