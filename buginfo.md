# Bug Report: ISTE Thapar Website

This document tracks the known issues within the ISTE Thapar student chapter website build. The bugs are categorized into **Real Bugs** (which break functionality/styling) and **Decoy Bugs** (valid code that looks suspicious).

---

## Real Bugs

| ID | Location | The Problem | Symptom | The Fix |
| :--- | :--- | :--- | :--- | :--- |
| **1** | `index.html`<br>(Line 39) | **Invalid CSS Display Value**<br>Inline style uses `display: flex-inline;` which doesn't exist. | Hero stats section elements stack vertically instead of displaying horizontally in a row. The layout breaks completely. | Change to valid CSS:<br>`display: inline-flex;` |
| **2** | `index.html`<br>(Line 158) | **Duplicate ID Attributes**<br>Section has two `id` attributes: `id="team"` and `id="team-section"`. | Team section loses all styling - no background color, no padding. Entire section appears broken and unstyled. | Remove duplicate ID, use class instead:<br>`<section id="team" class="team-section">` |
| **3** | `style.css`<br>(Line 57) | **Wrong Flexbox Display Property**<br>Uses `display: flexbox;` instead of `display: flex;`. | Navbar completely broken - logo and navigation links stack vertically. `justify-content` and `align-items` properties are ignored. | Change to correct property:<br>`display: flex;` |
| **4** | `style.css`<br>(Line 254) | **Grid Property Typo**<br>Uses `grid-template-column:` (singular) instead of `grid-template-columns:` (plural). | About section cards stack in a single column instead of displaying in a responsive grid layout. | Add missing 's':<br>`grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));` |
| **5** | `style.css`<br>(Line 373) | **Z-Index Too Low**<br>Event badge has `z-index: 0;` which places it behind the card's `::before` pseudo-element. | "Featured" badge on event card is partially hidden behind the red top border stripe. Badge appears cut off. | Increase z-index:<br>`z-index: 1;` or higher |
| **6** | `style.css`<br>(Line 462) | **Selector Mismatch**<br>CSS targets `.team-section` (class) but HTML uses `id="team-section"` (ID). | Team section has no styling - missing background color and padding. Section appears broken. Related to Bug #2. | Change CSS selector to ID:<br>`#team-section { ... }` OR fix HTML to use class (preferred) |
| **7** | `style.css`<br>(Line 583) | **Incomplete Flex Property**<br>Uses only `flex-grow: 2;` instead of proper flex shorthand. | Newsletter input field doesn't resize properly on mobile. Input takes improper space and can overflow on smaller screens. | Use flex shorthand:<br>`flex: 1;` |
| **8** | `style.css`<br>(Line 710) | **Invalid Display Value**<br>Uses `display: hidden;` which is not valid. Should be `display: none;`. | Navigation links remain visible on mobile instead of hiding. Mobile navigation broken - links overlap with hamburger toggle. | Change to valid property:<br>`display: none;` |
| **9** | `style.css`<br>(Line 748) | **Transform Property Typo**<br>Uses `transorm:` instead of `transform:`. Single character typo. | Event badge doesn't rotate on hover. Subtle animation is missing. Only noticeable when testing hover states. | Fix typo:<br>`transform: rotate(5deg);` |

---

## 🎣 Decoy Bugs
The following code patterns may look incorrect or suspicious, but they are valid HTML/CSS and **do not** need to be fixed for the site to run.

- [x] **Inline-Flex Display**: 
  - *Context:* CSS Line 380 uses `display: inline-flex;` with `flex-direction: column;`
  - *Verdict:* Perfectly valid CSS. `inline-flex` makes the container inline while maintaining flexbox properties. The combination with column direction is intentional for the event date box to be only as wide as its content.
  
- [x] **Grid Auto-Fit Keyword**: 
  - *Context:* CSS Line 610 uses `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));`
  - *Verdict:* Valid and powerful CSS Grid feature. `auto-fit` is a real keyword (often confused with `auto-fill`) that creates responsive columns automatically. Common in modern responsive design.

- [x] **Multiple Media Queries**: 
  - *Context:* CSS has separate media queries at 768px (Line 698) and 480px (Line 735).
  - *Verdict:* Standard best practice. Multiple breakpoints for different device sizes are necessary for responsive design. Cascading works perfectly - later rules don't override earlier ones inappropriately.

---

## 📊 Difficulty Breakdown

### Medium Difficulty (3 bugs)
- **Bug #1**
- **Bug #2**
- **Bug #8**

### Hard Difficulty (3 bugs)
- **Bug #4**
- **Bug #5**
- **Bug #6**

### Very Hard Difficulty (3 bugs)
- **Bug #3**
- **Bug #7**
- **Bug #9**

---

## Testing Instructions

### Visual Tests (Desktop)
1. Open `index.html` in browser
2. Check navbar - should be horizontal (Bug #3)
3. Check hero stats - should be in a row (Bug #1)
4. Check about cards - should be in grid (Bug #4)
5. Check team section - should have white background (Bug #2, #6)
6. Check featured event badge - should be fully visible (Bug #5)
7. Hover over featured event - badge should rotate (Bug #9)

### Visual Tests (Mobile)
8. Resize browser to < 768px width
9. Check navigation - links should hide (Bug #8)
10. Check newsletter form - input should resize properly (Bug #7)

### Developer Tools
11. Validate HTML with W3C Validator (catches Bug #2)
12. Inspect computed styles for invalid CSS
13. Check console for CSS warnings
14. Use 3D view to check z-index layers (Bug #5)

---
