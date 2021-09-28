<template>
  <div id="app">
    <v-app-bar app color="purple" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="white--text">
      </v-app-bar-nav-icon>
      <v-app-bar-title class="white--text">EasyJobs</v-app-bar-title>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed app clipped temporary>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title><h2>EasyJobs</h2></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item v-for="item in items" :key="item.title">
          <v-list-item-content>
            <!--<v-list-item-title>{{ item.title }}</v-list-item-title>-->
            <v-btn
              link
              :to="item.href"
              color="#7E0B9F"
              class="button-navigation"
              large
              block
              rounded
            >
              {{ item.title }}
            </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            @click="asdf"
            color="#F80356"
            class="button-logout"
            large
            block
            rounded
          >
            SALIR
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  watch: {
    group() {
      this.drawer = false;
    },
  },

  data() {
    return {
      drawer: false,
      group: null,
      testvar: this.ruteOfUser,
      raw: this.$store.getters.getId,
      items: [
        
      ],
    };
  },

  created() {
    let linkPractitioner = `/main/practitioner/${this.$store.getters.getId}`;
    let linkProfile = `/main/profile/${this.$store.getters.getId}`;
    let items2 = [
      { title: "Inicio", href: "/home" },
      { title: "Perfil", href: linkProfile },
      { title: "Notificaciones", href: "/main/about" },
      { title: "Mensajes", href: "/currentproyect" },
      { title: "Para Practicantes", href: linkPractitioner },
      { title: "Premium" },
    ];
    this.items= items2;
    //this.testvar=linkxd
  },
  watch:{
    raw:function(){
      console.log("raaawr",raw)
    }
  },
  methods: {
    asdf() {
      console.log(this.ruteOfUser);
    },
    testMet() {},
  },
  computed: {
    ruteOfUser() {
      console.log(this.$store.getters.getId,"computada")
      return this.$store.getters.getId;
    },
    refresh() {
      
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");

h2 {
  font-family: "Pacifico", cursive;
  height: 72px;
  font-size: 2pc;
  color: purple;
  text-align: center;
}

[b1],
.b1 {
  border: 1px dashed red;
}

.list__item {
  height: auto;
  min-height: 48px;
}

.list__item__title {
  white-space: normal !important;
  text-overflow: wrap !important;
  word-wrap: break-word;
}
.v-navigation-drawer {
  width: 280px !important;
}

.title-sidebar {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #7e0b9f;
  height: 6pc;
  color: white;
}
.button-navigation {
  color: white !important;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
}
.button-logout {
  font-weight: 700;
  margin-bottom: 30px;
  color: white !important;
  font-family: "Poppins", sans-serif;
}
.v-list-item {
  padding: 0 30px !important;
}
.pa-2 {
  padding: 8px 30px !important;
}
</style>
