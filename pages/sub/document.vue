<template>
    <div>
        <p>sub document file</p>
        <v-text-field label="text search" v-model="query"></v-text-field>
        <v-card v-for="post in posts" :key="post.id">
            <v-card-title>{{ post.title }}</v-card-title>
            <v-card-subtitle>{{post.userId + " : " + getName(post.userId) }}</v-card-subtitle>
            <v-card-text>{{ post.body }}</v-card-text>
        </v-card>
    </div>
</template>
<script>
import axios from 'axios'
export default ({
    data: () => ({
        posts: {
            body : "",
            id : 0,
            title : "No Data",
            userId : 0
        },
        user: [
            {id : 0, name: "NO DATA"},
            {id : 1, name: "Tanaka Taro"},
            {id : 2, name: "Suzuki Ichiro"},
            {id : 3, name: "Maeda Jiro"},
            {id : 4, name: "Toyota Seiji"},
            {id : 5, name: "Hirokawa Masao"},
            {id : 6, name: "Aoyama Teru"},
            {id : 7, name: "Takagi Tsutomu"},
            {id : 8, name: "John Taylor"},
            {id : 9, name: "Tom Wood"},
            {id : 10, name: "Sam Fender"},
            ],
        query: ""
    }),
  watch: {
      query: function () {
        this.getData(this.query).then(response => this.posts = response.posts)
        // console.log(this.posts)
        if (this.posts.length == 0) {
            this.posts = {body : "", id:0, title:"NO DATA", userId:0}
        }
      }
  },
  methods: {
      getData: async (query = "") => {
        let url = 'https://jsonplaceholder.typicode.com/posts'
        if (query != "") {
            url += '?userId=' + query
        }
        const result = await axios.get(url)
        // console.log("result.data.posts")
        // console.log(result.data.length)
        // if (result.data.length === 0) {
        //     console.log("no")
        //     console.log({posts: {body : "", id:0, title:"NO DATA", userId:0}})
        //     console.log(result)
        //     return {posts: {body : "", id:0, title:"NO DATA", userId:0}}
        // }
        return {
            posts: result.data
        }

    },
      getName: function(userId) {
          let name = {...{...this.user.filter( a => a.id == userId )}[0]}.name
        //   if (name === undefined){
        //       name = "NO DATA"
        //   }
          return name
      }
  }
//   ,
//   mounted: function() {
//       console.log("moounted")
//       this.getData("")
//   }

})
</script>