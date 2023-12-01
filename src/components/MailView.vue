<template>
  <div class="email-display">
    <div>
      <button @click="closeModal">Voltar (esc)</button>
      <button @click="toggleArchive">
        {{ visibleEmail?.archived ? "Mover para principal (e)" : "Arquivar (e)" }}
      </button>
      <button @click="toggleRead">{{ visibleEmail?.read ? "Marcar como não lido (r)" : "Marcar como lido (r)" }}</button>
      <button @click="goNewer">Próximo E-mail (k)</button>
      <button @click="goOlder">Prévio E-mail (j)</button>
    </div>
    <h2 class="mb-0">
      Assunto: <strong>{{ visibleEmail.subject }}</strong>
    </h2>
    <div>
      <em>De {{ visibleEmail.from }} em {{ format(new Date(visibleEmail.sentAt), "MMM do yyyy") }}</em>
    </div>
    <div v-html="marked(visibleEmail.body)" />
    <div v-if="visibleEmail?.answers">
      <div v-for="answer in visibleEmail?.answers" :key="answer.sentAt">
        <hr class="sketch-rule grid__item">
        <div>
          <em>De {{ answer.from }} em {{ format(new Date(answer.sentAt), "MMM do yyyy") }}</em>
        </div>
        <div v-html="marked(answer.content)" />
      </div>
    </div>
    <hr class="sketch-rule grid__item">
    <div v-if="showEditor">
      <quill-editor v-model:value="editor.content" :options="editor.editorOption" :disabled="editor.disabled"
        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)"
        @change="onEditorChange($event)" />
      <button type="button" class="btn btn-outline-primary my-4" @click="answer">Enviar</button>
      <button type="button" class="btn btn-outline-secondary my-4" @click="cancelAnswer">Cancelar</button>
    </div>
    <button v-else type="button" class="btn btn-primary mb-4" @click="showEditor = !showEditor">Responder</button>
  </div>
</template>

<script>
import { format } from "date-fns";
import { reactive, ref } from "vue";
import marked from "marked";
import useKeydown from "../composables/use-keydown";
import { quillEditor } from 'vue3-quill'
import { useFirestore } from "vuefire";
import { doc, updateDoc } from "firebase/firestore";

export default {
  components: {
    quillEditor
  },
  props: {
    email: {
      type: Object,
      required: true
    }
  },
  setup({ email }, { emit }) {
    const visibleEmail = ref(email);
    const db = useFirestore();
    const showEditor = ref(false)
    let toggleRead = () => { emit("changeEmail", { toggleRead: true, save: true }) }
    let toggleArchive = () => { emit("changeEmail", { toggleArchive: true, save: true, closeModal: true }) }
    let goNewer = () => { emit("changeEmail", { changeIndex: -1 }) }
    let goOlder = () => { emit("changeEmail", { changeIndex: 1 }) }
    let goNewerAndArchive = () => { emit("changeEmail", { changeIndex: -1, toggleArchive: true, save: true }) }
    let goOlderAndArchive = () => { emit("changeEmail", { changeIndex: 1, toggleArchive: true, save: true }) }
    let closeModal = () => { emit("changeEmail", { closeModal: true }) }
    const keydown = useKeydown([
      { key: "r", fn: toggleRead },
      { key: "e", fn: toggleArchive },
      { key: "k", fn: goNewer },
      { key: "j", fn: goOlder },
      { key: "[", fn: goNewerAndArchive },
      { key: "]", fn: goOlderAndArchive },
      { key: "Escape", fn: closeModal },
    ]);

    const editor = reactive({
      content: '',
      _content: '',
      editorOption: {
        placeholder: 'Responder',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ["code-block"]
          ]
        },
      },
      theme: "snow",
      disabled: false
    })

    const onEditorBlur = (quill) => {

      keydown.start();
    }
    const onEditorFocus = (quill) => {
      keydown.stop();
    }

    const onEditorReady = (quill) => {
    }

    const onEditorChange = ({ quill, html, text }) => {
      editor._content = html
    }

    const getEmail = () => {
      const user = sessionStorage.getItem('user')
      if (user) {
        const email = JSON.parse(user)?.email
        if (email) {
          return email
        }
      }
      return ''
    }

    const cancelAnswer = () => {
      editor.content = ''
      showEditor.value = false
    }

    const answer = async () => {
      const answer = {
        content: editor._content,
        sentAt: new Date().toISOString(),
        from: getEmail()
      }
      let answers = []
      if (visibleEmail.value?.answers) {
        answers = visibleEmail.value?.answers
      }
      answers.push(answer)
      visibleEmail.value = {
        ...visibleEmail.value,
        answers,
      }
      const docRef = doc(db, "emails", email.id);
      await updateDoc(docRef, {
        ...visibleEmail.value,
      });
      editor.content = ''
      showEditor.value = false
    }

    return {
      format,
      marked,
      showEditor,
      editor,
      visibleEmail,
      cancelAnswer,
      answer,
      toggleRead,
      toggleArchive,
      goNewer,
      goOlder,
      closeModal,
      onEditorBlur,
      onEditorFocus,
      onEditorReady,
      onEditorChange,
    };
  }
};
</script>
