<template>
    <v-card :to="{ path: 'posts/' + post.id }">
        <v-card-title>{{ post.title }}</v-card-title>
        <v-card-subtitle>{{post.userId + " : " + userName }}</v-card-subtitle>
        <v-card-text>{{ post.body }}</v-card-text>
    </v-card>
</template>
<script lang="ts" >
import {Post} from "~/types/post"
export default {
    props: {
        post : Object,
        userName : String
        },
    data: () => ({
        posts: [] as Post[]
    })
}
</script>