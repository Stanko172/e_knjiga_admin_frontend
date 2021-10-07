<template>
  <v-app class="main-bg">
    <EventHub />

    <Layout v-if="isLoggedIn"/>
    <router-view v-else></router-view>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import EventHub from './components/event_hub/EventHub.vue'
import Layout from './components/layout/Layout.vue'
export default {
  name: 'App',
  components:{
    EventHub,
    Layout
  },
  watch:{
    $route:{
      handler(){
        this.checkLoginStatus()
      },
      immediate: true
    }
  },
  data: () => ({
    //
  }),
  computed:{
    ...mapState('auth', ['isLoggedIn'])
  },
  methods:{
    ...mapActions('auth', ['checkLoginStatus'])
  }
};
</script>

<style scoped>
  .main-bg{
    background-color: #FAFAFA !important;
  }
</style>
