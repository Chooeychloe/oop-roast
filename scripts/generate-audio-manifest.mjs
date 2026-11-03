import { mkdir, writeFile } from "node:fs/promises";
import { ROASTS, ENDINGS } from "../src/data.js";

const rows = [["id", "filename", "display_text", "elevenlabs_text"]];
const pad = (n) => String(n).padStart(2, "0");
const csv = (value) => `"${String(value).replaceAll('"', '""')}"`;

function add(id, displayText, elevenLabsText = displayText) {
  rows.push([id, `${id}.mp3`, displayText, elevenLabsText]);
}

for (const [category, messages] of Object.entries(ROASTS.savage)) {
  const categoryId = category.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
  messages.forEach((text, index) => {
    add(`savage-${categoryId}-${pad(index + 1)}`, text);
  });
}

ROASTS.streakGood.forEach((text, index) => {
  add(`streak-good-${pad(index + 1)}`, text);
});

for (const [score, messages] of ENDINGS) {
  messages.forEach((text, index) => add(`ending-${score}-${pad(index + 1)}`, text));
}

add("welcome", "O siya, ready ka na bang araruhin ng OOP?");
add("round-start", "Sige, simulan natin. Tingnan natin kung may natira sa utak mo pagkatapos ng lecture.");
add("setup-return", "Back to the lobby, rookie.");

await mkdir("public/audio", { recursive: true });
const content = `${rows.map((row) => row.map(csv).join(",")).join("\n")}\n`;
await writeFile("public/audio/manifest.csv", content, "utf8");
console.log(`Wrote ${rows.length - 1} audio entries to public/audio/manifest.csv`);
