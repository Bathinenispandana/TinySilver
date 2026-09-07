import { NextRequest, NextResponse } from "next/server";

const ALLOWED_STATES = ["Telangana", "Andhra Pradesh"];

interface PostOffice {
  Name: string;
  District: string;
  State: string;
  Block?: string;
  Region?: string;
  Division?: string;
  BranchType?: string;
  DeliveryStatus?: string;
}

interface PincodeApiResponse {
  Message: string;
  Status: "Success" | "Error";
  PostOffice: PostOffice[] | null;
}

const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const cache = new Map<string, { data: any; expiresAt: number }>();

function getCached(pincode: string) {
  const entry = cache.get(pincode);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(pincode);
    return null;
  }
  return entry.data;
}

function setCached(pincode: string, data: any) {
  cache.set(pincode, { data, expiresAt: Date.now() + CACHE_TTL_MS });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ pincode: string }> }
) {
  try {
    const { pincode } = await params;

    if (!/^\d{6}$/.test(pincode)) {
      return NextResponse.json(
        {
          success: false,
          deliverable: false,
          message: "Please enter a valid 6-digit pincode.",
        },
        { status: 400 }
      );
    }

    const cached = getCached(pincode);
    if (cached) {
      return NextResponse.json(cached, { status: 200 });
    }

    const response = await fetch(
      `https://api.postalpincode.in/pincode/${pincode}`,
      {
        cache: "no-store",
        headers: { Accept: "application/json" },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          deliverable: false,
          message: "Unable to fetch pincode details. Please try again.",
        },
        { status: 502 }
      );
    }

    const data: PincodeApiResponse[] = await response.json();

    if (
      !data ||
      !data[0] ||
      data[0].Status !== "Success" ||
      !data[0].PostOffice ||
      data[0].PostOffice.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          deliverable: false,
          message: "We could not find a location for this pincode.",
        },
        { status: 404 }
      );
    }

    const offices = data[0].PostOffice;

    // Use the first office just to resolve state/district for the deliverability check —
    // state/district are consistent across all offices sharing a pincode in practice.
    const state = offices[0].State?.trim() || "";
    const district = offices[0].District?.trim() || "";

    if (!state) {
      return NextResponse.json(
        {
          success: false,
          deliverable: false,
          message: "We could not determine the state for this pincode.",
        },
        { status: 404 }
      );
    }

    const isDeliverable = ALLOWED_STATES.some(
      (allowedState) => allowedState.toLowerCase() === state.toLowerCase()
    );

    // De-duplicate locality names (Name field) in case of repeats, keep order.
    const localities = Array.from(
      new Map(
        offices.map((o) => [
          o.Name,
          {
            name: o.Name,
            block: o.Block && o.Block !== "NA" ? o.Block : null,
            branchType: o.BranchType || null,
          },
        ])
      ).values()
    );

    const result = {
      success: true,
      deliverable: isDeliverable,
      location: {
        pincode,
        state,
        district,
      },
      localities, // full list — client lets the user pick the exact area
      message: isDeliverable
        ? `Delivery available in ${district}, ${state}. Select your exact area below.`
        : `Sorry, we currently deliver only in Telangana and Andhra Pradesh. Your pincode belongs to ${state}.`,
    };

    setCached(pincode, result);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Pincode lookup error:", error);

    return NextResponse.json(
      {
        success: false,
        deliverable: false,
        message: "Unable to check this pincode. Please try again.",
      },
      { status: 500 }
    );
  }
}