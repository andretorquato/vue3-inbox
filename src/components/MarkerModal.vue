<template>
  <div class="d-flex align-items-center justify-content-end gap-3">
    <b>🔖 Marcadores</b>
    <button @click="redirectRegister" class="btn btn-outline-dark" type="button" data-bs-toggle="modal"
      data-bs-target="#MarkerModal" data-bs-whatever="@mdo">+</button>
  </div>
  <div class="modal fade" id="MarkerModal" tabindex="-1" aria-labelledby="MarkerModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="MarkerModalLabel">Adicionar novo Marcador</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label">Nome:</label>
              <input v-model="markerName" type="text" class="form-control" id="recipient-name"
                placeholder="Identificação do marcador">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="createMarker">Adicionar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useFirestore } from 'vuefire';
import { collection, addDoc } from "firebase/firestore";

export default {
  setup() {
    const markerName = ref('')
    const db = useFirestore();


    const createMarker = async () => {
      const userString = sessionStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        const data = {
          name: markerName.value,
          email: user?.email
        }
        await addDoc(collection(db, "tags"), {
          ...data
        });
        markerName.value = '';
      }
    }

    return {
      markerName,
      createMarker
    }
  }
}
</script>
