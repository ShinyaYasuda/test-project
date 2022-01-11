<template>
    <div>
        <p>sub document file</p>
        <v-text-field label="text search" v-model="query"></v-text-field>
        <div v-if="posts.length">
            <v-card v-for="post in posts" :key="post.id">
                <v-card-title>{{ post.title }}</v-card-title>
                <v-card-subtitle>{{post.userId + " : " + getName(post.userId) }}</v-card-subtitle>
                <v-card-text>{{ post.body }}</v-card-text>
            </v-card>
        </div>
        <div v-else>
            <v-card>
                <v-card-title>NO DATA</v-card-title>
            </v-card>
        </div>
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
        query: ""
    }),
  watch: {
      query: function () {
        this.getData(this.query).then(response => this.posts = response.posts)
      }
  },
  methods: {
      getData: async (query = "") => {
        let url = 'https://jsonplaceholder.typicode.com/posts'
        if (query != "") {
            url += '?userId=' + query
        }
        const result = await axios.get(url)
        
        return {
            posts: result.data
        }

    },
    getName: function(userId) {
        let name = {...{...this.users.filter( a => a.id == userId )}[0]}.name
        return name
    }
  },
//   async asyncData() {
//   },
  async fetch() {
    this.$nuxt.$loading.start && this.$nuxt.$loading.start();

    let urlPosts = 'https://jsonplaceholder.typicode.com/posts'
    let urlUsers = 'https://jsonplaceholder.typicode.com/users'

    await Promise.all([
        axios.get(urlPosts).then(response => this.posts = response.data),
        axios.get(urlUsers).then(response => this.users = response.data)
    ]);
    this.$nuxt.$loading.finish();
  }

//   ,
//   mounted: function() {
//       console.log("moounted")
//       this.getData("")
//   }

}
</script>