<template>
  <div></div>
</template>

<script>
import api from '../../api/api'
export default {
    data(){
        return{

        }
    },
    watch: {
        $route: {
        handler() {
            if(localStorage.getItem('auth') != null){
            api.get('/abilities').then(response => {
                console.log(response.data)
                this.$ability.update([
                    { subject: 'all', action: response.data }
                ])
                console.log(this.$ability)
            })
            }
        },
        immediate: true
        }
    },
    methods:{
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