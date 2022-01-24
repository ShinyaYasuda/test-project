<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js"></script>
<template>
  <v-row v-if="posts.length">
    <transition-group name="list-complete" tag="div">
      <v-col
        v-for="post in posts"
        :key="post.id"
        cols="12"
        :sm="posts.length === 1 ? '12' : '6'"
        :lg="posts.length === 1 ? '12' : '4'"
        :xl="posts.length === 1 ? '12' : '3'"
        class="list-complete-item"
      >
        <post-card
          :post="post"
          :userName="getName(post.userId)"
          data-testid="postcard"
          @click.native="passid(post.id)"
        ></post-card>
      </v-col>
    </transition-group>
  </v-row>
  <v-row v-else>
    <v-col cols="12">
      <v-card>
        <v-card-title>NO DATA</v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import Vue from "vue";
import postCard from "~/components/post-card.vue";
import { Post } from "~/types/post";
import { User } from "~/types/user";
export default Vue.extend({
  props: {
    posts: [],
    users: [],
    passid: Object,
  },
  components: { postCard },
  data: () => ({
    posts: [] as Post[],
    users: [] as User[],
  }),
  methods: {
    getName: function (userId: number): string {
      let name: string = {
        ...{ ...this.users.filter((a) => a.id == userId) }[0],
      }.name;
      return name;
    },
    // mounted: function (): void {
    //   console.log(this.$props);
    //   this.$data.posts = this.$props.postsProp;
    //   this.$data.users = this.$props.users;
    // },
    // passid: function (id: number): void {
    //   //   console.log(this.posts);
    //   //   let postData: Post[];
    //   //   postData = this.posts;
    //   //   this.$data.posts = postData.filter((a) => a.id == id);
    //   //   console.log(this.$data.posts);
    // //   console.log(id);
    //   this.$emit("passid", id);
    // },
  },
});
</script>
<style>
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  /* margin-right: 10px; */
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
