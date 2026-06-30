import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, CheckCircle2, MapPinned, Navigation, Zap } from "lucide-react";
import { SiteHeader } from "@/src/components/SiteHeader";
import { RouteWorkbench } from "@/src/components/RouteWorkbench";
import { featureModules } from "@/src/lib/operations";

const servicePillars = [
  "AI route recommendation",
  "Costco dock appointment prep",
  "Sam's Club receiving workflow",
  "Driver ETA coordination"
];

export default function Home() {
  return (
    <main>
      <section className="hero-section">
        <Image
          src="/images/logistics-optimizer-hero.png"
          alt="Modern distribution dock with truck, route map, and scheduling interface"
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-overlay" />
        <SiteHeader />
        <div className="hero-content">
          <p className="hero-kicker">
            <Navigation aria-hidden="true" size={18} />
            AI route coordination + retail booking
          </p>
          <h1>AI Logistic Coordinator</h1>
          <p className="hero-copy">
            An AI-assisted logistics coordinator for recommending shorter routes, tracking live loads, and preparing Costco and Sam's Club booking details before a truck reaches the dock.
          </p>
          <div className="hero-actions">
            <Link href="/login" className="primary-button">
              <span>Start coordinator login</span>
              <ArrowRight aria-hidden="true" size={19} />
            </Link>
            <Link href="/dashboard" className="secondary-button">
              <MapPinned aria-hidden="true" size={18} />
              <span>Preview AI console</span>
            </Link>
          </div>
          <div className="hero-metrics" aria-label="Platform highlights">
            <span>
              <strong>Multi-stop</strong>
              AI routing
            </span>
            <span>
              <strong>Live ETA</strong>
              monitoring
            </span>
            <span>
              <strong>Retail dock</strong>
              booking queue
            </span>
          </div>
        </div>
      </section>

      <section className="section-shell intro-band" id="platform">
        <div className="section-heading">
          <p className="eyebrow">Built for logistics operators</p>
          <h2>One AI coordinator for route decisions and appointment readiness.</h2>
        </div>
        <div className="pillars-grid">
          {servicePillars.map((pillar) => (
            <div className="pillar-item" key={pillar}>
              <CheckCircle2 aria-hidden="true" size={18} />
              <span>{pillar}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell module-section">
        <div className="section-heading tight-heading">
          <p className="eyebrow">Coordinator modules</p>
          <h2>From lane planning to retail receiving windows, coordinated by AI.</h2>
        </div>
        <div className="feature-grid">
          {featureModules.map(({ icon: Icon, title, body }) => (
            <article className="feature-card" key={title}>
              <span className="feature-icon">
                <Icon aria-hidden="true" size={22} />
              </span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell workbench-section" id="booking">
        <div className="workbench-copy">
          <p className="eyebrow">AI route console</p>
          <h2>Let the coordinator recommend the route, then line up the dock window.</h2>
          <p>
            Operators see the next best route alongside appointment requirements, keeping freight movement and retail booking work in the same operating rhythm.
          </p>
        </div>
        <RouteWorkbench />
      </section>

      <section className="cta-band">
        <div>
          <p className="eyebrow">Ready for Vercel + Supabase</p>
          <h2>Launch the homepage, then connect real accounts and bookings.</h2>
        </div>
        <Link href="/login" className="primary-button">
          <CalendarCheck aria-hidden="true" size={18} />
          <span>Open secure login</span>
        </Link>
      </section>

      <footer className="site-footer">
        <span>AI Logistic Coordinator</span>
        <span>Costco and Sam's Club names are used only to describe configurable retail booking workflows.</span>
        <span>
          <Zap aria-hidden="true" size={15} />
          Built for Vercel deployment
        </span>
      </footer>
    </main>
  );
}
