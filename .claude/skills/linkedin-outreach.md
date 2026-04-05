---
name: linkedin-outreach
description: Daily LinkedIn outreach — find founders/CTOs, send connection requests with product note, message accepted connections, log everything to Google Sheet
user_invocable: true
---

# LinkedIn Outreach Agent

Daily LinkedIn outreach workflow using the `dev-browser` skill. Three modes:
1. **Send connections** — find founders, send connection requests with a note about Shortlisted.ai
2. **Check & message** — check who accepted, send them the full pitch DM
3. **Stats** — show current outreach numbers

## Quick Reference

```
/linkedin-outreach              → asks what to do
"send 20 connections to founders" → mode 1
"check acceptances and message"   → mode 2
"show outreach stats"             → mode 3
```

## Product Details

- **Product**: Shortlisted.ai — AI recruiting for startups (50-200 employees)
- **Demo**: shortlistedai.vercel.app
- **Calendly**: calendly.com/jhasaurav215/30min
- **Value prop**: Drop a role, get 5-8 interview-ready candidates in 10 days. AI sources, screens (including live voice interviews), and delivers pre-vetted candidates.

## Connection Note (~280 chars max, LinkedIn limit is 300)

```
Hi {first_name}, I'm building Shortlisted.ai — we help startups hire without the $15k recruiter fee. AI sources, screens, and delivers interview-ready candidates in 10 days. Would love to connect!
```

## Pitch DM (for accepted connections)

```
Hey {first_name}! Thanks for connecting 🙏

Saw you're building {company} — really cool.

We built Shortlisted.ai to help founders like you hire without the recruiter markup. You drop a role, our AI sources, screens (including live voice interviews), and delivers 5-8 interview-ready candidates in 10 days.

Quick demo: shortlistedai.vercel.app

If hiring is on your radar, happy to chat: calendly.com/jhasaurav215/30min

No pressure — just thought it might be useful!
```

## Safety Limits

- **Daily limit**: 25 connections/day
- **Weekly limit**: 100 connections/week (rolling 7 days)
- STOP immediately if you see any CAPTCHA, security challenge, or "invitation limit" warning
- Never connect with anyone in India
- Never connect with engineers, developers, designers, analysts, interns, recruiters, consultants, sales, or marketing roles
- Only connect with leadership: founder, CEO, CTO, COO, VP, director, head of, chief, president

## Central Google Sheet

**Sheet URL**: https://docs.google.com/spreadsheets/d/1lYLDNFnf-5kAv1ahMV8lf1jNkAOgxck3ug9jAZ02myM/edit
**Tab**: Saurav
**Columns**: Name, Title, Company, Location, Profile URL, Connection Sent, Accepted, Message Sent, Note, Status

## Browser Setup

### For LinkedIn — Use Extension Mode (user's real Chrome)

The dev-browser extension connects to the user's real Chrome browser where they're already logged into LinkedIn and Google. This avoids multiple logins.

**Start the relay server:**
```bash
export PATH="/Users/sauravjha/.nvm/versions/node/v20.19.5/bin:$PATH"
cd /Users/sauravjha/.claude/plugins/cache/dev-browser-marketplace/dev-browser/66682fb0513a/skills/dev-browser
npx tsx scripts/start-relay.ts &
```
Wait for "Waiting for extension to connect..." then ask user to toggle the dev-browser extension ON in Chrome.

Verify connection:
```bash
curl -s http://127.0.0.1:9222/
# Should show: {"extensionConnected":true}
```

### Script Template

All scripts must:
- Use Node 20: `export PATH="/Users/sauravjha/.nvm/versions/node/v20.19.5/bin:$PATH"`
- Run from dev-browser dir: `cd /Users/sauravjha/.claude/plugins/cache/dev-browser-marketplace/dev-browser/66682fb0513a/skills/dev-browser`
- Use `npx tsx <<'EOF' ... EOF`

## CRITICAL: How Clicking Works in Extension Mode

**Regular Playwright `.click()` DOES NOT WORK in extension mode.** LinkedIn has a `<div id="interop-outlet">` overlay that intercepts all pointer events. You MUST use coordinate-based clicks:

```typescript
async function clickByRef(client, page, refId) {
  const el = await client.selectSnapshotRef("linkedin", refId);
  const box = await el.boundingBox();
  if (!box) return false;
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  return true;
}
```

**Also:** `el.evaluate(node => node.click())` and `el.click()` both fail. Only `page.mouse.click(x, y)` works.

## CRITICAL: ARIA Snapshot Refs Go Stale

After ANY interaction that changes the DOM (clicking a button, opening a modal, closing a modal, navigating), ALL refs from the previous snapshot are INVALID. You MUST get a **fresh snapshot** before every interaction:

```typescript
// ✅ CORRECT — fresh snapshot each time
let snap = await client.getAISnapshot("linkedin");
const connectRef = findInSnap(snap, 'Invite');
await clickByRef(client, page, connectRef);
await page.waitForTimeout(2500);

snap = await client.getAISnapshot("linkedin");  // FRESH!
const addNoteRef = findInSnap(snap, 'Add a note');
await clickByRef(client, page, addNoteRef);

// ❌ WRONG — reusing old snap after click
const snap = await client.getAISnapshot("linkedin");
await clickByRef(client, page, ref1);
// snap is now STALE — refs are invalid
await clickByRef(client, page, ref2);  // WILL FAIL: "Ref not found"
```

## Mode 1: Send Connections — Exact Working Flow

### Step 1: Navigate to Search

```typescript
const GEO = "%5B%22103644278%22%2C%22101165590%22%2C%22101174742%22%2C%22101452733%22%2C%22102454443%22%5D";
await page.goto(`https://www.linkedin.com/search/results/people/?keywords=Founder&origin=FACETED_SEARCH&geoUrn=${GEO}&page=1`);
await waitForPageLoad(page);
await page.waitForTimeout(3000);

// Scroll to load all cards
for (let i = 0; i < 5; i++) {
  await page.evaluate(() => window.scrollBy(0, Math.random() * 500 + 300));
  await page.waitForTimeout(500);
}
```

### Step 2: Read Search Results via ARIA Snapshot

```typescript
const snap = await client.getAISnapshot("linkedin");
```

Each profile card in the snapshot looks like:
```yaml
- link "Invite {Name} to connect" [ref=e180]:
    - generic [ref=e181]:
      - img [ref=e182]
      - generic [ref=e185]: Connect
```

The name, title, and location are in nearby paragraph elements:
```yaml
- paragraph [ref=e172]: Co-founder & CEO at PrimeVault    # title
- paragraph [ref=e174]: United States                      # location
```

Profiles with only a Follow button (no Connect) show:
```yaml
- button "Follow {Name}" [ref=e276]:
```

### Step 3: Filter

Read the snapshot visually. Skip if:
- Location mentions India/Indian cities
- Title is non-leadership (engineer, developer, etc.)
- Only has Follow button (no Connect available)

### Step 4: Send Connection WITH Note — The Exact Working Sequence

For each eligible profile, execute these steps in order. Get a **fresh snapshot before EVERY click**.

```typescript
// 1. Click Connect button (coordinate click)
let snap = await client.getAISnapshot("linkedin");
const connectLine = snap.split('\n').find(l => 
  l.includes(`Invite ${firstName}`) && l.includes('to connect') && l.includes('[ref=')
);
const connectRef = connectLine.match(/\[ref=(\w+)\]/)[1];

// Scroll into view if needed
const el = await client.selectSnapshotRef("linkedin", connectRef);
const box = await el.boundingBox();
if (box.y > 700) {
  await page.evaluate((y) => window.scrollTo(0, y - 300), box.y);
  await page.waitForTimeout(500);
}
await clickByRef(client, page, connectRef);
await page.waitForTimeout(2500);

// 2. Modal appears: "Add a note to your invitation?"
//    Find "Add a note" button (NOT "Send without a note")
snap = await client.getAISnapshot("linkedin");
const addNoteLine = snap.split('\n').find(l => 
  /button.*"Add a note"/i.test(l) && l.includes('[ref=')
);
const addNoteRef = addNoteLine.match(/\[ref=(\w+)\]/)[1];
await clickByRef(client, page, addNoteRef);
await page.waitForTimeout(1500);

// 3. Textarea appears with 300 char limit
//    Find it by looking for textbox with "300" in the label
snap = await client.getAISnapshot("linkedin");
const taLine = snap.split('\n').find(l => l.includes('textbox') && l.includes('300'));
const taRef = taLine.match(/\[ref=(\w+)\]/)[1];
await clickByRef(client, page, taRef);
await page.waitForTimeout(300);

// 4. Type the personalized note
const note = `Hi ${firstName}, I'm building Shortlisted.ai — we help startups hire without the $15k recruiter fee. AI sources, screens, and delivers interview-ready candidates in 10 days. Would love to connect!`;
await page.keyboard.type(note, { delay: 10 });
await page.waitForTimeout(500);

// 5. Click "Send invitation" button (now enabled after typing)
snap = await client.getAISnapshot("linkedin");
const sendLine = snap.split('\n').find(l => 
  l.includes('Send invitation') && l.includes('[ref=') && !l.includes('disabled')
);
const sendRef = sendLine.match(/\[ref=(\w+)\]/)[1];
await clickByRef(client, page, sendRef);
await page.waitForTimeout(2000);

// 6. Wait 10-20 seconds before next connection
await page.waitForTimeout(10000 + Math.random() * 10000);
```

### Step 5: Handle Failures

If any step fails (ref not found, no modal, button disabled):
```typescript
await page.keyboard.press('Escape');  // Close any open modal
await page.waitForTimeout(500);
// Continue to next profile
```

### Step 6: Paginate

When no more Connect buttons on current page:
```typescript
await page.goto(`...&page=${nextPageNum}`);
```

Or find and click the Next button:
```typescript
snap = await client.getAISnapshot("linkedin");
const nextLine = snap.split('\n').find(l => l.includes('Next') && l.includes('[ref='));
```

## Mode 2: Check Acceptances & Message

### Step 1: Visit Each Pending Profile

```typescript
await page.goto(profileUrl);
await waitForPageLoad(page);
await page.waitForTimeout(3000);

const snap = await client.getAISnapshot("linkedin");
const lines = snap.split('\n');

const hasPending = lines.some(l => l.includes('Pending') && l.includes('withdraw'));
const hasMessage = lines.some(l => /button.*"Message"/.test(l));
```

- `hasPending` = not yet accepted
- `hasMessage` && !`hasPending` = accepted → send pitch DM

### Step 2: Send Pitch DM

```typescript
// Click Message button
const msgLine = snap.split('\n').find(l => /button.*"Message"/.test(l));
await clickByRef(client, page, msgRef);
await page.waitForTimeout(2000);

// Type message in the message composer
await page.keyboard.type(pitchMessage, { delay: 15 });
await page.waitForTimeout(500);

// Send (Ctrl+Enter or find Send button)
await page.keyboard.press('Enter');
```

## How to Edit the Google Sheet

Use the same extension mode browser (user's real Chrome, already signed into Google).

```typescript
const page = await client.page("gsheet", { viewport: { width: 1400, height: 900 } });
await page.goto("https://docs.google.com/spreadsheets/d/1lYLDNFnf-5kAv1ahMV8lf1jNkAOgxck3ug9jAZ02myM/edit#gid=0");
```

### Navigate to a Cell

Find the Name Box via ARIA snapshot (textbox showing current cell reference like "A1"):
```typescript
const snap = await client.getAISnapshot("gsheet");
const nameBoxLine = snap.split('\n').find(l => l.includes('textbox') && /[A-Z]\d/.test(l));
const nameBoxRef = nameBoxLine.match(/\[ref=(\w+)\]/)[1];

await clickByRef(client, page, nameBoxRef);
await page.keyboard.press('Control+a');
await page.keyboard.type('A9', { delay: 30 });  // target cell
await page.keyboard.press('Enter');
```

### Paste Data (Recommended — most reliable)

```typescript
const tsv = rows.map(r => r.join('\t')).join('\n');
await page.evaluate((data) => { navigator.clipboard.writeText(data); }, tsv);
await page.keyboard.press('Control+v');
```

**Important**: Always use TSV paste for multi-cell data. Cell-by-cell Tab/Enter is unreliable in Google Sheets.

## Important Notes

- ALWAYS use coordinate clicks (`page.mouse.click(x, y)`) — never `element.click()`
- ALWAYS get fresh ARIA snapshot before every interaction
- Wait for pages to fully load (3s minimum after navigation)
- If a profile's Connect button is below the fold, scroll it into view first
- Some profiles are "Follow only" — no Connect option, skip them
- If you encounter a CAPTCHA or security challenge, STOP immediately
- Take screenshots at key debugging moments
- Profiles where Connect button click doesn't produce a modal → likely scrolled off viewport, skip and continue
