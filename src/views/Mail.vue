<template>
  <Header />
  <div class="mail-view">
    <h1>VMail Inbox 📧</h1>
    <Suspense>
      <MailTable />
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import MailTable from '../components/MailTable.vue';
import useEmailSelection from '../composables/use-email-selection';

export default {
  components: {
    MailTable,
    Header
  },
  name: 'MailView',
  data() {
    return {
      emailSelection: useEmailSelection(),
    }
  }
};
</script>

<style>
.mail-view {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
