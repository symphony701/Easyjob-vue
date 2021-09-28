<template>
  <v-row>
    <div class="asd">
      <v-col v-for="announce in announcementPr" :key="announcementPr.id">
        <v-card
          class="mx-auto my-5"
          min-width="700"
          min-height="150"
          max-width="900"
        >
          <v-card-title>{{ announce.companyName }}</v-card-title>
          <v-card-title>{{ announce.titleAnnouncement }}</v-card-title>
          <v-card-subtitle>{{
            announce.especialty + " | " + announce.experience
          }}</v-card-subtitle>
          <v-card-actions>
            <v-btn @click="prepostulated(announce.id)">Postular</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="AnnounceSelect(announce.id), (dialogannounce = true)"
              >Más información</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-dialog v-model="dialogannounce">
        <v-card>
          <v-card-title>{{ this.announceselect.companyName }}</v-card-title>
          <v-card-title>{{
            this.announceselect.titleAnnouncement
          }}</v-card-title>
          <v-card-subtitle>{{
            this.announceselect.especialty +
            " | " +
            this.announceselect.experience
          }}</v-card-subtitle>
          <v-card-subtitle>{{
            "Salario:" +
            this.announceselect.salary +
            " " +
            this.announceselect.salarytype
          }}</v-card-subtitle>
          <v-card-text>
            {{ this.announceselect.infoJob }}
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </v-row>
</template>

<script>
import LinkService from "../services/data";

export default {
  name: "Practitioner",
  components: {},
  data() {
    return {
      announcementPr: [],
      /*nameCompanyPr:"",
      titleannounce:"",
      especialityannounce:"",
      experienceannounce:"",
      infoannounce:""*/
      announceselect: {},
      dialogannounce: false,
    };
  },
  methods: {
    AnnounceSelect(p_id) {
      this.dialog = true;
      let index = 0;

      for (var i = 0; i < this.announcementPr.length; i++) {
        if (p_id == this.announcementPr[i].id) {
          index = i;
        }
      }
      this.announceselect = this.announcementPr[index];
    },
    async postulated() {
      const arrayPostulant = Array.from(this.announceselect.applicants);
      console.log(arrayPostulant);

      arrayPostulant.push(parseInt(this.$route.params.id));

      let applicantsArray = {
        applicants: arrayPostulant,
      };

      await LinkService.addPostulant(applicantsArray, this.announceselect.id);
      let resultado = await LinkService.getannouncementPractition();
      this.announcementPr = resultado;
      console.log(this.announceselect.applicants)
    },
    prepostulated(p_id) {
      this.AnnounceSelect(p_id);
      this.postulated();
    },
  },
  mounted: async function () {
    let resultado = await LinkService.getannouncementPractition();
    this.announcementPr = resultado;
  },
};
</script>
<style>
.asd {
  height: 500px;
  width: 950px;
  overflow-y: scroll;
  justify-content: center;
}
</style>
