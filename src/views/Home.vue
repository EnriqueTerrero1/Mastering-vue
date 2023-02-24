<template >
  <div>
  <div v-if="!loggedIn">
    To use this app you' ll need to
    <router-link to="/login">Login</router-link>
    or
    <router-link to="/register">Register</router-link>
  </div>
    <template v-else>
      <EventList :page="1"></EventList>
    </template>
  </div>
</template>

<script>
    import { authComputed } from '../store/modules/helpers.js'
    import EventList from './EventList.vue';
    export default {
      components: { EventList },
      computed: {
        ...authComputed
      }
    }
    </script>

<style>

</style>