import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const API_ENDPOINT = 'https://eu-discoveryengine.googleapis.com/v1alpha/projects/272199228079/locations/eu/collections/default_collection/engines/buscador-tramites/servingConfigs/default_search:search';
const ANSWER_ENDPOINT = 'https://eu-discoveryengine.googleapis.com/v1alpha/projects/272199228079/locations/eu/collections/default_collection/engines/buscador-tramites/servingConfigs/default_search:answer';

interface GCPServiceAccount {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
}

// Cache access token with expiration
let cachedToken: string | null = null;
let tokenExpiration: number = 0;

async function getAccessToken(): Promise<string> {
  // Return cached token if still valid
  const now = Date.now();
  if (cachedToken && now < tokenExpiration) {
    return cachedToken;
  }

  const serviceAccountJson = Deno.env.get('GCP_SERVICE_ACCOUNT_JSON');
  if (!serviceAccountJson) {
    throw new Error('GCP_SERVICE_ACCOUNT_JSON environment variable not set');
  }

  const serviceAccount: GCPServiceAccount = JSON.parse(serviceAccountJson);

  // Create JWT for Google OAuth
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };

  const now_seconds = Math.floor(now / 1000);
  const claim = {
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/cloud-platform',
    aud: serviceAccount.token_uri,
    exp: now_seconds + 3600,
    iat: now_seconds,
  };

  // Import private key
  const privateKey = serviceAccount.private_key.replace(/\\n/g, '\n');
  const keyData = privateKey.match(/-----BEGIN PRIVATE KEY-----(.+)-----END PRIVATE KEY-----/s);
  if (!keyData) {
    throw new Error('Invalid private key format');
  }

  const binaryKey = Uint8Array.from(atob(keyData[1].replace(/\s/g, '')), c => c.charCodeAt(0));
  
  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    binaryKey,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256',
    },
    false,
    ['sign']
  );

  // Create JWT
  const encoder = new TextEncoder();
  const headerB64 = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const claimB64 = btoa(JSON.stringify(claim)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const signatureInput = `${headerB64}.${claimB64}`;
  
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    encoder.encode(signatureInput)
  );

  const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const jwt = `${signatureInput}.${signatureB64}`;

  // Exchange JWT for access token
  const tokenResponse = await fetch(serviceAccount.token_uri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!tokenResponse.ok) {
    const error = await tokenResponse.text();
    throw new Error(`Failed to get access token: ${error}`);
  }

  const tokenData = await tokenResponse.json();
  cachedToken = tokenData.access_token;
  // Set expiration to 5 minutes before actual expiration for safety
  tokenExpiration = now + (tokenData.expires_in - 300) * 1000;

  return cachedToken;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { action, query, language, queryId, session } = await req.json();
    const accessToken = await getAccessToken();

    if (action === 'search') {
      const requestBody = {
        query,
        pageSize: 10,
        session: "projects/272199228079/locations/eu/collections/default_collection/engines/buscador-tramites/sessions/-",
        spellCorrectionSpec: {
          mode: 'AUTO'
        },
        languageCode: 'en-US',
        userInfo: {
          timeZone: 'Europe/Madrid'
        },
        contentSearchSpec: {
          snippetSpec: {
            returnSnippet: true
          }
        }
      };

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Search failed: ${response.status} - ${error}`);
      }

      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });
    } else if (action === 'answer') {
      const getLanguagePrompt = (lang: string) => {
        switch (lang) {
          case 'eu':
            return "Erantzuna euskeraz eman eta laburpen zehatz eta informatibo bat sortu";
          case 'en':
            return "Provide a clear and informative summary";
          case 'es':
          default:
            return "Proporciona un resumen claro e informativo";
        }
      };

      const getLanguageCode = (lang: string) => {
        switch (lang) {
          case 'eu':
            return 'eu';
          case 'en':
            return 'en';
          case 'es':
          default:
            return 'es';
        }
      };

      const answerRequest = {
        query: {
          text: query,
          queryId: queryId
        },
        session: session,
        relatedQuestionsSpec: {
          enable: true
        },
        answerGenerationSpec: {
          ignoreAdversarialQuery: false,
          ignoreNonAnswerSeekingQuery: false,
          ignoreLowRelevantContent: false,
          multimodalSpec: {},
          includeCitations: true,
          promptSpec: {
            preamble: getLanguagePrompt(language)
          },
          answerLanguageCode: getLanguageCode(language),
          modelSpec: {
            modelVersion: "stable"
          }
        }
      };

      const response = await fetch(ANSWER_ENDPOINT, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answerRequest)
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Answer API failed: ${response.status} - ${error}`);
      }

      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });
    } else {
      throw new Error('Invalid action');
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
