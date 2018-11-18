<template>
<v-container>
    <div class="myCard">
        <div @keyup.prevent.enter="save" ref="form" lazy-validation class="userBox">
            <v-icon class="backButton" @click="$router.go(-1)">keyboard_backspace</v-icon>
            <h2 class="darkText text-xs-center">Edit Profile Details</h2>
            <v-text-field v-if="$store.state.errors.userName" v-model="userName" label="User Name" color="#a04b4b"
                required :rules="[() => $store.state.errors.userName]" error></v-text-field>
            <v-text-field v-else v-model="userName" color="secondary" label="User Name" required></v-text-field>
            <v-text-field type="number" min=1 max=1100 slot="activator" label="Reading Speed (wpm)" v-model="wpm" color="secondary"
                oninput="validity.valid||(value=300);" placeholder=300></v-text-field>
            <v-text-field type="number" min=1 max=400 slot="activator" label="Speaking Speed (wpm)" v-model="wpmv"
                color="secondary" oninput="validity.valid||(value=140);" placeholder=140></v-text-field>
            <v-btn block round id="submitButton" color="secondary" @click="save">
                Save
            </v-btn>
        </div>
    </div>
</v-container>
</template>
<script>
import Validate from "@/validation/editProfile.js"
export default {
    data() {
        return {
            userName: this.$store.state.userName,
            wpm: this.$store.state.wpm,
            wpmv: this.$store.state.wpmv
        }
    },
    methods: {
        save() {
            //Check input validation and dispatch editUser if it is valid
            let data = {};
            data.userName = this.userName;
            data.wpm = this.wpm;
            data.wpmv = this.wpmv;
            const { errors, isValid } = Validate(data);
            if (!isValid) {
                this.$store.commit("SET_ERRORS", errors);
            } else {
                let updatedUser = {};
                updatedUser.userName = this.userName;
                updatedUser.wpm = this.wpm;
                updatedUser.wpmv = this.wpmv;
                this.$store.dispatch("editUser", updatedUser);
            }
        }
    }
}
</script>

<style scoped>

</style>
