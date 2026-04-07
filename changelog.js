// Data Center Helper — Changelog
// Edit this file to add new versions. Do NOT edit datacenter_helper.html for changelog updates.
// Types: "feat" | "change" | "fix"

window.CHANGELOG = [
  {
    version: "v5.0",
    title: "Save & Share system",
    date: "Current version",
    entries: [
      { type: "feat",   text: "Calculator: Save and Load profiles — stores requirements list and server mode to localStorage" },
      { type: "feat",   text: "CG Planner: Save and Load profiles — stores CG groups, Core groups and all Gbps values to localStorage" },
      { type: "feat",   text: "CG Planner: Export plan as JSON file for sharing" },
      { type: "feat",   text: "CG Planner: Import JSON plan from file or paste — fully validated before applying" },
      { type: "feat",   text: "Security: imported JSON is structurally validated and sanitized — no code injection possible" },
      { type: "feat",   text: "saves.js: dedicated save system file — clean separation from app logic" },
      { type: "fix",    text: "Setup Guide: Back to Dashboard link updated to index.html" },
      { type: "feat",   text: "Setup Guide: server preference toggle (7U preferred / 3U only) — guide adapts accordingly" },
      { type: "feat",   text: "Setup Guide: unlocked switches panel — guide recommends only switches available in-game" },
      { type: "fix",    text: "Setup Guide: SyntaxError crash fixed — renderCustomerGuide rewritten without nested template literals" }
    ]
  },
  {
    version: "v4.5",
    title: "CG Planner width & blur crash fix",
    entries: [
      { type: "fix",    text: "CG Planner: NotFoundError crash when pressing Enter in Max Gbps field — render now deferred after blur event" },
      { type: "fix",    text: "CG Planner: same deferred render fix applied to member Gbps and CG name inputs" },
      { type: "change", text: "CG Planner: section now uses full available page width" },
      { type: "fix",    text: "CG Planner: customer names now show correctly in pool list" },
      { type: "fix",    text: "CG Planner: Gbps input moved inside each CG member — value saved correctly and carried over" },
      { type: "fix",    text: "CG Planner: removed default 10 Gbps — value starts at 0, set per member after assigning" },
      { type: "change", text: "CG Planner: layout changed to Core Groups on top, CG Groups below — wider and more readable" },
      { type: "change", text: "CG Planner: Max Gbps/Core moved to top bar, Core Groups no longer takes a full column" },
      { type: "feat",   text: "CG Planner: Max Gbps limit is now set per individual Core (not global)" },
      { type: "feat",   text: "CG Planner: Core group name is now editable inline" },
      { type: "fix",    text: "CG Planner: Gbps input field is wider, spinner arrows removed for cleaner input" }
    ]
  },
  {
    version: "v4.4",
    title: "CG Planner input & layout fixes",
    entries: [
      { type: "fix",    text: "CG Planner: Gbps inputs lost focus after every keystroke — now updates on blur/enter instead of every keypress" },
      { type: "fix",    text: "CG Planner: Core Max Gbps input did not activate — same focus loss fix applied" },
      { type: "feat",   text: "CG Planner: Core group name is now editable inline" },
      { type: "fix",    text: "CG Planner: CG group name input widened so full name is visible" }
    ]
  },
  {
    version: "v4.3",
    title: "CG Planner redesign",
    entries: [
      { type: "feat",   text: "Calculator: server size mode selector — 7U preferred, 3U only (early game), or show both" },
      { type: "fix",    text: "Calculator: ReferenceError — optimize3U and calcResult functions were not defined at runtime" },
      { type: "fix",    text: "Calculator: spare servers now always match selected server size (3U spare in 3U-only mode)" },
      { type: "fix",    text: "Calculator: Show Both mode now generates two separate Total Summary cards — one per mode" }
    ]
  },
  {
    version: "v4.2",
    title: "Calculator & CG Planner fixes",
    entries: [
      { type: "fix",    text: "Calculator: 3U Only mode incorrectly added spare as 7U — spare now matches selected size" },
      { type: "fix",    text: "Calculator: Show Both mode — Total Summary now shows two separate cards (one per mode)" }
    ]
  },
  {
    version: "v4.1",
    title: "CG Planner & Calculator fixes",
    entries: [
      { type: "fix",    text: "CG Planner: customer names now show correctly in pool list" },
      { type: "fix",    text: "CG Planner: Gbps input moved inside each CG member — value is now saved correctly" },
      { type: "fix",    text: "CG Planner: removed default 10 Gbps — value starts at 0" },
      { type: "change", text: "CG Planner: layout changed to 2-column — more space for names" },
      { type: "change", text: "CG Planner: Max Gbps/Core moved to top bar" },
      { type: "feat",   text: "Calculator: server size mode selector — 7U preferred, 3U only, or show both" }
    ]
  },
  {
    version: "v4.0",
    title: "Setup Guide",
    entries: [
      { type: "feat",   text: "Setup Guide — separate interactive page for step-by-step guidance" },
      { type: "feat",   text: "I have a customer mode — select any of the 34 customers and get exact shopping list + wiring steps" },
      { type: "feat",   text: "I have gear mode — enter what you own and get connection advice and issue detection" },
      { type: "feat",   text: "Beginner / Expert toggle — beginner mode shows explanations for every step" },
      { type: "feat",   text: "Step-by-step checklist with unlock flow — steps unlock one by one as you complete them" },
      { type: "feat",   text: "Visual cable diagram per customer showing exact colour-coded routing" },
      { type: "feat",   text: "Auto server optimisation — calculates exact 7U/3U mix for each server type required" },
      { type: "feat",   text: "Server preference toggle: 7U preferred or 3U only (early game)" },
      { type: "feat",   text: "Unlocked switches panel — guide recommends only what you have available in-game" },
      { type: "change", text: "Changelog button moved to topbar next to game version badge" },
      { type: "feat",   text: "Steam Patch Notes tab in changelog (attempts live load, falls back to Steam link)" },
      { type: "change", text: "Changelog moved to standalone changelog.js file — no more editing HTML for updates" }
    ]
  },
  {
    version: "v3.0",
    title: "Full Rebuild",
    entries: [
      { type: "change", text: "Complete rewrite — English only, no more language switching" },
      { type: "feat",   text: "Light / Dark theme toggle (Dark default)" },
      { type: "feat",   text: "Larger font sizes throughout for better readability" },
      { type: "feat",   text: "Responsive layout — works on mobile and desktop" },
      { type: "feat",   text: "Footer with game credit" }
    ]
  },
  {
    version: "v2.5",
    title: "Calculator Overhaul",
    entries: [
      { type: "feat",   text: "Multi-requirement calculator — add System X, RISC, Mainframe, GPU separately" },
      { type: "feat",   text: "Smart optimisation: maximises 7U servers, supplements with 3U" },
      { type: "feat",   text: "Port count, rack space, bandwidth and cost per requirement" },
      { type: "feat",   text: "Total summary card across all requirements" },
      { type: "feat",   text: "N+1 redundancy support per requirement" },
      { type: "change", text: "IOPS input now accepts raw values (e.g. 80000) instead of k-values" }
    ]
  },
  {
    version: "v2.0",
    title: "CG Planner",
    entries: [
      { type: "feat",   text: "CG Planner tab for capacity planning" },
      { type: "feat",   text: "Assign customers to CG groups with Gbps tracking" },
      { type: "feat",   text: "Assign CG groups to Core groups with configurable limit" },
      { type: "feat",   text: "Visual capacity bar per CG and Core with overflow warning" },
      { type: "fix",    text: "CG group numbering now reuses deleted numbers correctly" },
      { type: "fix",    text: "Core limit default changed from 560 to 0 (user-defined)" }
    ]
  },
  {
    version: "v1.0",
    title: "Initial Release",
    entries: [
      { type: "feat", text: "Devices tab: ports, modules, switches, servers with specs" },
      { type: "feat", text: "Customers tab: all 34 customers with IOPS breakdown, filterable" },
      { type: "feat", text: "Basic server requirement calculator" }
    ]
  }
];
