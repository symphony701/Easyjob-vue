<template>
  <div class="about">
    <h1>This is an Practitioner</h1>
    <v-btn @click="metodo" ></v-btn>
  </div>
</template>

<script>
import LinkService from '../services/data'



export default {
  name: 'Practitioner',
  components: {
    
  },
  methods: {
      metodo(){
          LinkService.getProyectById(1)
      }
  }
}
</script>
