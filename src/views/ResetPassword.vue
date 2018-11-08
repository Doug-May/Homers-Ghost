<template>
<div>
    <div id="sendEmail" class="myCard">
        <div @keyup.prevent.enter="sendEmail" ref="form" lazy-validation class="userBox">
            <!-- <v-icon class="backButton" @click="$router.go(-1)">keyboard_backspace</v-icon> -->
            <h1 class="darkText text-xs-center">Reset Password</h1>
            <p>Enter the email associated with your account and we'll send you a link to reset your password.</p>
            <v-text-field v-if="$store.state.errors.email" v-model="email" label="E-mail" color="#a04b4b" required :rules="[() => $store.state.errors.email]"
                error></v-text-field>
            <v-text-field v-else v-model="email" color="secondary" label="E-mail" required></v-text-field>
            <v-btn block round id="submitButton" color="secondary" @click="sendEmail">
                Send Email
            </v-btn>
        </div>
    </div>
<p class="lightFont text-xs-center">Back to <span class="redirect" @click="$router.push('/login')">login</span></p>
</div>

</template>

<script>
import firebase from "@/firebase/init.js"
import swal from "sweetalert2";
export default {
  name: "sendEmail",
  data() {
      return {
          email: ''
      }
  },
  methods: {
      sendEmail() {
      this.$store.commit("CLEAR_ERRORS");
      firebase.auth().sendPasswordResetEmail(this.email.trim())
      .then(() => {
        swal({
        showConfirmButton: true,
        type: "success",
        title: "Success",
        text: "An email was sent to " + this.email.trim(),
        customClass: "alert"
        });
        this.$router.push("/login");
      })
      .catch(error => {
        let payload = {};
        if (error.code == "auth/invalid-email") {
          payload.email = "Invalid Email";
        }
        if (error.code == "auth/user-not-found") {
          payload.email = "There Is No User With That Email";
        }
        this.$store.commit("SET_ERRORS", payload);
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>