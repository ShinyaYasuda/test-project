<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12" sm="6" lg="6" xl="3"><v-text-field label="ユーザーID" v-model="queryUserId"></v-text-field></v-col>
                <v-col cols="12" sm="6" lg="6" xl="3"><v-text-field label="ユーザー名" v-model="queryName"></v-text-field></v-col>
                <v-col cols="12" sm="6" lg="6" xl="3"><v-text-field label="タイトル" v-model="queryTitle"></v-text-field></v-col>
                <v-col cols="12" sm="6" lg="6" xl="3"><v-text-field label="本文" v-model="queryBody"></v-text-field></v-col>
            </v-row>
        </v-container>
        <v-container>
            <div v-if="posts.length">
                <v-row>
                    <v-col v-for="post in posts" :key="post.id" cols="12" sm="6" lg="4" xl="3">
                        <v-card>
                            <v-card-title>{{ post.title }}</v-card-title>
                            <v-card-subtitle>{{post.userId + " : " + getName(post.userId) }}</v-card-subtitle>
                            <v-card-text>{{ post.body }}</v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
            <div v-else>
                <v-row>
                    <v-col cols="12">
                        <v-card>
                            <v-card-title>NO DATA</v-card-title>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
        </v-container>
    </div>
</template>
<script >
import axios from 'axios'
// import {Post} from "~/types/post"
// import {User} from "~/types/user"
export default {
    data: () => ({
        posts: [{
            body : "",
            id : 0,
            title : "",
            userId : 0
        }],
        users: [{
            id : 0,
            name : "",
            userName : "",
            email : "",
            address : {
                street : "",
                suite : "",
                city : "",
                zipcode : "",
                geo : {
                    lat : "",
                    lng : ""
                }
            },
            phone : "",
            website : "",
            company: {
                name : "",
                catchPhrase : "",
                bs : "" 
            }
        }],
        queryUserId: "",
        queryName: "",
        queryTitle: "",
        queryBody: ""
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
      }
  },
  methods: {
    getName: function(userId) {
        let name = {...{...this.users.filter( a => a.id == userId )}[0]}.name
        return name
    }
  },
  
  async fetch() {
    this.$nuxt.$loading.start && this.$nuxt.$loading.start();

    let urlPosts = 'https://jsonplaceholder.typicode.com/posts'
    let urlUsers = 'https://jsonplaceholder.typicode.com/users'

    let arrayPosts
    let arrayUsers

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

    this.$nuxt.$loading.finish();
  }
}
</script>