<template>
<v-container>
    <div id="login" class="myCard">
        <div @keyup.prevent.enter="login" ref="form" lazy-validation class="userBox">
            <!-- <v-icon class="backButton" @click="$router.go(-1)">keyboard_backspace</v-icon> -->
            <h2 class="darkText text-xs-center">Login</h2>
            <v-text-field v-if="$store.state.errors.email" v-model="email" label="E-mail" color="#a04b4b" required :rules="[() => $store.state.errors.email]"
                error></v-text-field>
            <v-text-field v-else v-model="email" color="secondary" label="E-mail" required></v-text-field>
            <v-text-field v-if="$store.state.errors.password" v-model="password" label="Password" required :rules="[() => $store.state.errors.password]"
                error :type="show1 ? 'text' : 'password'" :append-icon="show1 ? 'visibility' : 'visibility_off'"
                @click:append="show1 = !show1"></v-text-field>
            <v-text-field v-else v-model="password" color="secondary" label="Password" required :type="show1 ? 'text' : 'password'"
                :append-icon="show1 ? 'visibility' : 'visibility_off'" @click:append="show1 = !show1"></v-text-field>

            <v-btn block round id="submitButton" color="secondary" @click="login">
                Submit
            </v-btn>
            <p class="text-xs-center" @click="$router.push('/resetpassword')"><span class="redirect" @click="$router.push('/resetpassword')">Forgot your password?</span></p>
        </div>
    </div>
<p class="lightFont text-xs-center">New? Create an account <span class="redirect" @click="$router.push('/register')">here</span></p>
</v-container>

</template>

<script>
export default {
  name: "login",
    data() {
        return {
            email: '',
            password: '',
            show1: false
        }
    },
    methods: {
        login: function() {
        this.$store.commit("CLEAR_ERRORS");
        const req = {
            email: this.email.trim(),
            password: this.password.trim()
        };
        this.$store.dispatch("login", req);
        }
    },
    created() {
        if(this.$store.state.uid) {
        this.$router.push("/");
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>