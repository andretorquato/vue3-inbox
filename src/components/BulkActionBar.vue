<template>
  <div class="bulk-action-bar">
    <span class="checkbox">
      <input type="checkbox" :checked="allEmailsSelected" :class="[someEmailsSelected ? 'partial-check' : '']"
        @click="bulkSelect" />
    </span>
    <span class="buttons">
      <button @click="sendEmail">
        📨Enviar E-mail
      </button>
      <button @click="emailSelection.markRead()" :disabled="[...emailSelection.emails].every(e => e.read)">
        📤 Marcar como lido
      </button>
      <button @click="emailSelection.markUnread()" :disabled="[...emailSelection.emails].every(e => !e.read)">
        📥 Marcar como não visto
      </button>
      <button @click="emailSelection.archive()" :disabled="numberSelected == 0">
        📩 Arquivar
      </button>
      <button @click="emailSelection.remove()" :disabled="numberSelected == 0">
        ✂️ Excluir
      </button>
      <button :disabled="numberSelected == 0" type="button" data-bs-toggle="modal" data-bs-target="#MarkerSelectModal"
        data-bs-whatever="@mdo">
        🔃 Vincular Marcador
      </button>
    </span>
  </div>
</template>

<script>
import useEmailSelection from '../composables/use-email-selection';
import { computed } from 'vue'
import { useRouter } from 'vue-router';

export default {
  setup(props) {
    const router = useRouter();
    let emailSelection = useEmailSelection();
    let numberSelected = computed(() => emailSelection.emails.size)
    let numberEmails = computed(() => props.emails.length)
    let allEmailsSelected = computed(() => numberSelected.value === numberEmails.value)
    let someEmailsSelected = computed(() => {
      return numberSelected.value > 0 && numberSelected.value < numberEmails.value
    })
    let bulkSelect = function () {
      if (allEmailsSelected.value) {
        emailSelection.clear()
      } else {
        emailSelection.addMultiple(props.emails)
      }
    }

    let sendEmail = function () {
      router.push("/send");
    }

    return {
      allEmailsSelected,
      someEmailsSelected,
      numberSelected,
      emailSelection,
      bulkSelect,
      sendEmail,
    }
  },
  props: {
    emails: {
      type: Array,
      required: true
    }
  }
}
</script>
