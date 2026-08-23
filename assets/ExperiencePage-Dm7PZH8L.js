import{n as e,s as t,t as n}from"./jsx-runtime-C7M7YA1l.js";import{t as r}from"./proxy-DjIB3eCB.js";import{t as i}from"./createLucideIcon-CHk8E4_x.js";import{t as a}from"./briefcase-BvAr1C4k.js";import{t as o}from"./chevron-down-CVBQ8zc4.js";import{t as s}from"./trending-up-DvGbNQyb.js";import{t as c}from"./users-J5LbZJAx.js";import{t as l}from"./zap-HPI-X0s-.js";import{C as u,r as d,x as f}from"./index-DUYX_wN9.js";import{t as p}from"./PageHeader-V48edn_D.js";import{t as m}from"./Tag-DFc78_WR.js";var h=i(`badge-check`,[[`path`,{d:`M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z`,key:`3c2336`}],[`path`,{d:`m9 12 2 2 4-4`,key:`dzmm74`}]]),g=i(`box`,[[`path`,{d:`M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z`,key:`hh9hay`}],[`path`,{d:`m3.3 7 8.7 5 8.7-5`,key:`g66t2b`}],[`path`,{d:`M12 22V12`,key:`d0xqtd`}]]),_=i(`flask-conical`,[[`path`,{d:`M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2`,key:`18mbvz`}],[`path`,{d:`M6.453 15h11.094`,key:`3shlmq`}],[`path`,{d:`M8.5 2h7`,key:`csnxdl`}]]),v=i(`handshake`,[[`path`,{d:`m11 17 2 2a1 1 0 1 0 3-3`,key:`efffak`}],[`path`,{d:`m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4`,key:`9pr0kb`}],[`path`,{d:`m21 3 1 11h-2`,key:`1tisrp`}],[`path`,{d:`M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3`,key:`1uvwmv`}],[`path`,{d:`M3 4h8`,key:`1ep09j`}]]),y=i(`test-tube`,[[`path`,{d:`M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2`,key:`125lnx`}],[`path`,{d:`M8.5 2h7`,key:`csnxdl`}],[`path`,{d:`M14.5 16h-5`,key:`1ox875`}]]),b=t(e(),1),x={instant:0,fast:.15,base:.25,slow:.4,slower:.6},S={default:[.645,.045,.355,1],out:[.215,.61,.355,1],in:[.55,.055,.675,.19],spring:[.175,.885,.32,1.275]};x.base,S.out,x.slow,S.out,x.slow,S.out,x.slow,S.out,x.slow,S.out,x.base,S.out,x.slow,S.out,x.slow,S.out,x.fast,S.in,x.fast,x.fast,x.base,S.spring,x.fast,S.in,x.fast,S.out,x.instant,x.slower,S.out,x.slow,x.slower,S.out,x.fast,S.out,x.fast,S.out;var C=n(),w=(0,b.createContext)({openId:null,toggle:()=>{},allowMultiple:!1});function T({children:e,defaultOpen:t=null,allowMultiple:n=!1,className:r=``,gap:i=`0.5rem`}){let[a,o]=(0,b.useState)(n?t?[t]:[]:t),s=(0,b.useCallback)(e=>{o(n?t=>t.includes(e)?t.filter(t=>t!==e):[...t,e]:t=>t===e?null:e)},[n]),c=(0,b.useCallback)(e=>n?a?.includes(e)||!1:a===e,[a,n]);return(0,C.jsx)(w.Provider,{value:{openId:a,toggle:s,isOpen:c,allowMultiple:n},children:(0,C.jsx)(`div`,{className:`disclosure-group ${r}`,style:{display:`flex`,flexDirection:`column`,gap:i},children:e})})}var E=(0,b.forwardRef)(function({id:e,title:t,subtitle:n,icon:i,badge:a,children:s,className:c=``,headerClassName:l=``,contentClassName:d=``,disabled:f=!1},p){let{toggle:m,isOpen:h}=(0,b.useContext)(w),g=h(e);return(0,C.jsxs)(`div`,{ref:p,className:`disclosure-item ${g?`disclosure-item--open`:``} ${c}`,"data-state":g?`open`:`closed`,children:[(0,C.jsxs)(`button`,{type:`button`,className:`disclosure-trigger ${l}`,onClick:()=>!f&&m(e),disabled:f,"aria-expanded":g,"aria-controls":`disclosure-content-${e}`,children:[(0,C.jsxs)(`div`,{className:`disclosure-trigger-content`,children:[i&&(0,C.jsx)(`span`,{className:`disclosure-icon`,children:(0,C.jsx)(i,{size:18})}),(0,C.jsxs)(`div`,{className:`disclosure-trigger-text`,children:[(0,C.jsx)(`span`,{className:`disclosure-title`,children:t}),n&&(0,C.jsx)(`span`,{className:`disclosure-subtitle`,children:n})]}),a&&(0,C.jsx)(`span`,{className:`disclosure-badge`,children:a})]}),(0,C.jsx)(r.span,{className:`disclosure-chevron`,animate:{rotate:g?180:0},transition:{duration:x.fast,ease:S.out},children:(0,C.jsx)(o,{size:18})})]}),(0,C.jsx)(u,{initial:!1,children:g&&(0,C.jsx)(r.div,{id:`disclosure-content-${e}`,className:`disclosure-content ${d}`,initial:{height:0,opacity:0},animate:{height:`auto`,opacity:1,transition:{height:{duration:x.base,ease:S.out},opacity:{duration:x.fast,delay:.05}}},exit:{height:0,opacity:0,transition:{height:{duration:x.fast,ease:S.default},opacity:{duration:x.fast}}},children:(0,C.jsx)(`div`,{className:`disclosure-content-inner`,children:s})})}),(0,C.jsx)(`style`,{children:`
        .disclosure-item {
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          background: var(--color-surface);
          overflow: hidden;
          transition: border-color var(--motion-duration-fast) var(--motion-ease);
        }
        .disclosure-item:hover {
          border-color: var(--color-border-strong);
        }
        .disclosure-item--open {
          border-color: var(--color-border-strong);
        }

        .disclosure-trigger {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 1rem 1.25rem;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          color: var(--color-text);
          transition: background var(--motion-duration-fast) var(--motion-ease);
        }
        .disclosure-trigger:hover {
          background: var(--color-surface-raised);
        }
        .disclosure-trigger:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .disclosure-trigger-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
          min-width: 0;
        }

        .disclosure-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: var(--color-accent-soft);
          border-radius: var(--radius-md);
          color: var(--color-accent);
          flex-shrink: 0;
        }

        .disclosure-trigger-text {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          flex: 1;
          min-width: 0;
        }

        .disclosure-title {
          font-size: var(--text-base);
          font-weight: var(--font-weight-medium);
          color: var(--color-text);
        }

        .disclosure-subtitle {
          font-size: var(--text-sm);
          color: var(--color-text-muted);
        }

        .disclosure-badge {
          padding: 0.2rem 0.5rem;
          background: var(--color-accent-soft);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--color-accent);
          text-transform: uppercase;
          letter-spacing: var(--letter-spacing-wide);
        }

        .disclosure-chevron {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-subtle);
          flex-shrink: 0;
        }

        .disclosure-content {
          overflow: hidden;
        }

        .disclosure-content-inner {
          padding: 0 1.25rem 1.25rem;
          color: var(--color-text-muted);
          font-size: var(--text-sm);
          line-height: var(--line-height-relaxed);
        }

        /* Nested list styling */
        .disclosure-content-inner ul {
          padding-left: 1rem;
          margin: 0.5rem 0;
        }
        .disclosure-content-inner li {
          margin-bottom: 0.35rem;
          position: relative;
        }
        .disclosure-content-inner li::before {
          content: '▹';
          position: absolute;
          left: -1rem;
          color: var(--color-accent);
        }
      `})]})});function D({text:e}){return e?(0,C.jsx)(`span`,{children:e.split(/(Alpha Copilot|WealthAI|Agent Forge|75%|25%|95%\+|87%|40%|100\+)/g).map((e,t)=>t%2==1?(0,C.jsx)(`strong`,{style:{color:`var(--accent2)`},children:e},t):(0,C.jsx)(`span`,{children:e},t))}):null}var O=[{icon:s,value:`2+`,label:`Years`,color:`var(--color-accent)`},{icon:c,value:`100+`,label:`Users`,color:`var(--color-cat-2)`},{icon:l,value:`75%`,label:`Faster`,color:`var(--color-cat-4)`},{icon:y,value:`95%`,label:`Coverage`,color:`var(--color-cat-6)`}],k=[{key:`products`,icon:g,label:`Products`,color:`var(--color-cat-5)`,indices:[0,2,3,6,8]},{key:`perf`,icon:l,label:`Performance`,color:`var(--color-cat-6)`,indices:[1,10]},{key:`research`,icon:_,label:`Research`,color:`var(--color-cat-4)`,indices:[4,5]},{key:`quality`,icon:h,label:`Quality`,color:`var(--color-cat-2)`,indices:[7,11]},{key:`collab`,icon:v,label:`Collaboration`,color:`var(--color-text-subtle)`,indices:[9]}],A={"Software Development Intern":`Intern`,"Associate 2":`Assoc 2`,"Senior Associate":`Sr Assoc`,"Emerging Lead":`Lead`};function j({icon:e,value:t,label:n,color:i,index:a}){let o=(0,b.useRef)(null),s=f(o,{once:!0});return(0,C.jsxs)(r.div,{ref:o,initial:{opacity:0,y:16},animate:s?{opacity:1,y:0}:{},transition:{duration:.4,delay:a*.08},className:`career-stat-card`,style:{"--stat-color":i},children:[(0,C.jsx)(`div`,{className:`career-stat-icon`,children:(0,C.jsx)(e,{size:16})}),(0,C.jsx)(`div`,{className:`career-stat-value`,children:t}),(0,C.jsx)(`div`,{className:`career-stat-label`,children:n})]})}function M({steps:e,currentStep:t}){let n=e.indexOf(t);return(0,C.jsx)(`div`,{className:`career-progression`,children:e.map((r,i)=>{let a=r===t,o=i<n,s=A[r]||r;return(0,C.jsxs)(`div`,{className:`career-progression-step`,children:[(0,C.jsx)(`div`,{className:`career-progression-dot ${a?`career-progression-dot--active`:``} ${o?`career-progression-dot--past`:``}`}),(0,C.jsx)(`span`,{className:`career-progression-label ${a?`career-progression-label--active`:``}`,children:s}),i<e.length-1&&(0,C.jsx)(`div`,{className:`career-progression-line ${o||a?`career-progression-line--active`:``}`})]},r)})})}function N({icon:e,label:t,color:n,bullets:r,indices:i}){let a=i.map(e=>r[e]).filter(Boolean);return a.length?(0,C.jsxs)(`div`,{className:`career-category`,style:{"--cat-color":n},children:[(0,C.jsxs)(`div`,{className:`career-category-header`,children:[(0,C.jsx)(e,{size:12}),(0,C.jsx)(`span`,{children:t})]}),(0,C.jsx)(`ul`,{className:`career-category-list`,children:a.map((e,t)=>(0,C.jsxs)(`li`,{children:[(0,C.jsx)(`span`,{className:`career-bullet-dot`}),(0,C.jsx)(D,{text:e})]},t))})]}):null}function P({item:e,index:t}){let[n,i]=(0,b.useState)(`all`),o=e.progressionSteps?.length>0,c=e.company===`State Street Corporation`;return(0,C.jsxs)(`div`,{className:`career-entry`,children:[(0,C.jsx)(`div`,{className:`career-entry-dot ${t===0?`career-entry-dot--active`:``}`,children:t===0&&(0,C.jsx)(`span`,{className:`career-entry-pulse`})}),(0,C.jsx)(`div`,{className:`career-entry-content`,children:(0,C.jsx)(T,{defaultOpen:t===0?`main`:null,children:(0,C.jsxs)(E,{id:`main`,title:e.role,subtitle:`${e.company} · ${e.location}`,icon:a,badge:e.period,children:[e.description&&(0,C.jsx)(`p`,{className:`career-entry-desc`,children:e.description}),o&&(0,C.jsxs)(`div`,{className:`career-entry-section`,children:[(0,C.jsxs)(`div`,{className:`career-entry-section-label`,children:[(0,C.jsx)(s,{size:12}),(0,C.jsx)(`span`,{children:`Career Progression`})]}),(0,C.jsx)(M,{steps:e.progressionSteps,currentStep:e.currentRoleStep})]}),e.bullets&&(0,C.jsxs)(`div`,{className:`career-entry-section`,children:[(0,C.jsxs)(`div`,{className:`career-entry-section-label`,children:[(0,C.jsx)(l,{size:12}),(0,C.jsx)(`span`,{children:`Key Achievements`})]}),c?(0,C.jsxs)(C.Fragment,{children:[(0,C.jsxs)(`div`,{className:`career-category-tabs`,role:`group`,"aria-label":`Filter categories`,children:[(0,C.jsx)(`button`,{className:`career-category-tab ${n===`all`?`career-category-tab--active`:``}`,onClick:()=>i(`all`),"aria-pressed":n===`all`,children:`All`}),k.map(e=>(0,C.jsxs)(`button`,{className:`career-category-tab ${n===e.key?`career-category-tab--active`:``}`,onClick:()=>i(e.key),"aria-pressed":n===e.key,style:{"--tab-color":e.color},children:[(0,C.jsx)(e.icon,{size:11}),e.label]},e.key))]}),(0,C.jsx)(u,{mode:`wait`,children:(0,C.jsx)(r.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},exit:{opacity:0,y:-8},transition:{duration:.2},children:n===`all`?(0,C.jsx)(`div`,{className:`career-categories`,children:k.map(t=>(0,C.jsx)(N,{...t,bullets:e.bullets},t.key))}):(0,C.jsx)(N,{...k.find(e=>e.key===n),bullets:e.bullets})},n)})]}):(0,C.jsx)(`ul`,{className:`career-bullets`,children:e.bullets.map((e,t)=>(0,C.jsxs)(`li`,{children:[(0,C.jsx)(`span`,{className:`career-bullet-dot`}),(0,C.jsx)(D,{text:e})]},t))})]}),e.tags&&(0,C.jsxs)(`div`,{className:`career-entry-section`,children:[(0,C.jsxs)(`div`,{className:`career-entry-section-label`,children:[(0,C.jsx)(g,{size:12}),(0,C.jsx)(`span`,{children:`Tech Stack`})]}),(0,C.jsx)(`div`,{className:`career-tags`,children:e.tags.map(e=>(0,C.jsx)(m,{children:e},e))})]})]})})}),(0,C.jsx)(`style`,{children:`
        .career-stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          padding: 1rem;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          transition: all var(--motion-duration-fast) var(--motion-ease);
        }
        .career-stat-card:hover {
          border-color: var(--stat-color);
          transform: translateY(-2px);
        }
        .career-stat-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: color-mix(in srgb, var(--stat-color) 15%, transparent);
          border-radius: var(--radius-md);
          color: var(--stat-color);
        }
        .career-stat-value {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: var(--font-weight-bold);
          color: var(--color-text);
          line-height: 1;
        }
        .career-stat-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: var(--letter-spacing-wide);
          color: var(--color-text-muted);
        }

        .career-entry {
          position: relative;
          padding-left: 2.5rem;
        }
        .career-entry-dot {
          position: absolute;
          left: 0;
          top: 1.25rem;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--color-border-solid);
          border: 3px solid var(--color-bg);
          z-index: 2;
        }
        .career-entry-dot--active {
          background: var(--color-accent);
          box-shadow: 0 0 0 4px var(--color-accent-soft);
        }
        .career-entry-pulse {
          position: absolute;
          inset: -6px;
          border: 2px solid var(--color-accent);
          border-radius: 50%;
          animation: pulse-ring 2.5s ease-out infinite;
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          70% { transform: scale(1.8); opacity: 0; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        .career-entry-content {
          padding-bottom: 1.5rem;
        }
        .career-entry-desc {
          font-size: var(--text-sm);
          color: var(--color-text-muted);
          line-height: var(--line-height-relaxed);
          padding: 0.75rem 1rem;
          background: var(--color-accent-soft);
          border-left: 2px solid var(--color-accent);
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          margin-bottom: 1.25rem;
        }
        .career-entry-section {
          margin-bottom: 1.25rem;
        }
        .career-entry-section-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: var(--font-weight-semibold);
          text-transform: uppercase;
          letter-spacing: var(--letter-spacing-wide);
          color: var(--color-accent);
          margin-bottom: 0.75rem;
        }

        .career-progression {
          display: flex;
          align-items: flex-start;
          gap: 0;
          overflow-x: auto;
          padding-bottom: 0.5rem;
        }
        .career-progression-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          min-width: 70px;
        }
        .career-progression-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--color-border-solid);
          border: 2px solid transparent;
          flex-shrink: 0;
        }
        .career-progression-dot--active {
          background: var(--color-accent);
          border-color: var(--color-accent-soft);
          box-shadow: 0 0 0 3px var(--color-accent-soft);
        }
        .career-progression-dot--past {
          background: color-mix(in srgb, var(--color-accent) 50%, var(--color-border-solid));
        }
        .career-progression-label {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--color-text-subtle);
          margin-top: 0.35rem;
          text-align: center;
        }
        .career-progression-label--active {
          color: var(--color-accent);
          font-weight: var(--font-weight-semibold);
        }
        .career-progression-line {
          position: absolute;
          top: 4px;
          left: 50%;
          width: 100%;
          height: 2px;
          background: var(--color-border);
        }
        .career-progression-line--active {
          background: linear-gradient(90deg, var(--color-accent), color-mix(in srgb, var(--color-accent) 30%, var(--color-border)));
        }

        .career-category-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          margin-bottom: 1rem;
        }
        .career-category-tab {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.65rem;
          background: transparent;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          font-size: 0.7rem;
          font-weight: var(--font-weight-medium);
          color: var(--color-text-muted);
          cursor: pointer;
          transition: all var(--motion-duration-fast) var(--motion-ease);
        }
        .career-category-tab:hover {
          border-color: var(--tab-color, var(--color-border-strong));
          color: var(--tab-color, var(--color-text));
        }
        .career-category-tab--active {
          background: color-mix(in srgb, var(--tab-color, var(--color-accent)) 12%, transparent);
          border-color: var(--tab-color, var(--color-accent));
          color: var(--tab-color, var(--color-accent));
        }

        .career-categories {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .career-category {
          background: color-mix(in srgb, var(--cat-color) 5%, var(--color-surface));
          border: 1px solid color-mix(in srgb, var(--cat-color) 20%, var(--color-border));
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .career-category-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 0.75rem;
          background: color-mix(in srgb, var(--cat-color) 10%, transparent);
          border-bottom: 1px solid color-mix(in srgb, var(--cat-color) 15%, var(--color-border));
          font-size: 0.65rem;
          font-weight: var(--font-weight-semibold);
          text-transform: uppercase;
          letter-spacing: var(--letter-spacing-wide);
          color: var(--cat-color);
        }
        .career-category-list,
        .career-bullets {
          list-style: none;
          padding: 0.5rem 0.75rem;
          margin: 0;
        }
        .career-category-list li,
        .career-bullets li {
          display: flex;
          gap: 0.5rem;
          align-items: flex-start;
          padding: 0.35rem 0;
          font-size: var(--text-sm);
          color: var(--color-text-muted);
          line-height: 1.6;
        }
        .career-bullet-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--cat-color, var(--color-accent));
          flex-shrink: 0;
          margin-top: 0.55em;
          opacity: 0.7;
        }

        .career-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }

        @media (prefers-reduced-motion: reduce) {
          @keyframes pulse-ring { 0%, 100% { opacity: 0; } }
        }
      `})]})}function F(){return(0,C.jsxs)(`div`,{className:`career-timeline`,children:[(0,C.jsx)(`div`,{className:`career-stats-grid`,children:O.map((e,t)=>(0,C.jsx)(j,{...e,index:t},e.label))}),(0,C.jsxs)(`div`,{className:`career-timeline-track`,children:[(0,C.jsx)(`div`,{className:`career-timeline-line`}),d.map((e,t)=>(0,C.jsx)(P,{item:e,index:t},`${e.company}-${t}`))]}),(0,C.jsx)(`style`,{children:`
        .career-timeline {
          max-width: var(--container);
          margin: 0 auto;
        }
        .career-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
          margin-bottom: 2.5rem;
        }
        @media (max-width: 640px) {
          .career-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .career-timeline-track {
          position: relative;
          padding-left: 1rem;
        }
        .career-timeline-line {
          position: absolute;
          left: 5px;
          top: 1.25rem;
          bottom: 1.25rem;
          width: 2px;
          background: linear-gradient(to bottom, var(--color-accent), color-mix(in srgb, var(--color-accent) 30%, var(--color-border)) 60%, var(--color-border));
          border-radius: 1px;
        }
      `})]})}function I(){return(0,C.jsxs)(`section`,{className:`mvp2-page`,children:[(0,C.jsx)(p,{kicker:`Experience`,title:`Career Timeline`,description:`Enterprise AI software — RAG, LLM backends, and production systems at scale.`}),(0,C.jsx)(F,{})]})}export{I as default};