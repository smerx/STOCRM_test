<template>
  <div>
    <h1>Задание 7.1: Получение записей на конкретный пост npm run</h1>
    <form @submit.prevent="fetchEntries">
      <label>
        ID подразделения (1 подразделение id 1) (CUSTOMER_ID):
        <input v-model="customerId" required />
      </label>
      <br />
      <label>
        Дата (DATE):
        <input v-model="date" required />
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
      customerId: '',
      date: '',
      entries: [],
      error: null
    };
  },

  methods: {
    async fetchEntries() {
      try {
        const response = await this.$api.getCalendarEntriesByPost(this.customerId, this.date);
        console.log('API Response:', response);

        // Проверяем, что ответ содержит объект RESPONSE
        if (response && response.RESPONSE) {
          // Преобразуем объект RESPONSE в массив значений
          const entriesArray = Object.values(response.RESPONSE);

          if (entriesArray.length) {
            this.entries = entriesArray;
            this.error = null;
          }
        } else {
          this.entries = [];
          this.error = 'Записи не найдены.';
        }
      } catch (error) {
        console.error('Ошибка при получении записей:', error.response ? error.response.data : error);
        this.error = 'Ошибка при получении записей.';
      }
    }
  }


};
</script>

