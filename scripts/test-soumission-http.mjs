import { toJSONAsync } from "seroval";

const fnId =
  "eyJmaWxlIjoiL3NyYy9saWIvYXBpL3NvdW1pc3Npb24uZnVuY3Rpb25zLnRzP3Rzcy1zZXJ2ZXJmbi1zcGxpdCIsImV4cG9ydCI6InN1Ym1pdFNvdW1pc3Npb25fY3JlYXRlU2VydmVyRm5faGFuZGxlciJ9";

const url = `http://localhost:8080/_serverFn/${fnId}`;
const payload = {
  data: {
    firstName: "Test",
    lastName: "Formulaire",
    email: "test@example.com",
    phone: "+1 514 555 1234",
    services: ["transfert"],
    arrival: "2026-06-26",
    city: "Montreal",
    people: "1",
    notes: "Test HTTP via dev server",
  },
};

const serialized = JSON.stringify(await toJSONAsync(payload));
const response = await fetch(url, {
  method: "POST",
  headers: {
    "content-type": "application/json",
    accept: "application/json",
    "x-tsr-serverFn": "true",
  },
  body: serialized,
});

const text = await response.text();
console.log("status:", response.status);
console.log("body:", text);

if (response.ok && text.includes("success")) {
  console.log("EMAIL_SENT_OK");
} else {
  process.exit(1);
}
