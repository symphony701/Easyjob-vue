<template>
  <v-row >
    <div class="asd">
      <v-col v-for="announce in announcementPr" :key="announcementPr.id">
        <v-card class="mx-auto my-12"
                min-width="700"
                min-height="250"
                max-width="900">
          <v-card-text>{{announce.especialty}}</v-card-text>

        </v-card>
      </v-col>
    </div>

  </v-row>
</template>

<script>
import LinkService from '../services/data'

export default {
  name: 'Practitioner',
  components: {
    
  },
  data(){
    return{
      announcementPr:[]
    };
  },
  methods: {
      metodo(){
          LinkService.getProyectById(1)
      }
  },
  mounted: async function () {
    let resultado= await LinkService.getannouncementPractition()
    this.announcementPr=resultado
  }
}
</script>
<style>
.asd{
  height: 200px;
  width: 950px;
  overflow-y:scroll;
  justify-content: center;
}
</style>