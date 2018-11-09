import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/firebase/init.js'
import swal from "sweetalert2"
import router from '@/router.js'
import moment from 'moment'
import outline from "@/templates/outline.js"
import storyValidate from "@/validation/storyValidate.js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    errors: {},
    uid: null,
    userName: null,
    email: null,
    stories: [],
    currentStory: {},
    brainstorm: null,
    lastSave: null
  },
  mutations: {
    REFRESH_USER(state, user) {
      state.uid = user.uid;
      state.email = user.email;
      state.userName = user.userName;
      state.stories = user.stories;
      state.brainstorm = user.brainstorm;
      state.currentStory = user.currentStory;
    },
    CLEAR_ERRORS(state) {
      state.errors = {};
    },
    SET_ERRORS(state, payload) {
      state.errors = {...state.errors, ...payload};
    },
    LOGOUT(state) {
      state.errors = {};
      state.uid = null;
      state.userName = null;
      state.stories = [];
      state.brainstorm = null;
      state.email = null;
      router.push("/login");
    },
    SET_CURRENT_STORY(state, payload) {
      state.currentStory = payload;
    },
    UPDATE_CURRENT_STORY_CONTENT(state, value) {
      state.currentStory.story = value;
    },
    UPDATE_CURRENT_STORY_NOTES(state, value) {
      state.currentStory.notes = value;
    },
    SAVE_STATUS(state, bool) {
      if (bool) {
        state.lastSave = moment(Date.now()).format('lll');
      } else {
        state.lastSave = null;
      }
    },
    LIMIT_STORY(state, limit) {

    }
  },
  actions: {
    login({ dispatch, commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        dispatch("refreshUser");
        swal({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          type: "success",
          title: "Logged In",
          customClass: "alert"
        });
        router.push("/");
      })
      .catch(error => {
        let payload = {};
        if (error.code == "auth/invalid-email") {
          payload.email = "Invalid Email";
        }
        if (error.code == "auth/user-not-found") {
          payload.email = "User Not Found";
        }
        if (error.code == "auth/wrong-password") {
          payload.password = "Incorrect Password";
        }
        commit("SET_ERRORS", payload);
      })
    },
    register({ dispatch, commit }, payload) {
      //create the user in firebase authentication
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        //add the user to the users collection       
        let newUser = {};
        newUser.userName = payload.userName;
        newUser.brainstorm = "";
        newUser.stories = [];
        newUser.currentStory = {};
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set(newUser)
        .then(() => {
          dispatch("refreshUser");
          swal({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            type: "success",
            title: "Registered!",
            customClass: "alert"
          });
          router.push("/");
        })        
        .catch(error => {
          console.log(error);
        })        
      })
      .catch(error => {
        let payload = {};
          if (error.code == "auth/email-already-in-use") {
            payload.email = "Email Is Already In Use";
          }
          if (error.code == "auth/invalid-email") {
            payload.email = "Invalid Email";
          }
          if (error.code == "auth/weak-password") {
            payload.password = "Password Not Strong Enough";
          }
          commit("SET_ERRORS", payload);
      })
    },
    refreshUser({ commit }) {
      let user = firebase.auth().currentUser;
        if (user) {
          
          // Initialize the payload object
          let payload = {};
          payload.stories = [];
          payload.brainstorm = '';
          payload.uid = user.uid;
          payload.email = user.email;
          payload.userName = '';
          payload.currentStory = {};

          // Call for getting userName, stories, brainstorm, currentStory
          firebase.firestore().collection("users").doc(user.uid).get()
          .then(doc => {
            payload.userName = doc.data().userName;
            payload.brainstorm = doc.data().brainstorm;
            payload.stories = doc.data().stories;
            payload.currentStory = doc.data().currentStory;
            commit("REFRESH_USER", payload);
          })
          .catch(err => {
              console.log(err);
          })  
        }                      
    },
    logout({ commit }) {
      firebase.auth().signOut()
      .then(() => {
        swal({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          type: "success",
          title: "Logged Out",
          customClass: "alert"
        });        
        commit("LOGOUT");        
      })
      .catch(error => {
        console.log(error);
      });
    },
    createStory({ dispatch }, payload) {
      // initialize the story object
      let story = {};
      story.notes = outline;
      story.story = '';
      story.storyTitle = payload.storyTitle;
      story.uid = firebase.auth().currentUser.uid;
      // add the new story to the database
      firebase.firestore().collection("stories").add(story)
      .then(docRef => {
        //set the ref
        let ref = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid);
        //Get the current stories array from the server
        ref.get()
        .then(doc => {
          let currentStories = doc.data().stories;
          currentStories.unshift({id: docRef.id, storyTitle: story.storyTitle});
          ref.update({stories: currentStories})
          .then(() => {
            dispatch("refreshUser");
            dispatch("setCurrentStory", docRef.id);
            router.push("/write");
          })
        })
      })
      .catch(err => {
        console.log(err);
      })
    },
    setCurrentStory({ dispatch }, storyID) {
      //Fetch the story
      firebase.firestore().collection("stories").doc(storyID).get()
      .then(doc => {
        //change the users current story on the servers
        let data = doc.data();
        let forServer = {};
        forServer.notes = data.notes;
        forServer.story = data.story;
        forServer.storyTitle = data.storyTitle;
        forServer.id = doc.id;
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).update({
          currentStory: forServer
        })
        .then(() => {
          //refresh the user to get all the changes
         
          dispatch("refreshUser");
        })
        .catch(err => {
          console.log(err);
        })
      })
    },
    saveStory({ dispatch, commit }, currentStory) {
      // set up variables for alert
      let errors = storyValidate(currentStory);
      let text = "";
      let showAlert = false;
      if(errors.story && errors.notes) {
        currentStory.story = currentStory.story.slice(0,70000);
        currentStory.notes = currentStory.notes.slice(0,10000);
        showAlert = true;
        text = "Both your story and your notes are too long. We'll save as much as we can but you'll need to shorten both."
      } else if (errors.story) {
        currentStory.story = currentStory.story.slice(0,70000);
        showAlert = true;
        text = "Your story is too long. We'll save as much as we can but you'll need to shorten it."
      } else if (errors.notes) {
        currentStory.notes = currentStory.notes.slice(0,10000);
        showAlert = true;
        text = "Your notes are too long. We'll save as much as we can but you'll need to shorten them."
      }
      //if needed, show alert 
      if (showAlert) {
        swal({
          title: "Too Long",
          type: "error",
          confirmButtonColor: '#e06b6b',
          text: text,
          confirmButtonText: 'OK',
          customClass: "alert"
          }).then((result) => {
          if (result.value) {
            firebase.firestore().collection("stories").doc(currentStory.id).update({
              story: currentStory.story,
              notes: currentStory.notes
            })
            .then(() => {
              commit("SAVE_STATUS", true);
              dispatch("setCurrentStory", currentStory.id);
              swal({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 3000,
                type: "warning",
                title: "Saved (Up to the Limit)",
                customClass: "alert"
              });
            })
          }
          });
      } else {
        firebase.firestore().collection("stories").doc(currentStory.id).update({
          story: currentStory.story,
          notes: currentStory.notes
        })
        .then(() => {
          commit("SAVE_STATUS", true);
          dispatch("setCurrentStory", currentStory.id);
          swal({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            type: "success",
            title: "Saved",
            customClass: "alert"
          });
        })
      }




      
    },
    //Save the story without dispatching setCurrentStory (for saving on component destroy, switching stories, etc..)
    autoSaveStory({ dispatch }, currentStory) {
      // set up variables for alert
      let errors = storyValidate(currentStory);
      let text = "";
      let showAlert = false;
      if(errors.story && errors.notes) {
        currentStory.story = currentStory.story.slice(0,70000);
        currentStory.notes = currentStory.notes.slice(0,10000);
        showAlert = true;
        text = "Both your story and your notes are too long. We'll save as much as we can but you'll need to shorten both."
      } else if (errors.story) {
        currentStory.story = currentStory.story.slice(0,70000);
        showAlert = true;
        text = "Your story is too long. We'll save as much as we can but you'll need to shorten it."
      } else if (errors.notes) {
        currentStory.story = currentStory.notes.slice(0,10000);
        showAlert = true;
        text = "Your notes are too long. We'll save as much as we can but you'll need to shorten them."
      }
      //if needed, show alert 
      if (showAlert) {
        swal({
          title: "Too Long",
          confirmButtonColor: '#e06b6b',
          type: "error",
          text: text,
          confirmButtonText: 'OK',
          customClass: "alert"
          }).then((result) => {
          if (result.value) {
            firebase.firestore().collection("stories").doc(currentStory.id).update({
              story: currentStory.story,
              notes: currentStory.notes
            })
          }
          });
      } else {
        firebase.firestore().collection("stories").doc(currentStory.id).update({
          story: currentStory.story,
          notes: currentStory.notes
        })
      }







      
    }
  }
})
