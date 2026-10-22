import fs from 'fs';

// 1. HEADER SVG (Removed "//" and removed the dot "(.)", with clean symmetric glowing line)
const headerSvg = `<svg width="850" height="95" viewBox="0 0 850 95" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="neonGlowHeader" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="softGlowHeader" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2.5" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <linearGradient id="cyberLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#02182b" stop-opacity="0" />
      <stop offset="20%" stop-color="#0284c7" />
      <stop offset="50%" stop-color="#00f0ff" />
      <stop offset="80%" stop-color="#0284c7" />
      <stop offset="100%" stop-color="#02182b" stop-opacity="0" />
    </linearGradient>
  </defs>

  <style>
    .tech-header-title {
      font-family: 'Courier New', 'Consolas', 'Segoe UI', monospace;
      font-size: 34px;
      font-weight: 900;
      letter-spacing: 16px;
      fill: #00f0ff;
    }
    .tech-header-sub {
      font-family: 'Courier New', 'Consolas', monospace;
      font-size: 13.5px;
      font-weight: 700;
      letter-spacing: 4.5px;
      fill: #38bdf8;
    }
  </style>

  <!-- Title: C O N N E C T -->
  <text x="433" y="42" text-anchor="middle" class="tech-header-title" filter="url(#neonGlowHeader)">C O N N E C T</text>

  <!-- Subtitle: ESTABLISHING UPLINK — OKTOVA SAMOSIR (Without "//") -->
  <text x="433" y="68" text-anchor="middle" class="tech-header-sub" filter="url(#softGlowHeader)">ESTABLISHING UPLINK — OKTOVA SAMOSIR</text>

  <!-- Clean Glowing Horizontal Line (Without floating dot) -->
  <line x1="65" y1="84" x2="785" y2="84" stroke="url(#cyberLineGrad)" stroke-width="2.2" />
</svg>`;

// Helper function for Card SVG
function generateCardSvg({ id, title, subtitle, iconGroup }) {
  return `<svg width="270" height="84" viewBox="0 0 270 84" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="cardNeonGlow-${id}" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3.5" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="elementGlow-${id}" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="1.8" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <linearGradient id="borderGradient-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00f0ff" />
      <stop offset="30%" stop-color="#00a8ff" />
      <stop offset="70%" stop-color="#0066cc" />
      <stop offset="100%" stop-color="#00f0ff" />
    </linearGradient>
    <radialGradient id="topFlare-${id}" cx="10%" cy="15%" r="80%">
      <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.25" />
      <stop offset="45%" stop-color="#0284c7" stop-opacity="0.10" />
      <stop offset="100%" stop-color="#050a14" stop-opacity="0" />
    </radialGradient>
  </defs>

  <style>
    @keyframes chevronShift-${id} {
      0%, 100% { transform: translateX(0); }
      50% { transform: translateX(2.5px); }
    }
    .hud-chevrons-${id} {
      animation: chevronShift-${id} 1.6s ease-in-out infinite;
    }
    .hud-title-${id} {
      font-family: 'Courier New', 'Consolas', monospace;
      font-size: 14.5px;
      font-weight: 900;
      letter-spacing: 2.8px;
      fill: #00f0ff;
    }
    .hud-subtitle-${id} {
      font-family: 'Courier New', 'Consolas', monospace;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      fill: #38bdf8;
    }
  </style>

  <!-- Background Base -->
  <rect x="4" y="4" width="262" height="76" rx="14" fill="#060b14" />
  
  <!-- Subtle Specular Flare in Top Left -->
  <rect x="4" y="4" width="262" height="76" rx="14" fill="url(#topFlare-${id})" />

  <!-- Outer Neon Glowing Border -->
  <rect x="4" y="4" width="262" height="76" rx="14" stroke="url(#borderGradient-${id})" stroke-width="1.8" filter="url(#elementGlow-${id})" />

  <!-- HUD Corner Brackets (Exact Rounded Corners) -->
  <path d="M 15 25 V 18 A 3 3 0 0 1 18 15 H 25" fill="none" stroke="#00f0ff" stroke-width="1.8" stroke-linecap="round" />
  <path d="M 245 15 H 252 A 3 3 0 0 1 255 18 V 25" fill="none" stroke="#00f0ff" stroke-width="1.8" stroke-linecap="round" />
  <path d="M 15 59 V 66 A 3 3 0 0 0 18 69 H 25" fill="none" stroke="#00f0ff" stroke-width="1.8" stroke-linecap="round" />
  <path d="M 245 69 H 252 A 3 3 0 0 0 255 66 V 59" fill="none" stroke="#00f0ff" stroke-width="1.8" stroke-linecap="round" />

  <!-- Left Icon Squircle Box -->
  <rect x="33" y="24" width="36" height="36" rx="9" fill="#091424" stroke="#00e5ff" stroke-width="1.5" filter="url(#elementGlow-${id})" />
  
  <!-- Icon Group -->
  <g transform="translate(33, 24)">
    ${iconGroup}
  </g>

  <!-- Middle Text: Title -->
  <text x="82" y="39" class="hud-title-${id}" filter="url(#elementGlow-${id})">${title}</text>
  
  <!-- Subtitle: Username or Number -->
  <text x="82" y="56" class="hud-subtitle-${id}">${subtitle}</text>

  <!-- Right Chevrons >> -->
  <g class="hud-chevrons-${id}" filter="url(#elementGlow-${id})">
    <path d="M 228 36 L 234 42 L 228 48" stroke="#00f0ff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <path d="M 235 36 L 241 42 L 235 48" stroke="#00f0ff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  </g>
</svg>`;
}

// 2. LINKEDIN ICON
const linkedinIcon = `
  <g transform="translate(6, 6) scale(0.09375)">
    <path d="M184.715 217.685H213.985C216.194 217.685 217.985 215.895 217.985 213.686L218 151.844C218 119.521 211.035 94.6755 173.262 94.6755C158.903 94.1423 145.362 101.544 138.055 113.904C137.997 114.002 137.893 114.062 137.779 114.062C137.603 114.062 137.46 113.919 137.46 113.743V101.66C137.46 99.4511 135.67 97.6602 133.46 97.6602H105.683C103.474 97.6602 101.683 99.4511 101.683 101.66V213.68C101.683 215.89 103.474 217.68 105.683 217.68H134.951C137.16 217.68 138.951 215.89 138.951 213.68V158.307C138.951 142.65 141.921 127.487 161.332 127.487C180.467 127.487 180.715 145.403 180.715 159.321V213.685C180.715 215.894 182.506 217.685 184.715 217.685Z" fill="#00f0ff"/>
    <path d="M38 59.6275C38 71.4921 47.7675 81.2539 59.6321 81.2539C71.4944 81.2528 81.2551 71.4853 81.2551 59.623C81.2528 47.7607 71.491 38 59.6275 38C47.763 38 38 47.763 38 59.6275Z" fill="#00f0ff"/>
    <path d="M44.9588 217.685H74.2659C76.4751 217.685 78.2659 215.894 78.2659 213.685V101.66C78.2659 99.4511 76.4751 97.6602 74.2659 97.6602H44.9588C42.7497 97.6602 40.9588 99.4511 40.9588 101.66V213.685C40.9588 215.894 42.7497 217.685 44.9588 217.685Z" fill="#00f0ff"/>
  </g>
`;

// 3. WHATSAPP ICON
const whatsappIcon = `
  <g transform="translate(6, 6) scale(1)">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="#00f0ff"/>
  </g>
`;

// 4. INSTAGRAM ICON
const instagramIcon = `
  <g transform="translate(6, 6) scale(1)">
    <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" fill="#00f0ff"/>
  </g>
`;

fs.writeFileSync('connect-header.svg', headerSvg);
fs.writeFileSync('connect-linkedin.svg', generateCardSvg({ id: 'li', title: 'LINKEDIN', subtitle: 'oktovaaaaa', iconGroup: linkedinIcon }));
fs.writeFileSync('connect-whatsapp.svg', generateCardSvg({ id: 'wa', title: 'WHATSAPP', subtitle: '0881080811110', iconGroup: whatsappIcon }));
fs.writeFileSync('connect-instagram.svg', generateCardSvg({ id: 'ig', title: 'INSTAGRAM', subtitle: 'oktovaaaaa', iconGroup: instagramIcon }));

console.log('Successfully regenerated Connect SVGs with username/phone and clean header!');
