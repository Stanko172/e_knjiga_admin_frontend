<template>
    <div>
        <v-container>
            <v-text-field
            v-model="form.email"
            label="E-mail"
            required
            ></v-text-field>
            <v-text-field
            v-model="form.password"
            label="Lozinka"
            required
            ></v-text-field>

            <v-btn @click.prevent="handleLogin" color="primary">Login</v-btn>
        </v-container>
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