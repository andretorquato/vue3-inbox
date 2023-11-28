<template>
  <div class="mail-view">
    <h1>VMail Inbox</h1>
    <h1>{{ emailSelection.emails.size }} email selecionado</h1>
    <Suspense>
      <MailTable />
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </div>
</template>

<script>
import MailTable from '../components/MailTable.vue';
import useEmailSelection from '../composables/use-email-selection';

export default {
  components: {
    MailTable
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
