import{a as e}from"./rolldown-runtime-B0Z9INg1.js";import{dt as t}from"./icons-lxqhqUN4.js";import{t as n}from"./react-vendor-D_G4Vuww.js";import{t as r}from"./use-spring-HM2hjNA3.js";import{t as i}from"./AnimatePresence-T10WJRkC.js";import{n as a}from"./index-RTcsbFzi.js";var o=e(t(),1),s=n(),c=()=>{let[e,t]=(0,o.useState)(`home`),[n,c]=(0,o.useState)(!1),[l,u]=(0,o.useState)(!1),d=(0,o.useRef)(null),f=(0,o.useRef)(null),p=(0,o.useRef)(`home`),m=[{label:`Home`,id:`home`},{label:`Problem`,id:`problem`},{label:`Solution`,id:`solution`},{label:`Contact`,id:`contact`}],h=r(140,{stiffness:220,damping:25,mass:1}),g=r(0,{stiffness:220,damping:25,mass:1}),_=()=>{f.current&&(clearTimeout(f.current),f.current=null)},v=()=>{_(),f.current=setTimeout(()=>{c(!1),h.set(140),f.current=null},600)};(0,o.useEffect)(()=>()=>{_()},[]);let y=()=>{_(),c(!0),h.set(580)},b=()=>{v()},x=e=>{u(!0),p.current=e,t(e),v(),setTimeout(()=>{u(!1)},400)},S=m.find(t=>t.id===e);return(0,s.jsxs)(a.nav,{onMouseEnter:y,onMouseLeave:b,className:`relative rounded-full`,style:{width:h,height:`56px`,background:`
          linear-gradient(135deg, 
            #fcfcfd 0%, 
            #f8f8fa 15%, 
            #f3f4f6 30%, 
            #eeeff2 45%, 
            #e9eaed 60%, 
            #e4e5e8 75%, 
            #dee0e3 90%, 
            #e2e3e6 100%
          )
        `,boxShadow:n?`
            0 2px 4px rgba(0, 0, 0, 0.08),
            0 6px 12px rgba(0, 0, 0, 0.12),
            0 12px 24px rgba(0, 0, 0, 0.14),
            0 24px 48px rgba(0, 0, 0, 0.10),
            inset 0 2px 2px rgba(255, 255, 255, 0.8),
            inset 0 -3px 8px rgba(0, 0, 0, 0.12),
            inset 3px 3px 8px rgba(0, 0, 0, 0.10),
            inset -3px 3px 8px rgba(0, 0, 0, 0.09),
            inset 0 -1px 2px rgba(0, 0, 0, 0.08)
          `:l?`
            0 3px 6px rgba(0, 0, 0, 0.10),
            0 8px 16px rgba(0, 0, 0, 0.08),
            0 16px 32px rgba(0, 0, 0, 0.06),
            0 1px 2px rgba(0, 0, 0, 0.10),
            inset 0 2px 1px rgba(255, 255, 255, 0.85),
            inset 0 -2px 6px rgba(0, 0, 0, 0.08),
            inset 2px 2px 8px rgba(0, 0, 0, 0.06),
            inset -2px 2px 8px rgba(0, 0, 0, 0.05),
            inset 0 0 1px rgba(0, 0, 0, 0.12),
            inset 0 0 20px rgba(255, 255, 255, 0.15)
          `:`
            0 3px 6px rgba(0, 0, 0, 0.12),
            0 8px 16px rgba(0, 0, 0, 0.10),
            0 16px 32px rgba(0, 0, 0, 0.08),
            0 1px 2px rgba(0, 0, 0, 0.12),
            inset 0 2px 1px rgba(255, 255, 255, 0.7),
            inset 0 -2px 6px rgba(0, 0, 0, 0.10),
            inset 2px 2px 8px rgba(0, 0, 0, 0.08),
            inset -2px 2px 8px rgba(0, 0, 0, 0.07),
            inset 0 0 1px rgba(0, 0, 0, 0.15)
          `,x:g,overflow:`hidden`,transition:`box-shadow 0.3s ease-out`},children:[(0,s.jsx)(`div`,{className:`pointer-events-none absolute inset-x-0 top-0 rounded-t-full`,style:{height:`2px`,background:`linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.95) 5%, rgba(255, 255, 255, 1) 15%, rgba(255, 255, 255, 1) 85%, rgba(255, 255, 255, 0.95) 95%, rgba(255, 255, 255, 0) 100%)`,filter:`blur(0.3px)`}}),(0,s.jsx)(`div`,{className:`pointer-events-none absolute inset-x-0 top-0 rounded-full`,style:{height:`55%`,background:`linear-gradient(180deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.25) 30%, rgba(255, 255, 255, 0.10) 60%, rgba(255, 255, 255, 0) 100%)`}}),(0,s.jsx)(`div`,{className:`pointer-events-none absolute inset-0 rounded-full`,style:{background:`linear-gradient(135deg, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.20) 20%, rgba(255, 255, 255, 0.08) 40%, rgba(255, 255, 255, 0) 65%)`}}),(0,s.jsx)(`div`,{className:`pointer-events-none absolute rounded-full`,style:{left:n?`18%`:`15%`,top:`16%`,width:n?`140px`:`60px`,height:`14px`,background:`radial-gradient(ellipse at center, rgba(255, 255, 255, 0.70) 0%, rgba(255, 255, 255, 0.35) 40%, rgba(255, 255, 255, 0.10) 70%, rgba(255, 255, 255, 0) 100%)`,filter:`blur(4px)`,transform:`rotate(-12deg)`,transition:`all 0.3s ease`}}),n&&(0,s.jsx)(`div`,{className:`pointer-events-none absolute rounded-full`,style:{right:`22%`,top:`20%`,width:`80px`,height:`10px`,background:`radial-gradient(ellipse at center, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.15) 60%, rgba(255, 255, 255, 0) 100%)`,filter:`blur(3px)`,transform:`rotate(8deg)`}}),n&&(0,s.jsx)(`div`,{className:`pointer-events-none absolute inset-y-0 left-0 rounded-l-full`,style:{width:`35%`,background:`linear-gradient(90deg, rgba(255, 255, 255, 0.20) 0%, rgba(255, 255, 255, 0.10) 40%, rgba(255, 255, 255, 0.03) 70%, rgba(255, 255, 255, 0) 100%)`}}),n&&(0,s.jsx)(`div`,{className:`pointer-events-none absolute inset-y-0 right-0 rounded-r-full`,style:{width:`35%`,background:`linear-gradient(270deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.05) 40%, rgba(0, 0, 0, 0.02) 70%, rgba(0, 0, 0, 0) 100%)`}}),(0,s.jsx)(`div`,{className:`pointer-events-none absolute inset-x-0 bottom-0 rounded-b-full`,style:{height:`50%`,background:`linear-gradient(0deg, rgba(0, 0, 0, 0.14) 0%, rgba(0, 0, 0, 0.08) 25%, rgba(0, 0, 0, 0.03) 50%, rgba(0, 0, 0, 0) 100%)`}}),(0,s.jsx)(`div`,{className:`pointer-events-none absolute inset-x-0 bottom-0 rounded-b-full`,style:{height:`20%`,background:`linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0) 100%)`,filter:`blur(2px)`}}),(0,s.jsx)(`div`,{className:`pointer-events-none absolute inset-0 rounded-full`,style:{boxShadow:`inset 0 0 40px rgba(255, 255, 255, 0.22)`,opacity:.7}}),(0,s.jsx)(`div`,{className:`pointer-events-none absolute inset-0 rounded-full`,style:{boxShadow:`inset 0 0 0 0.5px rgba(0, 0, 0, 0.10)`}}),(0,s.jsxs)(`div`,{ref:d,className:`relative z-10 flex h-full items-center justify-center px-6`,style:{fontFamily:`Inter, -apple-system, BlinkMacSystemFont, "SF Pro", Poppins, sans-serif`},children:[!n&&(0,s.jsx)(`div`,{className:`relative flex items-center`,children:(0,s.jsx)(i,{mode:`wait`,children:S&&(0,s.jsx)(a.span,{initial:{opacity:0,y:8,filter:`blur(4px)`},animate:{opacity:1,y:0,filter:`blur(0px)`},exit:{opacity:0,y:-8,filter:`blur(4px)`},transition:{duration:.35,ease:[.4,0,.2,1]},style:{fontSize:`15.5px`,fontWeight:680,color:`#1a1a1a`,letterSpacing:`0.45px`,whiteSpace:`nowrap`,fontFamily:`Inter, -apple-system, BlinkMacSystemFont, "SF Pro Display", Poppins, sans-serif`,WebkitFontSmoothing:`antialiased`,MozOsxFontSmoothing:`grayscale`,textShadow:`
                      0 1px 0 rgba(0, 0, 0, 0.35),
                      0 -1px 0 rgba(255, 255, 255, 0.8),
                      1px 1px 0 rgba(0, 0, 0, 0.18),
                      -1px 1px 0 rgba(0, 0, 0, 0.15)
                    `},children:S.label},S.id)})}),n&&(0,s.jsx)(`div`,{className:`flex w-full items-center justify-evenly`,children:m.map((t,n)=>{let r=t.id===e;return(0,s.jsx)(a.button,{type:`button`,initial:{opacity:0,x:-10},animate:{opacity:1,x:0},exit:{opacity:0,x:-10},transition:{delay:n*.08,duration:.25,ease:`easeOut`},onClick:()=>x(t.id),className:`relative cursor-pointer transition-all duration-200`,style:{fontSize:r?`15.5px`:`15px`,fontWeight:r?680:510,color:r?`#1a1a1a`:`#656565`,textDecoration:`none`,letterSpacing:`0.45px`,background:`transparent`,border:`none`,padding:`10px 16px`,outline:`none`,whiteSpace:`nowrap`,fontFamily:`Inter, -apple-system, BlinkMacSystemFont, "SF Pro Display", Poppins, sans-serif`,WebkitFontSmoothing:`antialiased`,MozOsxFontSmoothing:`grayscale`,transform:r?`translateY(-1.5px)`:`translateY(0)`,textShadow:r?`
                        0 1px 0 rgba(0, 0, 0, 0.35),
                        0 -1px 0 rgba(255, 255, 255, 0.8),
                        1px 1px 0 rgba(0, 0, 0, 0.18),
                        -1px 1px 0 rgba(0, 0, 0, 0.15)
                      `:`
                        0 1px 0 rgba(0, 0, 0, 0.22),
                        0 -1px 0 rgba(255, 255, 255, 0.65),
                        1px 1px 0 rgba(0, 0, 0, 0.12),
                        -1px 1px 0 rgba(0, 0, 0, 0.10)
                      `},onMouseEnter:e=>{r||(e.currentTarget.style.color=`#3a3a3a`,e.currentTarget.style.transform=`translateY(-0.5px)`,e.currentTarget.style.textShadow=`
                        0 1px 0 rgba(0, 0, 0, 0.28),
                        0 -1px 0 rgba(255, 255, 255, 0.72),
                        1px 1px 0 rgba(0, 0, 0, 0.15),
                        -1px 1px 0 rgba(0, 0, 0, 0.12)
                      `)},onMouseLeave:e=>{r||(e.currentTarget.style.color=`#656565`,e.currentTarget.style.transform=`translateY(0)`,e.currentTarget.style.textShadow=`
                        0 1px 0 rgba(0, 0, 0, 0.22),
                        0 -1px 0 rgba(255, 255, 255, 0.65),
                        1px 1px 0 rgba(0, 0, 0, 0.12),
                        -1px 1px 0 rgba(0, 0, 0, 0.10)
                      `)},children:t.label},t.id)})})]})]})};function l(){return(0,s.jsx)(`div`,{style:{background:`#ffffff`,minHeight:`100vh`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,s.jsx)(c,{})})}export{l as default};