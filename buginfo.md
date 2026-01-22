# 🐛 Bug Report: ISTE Thapar Simplified Site

This document tracks the known issues within the simplified HTML/CSS build. The bugs are categorized into **Critical Issues** (which break functionality) and **Red Herrings** (stylistic choices that are valid code).

---

## Real Bugs
These need to be fixed by the contestant.

| ID | Location | The Problem | Symptom | The Fix |
| :--- | :--- | :--- | :--- | :--- |
| **1** | `index.html`<br>(Line 18) | **Empty Attribute**<br>`<a href>` tag is missing a value. | The "Contact" link is dead; the cursor does not change to a pointer on hover. | Add a target:<br>`href="#contact"` |
| **2** | `index.html`<br>(Line 26) | **Local Absolute Path**<br>`src="C:/Users/..."` points to a local file system. | The image appears broken (icon) for everyone except the original author. | Use a relative path or web URL:<br>`src="./images/hero.jpg"` |
| **3** | `index.html`<br>(Line 38) | **Unclosed Tag**<br>Missing `</div>` for the second event card. | The footer loses its styling or gets sucked inside the event container background. | Add `</div>` before the closing `</section>` tag. |
| **4** | `style.css`<br>(Line 42) | **Selector Mismatch**<br>Used `#cta-button` (ID) instead of `.cta-button` (Class). | The "Join Now" button is small and default gray instead of the styled red. | Change `#cta-button` to **`.cta-button`**. |

---

## 🎣 Red Herrings (Not Bugs)
The following code patterns may look incorrect or "lazy," but they are valid HTML/CSS and **do not** need to be fixed for the site to run.

- [x] **Uppercase Tags (`<LI>`)**: 
  - *Context:* Line 16 uses `<LI>` instead of `<li>`.
  - *Verdict:* HTML is case-insensitive. The browser renders this perfectly.
  
- [x] **Break Tags for Spacing (`<br><br>`)**: 
  - *Context:* Line 28 uses breaks to push the button down.
  - *Verdict:* While using CSS margins is "best practice," `<br>` tags are valid HTML and will not break the layout.

- [x] **CSS Shorthand (`background`)**: 
  - *Context:* CSS Line 6 uses `background: #f4f4f4` instead of `background-color`.
  - *Verdict:* Valid CSS shorthand. If no image is specified, it defaults to the color provided.

---

