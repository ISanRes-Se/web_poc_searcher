# GCP Service Account Setup

## Steps:

1. **Get your GCP Service Account JSON key file**
   - You should already have this file that you've been using locally

2. **Add the secret to Supabase**

   Run this command in your terminal (replace the path with your actual JSON key file path):

   ```bash
   supabase secrets set GCP_SERVICE_ACCOUNT_JSON="$(cat path/to/your-service-account-key.json)"
   ```
