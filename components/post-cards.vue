<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js"></script>
<template>
    <v-row v-if="posts.length">
        <transition-group name="list-complete" tag="div">
            <v-col v-for="post in posts" :key="post.id" cols="12" sm="6" lg="4" xl="3" class="list-complete-item">
                <post-card :post="post" :userName="getName(post.userId)"></post-card>
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
<script lang="ts" >
import postCard from '~/components/post-card.vue'
import {Post} from "~/types/post"
import {User} from "~/types/user"
export default {
    props: {
        posts : [],
        users : []
        },
    components: { postCard },
    data: () => ({
        posts: [] as Post[],
        users: [] as User[]
    }),
    methods: {
        getName: function(userId: number) {
            let name = {...{...this.users.filter( a => a.id == userId )}[0]}.name
            return name
    },
    mounted: function() {
        this.$data.posts = this.$props.posts
        this.$data.users = this.$props.users
    }
  }
}
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