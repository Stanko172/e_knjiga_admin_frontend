
<template>
    <v-container class="fill-height bg-color" fluid>
        <v-row align="center" justify="center" dense>
            <v-col cols="12" sm="8" md="4" lg="4">
                <v-card elevation="0">
                    <a href="" name="E-Knjiga" title="E-Knjiga" target="_blank">
                    <v-img src="/elogo.png" alt="E-Knjiga" contain height="200"></v-img>
                    </a>
                    <v-card-text>
                    <v-form>
                        <v-text-field v-model="form.email" label="Unesite vašu email adresu" name="email" prepend-inner-icon="mdi-email" type="email" class="rounded-0" outlined></v-text-field>
                        <v-text-field v-model="form.password" label="Unesite vašu lozinku" name="password" prepend-inner-icon="mdi-lock" type="password" suffix="" class="rounded-0" outlined></v-text-field>
                        <v-btn class="rounded-0" color="#2856b6" x-large block dark @click.prevent="handleLogin">Prijavite se</v-btn>
                        <v-card-actions class="checkbox mt-5 d-flex justify-center">
                        <router-link to="/zaboravljena_lozinka" class="pl-2" style="color: #2856b6"> Zaboravljena lozinka?</router-link>
                        </v-card-actions>
                    </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
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

<style scoped>
    .bg-color{
        background-color: #EBEFF2;
    }
</style>