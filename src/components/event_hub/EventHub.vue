<template>
  <div></div>
</template>

<script>
export default {
    data(){
        return{

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