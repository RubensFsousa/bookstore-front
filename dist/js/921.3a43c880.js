"use strict";(self["webpackChunkbookstore_front"]=self["webpackChunkbookstore_front"]||[]).push([[921],{8336:function(t,e,a){a.r(e),a.d(e,{default:function(){return O}});var n=a(998),o=function(){var t=this,e=t._self._c;return e(n.Z,{attrs:{id:"app"}},[e("Rent")],1)},r=[],l=a(6190),s=a(4145),c=a(4886),d=a(266),i=a(2118),u=a(3863),p=a(1030),f=a(9930),v=a(4324),m=a(1713),Z=a(7423),g=a(3687),_=a(7808),k=a(2082),x=function(){var t=this,e=t._self._c;return e(i.Z,{attrs:{id:"aluguelPage"}},[e(m.Z,[e(d.Z,[e(Z.Z,{attrs:{rounded:"xl"}},[e(u.Z,{staticClass:"rounded-xl elevation-7",attrs:{headers:t.headers,items:t.rents,"items-per-page":5,"sort-by":"id"},scopedSlots:t._u([{key:"item.acoes",fn:function({item:a}){return[e(k.Z,{attrs:{top:"",color:"#0061A3"},scopedSlots:t._u([{key:"activator",fn:function({on:n,attrs:o}){return[e(l.Z,t._g(t._b({attrs:{color:"primary",text:"",small:"",rounded:""},on:{click:function(e){return t.showEdit(a)}}},"v-btn",o,!1),n),[e(v.Z,{attrs:{dark:""}},[t._v(" mdi-pencil ")])],1)]}}],null,!0)},[e("span",[t._v("Editar")])]),e(k.Z,{attrs:{top:"",color:"red"},scopedSlots:t._u([{key:"activator",fn:function({on:n,attrs:o}){return[e(l.Z,t._g(t._b({attrs:{color:"error",text:"",small:"",rounded:""},on:{click:function(e){return t.remover(a)}}},"v-btn",o,!1),n),[e(v.Z,{attrs:{dark:""}},[t._v(" mdi-delete ")])],1)]}}],null,!0)},[e("span",[t._v("Remover")])])]}}])})],1)],1)],1),e(m.Z,{attrs:{justify:"center"}},[e(f.Z,{attrs:{persistent:"","max-width":"600px"},scopedSlots:t._u([{key:"activator",fn:function({on:a,attrs:n}){return[e(l.Z,t._g(t._b({attrs:{color:"#FF0038",dark:""}},"v-btn",n,!1),a),[e("font-awesome-icon",{attrs:{icon:"fa-solid fa-plus"}}),e(g.Z),t._v(" Alugar ")],1)]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[e(s.Z,[e(c.EB,[e("span",{staticClass:"text-h5"},[t._v("Aluguel Info ")])]),e(c.ZB,[e(i.Z,[e(m.Z,[e(d.Z,{attrs:{cols:"12"}},[e(_.Z,{attrs:{label:"livro","append-icon":"mdi-book",required:""}})],1),e(d.Z,{attrs:{cols:"12"}},[e(_.Z,{attrs:{label:"leitor","append-icon":"mdi-account",required:""}})],1),e(d.Z,{attrs:{cols:"12"}},[e(f.Z,{ref:"dialog",attrs:{"return-value":t.date,persistent:"",width:"290px"},on:{"update:returnValue":function(e){t.date=e},"update:return-value":function(e){t.date=e}},scopedSlots:t._u([{key:"activator",fn:function({on:a,attrs:n}){return[e(_.Z,t._g(t._b({attrs:{label:"Data de aluguel","append-icon":"mdi-calendar",readonly:""},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}},"v-text-field",n,!1),a))]}}]),model:{value:t.modal,callback:function(e){t.modal=e},expression:"modal"}},[e(p.Z,{attrs:{scrollable:""},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}},[e(g.Z),e(l.Z,{attrs:{text:"",color:"primary"},on:{click:function(e){t.modal=!1}}},[t._v(" Cancel ")]),e(l.Z,{attrs:{text:"",color:"primary"},on:{click:function(e){return t.$refs.dialog.save(t.date)}}},[t._v(" OK ")])],1)],1)],1),e(d.Z,{attrs:{cols:"12"}},[e(f.Z,{ref:"dialog",attrs:{"return-value":t.date,persistent:"",width:"290px"},on:{"update:returnValue":function(e){t.date=e},"update:return-value":function(e){t.date=e}},scopedSlots:t._u([{key:"activator",fn:function({on:a,attrs:n}){return[e(_.Z,t._g(t._b({attrs:{label:"Data de previsão","append-icon":"mdi-calendar",readonly:""},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}},"v-text-field",n,!1),a))]}}]),model:{value:t.modal,callback:function(e){t.modal=e},expression:"modal"}},[e(p.Z,{attrs:{scrollable:""},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}},[e(g.Z),e(l.Z,{attrs:{text:"",color:"primary"},on:{click:function(e){t.modal=!1}}},[t._v(" Cancel ")]),e(l.Z,{attrs:{text:"",color:"primary"},on:{click:function(e){return t.$refs.dialog.save(t.date)}}},[t._v(" OK ")])],1)],1)],1)],1)],1),e("small",[t._v("*Todos os campos são obrigatórios")])],1),e(c.h7,[e(g.Z),e(l.Z,{attrs:{color:"blue darken-1",text:""},on:{click:function(e){t.dialog=!1}}},[t._v(" Cancelar ")]),e(l.Z,{attrs:{color:"blue darken-1",text:""},on:{click:function(e){t.dialog=!1}}},[t._v(" Salvar ")])],1)],1)],1)],1)],1)},b=[],R=a(1104),h={getAllRents:()=>R.d.get("Rent"),getOneRent:t=>R.d.get(`Rent/${t}`),createRent:t=>R.d.post("Rent",t),updateRent:(t,e)=>R.d.put(`Rent/${t}`,e),deleteRent:t=>R.d["delete"](`Rent/${t}`)},y={data:()=>({date:new Date(Date.now()-6e4*(new Date).getTimezoneOffset()).toISOString().substr(0,10),modal:!1,dialog:!1,headers:[{text:"ID",value:"id",aling:"center"},{text:"LIVRO",value:"book.name",aling:"center"},{text:"LEITOR",value:"user.name",aling:"center"},{text:"DATA DE ALUGUEL",value:"rentDate",aling:"center"},{text:"DATA PREVISTA",value:"rentPredict",aling:"center"},{text:"DATA ENTREGUE",value:"devolutionDate",aling:"center"},{text:"ESTATUS",value:"status",aling:"center"},{text:"",value:"acoes",sortable:!1}],rents:[]}),mounted(){h.getAllRents().then((t=>{console.log(t),this.rents=t.data.content}))}},A=y,D=a(1001),S=(0,D.Z)(A,x,b,!1,null,null,null),E=S.exports,w={data:()=>({}),components:{Rent:E}},T=w,C=(0,D.Z)(T,o,r,!1,null,null,null),O=C.exports}}]);
//# sourceMappingURL=921.3a43c880.js.map