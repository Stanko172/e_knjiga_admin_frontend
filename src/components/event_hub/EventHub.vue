<template>
  <div>
      <vue-snotify></vue-snotify>
  </div>
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
        successNotification(message){
            this.$snotify.success(message, {
                timeout: 2000,
                showProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                position: 'rightTop'
            });
                
        },
        errorNotification(message){
            this.$snotify.error(message, {
                timeout: 2000,
                showProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                position: 'rightTop'
            });
                
        },
    },
    created(){
        this.$eventHub.$on('success-notification', (message) => this.successNotification(message)),
        this.$eventHub.$on('error-notification', (message) => this.errorNotification(message))
    },
    beforeDestroy(){
        this.$eventHub.$off('success-notification'),
        this.$eventHub.$off('error-notification')
    }
}
</script>

<style scoped>

</style>