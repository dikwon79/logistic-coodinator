import { Award, BadgeCheck, MessageSquare, PackageCheck, Send, ShieldCheck } from "lucide-react";
import { carrierBidBoard, carrierMessages, carrierWorkflow, orderMilestones } from "@/src/lib/operations";

type CarrierOperationsProps = {
  compact?: boolean;
};

export function CarrierOperations({ compact = false }: CarrierOperationsProps) {
  return (
    <div className={compact ? "carrier-operations compact-carrier-operations" : "carrier-operations"}>
      <section className="carrier-panel bid-panel" aria-label="Verified carrier bid board">
        <div className="panel-title-row">
          <div>
            <p className="eyebrow">Verified carrier bidding</p>
            <h2>Open tender: DFW to Fort Worth</h2>
          </div>
          <span className="score-pill">
            <BadgeCheck aria-hidden="true" size={15} />
            3 verified bids
          </span>
        </div>
        <div className="tender-summary" aria-label="Load tender summary">
          <span>
            <small>Load</small>
            <strong>42 pallets</strong>
          </span>
          <span>
            <small>Equipment</small>
            <strong>Dry van</strong>
          </span>
          <span>
            <small>Appointment</small>
            <strong>10:00 Costco</strong>
          </span>
        </div>
        <div className="carrier-bid-list">
          {carrierBidBoard.map((carrier, index) => (
            <article className={index === 0 ? "carrier-bid selected-bid" : "carrier-bid"} key={carrier.carrier}>
              <div className="carrier-rank">{index + 1}</div>
              <div className="carrier-bid-main">
                <div>
                  <h3>{carrier.carrier}</h3>
                  {index === 0 ? <em>Recommended</em> : null}
                  <span>
                    <ShieldCheck aria-hidden="true" size={14} />
                    {carrier.status}
                  </span>
                </div>
                <p>{carrier.notes}</p>
              </div>
              <div className="carrier-bid-meta">
                <strong>{carrier.bid}</strong>
                <span>{carrier.eta}</span>
                <em>{carrier.score} score</em>
              </div>
            </article>
          ))}
        </div>
        <div className="carrier-action-row">
          <button type="button" className="mini-action primary-mini-action">
            <Award aria-hidden="true" size={16} />
            Award NorthStar
          </button>
          <button type="button" className="mini-action">
            <MessageSquare aria-hidden="true" size={16} />
            Message
          </button>
        </div>
      </section>

      <section className="carrier-panel communication-panel" aria-label="Carrier communication thread">
        <div className="panel-title-row">
          <div>
            <p className="eyebrow">Communication</p>
            <h2>Carrier thread</h2>
          </div>
          <MessageSquare aria-hidden="true" size={23} />
        </div>
        <div className="message-thread">
          {carrierMessages.map((message) => (
            <article className="thread-message" key={`${message.from}-${message.time}`}>
              <div>
                <strong>{message.from}</strong>
                <span>{message.time}</span>
              </div>
              <p>{message.text}</p>
            </article>
          ))}
        </div>
        <div className="message-compose">
          <span>Confirm rate, equipment, dock instructions</span>
          <button type="button" aria-label="Send carrier message">
            <Send aria-hidden="true" size={16} />
          </button>
        </div>
      </section>

      <section className="carrier-panel order-panel" id="orders" aria-label="Awarded order delivery management">
        <div className="panel-title-row">
          <div>
            <p className="eyebrow">Order management</p>
            <h2>ORD-2048 delivery control</h2>
          </div>
          <PackageCheck aria-hidden="true" size={24} />
        </div>
        <div className="workflow-strip">
          {carrierWorkflow.map((step, index) => (
            <span key={step}>
              <i>{index + 1}</i>
              <strong>{step}</strong>
            </span>
          ))}
        </div>
        <div className="milestone-list">
          {orderMilestones.map((milestone) => (
            <article className="milestone-item" key={milestone.label}>
              <span className={`milestone-state ${milestone.state.toLowerCase()}`}>{milestone.state}</span>
              <div>
                <h3>{milestone.label}</h3>
                <p>{milestone.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
