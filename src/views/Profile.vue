<template>
  <div class="profile">
    <v-container>
      <v-row>
        <v-col class="d-flex">
          <h2>{{ this.profile.myname }} {{ this.profile.lastname }}</h2>
          <v-icon @click="dialog_edit_profile = true">mdi-pencil</v-icon>
          <v-dialog
            min-width="900"
            min-height="900"
            class="dialog-inside"
            v-model="dialog_edit_profile"
            persistent
            max-width="900"
          >
            <v-container class="cont-edit">
              <v-row>
                <v-col>
                  <v-text-field
                    label="Nombre"
                    v-model="editNameProfile"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Apellido"
                    v-model="editLastNameProfile"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-textarea
                label="Descripcion del proyecto"
                v-model="editInfoProfile"
              ></v-textarea>
              <v-select
                :items="repositories"
                single-line
                return-object
                item-text="name"
                item-value="link"
                label="Repositorio de Github"
                v-model="editableRepository"
              ></v-select>
              <v-btn @click="dialog_edit_profile = false">Salir</v-btn>
              <v-btn @click="sendEditProfile()">Editar</v-btn>
            </v-container>
          </v-dialog>
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

              <v-select
                :items="repositories"
                single-line
                return-object
                item-text="name"
                item-value="link"
                label="Repositorio de Github"
                v-model="editableRepository"
              ></v-select>

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
                    <v-btn
                      v-bind:href="this.selectedProyect.linktogithub"
                      color="purple darken-1"
                      text
                    >
                      <v-icon>mdi-launch</v-icon> Github
                    </v-btn>
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
                        <v-select
                          :items="repositories"
                          single-line
                          return-object
                          item-text="name"
                          item-value="link"
                          label="Repositorio de Github"
                          v-model="editableRepository"
                        ></v-select>
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
      editableRepository: "",
      repositories: [],
      dialog_edit_profile: false,
      editNameProfile: "",
      editLastNameProfile: "",
      editInfoProfile: "",
    };
  },

  mounted: async function () {
   
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
    sendEditProfile() {
      const submitEdition = {
        myname: this.editNameProfile,
        lastname: this.editLastNameProfile,
        myinfo: this.editInfoProfile,
      };

      LinkService.setprofile(this.profile.id, submitEdition);
      this.refreshData();
      this.dialog_edit_profile = false;
    },
    sendEditProyect() {
      const submitEdition = {
        title: this.editableTitle,
        description: this.editableDescription,
      };

      LinkService.setedit(this.selectedProyect.id, submitEdition);

      this.refreshData();
      this.dialog_inside = false;
      this.dialog = false;
    },

    async refreshData() {
      let resultado = await LinkService.getProfileById(this.$route.params.id);

      this.profile = resultado;

      this.proyects = await LinkService.getProyectByOwner(
        this.$route.params.id
      );
    },
    addProyect() {
      LinkService.addProyect(
        this.editableTitle,
        this.editableDescription,
        this.$route.params.id,
        this.editableRepository.link
      );
      this.refreshData();
      this.editableTitle = "";
      this.editableDescription = "";
      this.editableRepository = "";
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
