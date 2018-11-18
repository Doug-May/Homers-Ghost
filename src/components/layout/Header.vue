<template>
    <div id="header">
        <v-toolbar app fixed color="#fff">
            <v-toolbar-title @click="$router.push('/')">
                <span id="homer" class="secondary--text">HOMER'S</span><span id="ghost">GHOST</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                    <v-btn v-if="!this.$store.state.uid" class="headerLink" flat @click="$router.push('/login')">Login</v-btn>
                <v-icon size="30" v-else color="secondary" @click.stop="drawer = !drawer">menu</v-icon>
            </v-toolbar-items>
        </v-toolbar>
        <v-navigation-drawer v-model="drawer" fixed dark temporary right clipped width="210" class="secondary">
            <v-list-tile avatar tag="div">
               
                <v-list-tile-content>
                    <v-list-tile-title class="lightFont">{{this.$store.state.userName}}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-btn icon @click.stop="drawer = !drawer">
                    <v-icon>close</v-icon>
                    </v-btn>
                </v-list-tile-action>
            </v-list-tile>
            <v-list class="pt-0" dense>
                <v-divider light></v-divider>
                <v-list-tile v-for="item in items" :key="item.title" @click="$router.push(item.path)">
                    <v-list-tile-action >
                        <v-icon color="accent">{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="logout">
                    <v-list-tile-action>
                        <v-icon color="accent">directions_run</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>LOGOUT</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    data () {
      return {
        drawer: null,
        items: [
          { title: 'HOME', icon: 'home', path: '/' },
          { title: 'WRITE', icon: 'edit', path: '/write' },
          { title: 'PROFILE', icon: 'perm_identity', path: '/profile' }
        ],
        mini: false,
        right: null
      }
    },
    methods: {
        logout() {
            this.$store.dispatch("logout");
            this.drawer = !this.drawer;
        }
    }
}
</script>

<style scoped>
    #header {
        margin-bottom: 70px;
    }
    #homer, #ghost {
        font-size: 18px;
        cursor: pointer;
    }
    #homer {
        font-weight: 600;
        font-family: "Greek"
    }
    #ghost {
        font-weight: 400;
        font-size: 15px;
        font-family: "Greek";
        opacity: 0.6;
    }
    .headerLink {
        font-weight: 300;
    }
</style>



