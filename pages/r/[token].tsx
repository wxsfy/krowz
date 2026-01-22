import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../supabase";

type Result = { ok: true } | { ok: false; reason: string };

export default function RedeemPage() {
  const router = useRouter();
  const { token } = router.query;

  const [redeeming, setRedeeming] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const reasonText = (reason: string) => {
    switch (reason) {
      case "not_found":
        return "Invalid code.";
      case "expired":
        return "This QR code expired.";
      case "already_redeemed":
        return "Already redeemed.";
      case "limit_monthly_reached":
        return "Monthly limit reached for this user.";
      case "limit_merchant_monthly_reached":
        return "Monthly limit reached for this restaurant (3).";
      case "server_error":
        return "Server error. Try again.";
      default:
        return "Denied.";
    }
  };

  const redeem = async () => {
    if (!token || typeof token !== "string") return;

    try {
      setRedeeming(true);

      const { data, error } = await supabase.rpc("consume_redemption", {
        p_token: token,
      });

      if (error) {
        console.log("consume_redemption error:", error);
        setResult({ ok: false, reason: "server_error" });
      } else {
        setResult(data as Result);
      }
    } finally {
      setRedeeming(false);
    }
  };

  const tokenStr = typeof token === "string" ? token : "";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 560,
          border: "1px solid #222",
          borderRadius: 16,
          padding: 22,
          background: "#111",
        }}
      >
        <div style={{ color: "#FFD700", fontWeight: 900, fontSize: 28 }}>
          Krowz Staff Verify
        </div>

        <div style={{ marginTop: 10, color: "#bbb" }}>
        Verify customer redemption
        </div>

        {!result && (
          <div style={{ marginTop: 14, color: "#bbb" }}>
            Tap Redeem to verify and record this redemption.
          </div>
        )}

                {!result && (
        <button
            onClick={redeem}
            disabled={!tokenStr || redeeming}
            style={{
            marginTop: 18,
            width: "100%",
            padding: "14px 16px",
            borderRadius: 12,
            border: "none",
            cursor: !tokenStr || redeeming ? "not-allowed" : "pointer",
            fontWeight: 900,
            fontSize: 16,
            background: !tokenStr || redeeming ? "#333" : "#FFD700",
            color: !tokenStr || redeeming ? "#888" : "#000",
            }}
        >
            {redeeming ? "Redeeming..." : "Redeem"}
        </button>
        )}


        <div style={{ marginTop: 10, color: "#666", fontSize: 12 }}>
          Only click Redeem when the customer is present.
        </div>

        {result?.ok && (
          <>
            <div
              style={{
                marginTop: 18,
                fontSize: 34,
                fontWeight: 900,
                color: "#00ff6a",
              }}
            >
              APPROVED ✅
            </div>
            <div style={{ marginTop: 10, color: "#bbb" }}>
              Redemption recorded.
            </div>
          </>
        )}

        {result && !result.ok && (
          <>
            <div
              style={{
                marginTop: 18,
                fontSize: 34,
                fontWeight: 900,
                color: "#ff3b3b",
              }}
            >
              DENIED ❌
            </div>
            <div style={{ marginTop: 10, color: "#bbb" }}>
              {reasonText(result.reason)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
