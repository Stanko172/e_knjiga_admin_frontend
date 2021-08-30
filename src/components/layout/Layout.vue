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
                                John Doe - Administrator
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
                v-if="!route.hasOwnProperty('subRoutes')"
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
            v-else
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

        <v-app-bar app dark color="primary">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>E-knjiga</v-toolbar-title>
        </v-app-bar>

        <v-main class="base-style">
            <router-view></router-view>
        </v-main>
    </div>
</template>

<script>
export default {
    data(){
        return{
            drawer: null,
            routes: [
                { title: 'Naslovnica', icon: 'mdi-view-dashboard', link: "/" },
                { title: 'Upravljanje korisnicima', icon: 'mdi-account', link: "/korisnici", subRoutes: [
                    { title: 'Permisije', icon: 'mdi-security', link: "/permisije" },
                    { title: 'Role', icon: 'mdi-shield-account-outline', link: "/role" },
                    { title: 'Korisnici', icon: 'mdi-account-supervisor', link: "/korisnici" }
                ] },
                { title: 'Zahtjevi', icon: 'mdi-checkbox-multiple-marked', link: "/zahtjevi" },
                { title: 'Knjige', icon: 'mdi-book', link: "/knjige" },
                { title: 'E-knjige', icon: 'mdi-notebook', link: "/eknjige" },
                { title: 'Promocije', icon: 'mdi-currency-usd-off', link: "/promocije" },
                { title: 'Autori', icon: 'mdi-account-circle', link: "/autori" },
                { title: 'Žanrovi', icon: 'mdi-shape', link: "/zanrovi" },
            ],
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

    .base-style{
        height: 100vh;
        background-color: #FAFAFA;
    }

    .border-radius-default{
        border-radius: 0px !important;
    }
</style>