(this["webpackJsonpportfolio-viewer"]=this["webpackJsonpportfolio-viewer"]||[]).push([[0],{375:function(e,t,a){e.exports=a(687)},486:function(e,t){},488:function(e,t){},521:function(e,t){},522:function(e,t){},687:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),l=a(18),i=a.n(l),c=a(69),o=a(733),m=a(343),u=a(732),s=a(734),p=a(735),d=a(723),f=a(717),h=a(739),E=a(692),g=a(342),b=a.n(g),y=a(341),v=a.n(y),x=a(340),S=a.n(x),w=a(107),O=a.n(w),j=a(319),k=a.n(j),A={palette:{primary:{main:"#fe9526"},secondary:{main:"#ffcc30"},success:{main:"#53d86a"},error:{main:"#fd3d39"}},overrides:{MuiPaper:{root:{borderRadius:"1px",padding:"8px"}}},props:{MuiPaper:{square:!0}},typography:{htmlFontSize:14,fontFamily:["Open Sans","Arial","sans-serif"].join(","),h1:{fontSize:"2.986rem"},h2:{fontSize:"2.488rem"},h3:{fontSize:"2.074rem"},h4:{fontSize:"1.728rem"},h5:{fontSize:"1.44rem"},h6:{fontSize:"1.2rem"}}},M={THEME_LIGHT:{palette:{type:"light"}},THEME_DARK:{palette:{type:"dark",background:{default:"#0d1c2e",paper:"#162a3f"}}}},T=O()(M,(function(e){return k()(e,A)})),C=a(320),P=a(321),N=a(108),K=a(346),D=a(344),B=a(57),z=a(338),F=a.n(z),I=a(731),R=a(740),H=a(716),W=a(718),L=a(736),G=a(721),U=a(322),_=a.n(U),J=function(e){var t=e.open,a=e.onChange,n=e.onSubmit,l=e.initialValues,i=void 0===l?{}:l,o=r.a.useState(i.apiKey||""),m=Object(c.a)(o,2),u=m[0],s=m[1],p=r.a.useState(i.apiSecret||""),d=Object(c.a)(p,2),h=d[0],E=d[1];return r.a.createElement(R.a,{expanded:t,onChange:function(e,t){return a(t)}},r.a.createElement(H.a,{expandIcon:r.a.createElement(_.a,null),"aria-controls":"panel1a-content",id:"panel1a-header"},r.a.createElement(f.a,{variant:"h4"},"API Credentials")),r.a.createElement(W.a,null,r.a.createElement("div",{style:{width:"100%"}},r.a.createElement(f.a,{gutterBottom:!0},"These credentials stay in your browser and won't be saved anywhere."),r.a.createElement(f.a,{gutterBottom:!0,variant:"body2"},"The API signature is calculated by the browser so that the API secret never needs to be shared."),r.a.createElement("br",null),r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),n({apiKey:u,apiSecret:h})}},r.a.createElement(L.a,{id:"apiKey",value:u,onChange:function(e){return s(e.currentTarget.value)},label:"Bitmex API ID",variant:"outlined",fullWidth:!0,size:"small"}),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(L.a,{id:"apiSecret",value:h,onChange:function(e){return E(e.currentTarget.value)},label:"Bitmex API Secret",variant:"outlined",fullWidth:!0,size:"small"}),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("div",{style:{textAlign:"right"}},r.a.createElement(G.a,{type:"submit",variant:"contained",color:"primary"},"Update"))))))},V=a(323),q=a.n(V),X=a(324),$=a.n(X),Q=a(325),Y=a.n(Q),Z=a(326),ee=a.n(Z),te=a(113),ae=a.n(te),ne="https://www.bitmex.com/api/v1",re=q.a.create();function le(e,t){return console.debug("Bitmex signature message: ",t),$.a.stringify(Y()(t,e))}var ie=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=t.apiKey,n=t.apiSecret;if(!n||!a)return e;var r=e.method,l=void 0===r?"GET":r,i=e.url,c=e.data,o="",m="",u=(new Date).getTime()+6e4;if(e.params){var s=new URLSearchParams;ee()(e.params,(function(e,t){return s.append(t,e)})),o="?".concat(s.toString())}e.data&&(m=JSON.stringify(c));var p=l.toUpperCase()+"/api/v1"+i+o+u+m,d=le(n,p);return ae()(e,["headers","api-expires"],u),ae()(e,["headers","api-signature"],d),ae()(e,["headers","api-key"],a),ae()(e,["url"],"".concat(e.url).concat(o)),delete e.params,e},ce="https://thingproxy.freeboard.io/fetch/",oe=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=ie(e,t);return a.url="".concat(ce).concat(ne).concat(a.url),re(a).then((function(e){return e.data}))},me=a(345),ue=a(110),se=a(202),pe=a(111),de=a.n(pe),fe=a(55),he=a.n(fe),Ee=a(201),ge=a.n(Ee),be=a(27),ye=a(691),ve=a(724),xe=a(725),Se=a(738),we=a(726),Oe=a(727),je=a(728),ke=a(729),Ae=a(730),Me=a(336),Te=a.n(Me),Ce=a(337),Pe=a.n(Ce),Ne=a(19),Ke=a(722),De=a(737),Be=a(25),ze=a.n(Be),Fe=a(112),Ie=a.n(Fe),Re=a(60),He=a.n(Re),We=a(47),Le=function(e){var t=e.map((function(e){return Object(ue.a)({},e,{walletBalance:e.walletBalance/1e8,amount:e.amount/1e8})}));return function(e){var t=e.balances,a=e.transfers,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.dateKey,l=void 0===r?"transactTime":r,i=n.balanceKey,c=void 0===i?"walletBalance":i,o=t.sort((function(e,t){return new Date(e[l]).getTime()-new Date(t[l]).getTime()})).map((function(e){return e[l]}));return o.map((function(e,n){var r=new Date(e),i=r.getTime(),m=new Date(ze()(o,[n-1],0)).getTime(),u=a.filter((function(e){var t=new Date(e[l]).getTime();return t-m>0&&t-i<=0})),s=de()(Ie()(u,(function(e){return e.amount<0})),"amount"),p=de()(Ie()(u,(function(e){return e.amount>0})),"amount"),d=ze()(t,[n,c],NaN),f=0===n?0:ze()(t,[n-1,c],NaN),h=p-Math.abs(s);return{balance:d,change:(d-f-h)/(f+.5*h),date:r,deposit:p,flow:h,withdrawal:Math.abs(s)}}))}({balances:He()(t.filter((function(e){return"RealisedPNL"===e.transactType})),(function(e){return new Date(e.transactTime).setUTCHours(12,0,0,0)})),transfers:t.filter((function(e){return["Deposit","Withdrawal","AffiliatePayout"].includes(e.transactType)}))},{dateKey:"transactTime",balanceKey:"walletBalance"})},Ge=function(e,t){return e.length<t?NaN:function(e){return e.reduce((function(e,t){return(t+1)*e}),1)-1}(e.slice(-t))},Ue=function(e){return Object(De.a)(e,"yyyy-MM-dd")},_e=function(e){var t=e.data,a=function(){var e=Math.max.apply(Math,Object(se.a)(t.map((function(e){return 100*e.performance})))),a=Math.min.apply(Math,Object(se.a)(t.map((function(e){return 100*e.performance}))));return e<=0?0:a>=0?1:e/(e-a)}(),n=Object(be.a)(),l=n.palette.text.primary,i=n.palette.getContrastText("#fff"),c=n.palette.success.main,o=n.palette.error.main,m=n.palette.primary.main;return r.a.createElement(Ne.j,null,r.a.createElement(Ne.b,{data:t.map((function(e){return{date:e.date,Performance:100*e.performance}}))},r.a.createElement(Ne.c,{strokeDasharray:"3 3"}),r.a.createElement(Ne.l,{dataKey:"date"}),r.a.createElement(Ne.m,{tickFormatter:function(e){return"".concat(e,"%")},label:{value:"Performance",angle:-90,position:"insideLeft",style:{textAnchor:"middle",fill:l}}}),r.a.createElement(Ne.k,{contentStyle:{color:i},formatter:function(e){return"".concat(e.toFixed(2),"%")}}),r.a.createElement(Ne.e,null),r.a.createElement("defs",null,r.a.createElement("linearGradient",{id:"splitColor",x1:"0",y1:"0",x2:"0",y2:"1"},r.a.createElement("stop",{offset:a,stopColor:c,stopOpacity:1}),r.a.createElement("stop",{offset:a,stopColor:o,stopOpacity:1}))),r.a.createElement(Ne.a,{type:"monotoneX",dataKey:"Performance",fill:"url(#splitColor)",stroke:m,strokeWidth:2,dot:{stroke:m,fill:m,fillOpacity:1},activeDot:{r:8}})))},Je=function(e){var t=e.data,a=Object(be.a)(),n=a.palette.text.primary,l=a.palette.getContrastText("#fff"),i=a.palette.primary.main,c=t.map((function(e){return{date:e.date,return:100*e.sevenMA}}));return r.a.createElement(Ne.j,null,r.a.createElement(Ne.g,{data:c},r.a.createElement(Ne.c,{strokeDasharray:"2 2"}),r.a.createElement(Ne.l,{dataKey:"date"}),r.a.createElement(Ne.m,{unit:"%",label:{value:"Annualised Return",angle:-90,position:"insideLeft",style:{textAnchor:"middle",fill:n}}}),r.a.createElement(Ne.k,{labelStyle:{color:l},formatter:function(e){return["".concat(e.toFixed(2),"%"),"MA(7) Annualised Return"]}}),r.a.createElement(Ne.e,{formatter:function(e){return"MA(7)"}}),r.a.createElement(Ne.f,{type:"monotoneX",dataKey:"return",stroke:i,activeDot:{r:8},strokeWidth:3,dot:{stroke:i,fill:i,fillOpacity:1}})))},Ve=function(e){var t=e.data,a=Object(be.a)(),n=a.palette.text.primary,l=a.palette.background.paper,i=[a.palette.primary.dark,a.palette.primary.main,a.palette.primary.light];return r.a.createElement(Ne.j,null,r.a.createElement(Ne.i,null,r.a.createElement(Ne.h,{dataKey:"allocation",nameKey:"instrument",data:t.sort((function(e,t){return t.allocation-e.allocation})),labelLine:!0,outerRadius:90,stroke:l,strokeWidth:3,labelStyle:{color:n,fill:n}},t.map((function(e,t){return r.a.createElement(Ne.d,{key:"cell-".concat(t),fill:i[t%i.length]})}))),r.a.createElement(Ne.k,{formatter:function(e){return"".concat((100*e).toFixed(0),"%")}}),r.a.createElement(Ne.e,{align:"right",verticalAlign:"middle",layout:"vertical",formatter:function(e,t){return"".concat(e," (").concat((100*t.payload.percent).toFixed(0),"%)")}})))},qe=Object(Ke.a)((function(e){return{paperMessage:Object(B.a)({textAlign:"center",height:"400px",padding:e.spacing(0)},e.breakpoints.up("md"),{padding:e.spacing(4)}),paper:Object(B.a)({padding:e.spacing(1,0)},e.breakpoints.up("md"),{padding:e.spacing(4)}),heading:Object(B.a)({textAlign:"center"},e.breakpoints.up("md"),{textAlign:"left"}),descriptionBox:{padding:"16px"}}})),Xe=function(e){var t=e.value,a=Object(be.a)(),n={fontWeight:500,fontSize:"2em"};return!he()(t)||Number.isNaN(t)?r.a.createElement("span",{style:n},"N.A."):r.a.createElement("span",{style:Object(ue.a)({},n,{color:t>0?a.palette.success.main:a.palette.error.main})},t>0?r.a.createElement(Te.a,{style:{fontSize:"0.7em"}}):r.a.createElement(Pe.a,{style:{fontSize:"0.7em"}}),"".concat((100*Math.abs(t)).toFixed(2),"%"))},$e=function(e){var t=e.fetching,a=e.error,n=e.walletHistory,l=void 0===n?[]:n,i=e.position,c=void 0===i?[]:i,o=Object(be.a)(),m=qe();if(t)return r.a.createElement(ye.a,{className:m.paperMessage},r.a.createElement(d.a,{container:!0,justify:"center",alignContent:"center",style:{height:"100%"}},r.a.createElement(d.a,{item:!0},r.a.createElement(ve.a,null),r.a.createElement(f.a,null,"Retrieving"))));if(a)return r.a.createElement(ye.a,{className:m.paperMessage},r.a.createElement(d.a,{container:!0,justify:"center",alignContent:"center",style:{height:"100%"}},r.a.createElement(d.a,{item:!0},r.a.createElement(ge.a,{fontSize:"large",color:"error"}),r.a.createElement(f.a,{color:"error"},"Failed to load data with API keys"))));if(0===l.length||0===c.length)return r.a.createElement(ye.a,{className:m.paperMessage},r.a.createElement(d.a,{container:!0,justify:"center",alignContent:"center",style:{height:"100%"}},r.a.createElement(d.a,{item:!0},r.a.createElement(ge.a,{fontSize:"large"}),r.a.createElement(f.a,null,"Please add your API keys to retrieve portfolio performance"))));var u=Le(l),s=u.map((function(e){return e.change})),p=u[u.length-1].balance,h=Object(We.sampleKurtosis)(s),E=365*Ge(s,30),g=365*Ge(s,7),b=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=e.map((function(e){return e-t}));return Object(We.mean)(a)/Object(We.sampleStandardDeviation)(e)}(s,0),y=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=e.map((function(e){return e-t})),n=e.map((function(e){return Math.min(e,0)*Math.min(e,0)}));return Object(We.mean)(a)/Math.sqrt(Object(We.mean)(n))}(s,0),v=Object(We.sampleSkewness)(s),x=function(e){var t=0;return e.map((function(e){return t=(t+1)*(e+1)-1}))}(s),S=function(e,t){return function(e,t){return e.map((function(a,n){var r=n+1-t,l=n+1;return r<0?[]:e.slice(r,l)}))}(e,t).map((function(e){return 0===e.length?NaN:Object(We.mean)(e)}))}(s,7),w=u.map((function(e,t){var a=e.date,n=Object(me.a)(e,["date"]);return Object(ue.a)({date:Ue(a),change:s[t]},n,{balance:n.balance,sevenMA:365*S[t],performance:x[t]})}));console.debug(w);var O=de()(c,"maintMargin"),j=c.map((function(e){return{allocation:e.maintMargin/O,instrument:e.symbol}}));return r.a.createElement(ye.a,{className:m.paper},r.a.createElement(f.a,{variant:"h1",gutterBottom:!0},"Portfolio Overview"),r.a.createElement(d.a,{container:!0,justify:"space-between",alignContent:"center",alignItems:"center",style:{textAlign:"center"}},r.a.createElement(d.a,{item:!0,xs:6,md:3},r.a.createElement(f.a,{align:"center",variant:"caption"},r.a.createElement("span",{style:{fontWeight:500,fontSize:"2em"}},"".concat(p.toFixed(3)," BTC")),r.a.createElement("br",null),"AUM",r.a.createElement("br",null))),r.a.createElement(d.a,{item:!0,xs:6,md:3},r.a.createElement(f.a,{align:"center",variant:"caption"},r.a.createElement("span",{style:{fontWeight:500,fontSize:"2em",color:o.palette.primary.main}},b.toFixed(2)),r.a.createElement("br",null),"Sharpe Ratio")),r.a.createElement(d.a,{item:!0,xs:6,md:3},r.a.createElement(f.a,{align:"center",variant:"caption"},r.a.createElement(Xe,{value:g}),r.a.createElement("br",null),"Annualised Return",r.a.createElement("br",null),"(7 Days)")),r.a.createElement(d.a,{item:!0,xs:6,md:3},r.a.createElement(f.a,{align:"center",variant:"caption"},r.a.createElement(Xe,{value:E}),r.a.createElement("br",null),"Annualised Return",r.a.createElement("br",null),"(30 Days)"))),r.a.createElement("br",null),r.a.createElement(xe.a,null),r.a.createElement("br",null),r.a.createElement(f.a,{variant:"h5",gutterBottom:!0,className:m.heading},"Overall Portfolio Performance"),r.a.createElement("div",{style:{height:"350px",margin:"24px 8px 16px"}},r.a.createElement(_e,{data:w})),r.a.createElement("br",null),r.a.createElement(xe.a,null),r.a.createElement("br",null),r.a.createElement(f.a,{variant:"h5",gutterBottom:!0,className:m.heading},"Annualised Returns"),r.a.createElement("div",{style:{height:"350px",margin:"24px 8px 16px"}},r.a.createElement(Je,{data:w})),r.a.createElement("br",null),r.a.createElement(xe.a,null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(d.a,{container:!0,justify:"space-around",spacing:2},r.a.createElement(d.a,{item:!0,xs:12,md:5},r.a.createElement(f.a,{variant:"h5",className:m.heading},"Current Margin Allocation"),r.a.createElement("div",{style:{height:"250px",margin:"0 8px"}},r.a.createElement(Ve,{data:j}))),r.a.createElement(d.a,{item:!0,xs:12,md:5},r.a.createElement(Se.a,{mdUp:!0},r.a.createElement("br",null),r.a.createElement(xe.a,null),r.a.createElement("br",null),r.a.createElement("br",null)),r.a.createElement(f.a,{variant:"h5",className:m.heading},"Portfolio Indicators"),r.a.createElement(we.a,null,r.a.createElement(Oe.a,{"aria-label":"simple table"},r.a.createElement(je.a,null,[{name:"",value:""},{name:"Sharpe Ratio",value:b.toFixed(3)},{name:"Sortino Ratio",value:y.toFixed(3)},{name:"Skewness",value:v.toFixed(3)},{name:"Kurtosis",value:h.toFixed(3)}].map((function(e){var t=e.name,a=e.value;return r.a.createElement(ke.a,{key:a},r.a.createElement(Ae.a,{component:"th",scope:"row"},t),r.a.createElement(Ae.a,{align:"right"},a))}))))))))},Qe=function(e){Object(K.a)(a,e);var t=Object(D.a)(a);function a(e){var n;return Object(C.a)(this,a),(n=t.call(this,e)).state={fetching:!1,isAuthOpen:!0,error:null,credentials:{},data:{}},n.handleAuthPanelChange=n.handleAuthPanelChange.bind(Object(N.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(N.a)(n)),n}return Object(P.a)(a,[{key:"handleAuthPanelChange",value:function(e){this.setState({isAuthOpen:e})}},{key:"handleSubmit",value:function(e){var t=this,a=this.state.credentials;e.apiKey&&e.apiSecret&&(e.apiSecret!==a.apiSecret||e.apiKey!==a.apiKey)&&(this.setState({credentials:e,fetching:!0}),Promise.all([oe({url:"/position"},e),oe({url:"/user/walletHistory"},e)]).then((function(e){var a=Object(c.a)(e,2),n=a[0],r=a[1];t.setState({isAuthOpen:!1,fetching:!1,data:{position:n,walletHistory:r}})})).catch((function(e){t.setState({error:e,fetching:!1})})))}},{key:"render",value:function(){var e=this,t=this.props.classes,a=this.state,n=a.fetching,l=a.credentials,i=a.data,c=a.isAuthOpen,o=a.error;return r.a.createElement(I.a,{maxWidth:"lg",className:t.container},r.a.createElement(J,{open:c,onChange:this.handleAuthPanelChange,initialValues:l,onSubmit:function(t){return e.handleSubmit(t)}}),r.a.createElement($e,{fetching:n,walletHistory:i.walletHistory,position:i.position,error:o}))}}]),a}(n.Component),Ye=F()((function(e){return{container:Object(B.a)({padding:e.spacing(1)},e.breakpoints.up("md"),{padding:e.spacing(4,2)})}}))(Qe);var Ze=function(){var e=r.a.useState(!0),t=Object(c.a)(e,2),a=t[0],n=t[1],l=Object(m.a)(a?T.THEME_DARK:T.THEME_LIGHT);return r.a.createElement(u.a,{theme:l},r.a.createElement(o.a,null),r.a.createElement(s.a,{position:"static",style:{padding:"0px"}},r.a.createElement(p.a,null,r.a.createElement(d.a,{container:!0,alignItems:"center",justify:"space-between"},r.a.createElement(f.a,{variant:"h6"},"Bitmex Portfolio Viewer"),r.a.createElement(d.a,{item:!0},r.a.createElement(h.a,{title:"Toggle light/dark theme"},r.a.createElement(E.a,{onClick:function(){return n(!a)},"aria-label":"Toggle light/dark theme"},a?r.a.createElement(S.a,null):r.a.createElement(v.a,null))),r.a.createElement(h.a,{title:"Github repository"},r.a.createElement(E.a,{"aria-label":"Github repository",href:"https://github.com/thetaseek/portfolio-viewer",target:"_blank",rel:"noreferrer noopener"},r.a.createElement(b.a,null))))))),r.a.createElement(Ye,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Ze,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[375,1,2]]]);
//# sourceMappingURL=main.3fe95468.chunk.js.map