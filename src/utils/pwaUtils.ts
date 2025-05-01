/**
 * Utilitários para verificar e gerenciar funcionalidades da PWA
 */

/**
 * Verifica se a aplicação está sendo executada como PWA instalada
 * @returns {boolean} Verdadeiro se estiver executando como PWA instalada
 */
export function isRunningAsPWA(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches || 
         (window.navigator as any).standalone === true;
}

/**
 * Verifica se o navegador suporta PWA
 * @returns {boolean} Verdadeiro se o navegador suportar PWA
 */
export function isPWASupported(): boolean {
  return 'serviceWorker' in navigator && 
         window.matchMedia('(display-mode: standalone)').media !== 'not all';
}

/**
 * Verifica se o dispositivo está online
 * @returns {boolean} Verdadeiro se o dispositivo estiver online
 */
export function isOnline(): boolean {
  return navigator.onLine;
}

/**
 * Adiciona listeners para eventos de conexão
 * @param {Function} onlineCallback - Função chamada quando ficar online
 * @param {Function} offlineCallback - Função chamada quando ficar offline
 * @returns {Function} Função para remover os listeners
 */
export function addConnectionListeners(
  onlineCallback: () => void,
  offlineCallback: () => void
): () => void {
  window.addEventListener('online', onlineCallback);
  window.addEventListener('offline', offlineCallback);
  
  return () => {
    window.removeEventListener('online', onlineCallback);
    window.removeEventListener('offline', offlineCallback);
  };
}

/**
 * Verifica se o service worker está registrado
 * @returns {Promise<boolean>} Promessa que resolve para verdadeiro se o service worker estiver registrado
 */
export async function isServiceWorkerRegistered(): Promise<boolean> {
  if (!('serviceWorker' in navigator)) {
    return false;
  }
  
  const registrations = await navigator.serviceWorker.getRegistrations();
  return registrations.length > 0;
}

/**
 * Verifica o status do cache da aplicação
 * @returns {Promise<{hasCachedAssets: boolean, cacheSize: number}>} Informações sobre o cache
 */
export async function checkCacheStatus(): Promise<{hasCachedAssets: boolean, cacheSize: number}> {
  if (!('caches' in window)) {
    return { hasCachedAssets: false, cacheSize: 0 };
  }
  
  try {
    const cacheNames = await window.caches.keys();
    let totalSize = 0;
    let hasAssets = false;
    
    for (const name of cacheNames) {
      const cache = await window.caches.open(name);
      const keys = await cache.keys();
      
      if (keys.length > 0) {
        hasAssets = true;
      }
      
      totalSize += keys.length;
    }
    
    return { hasCachedAssets: hasAssets, cacheSize: totalSize };
  } catch (error) {
    console.error('Erro ao verificar cache:', error);
    return { hasCachedAssets: false, cacheSize: 0 };
  }
}