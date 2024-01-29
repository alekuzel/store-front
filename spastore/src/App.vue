<template>
 <div>
    <HeaderComp />
    <main>
      <RouterView />
    </main>
    <FooterComp />
    </div>
</template>

<script>
//import components of the apps pages from their locations
import { RouterView } from 'vue-router'
import HeaderComp from "./components/HeaderComp.vue"
import FooterComp from "./components/FooterComp.vue";

export default {
  components: {
    HeaderComp,
    RouterView,
    FooterComp

  }};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

