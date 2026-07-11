// Mama's Kitchen — Menu Page
// Design: Addis Nocturne — "Tonight's Lineup" concert set-list / stage board styling
// Every category = a set. Every dish = a track. Mono numbers, gold underlines, bold names.
// Categories confirmed: Ethiopian staples, Western/international, Drinks

import { menuItems } from "@/lib/data";
import { useState } from "react";

const categories = [
  { id: "ethiopian", label: "Ethiopian Staples", icon: "01", note: "The heart of the kitchen" },
  { id: "western", label: "Western & International", icon: "02", note: "Comfort from across the world" },
  { id: "drinks", label: "Drinks & Cocktails", icon: "03", note: "From tej to house pours" },
];

export default function Menu() {
  const [activeTab, setActiveTab] = useState(categories[0].id);

  const filteredItems = menuItems.filter((item) => {
    if (activeTab === "ethiopian") return item.category === "Ethiopian Staples";
    if (activeTab === "western") return item.category === "Western & International";
    if (activeTab === "drinks") return item.category === "Drinks & Cocktails";
    return false;
  });

  const activeCategory = categories.find((c) => c.id === activeTab);

  return (
    <div className="py-20 lg:py-28">
      {/* SEO Meta */}
      <div className="sr-only">
        <h1>Mama's Kitchen Menu — Ethiopian and International Cuisine Addis Ababa</h1>
        <p>View the full menu at Mama's Kitchen Addis Ababa. Ethiopian staples, international dishes, drinks and cocktails.</p>
      </div>

      <div className="container">
        {/* Header */}
        <div className="mb-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[oklch(0.74_0.12_80/0.6)] mb-3">
            Tonight's Lineup
          </p>
          <h1 className="font-display font-extrabold text-5xl lg:text-7xl text-[oklch(0.93_0.01_80)] tracking-tight leading-[1.1]">
            The menu
          </h1>
          <p className="font-body text-[oklch(0.93_0.01_80/0.55)] text-lg mt-4 max-w-2xl leading-relaxed">
            Ethiopian staples meet international comfort. Generous portions, live-music energy,
            and a kitchen that doesn't stop until you've had your fill.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[oklch(0.93_0.01_80/0.3)] mt-4">
            Typical entrées ETB 150–700. Prices vary by branch and season.
          </p>
        </div>

        {/* Category Tabs — concert program style */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.15em] px-5 py-2.5 transition-all duration-200 ease-out-snappy active:scale-[0.97] ${
                activeTab === cat.id
                  ? "bg-[oklch(0.74_0.12_80)] text-[oklch(0.13_0.02_340)]"
                  : "border border-[oklch(0.74_0.12_80/0.15)] text-[oklch(0.93_0.01_80/0.5)] hover:border-[oklch(0.74_0.12_80/0.4)] hover:text-[oklch(0.74_0.12_80)]"
              }`}
            >
              <span className={`text-[10px] ${activeTab === cat.id ? "text-[oklch(0.13_0.02_340/0.6)]" : "text-[oklch(0.74_0.12_80/0.3)]"}`}>
                {cat.icon}
              </span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Category note */}
        <p className="font-body text-[oklch(0.93_0.01_80/0.4)] text-sm mb-10">
          {activeCategory?.note}
        </p>

        {/* Menu Items — Track-List Style */}
        <div className="max-w-3xl">
          {filteredItems.map((item, i) => (
            <div
              key={item.id}
              className="lineup-item"
            >
              <span className="lineup-number">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="lineup-name truncate">{item.name}</span>
                  {item.priceRange && <span className="lineup-price">{item.priceRange}</span>}
                </div>
                {item.description && (
                  <span className="font-body text-[oklch(0.93_0.01_80/0.35)] text-xs mt-0.5 block">
                    {item.description}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Royal Lounge note — brand voice */}
        <div className="mt-14 p-8 border border-[oklch(0.74_0.12_80/0.08)] bg-gradient-to-br from-[oklch(0.17_0.02_340)] to-[oklch(0.74_0.12_80/0.02)] max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2 h-2 rounded-full bg-[oklch(0.48_0.14_25)]" />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[oklch(0.48_0.14_25)]">
              Royal Lounge exclusive
            </p>
          </div>
          <p className="font-body text-[oklch(0.93_0.01_80/0.55)] text-sm leading-relaxed">
            The Royal Lounge branch serves the full dinner menu alongside cocktails and live music.
            House cocktails and signature drinks are available exclusively at this venue —
            where the stage lights come on after ten.
          </p>
        </div>
      </div>
    </div>
  );
}
