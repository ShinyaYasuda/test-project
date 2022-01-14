<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12" sm="6" lg="6" xl="3"><v-text-field id="textUserId" label="ユーザーID" v-model="queryUserId"></v-text-field></v-col>
                <v-col cols="12" sm="6" lg="6" xl="3"><v-text-field label="ユーザー名" v-model="queryName"></v-text-field></v-col>
                <v-col cols="12" sm="6" lg="6" xl="3"><v-text-field label="タイトル" v-model="queryTitle"></v-text-field></v-col>
                <v-col cols="12" sm="6" lg="6" xl="3"><v-text-field label="本文" v-model="queryBody"></v-text-field></v-col>
            </v-row>
            <v-row>
                <v-col cols="4" sm="4" lg="2" xl="1"><button @click="reset">リセット</button></v-col>
                <v-col cols="4" sm="4" lg="2" xl="1"><button @click="changeSortUserId">ユーザーID{{getSortArrow(sortUserId)}}</button></v-col>
                <v-col cols="4" sm="4" lg="2" xl="1"><button @click="changeSortTitle">タイトル{{getSortArrow(sortTitle)}}</button></v-col>
            </v-row>
            <post-cards :posts="posts" :users="users"></post-cards>
        </v-container>
    </div>
</template>
<script lang="ts" >
import axios from 'axios'
import Vue from 'vue'
import postCard from '~/components/post-card.vue'
import PostCards from '~/components/post-cards.vue'
import {Post} from "~/types/post"
import {User} from "~/types/user"
export default Vue.extend({
  components: { postCard, PostCards },
    data: () => ({
        posts: [] as Post[],
        users: [] as User[],
        queryUserId: "",
        queryName: "",
        queryTitle: "",
        queryBody: "",
        sortTitle: 0,
        sortUserId: 0
    }),
  watch: {
      queryUserId: function () {
        this.$fetch()
      },
      queryName: function () {
        this.$fetch()
      },
      queryTitle: function () {
        this.$fetch()
      },
      queryBody: function () {
        this.$fetch()
      },
      sortTitle: function () {
          this.sort()
      },
      sortUserId: function () {
          this.sort()
      }
  },
  methods: {
    reset: function(): void {
        this.queryUserId = ""
        this.queryName = ""
        this.queryTitle = ""
        this.queryBody = ""
        this.sortUserId = 0
        this.sortTitle = 0
    },
    changeSortTitle(): void {
        this.sortTitle = (this.sortTitle + 1) % 3
    },
    changeSortUserId(): void {
        this.sortUserId = (this.sortUserId + 1) % 3
    },
    getSortArrow: function(num: number): string {
        switch (num) {
            case 0:
                return "→"
            case 1:
                return "↓"
            case 2:
                return "↑"
            default:
                return ""
        }
    },
    sort: function(): void {
        this.posts.sort((a: Post,b: Post) : number => {
            if (this.sortTitle === 0 && this.sortUserId === 0){
                if (a.id < b.id) return -1
                if (a.id > b.id) return 1
                return 0
            }else if (this.sortTitle === 1 && this.sortUserId === 0){
                if (a.title < b.title) return -1
                if (a.title > b.title) return 1
                if (a.id < b.id) return -1
                if (a.id > b.id) return 1
                return 0
            }else if (this.sortTitle === 0 && this.sortUserId === 1){
                if (a.userId < b.userId) return -1
                if (a.userId > b.userId) return 1
                if (a.id < b.id) return -1
                if (a.id > b.id) return 1
                return 0
            }else if (this.sortTitle === 1 && this.sortUserId === 1){
                if (a.userId < b.userId) return -1
                if (a.userId > b.userId) return 1
                if (a.title < b.title) return -1
                if (a.title > b.title) return 1
                return 0
            }else if (this.sortTitle === 2 && this.sortUserId === 0){
                if (a.title > b.title) return -1
                if (a.title < b.title) return 1
                if (a.id < b.id) return -1
                if (a.id > b.id) return 1
                return 0
            }else if (this.sortTitle === 0 && this.sortUserId === 2){
                if (a.userId > b.userId) return -1
                if (a.userId < b.userId) return 1
                if (a.id < b.id) return -1
                if (a.id > b.id) return 1
                return 0
            }else if (this.sortTitle === 2 && this.sortUserId === 2){
                if (a.userId > b.userId) return -1
                if (a.userId < b.userId) return 1
                if (a.title > b.title) return -1
                if (a.title < b.title) return 1
                return 0
            }else if (this.sortTitle === 1 && this.sortUserId === 2){
                if (a.userId > b.userId) return -1
                if (a.userId < b.userId) return 1
                if (a.title < b.title) return -1
                if (a.title > b.title) return 1
                return 0
            }else if (this.sortTitle === 2 && this.sortUserId === 1){
                if (a.userId < b.userId) return -1
                if (a.userId > b.userId) return 1
                if (a.title > b.title) return -1
                if (a.title < b.title) return 1
                return 0
            }else{
                return 0
            }
        })
    }
  },
  async fetch() {
    this.$nuxt.$loading.start && this.$nuxt.$loading.start();

    let urlPosts = 'https://jsonplaceholder.typicode.com/posts'
    let urlUsers = 'https://jsonplaceholder.typicode.com/users'

    let arrayPosts : Post[] = new Array
    let arrayUsers : User[] = new Array

    if (this.queryUserId.trim() != "") {
        urlPosts += '?userId=' + this.queryUserId.trim()
        urlUsers += '?id=' + this.queryUserId.trim()
    }

    await Promise.all([
        axios.get(urlPosts).then(response => arrayPosts = response.data),
        axios.get(urlUsers).then(response => arrayUsers = response.data)
    ]);

    if (this.queryName.trim() != "") {
        arrayUsers = arrayUsers.filter(array => array.name.toLowerCase().indexOf(this.queryName) != -1)
        arrayPosts = arrayPosts.filter(post => arrayUsers.some(user => user.id == post.userId))
    }

    if (this.queryTitle.trim() != "") {
        arrayPosts = arrayPosts.filter(array => array.title.toLowerCase().indexOf(this.queryTitle.trim().toLowerCase()) != -1)
    }

    if (this.queryBody.trim() != "") {
        arrayPosts = arrayPosts.filter(array => array.body.toLowerCase().indexOf(this.queryBody.trim().toLowerCase()) != -1)
    }

    this.posts = arrayPosts
    this.users = arrayUsers

    this.sort()

    this.$nuxt.$loading.finish();
  }
})
</script>