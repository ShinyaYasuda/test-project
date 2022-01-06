<template>
    <div>
        <p>sub document file</p>
        <!-- <v-text-field label="text search" v-model="query"></v-text-field> -->
        <v-card v-for="post in posts" :key="post.id">
            <v-card-title>{{ post.title }}</v-card-title>
            <v-card-subtitle>{{ post.userId }}</v-card-subtitle>
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
            title : "",
            userId : 0
        }
    }),
    async asyncData() {
        const result = await axios.get('https://jsonplaceholder.typicode.com/posts')
        console.log(result.data)
        return {
            posts: result.data
        }
  }
})
</script>