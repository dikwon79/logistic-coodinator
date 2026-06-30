import {
  BadgeCheck,
  CalendarCheck,
  ClipboardCheck,
  Handshake,
  MapPinned,
  MessageSquare,
  PackageCheck,
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
  },
  {
    icon: BadgeCheck,
    title: "Verified Carrier Bidding",
    body: "Open booked freight only to approved carriers, compare bids, service scores, equipment fit, and response speed."
  },
  {
    icon: MessageSquare,
    title: "Carrier Communication Hub",
    body: "Keep questions, rate confirmations, dock instructions, and exception notes tied to the same booking record."
  },
  {
    icon: ClipboardCheck,
    title: "Order Assignment",
    body: "Award the load, issue the order, and lock carrier obligations before pickup is released."
  },
  {
    icon: PackageCheck,
    title: "Delivery Management",
    body: "Track pickup, in-transit checkpoints, retail receiving, POD, and exception recovery from one order view."
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
  },
  {
    icon: Handshake,
    label: "Open Bids",
    value: "7"
  }
];

export const carrierBidBoard = [
  {
    carrier: "NorthStar Freight",
    status: "Verified",
    bid: "$1,420",
    eta: "Pickup 06:45",
    score: "96",
    notes: "Team driver available, retail dock approved"
  },
  {
    carrier: "BlueLine Logistics",
    status: "Verified",
    bid: "$1,360",
    eta: "Pickup 07:15",
    score: "91",
    notes: "Best price, needs reefer confirmation"
  },
  {
    carrier: "Summit Carrier Group",
    status: "Verified",
    bid: "$1,510",
    eta: "Pickup 06:30",
    score: "94",
    notes: "Strong on-time history for club deliveries"
  }
];

export const carrierMessages = [
  {
    from: "Coordinator",
    text: "Please confirm pallet count, liftgate not required, Costco appointment 10:00.",
    time: "09:12"
  },
  {
    from: "NorthStar Freight",
    text: "Confirmed. Driver can check in 20 minutes early with PO and seal number.",
    time: "09:14"
  },
  {
    from: "Coordinator",
    text: "Award pending. Upload insurance cert and driver contact before order release.",
    time: "09:16"
  }
];

export const orderMilestones = [
  {
    label: "Bid awarded",
    detail: "NorthStar Freight accepted at $1,420",
    state: "Done"
  },
  {
    label: "Order issued",
    detail: "Rate confirmation and retail instructions sent",
    state: "Done"
  },
  {
    label: "Pickup monitoring",
    detail: "Driver en route to Dallas Fulfillment",
    state: "Live"
  },
  {
    label: "Delivery proof",
    detail: "POD required after Costco receiving",
    state: "Next"
  }
];

export const carrierWorkflow = [
  "Tender opened",
  "Bids received",
  "Carrier selected",
  "Order released",
  "Delivery monitored"
];
