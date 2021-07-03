import{q as e,b as t,l as n,m as l,g as r,r as o,c as i,R as a,P as c,B as s,M as m,a as p,d,A as u,e as g,f as h,S as E,h as f,F as y,i as x,j as b,k as v,n as w,I as k,G as C,o as j,J as I,p as $,T as z,s as D,t as P,u as T,v as S}from"./vendor.b6014dd6.js";const A=e.div`
  display: flex;
  justify-content: ${e=>e.jc};
  align-items: ${e=>e.ai};
  row-gap: ${e=>e.rGap};
  column-gap: ${e=>e.cGap};
`,G=e(A)`
  flex-direction: column;
`,M=e(A)`
  justify-content: center;
`,L=e(A)`
  align-items: center;
`,B=e(A)`
  justify-content: center;
  align-items: center;
`,R=[{fontColor:"black",backgroundColor:"white",primaryColor:t.primary,secondaryColor:n[6]},{fontColor:l[8],backgroundColor:"white",primaryColor:n[9],secondaryColor:r.primary},{fontColor:"black",backgroundColor:"white",primaryColor:"green",secondaryColor:o[3]},{fontColor:"white",backgroundColor:"black",primaryColor:"yellow",secondaryColor:"skyblue"}],F=i((e=>({theme:R[0],setTheme:t=>e({theme:R[t]})})));function q(){const e=F((e=>e.setTheme)),t=a.createElement("div",null,a.createElement(s,{onClick:()=>e(0)},"0"),a.createElement(s,{onClick:()=>e(1)},"1"),a.createElement(s,{onClick:()=>e(2)},"2"),a.createElement(s,{onClick:()=>e(3)},"3"));return a.createElement(c,{content:t,title:"Themes",trigger:"click"},a.createElement(s,null,"Themes"))}const _=new Map([["mobile",a.createElement(m,null)],["email",a.createElement(p,null)],["location",a.createElement(d,null)],["github",a.createElement(u,null)],["linkedin",a.createElement(g,null)],["about me",a.createElement(h,null)],["technical expertise",a.createElement(E,null)],["experience",a.createElement(f,null)],["education",a.createElement(y,null)],["tools",a.createElement(x,null)],["key projects / involvements",a.createElement(b,null)],["certificates and awards",a.createElement(v,null)],["career objective",a.createElement(w,null)],["methodology / approach",a.createElement(k,null)],["skills / expsoure",a.createElement(C,null)]]);function N(e){return _.get(e.toLowerCase())}const U=e.div`
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
`,J=e(U)`
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
`;function Y(e){return a.createElement(U,{style:e.styles},a.createElement(B,{className:"header",cGap:"5px"},e.icon,a.createElement("div",{className:"header__title"},e.title)),e.children)}function K(e){return a.createElement(J,{style:e.styles},a.createElement(B,{className:"header"},a.createElement("h1",{className:"header__title"},e.title)),a.createElement(A,{className:"social-icons"},e.icons.map(((e,t)=>a.createElement("a",{href:e[1],key:t},N(e[0]))))),e.children)}const H=e.h3`
  color: ${e=>j(e.theme.primaryColor).alpha(.75).toString()};
  margin-bottom: 0;
  font-weight: 600;
`;function Q({data:e}){return a.createElement(A,{jc:"space-between"},a.createElement(G,{rGap:"5px"},a.createElement(H,null,e.role),a.createElement("div",null,e.experience[0].type,": ",a.createElement("strong",null,e.experience[0].years)),a.createElement("div",null,e.experience[1].type,": ",e.experience[1].years)),a.createElement(G,{jc:"flex-end",rGap:"5px"},a.createElement(V,{icon:N("mobile"),value:e.mobile}),a.createElement(V,{icon:N("email"),value:e.email}),a.createElement(V,{icon:N("location"),value:e.location})))}const V=({icon:e,value:t})=>a.createElement(L,{jc:"flex-end",cGap:"8px"},e,a.createElement("span",null,t));function W({children:e}){return Ue((e=>e.isPhotoDisplayed))&&e}const X=e.img`
  border-radius: 50%;
  height: 60px;
  width: 60px;
  float: left;
  shape-outside: circle();
  margin-right: 20px;
  margin-bottom: 5px;
  border: 0.5px solid ${e=>e.theme.fontColor};
`;function Z({description:e,photo:t}){const n=t&&a.createElement(W,null,a.createElement(X,{src:t}));return a.createElement(a.Fragment,null,n,e)}const O=e.div`
  width: 15ch;
  font-weight: 600;
`;const ee=I((function({itemLabel:e,itemRating:t,theme:n}){return a.createElement(L,null,a.createElement(O,null,e),a.createElement($,{percent:20*t,showInfo:!1,strokeColor:n.secondaryColor,size:"small"}))}));function te({items:e}){return a.createElement(G,{rGap:"8px"},e.map(((e,t)=>a.createElement(ee,{itemLabel:e.name,itemRating:e.rating,key:e.name,index:t}))))}const ne=e.span`
  padding: 4px;
  font-size: 98%;
  font-weight: 500;
  border: 1px solid ${e=>e.theme.secondaryColor};
  border-radius: 4px;
`;function le({items:e}){return a.createElement(A,{cGap:"10px",rGap:"10px",style:{flexWrap:"wrap"}},e.map(((e,t)=>a.createElement(ne,{key:t},e))))}const re=e.div`
  font-size: 1rem;
  font-weight: 500;
`,oe=e.div`
  font-weight: 500;
  font-size: 0.8rem;
  line-height: inherit;
`,ie=e.div`
  font-style: italic;
  font-size: 0.6rem;
`;function ae(e){return a.createElement(a.Fragment,null,a.createElement(A,{jc:"space-between",ai:"flex-end",style:{lineHeight:"initial"}},a.createElement(re,null,e.company.name),a.createElement(ie,null,e.company.years)),a.createElement(A,{jc:"space-between",ai:"flex-end"},a.createElement(oe,null,e.company.role),a.createElement(ie,null,e.company.expYears)))}function ce({items:e}){return a.createElement("ul",{style:{paddingLeft:"16px",marginBottom:"0",fontSize:"0.8rem"}},e.map(((e,t)=>a.createElement("li",{key:t,dangerouslySetInnerHTML:{__html:e}}))))}const se=e(z)`
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
`;function pe({styles:e,companies:t}){return a.createElement(se,{style:e},t.map(((e,t)=>a.createElement(me,{key:t},a.createElement(ae,{company:e}),a.createElement(ce,{items:e.description})))))}const de=e.div`
  font-weight: 500;
  font-size: 0.8rem;
`,ue=e.div`
  font-weight: 400;
  font-size: 0.7rem;
`;function ge({items:e}){return e.map(((e,t)=>a.createElement("div",{key:t},a.createElement(A,{jc:"space-between"},a.createElement(de,null,e.degree),a.createElement("em",null,e.years)),a.createElement(ue,null,e.specialization),a.createElement(A,{jc:"space-between"},a.createElement("div",null,e.institution),a.createElement("em",null,e.grade)))))}function he({items:e}){return a.createElement(ce,{items:e})}const Ee={name:"John Doe",role:"Frontend Developer",mobile:"+91 9876543210",email:"johndoe@email.com",location:"Bengaluru",experience:[{type:"Frontend experience",years:"4 years"},{type:"Total Experience",years:"6 years"}],social:[["linkedin","https://www.linkedin.com/in/johndoe/"],["github","https://github.com/johndoe/"]],photo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZX_8ysYZc9rt-uLU-Q8i28t51DXQMIJ66-A&usqp=CAU",about:{title:"About me",description:"I am a web developer having expertise in frontend development and exposure to back- end development. I design and develop web applications using the latest technologies to deliver the product with quality code.\nI am very good at UI fundamentals & Technologies and can adapt to most of the front-end frameworks quickly."},objective:{title:"Career Objective",description:"Eager to expand my skill set through external trainings to help boost all major front desk KPIs. Hoping to leverage organizational skills to help ABC Corp introduce time-saving schemes for all executives."}},fe={technical:{title:"Technical Expertise",items:[{name:"JavaScript",rating:5},{name:"HTML5",rating:5},{name:"CSS",rating:5},{name:"React",rating:4},{name:"Angular",rating:4}]},exposure:{title:"Skills / Expsoure",items:["Algorithms","Data Structures","SQL","Progressive Web Apps","jQuery","Redux","Firebase"]},methodology:{title:"Methodology / Approach",items:["Component based architecture","Agile methodology","Design Patterns","Test Driven Development","MVC","RESTful architecture"]},tools:{title:"Tools",items:["Git","VS Code","Jira","Webpack","Eclipse","Bitbucket"]}},ye={title:"Experience",companies:[{name:"Dummy Corporation 1",role:"Senior Software Developer",years:"Apr 2021 - present",expYears:"2.5 years",description:["Use my extensive experience with front end development to <u>define the structure and components</u> for the project, making sure they are reusable","Keep the code quality high reviewing code from other developers and suggesting improvements","Interact with the designer to suggest changes and to make sure the view he has about the design is translated into actual functionality","E-commerce maintenance <i>with Fastcommerce</i>, a Brazilian e-commerce platform"]},{name:"Dummy Corporation 2",role:"Software Developer",years:"Jun 2015 - Dec 2017",expYears:"2.5 years",description:["Develop web applications based on Sharepoint, Drupal 8 and Episerver","Lead a team of <strong>10 front end developers</strong>, giving support to the client's multi-cultural team, providing feedback, clarifying requirements and helping with technical questions","Keep the Project Manager and the IT Leads updated on the overall progress of the projects and manage the tasks distributed to the team","Keep the code and the features implemented by the other developers in accordance to the requirements"]},{name:"Dummy Corporation 3",role:"Trainee Developer",years:"Aug 2011 - May 2015",expYears:"1 year",description:["Design easy user interfaces and great user experiences for the digital platforms of small companies","Wordpress development, including themes creation or customization, custom plugins development and training","E-commerce maintenance <i>with Fastcommerce</i>, a Brazilian e-commerce platform","E-commerce development with Magento, customizing preexisting themes ","Integrate external services such as payment services, delivery, etc into Magento solutions","VPS configuration and optimization (Apache & Nginx)"]}]},xe={keyProjects:{title:"Key Projects / Involvements",items:["Prevented millions of dollars in state sales tax undercharges by initiating tests that revealed a bug in a new release of shopping cart software.","Isolated previously undiscovered flaw in price checking tool resulting in more competitive pricing and a 20 percent increase in revenue.","Implemented automated testing tools spawning more diligent levels of regression testing, negative testing, error/bug retests and usability.","Prevented millions of dollars in state sales tax undercharges by initiating tests that revealed a bug in a new release of shopping cart software."]},certificates:{title:"Certificates and Awards",items:["<strong>React</strong> and redux - A complete guide 2020 from Udemy","Agile and Scrum Master Certificate from Udacity","Best performer award for consistently exceeding the performance","Certificate of exceptional bug finder by XYZ client","Recorgnition zero defect delivery","Best performer award for consistently exceeding the performance"]}},be={title:"Education",items:[{institution:"XIV, University",years:"2010 - 2014",grade:"8.3 CGPA",degree:"B.Tech",specialization:"Masters in Cloud Technology"}]},ve=i((e=>({intro:Ee}))),we=i((e=>({experience:ye}))),ke=i((e=>({keyProjects:xe.keyProjects,certificates:xe.certificates}))),Ce=i((e=>({technical:fe.technical,exposure:fe.exposure,methodology:fe.methodology,tools:fe.tools}))),je=i((e=>({education:be}))),Ie=e(G)`
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
`,De=e.span`
  width: 16px;
  height: 8px;
  border-radius: 25%;
  display: inline-block;
  border: 0.5px solid ${e=>e.theme.secondaryColor};
  margin: 0px 4px;
  background-color: ${e=>e.filled?e.theme.secondaryColor:"transparent"};
`;function Pe({itemLabel:e,itemRating:t,index:n}){const l=[];for(let r=1;r<=5;r++)l.push(a.createElement(De,{"data-index":n,"data-rating":r,filled:r<=t,key:r}));return a.createElement(L,null,a.createElement(ze,null,e),l)}function Te({items:e}){return a.createElement(G,{rGap:"8px"},e.map(((e,t)=>a.createElement(Pe,{itemLabel:e.name,itemRating:e.rating,key:e.name,index:t}))))}const Se=e.div`
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
`;function Le({items:e}){return a.createElement(Me,null,e.map(((e,t)=>a.createElement("a",{href:e[1],key:t},N(e[0])," ",a.createElement("span",null,e[1].split("/").slice(-2))))))}const Be=e.div`
  margin: auto;
  display: grid;
  grid-template-columns: 68% 10px 1fr;;
`,Re=e.div`
  height: 100%;
  width: 2px;
  background-color: #007bff;
`,Fe=e.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:first-child{
    padding-right: 10px;
  }
`,qe=e.div`
  margin: 0;
  color: ${e=>e.theme.primaryColor};
  font-size: 1.5rem;
`;const _e=[function(){const e=ve((e=>e.intro)),t=je((e=>e.education)),n=we((e=>e.experience)),[l,r]=ke((e=>[e.keyProjects,e.certificates]),D),[o,i,c,s]=Ce((e=>[e.technical,e.exposure,e.methodology,e.tools]),D),m=[{title:n.title,component:a.createElement(pe,{companies:n.companies}),styles:{flexGrow:1}},{title:l.title,component:a.createElement(he,{items:l.items})},{title:r.title,component:a.createElement(he,{items:r.items})}],p=[{title:e.about.title,component:a.createElement(Z,{photo:e.photo,description:e.about.description})},{title:e.objective.title,component:a.createElement(Z,{description:e.objective.description})},{title:o.title,component:a.createElement(te,{items:o.items})},{title:i.title,component:a.createElement(le,{items:i.items})},{title:c.title,component:a.createElement(le,{items:c.items})},{title:s.title,component:a.createElement(le,{items:s.items})},{title:t.title,component:a.createElement(ge,{items:t.items})}];return a.createElement(a.Fragment,null,a.createElement(Ie,null,a.createElement(K,{title:e.name,icons:e.social},a.createElement(Q,{data:e})),m.map((({title:e,component:t,styles:n})=>a.createElement(Y,{icon:N(e),title:e,styles:n,key:e},t)))),a.createElement($e,null,p.map((({title:e,component:t})=>a.createElement(Y,{icon:N(e),title:e,key:e},t)))))},function(){const e=ve((e=>e.intro)),t=je((e=>e.education)),n=we((e=>e.experience)),[l,r]=ke((e=>[e.keyProjects,e.certificates]),D),[o,i,c,s]=Ce((e=>[e.technical,e.exposure,e.methodology,e.tools]),D);return a.createElement(Be,null,a.createElement(Fe,null,a.createElement(qe,null,e.name),a.createElement(Q,{data:e}),a.createElement(Le,{items:e.social}),a.createElement(Ge,{Icon:N(n.title),title:n.title}),a.createElement(pe,{companies:n.companies}),a.createElement(Se,null),a.createElement(Ge,{Icon:N(l.title),title:l.title}),a.createElement(he,{items:l.items}),a.createElement(Se,null),a.createElement(Ge,{Icon:N(r.title),title:r.title}),a.createElement(he,{items:r.items})),a.createElement(Re,null),a.createElement(Fe,null,a.createElement(Ge,{Icon:N(e.about.title),title:e.about.title}),a.createElement(Z,{description:e.about.description}),a.createElement(Se,null),a.createElement(Ge,{Icon:N(e.objective.title),title:e.objective.title}),a.createElement(Z,{description:e.objective.description}),a.createElement(Se,null),a.createElement(Ge,{Icon:N(o.title),title:o.title}),a.createElement(Te,{items:o.items}),a.createElement(Se,null),a.createElement(Ge,{Icon:N(i.title),title:i.title}),a.createElement(le,{items:i.items}),a.createElement(Se,null),a.createElement(Ge,{Icon:N(c.title),title:c.title}),a.createElement(le,{items:c.items}),a.createElement(Se,null),a.createElement(Ge,{Icon:N(s.title),title:s.title}),a.createElement(le,{items:s.items}),a.createElement(Se,null),a.createElement(Ge,{Icon:N(t.title),title:t.title}),a.createElement(ge,{items:t.items})))}],Ne=i((e=>({template:_e[0],setTemplate:t=>e({template:_e[t]})}))),Ue=i((e=>({isPhotoDisplayed:!0,setIsPhotoDisplayed:t=>e({isPhotoDisplayed:t})})));function Je(){const e=Ne((e=>e.setTemplate)),t=a.createElement("div",null,a.createElement(s,{onClick:()=>e(0)},"0"),a.createElement(s,{onClick:()=>e(1)},"1"));return a.createElement(c,{content:t,title:"Templates",trigger:"click"},a.createElement(s,null,"Templates"))}function Ye(){const e=Ue((e=>e.isPhotoDisplayed)),t=Ue((e=>e.setIsPhotoDisplayed)),n=a.createElement("div",null,"Photo ",a.createElement(P,{checked:e,onChange:t,size:"small"}));return a.createElement(c,{content:n,title:"Items",trigger:"click"},a.createElement(s,null,"Items"))}const Ke=e(M)`
    @media print{
        display: none;
    }
`;function He(){return a.createElement(Ke,null,a.createElement(Je,null),a.createElement(q,null),a.createElement(Ye,null))}const Qe=e(A)`
  width: 210mm;
  height: 297mm;
  border: 1px solid ${e=>e.theme.fontColor};
  margin: auto;
  padding: 40px 25px;
  align-items: flex-start;
  column-gap: 10px;
  color: ${e=>e.theme.fontColor};
  background-color: ${e=>e.theme.backgroundColor};
`;function Ve(){const e=Ne((e=>e.template));return a.createElement(Qe,{className:"resume"},a.createElement(e,null))}function We(){const e=F((e=>e.theme));return a.createElement(a.Fragment,null,a.createElement(He,null),a.createElement(T,{theme:e},a.createElement(Ve,null)))}S.render(a.createElement(a.StrictMode,null,a.createElement(We,null)),document.getElementById("root"));
