<template>
  <div>
    <h1>CRM Data</h1>
    <pre>{{ data }}</pre>
  </div>
</template>

<script>
export default {
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
  }
}
</script>
