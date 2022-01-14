<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <post-card :post="posts" :userName="getName(posts.userId)"></post-card>
                </v-col>
            </v-row>
            <br>
            <p>comments</p>
            <v-row>
                <v-col v-for="comment in comments" :key="comment.id" cols="12" sm="6" lg="4" xl="3">
                    <v-card color="#333333">
                        <v-card-title>{{ comment.name }}</v-card-title>
                        <v-card-text>{{ comment.body }}</v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import {Post} from "~/types/post"
import {User} from "~/types/user"
import {Comment} from "~/types/comment"
import postCard from '~/components/post-card.vue'
export default Vue.extend({
  components: { postCard },
    data: () => ({
        posts: [] as Post[],
        users: [] as User[],
        comments: [] as Comment[],
        queryUserId: "",
        queryName: "",
        queryTitle: "",
        queryBody: "",
        sortTitle: 0,
        sortUserId: 0
    }),
    methods: {
        getName: function(userId: number) {
            let name = {...{...this.users.filter( a => a.id == userId )}[0]}.name
            return name
        },
    },
    async fetch(){
        this.$nuxt.$loading.start && this.$nuxt.$loading.start();

        let urlPosts = 'https://jsonplaceholder.typicode.com/posts/' + this.$route.params.id
        let urlUsers = 'https://jsonplaceholder.typicode.com/users'
        let urlComments = 'https://jsonplaceholder.typicode.com/posts/' + this.$route.params.id + '/comments'

        await Promise.all([
            axios.get(urlPosts).then(response => this.posts = response.data),
            axios.get(urlUsers).then(response => this.users = response.data),
            axios.get(urlComments).then(response => this.comments = response.data)
        ]);

        this.$nuxt.$loading.finish();
    }
})
</script>
