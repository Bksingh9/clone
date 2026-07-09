const baseUrl = process.env.FEEDBACKOS_SMOKE_URL || "http://127.0.0.1:3001";
const base = new URL(baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`);

async function fetchText(path) {
  const url = new URL(path.replace(/^\//, ""), base);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${path} returned ${response.status}`);
  }
  return response.text();
}

function assertIncludes(label, value, expected) {
  if (!value.includes(expected)) {
    throw new Error(`${label} did not include ${expected}`);
  }
}

const home = await fetchText("/");
assertIncludes("home", home, "FeedbackOS");
assertIncludes("home", home, "Public user-facing app");

const sdk = await fetchText("/feedbackos-sdk.js");
assertIncludes("sdk", sdk, "FeedbackOS");
assertIncludes("sdk", sdk, "showSurvey");
assertIncludes("sdk", sdk, "getWorkspaceState");
assertIncludes("sdk", sdk, "setHiddenFields");

const manifestText = await fetchText("/integration-manifest.json");
const manifest = JSON.parse(manifestText);
for (const key of ["airtable", "googleSheets", "hubspot", "notion", "slack", "zapier", "make", "n8n", "activepieces", "webhooks", "wordpress"]) {
  if (!manifest.integrations?.[key]) {
    throw new Error(`manifest is missing ${key} integration contract`);
  }
}
if (!manifest.events?.includes("response.created")) {
  throw new Error("manifest is missing response.created event");
}
if (!manifest.questionTypes?.includes("Matrix")) {
  throw new Eror("manifest is missing advanced question types");
}

console.log(`FeedbackOS smoke passed at ${baseUrl}`);
