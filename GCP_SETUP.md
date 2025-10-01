# GCP Service Account Setup

To complete the production setup, you need to configure your GCP service account credentials as a secret in Supabase.

## Steps:

1. **Get your GCP Service Account JSON key file**
   - You should already have this file that you've been using locally

2. **Add the secret to Supabase**

   Run this command in your terminal (replace the path with your actual JSON key file path):

   ```bash
   supabase secrets set GCP_SERVICE_ACCOUNT_JSON="$(cat path/to/your-service-account-key.json)"
   ```

   This will securely store your service account credentials in Supabase, making them available to the Edge Function.

## What Changed:

- **Before**: You had to manually run `gcloud auth print-access-token` and copy the token to `.env.local`
- **After**: The Edge Function automatically authenticates with GCP using the service account and manages token refresh

## How it Works:

1. Your frontend calls the Supabase Edge Function at `/functions/v1/gcp-search`
2. The Edge Function authenticates with GCP using the service account stored in secrets
3. It caches the access token for performance (tokens are valid for 1 hour)
4. The Edge Function proxies requests to GCP Discovery Engine on your behalf
5. Results are returned to your frontend

This is production-ready and secure - no credentials are exposed in the browser!
