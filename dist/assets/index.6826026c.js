var e=Object.defineProperty,t=Object.defineProperties,n=Object.getOwnPropertyDescriptors,a=Object.getOwnPropertySymbols,l=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,o=(t,n,a)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[n]=a,i=(e,t)=>{for(var n in t||(t={}))l.call(t,n)&&o(e,n,t[n]);if(a)for(var n of a(t))r.call(t,n)&&o(e,n,t[n]);return e},c=(e,a)=>t(e,n(a));import{q as s,R as m,M as d,a as u,b as p,A as g,c as h,S as E,d as b,e as f,f as y,g as x,F as v,h as k,i as w,j as C,k as I,l as T,m as j,n as S,o as D,p as $,r as A,s as z,t as P,u as M,v as R,w as F,I as L,G as O,x as _,y as G,z as N,B,C as H,D as q,E as V,H as U,J as K,K as W,L as J,N as Y,P as Q,T as X,O as Z,Q as ee,U as te,V as ne,W as ae,X as le,Y as re,Z as oe,_ as ie,$ as ce,a0 as se,a1 as me,a2 as de,a3 as ue,a4 as pe,a5 as ge,a6 as he,a7 as Ee,a8 as be,a9 as fe,aa as ye}from"./vendor.d475a01a.js";const xe=s.div`
  display: flex;
  justify-content: ${e=>e.jc};
  align-items: ${e=>e.ai};
  row-gap: ${e=>e.rGap};
  column-gap: ${e=>e.cGap};
`,ve=s(xe)`
  flex-direction: column;
`;s(xe)`
  justify-content: center;
`;const ke=s(xe)`
  align-items: center;
`,we=s(xe)`
  justify-content: center;
  align-items: center;
`,Ce=new Map([["mobile",m.createElement(d,null)],["email",m.createElement(u,null)],["location",m.createElement(p,null)],["github",m.createElement(g,null)],["linkedin",m.createElement(h,null)],["hackerrank",m.createElement(E,null)],["hackerearth",m.createElement(b,null)],["twitter",m.createElement(f,null)],["leetcode",m.createElement(y,null)],["devto",m.createElement(x,null)],["medium",m.createElement(v,null)],["wordpress",m.createElement(k,null)],["codechef",m.createElement(w,null)],["codeforces",m.createElement(C,null)],["behance",m.createElement(I,null)],["dribbble",m.createElement(T,null)],["hashnode",m.createElement(j,null)],["squarespace",m.createElement(S,null)],["identity",m.createElement(D,null)],["expert",m.createElement($,null)],["work",m.createElement(A,null)],["education",m.createElement(z,null)],["tool",m.createElement(P,null)],["key",m.createElement(M,null)],["certificate",m.createElement(R,null)],["career",m.createElement(F,null)],["branch",m.createElement(L,null)],["skill",m.createElement(O,null)],["edit",m.createElement(_,null)],["color",m.createElement(G,null)],["download",m.createElement(N,null)],["template",m.createElement(B,null)],["drag",m.createElement(H,null)],["delete",m.createElement(q,null)],["add",m.createElement(V,null)],["social",m.createElement(U,null)],["label",m.createElement(K,null)]]);function Ie(e){return Ce.get(null==e?void 0:e.toLowerCase())}const Te=s.div`
  border: 1px solid ${e=>W(e.theme.fontColor).alpha(.25).toString()};
  border-radius: 5px;
  padding: 15px 10px 10px 10px;
  position: relative;

  .header {
    position: absolute;
    top: -10px;
    left: 8px;
    background: ${e=>e.theme.backgroundColor};
    padding: 0 5px;
    font-weight: bold;
    color: ${e=>e.theme.primaryColor};

    svg {
      font-size: 0.8rem;
    }
  }
`,je=s(Te)`
  padding-top: 20px;

  .header {
    top: -20px;
    left: 0;
    margin-left: 5px;
    padding: 0 5px;
    background: ${e=>e.theme.backgroundColor};

    .header__title {
      margin: 0;
      color: ${e=>e.theme.primaryColor};
    }
  }

  .social-icons {
    position: absolute;
    top: -12px;
    right: 10px;
    font-size: 18px;
    column-gap: 5px;

    svg {
      color: ${e=>e.theme.primaryColor};
      background-color: ${e=>e.theme.backgroundColor};
    }
  }
`;function Se({styles:e,title:t,icon:n,children:a}){return m.createElement(Te,{style:e},m.createElement(we,{className:"header",cGap:"5px"},n,m.createElement("div",{className:"header__title"},t)),a)}function De({styles:e,title:t,icons:n,children:a}){return m.createElement(je,{style:e},m.createElement(we,{className:"header"},m.createElement("h1",{className:"header__title"},t)),m.createElement(xe,{className:"social-icons"},Object.entries(n).filter((e=>"function"!=typeof e[1]&&""!==e[1])).map((e=>m.createElement("a",{href:e[1],key:e[1]},Ie(e[0]))))),a)}const $e=s.h3`
  color: ${e=>W(e.theme.primaryColor).alpha(.75).toString()};
  margin-bottom: 0;
  font-weight: 600;
`,Ae=({icon:e,value:t})=>m.createElement(ke,{jc:"flex-end",cGap:"8px"},e,m.createElement("span",null,t));function ze({intro:e,labels:t}){return m.createElement(xe,{jc:"space-between"},m.createElement(ve,{rGap:"5px"},m.createElement($e,null,e.label),m.createElement("div",null,t[10],": ",m.createElement("strong",null,e.relExp)),m.createElement("div",null,t[11],": ",e.totalExp)),m.createElement(ve,{jc:"flex-end",rGap:"5px"},m.createElement(Ae,{icon:Ie("mobile"),value:e.phone}),m.createElement(Ae,{icon:Ie("email"),value:e.email}),m.createElement(Ae,{icon:Ie("location"),value:e.location})))}function Pe({children:e}){return Xt((e=>e.isPhotoDisplayed))&&e}const Me=s.img`
  border-radius: 50%;
  height: 60px;
  width: 60px;
  float: left;
  shape-outside: circle();
  margin-right: 20px;
  margin-bottom: 5px;
  border: 0.5px solid ${e=>e.theme.fontColor};
`,Re=s.div`
  ul {
    margin: 0;
    padding-left: 1rem;
  }
`,Fe=new J;function Le({description:e,photo:t}){const n=t&&m.createElement(Pe,null,m.createElement(Me,{src:t}));return m.createElement(m.Fragment,null,n,m.createElement(Re,{dangerouslySetInnerHTML:{__html:Fe.render(e)}}))}const Oe=s.div`
  width: 25ch;
  font-weight: 600;
`;const _e=Y((function({itemLabel:e,itemRating:t,theme:n}){return m.createElement(ke,null,m.createElement(Oe,null,e),m.createElement(Q,{percent:20*t,showInfo:!1,strokeColor:n.secondaryColor,size:"small"}))}));function Ge({items:e}){return m.createElement(ve,{rGap:"8px"},null==e?void 0:e.map(((e,t)=>m.createElement(_e,{itemLabel:e.name,itemRating:e.rating,key:t,index:e.name}))))}const Ne=s.span`
  padding: 4px;
  font-size: 98%;
  font-weight: 500;
  border: 1px solid ${e=>e.theme.secondaryColor};
  border-radius: 4px;
`;function Be({items:e}){return m.createElement(xe,{cGap:"10px",rGap:"10px",style:{flexWrap:"wrap"}},e.map((e=>m.createElement(Ne,{key:e.name},e.name))))}const He=s(X)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  height: 100%;
  padding-top: 15px;
  color: ${e=>e.theme.fontColor};

  ul {
    padding-left: 16px;
    margin-bottom: 0;
    font-size: 0.8rem;
  }
`,qe=s(He.Item)`
  padding-bottom: 0;
  flex-grow: 1;
  padding-bottom: 20px;

  :last-child {
    flex-grow: 0;
    padding-bottom: 0;
  }
`,Ve=s.div`
  font-size: 1rem;
  font-weight: 500;
`,Ue=s.div`
  font-weight: 500;
  font-size: 0.8rem;
  line-height: inherit;
`,Ke=s.div`
  font-style: italic;
  font-size: 0.6rem;
`,We=new J;function Je({company:e}){return m.createElement(m.Fragment,null,m.createElement(xe,{jc:"space-between",ai:"flex-end",style:{lineHeight:"initial"}},m.createElement(Ve,null,e.name),m.createElement(Ke,null,e.from," - ",e.to)),m.createElement(xe,{jc:"space-between",ai:"flex-end"},m.createElement(Ue,null,e.role),m.createElement(Ke,null,e.years)))}function Ye({companies:e,styles:t}){return m.createElement(He,{style:t},e.map(((e,t)=>m.createElement(qe,{key:`${e.name}-${t}`},m.createElement(Je,{company:e}),m.createElement("div",{dangerouslySetInnerHTML:{__html:We.render(e.description)}})))))}const Qe=s.div`
  &:not(:last-child) {
    border-bottom: 1px solid ${e=>e.theme.secondaryColor};
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
`,Xe=s.div`
  font-weight: 500;
  font-size: 0.8rem;
`,Ze=s.div`
  font-weight: 400;
  font-size: 0.7rem;
`;function et({education:e}){return e?e.map((e=>m.createElement(Qe,{key:e.studyType},m.createElement(xe,{jc:"space-between"},m.createElement(Xe,null,e.studyType),m.createElement("em",null,e.startDate," - ",e.endDate)),m.createElement(Ze,null,e.area),m.createElement(xe,{jc:"space-between"},m.createElement("div",null,e.institution),m.createElement("em",null,e.score))))):null}const tt={name:"Jane Doe",label:"Frontend Developer",image:"https://www.linkpicture.com/q/generated_photos_5e68893b6d3b380006f22f8b.jpg",email:"janedoe@email.com",phone:"+91 9876543210",url:"www.github.com/sadanandpai/",summary:"I am a web developer having expertise in frontend development and exposure to back- end development. I design and develop web applications using the latest technologies to deliver the product with quality code.",location:"Bengaluru",relExp:"4 years",totalExp:"6 Years",objective:"Eager to expand my skill set through external trainings to help boost all major front desk KPIs. Hoping to leverage organizational skills to help ABC Corp introduce time-saving schemes for all executives."},nt="https://www.linkedin.com/in/sadanandpai/",at="https://github.com/sadanandpai/",lt="https://www.hackerrank.com/paicube/",rt="https://leetcode.com/paicube/",ot="",it="",ct="",st="",mt="",dt="",ut="",pt="",gt="",ht="",Et="",bt={languages:[{name:"JavaScript",rating:5},{name:"HTML5",rating:5},{name:"CSS",rating:5}],frameworks:[{name:"React",rating:4},{name:"Angular",rating:4}],technologies:[{name:"Algorithms",rating:3},{name:"Data Structures",rating:3},{name:"SQL",rating:3},{name:"Progressive Web Apps",rating:3}],libraries:[{name:"jQuery",rating:3},{name:"Redux",rating:3}],databases:[{name:"Firebase",rating:3}],practices:[{name:"Component based architecture",rating:3},{name:"Agile methodology",rating:3},{name:"Design Patterns",rating:3},{name:"Test Driven Development",rating:3},{name:"MVC",rating:3}],tools:[{name:"Git",rating:3},{name:"VS Code",rating:3},{name:"Jira",rating:3},{name:"Webpack",rating:3},{name:"Eclipse",rating:3},{name:"Bitbucket",rating:3}]},ft=[{name:"Company 1",role:"Senior Software Developer",from:"Apr 2021",to:"present",years:"2.5 years",description:"* Use my extensive experience with front end development to define the structure and components for the project, making sure they are reusable\n* Keep the code quality high reviewing code from other developers and suggesting improvements\n* Interact with the designer to suggest changes and to make sure the view he has about the design is translated into actual functionality\n* E-commerce maintenance **with Fastcommerce**, a Brazilian e-commerce platform"},{name:"Company 2",role:"Software Developer",from:"Jun 2015",to:"Dec 2017",years:"2.5 years",description:"* Develop web applications based on Sharepoint, Drupal 8 and Episerver\n* Lead a team of 10 front end developers, giving support to the client's multi-cultural team, providing feedback, clarifying requirements and helping with technical questions\n* Keep the Project Manager and the IT Leads updated on the overall progress of the projects and manage the tasks distributed to the team\n* Keep the code and the features implemented by the other developers in accordance to the requirements"},{name:"Company 3",role:"Trainee Developer",from:"Aug 2011",to:"May 2015",years:"1 year",description:"* Design easy user interfaces and great user experiences for the digital platforms of small companies\n* Wordpress development, including themes creation or customization, custom plugins development and training\n* E-commerce maintenance with Fastcommerce, a Brazilian e-commerce platform\n* E-commerce development with Magento, customizing preexisting themes \n* Integrate external services such as payment services, delivery, etc into Magento solutions\n* VPS configuration and optimization (Apache & Nginx)"}],yt="* Prevented millions of dollars in state sales tax undercharges by initiating tests that revealed a bug in a new release of shopping cart software.\n * Isolated previously undiscovered flaw in price checking tool resulting in more competitive pricing and a 20 percent increase in revenue.\n * Implemented automated testing tools spawning more diligent levels of regression testing, negative testing, error/bug retests and usability.\n * Prevented millions of dollars in state sales tax undercharges by initiating tests that revealed a bug in a new release of shopping cart software.\n",xt="* React and redux - A complete guide 2020 from Udemy'\n * Agile and Scrum Master Certificate from Udacity\n  * Best performer award for consistently exceeding the performance\n  * Certificate of exceptional bug finder by XYZ client\n  * Recognition zero defect delivery\n  * Best performer award for consistently exceeding the performance",vt=[{institution:"MIT, University",url:"https://www.mit.edu/",studyType:"MS",area:"Cloud technology",startDate:"2014",endDate:"2016",score:"68%",courses:[]},{institution:"NMAMIT, Nitte",url:"https://www.mit.edu/",studyType:"B.Tech (VTU)",area:"Computer Science",startDate:"2010",endDate:"2014",score:"8.3 CGPA",courses:[]}],kt=["Experience","Key Projects / Involvements","Certificates and Awards","About me","Career Objective","Technical Expertise","Skills / Expsoure","Methodology / Approach","Tools","Education","Relevant Experience","Total Experience"],wt=Z(ee((e=>({name:tt.name,label:tt.label,phone:tt.phone,email:tt.email,url:tt.url,location:tt.location,image:tt.image,summary:tt.summary,objective:tt.objective,relExp:tt.relExp,totalExp:tt.totalExp,update:(t,n)=>e((e=>{e[t]=n}))})),{name:"sprb-intro"})),Ct=Z(ee((e=>({linkedin:nt,github:at,hackerrank:lt,hackerearth:ot,codechef:it,codeforces:ct,twitter:st,leetcode:rt,devto:dt,medium:mt,hashnode:ut,wordpress:pt,squarespace:gt,behance:ht,dribbble:Et,update:(t,n)=>e((e=>{e[t]=n}))})),{name:"sprb-social"})),It=Z(ee((e=>({companies:ft,setField:t=>e((e=>{var n;const a=t.target.dataset.label;void 0!==a&&(e[a]=null==(n=t.target)?void 0:n.value)})),add:()=>e((e=>({companies:[...e.companies,{name:"Company",role:"",from:"",to:"",years:"",description:"* Point 1\n* Point 2\n* Point 3"}]}))),update:(t,n,a)=>e((e=>{const l=[...e.companies];return l[t][n]=a,{companies:l}})),purge:t=>e((e=>({companies:e.companies.filter(((e,n)=>n!==t))}))),changeOrder:({oldIndex:t,newIndex:n})=>e((e=>({companies:te(e.companies,t,n)})))})),{name:"sprb-work"})),Tt=Z(ee((e=>({languages:bt.languages,frameworks:bt.frameworks,libraries:bt.libraries,databases:bt.databases,technologies:bt.technologies,practices:bt.practices,tools:bt.tools,add:(t,n="",a=1)=>e((e=>{e[t].some((e=>""===e.name))||(e[t]=[...e[t]],e[t].push({name:n,rating:a}))})),update:(t,n,a,l)=>e((e=>{e[t]=[...e[t]],e[t][n][a]=l})),purge:(t,n)=>e((e=>{e[t]=e[t].filter(((e,t)=>n!==t))})),changeOrder:(t,n,a)=>e((e=>c(i({},e),{[t]:te(e[t],n,a)})))})),{name:"sprb-skills"})),jt=Z(ee((e=>({education:vt,add:()=>e((e=>({education:[...e.education,{institution:"",url:"",studyType:"Degree",area:"",startDate:"",endDate:"",score:"",courses:[]}]}))),update:(t,n,a)=>e((e=>{const l=[...e.education];return l[t][n]=a,{education:l}})),purge:t=>e((e=>({education:e.education.filter(((e,n)=>n!==t))}))),changeOrder:({oldIndex:t,newIndex:n})=>e((e=>({education:te(e.education,t,n)})))})),{name:"sprb-education"})),St=Z(ee((e=>({projects:yt,awards:xt,update:(t,n)=>e((e=>{e[t]=[...e[t]],e[t]=n}))})),{name:"sprb-achievements"})),Dt=Z(ee((e=>({labels:kt,update:(t,n)=>e((e=>{const a=[...e.labels];return a[t]=n,{labels:a}}))})),{name:"sprb-labels"})),$t=s(xe)`
  height: 100%;
  padding: 40px 25px;
  column-gap: 10px;
  color: ${e=>e.theme.fontColor};
  background-color: ${e=>e.theme.backgroundColor};

  @media print {
    border: none;
  }
`,At=s(ve)`
  flex-basis: 66%;
  row-gap: 20px;
  height: 100%;
`,zt=s(ve)`
  flex-basis: 34%;
  row-gap: 20px;
  height: 100%;
  justify-content: space-between;
`,Pt=["work","key","certificate","identity","career","expert","skill","branch","tool","education"];const Mt=s.div`
  width: 15ch;
  font-weight: 600;
`,Rt=s.span`
  width: 16px;
  height: 8px;
  border-radius: 25%;
  display: inline-block;
  border: 0.5px solid ${e=>e.theme.secondaryColor};
  margin: 0px 4px;
  background-color: ${e=>e.filled?e.theme.secondaryColor:"transparent"};
`;function Ft({itemLabel:e,itemRating:t,index:n}){const a=[];for(let l=1;l<=5;l+=1)a.push(m.createElement(Rt,{"data-index":n,"data-rating":l,filled:l<=t,key:l}));return m.createElement(ke,null,m.createElement(Mt,null,e),a)}function Lt({items:e}){return m.createElement(ve,{rGap:"8px"},e.map(((e,t)=>m.createElement(Ft,{itemLabel:e.name,itemRating:e.rating,key:e.name,index:t}))))}const Ot=s.div`
  width: 80%;
  margin: 10px auto 4px auto;
  min-height: 1px;
  background-color: ${e=>e.theme.secondaryColor};
`,_t=s.div`
  font-size: 0.8rem;
  font-weight: 500;
  color: ${e=>e.theme.primaryColor};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 4px;
  column-gap: 5px;

  svg {
    vertical-align: middle;
  }
`;function Gt({title:e,Icon:t}){return m.createElement(_t,null,t,e)}const Nt=s.div`
  padding: 10px;
  color: ${e=>e.theme.fontColor};
  border-top: 2px solid ${e=>e.theme.primaryColor};
  border-bottom: 2px solid ${e=>e.theme.primaryColor};
  margin: 12px 0px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 0.7rem;

  svg {
    height: 1rem;
    width: 1rem;
    vertical-align: top;
  }

  a,
  svg {
    color: ${e=>e.theme.primaryColor};
  }
`;function Bt({items:e}){return e?m.createElement(Nt,null,Object.entries(e).filter((e=>"function"!=typeof e[1]&&""!==e[1])).map((e=>m.createElement("a",{href:e[1],key:e[1].split("/")},Ie(e[0]))))):null}const Ht=s.div`
  margin: auto;
  display: grid;
  padding: 40px 25px;
  grid-template-columns: 68% 10px 1fr;
  color: ${e=>e.theme.fontColor};
  background-color: ${e=>e.theme.backgroundColor};
`,qt=s.div`
  height: 100%;
  width: 2px;
  background-color: #007bff;
`,Vt=s.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:first-child {
    padding-right: 10px;
  }
`,Ut=s.div`
  margin: 0;
  color: ${e=>e.theme.primaryColor};
  font-size: 1.5rem;
`;var Kt="/single-page-resume-builder/dist/assets/new.cd208cbc.png";const Wt=[function(){const e=wt((e=>e)),t=Ct((e=>e)),n=jt((e=>e.education)),a=It((e=>e)),[l,r]=St((e=>[e.projects,e.awards]),ne),[o,i,c,s,d,u,p]=Tt((e=>[e.languages,e.frameworks,e.libraries,e.databases,e.technologies,e.practices,e.tools]),ne),g=Dt((e=>e.labels)),h=[{title:g[0],icon:Pt[0],component:m.createElement(Ye,{companies:a.companies}),styles:{flexGrow:1}},{title:g[1],icon:Pt[1],component:m.createElement(Le,{description:l})},{title:g[2],icon:Pt[2],component:m.createElement(Le,{description:r})}],E=[{title:g[3],icon:Pt[3],component:m.createElement(Le,{photo:e.image,description:e.summary})},{title:g[4],icon:Pt[4],component:m.createElement(Le,{description:e.objective})},{title:g[5],icon:Pt[5],component:m.createElement(Ge,{items:[...o,...i]})},{title:g[6],icon:Pt[6],component:m.createElement(Be,{items:[...d,...c,...s]})},{title:g[7],icon:Pt[7],component:m.createElement(Be,{items:u})},{title:g[8],icon:Pt[8],component:m.createElement(Be,{items:p})},{title:g[9],icon:Pt[9],component:m.createElement(et,{education:n})}];return m.createElement($t,null,m.createElement(At,null,m.createElement(De,{title:e.name,icons:t},m.createElement(ze,{intro:e,labels:g})),h.filter((({title:e})=>!!e)).map((({title:e,icon:t,component:n,styles:a})=>m.createElement(Se,{icon:Ie(t),title:e,styles:a,key:e},n)))),m.createElement(zt,null,E.filter((({title:e})=>!!e)).map((({title:e,icon:t,component:n})=>m.createElement(Se,{icon:Ie(t),title:e,key:e},n)))))},function(){const e=wt((e=>e)),t=Ct((e=>e)),n=jt((e=>e.education)),a=It((e=>e)),[l,r]=St((e=>[e.projects,e.awards]),ne),[o,i,c,s,d,u,p]=Tt((e=>[e.languages,e.frameworks,e.libraries,e.databases,e.technologies,e.practices,e.tools]),ne),g=Dt((e=>e.labels));return m.createElement(Ht,null,m.createElement(Vt,null,m.createElement(Ut,null,e.name),m.createElement(ze,{intro:e,labels:g}),m.createElement(Bt,{items:t}),m.createElement(Gt,{Icon:Ie("work"),title:g[0]}),m.createElement(Ye,{companies:a.companies}),m.createElement(Ot,null),m.createElement(Gt,{Icon:Ie("key"),title:g[1]}),m.createElement(Le,{description:l}),m.createElement(Ot,null),m.createElement(Gt,{Icon:Ie("certificate"),title:g[2]}),m.createElement(Le,{description:r})),m.createElement(qt,null),m.createElement(Vt,null,m.createElement(Gt,{Icon:Ie("identity"),title:g[3]}),m.createElement(Le,{description:e.summary}),m.createElement(Ot,null),m.createElement(Gt,{Icon:Ie("career"),title:g[4]}),m.createElement(Le,{description:e.objective}),m.createElement(Ot,null),m.createElement(Gt,{Icon:Ie("expert"),title:g[5]}),m.createElement(Lt,{items:[...o,...i]}),m.createElement(Ot,null),m.createElement(Gt,{Icon:Ie("skill"),title:g[6]}),m.createElement(Be,{items:[...d,...c,...s]}),m.createElement(Ot,null),m.createElement(Gt,{Icon:Ie("branch"),title:g[7]}),m.createElement(Be,{items:u}),m.createElement(Ot,null),m.createElement(Gt,{Icon:Ie("tool"),title:g[8]}),m.createElement(Be,{items:p}),m.createElement(Ot,null),m.createElement(Gt,{Icon:Ie("education"),title:g[9]}),m.createElement(et,{education:n})))},function(){return m.createElement("h1",null,"Template3")},function(){return m.createElement("h1",null,"Template4")},function(){return m.createElement("h1",null,"Template5")},function(){return m.createElement("h1",null,"Template6")}],Jt=["/single-page-resume-builder/dist/assets/professional.65f9bb03.jpg","/single-page-resume-builder/dist/assets/legacy.a58d0337.jpg",Kt,Kt,Kt,Kt],Yt=["Professional","legacy","template3","template4","template5","template6"],Qt=Z((e=>({index:0,template:Wt[0],setTemplate:t=>e({index:t,template:Wt[t]})}))),Xt=Z((e=>({isPhotoDisplayed:!0,setIsPhotoDisplayed:t=>e({isPhotoDisplayed:t})}))),Zt=s.div`
  width: 210mm;
  height: 297mm;
  margin: auto;
  background-color: white;
  border: 1px solid ${e=>e.theme.fontColor};

  @media print {
    border: none;
  }
`,en=s.div`
  height: 100vh;
  padding: 1.125rem;
  overflow-y: auto;

  @media print {
    padding: 0;
    overflow: inherit;
  }
`;function tn(){const e=Qt((e=>e.template));return m.createElement(en,null,m.createElement(Zt,{className:"resume"},m.createElement(e,null)))}const nn=s.div`
  background: #222;
  padding: 0.25rem;
  height: 100%;
`,an=s.div`
  height: 100vh;
  overflow-y: auto;
  width: 380px;
  background: #222;

  &.hide {
    display: none;
  }
`;function ln({isShown:e,children:t}){return m.createElement(an,{className:e?"":"hide"},m.createElement(nn,null,t))}const rn=s.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 1rem;
`,on=s.img`
  max-width: 100%;
  object-fit: cover;
  height: auto;
  border: solid 2px transparent;
`,cn=s.label`
  width: 169px;
  height: 240px;
  object-fit: cover;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: all 0.3s;

  .selected {
    border: solid 2px #1890ff;
  }
`;function sn(){const e=Qt((e=>e.index)),t=Qt((e=>e.setTemplate));return m.createElement(rn,null,Wt.map(((n,a)=>m.createElement(cn,{key:Yt[a]},m.createElement(on,{src:Jt[a],alt:"Professional",className:e===a?"selected":"",onClick:()=>t(a)})))))}const mn=[{id:0,fontColor:"black",backgroundColor:"white",primaryColor:"#1890ff",secondaryColor:"yellowgreen"},{id:1,fontColor:ae[8],backgroundColor:"white",primaryColor:le[9],secondaryColor:"burlywood"},{id:2,fontColor:"black",backgroundColor:"white",primaryColor:"green",secondaryColor:re[3]}],dn={fontColor:"white",backgroundColor:"black",primaryColor:"yellow",secondaryColor:le[6]},un=Z((e=>({theme:mn[0],customTheme:dn,chooseTheme:t=>e({theme:mn[t]}),chooseCustomTheme:()=>e((e=>({theme:e.customTheme}))),setCustomTheme:(t,n)=>e((e=>{const a=c(i({},e.customTheme),{[n]:t});return{theme:a,customTheme:a}}))}))),pn=s.div`
  display: flex;
  width: 250px;
  height: 30px;
  cursor: pointer;
  margin-bottom: 20px;
  border: 1px solid white;
`,gn=s.div`
  width: 25%;
  height: 100%;
  background-color: ${e=>e.themeColor};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: white;
    font-size: 1rem;
    mix-blend-mode: difference;
  }
`,hn=s.div`
  color: white;
  font-size: 1rem;
`;function En(){const e=un((e=>e.customTheme)),[t,n,a]=un((e=>[e.chooseTheme,e.chooseCustomTheme,e.setCustomTheme]),ne),[l,r]=oe.exports.useState(""),[o,i]=oe.exports.useState(!1),c=e[l],s=oe.exports.useCallback((({rgb:e})=>{a(`rgba(${e.r}, ${e.g}, ${e.b}, ${e.a})`,l),r(l)}),[a,r,l]),d=oe.exports.useCallback((e=>{i(!1),t(e.currentTarget.dataset.id)}),[i,t]),u=oe.exports.useCallback((()=>{i(!0),n()}),[i,n]);const p=oe.exports.useMemo((()=>m.createElement(pn,{onClick:u},m.createElement(gn,{onClick:()=>r("backgroundColor"),themeColor:e.backgroundColor},m.createElement(ie,null)),m.createElement(gn,{onClick:()=>r("fontColor"),themeColor:e.fontColor},m.createElement(ie,null)),m.createElement(gn,{onClick:()=>r("primaryColor"),themeColor:e.primaryColor},m.createElement(ie,null)),m.createElement(gn,{onClick:()=>r("secondaryColor"),themeColor:e.secondaryColor},m.createElement(ie,null)))),[e,r]);return m.createElement(m.Fragment,null,mn.map((e=>function(e){return m.createElement("div",{key:e.id},m.createElement(hn,null,"Preset ",e.id),m.createElement(pn,{"data-id":e.id,onClick:d},m.createElement(gn,{themeColor:e.backgroundColor}),m.createElement(gn,{themeColor:e.fontColor}),m.createElement(gn,{themeColor:e.primaryColor}),m.createElement(gn,{themeColor:e.secondaryColor})))}(e))),m.createElement(hn,null,"Custom"),p,o?m.createElement(ce,{color:c,onChangeComplete:s}):null)}const bn=s.nav`
  height: 100%;
  font-size: 1.4rem;
  padding: 8px;
  background: #222;
`,fn=s.div`
  outline-color: transparent;
  margin-bottom: 1rem;
`,yn=s.button`
  position: relative;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 40px;
  background: transparent;
  border: 0;
  border-radius: 2px;
  padding: 0;
  color: rgb(230, 230, 230);
`,xn=({children:e,menuList:t,onClick:n})=>m.createElement(bn,null,t.map((e=>m.createElement(fn,{key:e.key,"data-id":e.key,onClick:n},m.createElement(se,{placement:"left",title:e.title},m.createElement(yn,null,Ie(`${e.icon}`)))))),e),vn=s.div`
  outline-color: transparent;
  margin-bottom: 1rem;
`,kn=s.button`
  position: relative;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 40px;
  background: transparent;
  border: 0;
  border-radius: 2px;
  padding: 0;
  color: rgb(230, 230, 230);
`;function wn(){const e=wt((e=>e));return oe.exports.useEffect((()=>{window.addEventListener("beforeprint",(()=>{window.document.title=`Resume_${e.name}_${e.label}_${e.totalExp}`.split(" ").join("_")})),window.addEventListener("afterprint",(()=>{window.document.title="Single Page Resume Builder"}))}),[e]),m.createElement(vn,null,m.createElement(kn,{onClick:window.print},Ie("download")))}const Cn=s.div`
  height: 100vh;
  display: flex;

  @media print {
    display: none;
  }
`,In=[{key:0,title:"Template",icon:"template",component:m.createElement(sn,null)},{key:1,title:"Theme",icon:"color",component:m.createElement(En,null)}],Tn=()=>{var e;const[t,n]=oe.exports.useState(-1),a=oe.exports.useCallback((e=>{t===e.currentTarget.dataset.id?n(-1):n(e.currentTarget.dataset.id)}),[t,n]);return m.createElement(Cn,null,m.createElement(ln,{isShown:-1!==t},null==(e=In[t])?void 0:e.component),m.createElement(xn,{menuList:In,onClick:a},m.createElement(wn,null)))},jn=[{label:"Name",type:"Input",value:"name"},{label:"Image",type:"Input",value:"image"},{label:"Role",type:"Input",value:"label"},{label:"Email",type:"Input",value:"email"},{label:"Phone",type:"Input",value:"phone"},{label:"Location",type:"Input",value:"location"},{label:"Relevant Experience",type:"Input",value:"relExp"},{label:"Total Experience",type:"Input",value:"totalExp"},{label:"Summary",type:"MarkDownField",value:"summary"},{label:"Objective",type:"MarkDownField",value:"objective"}],Sn=[{label:"Linkedin",type:"Input",value:"linkedin"},{label:"Github",type:"Input",value:"github"},{label:"Hackerrank",type:"Input",value:"hackerrank"},{label:"HackerEarth",type:"Input",value:"hackerearth"},{label:"Codechef",type:"Input",value:"codechef"},{label:"Codeforces",type:"Input",value:"codeforces"},{label:"Twitter",type:"Input",value:"twitter"},{label:"Leetcode",type:"Input",value:"leetcode"},{label:"Devto",type:"Input",value:"devto"},{label:"Medium",type:"Input",value:"medium"},{label:"Wordpress",type:"Input",value:"wordpress"},{label:"Hashnode",type:"Input",value:"hashnode"},{label:"Squarespace",type:"Input",value:"squarespace"},{label:"Behance",type:"Input",value:"behance"},{label:"Dribbble",type:"Input",value:"dribbble"}],Dn=[{label:"Institution",type:"Input",value:"institution"},{label:"Url",type:"Input",value:"url"},{label:"Study Type",type:"Input",value:"studyType"},{label:"Area",type:"Input",value:"area"},{label:"Start Date",type:"Input",value:"startDate"},{label:"End Date",type:"Input",value:"endDate"},{label:"Score",type:"Input",value:"score"}],$n=[{label:"Name",type:"Input",value:"name"},{label:"Role",type:"Input",value:"role"},{label:"From",type:"Input",value:"from"},{label:"To",type:"Input",value:"to"},{label:"Years",type:"Input",value:"years"},{label:"Description",type:"MarkDownField",value:"description"}],An=s.div`
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;
`,zn=s.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  font-size: 1.5rem;
  background-color: white;
`,Pn=s(me)`
  border: 1px solid #222;
  height: 2.625rem;
  padding: 0.625rem;
  max-width: 100%;
  background: #424242;
  color: #fff;
  border-radius: 2px;
`,Mn=de((()=>m.createElement(zn,null,Ie("drag")))),Rn=ue((({type:e,hasRating:t,focusIndex:n,setFocusIndex:a,ind:l,name:r,rating:o,updateSkill:i,deleteSkill:c})=>m.createElement(An,null,m.createElement(xe,null,m.createElement(Mn,null),m.createElement(Pn,{value:r,autoFocus:n===l,onChange:t=>{a(l),i(e,l,"name",t.target.value)}}),m.createElement(zn,{onClick:()=>c(e,l)},Ie("delete"))),t&&m.createElement(ge,{defaultValue:o,min:1,max:5,onChange:t=>i(e,l,"rating",t)})))),Fn=pe((({type:e,focusIndex:t,setFocusIndex:n,hasRating:a,skills:l,updateSkill:r,deleteSkill:o})=>m.createElement("div",null,null==l?void 0:l.map((({name:l,rating:i},c)=>m.createElement(Rn,{key:l,index:c,ind:c,type:e,hasRating:a,focusIndex:t,setFocusIndex:n,name:l,rating:i,updateSkill:r,deleteSkill:o}))))));function Ln({type:e,hasRating:t,skills:n,addSkill:a,updateSkill:l,deleteSkill:r,changeOrder:o}){const[i,c]=oe.exports.useState(-1);return m.createElement(m.Fragment,null,m.createElement(Fn,{focusIndex:i,setFocusIndex:c,type:e,hasRating:t,skills:n,onSortEnd:({oldIndex:t,newIndex:n})=>o(e,t,n),updateSkill:l,deleteSkill:r,useDragHandle:!0}),m.createElement("button",{type:"button",style:{fontSize:"1.5rem"},onClick:()=>a(e)},Ie("add")))}const On=new J;function _n({value:e,setValue:t}){const n=oe.exports.useCallback((({text:e})=>{t(e)}),[t]);return m.createElement(m.Fragment,null,m.createElement(he,{style:{height:"200px"},view:{menu:!0,md:!0,html:!1},plugins:["font-bold","font-italic","link","full-screen","list-ordered","list-unordered","logger"],value:e,renderHTML:e=>On.render(e),onChange:n}))}const{Panel:Gn}=Ee,Nn=s.div`
  margin: 0;
  background: white;
`,Bn=s(ke)`
  padding: 5px;
  border-bottom: 1px solid black;
  height: 47.2px;

  p {
    font-size: 14px;
    padding-top: 2px;
  }
`,Hn=s(me)`
  border: 1px solid #222;
  height: 2.625rem;
  padding: 0.625rem;
  max-width: 100%;
  background: #424242;
  color: #fff;
  border-radius: 2px;
  margin-bottom: 5px;
`,qn=s.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  font-size: 1.2rem;
  background-color: white;
`,Vn=de((()=>m.createElement(qn,null,Ie("drag")))),Un=ue((({item:e,identifier:t})=>m.createElement(Bn,null,m.createElement(Vn,null),m.createElement("p",null,null==e?void 0:e[t])))),Kn=pe((({items:e,identifier:t})=>m.createElement(Nn,null,e.map(((e,n)=>m.createElement(Un,{key:n,index:n,item:e,identifier:t}))))));function Wn({METADATA:e,identifier:t,itemList:n,operations:a}){const[l,r]=oe.exports.useState(!1),o=m.createElement(Ee,null,n.map(((n,l)=>m.createElement(Gn,{header:n[t],key:l,extra:m.createElement(q,{onClick:()=>a.purge(l)})},e.map((e=>"Input"===e.type?m.createElement(Hn,{key:e.label,value:n[e.value],placeholder:e.label,onChange:t=>a.update(l,e.value,t.target.value)}):m.createElement(_n,{key:e.label,value:n[e.value],setValue:t=>a.update(l,e.value,t)}))))))),i=m.createElement(Kn,{items:n,identifier:t,onSortEnd:a.changeOrder,useDragHandle:!0});return m.createElement(m.Fragment,null,m.createElement(be,{checked:l,onChange:()=>{r((e=>!e))}}),l?i:o,m.createElement("button",{type:"button",style:{fontSize:"2rem"},onClick:a.add},Ie("add")))}const Jn=s.div`
  margin: 8px 0;
`,Yn=s.p`
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 7px;
`;function Qn(){const{projects:e,awards:t}=St((e=>e)),n=St((e=>e.update));return m.createElement(m.Fragment,null,m.createElement(Jn,null,m.createElement(Yn,null,"Projects"),m.createElement(_n,{value:e,setValue:e=>n("projects",e)})),m.createElement(Jn,null,m.createElement(Yn,null,"Awards"),m.createElement(_n,{value:t,setValue:e=>n("awards",e)})))}const Xn=s.div`
  margin: 8px 0;
`,Zn=s(me)`
  border: 1px solid #222;
  height: 2.625rem;
  padding: 0.625rem;
  max-width: 100%;
  background: #424242;
  color: #fff;
  border-radius: 2px;
  margin-bottom: 5px;
`;function ea({state:e,update:t}){return m.createElement(m.Fragment,null,e.map(((e,n)=>m.createElement(Xn,{key:n},m.createElement(Zn,{placeholder:e,value:e,onChange:e=>t(n,e.target.value)})))))}const ta=s.div`
  margin: 8px 0;
`,na=s.p`
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 7px;
`,aa=s(me)`
  border: 1px solid #222;
  height: 2.625rem;
  padding: 0.625rem;
  max-width: 100%;
  background: #424242;
  color: #fff;
  border-radius: 2px;
  margin-bottom: 5px;
`;function la({METADATA:e,state:t,update:n}){return m.createElement(m.Fragment,null,e.map((e=>m.createElement(ta,{key:e.label},m.createElement(na,null,e.label),"Input"===e.type?m.createElement(aa,{value:t[e.value],"data-label":e.value,onChange:e=>n(e.target.dataset.label,e.target.value)}):m.createElement(_n,{value:t[e.value],setValue:t=>n(e.value,t)})))))}const ra=s.div`
  height: 2px;
  background: white;
  margin: 20px 0;
`,oa=s.div`
  display: grid;
  gap: 1rem;
  background: #222;
`,ia=s.h2`
  color: #fff;
  font-size: 1.5rem;
  line-height: 2.5rem;
  margin-bottom: 0;
`,ca=()=>{const e=wt((e=>e)),t=wt((e=>e.update));return m.createElement(oa,null,m.createElement(ia,null,"Intro"),m.createElement(la,{state:e,METADATA:jn,update:t}),m.createElement(ra,null))},sa=()=>{const e=Ct((e=>e)),t=Ct((e=>e.update));return m.createElement(oa,null,m.createElement(ia,null,"Social"),m.createElement(la,{state:e,METADATA:Sn,update:t}))},ma=()=>m.createElement(oa,null,m.createElement(ia,null,"Projects"),m.createElement(Qn,null)),da=()=>{const e=Dt((e=>e.labels)),t=Dt((e=>e.update));return m.createElement(oa,null,m.createElement(ia,null,"Template Labels"),m.createElement(ea,{state:e,update:t}))},ua=()=>{const e=jt((e=>e.education)),[t,n,a,l]=jt((e=>[e.add,e.update,e.purge,e.changeOrder]),ne);return m.createElement(oa,null,m.createElement(ia,null,"Education"),m.createElement(Wn,{METADATA:Dn,itemList:e,identifier:"studyType",operations:{update:n,add:t,purge:a,changeOrder:l}}))},pa=()=>{const e=It((e=>e.companies)),[t,n,a,l]=It((e=>[e.add,e.update,e.purge,e.changeOrder]),ne);return m.createElement(oa,null,m.createElement(ia,null,"Experience"),m.createElement(Wn,{METADATA:$n,itemList:e,identifier:"name",operations:{update:n,add:t,purge:a,changeOrder:l}}))},ga=({type:e,hasRating:t=!1})=>{const[n,a,l,r,o]=Tt((t=>[t[e],t.add,t.update,t.purge,t.changeOrder]),ne);return m.createElement(oa,null,m.createElement(ia,null,e.toUpperCase()),m.createElement(Ln,{type:e,hasRating:t,skills:n,addSkill:a,updateSkill:l,deleteSkill:r,changeOrder:o}),m.createElement(ra,null))},ha=()=>m.createElement(m.Fragment,null,m.createElement(ga,{type:"languages",hasRating:!0}),m.createElement(ga,{type:"frameworks",hasRating:!0}),m.createElement(ga,{type:"technologies",hasRating:!1}),m.createElement(ga,{type:"libraries",hasRating:!1}),m.createElement(ga,{type:"databases",hasRating:!1}),m.createElement(ga,{type:"practices",hasRating:!1}),m.createElement(ga,{type:"tools",hasRating:!1})),Ea=s.div`
  height: 100vh;
  display: flex;

  @media print {
    display: none;
  }
`,ba=[{key:0,title:"Intro",icon:"identity",component:m.createElement(ca,null)},{key:1,title:"Social",icon:"social",component:m.createElement(sa,null)},{key:2,title:"Skills",icon:"tool",component:m.createElement(ha,null)},{key:3,title:"Experience",icon:"work",component:m.createElement(pa,null)},{key:4,title:"Experience",icon:"education",component:m.createElement(ua,null)},{key:5,title:"Projects & Awards",icon:"certificate",component:m.createElement(ma,null)},{key:6,title:"Label",icon:"label",component:m.createElement(da,null)}],fa=()=>{var e;const[t,n]=oe.exports.useState(-1),a=oe.exports.useCallback((e=>{t===e.currentTarget.dataset.id?n(-1):n(e.currentTarget.dataset.id)}),[t,n]);return m.createElement(Ea,null,m.createElement(xn,{menuList:ba,onClick:a}),m.createElement(ln,{isShown:-1!==t},null==(e=ba[t])?void 0:e.component))},ya=()=>m.createElement(xe,{jc:"space-between"},m.createElement(fa,null),m.createElement(tn,null),m.createElement(Tn,null));function xa(){const e=un((e=>e.theme));return m.createElement(m.Fragment,null,m.createElement(fe,{theme:e},m.createElement(ya,null)))}ye.render(m.createElement(m.StrictMode,null,m.createElement(xa,null)),document.getElementById("root"));
