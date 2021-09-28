<template class="body">
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="userTyped"
                  name="login"
                  label="Login"
                  type="text"
                ></v-text-field>
                <v-text-field
                  id="password"
                  v-model="passwordTyped"
                  name="password"
                  label="Password"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="validatePersona">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import LinkService from "../services/data";
export default {
  name: "Home",

  components: {},
  data() {
    return {
      userTyped: "",
      passwordTyped: "",
    };
  },
  mounted: async function () {},
  methods: {
    async validatePersona() {
      const personaTyped = {
        user: this.userTyped,
        password: this.passwordTyped,
      };
      let idUser = await LinkService.validateUser(personaTyped);
      console.log(idUser)
      this.$store.commit('chargeUser',idUser);
      this.$router.push({ name: 'Profile', params: { id: `${idUser}` } })
    },
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background: purple;
  background-size: cover;
  font-family: sans-serif;
  height: 100vh;
}

.login-box {
  width: 320px;
  height: 420px;
  background: #000;
  color: #fff;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  padding: 70px 30px;
}

.login-box .avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: absolute;
  top: -50px;
  left: calc(50% - 50px);
}

.login-box h1 {
  margin: 0;
  padding: 0 0 20px;
  text-align: center;
  font-size: 22px;
}

.login-box label {
  margin: 0;
  padding: 0;
  font-weight: bold;
  display: block;
}

.login-box input {
  width: 100%;
  margin-bottom: 20px;
}

.login-box input[type="text"],
.login-box input[type="password"] {
  border: none;
  border-bottom: 1px solid #fff;
  background: transparent;
  outline: none;
  height: 40px;
  color: #fff;
  font-size: 16px;
}

.login-box input[type="submit"] {
  border: none;
  outline: none;
  height: 40px;
  background: #b80f22;
  color: #fff;
  font-size: 18px;
  border-radius: 20px;
}

.login-box input[type="submit"]:hover {
  cursor: pointer;
  background: #ffc107;
  color: #000;
}

.login-box a {
  text-decoration: none;
  font-size: 12px;
  line-height: 20px;
  color: darkgrey;
}

.login-box a:hover {
  color: #fff;
}
</style>
