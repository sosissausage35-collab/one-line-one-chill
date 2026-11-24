// One Line, One Chill — entry program (make.fun, u-azazex-one-line-one-chill-6d4d5488)
// Writes a single scary sentence to /output/entry.txt.
//
// The sentence: an ultrasound finds two heartbeats, and the second one is
// beating from inside the wall behind the bed. One breath, concrete detail
// (ultrasound, heartbeat, wall, bed), no mirror, no doll, no basement —
// and it withholds the explanation, so the dread outlasts the line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "The ultrasound showed two heartbeats, and the second one was beating from inside the wall behind the bed.";

// Gate validation, matching the sealed scorer: /output/entry.txt must be
// UTF-8 text of 1 to 200 characters, not only white space. Fail loudly
// instead of writing an entry the gate would reject.
const trimmed = LINE.trim();
if (trimmed.length < 1 || trimmed.length > 200) {
  throw new Error(
    `Entry length ${trimmed.length} is outside the 1-200 character gate`,
  );
}
if (trimmed.includes("\n")) {
  throw new Error("Entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read-back verification: what is on disk must be byte-identical to the
// line we validated, so a partial or corrupted write cannot slip through.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("Read-back mismatch: /output/entry.txt differs from the entry");
}
console.log(`Wrote ${LINE.length} characters to /output/entry.txt (verified)`);
