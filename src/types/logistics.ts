export type TrackingStatus = 'order_created' | 'picked_up' | 'in_transit' | 'customs_cleared' | 'out_for_delivery' | 'delivered';

export interface TrackingEvent {
  id: string;
  timestamp: string;
  location: string;
  status: TrackingStatus;
  description: string;
  completed: boolean;
}

export interface ShipmentData {
  trackingNumber: string;
  serviceType: string;
  senderCity: string;
  senderCountry: string;
  recipientCity: string;
  recipientCountry: string;
  weightKg: number;
  pieces: number;
  status: TrackingStatus;
  statusLabel: string;
  estimatedDelivery: string;
  carrier: string;
  lastUpdated: string;
  events: TrackingEvent[];
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  iconName: string;
  badge?: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  location: string;
}

export interface RateEstimate {
  serviceName: string;
  transitTime: string;
  estimatedPriceINR: number;
  estimatedPriceUSD: number;
  bestFor: string;
  features: string[];
}
