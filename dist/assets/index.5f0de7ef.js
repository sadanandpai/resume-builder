import{q as e,b as t,l as n,m as l,g as o,r as i,c as r,R as a,P as c,B as s,M as m,a as d,d as u,A as p,e as g,f as h,S as E,h as f,F as v,i as y,j as x,k as b,n as w,I as k,G as C,o as j,J as I,p as $,T as z,s as P,t as T,u as S,v as D}from"./vendor.b6014dd6.js";const A=e.div`
  display: flex;
  justify-content: ${e=>e.jc};
  align-items: ${e=>e.ai};
  row-gap: ${e=>e.rGap};
  column-gap: ${e=>e.cGap};
`,G=e(A)`
  flex-direction: column;
`,M=e(A)`
  justify-content: center;
`,B=e(A)`
  align-items: center;
`,L=e(A)`
  justify-content: center;
  align-items: center;
`,F=[{fontColor:"black",backgroundColor:"white",primaryColor:t.primary,secondaryColor:n[6]},{fontColor:l[8],backgroundColor:"white",primaryColor:n[9],secondaryColor:o.primary},{fontColor:"black",backgroundColor:"white",primaryColor:"green",secondaryColor:i[3]},{fontColor:"white",backgroundColor:"black",primaryColor:"yellow",secondaryColor:"skyblue"}],R=r((e=>({theme:F[0],setTheme:t=>e({theme:F[t]})})));function _(){const e=R((e=>e.setTheme)),t=a.createElement("div",null,a.createElement(s,{onClick:()=>e(0)},"0"),a.createElement(s,{onClick:()=>e(1)},"1"),a.createElement(s,{onClick:()=>e(2)},"2"),a.createElement(s,{onClick:()=>e(3)},"3"));return a.createElement(c,{content:t,title:"Themes",trigger:"click"},a.createElement(s,null,"Themes"))}const q=new Map([["mobile",a.createElement(m,null)],["email",a.createElement(d,null)],["location",a.createElement(u,null)],["github",a.createElement(p,null)],["linkedin",a.createElement(g,null)],["about me",a.createElement(h,null)],["technical expertise",a.createElement(E,null)],["experience",a.createElement(f,null)],["education",a.createElement(v,null)],["tools",a.createElement(y,null)],["key projects / involvements",a.createElement(x,null)],["certificates and awards",a.createElement(b,null)],["career objective",a.createElement(w,null)],["methodology / approach",a.createElement(k,null)],["skills / expsoure",a.createElement(C,null)]]);function N(e){return q.get(null==e?void 0:e.toLowerCase())}const J=e.div`
  border: 1px solid ${e=>j(e.theme.fontColor).alpha(.25).toString()};
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
`,K=e(J)`
  padding-top: 20px;

  .header {
    top: -20px;
    left: 0;
    background: ${e=>e.theme.backgroundColor};;
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
`;function U(e){return a.createElement(J,{style:e.styles},a.createElement(L,{className:"header",cGap:"5px"},e.icon,a.createElement("div",{className:"header__title"},e.title)),e.children)}function Y(e){var t;return a.createElement(K,{style:e.styles},a.createElement(L,{className:"header"},a.createElement("h1",{className:"header__title"},e.title)),a.createElement(A,{className:"social-icons"},null==(t=e.icons)?void 0:t.map(((e,t)=>a.createElement("a",{href:e[1],key:t},N(e[0]))))),e.children)}const H=e.h3`
  color: ${e=>j(e.theme.primaryColor).alpha(.75).toString()};
  margin-bottom: 0;
  font-weight: 600;
`;function V({data:e}){let t=null;return e.experience&&(t=Object.values(e.experience).filter((e=>"function"!=typeof e)).map(((e,t)=>a.createElement("div",{key:null==e?void 0:e.type},null==e?void 0:e.type,": ",a.createElement("strong",null,null==e?void 0:e.years))))),a.createElement(A,{jc:"space-between"},a.createElement(G,{rGap:"5px"},a.createElement(H,null,e.role),t),a.createElement(G,{jc:"flex-end",rGap:"5px"},e.mobile?a.createElement(W,{icon:N("mobile"),value:e.mobile}):null,e.email?a.createElement(W,{icon:N("email"),value:e.email}):null,e.location?a.createElement(W,{icon:N("location"),value:e.location}):null))}const W=({icon:e,value:t})=>a.createElement(B,{jc:"flex-end",cGap:"8px"},e,a.createElement("span",null,t));function O({children:e}){return Je((e=>e.isPhotoDisplayed))&&e}const Q=e.img`
  border-radius: 50%;
  height: 60px;
  width: 60px;
  float: left;
  shape-outside: circle();
  margin-right: 20px;
  margin-bottom: 5px;
  border: 0.5px solid ${e=>e.theme.fontColor};
`;function X({description:e,photo:t}){const n=t&&a.createElement(O,null,a.createElement(Q,{src:t}));return a.createElement(a.Fragment,null,n,e)}const Z=e.div`
  width: 15ch;
  font-weight: 600;
`;const ee=I((function({itemLabel:e,itemRating:t,theme:n}){return a.createElement(B,null,a.createElement(Z,null,e),a.createElement($,{percent:20*t,showInfo:!1,strokeColor:n.secondaryColor,size:"small"}))}));function te({items:e}){return a.createElement(G,{rGap:"8px"},null==e?void 0:e.map(((e,t)=>a.createElement(ee,{itemLabel:e.name,itemRating:e.rating,key:e.name,index:t}))))}const ne=e.span`
  padding: 4px;
  font-size: 98%;
  font-weight: 500;
  border: 1px solid ${e=>e.theme.secondaryColor};
  border-radius: 4px;
`;function le({items:e}){return e?a.createElement(A,{cGap:"10px",rGap:"10px",style:{flexWrap:"wrap"}},e.map(((e,t)=>a.createElement(ne,{key:t},e)))):null}const oe=e.div`
  font-size: 1rem;
  font-weight: 500;
`,ie=e.div`
  font-weight: 500;
  font-size: 0.8rem;
  line-height: inherit;
`,re=e.div`
  font-style: italic;
  font-size: 0.6rem;
`;function ae(e){return a.createElement(a.Fragment,null,a.createElement(A,{jc:"space-between",ai:"flex-end",style:{lineHeight:"initial"}},a.createElement(oe,null,e.company.name),a.createElement(re,null,e.company.years)),a.createElement(A,{jc:"space-between",ai:"flex-end"},a.createElement(ie,null,e.company.role),a.createElement(re,null,e.company.expYears)))}function ce({items:e}){return e?a.createElement("ul",{style:{paddingLeft:"16px",marginBottom:"0",fontSize:"0.8rem"}},e.map(((e,t)=>a.createElement("li",{key:t,dangerouslySetInnerHTML:{__html:e}})))):null}const se=e(z)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  height: 100%;
  padding-top: 15px;
  color: ${e=>e.theme.fontColor};
`,me=e(se.Item)`
  padding-bottom: 0;
  flex-grow: 1;
  padding-bottom: 20px;

  :last-child {
    flex-grow: 0;
    padding-bottom: 0;
  }
`;function de({styles:e,companies:t}){return a.createElement(se,{style:e},null==t?void 0:t.map(((e,t)=>a.createElement(me,{key:t},a.createElement(ae,{company:e}),a.createElement(ce,{items:e.description})))))}const ue=e.div`
  font-weight: 500;
  font-size: 0.8rem;
`,pe=e.div`
  font-weight: 400;
  font-size: 0.7rem;
`;function ge({items:e}){return e?e.map(((e,t)=>a.createElement("div",{key:t},a.createElement(A,{jc:"space-between"},a.createElement(ue,null,e.degree),a.createElement("em",null,e.years)),a.createElement(pe,null,e.specialization),a.createElement(A,{jc:"space-between"},a.createElement("div",null,e.institution),a.createElement("em",null,e.grade))))):null}function he(e){return a.createElement(ce,{items:null==e?void 0:e.items})}const Ee={name:"Jane Doe",role:"Frontend Developer",mobile:"+91 9876543210",email:"johndoe@email.com",location:"Bengaluru",experience:[{type:"Frontend experience",years:"4 years"},{type:"Total Experience",years:"6 years"}],social:[["linkedin","https://www.linkedin.com/in/sadanandpai/"],["github","https://github.com/sadanandpai/"]],photo:"https://www.linkpicture.com/q/generated_photos_5e68893b6d3b380006f22f8b.jpg",about:{title:"About me",description:"I am a web developer having expertise in frontend development and exposure to back- end development. I design and develop web applications using the latest technologies to deliver the product with quality code.\nI am very good at UI fundamentals & Technologies and can adapt to most of the front-end frameworks quickly."},objective:{title:"Career Objective",description:"Eager to expand my skill set through external trainings to help boost all major front desk KPIs. Hoping to leverage organizational skills to help ABC Corp introduce time-saving schemes for all executives."}},fe={technical:{title:"Technical Expertise",items:[{name:"JavaScript",rating:5},{name:"HTML5",rating:5},{name:"CSS",rating:5},{name:"React",rating:4},{name:"Angular",rating:4}]},exposure:{title:"Skills / Expsoure",items:["Algorithms","Data Structures","SQL","Progressive Web Apps","jQuery","Redux","Firebase"]},methodology:{title:"Methodology / Approach",items:["Component based architecture","Agile methodology","Design Patterns","Test Driven Development","MVC","RESTful architecture"]},tools:{title:"Tools",items:["Git","VS Code","Jira","Webpack","Eclipse","Bitbucket"]}},ve={title:"Experience",companies:[{name:"Comapny 1",role:"Senior Software Developer",years:"Apr 2021 - present",expYears:"2.5 years",description:["Use my extensive experience with front end development to <u>define the structure and components</u> for the project, making sure they are reusable","Keep the code quality high reviewing code from other developers and suggesting improvements","Interact with the designer to suggest changes and to make sure the view he has about the design is translated into actual functionality","E-commerce maintenance <i>with Fastcommerce</i>, a Brazilian e-commerce platform"]},{name:"Comapny 2",role:"Software Developer",years:"Jun 2015 - Dec 2017",expYears:"2.5 years",description:["Develop web applications based on Sharepoint, Drupal 8 and Episerver","Lead a team of <strong>10 front end developers</strong>, giving support to the client's multi-cultural team, providing feedback, clarifying requirements and helping with technical questions","Keep the Project Manager and the IT Leads updated on the overall progress of the projects and manage the tasks distributed to the team","Keep the code and the features implemented by the other developers in accordance to the requirements"]},{name:"Comapny 3",role:"Trainee Developer",years:"Aug 2011 - May 2015",expYears:"1 year",description:["Design easy user interfaces and great user experiences for the digital platforms of small companies","Wordpress development, including themes creation or customization, custom plugins development and training","E-commerce maintenance <i>with Fastcommerce</i>, a Brazilian e-commerce platform","E-commerce development with Magento, customizing preexisting themes ","Integrate external services such as payment services, delivery, etc into Magento solutions","VPS configuration and optimization (Apache & Nginx)"]}]},ye={keyProjects:{title:"Key Projects / Involvements",items:["Prevented millions of dollars in state sales tax undercharges by initiating tests that revealed a bug in a new release of shopping cart software.","Isolated previously undiscovered flaw in price checking tool resulting in more competitive pricing and a 20 percent increase in revenue.","Implemented automated testing tools spawning more diligent levels of regression testing, negative testing, error/bug retests and usability.","Prevented millions of dollars in state sales tax undercharges by initiating tests that revealed a bug in a new release of shopping cart software."]},certificates:{title:"Certificates and Awards",items:["<strong>React</strong> and redux - A complete guide 2020 from Udemy","Agile and Scrum Master Certificate from Udacity","Best performer award for consistently exceeding the performance","Certificate of exceptional bug finder by XYZ client","Recorgnition zero defect delivery","Best performer award for consistently exceeding the performance"]}},xe={title:"Education",items:[{institution:"XIV, University",years:"2010 - 2014",grade:"8.3 CGPA",degree:"B.Tech",specialization:"Masters in Cloud Technology"}]},be=r((()=>({intro:Ee}))),we=r((()=>({experience:ve}))),ke=r((()=>({keyProjects:ye.keyProjects,certificates:ye.certificates}))),Ce=r((()=>({technical:fe.technical,exposure:fe.exposure,methodology:fe.methodology,tools:fe.tools}))),je=r((()=>({education:xe}))),Ie=e(G)`
  flex-basis: 66%;
  row-gap: 20px;
  height: 100%;
`,$e=e(G)`
  flex-basis: 34%;
  row-gap: 20px;
  height: 100%;
  justify-content: space-between;
`;const ze=e.div`
  width: 15ch;
  font-weight: 600;
`,Pe=e.span`
  width: 16px;
  height: 8px;
  border-radius: 25%;
  display: inline-block;
  border: 0.5px solid ${e=>e.theme.secondaryColor};
  margin: 0px 4px;
  background-color: ${e=>e.filled?e.theme.secondaryColor:"transparent"};
`;function Te({itemLabel:e,itemRating:t,index:n}){const l=[];for(let o=1;o<=5;o++)l.push(a.createElement(Pe,{"data-index":n,"data-rating":o,filled:o<=t,key:o}));return a.createElement(B,null,a.createElement(ze,null,e),l)}function Se({items:e}){return e?a.createElement(G,{rGap:"8px"},e.map(((e,t)=>a.createElement(Te,{itemLabel:e.name,itemRating:e.rating,key:e.name,index:t})))):null}const De=e.div`
  width: 80%;
  margin: 10px auto 4px auto;
  min-height: 1px;
  background-color: ${e=>e.theme.secondaryColor};
`,Ae=e.div`
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
`;function Ge({title:e,Icon:t}){return a.createElement(Ae,null,t,e)}const Me=e.div`
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
    color: ${e=>e.theme.fontColor};
  }
`;function Be({items:e}){return e?a.createElement(Me,null,e.map(((e,t)=>a.createElement("a",{href:e[1],key:t},N(e[0])," ",a.createElement("span",null,e[1].split("/").slice(-2)))))):null}const Le=e.div`
  margin: auto;
  display: grid;
  grid-template-columns: 68% 10px 1fr;;
`,Fe=e.div`
  height: 100%;
  width: 2px;
  background-color: #007bff;
`,Re=e.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:first-child{
    padding-right: 10px;
  }
`,_e=e.div`
  margin: 0;
  color: ${e=>e.theme.primaryColor};
  font-size: 1.5rem;
`;const qe=[function(){var e,t,n,l;const o=be((e=>e.intro)),i=je((e=>e.education)),r=we((e=>e.experience)),c=ke((e=>[e.keyProjects,e.certificates]),P),[s,m]=null!=c?c:[null,null],[d,u,p,g]=Ce((e=>[e.technical,e.exposure,e.methodology,e.tools]),P),h=[{title:null==r?void 0:r.title,component:a.createElement(de,{companies:null==r?void 0:r.companies}),styles:{flexGrow:1}},{title:null==s?void 0:s.title,component:a.createElement(he,{items:null==s?void 0:s.items})},{title:null==m?void 0:m.title,component:a.createElement(he,{items:null==m?void 0:m.items})}],E=[{title:null==(e=o.about)?void 0:e.title,component:a.createElement(X,{photo:o.photo,description:null==(t=o.about)?void 0:t.description})},{title:null==(n=o.objective)?void 0:n.title,component:a.createElement(X,{description:null==(l=o.objective)?void 0:l.description})},{title:null==d?void 0:d.title,component:a.createElement(te,{items:null==d?void 0:d.items})},{title:null==u?void 0:u.title,component:a.createElement(le,{items:null==u?void 0:u.items})},{title:null==p?void 0:p.title,component:a.createElement(le,{items:null==p?void 0:p.items})},{title:null==g?void 0:g.title,component:a.createElement(le,{items:null==g?void 0:g.items})},{title:null==i?void 0:i.title,component:a.createElement(ge,{items:null==i?void 0:i.items})}];return a.createElement(a.Fragment,null,a.createElement(Ie,null,a.createElement(Y,{title:o.name,icons:o.social},a.createElement(V,{data:o})),h.map((({title:e,component:t,styles:n})=>e?a.createElement(U,{icon:N(e),title:e,styles:n,key:e},t):null))),a.createElement($e,null,E.map((({title:e,component:t})=>e?a.createElement(U,{icon:N(e),title:e,key:e},t):null))))},function(){var e,t,n,l,o,i;const r=be((e=>e.intro)),c=je((e=>e.education)),s=we((e=>e.experience)),[m,d]=ke((e=>[e.keyProjects,e.certificates]),P),[u,p,g,h]=Ce((e=>[e.technical,e.exposure,e.methodology,e.tools]),P);return a.createElement(Le,null,a.createElement(Re,null,a.createElement(_e,null,null==r?void 0:r.name),a.createElement(V,{data:r}),a.createElement(Be,{items:null==r?void 0:r.social}),a.createElement(Ge,{Icon:N(null==s?void 0:s.title),title:null==s?void 0:s.title}),a.createElement(de,{companies:null==s?void 0:s.companies}),a.createElement(De,null),a.createElement(Ge,{Icon:N(null==m?void 0:m.title),title:null==m?void 0:m.title}),a.createElement(he,{items:null==m?void 0:m.items}),a.createElement(De,null),a.createElement(Ge,{Icon:N(null==d?void 0:d.title),title:null==d?void 0:d.title}),a.createElement(he,{items:null==d?void 0:d.items})),a.createElement(Fe,null),a.createElement(Re,null,a.createElement(Ge,{Icon:N(null==(e=r.about)?void 0:e.title),title:null==(t=r.about)?void 0:t.title}),a.createElement(X,{description:null==(n=r.about)?void 0:n.description}),a.createElement(De,null),a.createElement(Ge,{Icon:N(null==(l=r.objective)?void 0:l.title),title:null==(o=r.objective)?void 0:o.title}),a.createElement(X,{description:null==(i=r.objective)?void 0:i.description}),a.createElement(De,null),a.createElement(Ge,{Icon:N(null==u?void 0:u.title),title:null==u?void 0:u.title}),a.createElement(Se,{items:null==u?void 0:u.items}),a.createElement(De,null),a.createElement(Ge,{Icon:N(null==p?void 0:p.title),title:null==p?void 0:p.title}),a.createElement(le,{items:null==p?void 0:p.items}),a.createElement(De,null),a.createElement(Ge,{Icon:N(null==g?void 0:g.title),title:null==g?void 0:g.title}),a.createElement(le,{items:null==g?void 0:g.items}),a.createElement(De,null),a.createElement(Ge,{Icon:N(null==h?void 0:h.title),title:null==h?void 0:h.title}),a.createElement(le,{items:null==h?void 0:h.items}),a.createElement(De,null),a.createElement(Ge,{Icon:N(null==c?void 0:c.title),title:null==c?void 0:c.title}),a.createElement(ge,{items:null==c?void 0:c.items})))}],Ne=r((e=>({template:qe[0],setTemplate:t=>e({template:qe[t]})}))),Je=r((e=>({isPhotoDisplayed:!0,setIsPhotoDisplayed:t=>e({isPhotoDisplayed:t})})));function Ke(){const e=Ne((e=>e.setTemplate)),t=a.createElement("div",null,a.createElement(s,{onClick:()=>e(0)},"0"),a.createElement(s,{onClick:()=>e(1)},"1"));return a.createElement(c,{content:t,title:"Templates",trigger:"click"},a.createElement(s,null,"Templates"))}function Ue(){const e=Je((e=>e.isPhotoDisplayed)),t=Je((e=>e.setIsPhotoDisplayed)),n=a.createElement("div",null,"Photo ",a.createElement(T,{checked:e,onChange:t,size:"small"}));return a.createElement(c,{content:n,title:"Items",trigger:"click"},a.createElement(s,null,"Items"))}const Ye=e(M)`
    @media print{
        display: none;
    }
`;function He(){return a.createElement(Ye,null,a.createElement(Ke,null),a.createElement(_,null),a.createElement(Ue,null))}const Ve=e(A)`
  width: 210mm;
  height: 297mm;
  border: 1px solid ${e=>e.theme.fontColor};
  margin: auto;
  padding: 40px 25px;
  align-items: flex-start;
  column-gap: 10px;
  color: ${e=>e.theme.fontColor};
  background-color: ${e=>e.theme.backgroundColor};
`;function We(){const e=Ne((e=>e.template));return a.createElement(Ve,{className:"resume"},a.createElement(e,null))}function Oe(){const e=R((e=>e.theme));return a.createElement(a.Fragment,null,a.createElement(He,null),a.createElement(S,{theme:e},a.createElement(We,null)))}D.render(a.createElement(a.StrictMode,null,a.createElement(Oe,null)),document.getElementById("root"));
