<template>
  <v-card
    class="mx-auto d-flex align-center justify-space-around pa-5"
    color="primary"
    dark
    max-width="280"
  >

    <v-icon class="icon">{{ item.icon }}</v-icon>

    <v-sheet class="number">{{ item.count }}</v-sheet>

  </v-card>
</template>

<script>
export default {
    props:[
        'item'
    ]
}
</script>

<style scoped>
    .icon{
        font-size: 2.4em;
    }

    .number{
        background-color: inherit;
        font-size: 2.4em;
    }
</style>