<template>
  <div>
    Name
    <input type="text" v-model="form.name"> <br>
    e-mail
    <input type="text" v-model="form.email"> <br>
    password
    <input type="text" v-model="form.password"> <br>
    password confirmation
    <input type="text" v-model="form.password_confirmation"> <br>

    <button @click.prevent="handleRegister">Register</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'Register',
    data(){
        return{
            form:{
                name: "",
                email: "",
                password: "",
                password_confirmation: ""
            }
        }
    },
    methods:{
        ...mapActions('auth', ['register']),
        handleRegister(){
            this.register(this.form)
        }
    }
}
</script>

<style>

</style>