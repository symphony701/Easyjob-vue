<template>
  <div class="about">
    <h1>This is an {{ this.nombre }}</h1>
  </div>
</template>

<script>
import LinkService from "../services/data";

export default {
  name: "Profile",
  components: {},
  data() {
    return {
      nombre: "",
    };
  },
  created: async function () {},
  mounted: async function () {
    let resultado = await LinkService.getProfileById(this.$route.params.id);
    this.nombre = resultado[0].myname;
    
  },
};
</script>
