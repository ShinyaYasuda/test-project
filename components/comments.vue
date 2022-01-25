<template>
  <div>
    <v-container>
      <p>コメント</p>
      <v-row>
        <v-col
          v-for="comment in comments"
          :key="comment.id"
          cols="12"
          sm="6"
          lg="4"
          xl="3"
        >
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
import Vue from "vue";
import axios from "axios";
import { Comment } from "~/types/comment";
export default Vue.extend({
  props: {
    id: Number,
  },
  data: () => ({
    comments: [] as Comment[],
    queryUserId: "",
    queryName: "",
    queryTitle: "",
    queryBody: "",
    sortTitle: 0,
    sortUserId: 0,
    id: 0,
  }),
  async fetch() {
    this.$nuxt.$loading.start && this.$nuxt.$loading.start();

    console.log(this.id);

    let urlComments =
      "https://jsonplaceholder.typicode.com/posts/" + this.id + "/comments";

    await Promise.all([
      axios
        .get(urlComments)
        .then((response) => (this.comments = response.data)),
    ]);

    this.$nuxt.$loading.finish();
  },
});
</script>
