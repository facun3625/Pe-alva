import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await prisma.property.findUnique({ where: { id } });
  if (!property) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(property);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const data: any = {};
    const fields = ["title","description","price","city","address","lat","lng","imageUrl","images","videoUrl","type","propertyType","bedrooms","bathrooms","hasGarage","garages","coveredArea","totalArea","featured","published"];

    for (const f of fields) {
      if (!(f in body)) continue;
      const v = body[f];
      if (f === "price") data[f] = parseFloat(v) || 0;
      else if (["bedrooms","bathrooms","garages"].includes(f)) data[f] = v ? parseInt(v) : null;
      else if (["coveredArea","totalArea"].includes(f)) data[f] = v ? parseFloat(v) : null;
      else if (["lat","lng"].includes(f)) data[f] = v !== "" && v !== null && v !== undefined ? parseFloat(v) : null;
      else if (["hasGarage","featured","published"].includes(f)) data[f] = Boolean(v);
      else data[f] = v ?? null;
    }

    const property = await prisma.property.update({ where: { id }, data });
    return NextResponse.json(property);
  } catch (e: any) {
    console.error("PATCH property error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.property.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
