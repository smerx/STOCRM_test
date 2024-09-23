<template>
  <div>
    <h1>Календарь записей подразделения</h1>


    <vue-cal
      style="height: 500px"
      locale="ru"
      :events="calendarEvents"
    />
  </div>
</template>

<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import 'vue-cal/dist/i18n/ru.js';

export default {
  components: {
    VueCal,
  },
  data() {
    return {
      entries: [],
      calendarEvents: [],
      error: null,
    };
  },
  methods: {
    async fetchEntries() {
      try {
        const response = await this.$api.getAllCalendarEntries({ CUSTOMER_ID: '1' });

        if (response && response.length) {
          this.entries = response;
          this.error = null;

          this.calendarEvents = this.entries.map(entry => ({
            start: entry.DATE_FROM,
            end: entry.DATE_TO,
            title: entry.CONTACT_TITLE ? `${entry.CONTACT_TITLE} (${new Date(entry.DATE_FROM).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})` : `(${new Date(entry.DATE_FROM).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
            content: entry.COMMENT
          }));
        } else {
          this.entries = [];
          this.calendarEvents = [];
          this.error = 'Записи не найдены.';
        }
      } catch (error) {
        this.error = 'Ошибка при получении записей.';
        console.error(error);
      }
    }
  },

  mounted() {
    this.fetchEntries();
  }
};
</script>


