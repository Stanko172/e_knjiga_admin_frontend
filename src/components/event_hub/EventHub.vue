<template>
  <div></div>
</template>

<script>
import api from '../../api/api'
import { mapActions } from 'vuex'
export default {
    data(){
        return{

        }
    },
    watch: {
        $route: {
        handler() {
            if(localStorage.getItem('auth') != null){
            //Abilities call
            api.get('/abilities').then(response => {
                console.log(response.data)
                this.$ability.update([
                    { subject: 'all', action: response.data.permissions }
                ])
                this.updateUserRoles(response.data.roles)
            })
            //User call
            this.getUser()
            }
        },
        immediate: true
        }
    },
    methods:{
        ...mapActions('auth', ['getUser', 'updateUserRoles']),
        test123(payload){
            console.log("Activated: ", payload)
        }
    },
    created(){
        this.$eventHub.$on('test', (payload) => this.test123(payload))
    },
    beforeDestroy(){
        this.$eventHub.$off('test')
    }
}
</script>

<style>

</style>