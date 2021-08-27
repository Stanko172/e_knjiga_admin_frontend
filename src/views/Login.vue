<template>
  <div>
    e-mail
    <input type="text" v-model="form.email"> <br>
    password
    <input type="text" v-model="form.password"> <br>

    <button @click.prevent="handleLogin">Login</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'Login',
    data(){
        return{
            form:{
                email: "",
                password: ""
            }
        }
    },
    methods:{
        ...mapActions('auth', ['login']),
        handleLogin(){
            this.login(this.form)
        }
    }
}
</script>

<style>

</style>