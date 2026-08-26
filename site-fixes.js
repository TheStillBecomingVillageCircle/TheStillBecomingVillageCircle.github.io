/* The Still Becoming Village Circle — reference-match responsive layer */
(function(){
  'use strict';

  const css = `
    /* Keep the header on ONE row like the reference. */
    .home-header{
      min-height:92px !important;
      padding:16px 28px !important;
      display:flex !important;
      flex-direction:row !important;
      align-items:center !important;
      justify-content:space-between !important;
      gap:24px !important;
    }
    .brand{
      flex:1 1 auto !important;
      min-width:0 !important;
      display:flex !important;
      align-items:center !important;
      white-space:nowrap !important;
      overflow:visible !important;
      font-family:Georgia,'Times New Roman',serif !important;
      font-weight:600 !important;
      color:#15545b !important;
    }
    .brand-mark{flex:0 0 auto !important}
    .header-menu{
      flex:0 0 auto !important;
      display:grid !important;
      place-items:center !important;
      width:58px !important;
      height:58px !important;
      border-radius:50% !important;
    }

    /* The reference has ALL seven destinations in one horizontal band.
       Never collapse them into a 2-column/1-column stack. */
    .destination-band{
      overflow:hidden !important;
      padding:18px 10px 16px !important;
    }
    .destinations{
      display:flex !important;
      flex-wrap:nowrap !important;
      align-items:flex-end !important;
      justify-content:space-between !important;
      width:min(1180px,100%) !important;
      gap:0 !important;
      margin:0 auto !important;
    }
    .destination{
      flex:1 1 0 !important;
      width:auto !important;
      min-width:0 !important;
      margin:0 !important;
      padding:0 4px !important;
    }
    .dest-art{
      width:100% !important;
      height:128px !important;
    }
    .dest-label{
      font-family:Georgia,'Times New Roman',serif !important;
      color:#154e56 !important;
      font-size:clamp(12px,1.7vw,21px) !important;
      line-height:1.08 !important;
      text-align:center !important;
    }

    /* Reference-like hero spacing. */
    .hero{
      min-height:1100px !important;
      padding:32px 20px 90px !important;
    }
    .belong-pill{margin-bottom:18px !important}
    .hero-bubble{margin-bottom:10px !important}
    .hero h1{margin-bottom:30px !important}

    @media(max-width:900px){
      .home-header{padding:15px 22px !important}
      .brand{font-size:clamp(18px,3.5vw,28px) !important}
      .header-menu{width:54px !important;height:54px !important}
      .dest-art{height:108px !important}
      .dest-label{font-size:14px !important}
      .destination{padding:0 2px !important}
    }

    @media(max-width:650px){
      /* Phone: still one row, matching the reference composition.
         The destination band is allowed to scroll horizontally rather
         than becoming a tall 2-column menu. */
      .home-header{
        min-height:78px !important;
        padding:11px 16px !important;
        gap:10px !important;
      }
      .brand{
        font-size:17px !important;
        letter-spacing:-.03em !important;
      }
      .brand-mark{width:31px !important;height:31px !important}
      .header-menu{width:48px !important;height:48px !important}

      .destination-band{
        padding:13px 6px 15px !important;
        overflow-x:auto !important;
        overflow-y:hidden !important;
        -webkit-overflow-scrolling:touch !important;
        scrollbar-width:none !important;
      }
      .destination-band::-webkit-scrollbar{display:none !important}
      .destinations{
        width:max(100%,700px) !important;
        min-width:700px !important;
      }
      .destination{
        flex:0 0 100px !important;
        width:100px !important;
        min-width:100px !important;
        padding:0 2px !important;
      }
      .dest-art{height:92px !important}
      .dest-label{font-size:12px !important}
      .destination.active:after{width:34px !important;height:2px !important;margin-top:4px !important}

      .hero{
        min-height:850px !important;
        padding:25px 17px 75px !important;
      }
      .belong-pill{padding:9px 17px !important;font-size:15px !important}
      .hero-bubble{width:220px !important;height:220px !important;min-width:220px !important;min-height:220px !important}
      .hero h1{font-size:45px !important}
      .intro{font-size:17px !important}
      .quote{font-size:21px !important}
      .welcome-copy{font-size:16px !important}
    }

    @media(max-width:390px){
      .brand{font-size:15.5px !important}
      .destination{flex-basis:88px !important;width:88px !important;min-width:88px !important}
      .destinations{min-width:616px !important;width:max(100%,616px) !important}
      .dest-art{height:84px !important}
      .dest-label{font-size:11px !important}
      .hero h1{font-size:40px !important}
      .hero-bubble{width:200px !important;height:200px !important;min-width:200px !important;min-height:200px !important}
    }
  `;

  function install(){
    if(document.getElementById('tsbvc-reference-match')) return;
    const style=document.createElement('style');
    style.id='tsbvc-reference-match';
    style.textContent=css;
    document.head.appendChild(style);
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',install,{once:true});
  }else{
    install();
  }
})();
