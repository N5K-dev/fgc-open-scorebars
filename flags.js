/**
 * FGC Open Scorebars — Offline Vector SVG Flag Catalog
 * 110+ crisp 30x20 vector SVG flags (100% offline, zero external requests):
 *   - 19 Spanish Autonomous Communities & Cities (CCAA)
 *   - 29 European Countries + 11 European Regions/Nations
 *   - USA + 21 Key US FGC States + Washington D.C. + Puerto Rico
 *   - 30+ Global FGC Nations (+ Quebec)
 */
(function (global) {
  'use strict';

  const FLAG_CATALOG = [
    // =========================================================================
    // 1. SPAIN — AUTONOMOUS COMMUNITIES & CITIES (19)
    // =========================================================================
    {
      code: 'ES-AN', name: 'Andalusia', cat: 'es_ccaa', aliases: 'sevilla malaga granada cadiz cordoba huelva jaen almeria andalucia',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#007a33"/><rect y="6.67" width="30" height="6.66" fill="#fff"/><circle cx="15" cy="10" r="2.6" fill="#f5c518" stroke="#007a33" stroke-width="0.7"/><rect x="13.9" y="8.6" width="2.2" height="2.8" rx="0.5" fill="#007a33"/></svg>`
    },
    {
      code: 'ES-AR', name: 'Aragon', cat: 'es_ccaa', aliases: 'zaragoza huesca teruel aragon',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#fcdd09"/><g fill="#da121a"><rect y="2.22" width="30" height="2.22"/><rect y="6.67" width="30" height="2.22"/><rect y="11.11" width="30" height="2.22"/><rect y="15.56" width="30" height="2.22"/></g><rect x="7" y="5.5" width="5.5" height="8" rx="1.2" fill="#f5c518" stroke="#8a1010" stroke-width="0.8"/><rect x="8" y="6.5" width="3.5" height="6" fill="#da121a"/><rect x="8" y="6.5" width="1.7" height="3" fill="#0057b7"/></svg>`
    },
    {
      code: 'ES-AS', name: 'Asturias', cat: 'es_ccaa', aliases: 'oviedo gijon aviles asturias',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#0066cc"/><g fill="#f5c518"><rect x="11.1" y="3.5" width="1.8" height="13"/><rect x="7" y="7.4" width="10" height="1.8"/><circle cx="12" cy="8.3" r="1.4" fill="#fff" stroke="#f5c518" stroke-width="0.6"/><circle cx="9.2" cy="11.6" r="0.9"/><circle cx="14.8" cy="11.6" r="0.9"/></g></svg>`
    },
    {
      code: 'ES-IB', name: 'Balearic Islands', cat: 'es_ccaa', aliases: 'mallorca menorca ibiza palma balears baleares',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#fcdd09"/><g fill="#da121a"><rect y="2.22" width="30" height="2.22"/><rect y="6.67" width="30" height="2.22"/><rect y="11.11" width="30" height="2.22"/><rect y="15.56" width="30" height="2.22"/></g><rect width="12.5" height="10" fill="#5e2a84"/><path d="M2.2 8.2V5.4h1.3V6.3h1.2V4.5h1.5V6.3h1.2V4.5h1.5V6.3h1.2V5.4h1.2v2.8z" fill="#fff"/></svg>`
    },
    {
      code: 'ES-CN', name: 'Canary Islands', cat: 'es_ccaa', aliases: 'tenerife gran canaria las palmas lanzarote canarias',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="10" height="20" fill="#fff"/><rect x="10" width="10" height="20" fill="#0768a9"/><rect x="20" width="10" height="20" fill="#ffcc00"/><rect x="12.6" y="6.6" width="4.8" height="6.6" rx="1.2" fill="#008ad0" stroke="#f5c518" stroke-width="0.9"/><g fill="#fff"><circle cx="14" cy="8.5" r="0.55"/><circle cx="16" cy="8.5" r="0.55"/><circle cx="15" cy="10" r="0.55"/><circle cx="13.8" cy="11.4" r="0.55"/><circle cx="16.2" cy="11.4" r="0.55"/></g></svg>`
    },
    {
      code: 'ES-CB', name: 'Cantabria', cat: 'es_ccaa', aliases: 'santander torrelavega cantabria',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="10" fill="#fff"/><rect y="10" width="30" height="10" fill="#d52b1e"/><path d="M12.2 6.2h5.6v5c0 1.8-2.8 3-2.8 3s-2.8-1.2-2.8-3z" fill="#0066b3" stroke="#f5c518" stroke-width="0.9"/><rect x="12.7" y="10" width="4.6" height="2.4" fill="#d52b1e"/><circle cx="15" cy="8.2" r="1.1" fill="#f5c518"/></svg>`
    },
    {
      code: 'ES-CM', name: 'Castilla-La Mancha', cat: 'es_ccaa', aliases: 'toledo albacete ciudad real cuenca guadalajara mancha',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="15" height="20" fill="#8c1428"/><rect x="15" width="15" height="20" fill="#fff"/><path d="M4.2 14.2V8h1.8v1.4h1.2V6.8h1.6v2.6h1.2V8h1.8v6.2z" fill="#f5c518"/><rect x="6.9" y="11" width="1.2" height="3.2" fill="#0057b7"/></svg>`
    },
    {
      code: 'ES-CL', name: 'Castile and León', cat: 'es_ccaa', aliases: 'valladolid salamanca burgos leon segovia avila zamora soria palencia',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="15" height="10" fill="#a61c2e"/><rect x="15" width="15" height="10" fill="#fff"/><rect y="10" width="15" height="10" fill="#fff"/><rect x="15" y="10" width="15" height="10" fill="#a61c2e"/><path d="M4.5 7.8V3.6h1.3v1h1.1V2.6h1.2v2h1.1v-1h1.3v4.2z" fill="#f5c518"/><path d="M19.5 17.8v-4.2h1.3v1h1.1v-2h1.2v2h1.1v-1h1.3v4.2z" fill="#f5c518"/><circle cx="22.5" cy="5.2" r="2.6" fill="#8e1b66"/><circle cx="7.5" cy="15.2" r="2.6" fill="#8e1b66"/></svg>`
    },
    {
      code: 'ES-CT', name: 'Catalonia', cat: 'es_ccaa', aliases: 'barcelona girona tarragona lleida catalunya senyera cataluna',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#fcdd09"/><g fill="#da121a"><rect y="2.22" width="30" height="2.22"/><rect y="6.67" width="30" height="2.22"/><rect y="11.11" width="30" height="2.22"/><rect y="15.56" width="30" height="2.22"/></g></svg>`
    },
    {
      code: 'ES-VC', name: 'Valencian Community', cat: 'es_ccaa', aliases: 'valencia alicante castellon elche valenciana',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#fcdd09"/><g fill="#da121a"><rect y="2.22" width="30" height="2.22"/><rect y="6.67" width="30" height="2.22"/><rect y="11.11" width="30" height="2.22"/><rect y="15.56" width="30" height="2.22"/></g><rect width="7.2" height="20" fill="#0051a5"/><path d="M1.4 6.5L2.4 9.5L3.6 7L4.8 9.5L5.8 6.5V13.5H1.4Z" fill="#f5c518"/><rect x="1.4" y="13.5" width="4.4" height="1.3" fill="#da121a"/></svg>`
    },
    {
      code: 'ES-EX', name: 'Extremadura', cat: 'es_ccaa', aliases: 'badajoz caceres merida extremadura',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="6.67" fill="#00ab39"/><rect y="6.67" width="30" height="6.66" fill="#fff"/><rect y="13.33" width="30" height="6.67" fill="#111"/><rect x="7.5" y="6.4" width="4.8" height="7" rx="1" fill="#f5c518" stroke="#8a1010" stroke-width="0.7"/><rect x="8.3" y="7.2" width="3.2" height="2.6" fill="#c8102e"/><rect x="8.3" y="10" width="3.2" height="2.6" fill="#0066cc"/></svg>`
    },
    {
      code: 'ES-GA', name: 'Galicia', cat: 'es_ccaa', aliases: 'vigo coruna santiago lugo ourense pontevedra galiza galicia',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#fff"/><polygon points="0,0 5.5,0 30,16.4 30,20 24.5,20 0,3.6" fill="#0099cc"/><rect x="12.5" y="6.6" width="5" height="6.6" rx="1.2" fill="#0066b3" stroke="#f5c518" stroke-width="0.9"/><path d="M13.7 8.4h2.6l-1.3 2.5z" fill="#f5c518"/><rect x="14.5" y="10.8" width="1" height="1.6" fill="#f5c518"/></svg>`
    },
    {
      code: 'ES-MD', name: 'Madrid', cat: 'es_ccaa', aliases: 'madrid madriz getafe alcala leganes mostoles',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#c60b1e"/><g fill="#fff"><polygon points="6,4.2 6.6,6 8.5,6 7,7.1 7.5,8.9 6,7.8 4.5,8.9 5,7.1 3.5,6 5.4,6"/><polygon points="12,4.2 12.6,6 14.5,6 13,7.1 13.5,8.9 12,7.8 10.5,8.9 11,7.1 9.5,6 11.4,6"/><polygon points="18,4.2 18.6,6 20.5,6 19,7.1 19.5,8.9 18,7.8 16.5,8.9 17,7.1 15.5,6 17.4,6"/><polygon points="24,4.2 24.6,6 26.5,6 25,7.1 25.5,8.9 24,7.8 22.5,8.9 23,7.1 21.5,6 23.4,6"/><polygon points="9,11.2 9.6,13 11.5,13 10,14.1 10.5,15.9 9,14.8 7.5,15.9 8,14.1 6.5,13 8.4,13"/><polygon points="15,11.2 15.6,13 17.5,13 16,14.1 16.5,15.9 15,14.8 13.5,15.9 14,14.1 12.5,13 14.4,13"/><polygon points="21,11.2 21.6,13 23.5,13 22,14.1 22.5,15.9 21,14.8 19.5,15.9 20,14.1 18.5,13 20.4,13"/></g></svg>`
    },
    {
      code: 'ES-MC', name: 'Murcia', cat: 'es_ccaa', aliases: 'murcia cartagena lorca',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#9b1b30"/><g fill="#f5c518"><rect x="3" y="2.4" width="2.4" height="2.4"/><rect x="7" y="2.4" width="2.4" height="2.4"/><rect x="3" y="6.2" width="2.4" height="2.4"/><rect x="7" y="6.2" width="2.4" height="2.4"/><circle cx="21" cy="12" r="0.9"/><circle cx="24" cy="12" r="0.9"/><circle cx="27" cy="12" r="0.9"/><circle cx="22.5" cy="14.5" r="0.9"/><circle cx="25.5" cy="14.5" r="0.9"/><circle cx="21" cy="17" r="0.9"/><circle cx="24" cy="17" r="0.9"/></g></svg>`
    },
    {
      code: 'ES-NC', name: 'Navarre', cat: 'es_ccaa', aliases: 'pamplona iruna tudela navarra nafarroa',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#d81e05"/><rect x="11.2" y="6.2" width="7.6" height="8.6" rx="1.6" fill="#c41200" stroke="#f5c518" stroke-width="1"/><path d="M12 7l6 7M18 7l-6 7M15 6.8v7.4M11.8 10.5h6.4" stroke="#f5c518" stroke-width="0.9"/><circle cx="15" cy="10.5" r="1.2" fill="#009b48"/><rect x="12.5" y="4.2" width="5" height="1.8" rx="0.5" fill="#f5c518"/></svg>`
    },
    {
      code: 'ES-PV', name: 'Basque Country', cat: 'es_ccaa', aliases: 'bilbao donostia san sebastian vitoria gasteiz euskadi ikurrina vasco',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#d52b1e"/><path d="M0 0L30 20M30 0L0 20" stroke="#009b48" stroke-width="3.6"/><path d="M15 0V20M0 10H30" stroke="#fff" stroke-width="3.6"/></svg>`
    },
    {
      code: 'ES-RI', name: 'La Rioja', cat: 'es_ccaa', aliases: 'logrono calahorra haro rioja',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="5" fill="#e03a00"/><rect y="5" width="30" height="5" fill="#fff"/><rect y="10" width="30" height="5" fill="#009b3a"/><rect y="15" width="30" height="5" fill="#ffd700"/></svg>`
    },
    {
      code: 'ES-CE', name: 'Ceuta', cat: 'es_ccaa', aliases: 'ceuta',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#fff"/><g fill="#111"><polygon points="0,0 15,0 15,10"/><polygon points="30,0 30,10 15,10"/><polygon points="30,20 15,20 15,10"/><polygon points="0,20 0,10 15,10"/></g><rect x="12.5" y="6.8" width="5" height="6.4" rx="1" fill="#c8102e" stroke="#f5c518" stroke-width="0.9"/><rect x="13.5" y="8" width="3" height="4" fill="#fff"/></svg>`
    },
    {
      code: 'ES-ML', name: 'Melilla', cat: 'es_ccaa', aliases: 'melilla',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#0066b3"/><rect x="12" y="5.8" width="6" height="8.2" rx="1.2" fill="#004a8f" stroke="#f5c518" stroke-width="1"/><rect x="9.8" y="6.8" width="1.2" height="6.4" fill="#fff"/><rect x="19" y="6.8" width="1.2" height="6.4" fill="#fff"/><circle cx="15" cy="9.9" r="1.6" fill="#f5c518"/></svg>`
    },

    // =========================================================================
    // 2. EUROPE — COUNTRIES & REGIONS (40)
    // =========================================================================
    {
      code: 'ES', name: 'Spain', cat: 'europe', aliases: 'spain espana esp',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#aa151b"/><rect y="5" width="30" height="10" fill="#f1bf00"/><rect x="6" y="7" width="4" height="6" rx="1" fill="#aa151b"/></svg>`
    },
    {
      code: 'EU', name: 'European Union', cat: 'europe', aliases: 'europa europe eu',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#003399"/><circle cx="15" cy="10" r="5.5" fill="none" stroke="#ffcc00" stroke-width="1.6" stroke-dasharray="1.4 1.5"/></svg>`
    },
    {
      code: 'FR', name: 'France', cat: 'europe', aliases: 'france francia paris lyon',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="10" height="20" fill="#002395"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#ed2939"/></svg>`
    },
    {
      code: 'GB', name: 'United Kingdom', cat: 'europe', aliases: 'uk united kingdom britain gran bretana londres',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#012169"/><path d="M0 0L30 20M30 0L0 20" stroke="#fff" stroke-width="4"/><path d="M0 0L30 20M30 0L0 20" stroke="#c8102e" stroke-width="2"/><path d="M15 0V20M0 10H30" stroke="#fff" stroke-width="6"/><path d="M15 0V20M0 10H30" stroke="#c8102e" stroke-width="3.2"/></svg>`
    },
    {
      code: 'DE', name: 'Germany', cat: 'europe', aliases: 'germany alemania berlin munich',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="6.7" fill="#000"/><rect y="6.7" width="30" height="6.7" fill="#dd0000"/><rect y="13.3" width="30" height="6.7" fill="#ffce00"/></svg>`
    },
    {
      code: 'IT', name: 'Italy', cat: 'europe', aliases: 'italy italia roma milan',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="10" height="20" fill="#009246"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#ce2b37"/></svg>`
    },
    {
      code: 'PT', name: 'Portugal', cat: 'europe', aliases: 'portugal lisboa oporto',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="12" height="20" fill="#006600"/><rect x="12" width="18" height="20" fill="#ff0000"/><circle cx="12" cy="10" r="4" fill="#ff0" stroke="#b91c1c" stroke-width="1"/></svg>`
    },
    {
      code: 'NL', name: 'Netherlands', cat: 'europe', aliases: 'netherlands holland holanda amsterdam',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="6.7" fill="#ae1c28"/><rect y="6.7" width="30" height="6.6" fill="#fff"/><rect y="13.3" width="30" height="6.7" fill="#21468b"/></svg>`
    },
    {
      code: 'BE', name: 'Belgium', cat: 'europe', aliases: 'belgium belgica bruselas',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="10" height="20" fill="#111"/><rect x="10" width="10" height="20" fill="#fae042"/><rect x="20" width="10" height="20" fill="#ed2939"/></svg>`
    },
    {
      code: 'CH', name: 'Switzerland', cat: 'europe', aliases: 'switzerland suiza zurich',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#d52b1e"/><rect x="13" y="4.5" width="4" height="11" fill="#fff"/><rect x="9.5" y="8" width="11" height="4" fill="#fff"/></svg>`
    },
    {
      code: 'AT', name: 'Austria', cat: 'europe', aliases: 'austria viena',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="6.7" fill="#ed2939"/><rect y="6.7" width="30" height="6.6" fill="#fff"/><rect y="13.3" width="30" height="6.7" fill="#ed2939"/></svg>`
    },
    {
      code: 'IE', name: 'Ireland', cat: 'europe', aliases: 'ireland irlanda dublin',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="10" height="20" fill="#169b62"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#ff883e"/></svg>`
    },
    {
      code: 'SE', name: 'Sweden', cat: 'europe', aliases: 'sweden suecia estocolmo',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#006aa7"/><rect x="8" width="4" height="20" fill="#fecc00"/><rect y="8" width="30" height="4" fill="#fecc00"/></svg>`
    },
    {
      code: 'NO', name: 'Norway', cat: 'europe', aliases: 'norway noruega oslo',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#ba0c2f"/><rect x="7" width="5" height="20" fill="#fff"/><rect y="7.5" width="30" height="5" fill="#fff"/><rect x="8.2" width="2.6" height="20" fill="#00205b"/><rect y="8.7" width="30" height="2.6" fill="#00205b"/></svg>`
    },
    {
      code: 'FI', name: 'Finland', cat: 'europe', aliases: 'finland finlandia helsinki',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#fff"/><rect x="8" width="4.5" height="20" fill="#003580"/><rect y="7.7" width="30" height="4.5" fill="#003580"/></svg>`
    },
    {
      code: 'DK', name: 'Denmark', cat: 'europe', aliases: 'denmark dinamarca copenhague',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#c60c30"/><rect x="8.5" width="3.5" height="20" fill="#fff"/><rect y="8.2" width="30" height="3.5" fill="#fff"/></svg>`
    },
    {
      code: 'PL', name: 'Poland', cat: 'europe', aliases: 'poland polonia varsovia',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="10" fill="#fff"/><rect y="10" width="30" height="10" fill="#dc143c"/></svg>`
    },
    {
      code: 'CZ', name: 'Czech Republic', cat: 'europe', aliases: 'czechia checa praga',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="10" fill="#fff"/><rect y="10" width="30" height="10" fill="#d7141a"/><polygon points="0,0 14,10 0,20" fill="#11457e"/></svg>`
    },
    {
      code: 'GR', name: 'Greece', cat: 'europe', aliases: 'greece grecia atenas',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#0d5eaf"/><g fill="#fff"><rect y="2.2" width="30" height="2.2"/><rect y="6.6" width="30" height="2.2"/><rect y="11" width="30" height="2.2"/><rect y="15.5" width="30" height="2.2"/></g><rect width="11" height="11" fill="#0d5eaf"/><rect x="4.5" width="2" height="11" fill="#fff"/><rect y="4.5" width="11" height="2" fill="#fff"/></svg>`
    },
    {
      code: 'HU', name: 'Hungary', cat: 'europe', aliases: 'hungary hungria budapest',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="6.7" fill="#ce2939"/><rect y="6.7" width="30" height="6.6" fill="#fff"/><rect y="13.3" width="30" height="6.7" fill="#477050"/></svg>`
    },
    {
      code: 'RO', name: 'Romania', cat: 'europe', aliases: 'romania rumania bucarest',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="10" height="20" fill="#002b7f"/><rect x="10" width="10" height="20" fill="#fcd116"/><rect x="20" width="10" height="20" fill="#ce1126"/></svg>`
    },
    {
      code: 'UA', name: 'Ukraine', cat: 'europe', aliases: 'ukraine ucrania kiev',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="10" fill="#0057b7"/><rect y="10" width="30" height="10" fill="#ffd700"/></svg>`
    },
    {
      code: 'HR', name: 'Croatia', cat: 'europe', aliases: 'croatia croacia zagreb',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="6.7" fill="#ff0000"/><rect y="6.7" width="30" height="6.6" fill="#fff"/><rect y="13.3" width="30" height="6.7" fill="#171796"/><rect x="12.5" y="7" width="5" height="6" fill="#ff0000" stroke="#fff" stroke-width="0.6"/></svg>`
    },
    {
      code: 'RS', name: 'Serbia', cat: 'europe', aliases: 'serbia belgrado',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="6.7" fill="#c6363c"/><rect y="6.7" width="30" height="6.6" fill="#0c4076"/><rect y="13.3" width="30" height="6.7" fill="#fff"/><rect x="8" y="6.5" width="4" height="6.5" rx="1" fill="#f5c518"/></svg>`
    },
    {
      code: 'BG', name: 'Bulgaria', cat: 'europe', aliases: 'bulgaria sofia',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="6.7" fill="#fff"/><rect y="6.7" width="30" height="6.6" fill="#00966e"/><rect y="13.3" width="30" height="6.7" fill="#d62612"/></svg>`
    },
    {
      code: 'SK', name: 'Slovakia', cat: 'europe', aliases: 'slovakia eslovaquia bratislava',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="6.7" fill="#fff"/><rect y="6.7" width="30" height="6.6" fill="#0b4ea2"/><rect y="13.3" width="30" height="6.7" fill="#ee1c25"/><rect x="7.5" y="6.8" width="4.4" height="6" rx="1" fill="#ee1c25" stroke="#fff" stroke-width="0.7"/></svg>`
    },
    {
      code: 'IS', name: 'Iceland', cat: 'europe', aliases: 'iceland islandia reikiavik',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#02529c"/><rect x="7" width="5" height="20" fill="#fff"/><rect y="7.5" width="30" height="5" fill="#fff"/><rect x="8.2" width="2.6" height="20" fill="#dc1e35"/><rect y="8.7" width="30" height="2.6" fill="#dc1e35"/></svg>`
    },
    {
      code: 'LU', name: 'Luxembourg', cat: 'europe', aliases: 'luxembourg luxemburgo',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="6.7" fill="#ef3340"/><rect y="6.7" width="30" height="6.6" fill="#fff"/><rect y="13.3" width="30" height="6.7" fill="#00a3e0"/></svg>`
    },
    {
      code: 'TR', name: 'Turkey', cat: 'europe', aliases: 'turkey turkiye turquia estambul',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#e30a17"/><circle cx="12" cy="10" r="4.8" fill="#fff"/><circle cx="13.4" cy="10" r="3.9" fill="#e30a17"/><polygon points="18.2,7.8 18.8,9.5 20.6,9.5 19.2,10.5 19.7,12.2 18.2,11.2 16.7,12.2 17.2,10.5 15.8,9.5 17.6,9.5" fill="#fff"/></svg>`
    },
    // --- European Regions & Constituent Nations ---
    {
      code: 'GB-ENG', name: 'England', cat: 'europe', aliases: 'england inglaterra london manchester uk',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#fff"/><rect x="13" width="4" height="20" fill="#ce1124"/><rect y="8" width="30" height="4" fill="#ce1124"/></svg>`
    },
    {
      code: 'GB-SCT', name: 'Scotland', cat: 'europe', aliases: 'scotland escocia edinburgh glasgow uk',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#005eb8"/><path d="M0 0L30 20M30 0L0 20" stroke="#fff" stroke-width="3.6"/></svg>`
    },
    {
      code: 'GB-WLS', name: 'Wales', cat: 'europe', aliases: 'wales gales cardiff cymru uk',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="10" fill="#fff"/><rect y="10" width="30" height="10" fill="#00ab39"/><path d="M9 13.5c1-2.5 3.5-5.5 6.5-5.5 2.5 0 4.5 1.5 5.5 3.2-1.5 0.5-2.5 2-4 2.8-2 1-5.5 1.2-8-0.5z" fill="#d30731"/><circle cx="10.5" cy="9.2" r="1.4" fill="#d30731"/></svg>`
    },
    {
      code: 'GB-NIR', name: 'Northern Ireland', cat: 'europe', aliases: 'northern ireland belfast ulster uk',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#fff"/><rect x="13" width="4" height="20" fill="#ce1124"/><rect y="8" width="30" height="4" fill="#ce1124"/><polygon points="15,6 17.5,8.5 17.5,11.5 15,14 12.5,11.5 12.5,8.5" fill="#fff"/><circle cx="15" cy="10" r="1.5" fill="#ce1124"/></svg>`
    },
    {
      code: 'DE-BY', name: 'Bavaria (DE)', cat: 'europe', aliases: 'bavaria bayern baviera munich alemania',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="10" fill="#fff"/><rect y="10" width="30" height="10" fill="#0098d4"/><g fill="#0098d4"><polygon points="0,0 6,0 3,5"/><polygon points="12,0 18,0 15,5"/><polygon points="24,0 30,0 27,5"/></g><g fill="#fff"><polygon points="6,10 12,10 9,15"/><polygon points="18,10 24,10 21,15"/></g></svg>`
    },
    {
      code: 'FR-BRE', name: 'Brittany (FR)', cat: 'europe', aliases: 'brittany bretagne bretana rennes francia',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#fff"/><g fill="#111"><rect width="30" height="2.22"/><rect y="4.44" width="30" height="2.22"/><rect y="8.88" width="30" height="2.22"/><rect y="13.33" width="30" height="2.22"/><rect y="17.78" width="30" height="2.22"/></g><rect width="12.5" height="11.1" fill="#fff"/><g fill="#111"><circle cx="3" cy="3" r="1"/><circle cx="6.5" cy="3" r="1"/><circle cx="10" cy="3" r="1"/><circle cx="4.8" cy="6.2" r="1"/><circle cx="8.3" cy="6.2" r="1"/><circle cx="3" cy="9" r="1"/><circle cx="6.5" cy="9" r="1"/><circle cx="10" cy="9" r="1"/></g></svg>`
    },
    {
      code: 'FR-20R', name: 'Corsica (FR)', cat: 'europe', aliases: 'corsica corse corcega francia',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#fff"/><circle cx="15" cy="10.2" r="5.2" fill="#111"/><rect x="10" y="6.8" width="10" height="1.8" fill="#fff"/><rect x="14" y="14.5" width="3.5" height="3.2" fill="#111"/></svg>`
    },
    {
      code: 'IT-82', name: 'Sicily (IT)', cat: 'europe', aliases: 'sicily sicilia palermo italia',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><polygon points="0,0 30,0 30,20" fill="#da121a"/><polygon points="0,0 0,20 30,20" fill="#fcdd09"/><circle cx="15" cy="10" r="2.8" fill="#f5c518" stroke="#7c2d12" stroke-width="0.9"/></svg>`
    },
    {
      code: 'IT-88', name: 'Sardinia (IT)', cat: 'europe', aliases: 'sardinia sardegna cerdena italia',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#fff"/><rect x="13.2" width="3.6" height="20" fill="#ce1124"/><rect y="8.2" width="30" height="3.6" fill="#ce1124"/><g fill="#111"><circle cx="6.6" cy="4.2" r="2.2"/><circle cx="23.4" cy="4.2" r="2.2"/><circle cx="6.6" cy="15.8" r="2.2"/><circle cx="23.4" cy="15.8" r="2.2"/></g></svg>`
    },
    {
      code: 'BE-VLG', name: 'Flanders (BE)', cat: 'europe', aliases: 'flanders flandes vlaanderen belgica',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#fdda24"/><path d="M10 15.5L12 10L10.5 6.5L14 5L18.5 7.5L17 11.5L19.5 15.5H15.5L14 12.5L12.5 15.5Z" fill="#111"/><circle cx="13.5" cy="7" r="0.8" fill="#ef3340"/></svg>`
    },
    {
      code: 'BE-WAL', name: 'Wallonia (BE)', cat: 'europe', aliases: 'wallonia valonia wallonie belgica',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#fdda24"/><path d="M10.5 15L12.5 10.5L10.5 7L14.5 5.5L18 8L19.5 13.5L15.5 15.5Z" fill="#d52b1e"/></svg>`
    },

    // =========================================================================
    // 3. UNITED STATES — NATIONAL + KEY FGC STATES (23)
    // =========================================================================
    {
      code: 'US', name: 'United States', cat: 'usa', aliases: 'usa america united states eeuu',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#b22234"/><g fill="#fff"><rect y="2.2" width="30" height="1.6"/><rect y="5.4" width="30" height="1.6"/><rect y="8.6" width="30" height="1.6"/><rect y="11.8" width="30" height="1.6"/><rect y="15" width="30" height="1.6"/><rect y="18.2" width="30" height="1.6"/></g><rect width="13" height="10.5" fill="#3c3b6e"/><g fill="#fff"><circle cx="3" cy="2.5" r=".7"/><circle cx="6.5" cy="2.5" r=".7"/><circle cx="10" cy="2.5" r=".7"/><circle cx="4.8" cy="5.2" r=".7"/><circle cx="8.3" cy="5.2" r=".7"/><circle cx="3" cy="8" r=".7"/><circle cx="6.5" cy="8" r=".7"/><circle cx="10" cy="8" r=".7"/></g></svg>`
    },
    {
      code: 'US-CA', name: 'California (CA)', cat: 'usa', aliases: 'california socal norcal los angeles san francisco usa',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#fff"/><rect y="16.2" width="30" height="3.8" fill="#b71234"/><polygon points="5.2,2.4 5.8,4.2 7.6,4.2 6.1,5.3 6.7,7.1 5.2,6 3.7,7.1 4.3,5.3 2.8,4.2 4.6,4.2" fill="#b71234"/><ellipse cx="16.5" cy="11" rx="5.6" ry="3" fill="#6b4423"/><rect x="11.6" y="12.2" width="1.8" height="2.6" fill="#6b4423"/><rect x="19.2" y="12.2" width="1.8" height="2.6" fill="#6b4423"/><rect x="10.5" y="14.4" width="12" height="1.4" fill="#00843d"/></svg>`
    },
    {
      code: 'US-TX', name: 'Texas (TX)', cat: 'usa', aliases: 'texas dallas houston austin lone star usa',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="10" height="20" fill="#002868"/><rect x="10" width="20" height="10" fill="#fff"/><rect x="10" y="10" width="20" height="10" fill="#bf0a30"/><polygon points="5,6.2 5.9,8.9 8.8,8.9 6.5,10.6 7.4,13.4 5,11.7 2.6,13.4 3.5,10.6 1.2,8.9 4.1,8.9" fill="#fff"/></svg>`
    },
    {
      code: 'US-NY', name: 'New York (NY)', cat: 'usa', aliases: 'new york nyc nueva york east coast usa',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#002d72"/><circle cx="15" cy="10" r="5" fill="#f5c518" stroke="#fff" stroke-width="0.9"/><rect x="12.5" y="7.5" width="5" height="5" rx="1" fill="#38bdf8"/><path d="M10 15.2h10" stroke="#fff" stroke-width="1.3"/></svg>`
    },
    {
      code: 'US-FL', name: 'Florida (FL)', cat: 'usa', aliases: 'florida miami orlando ceo usa',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#fff"/><path d="M0 0L30 20M30 0L0 20" stroke="#c8102e" stroke-width="3.2"/><circle cx="15" cy="10" r="4.2" fill="#f5c518" stroke="#0066b3" stroke-width="1"/><circle cx="15" cy="10" r="2.2" fill="#16a34a"/></svg>`
    },
    {
      code: 'US-IL', name: 'Illinois (IL)', cat: 'usa', aliases: 'illinois chicago midwest combo breaker usa',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#fff"/><circle cx="15" cy="9.2" r="4.8" fill="#f5c518" stroke="#002868" stroke-width="0.9"/><path d="M11.5 9.2h7l-3.5 3.6z" fill="#6b4423"/><rect x="10" y="15.2" width="10" height="2" rx="0.8" fill="#002868"/></svg>`
    },
    {
      code: 'US-NV', name: 'Nevada / EVO (NV)', cat: 'usa', aliases: 'nevada las vegas evo reno usa',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#0038a8"/><polygon points="7,4.2 7.8,6.5 10.2,6.5 8.2,7.9 9,10.2 7,8.8 5,10.2 5.8,7.9 3.8,6.5 6.2,6.5" fill="#e2e8f0"/><path d="M3.2 9.8Q7 12.6 10.8 9.8" stroke="#f5c518" stroke-width="1.2" fill="none"/></svg>`
    },
    {
      code: 'US-GA', name: 'Georgia (GA)', cat: 'usa', aliases: 'georgia atlanta dreamhack usa',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="6.7" fill="#bf0a30"/><rect y="6.7" width="30" height="6.6" fill="#fff"/><rect y="13.3" width="30" height="6.7" fill="#bf0a30"/><rect width="12" height="13.3" fill="#002868"/><circle cx="6" cy="6.6" r="3.6" fill="none" stroke="#fff" stroke-width="1.1" stroke-dasharray="1.2 1.2"/><rect x="4.5" y="5" width="3" height="3.2" fill="#f5c518"/></svg>`
    },
    {
      code: 'US-WA', name: 'Washington (WA)', cat: 'usa', aliases: 'washington seattle pnw usa',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#00843d"/><circle cx="15" cy="10" r="5" fill="#f5c518" stroke="#fff" stroke-width="0.9"/><circle cx="15" cy="10" r="3.1" fill="#0057b7"/><circle cx="15" cy="9.5" r="1.5" fill="#e2e8f0"/></svg>`
    },
    {
      code: 'US-NJ', name: 'New Jersey (NJ)', cat: 'usa', aliases: 'new jersey tristate usa',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#e5b96b"/><rect x="11.5" y="6" width="7" height="8" rx="1.6" fill="#0051a5" stroke="#fff" stroke-width="0.9"/><path d="M12.8 8.4h4.4M12.8 10.4h4.4M12.8 12.2h4.4" stroke="#f5c518" stroke-width="0.9"/></svg>`
    },
    {
      code: 'US-PA', name: 'Pennsylvania (PA)', cat: 'usa', aliases: 'pennsylvania philadelphia philly pittsburgh usa',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#002868"/><rect x="12" y="5.5" width="6" height="8.5" rx="1.4" fill="#f5c518" stroke="#fff" stroke-width="0.8"/><rect x="13" y="6.8" width="4" height="2.4" fill="#0077b6"/><rect x="13" y="10" width="4" height="2.6" fill="#16a34a"/><rect x="9.5" y="14.8" width="11" height="1.6" fill="#c8102e"/></svg>`
    },
    {
      code: 'US-MA', name: 'Massachusetts (MA)', cat: 'usa', aliases: 'massachusetts boston new england usa',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#fff"/><path d="M11 4.5h8v7.2c0 2.5-4 4.3-4 4.3s-4-1.8-4-4.3z" fill="#0038a8" stroke="#f5c518" stroke-width="0.9"/><circle cx="15" cy="9.5" r="2" fill="#f5c518"/></svg>`
    },
    {
      code: 'US-MI', name: 'Michigan (MI)', cat: 'usa', aliases: 'michigan detroit midwest usa',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#002f6c"/><rect x="11.8" y="6" width="6.4" height="7.6" rx="1.2" fill="#38bdf8" stroke="#f5c518" stroke-width="0.9"/><rect x="12.6" y="10.2" width="4.8" height="2.6" fill="#16a34a"/><rect x="9.5" y="14.8" width="11" height="1.5" fill="#fff"/></svg>`
    },
    {
      code: 'US-OH', name: 'Ohio (OH)', cat: 'usa', aliases: 'ohio columbus cleveland cincinnati usa',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="4" fill="#c8102e"/><rect y="4" width="30" height="4" fill="#fff"/><rect y="8" width="30" height="4" fill="#c8102e"/><rect y="12" width="30" height="4" fill="#fff"/><rect y="16" width="30" height="4" fill="#c8102e"/><polygon points="0,0 16.5,10 0,20" fill="#002868"/><circle cx="6.2" cy="10" r="3" fill="#fff"/><circle cx="6.2" cy="10" r="1.8" fill="#c8102e"/></svg>`
    },
    {
      code: 'US-MD', name: 'Maryland (MD)', cat: 'usa', aliases: 'maryland dmv baltimore xanadu usa',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="15" height="10" fill="#eab308"/><rect x="15" y="10" width="15" height="10" fill="#eab308"/><g fill="#111"><rect width="5" height="5"/><rect x="10" width="5" height="5"/><rect x="5" y="5" width="5" height="5"/><rect x="15" y="10" width="5" height="5"/><rect x="25" y="10" width="5" height="5"/><rect x="20" y="15" width="5" height="5"/></g><rect x="15" width="15" height="10" fill="#fff"/><rect x="15" width="7.5" height="5" fill="#c8102e"/><rect x="22.5" y="5" width="7.5" height="5" fill="#c8102e"/><rect y="10" width="15" height="10" fill="#fff"/><rect y="10" width="7.5" height="5" fill="#c8102e"/><rect x="7.5" y="15" width="7.5" height="5" fill="#c8102e"/></svg>`
    },
    {
      code: 'US-AZ', name: 'Arizona (AZ)', cat: 'usa', aliases: 'arizona phoenix tucson usa',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="10" fill="#fed700"/><g fill="#bf0a30"><polygon points="15,10 0,0 5,0"/><polygon points="15,10 9,0 13,0"/><polygon points="15,10 17,0 21,0"/><polygon points="15,10 25,0 30,0"/><polygon points="15,10 0,5 0,9"/><polygon points="15,10 30,5 30,9"/></g><rect y="10" width="30" height="10" fill="#002868"/><polygon points="15,5.2 16.3,9 20.3,9 17,11.3 18.2,15 15,12.7 11.8,15 13,11.3 9.7,9 13.7,9" fill="#ce5c17"/></svg>`
    },
    {
      code: 'US-CO', name: 'Colorado (CO)', cat: 'usa', aliases: 'colorado denver usa',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="6.7" fill="#002868"/><rect y="6.7" width="30" height="6.6" fill="#fff"/><rect y="13.3" width="30" height="6.7" fill="#002868"/><circle cx="11.5" cy="10" r="5.6" fill="#bf0a30"/><rect x="11.5" y="7.8" width="6.5" height="4.4" fill="#fff"/><circle cx="11.5" cy="10" r="2.8" fill="#ffd700"/></svg>`
    },
    {
      code: 'US-NC', name: 'North Carolina (NC)', cat: 'usa', aliases: 'north carolina charlotte raleigh usa',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="10" height="20" fill="#002868"/><rect x="10" width="20" height="10" fill="#bf0a30"/><rect x="10" y="10" width="20" height="10" fill="#fff"/><polygon points="5,7.2 5.7,9.2 7.8,9.2 6.1,10.4 6.7,12.4 5,11.2 3.3,12.4 3.9,10.4 2.2,9.2 4.3,9.2" fill="#fff"/><rect x="2.2" y="3.5" width="5.6" height="1.4" fill="#f5c518"/><rect x="2.2" y="15" width="5.6" height="1.4" fill="#f5c518"/></svg>`
    },
    {
      code: 'US-TN', name: 'Tennessee (TN)', cat: 'usa', aliases: 'tennessee nashville memphis kumite usa',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#cc0000"/><rect x="27" width="3" height="20" fill="#002d65"/><rect x="26" width="1" height="20" fill="#fff"/><circle cx="13.5" cy="10" r="5.6" fill="#002d65" stroke="#fff" stroke-width="1"/><g fill="#fff"><circle cx="12" cy="8.2" r="1"/><circle cx="15.5" cy="9.2" r="1"/><circle cx="12.5" cy="12" r="1"/></g></svg>`
    },
    {
      code: 'US-HI', name: 'Hawaii (HI)', cat: 'usa', aliases: 'hawaii honolulu usa',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#fff"/><rect y="2.5" width="30" height="2.5" fill="#c8102e"/><rect y="5" width="30" height="2.5" fill="#012169"/><rect y="10" width="30" height="2.5" fill="#c8102e"/><rect y="12.5" width="30" height="2.5" fill="#012169"/><rect y="17.5" width="30" height="2.5" fill="#c8102e"/><rect width="13" height="10" fill="#012169"/><path d="M0 0L13 10M13 0L0 10" stroke="#fff" stroke-width="1.8"/><path d="M6.5 0V10M0 5H13" stroke="#fff" stroke-width="3"/><path d="M6.5 0V10M0 5H13" stroke="#c8102e" stroke-width="1.5"/></svg>`
    },
    {
      code: 'US-VA', name: 'Virginia (VA)', cat: 'usa', aliases: 'virginia dmv usa',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#002868"/><circle cx="15" cy="10" r="5.2" fill="#fff" stroke="#f5c518" stroke-width="1"/><circle cx="15" cy="10" r="3.4" fill="#002868"/><circle cx="15" cy="10" r="1.7" fill="#f5c518"/></svg>`
    },
    {
      code: 'US-DC', name: 'Washington D.C.', cat: 'usa', aliases: 'dc washington dmv usa',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#fff"/><rect y="9" width="30" height="3" fill="#e81b39"/><rect y="14" width="30" height="3" fill="#e81b39"/><g fill="#e81b39"><polygon points="7.5,2.2 8.2,4.4 10.5,4.4 8.6,5.7 9.3,7.9 7.5,6.6 5.7,7.9 6.4,5.7 4.5,4.4 6.8,4.4"/><polygon points="15,2.2 15.7,4.4 18,4.4 16.1,5.7 16.8,7.9 15,6.6 13.2,7.9 13.9,5.7 12,4.4 14.3,4.4"/><polygon points="22.5,2.2 23.2,4.4 25.5,4.4 23.6,5.7 24.3,7.9 22.5,6.6 20.7,7.9 21.4,5.7 19.5,4.4 21.8,4.4"/></g></svg>`
    },
    {
      code: 'PR', name: 'Puerto Rico (PR)', cat: 'usa', aliases: 'puerto rico boricua san juan usa',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="4" fill="#ed0000"/><rect y="4" width="30" height="4" fill="#fff"/><rect y="8" width="30" height="4" fill="#ed0000"/><rect y="12" width="30" height="4" fill="#fff"/><rect y="16" width="30" height="4" fill="#ed0000"/><polygon points="0,0 14,10 0,20" fill="#0050f0"/><polygon points="4.8,7.2 5.5,9.3 7.7,9.3 5.9,10.6 6.6,12.7 4.8,11.4 3,12.7 3.7,10.6 1.9,9.3 4.1,9.3" fill="#fff"/></svg>`
    },

    // =========================================================================
    // 4. WORLD FGC NATIONS (32)
    // =========================================================================
    {
      code: 'JP', name: 'Japan', cat: 'world', aliases: 'japan japon tokyo osaka evo jp',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#fff"/><circle cx="15" cy="10" r="5.5" fill="#bc002d"/></svg>`
    },
    {
      code: 'KR', name: 'South Korea', cat: 'world', aliases: 'south korea corea seul seoul kr',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#fff"/><path d="M15 5a5 5 0 0 1 0 10 2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 0 0-5z" fill="#cd2e3a"/><path d="M15 15a5 5 0 0 1 0-10 2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 0 0 5z" fill="#0047a0"/><g stroke="#111" stroke-width="1.2"><line x1="5" y1="4" x2="9" y2="7"/><line x1="25" y1="4" x2="21" y2="7"/><line x1="5" y1="16" x2="9" y2="13"/><line x1="25" y1="16" x2="21" y2="13"/></g></svg>`
    },
    {
      code: 'PK', name: 'Pakistan', cat: 'world', aliases: 'pakistan lahore islamabad pk',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#01411c"/><rect width="8" height="20" fill="#fff"/><circle cx="19" cy="10" r="5" fill="#fff"/><circle cx="20.7" cy="9.2" r="4.3" fill="#01411c"/><polygon points="21.5,7 22.1,8.8 24,8.8 22.5,9.8 23.1,11.6 21.5,10.5 19.9,11.6 20.5,9.8 19,8.8 20.9,8.8" fill="#fff"/></svg>`
    },
    {
      code: 'CA', name: 'Canada', cat: 'world', aliases: 'canada toronto montreal vancouver',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="8" height="20" fill="#ff0000"/><rect x="8" width="14" height="20" fill="#fff"/><rect x="22" width="8" height="20" fill="#ff0000"/><polygon points="15,4 16.5,8.5 19.5,8 17.2,11 18,14 15,12.5 12,14 12.8,11 10.5,8 13.5,8.5" fill="#ff0000"/></svg>`
    },
    {
      code: 'CA-QC', name: 'Quebec (CA)', cat: 'world', aliases: 'quebec montreal canada',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#003da5"/><rect x="13" width="4" height="20" fill="#fff"/><rect y="8" width="30" height="4" fill="#fff"/><g fill="#fff"><circle cx="6.5" cy="4" r="1.7"/><circle cx="23.5" cy="4" r="1.7"/><circle cx="6.5" cy="16" r="1.7"/><circle cx="23.5" cy="16" r="1.7"/></g></svg>`
    },
    {
      code: 'MX', name: 'Mexico', cat: 'world', aliases: 'mexico cdmx monterrey guadalajara',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="10" height="20" fill="#006847"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#ce1126"/><circle cx="15" cy="10" r="2.2" fill="#7c4a1d"/></svg>`
    },
    {
      code: 'BR', name: 'Brazil', cat: 'world', aliases: 'brazil brasil sao paulo rio',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#009c3b"/><polygon points="15,2 27,10 15,18 3,10" fill="#ffdf00"/><circle cx="15" cy="10" r="4.2" fill="#002776"/><path d="M11 9.5Q15 8 19 10.8" stroke="#fff" stroke-width="1" fill="none"/></svg>`
    },
    {
      code: 'AR', name: 'Argentina', cat: 'world', aliases: 'argentina buenos aires',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="6.7" fill="#74acdf"/><rect y="6.7" width="30" height="6.6" fill="#fff"/><rect y="13.3" width="30" height="6.7" fill="#74acdf"/><circle cx="15" cy="10" r="2.1" fill="#f6b40e"/></svg>`
    },
    {
      code: 'CL', name: 'Chile', cat: 'world', aliases: 'chile santiago',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="10" fill="#fff"/><rect y="10" width="30" height="10" fill="#d52b1e"/><rect width="10" height="10" fill="#0039a6"/><polygon points="5,2.5 5.8,4.6 8,4.6 6.2,5.9 6.9,8 5,6.7 3.1,8 3.8,5.9 2,4.6 4.2,4.6" fill="#fff"/></svg>`
    },
    {
      code: 'CO', name: 'Colombia', cat: 'world', aliases: 'colombia bogota medellin',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="10" fill="#fcd116"/><rect y="10" width="30" height="5" fill="#003893"/><rect y="15" width="30" height="5" fill="#ce1126"/></svg>`
    },
    {
      code: 'PE', name: 'Peru', cat: 'world', aliases: 'peru lima',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="10" height="20" fill="#d91023"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#d91023"/></svg>`
    },
    {
      code: 'VE', name: 'Venezuela', cat: 'world', aliases: 'venezuela caracas',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="6.7" fill="#ffcc00"/><rect y="6.7" width="30" height="6.6" fill="#00247d"/><rect y="13.3" width="30" height="6.7" fill="#cf142b"/><path d="M10 11.4Q15 7.4 20 11.4" stroke="#fff" stroke-width="1.2" stroke-dasharray="1.3 1.4" fill="none"/></svg>`
    },
    {
      code: 'EC', name: 'Ecuador', cat: 'world', aliases: 'ecuador quito guayaquil',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="10" fill="#ffdd00"/><rect y="10" width="30" height="5" fill="#034ea2"/><rect y="15" width="30" height="5" fill="#ed1c24"/><circle cx="15" cy="10" r="2.2" fill="#8b5a2b" stroke="#ffdd00" stroke-width="0.6"/></svg>`
    },
    {
      code: 'UY', name: 'Uruguay', cat: 'world', aliases: 'uruguay montevideo',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#fff"/><g fill="#0038a8"><rect y="2.2" width="30" height="2.2"/><rect y="6.6" width="30" height="2.2"/><rect y="11.1" width="30" height="2.2"/><rect y="15.5" width="30" height="2.2"/></g><rect width="11" height="11" fill="#fff"/><circle cx="5.5" cy="5.5" r="2.8" fill="#fcd116"/></svg>`
    },
    {
      code: 'DO', name: 'Dominican Republic', cat: 'world', aliases: 'dominican republic dominicana santo domingo do',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="13" height="8" fill="#002d62"/><rect x="17" width="13" height="8" fill="#ce1126"/><rect y="12" width="13" height="8" fill="#ce1126"/><rect x="17" y="12" width="13" height="8" fill="#002d62"/><rect x="13" width="4" height="20" fill="#fff"/><rect y="8" width="30" height="4" fill="#fff"/><circle cx="15" cy="10" r="1.6" fill="#006633"/></svg>`
    },
    {
      code: 'CR', name: 'Costa Rica', cat: 'world', aliases: 'costa rica san jose',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="3.3" fill="#002b7f"/><rect y="3.3" width="30" height="3.3" fill="#fff"/><rect y="6.6" width="30" height="6.8" fill="#ce1126"/><rect y="13.4" width="30" height="3.3" fill="#fff"/><rect y="16.7" width="30" height="3.3" fill="#002b7f"/></svg>`
    },
    {
      code: 'AU', name: 'Australia', cat: 'world', aliases: 'australia sydney melbourne oceania',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#00008b"/><rect width="13" height="9" fill="#012169"/><path d="M0 0L13 9M13 0L0 9" stroke="#fff" stroke-width="1.6"/><path d="M6.5 0V9M0 4.5H13" stroke="#fff" stroke-width="2.6"/><path d="M6.5 0V9M0 4.5H13" stroke="#c8102e" stroke-width="1.4"/><g fill="#fff"><circle cx="22" cy="5" r="1"/><circle cx="25" cy="9" r="1"/><circle cx="21" cy="12" r="1"/><circle cx="23" cy="16" r="1.2"/><circle cx="7" cy="14" r="1.6"/></g></svg>`
    },
    {
      code: 'NZ', name: 'New Zealand', cat: 'world', aliases: 'new zealand nueva zelanda auckland oceania',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#00247d"/><rect width="13" height="9" fill="#012169"/><path d="M0 0L13 9M13 0L0 9" stroke="#fff" stroke-width="1.5"/><path d="M6.5 0V9M0 4.5H13" stroke="#fff" stroke-width="2.4"/><path d="M6.5 0V9M0 4.5H13" stroke="#c8102e" stroke-width="1.3"/><g fill="#cc142b" stroke="#fff" stroke-width="0.4"><circle cx="22.5" cy="4.5" r="1.1"/><circle cx="25.5" cy="9" r="1.1"/><circle cx="20" cy="9.5" r="1.1"/><circle cx="22.5" cy="15.5" r="1.3"/></g></svg>`
    },
    {
      code: 'PH', name: 'Philippines', cat: 'world', aliases: 'philippines filipinas manila rev major',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="10" fill="#0038a8"/><rect y="10" width="30" height="10" fill="#ce1126"/><polygon points="0,0 13,10 0,20" fill="#fff"/><circle cx="4.5" cy="10" r="2.2" fill="#fcd116"/></svg>`
    },
    {
      code: 'ID', name: 'Indonesia', cat: 'world', aliases: 'indonesia yakarta jakarta',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="10" fill="#ce1126"/><rect y="10" width="30" height="10" fill="#fff"/></svg>`
    },
    {
      code: 'HK', name: 'Hong Kong', cat: 'world', aliases: 'hong kong hk',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#de2910"/><circle cx="15" cy="10" r="4.5" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="3 2.6"/></svg>`
    },
    {
      code: 'TW', name: 'Taiwan', cat: 'world', aliases: 'taiwan taipei tw',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#fe0000"/><rect width="14" height="10" fill="#000095"/><circle cx="7" cy="5" r="2.8" fill="#fff"/></svg>`
    },
    {
      code: 'CN', name: 'China', cat: 'world', aliases: 'china beijing shanghai',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#de2910"/><polygon points="5.5,3 6.4,5.7 9.2,5.7 6.9,7.4 7.8,10 5.5,8.4 3.2,10 4.1,7.4 1.8,5.7 4.6,5.7" fill="#ffde00"/></svg>`
    },
    {
      code: 'SG', name: 'Singapore', cat: 'world', aliases: 'singapore singapur sea',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="10" fill="#ed2939"/><rect y="10" width="30" height="10" fill="#fff"/><circle cx="6.5" cy="5" r="3" fill="#fff"/><circle cx="7.7" cy="5" r="2.6" fill="#ed2939"/><g fill="#fff"><circle cx="10.2" cy="3.5" r=".6"/><circle cx="11.6" cy="4.7" r=".6"/><circle cx="11" cy="6.4" r=".6"/><circle cx="9.2" cy="6.4" r=".6"/><circle cx="8.8" cy="4.7" r=".6"/></g></svg>`
    },
    {
      code: 'MY', name: 'Malaysia', cat: 'world', aliases: 'malaysia malasia kuala lumpur',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#cc0001"/><g fill="#fff"><rect y="2.8" width="30" height="2"/><rect y="6.8" width="30" height="2"/><rect y="10.8" width="30" height="2"/><rect y="14.8" width="30" height="2"/><rect y="18.4" width="30" height="1.6"/></g><rect width="14" height="10.5" fill="#010066"/><circle cx="5.5" cy="5.2" r="2.8" fill="#ffcc00"/><circle cx="6.6" cy="5.2" r="2.4" fill="#010066"/><circle cx="9.6" cy="5.2" r="1.4" fill="#ffcc00"/></svg>`
    },
    {
      code: 'TH', name: 'Thailand', cat: 'world', aliases: 'thailand tailandia bangkok thaiger',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="3.3" fill="#a51931"/><rect y="3.3" width="30" height="3.3" fill="#f4f5f8"/><rect y="6.6" width="30" height="6.8" fill="#2d2a4a"/><rect y="13.4" width="30" height="3.3" fill="#f4f5f8"/><rect y="16.7" width="30" height="3.3" fill="#a51931"/></svg>`
    },
    {
      code: 'IN', name: 'India', cat: 'world', aliases: 'india delhi mumbai',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="6.7" fill="#ff9933"/><rect y="6.7" width="30" height="6.6" fill="#fff"/><rect y="13.3" width="30" height="6.7" fill="#138808"/><circle cx="15" cy="10" r="2.2" fill="none" stroke="#000080" stroke-width="0.9"/></svg>`
    },
    {
      code: 'SA', name: 'Saudi Arabia', cat: 'world', aliases: 'saudi arabia riyadh ewc arabia saudi',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#006c35"/><rect x="6" y="7" width="18" height="2.5" rx="1" fill="#fff"/><rect x="8" y="12.5" width="14" height="1.5" rx=".7" fill="#fff"/></svg>`
    },
    {
      code: 'AE', name: 'United Arab Emirates', cat: 'world', aliases: 'uae dubai abu dhabi emiratos',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="8" height="20" fill="#ff0000"/><rect x="8" width="22" height="6.7" fill="#00732f"/><rect x="8" y="6.7" width="22" height="6.6" fill="#fff"/><rect x="8" y="13.3" width="22" height="6.7" fill="#000"/></svg>`
    },
    {
      code: 'MA', name: 'Morocco', cat: 'world', aliases: 'morocco marruecos casablanca',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="20" fill="#c1272d"/><polygon points="15,5.5 16.4,9.8 20.8,9.8 17.2,12.4 18.6,16.6 15,14 11.4,16.6 12.8,12.4 9.2,9.8 13.6,9.8" fill="none" stroke="#006233" stroke-width="1.3"/></svg>`
    },
    {
      code: 'EG', name: 'Egypt', cat: 'world', aliases: 'egypt egipto cairo',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="6.7" fill="#ce1126"/><rect y="6.7" width="30" height="6.6" fill="#fff"/><rect y="13.3" width="30" height="6.7" fill="#000"/><rect x="13.6" y="8" width="2.8" height="4" rx="0.6" fill="#c09300"/></svg>`
    },
    {
      code: 'ZA', name: 'South Africa', cat: 'world', aliases: 'south africa sudafrica',
      svg: `<svg viewBox="0 0 30 20" preserveAspectRatio="none"><rect width="30" height="10" fill="#e03c31"/><rect y="10" width="30" height="10" fill="#001489"/><polygon points="0,0 13,10 0,20" fill="#000"/><path d="M0 0L13 10L0 20M13 10H30" fill="none" stroke="#fff" stroke-width="5.2"/><path d="M0 0L13 10L0 20M13 10H30" fill="none" stroke="#007749" stroke-width="3.2"/><path d="M0 3.2L8.8 10L0 16.8" fill="none" stroke="#ffb81c" stroke-width="1.5"/></svg>`
    }
  ];

const ISO3_OVERRIDES = {
    'ES-AN': 'AND', 'ES-AR': 'ARA', 'ES-AS': 'AST', 'ES-IB': 'BAL', 'ES-CN': 'CAN',
    'ES-CB': 'CTB', 'ES-CM': 'CLM', 'ES-CL': 'CYL', 'ES-CT': 'CAT', 'ES-VC': 'VAL',
    'ES-EX': 'EXT', 'ES-GA': 'GAL', 'ES-MD': 'MAD', 'ES-MC': 'MUR', 'ES-NC': 'NAV',
    'ES-PV': 'EUS', 'ES-RI': 'RIO', 'ES-CE': 'CEU', 'ES-ML': 'MEL',
    'ES': 'ESP', 'EU': 'EUR', 'FR': 'FRA', 'GB': 'GBR', 'DE': 'GER', 'IT': 'ITA',
    'PT': 'POR', 'NL': 'NED', 'BE': 'BEL', 'CH': 'SUI', 'AT': 'AUT', 'IE': 'IRL',
    'SE': 'SWE', 'NO': 'NOR', 'FI': 'FIN', 'DK': 'DEN', 'PL': 'POL', 'CZ': 'CZE',
    'GR': 'GRE', 'HU': 'HUN', 'RO': 'ROU', 'UA': 'UKR', 'HR': 'CRO', 'RS': 'SRB',
    'BG': 'BUL', 'SK': 'SVK', 'IS': 'ISL', 'LU': 'LUX', 'TR': 'TUR',
    'GB-ENG': 'ENG', 'GB-SCT': 'SCO', 'GB-WLS': 'WAL', 'GB-NIR': 'NIR',
    'DE-BY': 'BAV', 'FR-BRE': 'BRE', 'FR-20R': 'COR', 'IT-82': 'SIC', 'IT-88': 'SAR',
    'BE-VLG': 'FLA', 'BE-WAL': 'WLO',
    'US': 'USA', 'US-CA': 'CAL', 'US-TX': 'TEX', 'US-NY': 'NYC', 'US-FL': 'FLA',
    'US-IL': 'CHI', 'US-NV': 'EVO', 'US-GA': 'ATL', 'US-WA': 'PNW', 'US-NJ': 'NJY',
    'US-PA': 'PHL', 'US-MA': 'BOS', 'US-MI': 'DET', 'US-OH': 'OHI', 'US-MD': 'DMV',
    'US-AZ': 'ARZ', 'US-CO': 'COL', 'US-NC': 'NCR', 'US-TN': 'TEN', 'US-HI': 'HAW',
    'US-VA': 'VIR', 'US-DC': 'WDC', 'PR': 'PUR',
    'JP': 'JPN', 'KR': 'KOR', 'PK': 'PAK', 'CA': 'CAN', 'CA-QC': 'QBC', 'MX': 'MEX',
    'BR': 'BRA', 'AR': 'ARG', 'CL': 'CHI', 'CO': 'COL', 'PE': 'PER', 'VE': 'VEN',
    'EC': 'ECU', 'UY': 'URU', 'DO': 'DOM', 'CR': 'CRC', 'AU': 'AUS', 'NZ': 'NZL',
    'PH': 'PHL', 'ID': 'INA', 'HK': 'HKG', 'TW': 'TWN', 'CN': 'CHN', 'SG': 'SGP',
    'MY': 'MAS', 'TH': 'THA', 'IN': 'IND', 'SA': 'KSA', 'AE': 'UAE', 'MA': 'MAR',
    'EG': 'EGY', 'ZA': 'RSA'
  };

  const BUILTIN_CONTINENTS = {
    ES: 'EU', EU: 'EU', FR: 'EU', GB: 'EU', DE: 'EU', IT: 'EU', PT: 'EU', NL: 'EU', BE: 'EU', CH: 'EU',
    AT: 'EU', IE: 'EU', SE: 'EU', NO: 'EU', FI: 'EU', DK: 'EU', PL: 'EU', CZ: 'EU', GR: 'EU', HU: 'EU',
    RO: 'EU', UA: 'EU', HR: 'EU', RS: 'EU', BG: 'EU', SK: 'EU', IS: 'EU', LU: 'EU', TR: 'EU',
    US: 'NA', CA: 'NA', MX: 'NA', PR: 'NA', DO: 'NA', CR: 'NA',
    BR: 'SA', AR: 'SA', CL: 'SA', CO: 'SA', PE: 'SA', VE: 'SA', EC: 'SA', UY: 'SA',
    JP: 'AS', KR: 'AS', PK: 'AS', PH: 'AS', ID: 'AS', HK: 'AS', TW: 'AS', CN: 'AS', SG: 'AS', MY: 'AS', TH: 'AS', IN: 'AS', SA: 'AS', AE: 'AS',
    AU: 'OC', NZ: 'OC',
    MA: 'AF', EG: 'AF', ZA: 'AF'
  };

  // Inject universal crisp sizing CSS for on-demand/offline cached flag images across all overlays
  if (typeof document !== 'undefined' && !document.getElementById('fgc-flag-img-css')) {
    const st = document.createElement('style');
    st.id = 'fgc-flag-img-css';
    st.textContent = '.fgc-flag-img{width:100%!important;height:100%!important;object-fit:cover!important;display:block!important;border-radius:inherit;}';
    (document.head || document.documentElement).appendChild(st);
  }

  const IS_HTTP_ORIGIN = typeof location !== 'undefined' && /^https?:/i.test(location.protocol || '');
  const FLAGS_RAW = Object.create(null);
  for (const item of FLAG_CATALOG) {
    const cc = item.code.includes('-') ? item.code.split('-')[0] : item.code;
    item.iso3 = ISO3_OVERRIDES[item.code] || item.code.replace(/^[A-Z]{2}-/, '').slice(0, 3).toUpperCase();
    item.country = cc;
    item.isRegion = item.code.includes('-');
    item.continent = BUILTIN_CONTINENTS[cc] || 'OTHER';
    item.builtin = true;
    FLAGS_RAW[item.code] = item;
  }

  function makeDynamicFlagImg(code) {
    const safe = encodeURIComponent(code);
    return `<img class="fgc-flag-img" src="/api/flags/img?code=${safe}" alt="${code}" crossorigin="anonymous" loading="lazy" />`;
  }

  const DYNAMIC_CACHE = Object.create(null);
  function getOrBuildFlag(codeInput) {
    if (typeof codeInput !== 'string') return undefined;
    const upper = codeInput.trim().toUpperCase();
    if (!upper) return undefined;
    if (FLAGS_RAW[upper]) return FLAGS_RAW[upper];
    if (DYNAMIC_CACHE[upper]) return DYNAMIC_CACHE[upper];
    if (!IS_HTTP_ORIGIN || !/^[A-Z0-9]{2}(-[A-Z0-9]{1,8})?$/.test(upper)) return undefined;
    const isReg = upper.includes('-');
    const cc = isReg ? upper.split('-')[0] : upper;
    const entry = {
      code: upper,
      name: upper,
      native: '',
      country: cc,
      continent: BUILTIN_CONTINENTS[cc] || 'OTHER',
      iso3: ISO3_OVERRIDES[upper] || (isReg ? upper.split('-')[1].slice(0, 3) : upper),
      isRegion: isReg,
      dynamic: true,
      svg: makeDynamicFlagImg(upper)
    };
    DYNAMIC_CACHE[upper] = entry;
    return entry;
  }

  const FLAGS_MAP = typeof Proxy === 'function'
    ? new Proxy(FLAGS_RAW, {
        get(target, prop) {
          if (typeof prop !== 'string') return target[prop];
          if (Object.prototype.hasOwnProperty.call(target, prop)) return target[prop];
          const upper = prop.trim().toUpperCase();
          if (Object.prototype.hasOwnProperty.call(target, upper)) return target[upper];
          return getOrBuildFlag(upper);
        },
        has(target, prop) {
          if (typeof prop !== 'string') return prop in target;
          const upper = prop.trim().toUpperCase();
          return Object.prototype.hasOwnProperty.call(target, upper) || Boolean(getOrBuildFlag(upper));
        }
      })
    : FLAGS_RAW;

  let worldCatalogData = null;
  function hydrateWorldCatalog(data) {
    if (!data || !Array.isArray(data.countries)) return data;
    worldCatalogData = data;
    for (const c of data.countries) {
      const cc = c.c;
      const existing = FLAGS_RAW[cc];
      if (existing) {
        existing.continent = c.ct || existing.continent;
        existing.native = c.nat || existing.native || '';
        existing.cached = Boolean(c.cached);
        existing.rcCached = Number(c.rcCached || 0);
        existing.regionCount = Array.isArray(c.r) ? c.r.length : 0;
        if (c.i3 && !ISO3_OVERRIDES[cc]) existing.iso3 = c.i3;
      } else {
        DYNAMIC_CACHE[cc] = {
          code: cc,
          name: c.n || cc,
          native: c.nat || '',
          country: cc,
          continent: c.ct || 'OTHER',
          iso3: ISO3_OVERRIDES[cc] || c.i3 || cc,
          isRegion: false,
          dynamic: true,
          cached: Boolean(c.cached),
          rcCached: Number(c.rcCached || 0),
          regionCount: Array.isArray(c.r) ? c.r.length : 0,
          svg: makeDynamicFlagImg(cc)
        };
      }
      const cachedSet = new Set(c.cachedRegCodes || []);
      for (const r of (c.r || [])) {
        const rc = r.c;
        const exR = FLAGS_RAW[rc];
        if (exR) {
          exR.continent = c.ct || exR.continent;
          exR.country = cc;
          exR.countryName = c.n;
          exR.native = r.nat || exR.native || '';
          exR.cached = true;
        } else {
          DYNAMIC_CACHE[rc] = {
            code: rc,
            name: r.n || rc,
            native: r.nat || '',
            country: cc,
            countryName: c.n,
            continent: c.ct || 'OTHER',
            iso3: ISO3_OVERRIDES[rc] || rc.split('-')[1].slice(0, 3),
            isRegion: true,
            dynamic: true,
            cached: cachedSet.has(rc),
            svg: makeDynamicFlagImg(rc)
          };
        }
      }
    }
    return data;
  }

  let catalogPromise = null;
  function loadWorldCatalog(force = false) {
    if (!IS_HTTP_ORIGIN) return Promise.resolve(null);
    if (!force && worldCatalogData) return Promise.resolve(worldCatalogData);
    if (!force && catalogPromise) return catalogPromise;
    catalogPromise = fetch('/api/flags/catalog', { cache: 'no-store' })
      .then(r => r.ok ? r.json() : null)
      .then(d => d ? hydrateWorldCatalog(d) : null)
      .catch(() => null);
    return catalogPromise;
  }

  global.FGC_FLAG_CATALOG = FLAG_CATALOG;
  global.FGC_FLAGS = FLAGS_MAP;
  global.FGC_FLAG_API = {
    getWorldCatalog: () => worldCatalogData,
    loadWorldCatalog,
    hydrateWorldCatalog,
    makeDynamicFlagImg,
    getFlagEntry: (code) => FLAGS_MAP[String(code || '').toUpperCase()] || null
  };

  // Warm metadata index silently in background when running on local HTTP server
  if (IS_HTTP_ORIGIN) {
    loadWorldCatalog(false);
  }
})(typeof window !== 'undefined' ? window : globalThis);
