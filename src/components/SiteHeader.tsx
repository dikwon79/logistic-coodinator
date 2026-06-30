import Link from "next/link";
import { LogIn, Navigation } from "lucide-react";

type SiteHeaderProps = {
  compact?: boolean;
};

export function SiteHeader({ compact = false }: SiteHeaderProps) {
  return (
    <header className={compact ? "site-header site-header-compact" : "site-header"}>
      <Link href="/" className="brand-mark" aria-label="AI Logistic Coordinator home">
        <span className="brand-icon">
          <Navigation aria-hidden="true" size={19} strokeWidth={2.3} />
        </span>
        <span>
          <strong>AI Logistic</strong>
          <small>Coordinator</small>
        </span>
      </Link>
      <nav className="top-nav" aria-label="Primary navigation">
        <a href="/#platform">Platform</a>
        <a href="/#booking">Booking</a>
        <Link href="/dashboard">Dashboard</Link>
      </nav>
      <Link href="/login" className="nav-login">
        <LogIn aria-hidden="true" size={18} />
        <span>Login</span>
      </Link>
    </header>
  );
}
