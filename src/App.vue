<template>
  <v-app>
    <EventHub />
    <Layout />
  </v-app>
</template>

<script>
import EventHub from './components/event_hub/EventHub.vue'
import Layout from './components/layout/Layout.vue'
export default {
  name: 'App',
  components:{
    EventHub,
    Layout
  },
  data: () => ({
    //
  }),
};
</script>
