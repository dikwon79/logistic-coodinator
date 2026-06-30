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

export type LoadStop = {
  route: string;
  color: string;
  code: string;
  shipTo: string;
  city: string;
  po: string;
  qty: number;
  appt: string;
  opHours: string;
  status: "Confirmed" | "Pending";
  dock: string;
};

export const loadPlanSummary = {
  total: "$95,758",
  hub: "MS",
  units: 190,
  capacity: 360,
  routes: 6,
  stops: 12,
  confirmed: 11,
  pending: 1
};

export const loadPlan: LoadStop[] = [
  {
    route: "R1",
    color: "#ef4444",
    code: "NE",
    shipTo: "McLane Northeast",
    city: "Baldwinsville, NY",
    po: "NE10089926-01",
    qty: 6,
    appt: "7/7 @ 21:00",
    opHours: "SUN-THU 8PM-1AM",
    status: "Confirmed",
    dock: "NE G02"
  },
  {
    route: "R1",
    color: "#ef4444",
    code: "MY",
    shipTo: "McLane NE / Concord",
    city: "Contoocook, NH",
    po: "MY10080067-01",
    qty: 3,
    appt: "7/8 @ 20:00",
    opHours: "SUN-THU 7PM-1AM",
    status: "Confirmed",
    dock: "G13"
  },
  {
    route: "R2",
    color: "#2f81f7",
    code: "MZ",
    shipTo: "McLane Mid-Atlantic",
    city: "Fredericksburg, VA",
    po: "MZ10090952-01",
    qty: 4,
    appt: "7/7 @ 15:00",
    opHours: "MON-FRI 11AM-4PM",
    status: "Confirmed",
    dock: "MZG84"
  },
  {
    route: "R2",
    color: "#2f81f7",
    code: "NC",
    shipTo: "McLane Carolina",
    city: "Battleboro, NC",
    po: "NC10102677-01",
    qty: 15,
    appt: "7/8 @ 11:00",
    opHours: "MON-FRI 10AM-4PM",
    status: "Confirmed",
    dock: "NC D17"
  },
  {
    route: "R3",
    color: "#28a745",
    code: "MI",
    shipTo: "McLane Midwest",
    city: "Indianapolis, IN",
    po: "MI10102073-01",
    qty: 20,
    appt: "7/6 @ 16:00",
    opHours: "SUN-THU 4PM-11PM",
    status: "Confirmed",
    dock: "MI S19"
  },
  {
    route: "R3",
    color: "#28a745",
    code: "MO",
    shipTo: "McLane Ozark",
    city: "Republic, MO",
    po: "MO10102417-01",
    qty: 30,
    appt: "7/7 @ 07:00",
    opHours: "MON-FRI 5AM-2PM",
    status: "Confirmed",
    dock: "MO 51"
  },
  {
    route: "R4",
    color: "#f59e0b",
    code: "SE",
    shipTo: "McLane Southeast",
    city: "Athens, GA",
    po: "SE10206395-01",
    qty: 22,
    appt: "7/5 @ 23:00",
    opHours: "SUN-THU 11PM-2AM",
    status: "Confirmed",
    dock: "SE S03"
  },
  {
    route: "R4",
    color: "#f59e0b",
    code: "ME",
    shipTo: "McLane Suneast",
    city: "Kissimmee, FL",
    po: "ME10139631-01",
    qty: 20,
    appt: "7/6 @ 08:00",
    opHours: "MON-THU 7PM-11PM",
    status: "Pending",
    dock: "Seasonal"
  },
  {
    route: "R5",
    color: "#8b5cf6",
    code: "MN",
    shipTo: "McLane Minnesota",
    city: "Northfield, MN",
    po: "MN10103311-01",
    qty: 20,
    appt: "7/6 @ 20:00",
    opHours: "SUN-THU 7PM-2AM",
    status: "Confirmed",
    dock: "MN G24"
  },
  {
    route: "R6",
    color: "#14b8a6",
    code: "MG",
    shipTo: "McLane Ohio",
    city: "Findlay, OH",
    po: "MG10193758-01",
    qty: 25,
    appt: "7/5 @ 20:30",
    opHours: "MON-FRI 6AM-1PM",
    status: "Confirmed",
    dock: "MGD 38"
  },
  {
    route: "R6",
    color: "#14b8a6",
    code: "MK",
    shipTo: "McLane Cumberland",
    city: "Nicholasville, KY",
    po: "MK10094108-01",
    qty: 20,
    appt: "7/6 @ 20:00",
    opHours: "SUN-THU 8PM-3AM",
    status: "Confirmed",
    dock: "MK G10"
  },
  {
    route: "R6",
    color: "#14b8a6",
    code: "SO",
    shipTo: "McLane Southern",
    city: "Brookhaven, MS",
    po: "SO10085631-01",
    qty: 5,
    appt: "7/7 @ 22:00",
    opHours: "SUN-THU 7PM-11PM",
    status: "Confirmed",
    dock: "SO G13"
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
