<template>
  <div id="about">
    <img id="logo" src="@/assets/logo.png" alt="">
    <h1 class="lightFont text-xs-center">About</h1>
        <p id="aboutText" class="lightFont">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus eos, perspiciatis soluta, a assumenda voluptatum iure deserunt magnam voluptatem autem labore nihil debitis amet in fugiat laudantium. Labore saepe cumque ut, corrupti ipsa minus pariatur? Deleniti commodi quas, blanditiis earum dicta suscipit at sunt vel eos saepe minima dolor explicabo dolore. Vitae illo, dignissimos cumque tempore repellat quisquam, culpa aliquam inventore sequi nam dolore blanditiis eligendi consectetur nisi dolorum? Voluptates quibusdam excepturi unde laudantium tenetur qui officia cupiditate vel, fugiat minus. Doloribus, unde suscipit.</p>
  </div>
</template>


<style scoped>
#logo {
  height: 1000px;
  position: fixed;
  margin-top: -120px;
  opacity: 0;
  animation: ghost 1.1s ease-in-out forwards;
  animation-iteration-count: 1;
}
#aboutText {
  max-width: 700px;
  margin: auto;
}
@media (max-width: 700px) {
  #logo{
    height: 820px;
  } 
}
@media (max-width: 450px) {
  #logo{
    height: 650px;
    margin-left: -70px;
  } 
}
@keyframes ghost {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.11;
    }
  }
</style>
