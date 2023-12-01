<template>
  <Header />
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-lg-9">
        <div class="d-flex align-items-center mb-3">
          <button @click="back" class="btn btn-outline-dark">
            Voltar
          </button>
          <h1 class="m-0">Enviar e-mail</h1>
        </div>
        <form @submit.prevent="sendEmail">
          <div class="row g-3">
            <div class="col-12">
              <label for="your-email" class="form-label">Destinatario</label>
              <input v-model="form.email" type="text" placeholder="E-mail do destinatario" class="form-control"
                id="your-email" name="your-email" required>
            </div>
            <div class="col-12">
              <label for="subject" class="form-label">Assunto</label>
              <input v-model="form.subject" type="text" class="form-control" id="subject" name="subject" required>
            </div>
            <div class="col-12">
              <label for="body" class="form-label">Conteudo</label>
              <textarea v-model="form.body" class="form-control" id="body" name="body" rows="5" required></textarea>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-md-6">
                  <button data-res="<?php echo $sum; ?>" type="submit" class="btn btn-dark w-100 fw-bold">Enviar</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useFirestore } from 'vuefire';
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from 'vue-router';
import Header from '../components/Header.vue';

export default {
  components: {
    Header
  },
  name: 'SendMailView',
  setup() {
    const router = useRouter();
    const db = useFirestore();
    const form = ref({
      email: '',
      subject: '',
      body: '',
    });

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

    const sendEmail = async () => {
      const data = {
        from: getEmail(),
        to: form.value.email,
        subject: form.value.subject,
        body: form.value.body,
        read: false,
        archived: false,
        sentAt: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, "emails"), {
        ...data
      });
      router.push('/home');
    }

    const back = () => {
      router.push('/home');
    }

    return {
      form,
      sendEmail,
      back,
    };
  },
};
</script>

