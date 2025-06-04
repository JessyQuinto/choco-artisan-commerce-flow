// Service Worker for Chocó Artisan Commerce Flow
// Provides offline caching and background sync for improved performance

const CACHE_NAME = 'choco-artisan-v1';
const STATIC_CACHE = 'choco-static-v1';
const DYNAMIC_CACHE = 'choco-dynamic-v1';
const IMAGE_CACHE = 'choco-images-v1';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png',
  // Add critical CSS and JS files here when they're built
];

// Routes to cache dynamically
const CACHEABLE_ROUTES = [
  '/shop',
  '/about',
  '/contact',
  '/stories'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Failed to cache static files:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== IMAGE_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(request, responseClone);
              });
          }
          return response;
        })
        .catch(() => {
          // Serve cached version or fallback
          return caches.match(request)
            .then((response) => {
              if (response) {
                return response;
              }
              // Return offline fallback page
              return caches.match('/');
            });
        })
    );
    return;
  }

  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache GET requests
          if (request.method === 'GET' && response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(request, responseClone);
              });
          }
          return response;
        })
        .catch(() => {
          // Return cached version for GET requests
          if (request.method === 'GET') {
            return caches.match(request);
          }
          // For other methods, return a network error response
          return new Response(
            JSON.stringify({ error: 'Network unavailable' }),
            {
              status: 503,
              statusText: 'Service Unavailable',
              headers: { 'Content-Type': 'application/json' }
            }
          );
        })
    );
    return;
  }

  // Handle image requests
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(request)
            .then((response) => {
              if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(IMAGE_CACHE)
                  .then((cache) => {
                    cache.put(request, responseClone);
                  });
              }
              return response;
            });
        })
    );
    return;
  }

  // Handle static assets
  if (request.destination === 'script' || 
      request.destination === 'style' || 
      request.destination === 'font') {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          return response || fetch(request)
            .then((response) => {
              if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(STATIC_CACHE)
                  .then((cache) => {
                    cache.put(request, responseClone);
                  });
              }
              return response;
            });
        })
    );
    return;
  }

  // Default: try network first, fallback to cache
  event.respondWith(
    fetch(request)
      .catch(() => {
        return caches.match(request);
      })
  );
});

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm());
  }
  if (event.tag === 'newsletter-signup') {
    event.waitUntil(syncNewsletterSignup());
  }
});

// Sync contact form submissions
async function syncContactForm() {
  try {
    const db = await openDB();
    const pendingForms = await getAllPendingContactForms(db);
    
    for (const form of pendingForms) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form.data)
        });
        
        if (response.ok) {
          await deletePendingContactForm(db, form.id);
        }
      } catch (error) {
        console.error('Failed to sync contact form:', error);
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Sync newsletter signups
async function syncNewsletterSignup() {
  try {
    const db = await openDB();
    const pendingSignups = await getAllPendingNewsletterSignups(db);
    
    for (const signup of pendingSignups) {
      try {
        const response = await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(signup.data)
        });
        
        if (response.ok) {
          await deletePendingNewsletterSignup(db, signup.id);
        }
      } catch (error) {
        console.error('Failed to sync newsletter signup:', error);
      }
    }
  } catch (error) {
    console.error('Newsletter sync failed:', error);
  }
}

// IndexedDB helpers (simplified)
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('choco-offline-db', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      if (!db.objectStoreNames.contains('contactForms')) {
        db.createObjectStore('contactForms', { keyPath: 'id', autoIncrement: true });
      }
      
      if (!db.objectStoreNames.contains('newsletterSignups')) {
        db.createObjectStore('newsletterSignups', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

async function getAllPendingContactForms(db) {
  const transaction = db.transaction(['contactForms'], 'readonly');
  const store = transaction.objectStore('contactForms');
  
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

async function deletePendingContactForm(db, id) {
  const transaction = db.transaction(['contactForms'], 'readwrite');
  const store = transaction.objectStore('contactForms');
  
  return new Promise((resolve, reject) => {
    const request = store.delete(id);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

async function getAllPendingNewsletterSignups(db) {
  const transaction = db.transaction(['newsletterSignups'], 'readonly');
  const store = transaction.objectStore('newsletterSignups');
  
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

async function deletePendingNewsletterSignup(db, id) {
  const transaction = db.transaction(['newsletterSignups'], 'readwrite');
  const store = transaction.objectStore('newsletterSignups');
  
  return new Promise((resolve, reject) => {
    const request = store.delete(id);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

// Push notification handling
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body || 'Nueva notificación de Chocó Artesanal',
      icon: '/logo192.png',
      badge: '/favicon.ico',
      image: data.image,
      tag: data.tag || 'general',
      requireInteraction: false,
      actions: data.actions || []
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'Chocó Artesanal', options)
    );
  }
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  // Handle notification actions
  if (event.action === 'view-product') {
    event.waitUntil(
      clients.openWindow(`/product/${event.notification.data?.productId}`)
    );
  } else if (event.action === 'view-orders') {
    event.waitUntil(
      clients.openWindow('/profile/orders')
    );
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
