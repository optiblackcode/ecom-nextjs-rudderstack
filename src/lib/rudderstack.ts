import { RudderAnalytics } from "@rudderstack/analytics-js";

let rudderAnalytics: RudderAnalytics | null = null;

export const initRudderStack = (): RudderAnalytics | null => {
  if (typeof window === 'undefined') return null;

  if (!rudderAnalytics) {
    const writeKey = process.env.NEXT_PUBLIC_RUDDERSTACK_WRITE_KEY;
    const dataPlaneUrl = process.env.NEXT_PUBLIC_RUDDERSTACK_DATA_PLANE_URL;

    if (!writeKey || !dataPlaneUrl) {
      console.warn('RudderStack credentials not found. Analytics will not be tracked.');
      return null;
    }

    rudderAnalytics = new RudderAnalytics();
    rudderAnalytics.load(writeKey, dataPlaneUrl, {
      plugins: [],
    });
  }

  return rudderAnalytics;
};

export const getRudderStack = (): RudderAnalytics | null => {
  if (typeof window === 'undefined') return null;
  return rudderAnalytics;
};

// Analytics tracking functions
export const trackPageView = (pageName: string, properties?: Record<string, any>) => {
  const analytics = getRudderStack();
  if (analytics) {
    analytics.page(pageName, properties);
  }
};

export const trackProductViewed = (product: {
  product_id: string;
  name: string;
  price: number;
  category?: string;
  image_url?: string;
  brand?: string;
}) => {
  const analytics = getRudderStack();
  if (analytics) {
    analytics.track('Product Viewed', product);
  }
};

export const trackProductAddedToCart = (product: {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  category?: string;
}) => {
  const analytics = getRudderStack();
  if (analytics) {
    analytics.track('Product Added to Cart', product);
  }
};

export const trackCollectionViewed = (collection: {
  collection_id: string;
  collection_name: string;
  products_count?: number;
}) => {
  const analytics = getRudderStack();
  if (analytics) {
    analytics.track('Collection Viewed', collection);
  }
};

export const trackSearchSubmitted = (query: string, resultsCount?: number) => {
  const analytics = getRudderStack();
  if (analytics) {
    analytics.track('Search Submitted', {
      query,
      results_count: resultsCount,
    });
  }
};

export const trackPincodeSubmitted = (pincode: string, serviceable: boolean) => {
  const analytics = getRudderStack();
  if (analytics) {
    analytics.track('Pincode Submitted', {
      pincode,
      serviceable,
    });
  }
};

export const trackOrderReceived = (order: {
  order_id: string;
  total: number;
  products: Array<{ product_id: string; name: string; price: number; quantity: number }>;
  currency?: string;
}) => {
  const analytics = getRudderStack();
  if (analytics) {
    analytics.track('Orders Received', order);
  }
};

export const trackLoginSuccess = (userId: string, email: string) => {
  const analytics = getRudderStack();
  if (analytics) {
    analytics.identify(userId, { email });
    analytics.track('Login Success', { userId, email });
  }
};

export const trackSignupSuccess = (userId: string, email: string, name?: string) => {
  const analytics = getRudderStack();
  if (analytics) {
    analytics.identify(userId, { email, name });
    analytics.track('Signup Success', { userId, email, name, timestamp: new Date().toISOString() });
  }
};

export const trackFirstPurchase = (userId: string, orderId: string, total: number) => {
  const analytics = getRudderStack();
  if (analytics) {
    analytics.track('First Purchase Completed within 7 Days of Account Creation', {
      userId,
      order_id: orderId,
      total,
    });
  }
};
