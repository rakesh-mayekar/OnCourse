# OnCourse Global — UX Wireframe Prototype Suite

**Prepared by:** Swara Studio  
**Companion to:** K Webmaker Digital SOW v1.0 (Phase 1/2)  
**Client:** OnCourse Global

---

## 🌟 Overview

A coded structural UX wireframe prototype with client-side interactivity for the **OnCourse Global** website redesign. This prototype demonstrates information architecture, segment journeys (Undergraduate Class 8–12, Master's, MBA, Test Prep & Transfer), recurring brand pillars, and dynamic enquiry flows before high-fidelity visual design (Phase 2) and WordPress CMS build (Phase 3).

### Key Architectural Highlights
- **Semantic HTML5 & Tailwind CSS via CDN**: Responsive, mobile-first layouts tested at 375px, 768px, and 1280px.
- **Client-Side Interactivity**:
  - **Dynamic Segment Lead Form**: Dynamically swaps form fields (e.g. GMAT/GRE score & work experience for MBA vs. Class 8–12 grade & curriculum for UG vs. exam targets for Test Prep).
  - **Contextual Pop-up**: Non-intrusive slide-in corner modal that adapts value propositions per segment (`undergraduate` vs `mba`) with `sessionStorage` persistence.
  - **Dismissible Sticky CTA**: Scroll-triggered sticky consultation bar that coordinates with the slide-in pop-up.
  - **FAQ Accordion**: Accessible expand/collapse accordion.
  - **Interactive Outcome Slider**: Success stories carousel with multi-slide navigation.
- **Master Prototype Hub (`index.html`)**: Built-in interactive viewport switcher (375px mobile, 768px tablet, 1280px desktop, and fluid full screen) with quick page navigation across all 18 pages.

---

## 📁 Repository Structure

```
.
├── index.html                               # Master Prototype Hub & Interactive Viewport Switcher
├── .gitignore
├── README.md
└── oncourse-wireframe/
    ├── index.html                           # Wireframe redirect to home.html
    ├── components/
    │   ├── header.html                      # Reusable navigation header with 8 items + CTAs
    │   ├── footer.html                      # Reusable 4-column footer with office hubs & recruitment row
    │   ├── sticky-cta.html                  # Scroll-triggered sticky consultation bar
    │   ├── lead-form.html                   # Segment-aware dynamic enquiry form
    │   ├── segment-popup.html               # Non-intrusive slide-in corner modal
    │   ├── segment-landing-template.html    # Base template for segment overviews
    │   └── content-hub-template.html        # Base template for list + filter sub-pages
    ├── pages/
    │   ├── home.html                        # Homepage (Hero video, segment selector, trust bar, 5 themes)
    │   ├── about.html                       # About Us & leadership
    │   ├── undergraduate.html               # Undergraduate Overview (Class 8–12 broad messaging)
    │   ├── masters.html                     # Master's & Postgraduate Overview
    │   ├── mba.html                         # MBA & Executive Advisory Overview
    │   ├── test-prep.html                   # Test Prep & Transfer Admissions Overview
    │   ├── undergraduate-program.html       # UG Programs & Longitudinal Tracks
    │   ├── undergraduate-knowledge.html     # UG Knowledge Centre & Guides
    │   ├── undergraduate-success.html       # UG Success Stories & Admit Profiles
    │   ├── undergraduate-events.html        # UG Webinars & Masterclasses
    │   ├── mba-program.html                 # MBA Programs & M7 Tracks
    │   ├── mba-knowledge.html               # MBA Knowledge Centre & Essay Guides
    │   ├── mba-success.html                 # MBA Success Stories & Fellowships
    │   ├── mba-events.html                  # MBA Admissions Panels & Roundtables
    │   ├── contact.html                     # Contact Us, 4 Global Office Hubs, Form & FAQ Accordion
    │   ├── careers.html                     # Life at OnCourse culture landing
    │   ├── careers-openings.html            # Searchable job openings
    │   └── careers-apply.html               # Candidate application & resume upload
    └── assets/
        ├── wireframe.css                    # Wireframe utility styles & placeholder crosshatch tokens
        └── wireframe.js                     # Shared client-side interaction controller
```

---

## 🚀 How to Run Locally

Because this prototype is built with standard HTML5, Tailwind CSS (CDN), and Vanilla JS:

1. **Option A: Direct Browser Opening**  
   Open `index.html` or any page in `oncourse-wireframe/pages/` directly in Google Chrome, Safari, or Edge.

2. **Option B: Local Web Server (Recommended)**  
   ```bash
   # From the project root
   python3 -m http.server 4200
   ```
   Navigate to `http://localhost:4200/` to explore all pages with responsive device frames.
