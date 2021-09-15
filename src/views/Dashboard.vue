<template>
  <v-container>
    <v-row>
      <v-col>
        {{ $route.meta }}
         <p>Dobrodošli na administraciju web-aplikacije 'E-knjiga'. Ova administracija Vam omogućava jednostavno upravljanje sadržajem na web stranici. </p>
         <p>Grafikoni i ostale informacije će biti dostupni naknadno.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Dashboard',
  data(){
    return{

    }
  }
}
</script>