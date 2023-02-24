<template>
  <div>
    <form @submit.prevent="register">
        <label for="name">
            Name
        </label>
        <input type="text" name="name" v-model="name" value>
        <label for="email">Email</label>
        <input type="text" name="email" v-model="email" value>
        <label for="password">password</label>
        <input type="password" v-model="password" value name="password"
        >
        <button type="submit" name="button">Register</button>

        <router-link to="/login">Already have an account? Login</router-link>
    </form>
  </div>
</template>

<script>
export default {

    data(){
        return {
            name:'',
            email:'',
            password:''
        }
    },
    methods:{

        register(){
            this.$store.dispatch('register',{
                name:this.name,
                email:this.email,
                password:this.password
            })
            .then(()=>{
                this.$router.push({name:'dashboard'})
            })
        }
    }

}
</script>

<style>

</style>