<template>
  <div class="profile">
    <v-container>
      <v-row>
        <v-col class="d-flex">
          <h2>{{ this.profile.myname }} {{ this.profile.lastname }}</h2>
          <v-icon>mdi-pencil</v-icon>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-img
            lazy-src="https://picsum.photos/id/11/10/6"
            max-height="1000"
            max-width="4000"
            src="https://picsum.photos/id/11/500/300"
          ></v-img>
        </v-col>
        <v-col>
          <p>{{ this.profile.myinfo }}</p>
          <div class="d-flex containter-buttons"></div>
          <v-btn class="btn-info" disabled elevation="2">
            {{ this.profile.myespeciality }}
          </v-btn>
          <v-btn class="btn-info" disabled elevation="2">
            {{ this.profile.myexperience }}
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h2>Proyectos</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn @click="dialog_add = true">Agregar Proyecto</v-btn>
        </v-col>
        <v-col>
          <v-dialog
            min-width="900"
            min-height="900"
            class="dialog-inside"
            v-model="dialog_add"
            persistent
            max-width="900"
          >
            <v-container class="cont-edit">
              <v-text-field
                label="Titulo del proyecto"
                v-model="editableTitle"
              ></v-text-field>
              <v-textarea
                label="Descripcion del proyecto"
                v-model="editableDescription"
              ></v-textarea>

              <v-select :items="items" label="Standard"></v-select>

              <v-btn @click="dialog_add = false">Salir</v-btn>
              <v-btn @click="addProyect(), (dialog_add = false)">Crear</v-btn>
            </v-container>
          </v-dialog>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="proyect in proyects" :key="proyect.id">
          <v-card
            class="mx-auto my-12"
            max-width="374"
            @click="cardSelect(proyect.id)"
          >
            <v-img height="250" :src="proyect.img"></v-img>

            <v-card-title>{{ proyect.title }}</v-card-title>

            <v-divider class="mx-4"></v-divider>
          </v-card>
        </v-col>
        <!--dialog-->
      </v-row>
      <v-row>
        <v-col>
          <v-dialog v-model="dialog" persistent max-width="900">
            <v-card>
              <v-container>
                <v-row>
                  <v-col>
                    <v-btn color="purple darken-1" text @click="dialog = false">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <h2 class="title-dialog">
                      {{ this.selectedProyect.title }}
                    </h2></v-col
                  >
                  <v-col>
                    <v-btn color="purple darken-1" text @click="editProyect">
                      Editar
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-img height="250" :src="this.selectedProyect.img"></v-img>
                  </v-col>
                  <v-col>
                    <p class="text-dialog">
                      {{ this.selectedProyect.description }}
                    </p>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-dialog
                      min-width="900"
                      min-height="900"
                      class="dialog-inside"
                      v-model="dialog_inside"
                      persistent
                      max-width="900"
                    >
                      <v-container class="cont-edit">
                        <v-text-field
                          label="Titulo del proyecto"
                          v-model="editableTitle"
                        ></v-text-field>
                        <v-textarea
                          label="Descripcion del proyecto"
                          v-model="editableDescription"
                        ></v-textarea>
                        <v-btn @click="dialog_inside = false">Salir</v-btn>
                        <v-btn @click="sendEditProyect">Editar</v-btn>
                      </v-container>
                    </v-dialog>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-btn @click="deleteProyect">Eliminar</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LinkService from "../services/data";
import swal from "sweetalert";
export default {
  name: "Profile",
  components: {},
  data() {
    return {
      profile: "",
      proyects: [],
      dialog: false,
      selectedProyect: {},
      dialog_inside: false,
      dialog_add: false,
      editableProyect: {},
      editableTitle: "",
      editableDescription: "",
      repositories: [],
    };
  },

  mounted: async function () {
    let resultado = await LinkService.getProfileById(this.$route.params.id);
    this.profile = resultado[0];
    this.proyects = await LinkService.getProyectByOwner(this.$route.params.id);
    let rawRepositorys = await LinkService.getRepositories(
      this.profile.namegithub
    );
    for(let i=0;i<rawRepositorys.length;i++){
        
    }
    console.log(this.repositories);

  },
  methods: {
    cardSelect(p_id) {
      this.dialog = true;
      let index = 0;

      for (var i = 0; i < this.proyects.length; i++) {
        if (p_id == this.proyects[i].id) {
          index = i;
        }
      }
      this.selectedProyect = this.proyects[index];
      this.editableTitle = this.proyects[index].title;
      this.editableDescription = this.proyects[index].description;
    },
    editProyect() {
      this.dialog_inside = true;
      this.editableProyect = this.selectedProyect;
    },
    sendEditProyect() {
      const submitEdition = {
        title: this.editableTitle,
        description: this.editableDescription,
      };
      console.log(submitEdition);
      LinkService.setedit(this.selectedProyect.id, submitEdition);

      this.refreshData();
      this.dialog_inside = false;
      this.dialog = false;
    },
    async refreshData() {
      let resultado = await LinkService.getProfileById(this.$route.params.id);
      this.profile = resultado[0];
      this.proyects = await LinkService.getProyectByOwner(
        this.$route.params.id
      );
    },
    addProyect() {
      this.editableTitle = "";
      this.editableDescription = "";
      LinkService.addProyect(
        this.editableTitle,
        this.editableDescription,
        this.$route.params.id
      );
      this.refreshData();
      this.editableTitle = "";
      this.editableDescription = "";
      this.dialog_add = false;
    },
    deleteProyect() {
      swal({
        title: "¿Estas seguro?",
        text: "Se eliminara tu proyecto!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          LinkService.deleteProyects(this.selectedProyect.id);
          this.refreshData();
          this.editableTitle = "";
          this.editableDescription = "";
          this.dialog = false;
          swal("Proyecto eliminado correctamente", {
            icon: "success",
          });
        } else {
          swal("ta bien");
        }
      });
    },
  },
};
</script>

<style>
.d-flex {
  display: flex !important;
}
.container-buttons {
  width: 100%;
}
.btn-info {
  margin-left: 25px;
}
.title-dialog {
  text-align: center;
}
.text-dialog {
  text-align: justify;
}
.dialog-inside {
  background: white !important;
  width: auto;
  height: auto;
}
.cont-edit {
  background: white !important;
  min-height: 30pc !important;
}
</style>
