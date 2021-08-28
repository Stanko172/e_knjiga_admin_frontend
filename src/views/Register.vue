<template>
    <div>
        <v-container>
            <v-text-field
            v-model="form.name"
            label="Ime"
            required
            ></v-text-field>
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
             <v-text-field
            v-model="form.password_confirmation"
            label="Potvrda lozinke"
            required
            ></v-text-field>

            <v-btn @click.prevent="handleRegister">Register</v-btn>
        </v-container>
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