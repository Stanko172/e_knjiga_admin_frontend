<template>
  <div class="home">
    <h1>Dashboard</h1>
    
    <div v-if="isLoggedIn">
      <div v-if="user">
        <h3>{{ user.name }}</h3>
        <h4>{{ user.email }}</h4>
      </div>

      <button @click.prevent="handleLogout">Logout</button>
    </div>
    <div v-else>
      <p>
        Korisnik trenutačno nije logiran!
      </p>
    </div>
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
    ...mapState('auth', ['user', 'isLoggedIn'])
  },
  methods:{
    ...mapActions('auth', ['logout', 'checkLoginStatus']),
    handleLogout(){
      this.logout()
    }
  },
  mounted(){
    this.checkLoginStatus()
  }
}
</script>
