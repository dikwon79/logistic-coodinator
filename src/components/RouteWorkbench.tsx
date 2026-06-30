import { CalendarClock, CheckCircle2, CircleDashed, Clock3, Sparkles } from "lucide-react";
import { bookingQueue, routeStops } from "@/src/lib/operations";

type RouteWorkbenchProps = {
  compact?: boolean;
};

export function RouteWorkbench({ compact = false }: RouteWorkbenchProps) {
  return (
    <div className={compact ? "route-workbench compact-route-workbench" : "route-workbench"}>
      <section className="map-panel" aria-label="Optimized route preview">
        <div className="panel-title-row">
          <div>
            <p className="eyebrow">Route intelligence</p>
            <h2>Recommended route A</h2>
          </div>
          <span className="score-pill">
            <Sparkles aria-hidden="true" size={15} />
            94 score
          </span>
        </div>
        <div className="route-map">
          <svg className="route-svg" viewBox="0 0 620 320" role="img" aria-label="Route from Dallas fulfillment to retail docks">
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
          <div className="map-city city-a">Dallas</div>
          <div className="map-city city-b">Plano</div>
          <div className="map-city city-c">Fort Worth</div>
        </div>
        <div className="route-stops">
          {routeStops.map((stop) => (
            <article className="stop-card" key={stop.code}>
              <span className="stop-code">{stop.code}</span>
              <div>
                <h3>{stop.title}</h3>
                <p>{stop.meta}</p>
              </div>
              <strong>{stop.eta}</strong>
              <span className="stop-status">{stop.status}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="booking-panel" aria-label="Retail appointment queue">
        <div className="panel-title-row">
          <div>
            <p className="eyebrow">Retail appointments</p>
            <h2>Booking queue</h2>
          </div>
          <CalendarClock aria-hidden="true" size={24} />
        </div>
        <div className="queue-list">
          {bookingQueue.map((booking) => (
            <article className="queue-item" key={`${booking.retailer}-${booking.lane}`}>
              <div>
                <h3>{booking.retailer}</h3>
                <p>{booking.lane}</p>
              </div>
              <div>
                <strong>{booking.window}</strong>
                <span className={`queue-state ${booking.state.toLowerCase().replace(/\s+/g, "-")}`}>
                  {booking.state === "Confirmed" ? (
                    <CheckCircle2 aria-hidden="true" size={14} />
                  ) : booking.state === "Recommended" ? (
                    <Sparkles aria-hidden="true" size={14} />
                  ) : (
                    <CircleDashed aria-hidden="true" size={14} />
                  )}
                  {booking.state}
                </span>
              </div>
            </article>
          ))}
        </div>
        <div className="recommendation-strip">
          <Clock3 aria-hidden="true" size={18} />
          <p>Best next slot: Sam's Club Plano at 08:00 based on route sequence and dock buffer.</p>
        </div>
      </section>
    </div>
  );
}
