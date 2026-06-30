import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, LockKeyhole, MapPinned } from "lucide-react";
import { AuthForm } from "@/src/components/AuthForm";
import { SiteHeader } from "@/src/components/SiteHeader";

export default function LoginPage() {
  return (
    <main className="login-page">
      <SiteHeader compact />
      <section className="login-shell">
        <div className="login-visual">
          <Image
            src="/images/logistics-optimizer-hero.png"
            alt="Distribution dock and freight route technology"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 45vw"
          />
          <div className="login-visual-overlay" />
          <div className="login-visual-copy">
            <p className="hero-kicker">
              <MapPinned aria-hidden="true" size={18} />
              Secure coordinator access
            </p>
            <h1>Move from booking request to AI-coordinated dispatch.</h1>
          </div>
        </div>
        <div className="login-panel">
          <Link href="/" className="back-link">
            <ArrowLeft aria-hidden="true" size={17} />
            Home
          </Link>
          <div className="login-heading">
            <span className="login-icon">
              <LockKeyhole aria-hidden="true" size={22} />
            </span>
            <div>
              <p className="eyebrow">Account access</p>
              <h2>Login or create a coordinator account.</h2>
            </div>
          </div>
          <AuthForm />
        </div>
      </section>
    </main>
  );
}
