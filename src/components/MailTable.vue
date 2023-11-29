<template>
  <div class="mt-3 mb-3">
    <button @click="selectScreen('inbox')" :disabled="selectedScreen == 'inbox'">Principal</button>
    <button @click="selectScreen('archive')" :disabled="selectedScreen == 'archive'">Arquivados</button>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-2">
        <marker-modal></marker-modal>
        <div v-for="tag of tags" :key="tag.id"
          class="checkbox d-flex align-items-center gap-2 justify-content-start mb-2">
          <input v-model="selectedTags" :id="tag.id" class="styled" type="checkbox" :value="tag.id">
          <label :for="tag.id">
            {{ tag.name }}
          </label>
        </div>
      </div>
      <div class="col">
        <BulkActionBar :emails="filteredEmail" />
        <table class="mail-table">
          <tbody>
            <tr v-for="email in filteredEmail" :key="email.id" :class="['clickable', email.read ? 'read' : '']">
              <td>
                <input @click="emailSelection.toggle(email)" :checked="emailSelection.emails.has(email)"
                  type="checkbox" />
              </td>
              <td @click="openEmail(email)">{{ email.from }}</td>
              <td @click="openEmail(email)">
                <p>
                  <strong>{{ email.subject }}</strong> - {{ email.body }}
                </p>
              </td>
              <td @click="openEmail(email)" class="date">
                {{ format(new Date(email.sentAt), "MMM do yyyy") }}
              </td>
              <td><button @click="archiveEmail(email)">Arquivar</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <ModalView v-if="openedEmail" @closeModal="openedEmail = null">
    <MailView v-if="openedEmail" :email="openedEmail" @changeEmail="changeEmail" />
  </ModalView>
  <MailView v-if="openedEmail" :email="openedEmail" @changeEmail="changeEmail" />
</template>

<script>
import { ref, watch } from "vue";
import { format } from "date-fns";

import MailView from "./MailView.vue";
import BulkActionBar from "./BulkActionBar.vue";
import useEmailSelection from "../composables/use-email-selection";
import ModalView from './ModalView.vue';
import { useCollection, useFirestore } from 'vuefire';
import { collection, doc, updateDoc } from 'firebase/firestore';
import MarkerModal from './MarkerModal.vue';


export default {
  components: {
    BulkActionBar,
    MailView,
    ModalView,
    MarkerModal
  },
  async setup() {
    const openedEmail = ref(null);
    const db = useFirestore();
    const emailsCollection = useCollection(collection(db, 'emails'));
    const tags = useCollection(collection(db, 'tags'));
    const selectedTags = ref([]);

    const emails = ref([]);

    watch(emailsCollection, (newEmails) => {
      emails.value = [...newEmails];
    });

    return {
      format,
      db,
      emails,
      tags,
      selectedTags,
      emailSelection: useEmailSelection(),
      openedEmail,
      selectedScreen: ref('inbox')
    };
  },
  computed: {
    sortedEmails() {
      console.log('emails:', this.emails);
      return this.emails.sort((e1, e2) => {
        return e1.sentAt < e2.sentAt ? 1 : -1;
      });
    },
    filteredEmail() {
      if (this.selectedScreen == 'inbox') {
        return this.sortedEmails.filter(e => !e.archived);
      } else {
        return this.sortedEmails.filter(e => e.archived);
      }
    }
  },
  methods: {
    openEmail(email) {
      this.openedEmail = email;
      if (email) {
        email.read = true;
        this.updateEmail(email);
      }
    },
    archiveEmail(email) {
      email.archived = true;
      this.updateEmail(email);
    },
    selectScreen(screen) {
      this.selectedScreen = screen;
      this.emailSelection.clear();
    },
    changeEmail({ toggleRead, toggleArchived, save, closeModal, changeIndex }) {
      let email = this.openedEmail;
      if (toggleRead) email.read = !email.read;
      if (toggleArchived) email.archived = !email.archived;
      if (save) this.updateEmail(email);
      if (closeModal) this.openedEmail = null;
      if (changeIndex) {
        let emails = this.filteredEmail;
        let currentIndex = emails.indexOf(this.openedEmail);
        let newEmail = emails[currentIndex + changeIndex];
        this.openEmail(newEmail);
      }
    },
    async updateEmail(email) {
      const docRef = doc(this.db, 'emails', email.id)
      await updateDoc(docRef, { ...email });
    }
  }
};
</script>
