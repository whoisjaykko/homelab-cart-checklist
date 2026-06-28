import { useState, useMemo } from "react";

const categories = [
  {
    id: "hypervisor",
    icon: "🖥️",
    label: "Hypervisor / VM Host",
    description: "High Availability VMs for your GA setup + workshop expansion",
    color: "#00d4ff",
    items: [
      {
        id: "h1",
        name: "Beelink SER8 Mini PC (AMD Ryzen 8945HS, 32GB RAM, 1TB NVMe)",
        note: "Node 1 of 2 — runs Proxmox VE. Pair two for HA clustering.",
        price: 469,
        qty: 2,
        asin: "B0D184MRDZ",
        priority: "core",
      },
      {
        id: "h2",
        name: "Crucial RAM 64GB Kit (2x32GB) DDR5 5600 SODIMM",
        note: "Upgrade each node to 64GB for heavy VM workloads",
        price: 109,
        qty: 2,
        asin: "B0BXSRJLG6",
        priority: "core",
      },
      {
        id: "h3",
        name: "WD Black SN850X 2TB NVMe M.2 SSD",
        note: "VM storage per node — fast enough for multiple concurrent VMs",
        price: 129,
        qty: 2,
        asin: "B0B4JQMJJ7",
        priority: "core",
      },
    ],
  },
  {
    id: "nas",
    icon: "💾",
    label: "NAS / Media Server",
    description: "Offline music, movies, TV shows, photos, videos — your personal Netflix",
    color: "#a855f7",
    items: [
      {
        id: "n1",
        name: "Synology DS923+ 4-Bay NAS",
        note: "Runs Plex, Jellyfin, PhotoPrism. Expandable to 9 drives with DX517.",
        price: 599,
        qty: 1,
        asin: "B0BG42KQMB",
        priority: "core",
      },
      {
        id: "n2",
        name: "Seagate IronWolf 8TB NAS HDD (3.5\")",
        note: "Start with 2, add more as your library grows. RAID 1 = mirror for safety.",
        price: 139,
        qty: 4,
        asin: "B084ZTQHL8",
        priority: "core",
      },
      {
        id: "n3",
        name: "Crucial RAM 32GB DDR4 SODIMM (for DS923+)",
        note: "Maxes out NAS RAM for transcoding 4K content smoothly",
        price: 69,
        qty: 1,
        asin: "B0C3TZMFDC",
        priority: "upgrade",
      },
    ],
  },
  {
    id: "ai",
    icon: "🤖",
    label: "Local AI Companion (Shop)",
    description: "Runs Ollama + models like Llama3, Codestral, Mistral — offline, private",
    color: "#22c55e",
    items: [
      {
        id: "a1",
        name: "NVIDIA GeForce RTX 4070 Super 12GB (for AI inference)",
        note: "Runs 70B models at decent speed locally. Needed for fast AI in the shop.",
        price: 599,
        qty: 1,
        asin: "B0CQLT3VCT",
        priority: "core",
      },
      {
        id: "a2",
        name: "Beelink GTR7 Pro Mini PC (Ryzen 9 7940HX, 32GB, 1TB) — AI Host",
        note: "Dedicated machine for Ollama + Open WebUI. Keep the AI always-on in the shop.",
        price: 549,
        qty: 1,
        asin: "B0CQNR87S5",
        priority: "core",
      },
      {
        id: "a3",
        name: "Raspberry Pi 5 8GB (shop terminal / AI front-end)",
        note: "Touchscreen terminal in the shop to talk to your local AI without a full PC",
        price: 89,
        qty: 1,
        asin: "B0CRSNCJ6Y",
        priority: "upgrade",
      },
      {
        id: "a4",
        name: "Raspberry Pi 7\" Touchscreen Display",
        note: "For the Pi 5 shop terminal",
        price: 69,
        qty: 1,
        asin: "B014WKCFR4",
        priority: "upgrade",
      },
    ],
  },
  {
    id: "cameras",
    icon: "📷",
    label: "Security Cameras",
    description: "Full house coverage — feeds into Frigate NVR on your Proxmox VM (no cloud)",
    color: "#f59e0b",
    items: [
      {
        id: "c1",
        name: "Reolink RLC-810A 4K PoE IP Camera (Color Night Vision)",
        note: "8MP PoE — plug straight into your PoE switch. No WiFi, no cloud required.",
        price: 49,
        qty: 6,
        asin: "B07MBJ9KC1",
        priority: "core",
      },
      {
        id: "c2",
        name: "Reolink RLC-823A 4K PoE Camera (Spotlight + Siren)",
        note: "For driveway / front door — has built-in spotlight and alarm",
        price: 64,
        qty: 2,
        asin: "B08Z3TZXRC",
        priority: "core",
      },
      {
        id: "c3",
        name: "TP-Link TL-SG1218MPE 16-Port PoE+ Managed Switch",
        note: "Powers all PoE cameras AND devices from one switch. 250W PoE budget.",
        price: 219,
        qty: 1,
        asin: "B09NFZNHFL",
        priority: "core",
      },
      {
        id: "c4",
        name: "Seagate SkyHawk 4TB Surveillance HDD",
        note: "Dedicated drive for Frigate NVR recordings",
        price: 89,
        qty: 1,
        asin: "B07H4RQKYK",
        priority: "core",
      },
    ],
  },
  {
    id: "firewall",
    icon: "🛡️",
    label: "Firewall / Cybersecurity",
    description: "Protects against booters, hackers & DDoS. Alerts you to attacks in real-time.",
    color: "#ef4444",
    items: [
      {
        id: "f1",
        name: "Protectli Vault FW4C (4-Port, Intel N5105, 8GB RAM, 128GB mSATA)",
        note: "Runs pfSense/OPNsense. Your hardware firewall — everything passes through this.",
        price: 309,
        qty: 1,
        asin: "B09RBHMXS1",
        priority: "core",
      },
      {
        id: "f2",
        name: "TP-Link TL-SG108E 8-Port Managed Gigabit Switch",
        note: "VLAN-capable smart switch for network segmentation (cameras, IoT, trusted devices)",
        price: 29,
        qty: 2,
        asin: "B00K4DS5KU",
        priority: "core",
      },
      {
        id: "f3",
        name: "CrowdSec Community + Suricata (software — free)",
        note: "FREE — runs on OPNsense. IDS/IPS: detects port scans, brute force, DDoS attempts. Sends you alerts.",
        price: 0,
        qty: 1,
        asin: null,
        priority: "core",
      },
    ],
  },
  {
    id: "networking",
    icon: "🔌",
    label: "Ethernet / Wired Networking",
    description: "Wired ports for TV, PS3, PS4, PS5, PC, Workshop, Bambu P2S, and more",
    color: "#0ea5e9",
    items: [
      {
        id: "net1",
        name: "TP-Link TL-SG116E 16-Port Managed Gigabit Switch",
        note: "Your main distribution switch — all your wired devices plug in here",
        price: 59,
        qty: 1,
        asin: "B0892NJZ7D",
        priority: "core",
      },
      {
        id: "net2",
        name: "Cat6A Ethernet Cable 50ft (6-pack, Flat, Black)",
        note: "Wall/floor runs to TV, consoles, PC. Cat6A = future-proof for 10Gbps",
        price: 39,
        qty: 3,
        asin: "B082MZWH87",
        priority: "core",
      },
      {
        id: "net3",
        name: "Keystone Jack Cat6 Wall Plate + Surface Mount Box (10-pack)",
        note: "Clean wall ports throughout the house instead of cables dangling",
        price: 22,
        qty: 2,
        asin: "B08H7PD4N2",
        priority: "upgrade",
      },
      {
        id: "net4",
        name: "Cable Matters 10-Pack 1ft Cat6A Patch Cables (Black)",
        note: "Short patch cables for switch to wall plate connections",
        price: 19,
        qty: 2,
        asin: "B00C4B3BNW",
        priority: "upgrade",
      },
      {
        id: "net5",
        name: "Bambu Lab P2S Ethernet Upgrade (USB-C to Ethernet Adapter)",
        note: "Plug your Bambu printer straight into your network switch",
        price: 15,
        qty: 1,
        asin: "B09GRL3VCN",
        priority: "upgrade",
      },
    ],
  },
  {
    id: "ups",
    icon: "⚡",
    label: "Power & UPS",
    description: "Protects all your gear from outages and power surges",
    color: "#f97316",
    items: [
      {
        id: "u1",
        name: "APC Smart-UPS 1500VA SMT1500C (LCD, USB, 6-outlet)",
        note: "Powers your firewall, switches, NAS, and server nodes during outages",
        price: 399,
        qty: 1,
        asin: "B000CRUUEM",
        priority: "core",
      },
      {
        id: "u2",
        name: "APC Back-UPS 600VA BE600M1 (for workshop)",
        note: "Separate UPS just for the workshop AI + printer — keeps it up during brief outages",
        price: 79,
        qty: 1,
        asin: "B01FWAZEIU",
        priority: "upgrade",
      },
    ],
  },
  {
    id: "rack",
    icon: "🗄️",
    label: "Rack / Enclosure",
    description: "Keep everything organized and accessible",
    color: "#6b7280",
    items: [
      {
        id: "r1",
        name: "NavePoint 9U Wall Mount Open Frame Rack",
        note: "Wall-mountable — perfect for a closet or utility room to house all your gear",
        price: 79,
        qty: 1,
        asin: "B008X13EVA",
        priority: "upgrade",
      },
      {
        id: "r2",
        name: "1U Horizontal Cable Manager (10-pack velcro ties included)",
        note: "Keeps your rack wiring clean and manageable",
        price: 19,
        qty: 2,
        asin: "B01M0EB5PJ",
        priority: "upgrade",
      },
    ],
  },
];

const priorityLabels = { core: "Must Have", upgrade: "Nice to Have" };
const priorityColors = { core: "#22c55e", upgrade: "#f59e0b" };

export default function HomelabCart() {
  const [selected, setSelected] = useState(() => {
    const s = {};
    categories.forEach((cat) =>
      cat.items.forEach((item) => {
        s[item.id] = true;
      })
    );
    return s;
  });

  const [activeTab, setActiveTab] = useState("all");
  const [expandedCat, setExpandedCat] = useState(() => {
    const e = {};
    categories.forEach((c) => (e[c.id] = true));
    return e;
  });

  const toggleItem = (id) =>
    setSelected((s) => ({ ...s, [id]: !s[id] }));

  const toggleCat = (id) =>
    setExpandedCat((e) => ({ ...e, [id]: !e[id] }));

  const filteredCategories = useMemo(() => {
    if (activeTab === "all") return categories;
    return categories.map((cat) => ({
      ...cat,
      items: cat.items.filter((i) => i.priority === activeTab),
    })).filter((cat) => cat.items.length > 0);
  }, [activeTab]);

  const totals = useMemo(() => {
    let core = 0, upgrade = 0, selected_total = 0;
    categories.forEach((cat) =>
      cat.items.forEach((item) => {
        const val = item.price * item.qty;
        if (item.priority === "core") core += val;
        else upgrade += val;
        if (selected[item.id]) selected_total += val;
      })
    );
    return { core, upgrade, total: core + upgrade, selected_total };
  }, [selected]);

  const selectedItems = useMemo(() => {
    return categories.flatMap((cat) =>
      cat.items
        .filter((i) => selected[i.id])
        .map((i) => ({ ...i, catColor: cat.color, catLabel: cat.label }))
    );
  }, [selected]);

  return (
    <div style={{
      background: "#0a0e1a",
      minHeight: "100vh",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      color: "#e2e8f0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
        borderBottom: "1px solid #1e293b",
        padding: "24px 20px 20px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <span style={{ fontSize: 28 }}>🧰</span>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.3px", color: "#f1f5f9" }}>
                Homelab Build Cart
              </div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
                HA VMs · Local AI · NAS · Cameras · Firewall · Wired Network
              </div>
            </div>
          </div>
          {/* Cost bar */}
          <div style={{
            display: "flex", gap: 16, marginTop: 14, flexWrap: "wrap"
          }}>
            {[
              { label: "Must-Have Total", val: totals.core, color: "#22c55e" },
              { label: "Nice-to-Have", val: totals.upgrade, color: "#f59e0b" },
              { label: "Selected", val: totals.selected_total, color: "#00d4ff" },
            ].map((t) => (
              <div key={t.label} style={{
                background: "#0f172a",
                border: `1px solid ${t.color}33`,
                borderRadius: 8,
                padding: "6px 14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}>
                <span style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>{t.label}</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: t.color }}>
                  ${t.val.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          {/* Tabs */}
          <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
            {[["all", "All Items"], ["core", "Must Have"], ["upgrade", "Nice to Have"]].map(([val, label]) => (
              <button key={val} onClick={() => setActiveTab(val)} style={{
                background: activeTab === val ? "#1e40af" : "#1e293b",
                color: activeTab === val ? "#fff" : "#94a3b8",
                border: activeTab === val ? "1px solid #3b82f6" : "1px solid #334155",
                borderRadius: 6,
                padding: "5px 12px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 16px 40px" }}>
        {/* Categories */}
        {filteredCategories.map((cat) => (
          <div key={cat.id} style={{
            background: "#0f172a",
            border: `1px solid ${cat.color}30`,
            borderRadius: 12,
            marginBottom: 16,
            overflow: "hidden",
          }}>
            {/* Category header */}
            <div
              onClick={() => toggleCat(cat.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 16px",
                cursor: "pointer",
                background: `linear-gradient(90deg, ${cat.color}10 0%, transparent 60%)`,
                borderBottom: expandedCat[cat.id] ? `1px solid ${cat.color}20` : "none",
              }}
            >
              <span style={{ fontSize: 22 }}>{cat.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: cat.color }}>
                  {cat.label}
                </div>
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>
                  {cat.description}
                </div>
              </div>
              <div style={{ color: "#334155", fontSize: 18 }}>
                {expandedCat[cat.id] ? "▲" : "▼"}
              </div>
            </div>

            {/* Items */}
            {expandedCat[cat.id] && cat.items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  padding: "12px 16px",
                  borderBottom: "1px solid #1e293b",
                  background: selected[item.id] ? "transparent" : "#0a0e1a88",
                  opacity: selected[item.id] ? 1 : 0.5,
                  transition: "all 0.15s",
                }}
              >
                <input
                  type="checkbox"
                  checked={!!selected[item.id]}
                  onChange={() => toggleItem(item.id)}
                  style={{
                    marginTop: 3,
                    accentColor: cat.color,
                    width: 16,
                    height: 16,
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0", lineHeight: "1.4" }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: 11, color: "#64748b", marginTop: 3, lineHeight: "1.4" }}>
                    {item.note}
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 6, flexWrap: "wrap", alignItems: "center" }}>
                    <span style={{
                      fontSize: 10,
                      background: `${priorityColors[item.priority]}22`,
                      color: priorityColors[item.priority],
                      border: `1px solid ${priorityColors[item.priority]}44`,
                      borderRadius: 4,
                      padding: "2px 7px",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.3px",
                    }}>
                      {priorityLabels[item.priority]}
                    </span>
                    {item.qty > 1 && (
                      <span style={{ fontSize: 11, color: "#94a3b8" }}>
                        ×{item.qty}
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: item.price === 0 ? "#22c55e" : "#f1f5f9" }}>
                    {item.price === 0 ? "FREE" : `$${(item.price * item.qty).toLocaleString()}`}
                  </div>
                  {item.price > 0 && item.qty > 1 && (
                    <div style={{ fontSize: 10, color: "#475569" }}>
                      ${item.price} × {item.qty}
                    </div>
                  )}
                  {item.asin && (
                    <a
                      href={`https://www.amazon.com/dp/${item.asin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-block",
                        marginTop: 6,
                        fontSize: 10,
                        color: "#f59e0b",
                        textDecoration: "none",
                        background: "#f59e0b18",
                        border: "1px solid #f59e0b40",
                        borderRadius: 4,
                        padding: "2px 7px",
                        fontWeight: 600,
                      }}
                    >
                      Amazon ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Phase plan */}
        <div style={{
          background: "#0f172a",
          border: "1px solid #1e293b",
          borderRadius: 12,
          padding: "20px 20px 16px",
          marginTop: 8,
        }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: "#f1f5f9", marginBottom: 12 }}>
            📅 Suggested Savings Plan
          </div>
          {[
            {
              phase: "Phase 1 — Foundation", budget: "$900–$1,100", color: "#22c55e",
              items: ["Protectli Vault (pfSense firewall)", "16-Port managed switches", "Cat6A ethernet + wall plates", "APC UPS 1500VA"],
              goal: "Secure, wired, clean network. Everything else plugs into this.",
            },
            {
              phase: "Phase 2 — Storage & Cameras", budget: "$1,100–$1,400", color: "#a855f7",
              items: ["Synology DS923+ NAS", "4x 8TB IronWolf drives (RAID 10)", "8x Reolink PoE cameras", "PoE+ switch"],
              goal: "Your offline media library + full house camera coverage.",
            },
            {
              phase: "Phase 3 — Compute (HA VMs)", budget: "$1,400–$1,600", color: "#00d4ff",
              items: ["2x Beelink SER8 nodes", "RAM upgrades (64GB each)", "2x 2TB NVMe drives", "Proxmox VE (free)"],
              goal: "High-availability Proxmox cluster — VMs for GA, workshop, automation.",
            },
            {
              phase: "Phase 4 — Local AI Shop", budget: "$700–$800", color: "#22c55e",
              items: ["Beelink GTR7 Pro (AI host)", "RTX 4070 Super (if adding GPU)", "Raspberry Pi 5 + touchscreen (shop terminal)"],
              goal: "Ollama + Open WebUI running 24/7. Ask it anything offline.",
            },
          ].map((p) => (
            <div key={p.phase} style={{
              borderLeft: `3px solid ${p.color}`,
              paddingLeft: 14,
              marginBottom: 14,
            }}>
              <div style={{ display: "flex", gap: 10, alignItems: "baseline", marginBottom: 4 }}>
                <span style={{ fontWeight: 700, fontSize: 13, color: p.color }}>{p.phase}</span>
                <span style={{
                  fontSize: 11, background: `${p.color}22`, color: p.color,
                  border: `1px solid ${p.color}44`, borderRadius: 4, padding: "1px 8px", fontWeight: 600,
                }}>{p.budget}</span>
              </div>
              <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>{p.goal}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {p.items.map((i) => (
                  <span key={i} style={{
                    fontSize: 10, color: "#94a3b8",
                    background: "#1e293b", borderRadius: 4, padding: "2px 7px",
                    border: "1px solid #334155",
                  }}>{i}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Software notes */}
        <div style={{
          background: "#0f172a",
          border: "1px solid #22c55e30",
          borderRadius: 12,
          padding: "16px 20px",
          marginTop: 16,
        }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#22c55e", marginBottom: 10 }}>
            💿 Free Software Stack (Runs on Your Hardware)
          </div>
          {[
            ["Proxmox VE", "Hypervisor for all your VMs — free, open source"],
            ["OPNsense", "Firewall OS for Protectli Vault — free, beats commercial routers"],
            ["Suricata + CrowdSec", "IDS/IPS — detects port scans, DDoS, brute force. Free."],
            ["Jellyfin", "Plex alternative — 100% free, no account needed, streams to anything"],
            ["Frigate NVR", "AI-powered camera recording — runs locally on Proxmox VM"],
            ["Ollama + Open WebUI", "Local AI — runs Llama3, Codestral, Mistral. No internet needed."],
            ["Tailscale", "Free VPN so you can access your homelab remotely from anywhere"],
            ["Grafana + Prometheus", "Dashboards for network traffic, intrusion alerts, camera events"],
          ].map(([name, desc]) => (
            <div key={name} style={{
              display: "flex", gap: 10, padding: "6px 0",
              borderBottom: "1px solid #1e293b",
            }}>
              <span style={{
                fontSize: 11, fontWeight: 700, color: "#22c55e",
                minWidth: 160, flexShrink: 0,
              }}>{name}</span>
              <span style={{ fontSize: 11, color: "#64748b" }}>{desc}</span>
            </div>
          ))}
        </div>

        {/* Footer total */}
        <div style={{
          background: "linear-gradient(135deg, #1e1b4b, #0f172a)",
          border: "1px solid #3b82f640",
          borderRadius: 12,
          padding: "18px 20px",
          marginTop: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}>
          <div>
            <div style={{ fontSize: 12, color: "#64748b" }}>Selected items total</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#00d4ff" }}>
              ${totals.selected_total.toLocaleString()}
            </div>
            <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>
              Full build: ${totals.total.toLocaleString()} · Core only: ${totals.core.toLocaleString()}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>Uncheck items to plan by budget</div>
            <div style={{ fontSize: 11, color: "#475569" }}>
              {selectedItems.length} of {categories.flatMap(c => c.items).length} items selected
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
