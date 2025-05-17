# GeriApp 5.3.5 – Plně funkční verze

Tato verze aplikace GeriApp obsahuje:
- ✅ Export návrhu do `.jpg` (pomocí `html2canvas`)
- ✅ Export návrhu do `.pdf` (pomocí `jspdf`)
- ✅ Převod obrázků na SVG (černobílý obrys) pomocí knihovny `@zardoy/wasm-potrace`
- ✅ Plně responzivní design s tmavým režimem a ikonami
- ✅ UI založené na moderním, minimalistickém stylu, hlavní barva dle vzoru
- ✅ Napojení na Firebase pro správu návrhů (Galerie, Uložení, Smazání)
- ✅ Možnost sdílení, tisku i správy návrhů
- ✅ Kompatibilita s Vercel + GitHub

## Struktura projektu
```
src/
├── components/
│   ├── DesignExport.js
│   ├── VectorizeImage.js
│   ├── Gallery.js
│   └── ...
├── App.js
├── index.js
└── ...
.env           # Konfigurační proměnné pro Firebase
package.json   # Závislosti a metadata projektu
README.md      # Tento soubor
```

## Instalace

1. Klonuj repozitář nebo rozbal balíček:
```bash
git clone https://github.com/uživatel/geriapp.git
cd geriapp
```

2. Nainstaluj závislosti:
```bash
npm install
```

3. Spusť aplikaci:
```bash
npm start
```

## Build a nasazení

Pro nasazení na [Vercel](https://vercel.com):

- Vytvoř nový projekt z této složky
- Nahraj `.env` soubor s platnou konfigurací Firebase
- Vercel automaticky detekuje a použije `npm run build`

## Důležité knihovny

- `@zardoy/wasm-potrace` – převod obrázků na vektorové SVG
- `html2canvas` – export do JPG
- `jspdf` – export do PDF
- `react-router-dom`, `lucide-react`, `tailwindcss` – stylování a navigace

---

**Verze:** 5.3.5  
**Datum:** květen 2025  
**Autor:** Oťas & GeriApp Dev