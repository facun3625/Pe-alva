import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const ids = searchParams.get("ids");
        const where = ids ? { id: { in: ids.split(",") } } : {};
        const properties = await prisma.property.findMany({
            where,
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(properties);
    } catch (error) {
        console.error("GET Properties Error:", error);
        return NextResponse.json({ error: "Error fetching properties" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        let {
            title,
            description,
            price,
            city,
            address,
            lat,
            lng,
            imageUrl,
            images,
            videoUrl,
            type,
            propertyType,
            bedrooms,
            bathrooms,
            hasGarage,
            garages,
            coveredArea,
            totalArea,
            featured,
        } = body;

        // Server-side geocoding fallback
        if (!lat || !lng) {
            try {
                const query = encodeURIComponent(`${address}, ${city}, Santa Fe, Argentina`);
                const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`, {
                    headers: { 'User-Agent': 'PenalvaInmobiliaria/1.0' }
                });
                const geoData = await geoRes.json();
                if (geoData && geoData.length > 0) {
                    lat = geoData[0].lat;
                    lng = geoData[0].lon;
                }
            } catch (error) {
                console.error("Server-side geocoding error:", error);
            }
        }

        const property = await prisma.property.create({
            data: {
                title,
                description,
                price: parseFloat(price),
                city,
                address,
                lat: lat ? parseFloat(lat) : null,
                lng: lng ? parseFloat(lng) : null,
                imageUrl: imageUrl || null,
                images: images || null,
                videoUrl: videoUrl || null,
                type,
                propertyType,
                bedrooms: bedrooms ? parseInt(bedrooms) : null,
                bathrooms: bathrooms ? parseInt(bathrooms) : null,
                hasGarage: hasGarage ?? false,
                garages: garages ? parseInt(garages) : null,
                coveredArea: coveredArea ? parseFloat(coveredArea) : null,
                totalArea: totalArea ? parseFloat(totalArea) : null,
                featured: featured ?? false,
            },
        });

        return NextResponse.json(property);
    } catch (error) {
        console.error("POST Property Error:", error);
        return NextResponse.json({ error: "Error creating property" }, { status: 500 });
    }
}
