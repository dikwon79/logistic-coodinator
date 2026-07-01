import { CalendarClock, CheckCircle2, CircleDashed, Clock3, Sparkles } from "lucide-react";
import { loadPlan, loadPlanSummary } from "@/src/lib/operations";

type RouteWorkbenchProps = {
  compact?: boolean;
};

// One real 3-stop route (R6: McLane Ohio -> Cumberland -> Southern).
const routeStops = loadPlan.filter((stop) => stop.route === "R6");
const routeUnits = routeStops.reduce((sum, stop) => sum + stop.qty, 0);

// Map labels, ordered south -> north so they sit sensibly on the route
// (bottom-left = southernmost, top-right = northernmost).
const mapCities = [...routeStops].sort((a, b) => a.lat - b.lat);

// A small, varied appointment sample (includes a pending one).
const appointmentQueue = [loadPlan[0], loadPlan[5], loadPlan[7]];

const city = (value: string) => value.split(",")[0];

export function RouteWorkbench({ compact = false }: RouteWorkbenchProps) {
  return (
    <div className={compact ? "route-workbench compact-route-workbench" : "route-workbench"}>
      <section className="map-panel" aria-label="Recommended route preview">
        <div className="panel-title-row">
          <div>
            <p className="eyebrow">Route intelligence</p>
            <h2>Recommended route R6</h2>
          </div>
          <span className="score-pill">
            <Sparkles aria-hidden="true" size={15} />
            {routeUnits} units
          </span>
        </div>
        <div className="route-map">
          <svg className="route-svg" viewBox="0 0 620 320" role="img" aria-label="Recommended multi-stop route">
            <defs>
              <linearGradient id="routeLine" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#40c463" />
                <stop offset="52%" stopColor="#2f81f7" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
            <path className="map-road road-a" d="M42 250 C170 210 214 112 330 152 C438 188 486 110 586 78" />
            <path className="map-road road-b" d="M82 72 C168 126 244 66 350 94 C450 120 504 206 576 246" />
            <path className="active-route" d="M58 245 C156 216 216 124 322 150 C416 172 468 118 570 84" />
            <circle className="stop-node origin" cx="58" cy="245" r="12" />
            <circle className="stop-node mid" cx="322" cy="150" r="12" />
            <circle className="stop-node end" cx="570" cy="84" r="12" />
          </svg>
          <div className="map-city city-a">{city(mapCities[0].city)}</div>
          <div className="map-city city-b">{city(mapCities[1].city)}</div>
          <div className="map-city city-c">{city(mapCities[2].city)}</div>
          <span className="plan-total-badge">Total {loadPlanSummary.total}</span>
        </div>
        <div className="route-stops">
          {routeStops.map((stop) => (
            <article className="stop-card" key={stop.po}>
              <span className="stop-code">{stop.code}</span>
              <div>
                <h3>{stop.shipTo}</h3>
                <p>
                  {stop.city} · {stop.opHours}
                </p>
              </div>
              <strong>{stop.appt}</strong>
              <span className="stop-status">{stop.status}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="booking-panel" aria-label="Retail appointment queue">
        <div className="panel-title-row">
          <div>
            <p className="eyebrow">Retail appointments</p>
            <h2>Appointment queue</h2>
          </div>
          <CalendarClock aria-hidden="true" size={24} />
        </div>
        <div className="queue-list">
          {appointmentQueue.map((booking) => (
            <article className="queue-item" key={booking.po}>
              <div>
                <h3>{booking.shipTo}</h3>
                <p>
                  {booking.city} · Dock {booking.dock}
                </p>
              </div>
              <div>
                <strong>{booking.appt}</strong>
                <span className={`queue-state ${booking.status.toLowerCase()}`}>
                  {booking.status === "Confirmed" ? (
                    <CheckCircle2 aria-hidden="true" size={14} />
                  ) : (
                    <CircleDashed aria-hidden="true" size={14} />
                  )}
                  {booking.status}
                </span>
              </div>
            </article>
          ))}
        </div>
        <div className="recommendation-strip">
          <Clock3 aria-hidden="true" size={18} />
          <p>Best next slot: McLane Ozark (MO) at 07:00 — open dock and matched pickup window.</p>
        </div>
      </section>
    </div>
  );
}
