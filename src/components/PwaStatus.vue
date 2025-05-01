<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { isRunningAsPWA, isPWASupported, isOnline, addConnectionListeners, isServiceWorkerRegistered, checkCacheStatus } from '../utils/pwaUtils';

const pwaSupported = ref(false);
const runningAsPwa = ref(false);
const online = ref(true);
const serviceWorkerRegistered = ref(false);
const cacheInfo = ref({ hasCachedAssets: false, cacheSize: 0 });

// Verifica o status da PWA ao montar o componente
async function checkPwaStatus() {
  pwaSupported.value = isPWASupported();
  runningAsPwa.value = isRunningAsPWA();
  online.value = isOnline();
  serviceWorkerRegistered.value = await isServiceWorkerRegistered();
  cacheInfo.value = await checkCacheStatus();
}

// Funções para lidar com mudanças de status de conexão
const handleOnline = () => {
  online.value = true;
};

const handleOffline = () => {
  online.value = false;
};

// Registra os listeners de eventos ao montar o componente
let removeListeners: (() => void) | null = null;

onMounted(async () => {
  await checkPwaStatus();
  removeListeners = addConnectionListeners(handleOnline, handleOffline);
});

// Remove os listeners ao desmontar o componente
onUnmounted(() => {
  if (removeListeners) {
    removeListeners();
  }
});

// Função para atualizar o status manualmente
const refreshStatus = async () => {
  await checkPwaStatus();
};
</script>

<template>
  <div class="pwa-status p-4 bg-white rounded-lg shadow-md">
    <h2 class="text-xl font-bold text-blue-600 mb-4">Status da PWA</h2>
    
    <div class="grid gap-3">
      <div class="flex items-center">
        <span class="font-medium mr-2">Suporte a PWA:</span>
        <span 
          class="px-2 py-1 rounded text-sm" 
          :class="pwaSupported ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
        >
          {{ pwaSupported ? 'Suportado' : 'Não suportado' }}
        </span>
      </div>
      
      <div class="flex items-center">
        <span class="font-medium mr-2">Executando como PWA:</span>
        <span 
          class="px-2 py-1 rounded text-sm" 
          :class="runningAsPwa ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
        >
          {{ runningAsPwa ? 'Sim' : 'Não' }}
        </span>
      </div>
      
      <div class="flex items-center">
        <span class="font-medium mr-2">Status de conexão:</span>
        <span 
          class="px-2 py-1 rounded text-sm" 
          :class="online ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
        >
          {{ online ? 'Online' : 'Offline' }}
        </span>
      </div>
      
      <div class="flex items-center">
        <span class="font-medium mr-2">Service Worker:</span>
        <span 
          class="px-2 py-1 rounded text-sm" 
          :class="serviceWorkerRegistered ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
        >
          {{ serviceWorkerRegistered ? 'Registrado' : 'Não registrado' }}
        </span>
      </div>
      
      <div class="flex items-center">
        <span class="font-medium mr-2">Cache:</span>
        <span 
          class="px-2 py-1 rounded text-sm" 
          :class="cacheInfo.hasCachedAssets ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
        >
          {{ cacheInfo.hasCachedAssets ? `${cacheInfo.cacheSize} itens em cache` : 'Sem cache' }}
        </span>
      </div>
    </div>
    
    <button 
      @click="refreshStatus" 
      class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
    >
      Atualizar status
    </button>
    
    <div class="mt-4 text-sm text-gray-600">
      <p v-if="!pwaSupported" class="text-red-600">
        Seu navegador não suporta PWAs. Tente usar um navegador moderno como Chrome, Edge ou Safari.
      </p>
      <p v-else-if="!runningAsPwa" class="text-blue-600">
        Para instalar este aplicativo, clique no ícone de instalação na barra de endereço do navegador.
      </p>
      <p v-else class="text-green-600">
        Aplicativo instalado e pronto para uso offline!
      </p>
    </div>
  </div>
</template>

<style scoped>
.pwa-status {
  max-width: 500px;
  margin: 0 auto;
}
</style>