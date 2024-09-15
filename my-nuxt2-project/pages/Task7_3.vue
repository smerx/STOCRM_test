<template>
  <div>
    <h1>Задание 7.3: Создание записи в календаре</h1>
    <form @submit.prevent="createEntry">
      <label>
        ID подразделения (CUSTOMER_ID):
        <input v-model="newEntry.CUSTOMER_ID" required />
      </label>
      <br />
      <label>
        ID поста (POST_ID):
        <input v-model="newEntry.POST_ID" required />
      </label>
      <br />
      <label>
        Дата начала (формат: YYYY-MM-DD HH:mm:ss(перевожу в Unix потом в коде)):
        <input v-model="newEntry.DATE_FROM" required placeholder="YYYY-MM-DD HH:mm:ss"/>
      </label>
      <br />
      <label>
        Дата окончания (DATE_TO, формат: YYYY-MM-DD HH:mm:ss):
        <input v-model="newEntry.DATE_TO" required placeholder="YYYY-MM-DD HH:mm:ss"/>
      </label>
      <br />
      <label>
        id контакта к которой добавляем запись (пример 1 Артем Артемович, 2 Сергей Сергеевич) (OFFER_ID):
        <input v-model="newEntry.OFFER_ID" required />
      </label>
      <br />
      <label>
        Комментарий (COMMENT):
        <input v-model="newEntry.COMMENT" />
      </label>
      <br />
      <button type="submit">Создать запись</button>
    </form>

    <div v-if="error">
      <p style="color: red;">{{ error }}</p>
    </div>

    <div v-else-if="createdEntry">
      <h2>Запись успешно создана!</h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newEntry: {
        CUSTOMER_ID: '',
        POST_ID: '',
        DATE_FROM: '2024-09-14 --:--:--',
        DATE_TO: '2024-09-14 --:--:--',
        OFFER_ID: '',
        COMMENT: 'описание _____'
      },
      createdEntry: null,
      error: null
    };
  },
  methods: {
    async createEntry() {
      const dateFromTimestamp = new Date(this.newEntry.DATE_FROM).getTime() / 1000;
      const dateToTimestamp = new Date(this.newEntry.DATE_TO).getTime() / 1000;

      const entryData = {
        CUSTOMER_ID: this.newEntry.CUSTOMER_ID,
        POST_ID: this.newEntry.POST_ID,
        DATE_FROM: dateFromTimestamp,
        DATE_TO: dateToTimestamp,
        OFFER_ID: this.newEntry.OFFER_ID,
        COMMENT: this.newEntry.COMMENT
      };

      try {
        const response = await this.$api.createCalendarEntry(entryData);
        console.log('API Response:', response);

        if (response) {
          this.createdEntry = response;
          this.error = null;
          alert('Запись успешно создана!');
        } else {
          console.log('Ответ от API не содержит CARD_ID:', response);
          this.error = 'Ошибка при создании записи. CARD_ID отсутствует.';
        }
      } catch (error) {
        console.error('Ошибка при создании записи:', error.response ? error.response.data : error);
        this.error = 'Ошибка при создании записи.';
      }
    }
  }
};
</script>


