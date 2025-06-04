// Service Worker Registration Utility
// Handles service worker registration and updates

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

class PWAManager {
  private deferredPrompt: BeforeInstallPromptEvent | null = null;
  private swRegistration: ServiceWorkerRegistration | null = null;

  async init() {
    try {
      // Register service worker
      await this.registerServiceWorker();
      
      // Set up install prompt handling
      this.setupInstallPrompt();
      
      // Set up update handling
      this.setupUpdateHandling();
      
      // Set up push notifications
      this.setupPushNotifications();
      
      console.log('PWA Manager initialized successfully');
    } catch (error) {
      console.error('Failed to initialize PWA Manager:', error);
    }
  }

  private async registerServiceWorker(): Promise<void> {
    if ('serviceWorker' in navigator) {
      try {
        this.swRegistration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        });

        console.log('Service Worker registered:', this.swRegistration.scope);

        // Handle service worker updates
        this.swRegistration.addEventListener('updatefound', () => {
          const newWorker = this.swRegistration!.installing;
          
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                this.showUpdateAvailable();
              }
            });
          }
        });

      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  }

  private setupInstallPrompt(): void {
    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      this.deferredPrompt = e as BeforeInstallPromptEvent;
      this.showInstallPromotion();
    });

    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed');
      this.hideInstallPromotion();
      this.deferredPrompt = null;
      
      // Track installation
      if (typeof gtag !== 'undefined') {
        gtag('event', 'pwa_install', {
          event_category: 'engagement',
          event_label: 'PWA Installation'
        });
      }
    });
  }

  private setupUpdateHandling(): void {
    // Listen for controlling service worker changes
    navigator.serviceWorker?.addEventListener('controllerchange', () => {
      window.location.reload();
    });

    // Check for updates periodically
    setInterval(() => {
      this.swRegistration?.update();
    }, 60000); // Check every minute
  }

  private async setupPushNotifications(): Promise<void> {
    if (!this.swRegistration) return;

    try {
      // Check if push messaging is supported
      if ('PushManager' in window) {
        const subscription = await this.swRegistration.pushManager.getSubscription();
        
        if (!subscription) {
          // Could set up push subscription here if needed
          console.log('Push notifications not subscribed');
        } else {
          console.log('Push notifications already subscribed');
        }
      }
    } catch (error) {
      console.error('Failed to set up push notifications:', error);
    }
  }

  async promptInstall(): Promise<boolean> {
    if (!this.deferredPrompt) {
      return false;
    }

    try {
      await this.deferredPrompt.prompt();
      const choiceResult = await this.deferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
        return true;
      } else {
        console.log('User dismissed the install prompt');
        return false;
      }
    } catch (error) {
      console.error('Install prompt failed:', error);
      return false;
    } finally {
      this.deferredPrompt = null;
    }
  }

  private showInstallPromotion(): void {
    // Create install banner
    const banner = document.createElement('div');
    banner.id = 'pwa-install-banner';
    banner.className = 'fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-chocolate-600 text-white p-4 rounded-lg shadow-lg z-50 transform translate-y-full transition-transform duration-300';
    
    banner.innerHTML = `
      <div class="flex items-center justify-between">
        <div class="flex-1 mr-3">
          <h3 class="font-semibold text-sm">Instalar Chocó Artesanal</h3>
          <p class="text-xs opacity-90 mt-1">Acceso rápido desde tu pantalla de inicio</p>
        </div>
        <div class="flex space-x-2">
          <button id="pwa-install-btn" class="bg-white text-chocolate-600 px-3 py-1 rounded text-xs font-medium hover:bg-gray-100 transition-colors">
            Instalar
          </button>
          <button id="pwa-dismiss-btn" class="text-white opacity-75 hover:opacity-100 transition-opacity">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    // Animate in
    setTimeout(() => {
      banner.classList.remove('translate-y-full');
    }, 100);

    // Handle install button click
    const installBtn = banner.querySelector('#pwa-install-btn');
    installBtn?.addEventListener('click', async () => {
      const installed = await this.promptInstall();
      if (installed) {
        this.hideInstallPromotion();
      }
    });

    // Handle dismiss button click
    const dismissBtn = banner.querySelector('#pwa-dismiss-btn');
    dismissBtn?.addEventListener('click', () => {
      this.hideInstallPromotion();
    });

    // Auto-hide after 10 seconds
    setTimeout(() => {
      if (document.getElementById('pwa-install-banner')) {
        this.hideInstallPromotion();
      }
    }, 10000);
  }

  private hideInstallPromotion(): void {
    const banner = document.getElementById('pwa-install-banner');
    if (banner) {
      banner.classList.add('translate-y-full');
      setTimeout(() => {
        banner.remove();
      }, 300);
    }
  }

  private showUpdateAvailable(): void {
    // Create update notification
    const notification = document.createElement('div');
    notification.id = 'pwa-update-notification';
    notification.className = 'fixed top-20 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 transform -translate-y-full transition-transform duration-300';
    
    notification.innerHTML = `
      <div class="flex items-center justify-between">
        <div class="flex-1 mr-3">
          <h3 class="font-semibold text-sm">Actualización Disponible</h3>
          <p class="text-xs opacity-90 mt-1">Nueva versión lista para instalar</p>
        </div>
        <div class="flex space-x-2">
          <button id="pwa-update-btn" class="bg-white text-blue-600 px-3 py-1 rounded text-xs font-medium hover:bg-gray-100 transition-colors">
            Actualizar
          </button>
          <button id="pwa-update-dismiss-btn" class="text-white opacity-75 hover:opacity-100 transition-opacity">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.classList.remove('-translate-y-full');
    }, 100);

    // Handle update button click
    const updateBtn = notification.querySelector('#pwa-update-btn');
    updateBtn?.addEventListener('click', () => {
      // Skip waiting and activate new service worker
      if (this.swRegistration?.waiting) {
        this.swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
    });

    // Handle dismiss button click
    const dismissBtn = notification.querySelector('#pwa-update-dismiss-btn');
    dismissBtn?.addEventListener('click', () => {
      notification.classList.add('-translate-y-full');
      setTimeout(() => {
        notification.remove();
      }, 300);
    });
  }

  // Background sync helpers
  async syncContactForm(formData: any): Promise<void> {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      try {
        // Store form data in IndexedDB for background sync
        await this.storeContactFormForSync(formData);
        
        // Register background sync
        await this.swRegistration?.sync.register('contact-form');
        
        console.log('Contact form queued for background sync');
      } catch (error) {
        console.error('Failed to queue contact form for sync:', error);
        // Fallback to immediate submission
        throw error;
      }
    }
  }

  async syncNewsletterSignup(email: string): Promise<void> {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      try {
        await this.storeNewsletterSignupForSync({ email });
        await this.swRegistration?.sync.register('newsletter-signup');
        
        console.log('Newsletter signup queued for background sync');
      } catch (error) {
        console.error('Failed to queue newsletter signup for sync:', error);
        throw error;
      }
    }
  }

  private async storeContactFormForSync(formData: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('choco-offline-db', 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(['contactForms'], 'readwrite');
        const store = transaction.objectStore('contactForms');
        
        const addRequest = store.add({
          data: formData,
          timestamp: Date.now()
        });
        
        addRequest.onerror = () => reject(addRequest.error);
        addRequest.onsuccess = () => resolve();
      };
    });
  }

  private async storeNewsletterSignupForSync(data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('choco-offline-db', 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(['newsletterSignups'], 'readwrite');
        const store = transaction.objectStore('newsletterSignups');
        
        const addRequest = store.add({
          data,
          timestamp: Date.now()
        });
        
        addRequest.onerror = () => reject(addRequest.error);
        addRequest.onsuccess = () => resolve();
      };
    });
  }
}

// Export singleton instance
export const pwaManager = new PWAManager();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    pwaManager.init();
  });
} else {
  pwaManager.init();
}
