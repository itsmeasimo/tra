import { database } from './firebase';
import { ref, set, get, remove, push, update } from 'firebase/database';
import { Language } from './types';

export interface RoutePrice {
  id: string;
  price: string;
  icon: string;
  order?: number;
  priceDescription?: string;
  priceDescriptions?: {
    sr: string;
    en: string;
    ru: string;
  };
  names: {
    sr: string;
    en: string;
    ru: string;
  };
  whatsappMessages: {
    sr: string;
    en: string;
    ru: string;
  };
}

// Default routes data with multilingual price descriptions
const defaultRoutes: RoutePrice[] = [
  {
    id: 'novi-sad-beograd',
    price: '6.000',
    icon: '✈️',
    order: 1,
    priceDescriptions: {
      sr: 'po vozilu (cena je do 3 osobe, za četvrtu odraslu osobu je +1000rsd na cenu, deca nemaju doplatu)',
      en: 'per vehicle (price is for up to 3 people, 4th adult person +1000rsd to the price, children have no surcharge)',
      ru: 'за автомобиль (цена до 3 человек, за 4-го взрослого +1000 динаров к цене, дети без доплаты)'
    },
    names: {
      sr: 'Novi Sad ⇄ Aerodrom Beograd',
      en: 'Novi Sad ⇄ Belgrade Airport',
      ru: 'Нови Сад ⇄ Аэропорт Белград'
    },
    whatsappMessages: {
      sr: 'Zdravo! Zainteresovan/a sam za aerodromski transfer Novi Sad - Beograd. Molim Vas pošaljite mi više informacija o rezervaciji.',
      en: 'Hello! I am interested in airport transfer Novi Sad - Belgrade. Please send me more information about booking.',
      ru: 'Здравствуйте! Меня интересует трансфер в аэропорт Нови Сад - Белград. Пожалуйста, пришлите информацию о бронировании.'
    }
  },
  {
    id: 'novi-sad-budimpesta',
    price: '23.500',
    icon: '🇭🇺',
    order: 2,
    priceDescriptions: {
      sr: 'po vozilu (cena je do 3 osobe, za četvrtu odraslu osobu je +1500rsd na cenu, deca nemaju doplatu)',
      en: 'per vehicle (price is for up to 3 people, 4th adult person +1500rsd to the price, children have no surcharge)',
      ru: 'за автомобиль (цена до 3 человек, за 4-го взрослого +1500 динаров к цене, дети без доплаты)'
    },
    names: {
      sr: 'Novi Sad ⇄ Budimpešta Aerodrom',
      en: 'Novi Sad ⇄ Budapest Airport',
      ru: 'Нови Сад ⇄ Аэропорт Будапешт'
    },
    whatsappMessages: {
      sr: 'Zdravo! Zainteresovan/a sam za međunarodni transfer Novi Sad - Budimpešta. Molim Vas kontaktirajte me za rezervaciju.',
      en: 'Hello! I am interested in international transfer Novi Sad - Budapest. Please contact me for booking.',
      ru: 'Здравствуйте! Меня интересует международный трансфер Нови Сад - Будапешт. Пожалуйста, свяжитесь со мной для бронирования.'
    }
  },
  {
    id: 'novi-sad-zagreb',
    price: '35.000',
    icon: '🇭🇷',
    order: 3,
    priceDescriptions: {
      sr: 'po vozilu (cena je do 3 osobe, za četvrtu odraslu osobu je +2000rsd na cenu, deca nemaju doplatu)',
      en: 'per vehicle (price is for up to 3 people, 4th adult person +2000rsd to the price, children have no surcharge)',
      ru: 'за автомобиль (цена до 3 человек, за 4-го взрослого +2000 динаров к цене, дети без доплаты)'
    },
    names: {
      sr: 'Novi Sad ⇄ Zagreb Aerodrom',
      en: 'Novi Sad ⇄ Zagreb Airport',
      ru: 'Нови Сад ⇄ Аэропорт Загреб'
    },
    whatsappMessages: {
      sr: 'Zdravo! Zainteresovan/a sam za međunarodni transfer Novi Sad - Zagreb. Molim Vas pošaljite mi detalje o rezervaciji.',
      en: 'Hello! I am interested in international transfer Novi Sad - Zagreb. Please send me booking details.',
      ru: 'Здравствуйте! Меня интересует международный трансфер Нови Сад - Загреб. Пожалуйста, пришлите детали бронирования.'
    }
  },
  {
    id: 'novi-sad-temisvar',
    price: '12.000',
    icon: '🇷🇴',
    order: 4,
    priceDescriptions: {
      sr: 'po vozilu (cena je do 3 osobe, za četvrtu odraslu osobu je +1200rsd na cenu, deca nemaju doplatu)',
      en: 'per vehicle (price is for up to 3 people, 4th adult person +1200rsd to the price, children have no surcharge)',
      ru: 'за автомобиль (цена до 3 человек, за 4-го взрослого +1200 динаров к цене, дети без доплаты)'
    },
    names: {
      sr: 'Novi Sad ⇄ Temišvar Aerodrom',
      en: 'Novi Sad ⇄ Timisoara Airport',
      ru: 'Нови Сад ⇄ Аэропорт Тимишоара'
    },
    whatsappMessages: {
      sr: 'Zdravo! Zainteresovan/a sam za transfer Novi Sad - Temišvar. Molim Vas kontaktirajte me za više informacija.',
      en: 'Hello! I am interested in transfer Novi Sad - Timisoara. Please contact me for more information.',
      ru: 'Здравствуйте! Меня интересует трансфер Нови Сад - Тимишоара. Пожалуйста, свяжитесь со мной для получения информации.'
    }
  },
  {
    id: 'novi-sad-nis',
    price: '15.000',
    icon: '🛫',
    order: 5,
    priceDescriptions: {
      sr: 'po vozilu (cena je do 3 osobe, za četvrtu odraslu osobu je +1300rsd na cenu, deca nemaju doplatu)',
      en: 'per vehicle (price is for up to 3 people, 4th adult person +1300rsd to the price, children have no surcharge)',
      ru: 'за автомобиль (цена до 3 человек, за 4-го взрослого +1300 динаров к цене, дети без доплаты)'
    },
    names: {
      sr: 'Novi Sad ⇄ Niš Aerodrom',
      en: 'Novi Sad ⇄ Niš Airport',
      ru: 'Нови Сад ⇄ Аэропорт Ниш'
    },
    whatsappMessages: {
      sr: 'Zdravo! Zainteresovan/a sam za transfer Novi Sad - Niš. Molim Vas pošaljite mi informacije o rezervaciji.',
      en: 'Hello! I am interested in transfer Novi Sad - Niš. Please send me booking information.',
      ru: 'Здравствуйте! Меня интересует трансфер Нови Сад - Ниш. Пожалуйста, пришлите информацию о бронировании.'
    }
  },
  {
    id: 'novi-sad-segedin',
    price: '8.500',
    icon: '🇭🇺',
    order: 6,
    priceDescriptions: {
      sr: 'po vozilu (cena je do 3 osobe, za četvrtu odraslu osobu je +1100rsd na cenu, deca nemaju doplatu)',
      en: 'per vehicle (price is for up to 3 people, 4th adult person +1100rsd to the price, children have no surcharge)',
      ru: 'за автомобиль (цена до 3 человек, за 4-го взрослого +1100 динаров к цене, дети без доплаты)'
    },
    names: {
      sr: 'Novi Sad ⇄ Segedin',
      en: 'Novi Sad ⇄ Szeged',
      ru: 'Нови Сад ⇄ Сегед'
    },
    whatsappMessages: {
      sr: 'Zdravo! Zainteresovan/a sam za transfer Novi Sad - Segedin. Molim Vas kontaktirajte me za rezervaciju.',
      en: 'Hello! I am interested in transfer Novi Sad - Szeged. Please contact me for booking.',
      ru: 'Здравствуйте! Меня интересует трансфер Нови Сад - Сегед. Пожалуйста, свяжитесь со мной для бронирования.'
    }
  }
];

// Initialize default data if not exists
export const initializeDefaultData = async (): Promise<void> => {
  try {
    const routesRef = ref(database, 'routes');
    const snapshot = await get(routesRef);
    
    if (!snapshot.exists()) {
      console.log('Initializing default routes data...');
      await set(routesRef, defaultRoutes);
    }
  } catch (error) {
    console.error('Error initializing default data:', error);
  }
};

// Get all routes from Firebase
export const getPrices = async (): Promise<RoutePrice[]> => {
  try {
    const routesRef = ref(database, 'routes');
    const snapshot = await get(routesRef);
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      const routes = Array.isArray(data) ? data : Object.values(data);
      
      // Sort by order field, fallback to original order
      return routes.sort((a: any, b: any) => {
        const orderA = a.order || 999;
        const orderB = b.order || 999;
        return orderA - orderB;
      });
    }
    
    return [];
  } catch (error) {
    console.error('Error getting prices from Firebase:', error);
    return [];
  }
};

// Save all routes to Firebase
export const savePrices = async (routes: RoutePrice[]): Promise<boolean> => {
  try {
    const routesRef = ref(database, 'routes');
    await set(routesRef, routes);
    return true;
  } catch (error) {
    console.error('Error saving prices to Firebase:', error);
    return false;
  }
};

// Reset to default routes
export const resetPrices = async (): Promise<boolean> => {
  try {
    const routesRef = ref(database, 'routes');
    await set(routesRef, defaultRoutes);
    return true;
  } catch (error) {
    console.error('Error resetting prices in Firebase:', error);
    return false;
  }
};

// Update a specific route
export const updateRoute = async (routeId: string, routeData: RoutePrice): Promise<boolean> => {
  try {
    const routes = await getPrices();
    const routeIndex = routes.findIndex(r => r.id === routeId);
    
    if (routeIndex !== -1) {
      routes[routeIndex] = routeData;
      return await savePrices(routes);
    }
    
    return false;
  } catch (error) {
    console.error('Error updating route in Firebase:', error);
    return false;
  }
};

// Delete a route
export const deleteRoute = async (routeId: string): Promise<boolean> => {
  try {
    const routes = await getPrices();
    const filteredRoutes = routes.filter(r => r.id !== routeId);
    return await savePrices(filteredRoutes);
  } catch (error) {
    console.error('Error deleting route from Firebase:', error);
    return false;
  }
};

// Add a new route
export const addRoute = async (routeData: RoutePrice): Promise<boolean> => {
  try {
    const routes = await getPrices();
    
    // Set order to be last + 1
    const maxOrder = Math.max(...routes.map(r => r.order || 0), 0);
    routeData.order = maxOrder + 1;
    
    routes.push(routeData);
    return await savePrices(routes);
  } catch (error) {
    console.error('Error adding route to Firebase:', error);
    return false;
  }
};

// Update route order
export const updateRouteOrder = async (routeId: string, newOrder: number): Promise<boolean> => {
  try {
    const routes = await getPrices();
    const routeIndex = routes.findIndex(r => r.id === routeId);
    
    if (routeIndex !== -1) {
      routes[routeIndex].order = newOrder;
      return await savePrices(routes);
    }
    
    return false;
  } catch (error) {
    console.error('Error updating route order in Firebase:', error);
    return false;
  }
};

// Reorder all routes
export const reorderRoutes = async (reorderedRoutes: RoutePrice[]): Promise<boolean> => {
  try {
    // Update order field for each route
    const routesWithOrder = reorderedRoutes.map((route, index) => ({
      ...route,
      order: index + 1
    }));
    
    return await savePrices(routesWithOrder);
  } catch (error) {
    console.error('Error reordering routes in Firebase:', error);
    return false;
  }
};

// Helper functions
export const getRouteName = (routeId: string, language: Language, routes: RoutePrice[]): string => {
  const route = routes.find(r => r.id === routeId);
  return route?.names[language] || routeId;
};

export const getPriceDescription = (routeId: string, language: Language, routes: RoutePrice[]): string => {
  const route = routes.find(r => r.id === routeId);
  
  // Use new multilingual descriptions if available
  if (route?.priceDescriptions?.[language]) {
    return route.priceDescriptions[language];
  }
  
  // Fallback to old single description
  if (route?.priceDescription) {
    return route.priceDescription;
  }
  
  // Default fallback
  const defaults = {
    sr: 'po vozilu (do 3 osobe + 1500 po osobi)',
    en: 'per vehicle (up to 3 people + 1500 per person)',
    ru: 'за автомобиль (до 3 человек + 1500 за человека)'
  };
  
  return defaults[language];
};

export const getWhatsAppMessage = (routeId: string, language: Language, routes: RoutePrice[]): string => {
  const route = routes.find(r => r.id === routeId);
  return route?.whatsappMessages[language] || `Zdravo! Zainteresovan/a sam za transfer ${routeId}.`;
};