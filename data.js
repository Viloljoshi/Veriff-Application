window.IDV_CASE = {
  DATA_CLASSIFICATION: {
    publicFacts:
      "Facts published by Veriff on official public webpages, with source links and a checked date.",
    syntheticCaseData:
      "Illustrative values created solely to demonstrate a diagnostic and product-decision approach. They are not Veriff data.",
    candidateReportedMetrics:
      "Prior project outcomes reported by Vilol Joshi. They are unrelated to Veriff.",
  },
  incident: {
    customer: "Enterprise Mobility Customer",
    dataClass: "syntheticCaseData",
    changesVsCustomerBaseline: {
      genuineFirstPassPercentagePoints: -6.1,
      falseRejectionPercentagePoints: 4.3,
      resubmissionPercentagePoints: 5.8,
      hitlReferralPercentagePoints: 4.9,
      p95LatencySeconds: 21,
      fraudRecallPercentagePoints: -0.2,
    },
  },
  cohortPath: [
    {
      label: "Global",
      value: "All traffic",
      title: "All verification traffic",
      copy: "Global averages are useful for monitoring, but too broad for this incident.",
    },
    {
      label: "Customer",
      value: "Enterprise mobility",
      title: "Enterprise Mobility Customer",
      copy: "The regression appears in one customer’s traffic while other customers remain stable.",
    },
    {
      label: "Country",
      value: "Brazil",
      title: "Brazil",
      copy: "Country-level comparison concentrates the drop in Brazilian document traffic.",
    },
    {
      label: "Document",
      value: "Driver Licence",
      title: "Driver Licence",
      copy: "Passports and national IDs remain near baseline. Driver licences account for most of the change.",
    },
    {
      label: "Variant",
      value: "Variant X",
      title: "Variant X",
      copy: "The decline is concentrated in a specific illustrative licence variant, not the document class as a whole.",
    },
    {
      label: "Platform",
      value: "Android Web",
      title: "Android Web",
      copy: "Android Web separates from native and desktop capture paths, narrowing the capture and model hypotheses.",
    },
    {
      label: "Failure reason",
      value: "Low class confidence",
      title: "Classification confidence shifted",
      copy: "87% of the observed deterioration now sits inside one synthetic cohort: Brazil → Driver Licence → Variant X → Android Web.",
      shareOfRegression: 0.87,
    },
  ],
  candidateMetrics: [
    { value: "5M+", label: "users on a digital banking platform" },
    { value: "50K+", label: "KYC / AML documents processed monthly" },
    { value: "70%", label: "reported reduction in manual document operations" },
    { value: "+18%", label: "reported conversion uplift in a digital banking journey" },
  ],
};
