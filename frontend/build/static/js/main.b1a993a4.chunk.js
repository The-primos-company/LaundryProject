(this.webpackJsonpLaundryProject=this.webpackJsonpLaundryProject||[]).push([[0],{11:function(e,t,n){},12:function(e,t,n){},14:function(e,t,n){"use strict";n.r(t);var i=n(1),a=n.n(i),c=n(6),r=n.n(c),o=(n(11),n(2)),s=(n(12),n(4)),d=n(5),u=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Object(s.a)(this,e),this.name=void 0,this.address=void 0,this.phone=void 0,"string"===typeof t&&(t=JSON.parse(t)),this.name=t.name,this.address=t.address,this.phone=t.phone}return Object(d.a)(e,null,[{key:"createFrom",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new e(t)}}]),e}(),l=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Object(s.a)(this,e),this.identifier=void 0,this.receivedDate=void 0,this.deliveryDate=void 0,this.client=void 0,"string"===typeof t&&(t=JSON.parse(t)),this.identifier=t.identifier,this.receivedDate=t.receivedDate,this.deliveryDate=t.deliveryDate,this.client=this.convertValues(t.client,u)}return Object(d.a)(e,[{key:"convertValues",value:function(e,t){var n=this,i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(!e)return e;if(e.slice)return e.map((function(e){return n.convertValues(e,t)}));if("object"===typeof e){if(i){for(var a=0,c=Object.keys(e);a<c.length;a++){var r=c[a];e[r]=new t(e[r])}return e}return new t(e)}return e}}],[{key:"createFrom",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new e(t)}}]),e}(),v=n(0);var j=function(){var e=Object(i.useState)([]),t=Object(o.a)(e,2),n=t[0],a=t[1],c=Object(i.useState)([]),r=Object(o.a)(c,2),s=r[0],d=r[1],j=Object(i.useState)([]),p=Object(o.a)(j,2),h=p[0],f=p[1],b=Object(i.useState)([]),O=Object(o.a)(b,2),g=O[0],m=O[1],x=Object(i.useState)([]),y=Object(o.a)(x,2),C=y[0],N=y[1],w=Object(i.useState)([]),D=Object(o.a)(w,2),S=D[0],F=D[1];return Object(v.jsxs)("div",{children:[Object(v.jsx)("div",{className:"logo"}),Object(v.jsxs)("div",{className:"input-box",id:"input","data-wails-no-drag":!0,children:["orden de servicio:",Object(v.jsx)("input",{className:"input",id:"orderIdentifier",type:"text",autoComplete:"off",onChange:function(e){a(e.target.value)}})]}),Object(v.jsxs)("div",{className:"input-box",id:"input","data-wails-no-drag":!0,children:["Cliente:",Object(v.jsx)("input",{className:"input",id:"clientName",type:"text",autoComplete:"off",onChange:function(e){m(e.target.value)}})]}),Object(v.jsxs)("div",{className:"input-box",id:"input","data-wails-no-drag":!0,children:["Direcci\xf3n:",Object(v.jsx)("input",{className:"input",id:"clientAddress",type:"text",autoComplete:"off",onChange:function(e){N(e.target.value)}})]}),Object(v.jsxs)("div",{className:"input-box",id:"input","data-wails-no-drag":!0,children:["Tel\xe9fono:",Object(v.jsx)("input",{className:"input",id:"clientPhone",type:"text",autoComplete:"off",onChange:function(e){F(e.target.value)}})]}),Object(v.jsxs)("div",{className:"input-box",id:"input","data-wails-no-drag":!0,children:["Fecha de recibido:",Object(v.jsx)("input",{className:"input",id:"orderReceivedDate",type:"text",autoComplete:"off",onChange:function(e){d(e.target.value)}})]}),Object(v.jsxs)("div",{className:"input-box",id:"input","data-wails-no-drag":!0,children:["Fecha de entrega:",Object(v.jsx)("input",{className:"input",id:"orderDeliveryDate",type:"text",autoComplete:"off",onChange:function(e){f(e.target.value)}})]}),Object(v.jsx)("button",{className:"btn",onClick:function(){return function(e){var t=new u({name:g,address:C,phone:S}),i=new l({number:n,receivedDate:s,deliveryDate:h,client:t});window.go.main.App.CreateOrder(i).then((function(e){console.log(e)}))}()},children:"Crear Orden"})]})},p=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,15)).then((function(t){var n=t.getCLS,i=t.getFID,a=t.getFCP,c=t.getLCP,r=t.getTTFB;n(e),i(e),a(e),c(e),r(e)}))};r.a.render(Object(v.jsx)(a.a.StrictMode,{children:Object(v.jsx)(j,{})}),document.getElementById("root")),p()}},[[14,1,2]]]);
//# sourceMappingURL=main.b1a993a4.chunk.js.map