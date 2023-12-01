<template>
  <div class="modal fade" id="MarkerSelectModal" tabindex="-1" aria-labelledby="MarkerSelectModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="MarkerSelectModalLabel">Selecionar marcadores</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <div v-for="tag of tags" :key="tag.id"
                class="checkbox d-flex align-items-center gap-2 justify-content-start mb-2">
                <input v-model="selectedTags" :id="tag.id" class="styled" type="checkbox" :value="tag.name">
                <label :for="tag.id">
                  {{ tag.name }}
                </label>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="setTags">Vincular</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useFirestore } from 'vuefire';
import useTags from '../composables/use-tags';
import useEmailSelection from '../composables/use-email-selection';

export default {
  setup() {
    const markerName = ref('')
    const db = useFirestore();
    const { tags } = useTags();
    const selectedTags = ref([]);
    const emailSelection  = useEmailSelection();


    const setTags = async () => {
      emailSelection.selectTags(selectedTags.value);
      selectedTags.value = [];
    }

    onMounted(() => {
      selectedTags.value = emailSelection.selectedTags();
    });

    return {
      tags,
      selectedTags,
      markerName,
      setTags,
    }
  }
}
</script>
