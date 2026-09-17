# Devtrica AI Agency — SEO Setup Guide

Sab kuch jo code mein ho sakta tha, ho chuka hai. Ye file batati hai ki **code ke baad** kya karna hai — kyunki ranking sirf on-page SEO se nahi aati.

---

## 1. Files ka structure

```
/
├── index.html                            ← home (heavy SEO + FAQ + schema)
├── pos-system.html                       ← "POS system" keyword page
├── school-management-system.html         ← "school management system" keyword page
├── restaurant-management-system.html     ← "restaurant POS" keyword page
├── pharmacy-management-system.html       ← "pharmacy software" keyword page
├── ai-chatbot-development.html           ← "AI chatbot development" keyword page
├── blog.html                             ← blog index (Blog schema)
├── pos-system-price-in-pakistan.html     ← "POS system price" — highest commercial intent
├── best-pos-system-for-retail-shop.html  ← "best POS for retail shop"
├── school-management-system-features.html ← "school management system features"
├── restaurant-pos-system-guide.html      ← "restaurant POS system"
├── pharmacy-software-expiry-management.html ← "pharmacy expiry tracking"
├── ai-chatbot-for-business.html          ← "AI chatbot for business"
├── manual-billing-vs-pos-software.html   ← "manual billing vs POS"
├── 404.html                              ← custom not-found page
├── style.css
├── script.js
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── browserconfig.xml
├── .htaccess                             ← HTTPS, gzip, caching, security headers
├── favicon.ico
└── assets/
    ├── og-image.jpg / og-image.png       ← social share preview (1200×630)
    ├── icon-192.png / icon-512.png
    ├── apple-touch-icon.png
    └── favicon-16x16.png / favicon-32x32.png
```

**Upload karte waqt:** saari files hosting ke `public_html` (ya root) mein jaani hain, folder structure same rakh kar. `.htaccess` hidden file hai — cPanel File Manager mein "Show Hidden Files" on karna padega.

---

## 2. Domain change karna ho to

Abhi har jagah `https://devtricaaislotutions.com` hardcoded hai. Agar domain alag hai, ye replace karo:

- Har `.html` file mein: `canonical`, `hreflang`, `og:url`, `og:image`, `twitter:image`, aur poore JSON-LD schema mein
- `robots.txt` → `Sitemap:` line
- `sitemap.xml` → har `<loc>`

Find & replace se 2 minute ka kaam hai. **Ye zaroor karna — galat canonical URL ranking ko sabse zyada nuksan deta hai.**

---

## 3. Code mein kya-kya SEO laga hai

### On-page
- Unique title + meta description har page ke liye, SERP limit ke andar (≤60 / ≤158 chars)
- Har page pe sirf **ek H1**, proper H2 → H3 hierarchy
- Keyword-rich lekin natural body content (stuffing nahi — Google ab stuffing pe penalize karta hai)
- Internal linking: home → 5 service pages → aapas mein related links → footer se har page tak
- Breadcrumb navigation + `BreadcrumbList` schema
- Descriptive anchor text ("Explore School ERP", "POS System Development") — "click here" nahi
- `canonical` tag har page pe, duplicate content rokne ke liye
- `hreflang` (en, en-PK, x-default)

### Structured data (rich results ke liye)
`index.html` mein:
`Organization`, `ProfessionalService` (local business), `WebSite` + SearchAction, `WebPage`, 5× `Service`, `BreadcrumbList`, `ItemList`, `FAQPage`

Har landing page pe: `Service` + `OfferCatalog`, `WebPage`, `BreadcrumbList`, `FAQPage`

> **FAQPage schema ka faida:** Google search results mein aapke sawal-jawab directly dikh sakte hain — isse listing bari hoti hai aur clicks badhte hain.

Test karo: [search.google.com/test/rich-results](https://search.google.com/test/rich-results)

### Local SEO
- `geo.region`, `geo.position`, `ICBM` meta tags (Lahore coordinates)
- Footer mein **NAP** (Name, Address, Phone) — Google local ranking ke liye zaroori
- `ProfessionalService` schema mein address, phone, opening hours, geo coordinates
- City names content mein naturally mention (Lahore, Karachi, Islamabad…)

### Technical / speed (Core Web Vitals = confirmed ranking factor)
- `preconnect` + `dns-prefetch` fonts aur CDN ke liye
- Font Awesome async load (render-blocking hata di), `<noscript>` fallback ke sath
- `script.js` ab `defer` — parsing block nahi karta
- `.htaccess`: gzip/brotli compression, 1-year asset caching, HTTPS force, non-www redirect
- Security headers (HSTS, X-Frame-Options, nosniff) — trust signal hain

### Social sharing
- Complete Open Graph + Twitter Card
- 1200×630 OG image (`assets/og-image.jpg`) — WhatsApp/Facebook/LinkedIn pe link share karne pe preview dikhega

### Crawling
- `robots.txt` jismein AI crawlers (GPTBot, ClaudeBot, PerplexityBot) **allow** hain — taake ChatGPT/Claude/Perplexity ke jawabon mein bhi brand aaye
- `sitemap.xml` image sitemap aur hreflang ke sath
- Custom `404.html` jo user ko wapas important pages pe bhejta hai

### Mobile / iOS
- `viewport-fit=cover` + `env(safe-area-inset-*)` — iPhone notch aur home indicator handle
- Inputs ka font-size 16px — iOS pe form tap karne pe zoom nahi hoga
- `-webkit-appearance` reset — iOS Safari pe date/select fields sahi dikhenge
- 44px minimum tap targets — Google ki mobile-usability requirement
- Breakpoints: 1600 / 1200 / 1080 / 860 / 640 / 420 + landscape phones
- `@media (hover: none)` — touch devices pe stuck hover states nahi
- PWA manifest — phone pe "Add to Home Screen" kaam karega

---

## 4. Ab aapko kya karna hai (ye hissa skip mat karna)

Code sirf **foundation** hai. Ranking in cheezon se aati hai:

### Week 1 — setup
1. **Google Search Console** ([search.google.com/search-console](https://search.google.com/search-console))
   - Domain verify karo, phir `sitemap.xml` submit karo
   - Har page ko "URL Inspection" se manually index request bhejo
2. **Bing Webmaster Tools** — wahi sitemap submit karo (Bing se ChatGPT search bhi feed hoti hai)
3. **Google Business Profile** ([business.google.com](https://business.google.com))
   - Ye **local SEO ka sabse bada factor** hai. "software house near me", "POS system Lahore" type searches isi se aati hain
   - Category: Software Company. Address, phone, hours, photos sab bharo
   - Website field mein wahi URL jo canonical mein hai
4. **Google Analytics 4** lagao — kaunse keywords traffic la rahe hain, ye dekhe bina optimize nahi kar sakte

### Week 2–4 — content
5. **Blog ab live hai** — 7 articles, har ek alag keyword pe, BlogPosting + FAQPage schema ke sath, aapas mein aur service pages se linked.

   Agla step: **har mahine 2–4 naye articles**. Ye ranking ka sabse bada lever hai — 7 se 30 articles jaana usi tarah farq daalega jaise 0 se 7 daala. Ideas:
   - "POS system Lahore mein kahan se banwayein" (city-specific)
   - "School fee management software kaise kaam karta hai"
   - "Wholesale distribution software ki zaroorat kab hoti hai"
   - "Gym management software features"
   - "Clinic management system Pakistan"
   - "Barcode printer aur scanner kaunsa lein"
   - Har article 1000+ words, ek clear keyword, aur relevant service page ka internal link

   **Format copy karo:** koi bhi maujooda article kholo, uska structure dekho — TOC, H2 sections, table, FAQ block + FAQPage schema, author box, related posts. Naya article usi dhaanche pe banao, sirf content badlo.

6. **Case studies** banao. "Sample Solution" tags ki jagah real client results (permission ke sath) — ye conversions aur rankings dono badhate hain.

### Ongoing — authority
7. **Backlinks** — Google ke liye sabse bhaari signal:
   - Pakistani business directories (PakBiz, Yellow Pages PK, Zameen business listings)
   - Clutch, GoodFirms, DesignRush (agency directories)
   - LinkedIn company page + regular posts
   - Guest posts local tech blogs pe
8. **Reviews** — Google Business Profile pe har client se review maango. Local pack mein ranking ke liye critical hai.
9. **Consistency** — NAP (naam, address, phone) har jagah **bilkul same** likhna. Alag-alag format Google ko confuse karta hai.

---

## 5. Realistic expectations

| Kab | Kya hoga |
|---|---|
| 1–3 din | Google pages index karna shuru karega |
| 2–4 hafte | Brand name ("Devtrica") search pe #1 |
| 2–4 mahine | Long-tail keywords pe traffic ("school management system for private schools Pakistan") |
| 6–12 mahine | High-competition keywords ("POS system Pakistan") — sirf regular content + backlinks ke sath |

Koi bhi jo kahe ki 1 mahine mein "POS system" jaise keyword pe #1 aa jaoge, wo sach nahi bol raha. Ye code aapko technically un sab se aage rakhta hai jo sirf ek plain page upload karte hain — baaki content aur backlinks ka kaam hai.

---

## 6. Launch se pehle checklist

- [ ] Domain URL sab files mein update
- [ ] `.htaccess` upload hui (hidden files dikhana on karke check)
- [ ] HTTPS/SSL active hai
- [ ] `https://aapka-domain.com/sitemap.xml` browser mein khul raha hai
- [ ] `https://aapka-domain.com/robots.txt` khul raha hai
- [ ] WhatsApp number sahi hai (abhi `923140409219`)
- [ ] Email address sahi hai (abhi `info@devtricaaislotutions.com` — change karo agar alag hai)
- [ ] [Rich Results Test](https://search.google.com/test/rich-results) pass
- [ ] [PageSpeed Insights](https://pagespeed.web.dev) — mobile score check
- [ ] [Mobile-Friendly check](https://search.google.com/test/mobile-friendly)
- [ ] Real iPhone aur Android pe khol ke dekho
- [ ] Search Console mein sitemap submit
