<template>
    <v-app-bar app elevation="14" color="#1F1F1F" flat>
        <v-tabs v-if="!$vuetify.breakpoint.xsOnly" centered class="ml-n9" color="#FF0024" dark>
            <v-tab v-for="item in items" :key="item.title" :to="item.to">
                <v-icon size="25px">
                    {{ item.icon }}
                </v-icon>
                <v-col>
                    {{ item.title }}
                </v-col>
            </v-tab>
        </v-tabs>
        <v-tabs
            v-if="$vuetify.breakpoint.xsOnly"
            color="#FF0024"
            dark
            next-icon="fa-solid fa-caret-right"
            prev-icon="fa-solid fa-caret-left"
            show-arrows
        >
            <v-tabs-slider></v-tabs-slider>
            <v-tab v-for="item in items" :key="item.title" :to="item.to">
                <v-icon> {{ item.icon }} </v-icon>
                <v-col>
                    {{ item.title }}
                </v-col>
            </v-tab>
        </v-tabs>
    </v-app-bar>
</template>

<script>
export default {
    data: () => ({
        items: [
            { title: 'home', icon: 'fa-solid fa-home', to: '/' },
            { title: 'livro', icon: 'fa-solid fa-book', to: '/livro' },
            { title: 'editora', icon: 'fa-solid fa-feather', to: '/editora' },
            { title: 'leitor', icon: 'fa-solid fa-user', to: '/leitor' },
            { title: 'aluguéis', icon: 'fa-regular fa-bookmark', to: '/aluguel' }
        ]
    })
};
</script>
