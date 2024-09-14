<template>
  <div>
    <h1>Задание 7.2: Получение всех записей календаря</h1>
    <form @submit.prevent="fetchEntries">
      <label>
        ID подразделения (подразделение у нас одно(id 1))(CUSTOMER_ID):
        <input v-model="filter.CUSTOMER_ID" required />
      </label>
      <br />
      <button type="submit">Получить записи</button>
    </form>

    <div v-if="error">
      <p style="color: red;">{{ error }}</p>
    </div>

    <div v-else-if="entries && entries.length">
      <h2>Результат:</h2>
      <ul>
        <li v-for="entry in entries" :key="entry.CARD_ID">
          <p><strong>ID записи:</strong> {{ entry.CARD_ID }}</p>
          <p><strong>Пост:</strong> {{ entry.POST_NAME }}</p>
          <p><strong>Дата начала:</strong> {{ entry.DATE_FROM }}</p>
          <p><strong>Дата окончания:</strong> {{ entry.DATE_TO }}</p>
          <p><strong>Комментарий:</strong> {{ entry.COMMENT }}</p>
          <p><strong>Контакт:</strong> {{ entry.CONTACT_TITLE }}</p>
          <hr>
        </li>

      </ul>
    </div>
    <div v-else>
      <p>Записи не найдены или загрузка данных...</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: {
        CUSTOMER_ID: '1'
      },
      entries: [],
      error: null
    };
  },
  methods: {
    async fetchEntries() {
      try {
        const response = await this.$api.getAllCalendarEntries(this.filter);
        if (response && response.length) {
          this.entries = response;
          this.error = null;
        } else {
          this.entries = [];
          this.error = 'Записи не найдены.';
        }
      } catch (error) {
        this.error = 'Ошибка при получении записей.';
      }
    }
  }
};
</script>
