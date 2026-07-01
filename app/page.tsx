import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  Handshake,
  Instagram,
  Linkedin,
  MapPinned,
  Navigation,
  PackageCheck,
  Route
} from "lucide-react";
import { BrandLogo } from "@/src/components/BrandLogo";
import { CarrierOperations } from "@/src/components/CarrierOperations";
import { SiteHeader } from "@/src/components/SiteHeader";
import { RouteWorkbench } from "@/src/components/RouteWorkbench";
import { featureModules } from "@/src/lib/operations";

const servicePillars = [
  "AI route recommendation",
  "Costco dock appointment prep",
  "Sam's Club receiving workflow",
  "Verified carrier bidding",
  "Order and delivery control"
];

const operatingFlow = [
  {
    icon: CalendarCheck,
    label: "Book",
    title: "Dock window ready",
    body: "Collect PO, pallet, equipment, and arrival requirements."
  },
  {
    icon: Route,
    label: "Plan",
    title: "Route recommended",
    body: "Compare stops, buffers, ETA risk, and appointment timing."
  },
  {
    icon: Handshake,
    label: "Tender",
    title: "Verified bids open",
    body: "Invite only approved carriers to bid and communicate."
  },
  {
    icon: PackageCheck,
    label: "Control",
    title: "Order tracked",
    body: "Award, issue, monitor, and close with proof of delivery."
  }
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
              <strong>Auto schedule</strong>
              dock slots
            </span>
            <span>
              <strong>Retail dock</strong>
              booking queue
            </span>
            <span>
              <strong>Carrier bids</strong>
              order awards
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

      <section className="section-shell operations-showcase" id="booking">
        <div className="operations-heading">
          <p className="eyebrow">Operating flow</p>
          <h2>From dock appointment to delivered order, every handoff stays visible.</h2>
          <p>
            AI Logistic Coordinator connects appointment planning, route recommendation, certified carrier bidding, in-app communication, order release, and delivery proof into one workflow.
          </p>
        </div>
        <div className="flow-grid" aria-label="Booking to delivery workflow">
          {operatingFlow.map(({ icon: Icon, label, title, body }) => (
            <article className="flow-card" key={label}>
              <span className="flow-label">{label}</span>
              <Icon aria-hidden="true" size={22} />
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
        <div className="showcase-block">
          <div className="showcase-copy">
            <p className="eyebrow">Route and appointment console</p>
            <h3>Recommend the route, then line up the dock window.</h3>
            <p>
              Operators see the next best route beside appointment requirements, so freight movement and retail booking work stay in the same operating rhythm.
            </p>
            <div className="showcase-chips">
              <span>
                <Route aria-hidden="true" size={15} />
                6 routes · 190 units
              </span>
              <span>
                <CalendarCheck aria-hidden="true" size={15} />
                11 of 12 appointments confirmed
              </span>
            </div>
          </div>
          <RouteWorkbench />
        </div>
        <div className="showcase-block carrier-showcase-block" id="carriers">
          <div className="showcase-copy">
            <p className="eyebrow">Carrier bid and order control</p>
            <h3>Turn confirmed bookings into bids, awarded orders, and managed deliveries.</h3>
            <p>
              Approved carriers bid inside the system, communicate on the load record, receive awarded orders, and report execution from pickup to POD.
            </p>
            <div className="showcase-chips">
              <span>
                <BadgeCheck aria-hidden="true" size={15} />
                Verified carriers only
              </span>
              <span>
                <PackageCheck aria-hidden="true" size={15} />
                POD follow-through
              </span>
            </div>
          </div>
          <CarrierOperations />
        </div>
      </section>

      <section className="cta-band">
        <div>
          <p className="eyebrow">Secure operating portal</p>
          <h2>Invite dispatchers, shippers, and approved carriers into one coordinated workflow.</h2>
          <p>
            Sign in to plan routes, prepare retail dock appointments, run verified carrier bids, and track every order through proof of delivery.
          </p>
        </div>
        <Link href="/login" className="primary-button">
          <CalendarCheck aria-hidden="true" size={18} />
          <span>Open coordinator portal</span>
        </Link>
      </section>

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="brand-mark footer-logo" aria-label="AI Logistic Coordinator home">
              <span className="brand-icon">
                <BrandLogo size={20} />
              </span>
              <span>
                <strong>AI Logistic</strong>
                <small>Coordinator</small>
              </span>
            </Link>
            <address className="footer-address">
              AI-assisted route coordination, live freight tracking, and retail dock booking — from booking request to proof of delivery.
            </address>
            <div className="footer-contact">
              <a href="mailto:dispatch@ailogistic.app">dispatch@ailogistic.app</a>
              <a href="tel:+18887000000">(888) 700-0000</a>
            </div>
          </div>

          <nav className="footer-col" aria-label="Platform links">
            <h3>Platform</h3>
            <Link href="/dashboard#route-console">Route Console</Link>
            <Link href="/dashboard#route-console">Booking Queue</Link>
            <Link href="/dashboard#carrier-bids">Carrier Bids</Link>
            <Link href="/dashboard#orders">Order Tracking</Link>
            <a href="#platform">Documents</a>
          </nav>

          <nav className="footer-col" aria-label="Workflow links">
            <h3>Workflows</h3>
            <a href="#booking">Costco Booking</a>
            <a href="#booking">Sam's Club Receiving</a>
            <a href="#carriers">Verified Carriers</a>
            <a href="#carriers">Carrier Bidding</a>
            <a href="#carriers">Proof of Delivery</a>
          </nav>

          <nav className="footer-col" aria-label="Company links">
            <h3>Company</h3>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/login">Login</Link>
            <a href="#platform">About</a>
            <a href="#platform">Pricing</a>
            <a href="#platform">Contact</a>
          </nav>
        </div>

        <div className="footer-bottom">
          <span>© 2026 AI Logistic Coordinator. All rights reserved.</span>
          <div className="footer-bottom-right">
            <a href="#platform">Privacy Policy</a>
            <span className="footer-social">
              <a href="#" aria-label="LinkedIn">
                <Linkedin aria-hidden="true" size={17} />
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram aria-hidden="true" size={17} />
              </a>
            </span>
          </div>
        </div>

        <p className="footer-disclaimer">
          Costco and Sam's Club are trademarks of their respective owners, referenced only to illustrate configurable retail booking workflows.
        </p>
      </footer>
    </main>
  );
}
