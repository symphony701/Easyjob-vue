<template>
  <v-app>
    <Sidebar></Sidebar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
export default {
  
  name: 'Main',

  data: () => ({
    //
  }),
  components:{
    Sidebar
  }
};
</script>