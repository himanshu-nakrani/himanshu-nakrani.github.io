import{a as e}from"./rolldown-runtime-B0Z9INg1.js";import{dt as t}from"./icons-lxqhqUN4.js";import{t as n}from"./react-vendor-D_G4Vuww.js";var r=e(t(),1),i=n(),a={blue:{base:220,spread:200},purple:{base:280,spread:300},green:{base:120,spread:200},red:{base:0,spread:200},orange:{base:30,spread:200}},o={sm:`w-48 h-64`,md:`w-64 h-80`,lg:`w-80 h-96`},s=`
  [data-glow]::before,
  [data-glow]::after {
    pointer-events: none;
    content: "";
    position: absolute;
    inset: calc(var(--border-size) * -1);
    border: var(--border-size) solid transparent;
    border-radius: calc(var(--radius) * 1px);
    background-attachment: fixed;
    background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
    background-repeat: no-repeat;
    background-position: 50% 50%;
    mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
    mask-clip: padding-box, border-box;
    mask-composite: intersect;
  }

  [data-glow]::before {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
    );
    filter: brightness(2);
  }

  [data-glow]::after {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(0 100% 100% / var(--border-light-opacity, 1)), transparent 100%
    );
  }

  [data-glow] [data-glow] {
    position: absolute;
    inset: 0;
    will-change: filter;
    opacity: var(--outer, 1);
    border-radius: calc(var(--radius) * 1px);
    border-width: calc(var(--border-size) * 20);
    filter: blur(calc(var(--border-size) * 10));
    background: none;
    pointer-events: none;
    border: none;
  }

  [data-glow] > [data-glow]::before {
    inset: -10px;
    border-width: 10px;
  }
`,c=!1,l=({children:e,className:t=``,glowColor:n=`blue`,size:l=`md`,width:u,height:d,customSize:f=!1})=>{let p=(0,r.useRef)(null),m=(0,r.useRef)(null);(0,r.useEffect)(()=>{if(!c){let e=document.createElement(`style`);e.textContent=s,document.head.appendChild(e),c=!0}},[]),(0,r.useEffect)(()=>{let e=e=>{let{clientX:t,clientY:n}=e;p.current&&(p.current.style.setProperty(`--x`,t.toFixed(2)),p.current.style.setProperty(`--xp`,(t/window.innerWidth).toFixed(2)),p.current.style.setProperty(`--y`,n.toFixed(2)),p.current.style.setProperty(`--yp`,(n/window.innerHeight).toFixed(2)))};return document.addEventListener(`pointermove`,e),()=>document.removeEventListener(`pointermove`,e)},[]);let{base:h,spread:g}=a[n];return(0,i.jsxs)(`div`,{ref:p,"data-glow":!0,style:(()=>{let e={"--base":h,"--spread":g,"--radius":`14`,"--border":`3`,"--backdrop":`hsl(0 0% 60% / 0.12)`,"--backup-border":`var(--backdrop)`,"--size":`200`,"--outer":`1`,"--border-size":`calc(var(--border, 2) * 1px)`,"--spotlight-size":`calc(var(--size, 150) * 1px)`,"--hue":`calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))`,backgroundImage:`radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
      )`,backgroundColor:`var(--backdrop, transparent)`,backgroundSize:`calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))`,backgroundPosition:`50% 50%`,backgroundAttachment:`fixed`,border:`var(--border-size) solid var(--backup-border)`,position:`relative`,touchAction:`none`};return u!==void 0&&(e.width=typeof u==`number`?`${u}px`:u),d!==void 0&&(e.height=typeof d==`number`?`${d}px`:d),e})(),className:`
        ${f?``:o[l]}
        ${f?``:`aspect-[3/4]`}
        rounded-2xl
        relative
        grid
        grid-rows-[1fr_auto]
        shadow-[0_1rem_2rem_-1rem_black]
        p-4
        gap-4
        backdrop-blur-[5px]
        ${t}
      `,children:[(0,i.jsx)(`div`,{ref:m,"data-glow":!0}),e]})};function u(){return(0,i.jsxs)(`div`,{style:{width:`100vw`,minHeight:`100vh`,display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`,gap:`3rem`,background:`#0a0a0a`,padding:`2rem`},children:[(0,i.jsxs)(`div`,{style:{display:`flex`,gap:`2.5rem`,flexWrap:`wrap`,justifyContent:`center`},children:[(0,i.jsx)(l,{glowColor:`purple`,children:(0,i.jsx)(`span`,{style:{color:`#fff`,fontSize:`0.85rem`,opacity:.7},children:`Purple glow`})}),(0,i.jsx)(l,{glowColor:`red`,children:(0,i.jsx)(`span`,{style:{color:`#fff`,fontSize:`0.85rem`,opacity:.7},children:`Red glow`})}),(0,i.jsx)(l,{glowColor:`orange`,children:(0,i.jsx)(`span`,{style:{color:`#fff`,fontSize:`0.85rem`,opacity:.7},children:`Orange glow`})})]}),(0,i.jsxs)(`div`,{style:{display:`flex`,gap:`2.5rem`,flexWrap:`wrap`,justifyContent:`center`},children:[(0,i.jsx)(l,{glowColor:`blue`,children:(0,i.jsx)(`span`,{style:{color:`#fff`,fontSize:`0.85rem`,opacity:.7},children:`Blue glow`})}),(0,i.jsx)(l,{glowColor:`green`,children:(0,i.jsx)(`span`,{style:{color:`#fff`,fontSize:`0.85rem`,opacity:.7},children:`Green glow`})})]})]})}export{u as default};