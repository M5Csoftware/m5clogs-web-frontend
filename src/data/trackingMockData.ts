import { ShipmentData } from "@/types/logistics";

export const SAMPLE_SHIPMENTS: Record<string, ShipmentData> = {
  "M5C-98421-US": {
    trackingNumber: "M5C-98421-US",
    serviceType: "M5C International Express Air",
    senderCity: "New Delhi",
    senderCountry: "India",
    recipientCity: "New York",
    recipientCountry: "United States",
    weightKg: 4.8,
    pieces: 2,
    status: "in_transit",
    statusLabel: "In Transit - International Flight Departed",
    estimatedDelivery: "Nov 30, 2026 by 18:00 EST",
    carrier: "M5C Global Express Line",
    lastUpdated: "Today at 09:45 IST",
    events: [
      {
        id: "evt-5",
        timestamp: "Nov 27, 2026 - 09:45 IST",
        location: "IGIA Cargo Terminal, New Delhi (DEL)",
        status: "in_transit",
        description: "Cargo loaded onto flight M5C-904 departing to JFK International Airport",
        completed: true,
      },
      {
        id: "evt-4",
        timestamp: "Nov 26, 2026 - 21:15 IST",
        location: "New Delhi Air Cargo Hub",
        status: "customs_cleared",
        description: "Export customs clearance granted & security screening passed",
        completed: true,
      },
      {
        id: "evt-3",
        timestamp: "Nov 26, 2026 - 16:30 IST",
        location: "M5C Central Processing Center, Gurugram",
        status: "in_transit",
        description: "Package sorted, weighed, dimension scanned & international airway bill generated",
        completed: true,
      },
      {
        id: "evt-2",
        timestamp: "Nov 26, 2026 - 11:20 IST",
        location: "Delhi NCR Operations Hub",
        status: "picked_up",
        description: "Consignment picked up from shipper origin warehouse",
        completed: true,
      },
      {
        id: "evt-1",
        timestamp: "Nov 25, 2026 - 19:40 IST",
        location: "M5C Customer Electronic Portal",
        status: "order_created",
        description: "Electronic shipping manifest and EDI documentation transmitted",
        completed: true,
      },
    ],
  },
  "M5C-74190-EU": {
    trackingNumber: "M5C-74190-EU",
    serviceType: "M5C Euro-Express Priority",
    senderCity: "Mumbai",
    senderCountry: "India",
    recipientCity: "Frankfurt",
    recipientCountry: "Germany",
    weightKg: 12.5,
    pieces: 1,
    status: "customs_cleared",
    statusLabel: "Customs Cleared at Destination Port",
    estimatedDelivery: "Nov 29, 2026 by 14:00 CET",
    carrier: "M5C Continental Freight",
    lastUpdated: "Today at 11:15 CET",
    events: [
      {
        id: "evt-4",
        timestamp: "Nov 27, 2026 - 11:15 CET",
        location: "Frankfurt Cargo Hub (FRA)",
        status: "customs_cleared",
        description: "Import clearance completed by M5C licensed customs broker",
        completed: true,
      },
      {
        id: "evt-3",
        timestamp: "Nov 27, 2026 - 04:30 CET",
        location: "Frankfurt International Airport",
        status: "in_transit",
        description: "Flight touched down, container de-palletized and sorted",
        completed: true,
      },
      {
        id: "evt-2",
        timestamp: "Nov 26, 2026 - 14:00 IST",
        location: "Chhatrapati Shivaji Maharaj Cargo (BOM)",
        status: "picked_up",
        description: "Departed Mumbai International Air Gateway",
        completed: true,
      },
      {
        id: "evt-1",
        timestamp: "Nov 25, 2026 - 18:00 IST",
        location: "Mumbai Operations Center",
        status: "order_created",
        description: "AWB generated & customs invoices verified",
        completed: true,
      },
    ],
  },
  "M5C-33812-AE": {
    trackingNumber: "M5C-33812-AE",
    serviceType: "M5C Gulf Direct E-Commerce",
    senderCity: "Bengaluru",
    senderCountry: "India",
    recipientCity: "Dubai",
    recipientCountry: "United Arab Emirates",
    weightKg: 2.1,
    pieces: 1,
    status: "delivered",
    statusLabel: "Delivered & Signed at Recipient Address",
    estimatedDelivery: "Delivered on Nov 27, 2026",
    carrier: "M5C Middle East Delivery Network",
    lastUpdated: "Today at 12:40 GST",
    events: [
      {
        id: "evt-4",
        timestamp: "Nov 27, 2026 - 12:40 GST",
        location: "Business Bay, Dubai",
        status: "delivered",
        description: "Delivered to recipient. Proof of delivery: Signed by Tariq M.",
        completed: true,
      },
      {
        id: "evt-3",
        timestamp: "Nov 27, 2026 - 08:30 GST",
        location: "M5C Dubai Logistics Hub (Al Quoz)",
        status: "out_for_delivery",
        description: "Package assigned to last-mile courier and loaded for dispatch",
        completed: true,
      },
      {
        id: "evt-2",
        timestamp: "Nov 26, 2026 - 20:00 GST",
        location: "Dubai International Airport (DXB)",
        status: "customs_cleared",
        description: "Cleared through UAE Federal Customs authority",
        completed: true,
      },
      {
        id: "evt-1",
        timestamp: "Nov 25, 2026 - 10:15 IST",
        location: "Bengaluru E-fulfillment Center",
        status: "order_created",
        description: "B2C e-commerce shipment packaged, labeled and handed over",
        completed: true,
      },
    ],
  },
};

export function searchTracking(trackingNumber: string): ShipmentData | null {
  const cleaned = trackingNumber.trim().toUpperCase();
  if (SAMPLE_SHIPMENTS[cleaned]) {
    return SAMPLE_SHIPMENTS[cleaned];
  }
  
  // If user enters any alphanumeric code, generate a realistic active shipment record
  if (cleaned.length >= 4) {
    return {
      trackingNumber: cleaned,
      serviceType: "M5C Worldwide Priority Express",
      senderCity: "New Delhi",
      senderCountry: "India",
      recipientCity: "London / Global Gateway",
      recipientCountry: "United Kingdom",
      weightKg: 3.5,
      pieces: 1,
      status: "in_transit",
      statusLabel: "In Transit - Hub Processing & Cleared for Departure",
      estimatedDelivery: "3 Business Days",
      carrier: "M 5 Continent Logistics Network",
      lastUpdated: "Just now",
      events: [
        {
          id: "dyn-3",
          timestamp: "Today - In Transit",
          location: "M5C International Hub, New Delhi (DEL)",
          status: "in_transit",
          description: `Consignment #${cleaned} processed through outbound gateway and queued for next connection`,
          completed: true,
        },
        {
          id: "dyn-2",
          timestamp: "Yesterday - Customs",
          location: "Air Cargo Complex, New Delhi",
          status: "customs_cleared",
          description: "Export documentation and security clearance approved",
          completed: true,
        },
        {
          id: "dyn-1",
          timestamp: "2 Days ago - Pickup",
          location: "Shipper Warehouse",
          status: "picked_up",
          description: "Consignment handed over to M5C courier team",
          completed: true,
        },
      ],
    };
  }

  return null;
}
