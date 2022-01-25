<template>
  <v-card>
    <v-card-title><span v-html="post.title"></span></v-card-title>
    <v-card-subtitle>{{ post.userId + " : " + userName }}</v-card-subtitle>
    <v-card-text><span v-html="post.body"></span></v-card-text>
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";
import { Post } from "~/types/post";
export default Vue.extend({
  props: {
    post: Object,
    userName: String,
  },
  data: () => ({
    posts: [] as Post[],
  }),
});
</script>
