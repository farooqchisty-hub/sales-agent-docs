// Narrative sections: patterns, whitespace, plan, launch concepts. Example strips are filled by app.js from data.json.
const PATTERNS = [
  { t: "Ride the AI assistant wave", ev: `Live in 15 brands. Gojiberry's "I asked Claude to help me find more leads..." and "Before Claude, I thought sales was a numbers game" selfie videos have run 111 to 135 days. Explee's "Claude now finds your buyers" and a fake tweet ("i'm sorry, Claude can do WHAT?!"). PumpGTM "Turn Claude into your sales assistant". Origami "Claude + Origami = cheat code". Smartlead "Run outbound with commands, not clicks" (Claude, 176 days). Instantly "Your SDR is now a chatbox" (111 days). Apollo "Run outbound from your AI chats". lemlist "One prompt. Full campaign."`,
    move: `Use the wave without borrowing anyone's name: "Your AI chat can write the email. Closefast sends it, follows up and books the call." If Closefast ships a Claude or ChatGPT connector, that becomes its own ad on day one.`,
    ex: "2e893aa8a316 3e36295807d3 d0de605ac2e3 2f3196a9117a c8c2443054c0 c0a0d883b272 9d302b0fa8a0 215b55f26d6c" },
  { t: `"Paste your website" is table stakes`, ev: `9 brands and 252 live creatives lead with it. All 77 of Explee's live creatives say "Drop your website link". Origami, Gojiberry, Mailscale ("Enter your website. Launch a cold email campaign in minutes.") and Pancake too. Every self-serve agent that wins on Meta puts a URL box above the fold.`,
    move: `Keep the URL box in the visual and on the landing page, but never make it the headline. The headline sells what only Closefast has: free forever, nothing to connect, pay per use.`,
    ex: "22021626e7d9 f4fdcb9e7c3e 9e5e2e7372ff 2e893aa8a316" },
  { t: "Free, plus a countable first result", ev: `"Get your first 3-5 clients free" is Explee's longest-running line (59 days). Gojiberry's "[Free Trial] 3x more replies on LinkedIn" has run 166 days. Salesforge: "40 contacts. 3 positive replies." 21 brands say free; 9 add "no card". The free offer is always a trial or a credit pack: $30 (Explee), 7 days (Gojiberry, PumpGTM, Dripify).`,
    move: `Put the count in the headline: "100 prospects and 300 emails, free. Then free every month." Closefast is the only one that can say "forever".`,
    ex: "7729f3c82f7b 05fda49f2081 441965e6e92a 6afb5ef0ea0f" },
  { t: "Talk to the phone camera", ev: `The agent ads that last are selfie videos: Gojiberry's creator UGC (124 to 135 days), Alta's "I had to explain to my CEO why we had 12 people in sales and couldn't fill a calendar" (75 days, 7 ads), PumpGTM's founder ("i got into y combinator..."). Origami's UTMs (aiugc2, aiugc4, aiugc-candid-ui) show it runs AI-generated UGC at scale. In the tags, 87% of live founder-to-camera videos and 90% of live screen demos are over 30 days old, against 29% of person-photo statics and 40% of motion graphics.`,
    move: `Lead with Farooq talking to camera plus 2 or 3 creators. First line is a confession or a callout ("You're still writing cold emails by hand?"), then a 5 second screen capture of the agent working.`,
    ex: "3e36295807d3 5cfe02581b2c ac53b818eb87 2cf93ede253e a4aa4fd95ad5 38b2ea88fe91" },
  { t: "Give the agent a name and a job title", ev: `Alta's "Let Katie build your pipeline" video has run 153 days across 18 ads, and "Alex calls your leads in seconds" 134 days across 11. Origami: "Prospecting is a job for agents now." Instantly: "Your SDR is now a chatbox."`,
    move: `Test a "new hire" frame: an employee card for the agent (role, salary $0, hours 24/7, start date: the minute you paste your site).`,
    ex: "5dfafacf0817 9653c7a036d0 f97ffe00563b" },
  { t: "Compare against a headcount or a bill, with a number", ev: `Mailscale: "Your SDR sends 50 emails a day. This sends 5,000." Explee's whiteboard: "Google Ads $2,000/mo" vs "Free to start". Origami: "people are spending two grand a month sourcing stale leads from Apollo or ZoomInfo". Pancake: "An SDR costs $84,000 a year" next to "$99/mo". Alta: "My best rep spends 60% of his day prospecting". 21 brands reference SDRs, hiring or headcount. Big-number statics like these got the best scroll-stopping read of any format (4.1 of 5) and their live ones have a median age of 70 days.`,
    move: `"A sales hire costs [$6,000+] a month. This one starts at $0." Same whiteboard look Explee kept for 59 days.`,
    ex: "3a164c317538 7ea59dad46e0 7729f3c82f7b a620e46c77ff a924762784fe 2f3196a9117a" },
  { t: "Name the exact reader in the first line", ev: `Mailscale opens every ad with who it's for: "For B2B business owners who know cold email works, but never wanted to become a cold email expert." Explee: "No clients? 6 months building, still $0 revenue." Origami: "If you're a business owner but you don't know how to build a GTM strategy". Pancake runs one ad per vertical ("If you run an event agency, Pancake brings you customers ready to buy") with matching pages like /for/web-design-agencies.`,
    move: `Launch 4 reader variants of the same ad: founders who build, agency owners, consultants and B2B services, small sales teams. Each gets its own landing URL.`,
    ex: "f4fdcb9e7c3e 22021626e7d9 0d041112fa28 38b2ea88fe91 33b617746d30" },
  { t: "Native-looking statics beat polished design", ev: `Explee's tweet screenshot and whiteboard, Origami's Gmail inbox full of "Calendly: New Event" and its billboard ("Every hour prospecting is an hour not building"), Clay's "Your ads match rate is lower than your Hinge match rate", lemlist's Google Maps mock, Gojiberry's Gmail wall of Calendly bookings, La Growth Machine's "Your CEO doesn't care about opens". They look like something a friend posted, not an ad.`,
    move: `Three native statics at launch: an inbox stacked with "Meeting booked", a handwritten whiteboard, and a real post from Farooq's own account.`,
    ex: "5244f388b77e 9e5e2e7372ff 01815e3fa649 f97ffe00563b e17b46712d28 73205ece8eee" },
  { t: "Proof is one number plus a named customer", ev: `Salesforge: "£2.86 CAC. 4-5 new customers every day." (Unitesync). Gojiberry: "the same AI agent that brings our customers 12+ demos every week" (149 days). Smartlead names its partners (387 days). PumpGTM: "How Supermemory runs their outbound". lemlist: ElevenLabs "5% to 35% of pipeline". Instantly: "My clients think I have a team of 10 sales reps, but it's just me using AI." Smartlead: "Our first paying customer came from one cold email." Explee's landing page shows cost per lead per customer ($2.62, $6.67).`,
    move: `The day a beta user gets a real result, make it an ad: their name, one number, one timeframe. Until then, lead with the offer, not with proof.`,
    ex: "bcdf89e5ef87 6f211544d73c fca56ed0efbb 9aa0f5d111bf 03ddb8adbdbd 50794eb07eaf" },
  { t: "Attack the billing mechanic, not the price", ev: `Smartlead's "One price. Unlimited contacts." and "Scale cold email without paying more" have run 150 to 192 days. ListKit: "Send 1,000 cold emails per day for $597/mo. Every single thing included." Snov.io runs flat-pricing ads; Hunter sells "credits that roll over 12 months". AiSDR alone frames outbound like ad spend ("$1.50 per person contacted"). No AI agent ad attacks seat pricing.`,
    move: `"Pay for the work, not the seat. 3 cents per prospect worked, after the free plan." This is the most durable angle in the set and it is empty in the agent segment.`,
    ex: "cf99becc4b87 d9415289f8b4 b874dc8a27a1 71bef3a2b32c 0c5556fe1e8c" },
  { t: "Done-for-you as its own ad", ev: `Instantly's "Apply for Instantly VIP: built and managed by experts, you just show up to the calls" has run 125 days on 10 ads. Gojiberry's "We'll set everything up for you" 149 days. HeyReach runs a dfy-offer page and ListKit a done-for-you explainer.`,
    move: `Use it in retargeting: people who visited but didn't sign up get "Book a 1:1 setup call. We launch your first campaign with you."`,
    ex: "10d1a509ec13 6f211544d73c" },
  { t: "Give cold traffic something useful first", ev: `lemlist sends cold Meta traffic to outbound playbooks ("built on 244K+ real campaigns") and free Claude skills. HeyReach runs a "Claude GTM playbook". Kraya's educational sales-tip videos run 84 to 94 days.`,
    move: `Closefast already reads a site and scores who buys. Offer it as a free report: "Paste your website. See who should be buying from you, ranked." The report ends in signup.`,
    ex: "0fdf17338136 8868dda61c50 4eb7b914d387" },
];

const WHITESPACE = [
  ["Free forever", `Nobody. Explee gives $30 in credits (about 10 leads), Gojiberry, PumpGTM and Dripify give 7 days. A plan that never expires is unclaimed.`, "C01, C05"],
  ["Nothing to connect, your domain is never at risk", `Mailscale and ListKit sell "domains and inboxes included" to setup-averse buyers, but behind a demo call or $597 a month. Free sending from our warm inboxes is unclaimed.`, "C06"],
  ["Cost per lead in the ad", `Almost nobody prices the outcome in the ad. AiSDR is the exception: "$1.50 per person contacted" and "Would you buy ads without testing them first?" (7 live creatives). Explee shows cost per lead on its landing page only. Closefast's 3 cents per prospect worked is 50 times cheaper than AiSDR's per-person price.`, "C05"],
  ["Pay per use, no seats", `Smartlead's pricing-mechanic ads are among the longest runners (150 to 192 days), yet no AI agent uses the angle.`, "C05"],
  ["Replies handled and meetings booked, not just emails written", `Most agent ads stop at "finds and writes". PumpGTM's follow-up ads and Alta's calling agent are the only ones selling what happens after the send.`, "C04, C09, C10"],
];

const PLAN = `
<div class="call"><b>Ad positioning line:</b> Paste your website. Your AI sales agent is free forever.<br>
<b>Support line:</b> It finds your buyers, writes to them, follows up and books the calls. It sends from our warm inboxes, so there's nothing to connect.</div>
<div class="grid">
<div class="card"><h3>Who and where</h3><ul>
<li>US, UK, Canada, Australia, English only at launch.</li>
<li>Broad audience (Advantage+). Let the creative pick the reader by naming them in line one, like Mailscale and Pancake do.</li>
<li>Exclude existing signups (customer list + app event).</li></ul></div>
<div class="card"><h3>Three campaigns</h3><ul>
<li><b>Test:</b> one ad set per concept, 3 variants each (same copy, different visual or first line), equal budgets. Optimize for signup.</li>
<li><b>Scale:</b> concepts that beat the target cost per signup over 7 days move here and stay on. Keep the copy fixed and rotate fresh visuals around it (Explee's model).</li>
<li><b>Retarget:</b> visitors without signup get the setup-call and proof ads; signups who never launched a campaign get a nudge (PumpGTM runs exactly this as "retargeting_signups_without_trial").</li></ul></div>
<div class="card"><h3>Budget and rules</h3><ul>
<li>Weeks 1 to 2: 60% test, 30% scale, 10% retarget. Shift to scale as winners appear.</li>
<li>Read at day 7 to 10 (the testers' stopped ads run a median 8 to 18 days).</li>
<li>Kill an ad set at 2x the target cost per signup with no signup.</li>
<li>Keep winners running. Holders keep theirs 120 to 390 days. Refresh the visual, not the copy, when frequency passes about 3.</li></ul></div>
<div class="card"><h3>Tracking</h3><ul>
<li>Pixel plus Conversions API on closefast.pages.dev and the app: ViewContent, Lead (URL entered), CompleteRegistration (signup), custom CampaignLaunched and FirstReply.</li>
<li>Start optimizing for signup. Switch to CampaignLaunched once it fires about 50 times a week.</li>
<li>utm_campaign = campaign, utm_content = concept id (C01 to C14), so every signup traces back to a concept and the competitor pattern it came from.</li></ul></div>
<div class="card"><h3>Creative mix at launch</h3><ul>
<li>Half video: 9:16, 15 to 30 s, first line in the first second, captions burned in. Founder plus 2 or 3 creators.</li>
<li>Half static: 4:5 and 9:16, native-looking (inbox, whiteboard, post, notification stack).</li>
<li>Primary text: short first line, plain words, 2 to 4 lines, one ask. Test the "Get offer" button against "Sign up" (Explee uses Get offer on almost every ad).</li></ul></div>
<div class="card"><h3>Landing page</h3><ul>
<li>Message match per concept: the ad's promise is the first thing on the page.</li>
<li>URL box above the fold with the free numbers right under it (100 prospects, 300 emails, no card).</li>
<li>One page per reader (founders, agencies, consultants, sales teams), like Pancake's /for/ pages.</li>
<li>Check the hero on a 375 px phone screen: almost all of this traffic is on phones.</li></ul></div>
</div>
<div class="call warn"><b>Don't copy:</b> fake posts in another company's name or fake endorsements (Explee's "Claude can do WHAT?!" tweet is a made-up post), testimonials or counters that aren't real, and abstract AI visuals with no person or product in them. QA every variant: some of Smartlead's live tweet cards still show "Lorem ipsum #template". Build the same native look with Farooq's own posts and real product screens.</div>`;

const CONCEPTS = [
  { id: "C01", name: "Free forever whiteboard", fmt: "Static 4:5, photo of a handwritten whiteboard", pat: "Free + countable result · headcount comparison",
    hook: `Left column "Sales hire: [$6,000+]/mo, 3 month ramp". Right column "Closefast: $0 to start. Finds your buyers. Writes every email. Books the calls."`,
    copy: `Paste your website. Closefast finds the people who need what you sell, writes to each of them, follows up and books the calls.\n\n100 prospects and 300 emails free to start. Then 50 prospects every month, forever. No card.`,
    head: "Your AI sales agent. Free forever.", cta: "Get offer / Sign up", from: "7729f3c82f7b cf99becc4b87" },
  { id: "C02", name: "Your AI chat writes it. Closefast sends it.", fmt: "UGC selfie video 9:16, 20 s", pat: "AI assistant wave",
    hook: `"I asked my AI to do my outreach. It wrote ten great emails. Then I still had to find the people, send them and chase every reply."`,
    copy: `AI can write the email. Closefast does the rest: finds your buyers, sends from warm inboxes, follows up and books the call.\n\nPaste your website. Free forever.`,
    head: "Stop copy-pasting AI emails", cta: "Sign up", from: "2e893aa8a316 3e36295807d3 d0de605ac2e3" },
  { id: "C03", name: "Founder to camera", fmt: "Founder talking head 9:16, 30 s, screen insert", pat: "Talk to the phone · named reader",
    hook: `"I built a sales agent for my own team's outreach. It worked well enough that I made it free for everyone." [use Farooq's real origin story]`,
    copy: `I'm Farooq. Closefast started as the agent we used to book our own partner calls. Now anyone can paste their website and get the same agent, free forever.`,
    head: "Built for our own outreach. Free for yours.", cta: "Learn more", from: "a4aa4fd95ad5 22021626e7d9" },
  { id: "C04", name: "Wake up to booked calls", fmt: "Static 9:16, phone lock screen notification stack", pat: "Native static · replies handled",
    hook: `Notifications: "Reply from Priya: Thursday works", "Meeting booked: Thu 3:00 PM", "38 new prospects found". [swap in a real beta screen when available]`,
    copy: `Your agent works while you don't. It follows up, answers questions about price and timing, and puts the call on your calendar.\n\nPaste your website. Free forever.`,
    head: "Wake up to replies, not a to-do list.", cta: "Sign up", from: "9e5e2e7372ff f42a26d87312" },
  { id: "C05", name: "3 cents, no seats", fmt: "Static 4:5, one huge number", pat: "Billing mechanic · cost per lead whitespace",
    hook: `"$0.03" big, under it "per prospect worked. No seats. No contract."`,
    copy: `Most sales tools charge per seat, whether they book you a meeting or not.\n\nClosefast is free to start. After that you pay 3 cents for each prospect it researches, emails, follows up and handles replies for. Top up only when you want more.`,
    head: "Pay for the work, not the seat.", cta: "Get offer", from: "cf99becc4b87 d9415289f8b4 71bef3a2b32c" },
  { id: "C06", name: "Cold email without the setup", fmt: "Static 4:5 before/after checklist, or 15 s motion", pat: "Nothing-to-connect whitespace",
    hook: `Crossed out: "Buy domains. Warm up inboxes for 2 weeks. Build a list. Write copy. Pray it's not spam." Then: "Paste your website."`,
    copy: `We send from our own warm inboxes with your name and signature. Replies come straight to you. Your domain is never touched.\n\nFree forever. No card.`,
    head: "Cold email, nothing to set up.", cta: "Sign up", from: "58b9e8864be1 f4fdcb9e7c3e f8f5e07acb17" },
  { id: "C07", name: "For agency owners who...", fmt: "Static 4:5 typographic + 3 reader variants", pat: "Name the reader",
    hook: `"For agency owners who know outbound works, but never wanted to run it." Variants: founders who'd rather build, consultants between referrals, sales teams short on pipeline.`,
    copy: `You're good at the work. Finding the next client is the part that never gets done.\n\nPaste your website. Closefast finds companies that need what you do, writes to the decision maker and books the call. Free forever.`,
    head: "Your next clients, found for you", cta: "Sign up", from: "f4fdcb9e7c3e 33b617746d30 22021626e7d9" },
  { id: "C08", name: "The new hire card", fmt: "Static 4:5, employee ID card", pat: "Name the agent",
    hook: `"NEW HIRE. Role: sales development. Salary: $0. Hours: 24/7. Starts: the minute you paste your website."`,
    copy: `Meet your first sales hire. It researches every prospect, writes to them like a person, follows up and books meetings. It never asks for a raise.`,
    head: "Hire your first salesperson for $0", cta: "Sign up", from: "5dfafacf0817 c8c2443054c0" },
  { id: "C09", name: "POV: you took Friday off", fmt: "UGC 9:16, 15 s", pat: "Talk to the phone · replies handled",
    hook: `"POV: you took Friday off and came back to three booked calls."`,
    copy: `It kept following up while I was gone. I only answered the people who said yes. Closefast is free forever.`,
    head: "Your outreach doesn't take weekends off", cta: "Learn more", from: "f42a26d87312 5cfe02581b2c" },
  { id: "C10", name: "The apology note", fmt: "Static handwritten note, or 10 s video read-out", pat: "Human hook · replies handled",
    hook: `"To every lead I forgot to follow up with: I'm sorry. My agent does it now."`,
    copy: `Most replies come on the second or third email. Closefast sends every follow-up, so nobody falls through the cracks again.`,
    head: "Never forget a follow-up again", cta: "Sign up", from: "7c2f0d511ce3" },
  { id: "C11", name: "Launch news", fmt: "Static 4:5 news-style frame (our own news only), first 2 weeks", pat: "Launch news",
    hook: `"New: a free AI sales agent that books your calls."`,
    copy: `Closefast is live. Paste your website and it starts finding your buyers in minutes. Free forever, no card, nothing to connect.`,
    head: "Closefast is live. It's free.", cta: "Get offer", from: "d0de605ac2e3 215b55f26d6c" },
  { id: "C12", name: "Who should be buying from you?", fmt: "Screen recording 9:16, 20 s", pat: "Useful first (lead magnet)",
    hook: `"Paste your website. In 2 minutes you'll see who should be buying from you, ranked."`,
    copy: `Closefast reads your site, scores every market by fit and shows you the decision makers, by name. Free. If you like the list, it can write to them too.`,
    head: "Free: your best buyers, ranked", cta: "Learn more", from: "0fdf17338136 38b2ea88fe91" },
  { id: "C13", name: "Retarget: we'll set it up with you", fmt: "Founder video or static, retargeting only", pat: "Done-for-you",
    hook: `"Want it set up for you? Book a 1:1 call and we launch your first campaign together."`,
    copy: `Paste your website and we'll do the rest with you on a call: your buyers, your message, your first sends. [setup call price]`,
    head: "Launch your first campaign with us", cta: "Book now", from: "10d1a509ec13 6f211544d73c" },
  { id: "C14", name: "Retarget: one real result", fmt: "Static 4:5 or customer selfie video", pat: "Proof: number + name",
    hook: `"[Customer] got [N] calls in [N] days from Closefast's free plan."`,
    copy: `[Customer name, role, company]: one sentence in their words. Then: Paste your website. Free forever.`,
    head: "[N] calls in [N] days", cta: "Sign up", from: "bcdf89e5ef87 50794eb07eaf" },
];

const escH = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
document.getElementById("patternlist").innerHTML = PATTERNS.map((p, i) => `<div class="pattern"><h3>${i + 1}. ${escH(p.t)}</h3>
  <div class="ev">${escH(p.ev)}</div><div class="do"><b>Closefast move:</b> ${escH(p.move)}</div><div class="strip" data-ex="${p.ex}"></div></div>`).join("");
document.getElementById("whitespace").innerHTML = `<div class="tw"><table><tr><th>Nobody says</th><th>Evidence</th><th>Concepts</th></tr>` +
  WHITESPACE.map(([a, b, c]) => `<tr><td><b>${escH(a)}</b></td><td>${escH(b)}</td><td class="mono">${c}</td></tr>`).join("") + `</table></div>`;
document.getElementById("planbody").innerHTML = PLAN;
document.getElementById("conceptlist").innerHTML = CONCEPTS.map(c => `<div class="concept" id="${c.id}"><h3>${c.id} · ${escH(c.name)}</h3>
  <div class="small">${escH(c.fmt)} · pattern: ${escH(c.pat)}</div>
  <div class="lbl">Hook / on-screen</div><p>${escH(c.hook)}</p>
  <div class="lbl">Primary text</div><div class="copy">${escH(c.copy)}</div>
  <div class="lbl">Headline · CTA</div><p>${escH(c.head)} · <span class="mono">${escH(c.cta)}</span></p>
  <div class="lbl">Descends from</div><div class="strip" data-ex="${c.from}"></div></div>`).join("");
