<template>
  <div class="about">
    <h1>This is an {{this.nombre}}</h1>
  </div>
</template>

<script>
import LinkService from '../services/data'

export default {
  name: 'Profile',
  components: {
    
  },
  data(){
      return{
          nombre:""
      }
  },
  created:async function(){
      this.nombre = await LinkService.getProfileById(1)
      console.log(this.nombre)
      console.log(typeof(this.nombre[0]))
      
  }

  
}
</script>
