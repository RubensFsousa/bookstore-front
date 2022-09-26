<template>
  <v-app id="inspire">
    <Header></Header>
    <v-main id="main-page">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
  import Publisher from './service/publishers'
  import User from './service/users'
  import Rent from './service/rent'
  import Header from './components/Header'
  import Footer from './components/Footer'
  import Book from './components/Book'

  export default {

    components: {
        Header,
        Footer,
        Book,
      },
    
    data: () => ({
      
      publishers:[],
      users:[],
      rentals:[],
    }),

    mounted(){
      Publisher.getAllPublishers().then(response => {
        this.publishers = response.data.content
      }),
      User.getAllUsers().then(response => {
        this.users = response.data.content
      }),
      Rent.getAllRents().then(response => {
        this.rentals = response.data.content
      })
    },
  }
</script>

<style>
  #main-page{
    background-color: #1f1f1f;
  }
</style>




  






