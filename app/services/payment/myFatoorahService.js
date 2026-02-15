// services/payment/myFatoorahService.js

const MYFATOORAH_API_KEY = process.env.NEXT_PUBLIC_MYFATOORAH_API_KEY;
const MYFATOORAH_BASE_URL = process.env.NEXT_PUBLIC_MYFATOORAH_BASE_URL;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

class MyFatoorahService {
  constructor() {
    this.apiKey = MYFATOORAH_API_KEY;
    this.baseUrl = MYFATOORAH_BASE_URL;
    this.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.apiKey}`,
    };
  }

  /**
   * إنشاء فاتورة دفع
   */
  async initiatePayment(paymentData) {
    try {
      const {
        amount,
        customerName,
        customerEmail,
        customerPhone,
        description,
        orderId,
        orderType,
        metadata = {},
      } = paymentData;

      const payload = {
        PaymentMethodId: 0, // 0 = All payment methods
        InvoiceValue: amount,
        CustomerName: customerName,
        CustomerEmail: customerEmail || "noreply@example.com",
        CustomerMobile: customerPhone,
        DisplayCurrencyIso: "KWD", // Kuwaiti Dinar for test
        MobileCountryCode: "+965",
        CallBackUrl: `${APP_URL}/payment/callback`,
        ErrorUrl: `${APP_URL}/payment/failed`,
        Language: "AR",
        CustomerReference: orderId,
        InvoiceItems: [
          {
            ItemName: description || "Payment",
            Quantity: 1,
            UnitPrice: amount,
          },
        ],
        UserDefinedField: JSON.stringify({
          orderId,
          orderType,
          ...metadata,
        }),
      };

      const response = await fetch(`${this.baseUrl}/v2/SendPayment`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!data.IsSuccess) {
        throw new Error(data.Message || "فشل في إنشاء الفاتورة");
      }

      return {
        success: true,
        invoiceId: data.Data.InvoiceId,
        invoiceURL: data.Data.InvoiceURL,
        customerReference: orderId,
      };
    } catch (error) {
      console.error("MyFatoorah initiatePayment error:", error);
      return {
        success: false,
        error: error.message || "حدث خطأ أثناء إنشاء الفاتورة",
      };
    }
  }

  /**
   * التحقق من حالة الدفع
   */
  async getPaymentStatus(paymentId, keyType = "PaymentId") {
    try {
      const payload = {
        Key: paymentId,
        KeyType: keyType,
      };

      const response = await fetch(`${this.baseUrl}/v2/GetPaymentStatus`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!data.IsSuccess) {
        throw new Error(data.Message || "فشل في جلب حالة الدفع");
      }

      const paymentData = data.Data;
      const invoiceStatus = paymentData.InvoiceStatus;

      let metadata = {};
      try {
        metadata = JSON.parse(paymentData.UserDefinedField || "{}");
      } catch (e) {
        console.warn("Failed to parse UserDefinedField");
      }

      return {
        success: true,
        isPaid: invoiceStatus === "Paid",
        status: invoiceStatus,
        invoiceId: paymentData.InvoiceId,
        invoiceReference: paymentData.InvoiceReference,
        customerReference: paymentData.CustomerReference,
        amount: paymentData.InvoiceValue,
        paidAmount: paymentData.InvoiceTransactions?.[0]?.TransactionValue || 0,
        paymentMethod:
          paymentData.InvoiceTransactions?.[0]?.PaymentGateway || "",
        transactionId:
          paymentData.InvoiceTransactions?.[0]?.TransactionId || "",
        metadata,
        rawData: paymentData,
      };
    } catch (error) {
      console.error("MyFatoorah getPaymentStatus error:", error);
      return {
        success: false,
        error: error.message || "حدث خطأ أثناء التحقق من حالة الدفع",
      };
    }
  }
}

const myFatoorahService = new MyFatoorahService();
export default myFatoorahService;
export { MyFatoorahService };
