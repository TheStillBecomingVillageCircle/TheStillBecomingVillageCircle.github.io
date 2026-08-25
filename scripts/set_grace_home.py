from pathlib import Path

path = Path("index.html")
html = path.read_text(encoding="utf-8")

start_marker = '<div class="place"><a href="index.html" aria-label="Home">'
end_marker = '</div><span class="place-name">Home</span></a></div>'
start = html.find(start_marker)

if start == -1:
    print("Grace Home already applied; nothing to replace.")
    raise SystemExit(0)

end = html.find(end_marker, start)
if end == -1:
    raise SystemExit("Home end marker not found.")
end += len(end_marker)

replacement = '''<div class="place grace-home-place"><a href="index.html" aria-label="Home"><div class="scene grace-home-scene"><svg viewBox="0 0 420 300" role="img" aria-label="Grace's elegant modern floating home"><defs>
<linearGradient id="ghCloud" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#ffffff"/><stop offset="1" stop-color="#d8f5ef"/></linearGradient>
<linearGradient id="ghWall" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffffff"/><stop offset="1" stop-color="#edf8f5"/></linearGradient>
<linearGradient id="ghGlass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#effffb"/><stop offset=".45" stop-color="#aee4dc"/><stop offset="1" stop-color="#e7faf6"/></linearGradient>
<linearGradient id="ghAqua" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#8ddbd1"/><stop offset="1" stop-color="#4daaa7"/></linearGradient>
<linearGradient id="ghGold" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f0d99d"/><stop offset="1" stop-color="#b48643"/></linearGradient>
<filter id="ghShadow" x="-25%" y="-30%" width="150%" height="175%"><feDropShadow dx="0" dy="14" stdDeviation="10" flood-color="#397c76" flood-opacity=".18"/></filter>
<radialGradient id="ghGlow"><stop stop-color="#ffffff" stop-opacity=".85"/><stop offset="1" stop-color="#d8f7f0" stop-opacity="0"/></radialGradient>
</defs>
<g class="grace-house-float" filter="url(#ghShadow)">
<ellipse cx="211" cy="273" rx="173" ry="20" fill="#bdebe4" opacity=".34"/>
<path d="M46 235c-12-16-4-35 18-40 8-25 36-37 61-27 22-29 70-30 94 2 28-17 73-5 82 25 31-1 55 15 55 36 0 24-25 38-57 38H89c-24 0-38-12-43-34Z" fill="url(#ghCloud)" stroke="#fff" stroke-width="3"/>
<path d="M82 171h209v66H82z" fill="url(#ghWall)" stroke="#d1ebe6" stroke-width="2"/>
<path d="M96 117h177v56H96z" fill="url(#ghWall)" stroke="#d1ebe6" stroke-width="2"/>
<path d="M70 119 184 49l119 70" fill="url(#ghAqua)" stroke="#4c827c" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M83 112 184 52l105 61" fill="none" stroke="#eafff9" stroke-width="4" opacity=".82"/>
<rect x="126" y="83" width="117" height="43" rx="2" fill="url(#ghGlass)" stroke="#fff" stroke-width="5"/>
<path d="M184 83v43M126 104h117" stroke="#6c9d98" stroke-width="2" opacity=".55"/>
<rect x="103" y="133" width="71" height="57" rx="2" fill="url(#ghGlass)" stroke="#fff" stroke-width="5"/>
<rect x="181" y="133" width="76" height="57" rx="2" fill="url(#ghGlass)" stroke="#fff" stroke-width="5"/>
<path d="M138 133v57M219 133v57" stroke="#6c9d98" stroke-width="2" opacity=".55"/>
<path d="M174 237v-38c0-11 8-19 18-19s18 8 18 19v38Z" fill="#5b7c76"/>
<rect x="291" y="125" width="14" height="37" rx="2" fill="#b98950"/>
<path d="M79 196h213v38H79z" fill="url(#ghGlass)" stroke="#fff" stroke-width="5" opacity=".92"/>
<path d="M79 218h213" stroke="#67bcb5" stroke-width="2" opacity=".5"/>
<path d="M103 238h170" stroke="url(#ghGold)" stroke-width="4" stroke-linecap="round"/>
<path d="M55 194c-12 8-19 18-22 30M308 194c11 8 18 18 21 30" fill="none" stroke="#76b9a8" stroke-width="4" stroke-linecap="round"/>
<circle cx="111" cy="73" r="34" fill="url(#ghGlow)"/>
<circle cx="267" cy="78" r="3.5" fill="#efd39a"/><circle cx="302" cy="102" r="3" fill="#efd39a"/>
<path d="M43 51C115-11 265-8 348 57" fill="none" stroke="url(#ghGold)" stroke-width="3" stroke-linecap="round" opacity=".92"/>
<path d="M43 51C115-11 265-8 348 57" fill="none" stroke="#fff" stroke-width="1" opacity=".72"/>
<circle cx="184" cy="20" r="3" fill="#fff1c9"/><circle cx="112" cy="36" r="2.5" fill="#fff1c9"/><circle cx="280" cy="32" r="2.5" fill="#fff1c9"/>
<path d="M51 257c48 8 119 9 184 2" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="3" stroke-linecap="round"/>
</g></svg></div><span class="place-name">Home</span></a></div>'''

html = html[:start] + replacement + html[end:]

css = '''
/* Grace's Home destination */
.grace-home-place{min-height:330px}
.grace-home-scene{width:min(420px,96vw);height:300px}
.grace-home-scene svg{width:100%;height:100%}
.grace-house-float{transform-origin:50% 70%;animation:graceHouseFloat 6.5s ease-in-out infinite}
@keyframes graceHouseFloat{0%,100%{transform:translateY(2px)}50%{transform:translateY(-7px)}}
@media(max-width:760px){.grace-home-place{min-height:295px}.grace-home-scene{width:min(420px,94vw);height:275px}}
@media(max-width:480px){.grace-home-place{min-height:300px}.grace-home-scene{width:100%;height:280px}}
@media(prefers-reduced-motion:reduce){.grace-house-float{animation:none}}
'''

if "/* Grace's Home destination */" not in html:
    html = html.replace("</style>", css + "</style>", 1)

path.write_text(html, encoding="utf-8")
print("Grace Home replacement applied.")
