<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="roles"
      :loading="loading"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:[`item.created_at`]="{ item }">
        {{  moment(item.created_at).format("YYYY-MM-DD HH:mm:ss")  }}
      </template>
      <template v-slot:[`item.permissions`]="{ item }">
        <v-chip
          v-for="(permission, index) in item.permissions"
          :key="index"
          class="ma-2"
        >
          {{ permission.title }}
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
                @click="getAllRoles"
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

                      <v-combobox
                        v-model="editedItem.permissions"
                        :items="items"
                        chips
                        clearable
                        label="Permisije"
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
        { text: 'Naziv', value: 'title' },
        { text: 'Permisije', value: 'permissions' },
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
        title: '',
        permissions: []
      },
      defaultItem: {
        id: 0,
        title: '',
        permissions: []
      },
    }),

    computed: {
      ...mapState('role', ['roles', 'loading']),
      ...mapState('permission', ['permissions']),
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      items(){
        let filteredItems = this.editedItem.permissions.map(item => item.title)
        return this.permissions.filter(x => !filteredItems.includes(x.title));
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
      ...mapActions('role', ['getAllRoles', 'editRole', 'createRole', 'deleteRole']),
      ...mapActions('permission', ['getAllPermissions']),
      initialize () {
        this.getAllRoles()
        this.getAllPermissions()
      },

      createItem(){
        this.editedIndex = -1
        this.dialog = true
      },

      editItem (item) {
        this.editedIndex = this.roles.indexOf(item)
        let permItem = JSON.parse(JSON.stringify(item));

        this.editedItem = (({ id, title, permissions }) => ({ id, title, permissions }))(permItem);
        this.dialog = true
      },

      remove (item) {
        this.editedItem.permissions.splice(this.editedItem.permissions.indexOf(item), 1)
        this.editedItem.permissions = [...this.editedItem.permissions]
      },

      getRemovedItems(){
        let filteredItems = this.editedItem.permissions.map(item => item.title)
        let removedItems = this.roles[this.editedIndex].permissions.filter(x => !filteredItems.includes(x.title));

        return removedItems
      },

      deleteItem (item) {
        this.editedIndex = this.permissions.indexOf(item)
        this.editedItem = (({ id, title, permissions }) => ({ id, title, permissions }))(item);
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.deleteRole(this.editedItem.id)
        this.closeDelete()
      },

      close () {
        this.getAllRoles()
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.getAllRoles()
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if(this.editedIndex > -1){
          const payload = {
            'id': this.roles[this.editedIndex].id,
            'removed_items': this.getRemovedItems(),
            'edited_items': this.editedItem.permissions
          }
          this.editRole(payload)
        }else{
          let payload = {
            'title': this.editedItem.title,
            'permissions': this.editedItem.permissions
          }
          this.createRole(payload)
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