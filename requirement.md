4. Platform vs Product Demos
○ R1.8: Support both:
■ Platform-level demo for C-suite (cross-asset, specimen, supply chain,
financial and clinical value), and
■ Asset-level / module-level demo (what they used for Baptist) for Biomed
execs, lab directors, etc.
○ R1.9: Same KPIs and logic must be reusable between customers (e.g., narrative
created for Baptist can be parameterized and reused for Cleveland).
2. Digital Asset Management Requirements
5. Utilization & Lifecycle Story (Matches the storyboard screenshot)
○ R2.1: Define and implement a standard asset status lifecycle:
■ Clean asset → In use → Soiled → Needs repairing → Repaired → Needs
sanitization → Sanitized (or equivalent).
○ R2.2: Record timestamp + location at each status change (check-in/out, room
transfers, basement/sterile, Biomed shop) so utilization timelines can be
computed.
○ R2.3: Provide a visual lifecycle view (like the “asset utilization” timeline in the
storyboard) showing:
■ Time spent in each status
■ Where in the hospital each status change occurred
■ Bottlenecks (e.g., too long in “needs repair” or “soiled”).
6. Utilization KPIs for Biomed Executives○ R2.4: Provide exec-friendly utilization metrics for Biomed leaders who must
justify capital spend:
■ % utilization by asset category and department
■ Count and value of underutilized assets (<X% use)
■ Count of idle assets (>Y days unused).
○ R2.5: Support drill-down from high-level utilization to “Top N underutilized
assets” list, with reasons:
■ Location patterns (always stuck in one unit)
■ Misplaced / not returned to central sterile
■ Out for repair too long, etc.
○ R2.6: For each high-value asset, allow per-asset utilization view and link to PM
history and location history (for the “show me why I do or don’t need more beds”
conversation).7. Preventive Maintenance (PM) Workflows
○ R2.10: Provide a PM worklist view that:
■ Sends lists to handheld devices
■ Tracks which PM tasks are completed vs pending
■ Records how long it took to locate each asset.
○ R2.11: KPIs for PM:
■ Time to locate assets for PM (target: minutes, not months).
■ PM completion rates, overdue counts.
■ Impact on asset uptime and utilization.3. Digital Specimen / Transfusion Medicine Requirements
9. Transfusion Analytics Dashboard Refinement
○ R3.1: Keep overall layout (blood type distribution, top hospital inventory, critical
alerts, bottom KPIs) but:
■ Replace all “toy” numbers with realistic enterprise-scale ranges using
Baptist/Cleveland sample data.
■ Ensure cost savings numbers are meaningful (no “$1,500 saved” for
Cleveland Clinic).
○ R3.2: Fix domain language / labels:
■ Replace “5 types” with correct blood component terminology, ABO/Rh
naming, etc.
■ Align with actual blood bank / transfusion medicine jargon, as Srikar
flagged.10. Chain of Custody & Quality KPIs
● R3.3: Define KPIs for:
○ % specimens with full custody chain and severity of custody breaks
○ Temp/stock/expiry alert counts (like “8 temp, 4 stock, 4 expiry”).
● R3.4: Show “Quality Milestone Achieved” type messages (e.g., “98% traceability, 0
custody breaks in last 30 days”) with drill-down to:
○ Which departments improved
○ What process changes drove the improvement.
11. Network & Map Views
● R3.5: Support a hospital network view (list of locations + map) with:
○ Roll-up KPIs per site
○ Indicator dots for sites with issues (red/green).● R3.6: Clicking a location drills into site-specific transfusion metrics (inventory, alerts,
wastage, savings).4. Supply Chain & Digitized Workflow Requirements
12. Digitized Workflows Summary (second screenshot)
● R4.1: “Digitized workflows” view must show:
○ Coverage for Transfusion, Lab, Biomedical Assets, Infra Health, Supply Chain.
○ Each card with: % metric, denominator (e.g., 5,005/5,050), and 1–2 words of
what that represents (“Availability”, “Tracked samples”, “Gateway status”,
“Visibility”).
● R4.2: Clicking a card leads into that module’s Digitize view (how many workflows are
instrumented, tag health, gateway health, % of items tracked).
13. Inventory / Expiry / Wastage
● R4.3: Surface “inventory expiration alert” style insights at platform level:
○ e.g., “24 RBC units approaching expiration within 48h; $540K waste prevention
protocols active.”
● R4.4: For each supply category, define:
○ Expiry windows
○ Wastage baselines
○ Prevention actions and associated savings.. Data Model & KPI Definition Requirements
14. Bottom-Layer Taxonomies
● R5.1: For each domain, define canonical status and location taxonomies:
○ Assets: statuses, room types (soiled, clean utility, patient room, Biomed, central
sterile, radiology, etc.).
○ Specimens: collection points, courier stages, lab stages.
○ Supplies: storage locations, transit states, usage events.● R5.2: Ensure all dashboards/KPIs are computed from this shared taxonomy so that
animations, demos, and dashboards all align (Srikar’s concern about consistency).
15. KPI Definitions & Documentation
● R5.3: Create internal documentation for each KPI (especially the ones surfaced to
execs):
○ Formula, inputs, refresh frequency, typical value ranges.
○ Context (who cares, what decisions it supports).
● R5.4: Build a “data driver” section in drill-downs that explains why a given AI insight or
number is shown (to maintain trust with execs and investors).6. Storytelling, Training & Demo Requirements
16. Storyboard / Education Layer
● R6.1: Embed storyboard-style explanations (like the check-in/out visual) inside the
platform as:
○ An “Understanding Utilization” overlay or “How this works” tab.
○ Training content for both internal sales engineers and customer champions.
● R6.2: Include the highway/toll booth vs Wi-Fi carpet analogy in training material to
reset expectations about gateway placement and system design.17. Consistent Story Across Deck → Animation → Demo
● R6.3: Maintain a single source of truth for:
○ The platform visual (digital hospital diagrams)
○ The 3-level Digitize/Analyze/Optimize flows
○ The asset/sampler stories.
● R6.4: Require that sales decks, training animations, and live demos use the same
flows and numbers, so customers and investors don’t get conflicting messages.
18. Demo Tenants & Feedback Loop
● R6.5: Provide a demo environment with:
○ Preloaded sample data (Baptist-like, Cleveland-like)
○ Different personas/logins (CTO, Biomed exec, Lab director).
● R6.6: Support session recording + feedback capture:
○ Sales calls recorded (e.g., via Read.ai), tagged to specific dashboards.
○ Product team regularly feeds customer quotes back into UX iterations (what you
and Srikar are already doing informally).
19. Investor-Specific View
● R6.7: Provide a 10-minute investor view:
○ Simple sequence of screens showing: digital hospital map → economic impact →
crown-jewel modules (Asset, Specimen, Blood) → roadmap.
● R6.8: Metrics focused on TAM, deployment scale, and economic value rather than
operational minutiae.7. Cross-Cutting AI/Insight Requirements
20. AI “Why” + Next Best Action
● R7.1: From any KPI panel (e.g., underutilization), allow an AI side panel that answers:
○ “Why is utilization low?”
○ “Which 10 assets should I look at today?”
○ “What is the impact if I redeploy these?”
● R7.2: AI must propose actionable, hospital-language recommendations, not just
anomalies (e.g., “Redeploy 12 chairs from ICU to ED; avoid $350K purchase request”).