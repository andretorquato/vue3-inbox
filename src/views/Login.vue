<template>
  <div class="main-bg">
    <!-- Login Form -->
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-lg-4 col-md-6 col-sm-6">
          <div class="card shadow">
            <div class="card-title text-center border-bottom">
              <h2 class="p-3">Acessar VueInbox📧</h2>
            </div>
            <div class="card-body">
              <form @submit.prevent="signInIntoFirebase">
                <div class="mb-4">
                  <label for="username" class="form-label">E-mail</label>
                  <input v-model="user.email" type="text" class="form-control" id="username" />
                </div>
                <div class="mb-4">
                  <label for="password" class="form-label">Senha</label>
                  <input v-model="user.password" type="password" class="form-control" id="password" />
                </div>
                <p v-if="loginError" class="text-danger">Erro ao fazer login</p>
                <div class="d-grid">
                  <button type="submit" class="btn btn-outline-dark">Login</button>
                  <button @click="redirectRegister" class="btn btn-text-dark">Cadastrar-se</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useFirebaseAuth } from 'vuefire';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginView',
  setup() {
    const router = useRouter();
    const user = ref({
      email: '',
      password: '',
    });
    const auth = useFirebaseAuth();
    const loginError = ref(false);

    const signInIntoFirebase = async () => {
      loginError.value = false;
      signInWithEmailAndPassword(auth, user.value.email, user.value.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // TODO: create a service for that
          const data = {
            token: user?.accessToken,
            email: user?.email,
          };
          sessionStorage.setItem('user', JSON.stringify(data));
          router.push('/home');
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          loginError.value = true;
        });
    }

    const redirectRegister = () => {
      router.push('/register')
    }

    return {
      user,
      loginError,
      signInIntoFirebase,
      redirectRegister
    };
  },
};
</script>
