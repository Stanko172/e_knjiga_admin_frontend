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
                    <v-select
                    v-model="year"
                    :items="states"
                    :menu-props="{ maxHeight: '400' }"
                    label="Select"
                    hint="Upišite željenu godinu"
                    persistent-hint
                    ></v-select>
                </v-col>

                <v-col
                    cols="12"
                    sm="6"
                >
                    <v-select
                    v-model="category"
                    :items="states"
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
export default {
    data(){
        return{
            headers: [
                { text: 'Korisnik', value: 'name' },
                { text: 'Grad', value: 'city' },
                { text: 'Datum učlanjivanja', value: 'created_at' },
                { text: 'Članarina vrijedi do', value: 'membership_duration' },
                { text: 'Količina', value: 'amount' },
            ],
            states:[
                'test 1',
                'test 2',
                'test 3'
            ],
            tableData: [
                {
                    name: 'John Doe',
                    city: 'Mostar',
                    created_at: '1.1.2021',
                    membership_duration: '1.1.2022',
                    amount: 44
                }
            ],
            category: '',
            year: ''
        }
    }
}
</script>

<style>

</style>