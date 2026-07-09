"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DoorOpen, Handshake, LoaderCircle, LogOut, PackageCheck, Plus, Search, Settings } from "lucide-react";
import { BrandLogo } from "@/src/components/BrandLogo";
import { CarrierOperations } from "@/src/components/CarrierOperations";
import { RouteConsole } from "@/src/components/RouteConsole";
import { dashboardStats } from "@/src/lib/operations";
import { createClient } from "@/src/lib/supabase/client";
import { isSupabaseConfigured } from "@/src/lib/supabase/config";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [isReady, setIsReady] = useState(!isSupabaseConfigured);
  const [userEmail, setUserEmail] = useState("Demo coordinator");

  useEffect(() => {
    if (!supabase) {
      return;
    }

    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) {
        return;
      }

      if (!data.session) {
        router.push("/login");
        return;
      }

      setUserEmail(data.session.user.email ?? "Coordinator");
      setIsReady(true);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push("/login");
        return;
      }

      setUserEmail(session.user.email ?? "Coordinator");
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  async function handleSignOut() {
    if (supabase) {
      await supabase.auth.signOut();
    }

    router.push("/");
    router.refresh();
  }

  if (!isReady) {
    return (
      <main className="loading-screen">
        <LoaderCircle className="spin" aria-hidden="true" size={28} />
        <p>Loading AI coordinator workspace</p>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <aside className="dashboard-sidebar">
        <Link href="/" className="brand-mark dashboard-brand">
          <span className="brand-icon">
            <BrandLogo size={20} />
          </span>
          <span>
            <strong>AI Logistic</strong>
            <small>Coordinator</small>
          </span>
        </Link>
        <nav className="dashboard-nav" aria-label="Dashboard navigation">
          <a className="active" href="#route-console">
            <DoorOpen aria-hidden="true" size={18} />
            Route Console
          </a>
          <a href="#route-console">
            <Plus aria-hidden="true" size={18} />
            Bookings
          </a>
          <a href="#carrier-bids">
            <Handshake aria-hidden="true" size={18} />
            Carrier Bids
          </a>
          <a href="#orders">
            <PackageCheck aria-hidden="true" size={18} />
            Orders
          </a>
          <a href="#settings">
            <Settings aria-hidden="true" size={18} />
            Settings
          </a>
        </nav>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <p className="eyebrow">AI coordinator workspace</p>
            <h1>Today's coordinated delivery plan</h1>
          </div>
          <div className="dashboard-actions">
            <label className="search-box">
              <Search aria-hidden="true" size={17} />
              <input placeholder="Search lane, PO, retailer, or AI note" />
            </label>
            <button type="button" className="secondary-button compact-button" onClick={handleSignOut}>
              <LogOut aria-hidden="true" size={17} />
              <span>{supabase ? "Sign out" : "Exit demo"}</span>
            </button>
          </div>
        </header>

        <div className="user-strip">
          <span>{userEmail}</span>
          {!isSupabaseConfigured ? <strong>Demo mode - add Supabase keys for protected auth.</strong> : <strong>Authenticated</strong>}
        </div>

        <section className="stat-grid" aria-label="Operations summary">
          {dashboardStats.map(({ icon: Icon, label, value }) => (
            <article className="stat-card" key={label}>
              <Icon aria-hidden="true" size={21} />
              <span>{label}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </section>

        <section id="route-console" className="dashboard-console">
          <div className="dashboard-section-heading">
            <p className="eyebrow">Route and appointment console</p>
            <h2>Live load plan from the route engine — optimize, schedule, and book.</h2>
          </div>
          <RouteConsole />
        </section>

        <section id="carrier-bids" className="dashboard-carrier-workbench">
          <div className="dashboard-section-heading">
            <p className="eyebrow">Bidding and order control</p>
            <h2>Certified carriers, communication, awarded orders, and delivery follow-through.</h2>
          </div>
          <CarrierOperations compact />
        </section>
      </section>
    </main>
  );
}
