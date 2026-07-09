// Typed client for the Python (Flask) route-optimizer service.
// Every call goes through the same-origin proxy at /api/opt/* (see
// app/api/opt/[...path]/route.ts), which forwards to OPTIMIZER_API_URL.
//
// IMPORTANT: many endpoints return HTTP 200 with `{ success: false }` or
// `{ error: ... }`, so callers must inspect the body, not just the status.

const BASE = "/api/opt";

// ---- Data models (mirror the Flask contract) ----

export type Warehouse = {
  dc_code: string;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  group: string; // "MS-WH" | "L1-WH"
  receiving_code?: string;
  lat: number;
  lon: number;
  timezone?: string;
  mr_site_id?: number;
};

export type Origin = {
  lat: number;
  lon: number;
  timezone?: string;
};

export type WarehouseData = {
  origins: Record<string, Origin>;
  warehouses: Warehouse[];
  receiving_schedules: Record<string, Array<[string, string, string]>>;
  dc_map: Record<string, string>;
};

// PO input sent to /api/optimize
export type OptimizePo = {
  po_number: string;
  warehouse: string; // must equal an existing warehouse `name`
  due_date: string; // YYYY-MM-DD
  quantity: number;
  product_type?: string;
  inventory_available_date?: string;
  pickup_time?: string; // YYYY-MM-DDTHH:MM
};

export type RouteStop = {
  stop: number;
  warehouse: string;
  dc_code: string;
  po_number: string;
  quantity: number;
  segment_km: number;
  segment_hours: number;
  rest_hours: number;
  total_seg_hours: number;
  arrival_time: string;
  adjusted_arrival: string;
  latest_departure: string;
  receiving_code: string;
  due_date: string;
  timezone: string;
};

export type OptimizedRoute = {
  feasible: boolean;
  cost: number;
  distance_km: number;
  total_units: number;
  total_hours: number;
  detour_ratio: number;
  po_numbers: string[];
  warehouses: string[];
  infeasible_reasons: string[];
  combo_indices: number[];
  departure: string;
  schedule: RouteStop[];
};

export type GroupResult = {
  group: string;
  origin: string;
  routes: OptimizedRoute[];
  infeasible: Array<{ po: OptimizePo; reasons: string[] }>;
  total_cost: number;
  total_routes: number;
};

export type Coords = Record<string, { lat: number; lon: number; label?: string }>;

export type OptimizeSummary = {
  total_pos: number;
  ms_pos: number;
  l1_pos: number;
  total_routes: number;
  grand_total: number;
  total_infeasible: number;
};

export type OptimizeResponse = {
  success: true;
  ms_result: GroupResult;
  l1_result: GroupResult;
  coords: Coords;
  receiving_schedules: Record<string, string>;
  summary: OptimizeSummary;
  assumptions: Record<string, number>;
};

export type OptimizeError = { success: false; errors: string[] };

export type UploadResponse = {
  success: boolean;
  pos?: OptimizePo[];
  warnings?: string[];
  error?: string;
};

export type RagStop = {
  dc: string;
  po: string;
  qty: number;
  appt: string;
  appt_history?: string[];
  loading?: string;
  pickup?: string;
};

export type RagRoute = {
  route: string;
  group: string;
  total_qty: number;
  stops: RagStop[];
};

export type RagPreviewResponse = {
  success: boolean;
  preview?: RagRoute[];
  total_routes?: number;
  total_pos?: number;
  error?: string;
};

export type BookingResult = {
  status: "matched" | "help_assist_created" | "help_assist_updated" | "error";
  message: string;
  ticket_id: number | null;
  slot: unknown | null;
  dc_code?: string;
  po?: string;
};

export type BookBatchResponse =
  | { status: "ok"; results: BookingResult[] }
  | { status: "error"; message: string };

export type BookingItem = {
  dc_code: string;
  po: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  pallets?: number;
};

// ---- Low-level helpers ----

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}/${path}`, { cache: "no-store" });
  return res.json() as Promise<T>;
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}/${path}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  });
  return res.json() as Promise<T>;
}

async function postForm<T>(path: string, form: FormData): Promise<T> {
  const res = await fetch(`${BASE}/${path}`, { method: "POST", body: form });
  return res.json() as Promise<T>;
}

// ---- Endpoint wrappers ----

export const optimizerApi = {
  warehouses: () => getJson<Warehouse[]>("warehouses"),
  warehouseData: () => getJson<WarehouseData>("warehouse-data"),
  sample: () => getJson<OptimizePo[]>("sample"),

  optimize: (pos: OptimizePo[], opts?: { ms_origin?: string; l1_origin?: string; balance_weight?: number }) =>
    postJson<OptimizeResponse | OptimizeError>("optimize", { pos, ...opts }),

  autoSchedule: (routes: OptimizedRoute[], group = "MS-WH") =>
    postJson<{ success: boolean; schedules?: unknown[]; error?: string }>("auto-schedule", { routes, group }),

  uploadExcel: (file: File) => {
    const form = new FormData();
    form.append("file", file);
    return postForm<UploadResponse>("upload-excel", form);
  },

  ragPaste: (text: string) => postJson<RagPreviewResponse>("rag-paste", { text }),

  ragPreview: (file: File) => {
    const form = new FormData();
    form.append("file", file);
    return postForm<RagPreviewResponse>("rag-preview", form);
  },

  ragConfirm: (routes: RagRoute[]) => postJson<{ success: boolean; message?: string; error?: string }>("rag-confirm", { routes }),

  // Real dock booking against Capstone via the Python service. Outward-facing —
  // only call on explicit user action.
  bookBatch: (loadPlan: BookingItem[], email?: string) =>
    postJson<BookBatchResponse>("book-batch", { load_plan: loadPlan, email }),

  aiChat: (question: string, context: string) =>
    postJson<{ answer?: string; error?: string }>("ai-chat", { question, context })
};

export function isOptimizeSuccess(res: OptimizeResponse | OptimizeError): res is OptimizeResponse {
  return res.success === true;
}
