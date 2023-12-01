<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand fw-bold" href="#">{{ username }}</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
        </ul>
        <button @click="signOut" class="btn btn-outline-dark fw-bold" type="submit">Sair</button>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup(props) {
    const username = computed(() => {
      const user = sessionStorage.getItem('user')
      if (user) {
        const userData = JSON.parse(user)
        return userData?.email ?? '-'
      }
      return '-'
    })
    const router = useRouter()
    const signOut = function () {
      sessionStorage.removeItem('user');
      router.push('/auth')
    }
    return {
      username,
      signOut
    }
  }
}
</script>
<style>
.navbar {
  background: #fff;
  box-shadow: 0 4px 6px rgba(22, 22, 26, 0.18);
  margin-bottom: 2rem;
}

.navbar .navbar-nav .nav-link {
  color: #000;
}

.btn-outline-dark {
  border-radius: 0;
}

.btn-outline-dark:focus {
  box-shadow: none;
}

@media screen and (max-width: 768px) {
  .btn-outline-dark {
    border: none;
    padding: 0;
    outline: none;
  }

  .btn-outline-dark:hover {
    background: none;
    color: gray;
  }
}
</style>
