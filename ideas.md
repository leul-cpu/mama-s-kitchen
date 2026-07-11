# Mama's Kitchen — Design Brainstorm

## Three Approaches

### 1. Addis Nocturne
A moody, cinematic lounge aesthetic inspired by the energy of a live jazz club in Addis Ababa after midnight. Deep aubergine backgrounds with warm Ethiopian gold accents that glow like brass instruments under stage lights. The layout feels like walking into a dimly lit venue — bold typography commands attention, and content reveals itself in dramatic sweeps.

**Probability: 0.72**

### 2. Habesha Modernist
A structured, editorial approach that treats each branch as a chapter in a coffee-table book about Ethiopian hospitality. Clean grid systems with generous margins, muted berry tones as section dividers, and a refined typographic hierarchy that prioritizes readability while maintaining cultural warmth.

**Probability: 0.06**

### 3. Bole Boulevard
An energetic, street-level visual language that captures the vibrant pulse of Addis nightlife districts. Neon-like gold accents, dynamic skewed card layouts, and a raw, almost zine-inspired composition that feels spontaneous and alive.

**Probability: 0.04**

---

## Chosen Approach: Addis Nocturne

### Design Movement
**Neo-Noir Ethiopian** — blending the atmospheric depth of film noir with the warmth of Ethiopian cultural motifs. Think of the visual language of a high-end jazz venue in 1970s Addis: rich shadows, amber highlights, and textures that feel both luxurious and lived-in.

### Core Principles
1. **Depth through shadow, not color** — the palette stays restrained (aubergine, gold, berry) but depth is created through layered transparencies and subtle gradients
2. **Typography as architecture** — Bricolage Grotesque headlines act as structural beams, Space Mono utility text as the exposed framework
3. **Performance as visual language** — the "Tonight's Lineup" concert aesthetic extends beyond the menu into how all content is presented — items as tracks, branches as venues
4. **Generous negative space that breathes** — content never feels crowded; the dark background makes whitespace feel intentional, not empty

### Color Philosophy
The palette is built around the metaphor of a venue at night:
- **`#1a1014` (deep aubergine-black)** — the velvet curtains, the darkened room before the show starts
- **`#d4a24e` (Ethiopian gold)** — brass instruments catching stage light, the warm glow of signage through smoke
- **`#8c2f39` (berry-red)** — wine glasses, the hint of warmth at the edge of a flame
- **`#f3e9dd` (cream)** — the spotlight on the stage, the only thing fully illuminated
- **`#241820` / `#2e1f28`** — the mid-tones between curtain and light, cards and elevated elements

No purple, no blue gradients. This reads as night. Always.

### Layout Paradigm
**Asymmetric editorial flow** — avoid centered grids. Use a left-aligned reading column with elements that bleed right. The navigation sits compact and uppercase. Content sections have dramatic top spacing (like curtain reveals) and the "Tonight's Lineup" track-list styling creates vertical rhythm through thin gold underlines.

### Signature Elements
1. **The Lineup track-list** — mono-numbered items with bold names and thin gold underlines, styled like a concert program
2. **Amharic wordmark "ማማስ ኪችን"** — displayed alongside the English logo, rendered in Noto Sans Ethiopic, appearing in header and footer as a cultural anchor
3. **Gold thin-line dividers** — 1px `#d4a24e` lines that separate sections like stage curtains between acts

### Interaction Philosophy
Interactions are deliberate and smooth, never bouncy. Hover states add a subtle gold glow rather than color shifts. Transitions use `cubic-bezier(0.23, 1, 0.32, 1)` for snappy ease-out. The site should feel like pressing into a velvet couch — intentional, weighty, satisfying.

### Animation
- Page sections fade in with staggered 40ms delays (opacity + translate-y)
- Menu items slide in from left with 50ms stagger per item
- Branch cards elevate on hover with subtle gold border glow (not shadow)
- Hero text has a slow typewriter-style reveal on load
- Respect `prefers-reduced-motion` — all animations gated
- Button press: `scale(0.97)` at 160ms ease-out

### Typography System
- **Display (H1-H2):** Bricolage Grotesque, weights 700-800, letter-spacing tight (-0.02em)
- **Sub-display (H3-H4):** Bricolage Grotesque, weight 600
- **Body:** Manrope, weights 400-500, generous line-height (1.7)
- **Utility/labels/prices:** Space Mono, uppercase, letter-spaced (0.15em), weight 400
- **Amharic:** Noto Sans Ethiopic, paired with the English wordmark

### Brand Essence
**"Where Addis comes alive after dark"** — for locals who want generous portions and live music, and visitors seeking modern Habesha hospitality across five distinct venues.

Three personality adjectives: **warm, vibrant, authentic**

### Brand Voice
- Headlines: declarative, confident, slightly poetic — "Five venues. One pulse." not "Welcome to Mama's Kitchen"
- CTAs: action-oriented and specific — "See tonight's menu" not "Explore"
- Microcopy: minimal, let the atmosphere speak — "Gold, berry, and gold again."
- Example: "Bole Medhanialem — Open all hours, because Addis doesn't sleep"
- Example: "Royal Lounge — Where the stage lights come on after ten"

### Wordmark & Logo
A bold, angular graphic mark inspired by the Ethiopian mesob (woven basket) silhouette — a triangular/conical form with subtle geometric patterning, rendered in gold on transparent background. The English wordmark uses Bricolage Grotesque in gold; the Amharic "ማማስ ኪችን" sits below in Noto Sans Ethiopic.

### Signature Brand Color
**`#d4a24e` (Ethiopian Gold)** — this is the brand's ownable color. It appears in headlines, navigation, accents, dividers, and the logo. It's warm enough to feel inviting against the dark background but metallic enough to feel premium.

## Style Decisions
- Interior pages must use the "lineup/program" system as the default structure: numbered acts, thin Ethiopian-gold rules, mono utility labels, and venue-as-performance language on branches, contact, and menu alike.
- No page may use placeholder-sounding copy; even incomplete content must be written in the Mama's Kitchen voice — warm, nocturnal, specific, and Addis-rooted.
- Dark backgrounds must never be plain flat fields for long stretches; each major section should carry subtle noir depth through aubergine layering, gold edge-light, berry warmth, or curtain-like dividers.
- "More photos coming soon" replaced with venue-specific copy. Gallery header reads "Frames from the floor" and "The kitchen, the stage, the street."
- Gallery placeholder reads "New frames on their way" instead of generic "coming soon".
