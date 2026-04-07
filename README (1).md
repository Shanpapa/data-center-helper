# 🖥️ Data Center Helper

> *"I have absolutely no idea what I'm doing."*
> — Shanpapa, while staring at 47 unconnected cables

---

A fan-made helper tool for the [Data Center](https://store.steampowered.com/app/4170200/Data_Center/) game by Waseku.

Built by a casual player who got lost in switches, patch panels and IOPS numbers — and decided to do something about it.

**👉 [Open the tool](https://shanpapa.github.io/data-center-helper/index.html)**

---

## What's in it

### 🔧 Device Reference
All ports, modules, switches and servers in one place. Speeds, prices, IOPS, lifetimes — no more alt-tabbing mid-cable.

### 👤 Customer List
All 34 customers with their full requirements, filterable by switch type. Know what's coming before you commit to a rack layout.

### 🧮 Server Calculator
Enter your target IOPS, pick server type and redundancy — get exact server count, rack space, bandwidth and estimated cost. Supports 7U preferred, 3U only (early game) or both side by side.

### 📊 CG / Core Planner
Group customers into Customer Groups, assign them to Cores, set bandwidth limits, watch the bar turn red when you inevitably go over. Comes with save/load and JSON export for sharing layouts.

### 📘 Setup Guide
Step-by-step wiring help for when the whole system feels like black magic. Pick your customer, tick what switches you've unlocked, and it walks you through exactly what to buy and how to connect it. Beginner and expert mode included.

---

## Transparency

- **No downloads, no executables** — static HTML, CSS and JavaScript only
- **No data sent anywhere** — save/load uses your browser's localStorage only
- **Export files** are plain JSON — open in Notepad and read every byte
- **Source code** is exactly what you see here — no build step, no minification

---

## Files

| File | Purpose |
|------|---------|
| `index.html` | Main app |
| `setup_guide.html` | Step-by-step setup guide |
| `changelog.js` | Version history — edit this to add new entries |
| `saves.js` | Save/load/export/import logic |
| `LICENSE` | MIT — use freely, keep the credit |

---

## Running locally

No install needed. Just download the files and open `index.html` in your browser.

```
git clone https://github.com/shanpapa/data-center-helper.git
cd dc-helper
# open index.html in your browser
```

---

## Contributing

Found a bug? Missing something? Got a better idea?

Open an issue or drop a message — I'm a casual player not a developer, so feedback is genuinely welcome. Just don't expect enterprise-grade response times. 😄

---

## License

MIT — see [LICENSE](LICENSE)

*Fan-made. Not affiliated with Waseku.*
*Built with the help of [Claude](https://claude.ai) (Anthropic).*
