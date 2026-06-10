import { toJSONAsync } from "../node_modules/@tanstack/router-core/node_modules/seroval/dist/esm/production/index.mjs";

const fnId = "c77a6e9caffe80ba335f412b8f24490525ddf20578383bed8be4c45133b88fca";
const url = `https://conciergerie.ir-immigration.com/_serverFn/${fnId}`;

const payload = {
  data: {
    firstName: "Test",
    lastName: "Diagnostic",
    email: "test@example.com",
    phone: "+1 5145551234",
    services: ["transfert", "courses", "logistique"],
    arrival: "2026-06-13",
    city: "Montreal",
    people: "1",
    notes: "test script",
  },
};

const body = JSON.stringify(await toJSONAsync(payload));
const res = await fetch(url, {
  method: "POST",
  headers: {
    "content-type": "application/json",
    accept: "application/json",
    "x-tsr-serverFn": "true",
  },
  body,
});

const text = await res.text();
console.log("HTTP", res.status);
console.log("raw", text);

const successTrue = /"k":\["success"\].*"s":2/.test(text);
const successFalse = /"k":\["success"\].*"s":3/.test(text);
const hasCode = text.includes('"code"');
const hasValidationError = text.includes("Invalid email") || text.includes("validation");

if (successTrue && !hasCode) {
  console.log("RESULT: success=true (email envoyé côté serveur)");
} else if (successFalse || hasCode) {
  console.log("RESULT: success=false (échec envoi email)");
} else if (hasValidationError) {
  console.log("RESULT: validation error (données invalides)");
} else {
  console.log("RESULT: inconnu — inspecter raw ci-dessus");
}
