"use client";

import { useMemo, useRef, useState } from "react";
import { CalendarClock, LoaderCircle, PackageCheck, Sparkles, TriangleAlert, Upload } from "lucide-react";
import {
  isOptimizeSuccess,
  optimizerApi,
  type BookingItem,
  type OptimizeResponse,
  type OptimizedRoute
} from "@/src/lib/optimizer";

const ROUTE_COLORS = ["#2f81f7", "#28a745", "#f59e0b", "#8b5cf6", "#14b8a6", "#ef4444", "#ec4899", "#0ea5e9"];

type LabeledRoute = { route: OptimizedRoute; group: string; color: string };

function parseDateTime(adjustedArrival: string): { date: string; time: string } {
  // "YYYY-MM-DD HH:MM TZ" -> { date, time }
  const [date, time] = adjustedArrival.split(" ");
  return { date: date ?? "", time: (time ?? "").slice(0, 5) };
}

export function RouteConsole() {
  const [pos, setPos] = useState<{ count: number; source: string } | null>(null);
  const posRef = useRef<Parameters<typeof optimizerApi.optimize>[0]>([]);
  const [result, setResult] = useState<OptimizeResponse | null>(null);
  const [status, setStatus] = useState<string>("");
  const [busy, setBusy] = useState<"" | "load" | "optimize" | "schedule" | "book">("");

  const routes = useMemo<LabeledRoute[]>(() => {
    if (!result) return [];
    const groups = [result.ms_result, result.l1_result];
    const flat: LabeledRoute[] = [];
    let i = 0;
    for (const g of groups) {
      for (const route of g.routes) {
        flat.push({ route, group: g.group, color: ROUTE_COLORS[i % ROUTE_COLORS.length] });
        i += 1;
      }
    }
    return flat;
  }, [result]);

  async function loadSample() {
    setBusy("load");
    setStatus("");
    try {
      const sample = await optimizerApi.sample();
      posRef.current = sample;
      setPos({ count: sample.length, source: "sample" });
      setResult(null);
      setStatus(`Loaded ${sample.length} sample POs.`);
    } catch (error) {
      setStatus(`Failed to load sample: ${String(error)}`);
    } finally {
      setBusy("");
    }
  }

  async function onUpload(file: File) {
    setBusy("load");
    setStatus("");
    try {
      const res = await optimizerApi.uploadExcel(file);
      if (!res.success || !res.pos) {
        setStatus(res.error ?? "Upload failed.");
        return;
      }
      posRef.current = res.pos;
      setPos({ count: res.pos.length, source: file.name });
      setResult(null);
      const warn = res.warnings?.length ? ` (${res.warnings.length} warnings)` : "";
      setStatus(`Parsed ${res.pos.length} POs from ${file.name}${warn}.`);
    } catch (error) {
      setStatus(`Upload failed: ${String(error)}`);
    } finally {
      setBusy("");
    }
  }

  async function runOptimize() {
    if (!posRef.current.length) {
      setStatus("Load POs first (sample or Excel).");
      return;
    }
    setBusy("optimize");
    setStatus("");
    try {
      const res = await optimizerApi.optimize(posRef.current);
      if (!isOptimizeSuccess(res)) {
        setStatus(`Optimize errors: ${res.errors.join(" • ")}`);
        return;
      }
      setResult(res);
      setStatus(
        `${res.summary.total_routes} routes • ${res.summary.total_pos} POs • $${res.summary.grand_total.toLocaleString()}` +
          (res.summary.total_infeasible ? ` • ${res.summary.total_infeasible} infeasible` : "")
      );
    } catch (error) {
      setStatus(`Optimize failed: ${String(error)}`);
    } finally {
      setBusy("");
    }
  }

  async function bookAll() {
    if (!result) return;
    const items: BookingItem[] = routes.flatMap((r) =>
      r.route.schedule.map((stop) => {
        const { date, time } = parseDateTime(stop.adjusted_arrival);
        return { dc_code: stop.dc_code, po: stop.po_number, date, time };
      })
    );
    if (!items.length) return;
    const ok = window.confirm(
      `This books ${items.length} REAL dock appointments in Capstone Managed Receiving. Continue?`
    );
    if (!ok) return;
    setBusy("book");
    setStatus("");
    try {
      const res = await optimizerApi.bookBatch(items);
      if (res.status !== "ok") {
        setStatus(`Booking failed: ${res.message}`);
        return;
      }
      const matched = res.results.filter((b) => b.status !== "error").length;
      setStatus(`Booking submitted: ${matched}/${res.results.length} processed.`);
    } catch (error) {
      setStatus(`Booking failed: ${String(error)}`);
    } finally {
      setBusy("");
    }
  }

  return (
    <div className="route-console">
      <div className="console-toolbar">
        <button type="button" className="secondary-button compact-button" onClick={loadSample} disabled={busy !== ""}>
          {busy === "load" ? <LoaderCircle className="spin" size={16} /> : <Sparkles size={16} />}
          Load sample
        </button>
        <label className="secondary-button compact-button upload-button">
          <Upload size={16} />
          Upload Excel
          <input
            type="file"
            accept=".xlsx,.xls"
            hidden
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void onUpload(file);
              event.target.value = "";
            }}
          />
        </label>
        <button type="button" className="primary-button compact-button" onClick={runOptimize} disabled={busy !== "" || !pos}>
          {busy === "optimize" ? <LoaderCircle className="spin" size={16} /> : <Sparkles size={16} />}
          Optimize
        </button>
        <button type="button" className="secondary-button compact-button" onClick={bookAll} disabled={busy !== "" || !result}>
          {busy === "book" ? <LoaderCircle className="spin" size={16} /> : <PackageCheck size={16} />}
          Book all
        </button>
        {pos ? <span className="console-chip">{pos.count} POs · {pos.source}</span> : null}
      </div>

      {status ? <p className="console-status">{status}</p> : null}

      {result ? (
        <>
          <div className="console-summary">
            <span>
              <strong>{result.summary.total_routes}</strong>Routes
            </span>
            <span>
              <strong>{result.summary.total_pos}</strong>POs
            </span>
            <span>
              <strong>${Math.round(result.summary.grand_total).toLocaleString()}</strong>Total cost
            </span>
            <span>
              <strong>{result.summary.total_infeasible}</strong>Infeasible
            </span>
          </div>

          <div className="console-routes">
            {routes.map(({ route, group, color }, index) => (
              <article className="console-route" key={`${group}-${index}`}>
                <header>
                  <span className="route-tag" style={{ background: color }}>
                    R{index + 1}
                  </span>
                  <div>
                    <strong>{group}</strong>
                    <span>
                      {route.total_units} units · {route.distance_km.toFixed(0)} km · ${Math.round(route.cost).toLocaleString()}
                    </span>
                  </div>
                  <span className="route-departure">
                    <CalendarClock size={14} aria-hidden="true" />
                    {route.departure}
                  </span>
                </header>
                <table className="console-table">
                  <tbody>
                    {route.schedule.map((stop) => (
                      <tr key={stop.po_number}>
                        <td className="mono">{stop.dc_code}</td>
                        <td>{stop.warehouse}</td>
                        <td className="num">{stop.quantity}</td>
                        <td className="mono">{stop.adjusted_arrival}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>
            ))}
          </div>

          {result.ms_result.infeasible.length + result.l1_result.infeasible.length > 0 ? (
            <div className="console-infeasible">
              <p>
                <TriangleAlert size={15} aria-hidden="true" /> Infeasible POs
              </p>
              <ul>
                {[...result.ms_result.infeasible, ...result.l1_result.infeasible].map((item) => (
                  <li key={item.po.po_number}>
                    <strong>{item.po.po_number}</strong> — {item.reasons.join("; ")}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </>
      ) : (
        <div className="console-empty">
          <p>Load POs and run Optimize to see the live load plan from the route engine.</p>
        </div>
      )}
    </div>
  );
}
