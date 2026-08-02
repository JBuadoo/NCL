export default function BenefitsFormLink() {
  return (
    <div
      className="field onboarding-callout"
      style={{ marginTop: 8, borderColor: "var(--gold)" }}
    >
      <p style={{ marginBottom: 10 }}>
        Not approved for benefits yet? We can help you get started at no upfront cost.
      </p>
      <a
        href="/benefits"
        className="btn btn-primary"
        style={{ justifyContent: "center", width: "100%" }}
      >
        Start the Benefits Screening →
      </a>
    </div>
  );
}
