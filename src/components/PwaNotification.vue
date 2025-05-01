<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  type: 'update' | 'offline'
}>();

const visible = ref(true);

const close = () => {
  visible.value = false;
};

const messages = {
  update: 'Nova versão disponível! Clique para atualizar.',
  offline: 'Aplicativo pronto para uso offline!'
};

const emits = defineEmits(['update', 'close']);

const handleAction = () => {
  if (props.type === 'update') {
    emits('update');
  }
  close();
};
</script>

<template>
  <div v-if="visible" class="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-xs">
    <div class="flex items-center justify-between">
      <p>{{ messages[type] }}</p>
      <button @click="close" class="ml-4 text-white hover:text-gray-200">
        <span class="text-xl">&times;</span>
      </button>
    </div>
    <button 
      v-if="type === 'update'" 
      @click="handleAction"
      class="mt-2 bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 w-full"
    >
      Atualizar agora
    </button>
  </div>
</template>