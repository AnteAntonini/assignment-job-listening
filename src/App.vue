<template>
  <v-app>
    <v-app-bar
      color="primary"
      dark
      prominent
      app
      class="bar"
    >
    <v-img class="img-desktop" src="bg-header-desktop.svg" cover style="width: 100%; height: 100%"></v-img>
    <v-img class="img-mobile" src="bg-header-mobile.svg" cover style="width: 100%; height: 100%"></v-img>
    </v-app-bar>

    <v-main>
      <job-listing/>
    </v-main>
  </v-app>
</template>

<script>
import JobListing from './components/JobListing';

export default {
  name: 'App',

  components: {
    JobListing
  },
};
</script>

<style lang="scss">
.bar{
  z-index: 0 !important;
}
.img-mobile{
  display: none;
}
.v-toolbar__content{
  padding: 0 !important;
}
@media all and (max-width: 375px){
  .img{
    &-mobile{
    display: block;
    background-image: url('/public/bg-header-mobile.svg');
    }
    &-desktop{
      display: none;
    }
  }
}
</style>