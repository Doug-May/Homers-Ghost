<template>
    <v-container>
        <div id="register" class="myCard">
            <div @keyup.prevent.enter="register" ref="form" lazy-validation class="userBox">
                <!-- <v-icon class="backButton" @click="$router.go(-1)">keyboard_backspace</v-icon> -->
                <h1 class="darkText text-xs-center">Register</h1>
                <v-text-field v-if="$store.state.errors.userName" v-model="userName" label="User Name" color="#a04b4b"
                    required :rules="[() => $store.state.errors.userName]" error></v-text-field>
                <v-text-field v-else v-model="userName" color="secondary" label="User Name" required></v-text-field>
                <v-text-field v-if="$store.state.errors.email" v-model="email" label="E-mail" color="#a04b4b" required
                    :rules="[() => $store.state.errors.email]" error></v-text-field>
                <v-text-field v-else v-model="email" color="secondary" label="E-mail" required></v-text-field>
                <v-text-field v-if="$store.state.errors.password" v-model="password" label="Password" required :rules="[() => $store.state.errors.password]"
                    error :type="show1 ? 'text' : 'password'" :append-icon="show1 ? 'visibility' : 'visibility_off'"
                    @click:append="show1 = !show1"></v-text-field>
                <v-text-field v-else v-model="password" color="secondary" label="Password" required :type="show1 ? 'text' : 'password'"
                    :append-icon="show1 ? 'visibility' : 'visibility_off'" @click:append="show1 = !show1"></v-text-field>
                <v-text-field v-if="$store.state.errors.password2" v-model="password2" label="Confirm Password"
                    required :rules="[() => $store.state.errors.password2]" error :type="show2 ? 'text' : 'password'"
                    :append-icon="show2 ? 'visibility' : 'visibility_off'" @click:append="show2 = !show2"></v-text-field>
                <v-text-field v-else v-model="password2" color="secondary" label="Confirm Password" required :type="show2 ? 'text' : 'password'"
                    :append-icon="show2 ? 'visibility' : 'visibility_off'" @click:append="show2 = !show2"></v-text-field>

                <v-btn block round id="submitButton" color="secondary" @click="register">
                    Submit
                </v-btn>
            </div>
        </div>
        <p class="lightFont text-xs-center">Back to <span class="redirect" @click="$router.push('/login')">login</span></p>
    </v-container>
</template>

<script>
import Validate from "@/validation/registration.js";
export default {
  name: "register",
  data() {
    return {
      userName: "",
      email: "",
      password: "",
      password2: "",
      show1: false,
      show2: false
    };
  },
  methods: {
    register: function() {
      this.$store.commit("CLEAR_ERRORS");
      //build the object for the current component state
      let data = {};
      data.userName = this.userName.trim();
      data.password = this.password.trim();
      data.password2 = this.password2.trim();
      data.email = this.email.trim();
      //Check input validation and dispatch register if it is
      const { errors, isValid } = Validate(data);
      if (!isValid) {
        this.$store.commit("SET_ERRORS", errors);
      } else {
        const req = {
          userName: this.userName.trim(),
          email: this.email.trim(),
          password: this.password.trim()
        };
        this.$store.dispatch("register", req);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>