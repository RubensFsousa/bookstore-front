<template>
    <v-app-bar
      app
      elevation='14'
      color=#1F1F1F
      flat
    >

      <v-tabs
        centered
        class="ml-n9"
        color=#FF0038
      >
        <v-tab
          v-for="item in items"
          :key="item.title"
          link
          
        >
          <v-icon
            size="25px"
          >
            {{item.icon}}
          
          </v-icon>
          <v-col>
            {{item.title}}
          </v-col>
        </v-tab>
      </v-tabs>
    </v-app-bar>
</template>

<script>
export default {
    data: () => ({
        items: [
        {title:'home',icon:"fa-solid fa-home"},
        {title:'livro',icon:"fa-solid fa-book"},
        {title:'editora',icon:"fa-solid fa-feather"},
        {title:'leitor',icon:"fa-solid fa-user"},
        {title:'aluguéis',icon:"fa-regular fa-bookmark"},
      ],
    })
}
</script>