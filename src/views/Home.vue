<template>
  <div class="home">
    <h1>Dashboard</h1>
    
    <div v-if="user">
      <h3>{{ user.name }}</h3>
      <h4>{{ user.email }}</h4>
    </div>

    <button @click.prevent="handleLogout">Logout</button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Dashboard',
  data(){
    return{

    }
  },
  computed:{
    ...mapState('auth', ['user'])
  },
  methods:{
    ...mapActions('auth', ['logout']),
    handleLogout(){
      this.logout()
    }
  }
}
</script>
