<template>
    <div>
        <!-- <v-text-field label="text search" v-model="query"></v-text-field>
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
        </div> -->
    </div>
</template>
<script lang="ts">
// import axios from 'axios'
// // import Vue from 'vue'
// import {Post} from "~/types/post"
// import {User} from "~/types/user"
// export default {
//     data() {
//         return {
//             posts : {} as Post[],
//             users : {} as User[],
//             query : ""
//         }
//     },
//     watch : {
//       query: function () : void {
//         console.log("watchQuery")
//         // console.log()
//         this.getData(this.query).then(response => this.posts = response.posts)
//         // // console.log(this.posts)
//         // if (this.posts.length == 0) {
//         //     this.posts = {body : "", id:0, title:"NO DATA", userId:0}
//         // }
//       }
//   },
//   methods: {
//       getData: async function(query = "") : Promise<any> {
//         let url = 'https://jsonplaceholder.typicode.com/posts'
//         if (query != "") {
//             url += '?userId=' + query
//         }
//         const result = await axios.get(url)
//         // console.log("result.data.posts")
//         // console.log(result.data.length)
//         // if (result.data.length === 0) {
//         //     console.log("no")
//         //     console.log({posts: {body : "", id:0, title:"NO DATA", userId:0}})
//         //     console.log(result)
//         //     return {posts: {body : "", id:0, title:"NO DATA", userId:0}}
//         // }
//         return {
//             posts: result.data
//         }

//     },
//     getName: function(userId: number) {
//         let name = {...{...this.users.filter( a => a.id == userId )}[0]}.name
//         //   if (name === undefined){
//         //       name = "NO DATA"
//         //   }
//         return name
//     }
//   },
// //   async asyncData() {
// //   },
//   async fetch() {
//     this.$nuxt.$loading.start && this.$nuxt.$loading.start();

//     let urlPosts = 'https://jsonplaceholder.typicode.com/posts'
//     let urlUsers = 'https://jsonplaceholder.typicode.com/users'

//     await Promise.all([
//         axios.get(urlPosts),
//         axios.get(urlUsers)
//     ]);

//     this.$nuxt.$loading.finish();
//   }

// //   ,
// //   mounted: function() {
// //       console.log("moounted")
// //       this.getData("")
// //   }

// }
</script>