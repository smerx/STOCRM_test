<template>
  <div>
    <h1>CRM Data</h1>
    <pre>{{ data }}</pre>
    <input v-model="postId" placeholder="Enter Post ID" />
    <button @click="fetchPost">Get Post</button>
    <button @click="fetchAllRecords">Get All Records</button>
    <button @click="createRecord">Create Record</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      postId: ''
    };
  },
  async asyncData({ $api }) {
    try {
      const response = await $api.get('customers/get_filtered', {
        params: {
          SID: '10007_b7e70c58771c3305d98b6314b789b2b1',
          FILTER: { ACTIVE: 'Y' },
          SORT: { DATE_CREATE: 'DESC' },
          PAGE: 1,
          LIMIT: 1000
        }
      });
      return { data: response.data };
    } catch (error) {
      console.error(error);
      return { data: [] };
    }
  },
  methods: {
    async fetchPost() {
      if (this.postId) {
        const post = await this.$api.getPostById(this.postId);
        console.log(post);
        this.data = post;
      }
    },
    async fetchAllRecords() {
      try {
        const response = await this.$api.get('customers/get_filtered', {
          params: {
            SID: '10007_b7e70c58771c3305d98b6314b789b2b1',
            FILTER: { ACTIVE: 'Y' },
            SORT: { DATE_CREATE: 'DESC' },
            PAGE: 1,
            LIMIT: 1000
          }
        });
        console.log(response.data);
        this.data = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async createRecord() {
      try {
        const response = await this.$api.post('customers/create', {

        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>
