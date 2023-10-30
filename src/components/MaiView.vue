<template>
  <div class="email-display">
    <div>
      <button @click="toggleArchive">
        {{ email?.archived ? "Move to Inbox (e)" : "Archive (e)" }}
      </button>
      <button @click="toggleRead">{{ email?.read ? "Mark Unread (r)" : "Mark Read (r)" }}</button>
      <button>Newer</button>
      <button>Older</button>
    </div>
    <h2 class="mb-0">
      Subject: <strong>{{ email.subject }}</strong>
    </h2>
    <div>
      <em>From {{ email.from }} on {{ format(new Date(email.sentAt), "MMM do yyyy") }}</em>
    </div>
    <div v-html="marked(email.body)" />
  </div>
</template>

<script>
import { format } from "date-fns";
import marked from "marked";
import axios from "axios";
import useKeydown from "../composables/use-keydown";

export default {
  props: {
    email: {
      type: Object,
      required: true
    }
  },
  setup({ email }) {
    const toggleRead = () => {
      email.read = !email.read;
      axios.put(`http://localhost:3000/emails/${email.id}`, email);
    };

    const toggleArchive = () => {
      email.archived = !email.archived;
      axios.put(`http://localhost:3000/emails/${email.id}`, email);
    };

    useKeydown([
      {
        key: "r",
        fn: () => {
          toggleRead();
        }
      },
      {
        key: "e",
        fn: () => {
          toggleArchive();
        }
      }
    ]);

    return {
      format,
      marked,
      toggleRead,
      toggleArchive
    };
  }
};
</script>
