import {
  CalendarCheck,
  MapPinned,
  Radar,
  Route,
  ShieldCheck,
  Truck,
  Warehouse,
  Waypoints
} from "lucide-react";

export const featureModules = [
  {
    icon: Route,
    title: "AI Route Recommendations",
    body: "Compare mileage, dock windows, traffic assumptions, and driver hours before the coordinator commits to a run."
  },
  {
    icon: MapPinned,
    title: "Live Map Coordination",
    body: "Follow active loads, exception stops, and ETA drift from one clean AI-assisted control room view."
  },
  {
    icon: CalendarCheck,
    title: "Retail Booking Assistant",
    body: "Prepare Costco and Sam's Club appointment details with lane, PO, pallet, and arrival requirements in one queue."
  },
  {
    icon: ShieldCheck,
    title: "Carrier-Ready Coordination",
    body: "Keep dispatch notes, equipment requirements, and customer visibility aligned before a truck reaches the dock."
  }
];

export const routeStops = [
  {
    code: "DC",
    title: "Dallas Fulfillment",
    meta: "Origin - 42 pallets",
    eta: "06:20",
    status: "Ready"
  },
  {
    code: "S1",
    title: "Sam's Club Receiving",
    meta: "Plano, TX - appointment window",
    eta: "08:05",
    status: "Booking"
  },
  {
    code: "C1",
    title: "Costco Depot",
    meta: "Fort Worth, TX - dry van",
    eta: "10:35",
    status: "Confirmed"
  }
];

export const bookingQueue = [
  {
    retailer: "Costco",
    lane: "DFW to Fort Worth",
    window: "10:00 - 11:30",
    state: "Confirmed"
  },
  {
    retailer: "Sam's Club",
    lane: "Dallas to Plano",
    window: "08:00 - 09:00",
    state: "Needs PO"
  },
  {
    retailer: "Costco",
    lane: "Irving to Tulsa",
    window: "Tomorrow AM",
    state: "Recommended"
  }
];

export const dashboardStats = [
  {
    icon: Truck,
    label: "Active Loads",
    value: "18"
  },
  {
    icon: Waypoints,
    label: "Optimized Stops",
    value: "64"
  },
  {
    icon: Radar,
    label: "ETA Alerts",
    value: "3"
  },
  {
    icon: Warehouse,
    label: "Dock Bookings",
    value: "11"
  }
];
