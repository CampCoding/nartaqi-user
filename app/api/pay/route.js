// app/api/pay/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const response = await fetch(
      "https://apitest.myfatoorah.com/v2/SendPayment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer SK_KWT_vVZlnnAqu8jRByOWaRPNId4ShzEDNt256dvnjebuyzo52dXjAfRx2ixW5umjWSUx",
        },
        body: JSON.stringify({
          PaymentMethodId: 0,
          InvoiceValue: body.InvoiceValue,
          CustomerName: body.CustomerName,
          CustomerMobile: body.CustomerMobile,
          DisplayCurrencyIso: "SAR",
          MobileCountryCode: body.countryCode || "+966",
          CallBackUrl: "https://nartaqi-user.vercel.app//payment/callback",
          ErrorUrl: "https://nartaqi-user.vercel.app//payment/failed",
          Language: "AR",
          NotificationOption: "LNK",
          CustomerReference: `COURSE-${body.roundId}-${Date.now()}`,
          InvoiceItems: [
            {
              ItemName: body.productName || "دورة تدريبية",
              Quantity: 1,
              UnitPrice: body.InvoiceValue,
            },
          ],
          UserDefinedField: JSON.stringify({
            roundId: body.roundId,
            studentId: body.studentId,
            endDate: body.endDate,
          }),
        }),
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Payment Error:", error);
    return NextResponse.json(
      { IsSuccess: false, Message: error.message },
      { status: 500 }
    );
  }
}
