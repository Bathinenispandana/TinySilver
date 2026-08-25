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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ pincode: string }> }
) {
  try {
    const { pincode } = await params;

    // Validate format
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

    // Fetch pincode details
    const response = await fetch(
      `https://api.postalpincode.in/pincode/${pincode}`,
      {
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
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

    // Check whether the pincode exists
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

    const postOffice = data[0].PostOffice[0];

    const state = postOffice.State?.trim();
    const district = postOffice.District?.trim();

    // Prefer Block, then District, then Post Office name
    const city =
      postOffice.Block?.trim() ||
      district ||
      postOffice.Name?.trim() ||
      "";

    // Check delivery availability
    const isDeliverable = ALLOWED_STATES.some(
      (allowedState) =>
        allowedState.toLowerCase() === state.toLowerCase()
    );

    return NextResponse.json(
      {
        success: true,
        deliverable: isDeliverable,

        location: {
          pincode,
          state,
          district,
          city,
          postOffice: postOffice.Name,
        },

        message: isDeliverable
          ? `Delivery available in ${city}, ${district}, ${state}.`
          : `Sorry, we currently deliver only in Telangana and Andhra Pradesh. Your pincode belongs to ${state}.`,
      },
      { status: 200 }
    );
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