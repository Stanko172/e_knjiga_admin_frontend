<template>
  <v-data-table
      :headers="headers"
      :items="tableData"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
            <v-container fluid>
                <v-row align="center">
                <v-col
                    cols="12"
                    sm="6"
                >
                    <v-text-field 
                    v-model="year" 
                    type="number"
                    >

                    </v-text-field>
                </v-col>

                <v-col
                    cols="12"
                    sm="6"
                >
                    <v-select
                    v-model="category"
                    :items="categories"
                    label="Select"
                    hint="Odaberite kategoriju"
                    persistent-hint
                    ></v-select>
                </v-col>
                </v-row>
            </v-container>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
        </v-toolbar>
      </template>
    </v-data-table>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    data(){
        return{
            headers: [
                { text: '#', value: 'id' },
                { text: 'Korisnik', value: 'name' },
                { text: 'Datum učlanjivanja', value: 'created_at' },
                { text: 'Količina', value: 'total' },
            ],
            categories:[
                'iznajmljivanja',
                'kupovine'
            ],
            category: 'iznajmljivanja',
            year: new Date().getFullYear()
        }
    },
    computed:{
        ...mapState('dashboard', ['tableData'])
    },
    watch:{
        category:{
            handler(){
                this.handleFetchTableData()
            },
            immediate: true
        },
        year:{
            handler(){
                this.handleFetchTableData()
            },
            immediate: true
        }
    },
    methods:{
        ...mapActions('dashboard', ['fetchTableData']),
        handleFetchTableData(){
            const payload = {
                category: this.category,
                year: this.year
            }
            this.fetchTableData(payload)
        }
    },
}
</script>

<style>

</style>