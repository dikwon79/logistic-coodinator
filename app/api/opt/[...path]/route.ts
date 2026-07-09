import { NextResponse, type NextRequest } from "next/server";

// Server-side proxy to the Python (Flask) route-optimizer service.
// The browser calls same-origin /api/opt/* ; we forward to OPTIMIZER_API_URL/api/*.
// This hides the optimizer's real address, avoids CORS, and lets us point at a
// local server in dev and a tunnel/VPS in production via one env var.
const BASE = process.env.OPTIMIZER_API_URL;

export const dynamic = "force-dynamic";

async function forward(request: NextRequest, path: string[]) {
  if (!BASE) {
    return NextResponse.json(
      { error: "OPTIMIZER_API_URL is not configured on the server." },
      { status: 503 }
    );
  }

  const target = `${BASE.replace(/\/+$/, "")}/api/${path.join("/")}${request.nextUrl.search}`;
  const isBodyless = request.method === "GET" || request.method === "HEAD";

  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  if (contentType) {
    headers.set("content-type", contentType);
  }

  try {
    const upstream = await fetch(target, {
      method: request.method,
      headers,
      body: isBodyless ? undefined : await request.arrayBuffer(),
      cache: "no-store",
      // @ts-expect-error - Node fetch option, required to stream request bodies
      duplex: "half"
    });

    const buffer = await upstream.arrayBuffer();
    return new NextResponse(buffer, {
      status: upstream.status,
      headers: {
        "content-type": upstream.headers.get("content-type") ?? "application/json"
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to reach optimizer service", detail: String(error) },
      { status: 502 }
    );
  }
}

type RouteContext = { params: Promise<{ path: string[] }> };

export async function GET(request: NextRequest, ctx: RouteContext) {
  return forward(request, (await ctx.params).path);
}

export async function POST(request: NextRequest, ctx: RouteContext) {
  return forward(request, (await ctx.params).path);
}

export async function PUT(request: NextRequest, ctx: RouteContext) {
  return forward(request, (await ctx.params).path);
}

export async function DELETE(request: NextRequest, ctx: RouteContext) {
  return forward(request, (await ctx.params).path);
}
