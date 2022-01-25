<template>
  <div id="main">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" lg="6" xl="3"
          ><v-text-field
            data-testid="textUserId"
            label="ユーザーID"
            v-model="queryUserId"
          ></v-text-field
        ></v-col>
        <v-col cols="12" sm="6" lg="6" xl="3"
          ><v-text-field label="ユーザー名" v-model="queryName"></v-text-field
        ></v-col>
        <v-col cols="12" sm="6" lg="6" xl="3"
          ><v-text-field label="タイトル" v-model="queryTitle"></v-text-field
        ></v-col>
        <v-col cols="12" sm="6" lg="6" xl="3"
          ><v-text-field label="本文" v-model="queryBody"></v-text-field
        ></v-col>
      </v-row>
      <v-row>
        <v-col cols="4" sm="4" lg="2" xl="1"
          ><button @click="reset">リセット</button></v-col
        >
        <v-col cols="4" sm="4" lg="2" xl="1"
          ><button @click="changeSortUserId">
            ユーザーID{{ getSortArrow(sortUserId) }}
          </button></v-col
        >
        <v-col cols="4" sm="4" lg="2" xl="1"
          ><button @click="changeSortTitle">
            タイトル{{ getSortArrow(sortTitle) }}
          </button></v-col
        >
        <v-col cols="4" sm="4" lg="2" xl="1"
          ><button @click="outputCsv">CSV</button></v-col
        >
        <v-col cols="4" sm="4" lg="2" xl="1" v-if="selectedId !== 0"
          ><button @click="unselect">戻る</button></v-col
        >
      </v-row>
      <post-cards :posts="posts" :users="users" :passid="getid"></post-cards>
      <comments v-if="selectedId !== 0" :id="posts[0].id"></comments>
    </v-container>
  </div>
</template>
<script lang="ts">
import axios from "axios";
import Vue from "vue";
import Comments from "~/components/comments.vue";
import postCard from "~/components/post-card.vue";
import PostCards from "~/components/post-cards.vue";
import { Post } from "~/types/post";
import { User } from "~/types/user";
import { Parser } from "json2csv";
export default Vue.extend({
  components: { postCard, PostCards, Comments },
  data: () => ({
    posts: [] as Post[],
    users: [] as User[],
    queryUserId: "",
    queryName: "",
    queryTitle: "",
    queryBody: "",
    sortTitle: 0,
    sortUserId: 0,
    selectedId: 0,
  }),
  watch: {
    queryUserId: function () {
      this.$fetch();
    },
    queryName: function () {
      this.$fetch();
    },
    queryTitle: function () {
      this.$fetch();
    },
    selectedId: function () {
      this.$fetch();
    },
    queryBody: function () {
      this.$fetch();
    },
    sortTitle: function () {
      this.sort();
    },
    sortUserId: function () {
      this.sort();
    },
  },
  methods: {
    outputCsv: function () {
      const fields = ["field1", "field2", "field3"];
      //   const opts = { fields };

      const spanStart = "<span style='background-color: brown'>";
      const spanEnd = "</span>";
      let csvParser = new Parser();

      try {
        const csv = csvParser.parse(
          this.posts.map((e) => {
            return {
              id: e.id,
              userId: e.userId,
              title: e.title.replaceAll(spanStart, "").replaceAll(spanEnd, ""),
              body: e.body.replaceAll(spanStart, "").replaceAll(spanEnd, ""),
            };
          })
        );
        console.log(csv);
      } catch (err) {
        console.error(err);
      }
    },
    unselect: function () {
      this.selectedId = 0;
    },
    getid: function (id: number) {
      this.selectedId = id;
    },
    reset: function (): void {
      this.queryUserId = "";
      this.queryName = "";
      this.queryTitle = "";
      this.queryBody = "";
      this.sortUserId = 0;
      this.sortTitle = 0;
      this.selectedId = 0;
    },
    changeSortTitle(): void {
      this.sortTitle = (this.sortTitle + 1) % 3;
    },
    changeSortUserId(): void {
      this.sortUserId = (this.sortUserId + 1) % 3;
    },
    getSortArrow: function (num: number): string {
      switch (num) {
        case 0:
          return "→";
        case 1:
          return "↓";
        case 2:
          return "↑";
        default:
          return "";
      }
    },
    sort: function (): void {
      this.posts.sort((a: Post, b: Post): number => {
        if (this.sortTitle === 0 && this.sortUserId === 0) {
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;
          return 0;
        } else if (this.sortTitle === 1 && this.sortUserId === 0) {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;
          return 0;
        } else if (this.sortTitle === 0 && this.sortUserId === 1) {
          if (a.userId < b.userId) return -1;
          if (a.userId > b.userId) return 1;
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;
          return 0;
        } else if (this.sortTitle === 1 && this.sortUserId === 1) {
          if (a.userId < b.userId) return -1;
          if (a.userId > b.userId) return 1;
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        } else if (this.sortTitle === 2 && this.sortUserId === 0) {
          if (a.title > b.title) return -1;
          if (a.title < b.title) return 1;
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;
          return 0;
        } else if (this.sortTitle === 0 && this.sortUserId === 2) {
          if (a.userId > b.userId) return -1;
          if (a.userId < b.userId) return 1;
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;
          return 0;
        } else if (this.sortTitle === 2 && this.sortUserId === 2) {
          if (a.userId > b.userId) return -1;
          if (a.userId < b.userId) return 1;
          if (a.title > b.title) return -1;
          if (a.title < b.title) return 1;
          return 0;
        } else if (this.sortTitle === 1 && this.sortUserId === 2) {
          if (a.userId > b.userId) return -1;
          if (a.userId < b.userId) return 1;
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        } else if (this.sortTitle === 2 && this.sortUserId === 1) {
          if (a.userId < b.userId) return -1;
          if (a.userId > b.userId) return 1;
          if (a.title > b.title) return -1;
          if (a.title < b.title) return 1;
          return 0;
        } else {
          return 0;
        }
      });
    },
    getSearchString(original: string, search: string, start: number): string {
      let ret: string = original;
      const spanStart = "<span style='background-color: brown'>";
      const spanEnd = "</span>";

      if (original.indexOf(search, start) !== -1) {
        ret =
          original.substring(0, start) +
          original.substring(start, original.indexOf(search, start)) +
          spanStart +
          original.substring(
            original.indexOf(search, start),
            original.indexOf(search, start) + search.length
          ) +
          spanEnd +
          original.substring(original.indexOf(search, start) + search.length);

        ret = this.getSearchString(
          ret,
          search,
          original.indexOf(search, start) +
            search.length +
            spanStart.length +
            spanEnd.length
        );
      }
      return ret;
    },
  },
  async fetch() {
    this.$nuxt.$loading.start && this.$nuxt.$loading.start();

    let urlPosts = "https://jsonplaceholder.typicode.com/posts";
    let urlUsers = "https://jsonplaceholder.typicode.com/users";

    let arrayPosts: Post[] = new Array();
    let arrayUsers: User[] = new Array();

    if (this.queryUserId.trim() != "") {
      urlPosts += "?userId=" + this.queryUserId.trim();
      urlUsers += "?id=" + this.queryUserId.trim();
    }

    await Promise.all([
      axios.get(urlPosts).then((response) => (arrayPosts = response.data)),
      axios.get(urlUsers).then((response) => (arrayUsers = response.data)),
    ]);

    if (this.selectedId !== 0) {
      arrayPosts = arrayPosts.filter((post) => post.id === this.selectedId);
    }

    if (this.queryName.trim() != "") {
      arrayUsers = arrayUsers.filter(
        (array) => array.name.toLowerCase().indexOf(this.queryName) != -1
      );
      arrayPosts = arrayPosts.filter((post) =>
        arrayUsers.some((user) => user.id == post.userId)
      );
    }

    if (this.queryTitle.trim() != "") {
      arrayPosts = arrayPosts
        .filter(
          (array) =>
            array.title
              .toLowerCase()
              .indexOf(this.queryTitle.trim().toLowerCase()) != -1
        )
        .map((m) => {
          return {
            body: m.body,
            id: m.id,
            title: this.getSearchString(m.title, this.queryTitle, 0),
            userId: m.userId,
          };
        });
    }

    if (this.queryBody.trim() != "") {
      arrayPosts = arrayPosts
        .filter(
          (array) =>
            array.body
              .toLowerCase()
              .indexOf(this.queryBody.trim().toLowerCase()) != -1
        )
        .map((m) => {
          return {
            body: this.getSearchString(m.body, this.queryBody, 0),
            id: m.id,
            title: m.title,
            userId: m.userId,
          };
        });
    }

    this.posts = arrayPosts;
    this.users = arrayUsers;

    this.sort();

    this.$nuxt.$loading.finish();
  },
});
</script>
<style>
#main button {
  padding: 5px;
  background-color: #333333;
  border-radius: 10px;
}
</style>
