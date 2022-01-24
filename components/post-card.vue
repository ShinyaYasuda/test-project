<template>
  <!-- <v-card :to="{ path: 'posts/' + post.id }"> -->
  <v-card>
    <v-card-title>{{ post.title }}</v-card-title>
    <v-card-subtitle>{{ post.userId + " : " + userName }}</v-card-subtitle>
    <v-card-text>{{ post.body }}</v-card-text>
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
  //   watch: {
  //       noselect: function() {
  //           if (this.noselect ===)
  //       }
  //   },
  //   methods: {},
});
</script>
