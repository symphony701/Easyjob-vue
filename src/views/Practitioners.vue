<template>
  <v-row >
    <div class="asd">
      <v-col v-for="announce in announcementPr" :key="announcementPr.id">
        <v-card class="mx-auto my-12"
                min-width="700"
                min-height="150"
                max-width="900">
          <v-card-title>{{announce.companyName}}</v-card-title>
          <v-card-title>{{announce.titleAnnouncement}}</v-card-title>
          <v-card-subtitle>{{announce.especialty+" | "+announce.experience}}</v-card-subtitle>
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