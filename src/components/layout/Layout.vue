<template>
    <div>
        <v-navigation-drawer
        v-model="drawer"
        app
        >
        <!--Profile image and info-->
            <v-card class="mx-auto" max-height="250">
                <v-img
                class="border-radius-default"
                height="200"
                src="https://cdn.pixabay.com/photo/2016/06/02/02/35/mesh-1430107_960_720.png"
                >
                    <v-row align="stretch" class="fill-height">
                        <v-col class="d-flex justify-center align-end">
                            <div class="hero-text">
                                {{ user.name }} - {{ roles.join(', ') }}
                            </div>
                        </v-col>
                    </v-row>
                </v-img>
            </v-card>
        <!--Route links-->
            <v-list
            dense
            rounded
            >
            <div v-for="route in routes" :key="route.title">
            <v-list-item
                v-if="!route.hasOwnProperty('subRoutes') && $can(route.gate)"
                link
                :to="route.link"
            >
                
                <v-list-item-icon>
                <v-icon>{{ route.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                <v-list-item-title>{{ route.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            
            <v-list-group
            v-else-if="$can(route.gate)"
            :value="false"
            :prepend-icon="route.icon"
            >
                <template v-slot:activator>
                    <v-list-item-title>{{ route.title }}</v-list-item-title>
                </template>

                <v-list-item
                    v-for="(subRoute, i) in route.subRoutes"
                    :key="i"
                    link
                    :to="subRoute.link"
                >
                    <v-list-item-icon>
                        <v-icon v-text="subRoute.icon"></v-icon>
                    </v-list-item-icon>

                    <v-list-item-title v-text="subRoute.title"></v-list-item-title>
                </v-list-item>
            </v-list-group>
            </div>

            </v-list>
        </v-navigation-drawer>

        <!--AppBar-->
        <v-app-bar app dark color="primary">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>E-knjiga</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn
              icon
              color="white"
              @click="handleLogout"
            >
              <v-icon>mdi-logout</v-icon>
            </v-btn>
        </v-app-bar>

        <v-main>
            <router-view v-if="$route.meta.gate == undefined || $can($route.meta.gate)"></router-view>
        </v-main>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    data(){
        return{
            drawer: null,
            routes: [
                { title: 'Naslovnica', icon: 'mdi-view-dashboard', link: "/", gate: 'dashboard_access' },
                { title: 'Upravljanje korisnicima', icon: 'mdi-account', link: "/korisnici", gate: 'users_management_access', subRoutes: [
                    { title: 'Permisije', icon: 'mdi-security', link: "/permisije", gate: 'users_management _access' },
                    { title: 'Role', icon: 'mdi-shield-account-outline', link: "/role", gate: 'users_management _access' },
                    { title: 'Korisnici', icon: 'mdi-account-supervisor', link: "/korisnici", gate: 'users_management _access' }
                ] },
                { title: 'Zahtjevi za članstvo', icon: 'mdi-checkbox-multiple-marked', link: "/zahtjevi", gate: 'requests_access' },
                { title: 'Knjige', icon: 'mdi-book', link: "/knjige", gate: 'books_access' },
                { title: 'Iznajmljivanja', icon: 'mdi-book-clock', link: "/iznajmljivanja/zahtjevi", gate: 'rental_access', subRoutes: [
                    { title: 'Zahtjevi', icon: 'mdi-clipboard-clock-outline', link: "/iznajmljivanja/zahtjevi", gate: 'rental_access' },
                    { title: 'Potvrđeno', icon: 'mdi-check', link: "/iznajmljivanja/potvrdeno", gate: 'rental_access' },
                ] },
                { title: 'E-knjige', icon: 'mdi-notebook', link: "/eknjige", gate: 'ebooks_access' },
                { title: 'Promocije', icon: 'mdi-fire', link: "/promocije", gate: 'promotions_access' },
                { title: 'Kuponi', icon: 'mdi-currency-usd-off', link: "/kuponi", gate: 'coupons_access' },
                { title: 'Autori', icon: 'mdi-account-circle', link: "/autori", gate: 'authors_access' },
                { title: 'Žanrovi', icon: 'mdi-shape', link: "/zanrovi", gate: 'genres_access' },
            ],
        }
    },
    computed: {
        ...mapState('auth', ['user', 'roles'])
    },
    methods:{
        ...mapActions('auth', ['logout']),
        handleLogout(){
            this.logout()
        }
    }
}
</script>

<style scoped>
    .hero-text{
        font-size: 17px;
        font-weight: 500;
        letter-spacing: 1.2px;
        color: white;
        text-align: center;
    }

    .border-radius-default{
        border-radius: 0px !important;
    }
</style>