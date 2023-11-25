<template>
  <div class="login__container">
    login
  </div>
</template>

<script>
import MailTable from '@/components/MailTable.vue';
import useEmailSelection from '@/composables/use-email-selection';
export default {
  components: {
    MailTable
  },
  name: 'App',
  data() {
    return {
      emailSelection: useEmailSelection(),
    }
  }
};
</script>

<style></style>

