# IDV Reliability Lab

An independent product case created for the Senior Product Manager — Document Verification opportunity at Veriff.

The case explores a common ML product challenge: aggregate model health can conceal a customer-specific domain gap.

The exercise demonstrates:

- cohort diagnosis;
- ML/product trade-offs;
- precision and recall reasoning;
- threshold decisioning;
- human-in-the-loop containment;
- annotation and evaluation loops;
- release guardrails;
- enterprise communication; and
- roadmap prioritization.

## Data

No Veriff internal data is used.

- **Veriff/company facts:** sourced from official public materials and linked in context.
- **Incident metrics:** synthetic demonstration data created only to show the product reasoning.
- **Candidate outcomes:** reported prior project outcomes supplied by Vilol Joshi.

The central definitions live in [`data.js`](data.js), and public claims with source metadata live in [`sources.js`](sources.js).

## Run locally

No dependencies or build step are required.

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy

The GitHub Actions workflow in `.github/workflows/pages.yml` deploys the repository root to GitHub Pages whenever `main` is updated.

Expected URL:

`https://viloljoshi.github.io/Veriff-Application/`

## Scope

This is a product case, not a production IDV system. It has no backend, authentication, customer data, or model integration.

Veriff is not affiliated with or responsible for this independent application exercise.
