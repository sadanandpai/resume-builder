import{q as e,b as t,l as n,m as r,g as i,r as l,c as o,R as a,P as c,B as s,M as m,a as p,d,A as u,e as g,f as h,S as f,h as E,F as y,i as x,j as b,k as v,n as w,I as k,G as C,o as j,J as I,p as $,T as z,s as T,t as S,u as A}from"./vendor.98bcecc6.js";const D=e.div`
  display: flex;
  justify-content: ${e=>e.jc};
  align-items: ${e=>e.ai};
  row-gap: ${e=>e.rGap};
  column-gap: ${e=>e.cGap};
`,G=e(D)`
  flex-direction: column;
`,P=e(D)`
  justify-content: center;
`,M=e(D)`
  align-items: center;
`,L=e(D)`
  justify-content: center;
  align-items: center;
`,B=[{fontColor:"black",backgroundColor:"white",primaryColor:t.primary,secondaryColor:n[6]},{fontColor:r[8],backgroundColor:"white",primaryColor:n[9],secondaryColor:i.primary},{fontColor:"black",backgroundColor:"white",primaryColor:"green",secondaryColor:l[3]},{fontColor:"white",backgroundColor:"black",primaryColor:"yellow",secondaryColor:"skyblue"}],R=o((e=>({theme:B[0],setTheme:t=>e({theme:B[t]})})));function F(){const e=R((e=>e.setTheme)),t=a.createElement("div",null,a.createElement(s,{onClick:()=>e(0)},"0"),a.createElement(s,{onClick:()=>e(1)},"1"),a.createElement(s,{onClick:()=>e(2)},"2"),a.createElement(s,{onClick:()=>e(3)},"3"));return a.createElement(c,{content:t,title:"Themes",trigger:"click"},a.createElement(s,null,"Themes"))}const q=new Map([["mobile",a.createElement(m,null)],["email",a.createElement(p,null)],["location",a.createElement(d,null)],["github",a.createElement(u,null)],["linkedin",a.createElement(g,null)],["about me",a.createElement(h,null)],["technical expertise",a.createElement(f,null)],["experience",a.createElement(E,null)],["education",a.createElement(y,null)],["tools",a.createElement(x,null)],["key projects / involvements",a.createElement(b,null)],["certificates and awards",a.createElement(v,null)],["career objective",a.createElement(w,null)],["methodology / approach",a.createElement(k,null)],["skills / expsoure",a.createElement(C,null)]]);function _(e){return q.get(e.toLowerCase())}const N=e.div`
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
`,U=e(N)`
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
`;function J(e){return a.createElement(N,{style:e.styles},a.createElement(L,{className:"header",cGap:"5px"},e.icon,a.createElement("div",{className:"header__title"},e.title)),e.children)}function Y(e){return a.createElement(U,{style:e.styles},a.createElement(L,{className:"header"},a.createElement("h1",{className:"header__title"},e.title)),a.createElement(D,{className:"social-icons"},e.icons.map(((e,t)=>a.createElement("a",{href:e[1],key:t},_(e[0]))))),e.children)}const K=e.h3`
  color: ${e=>j(e.theme.primaryColor).alpha(.75).toString()};
  margin-bottom: 0;
  font-weight: 600;
`;function H({data:e}){return a.createElement(D,{jc:"space-between"},a.createElement(G,{rGap:"5px"},a.createElement(K,null,e.role),a.createElement("div",null,e.experience[0].type,": ",a.createElement("strong",null,e.experience[0].years)),a.createElement("div",null,e.experience[1].type,": ",e.experience[1].years)),a.createElement(G,{jc:"flex-end",rGap:"5px"},a.createElement(Q,{icon:_("mobile"),value:e.mobile}),a.createElement(Q,{icon:_("email"),value:e.email}),a.createElement(Q,{icon:_("location"),value:e.location})))}const Q=({icon:e,value:t})=>a.createElement(M,{jc:"flex-end",cGap:"8px"},e,a.createElement("span",null,t)),V=e.img`
  border-radius: 50%;
  height: 60px;
  width: 60px;
  float: left;
  shape-outside: circle();
  margin-right: 20px;
  margin-bottom: 5px;
  border: 0.5px solid ${e=>e.theme.fontColor};
`;function W({icon:e,title:t,description:n,photo:r}){return a.createElement(a.Fragment,null,r&&a.createElement(V,{src:r}),n)}const X=e.div`
  width: 15ch;
  font-weight: 600;
`;const Z=I((function({itemLabel:e,itemRating:t,theme:n}){return a.createElement(M,null,a.createElement(X,null,e),a.createElement($,{percent:20*t,showInfo:!1,strokeColor:n.secondaryColor,size:"small"}))}));function O({items:e}){return a.createElement(G,{rGap:"8px"},e.map(((e,t)=>a.createElement(Z,{itemLabel:e.name,itemRating:e.rating,key:e.name,index:t}))))}const ee=e.span`
  padding: 4px;
  font-size: 98%;
  font-weight: 500;
  border: 1px solid ${e=>e.theme.secondaryColor};
  border-radius: 4px;
`;function te({items:e}){return a.createElement(D,{cGap:"10px",rGap:"10px",style:{flexWrap:"wrap"}},e.map(((e,t)=>a.createElement(ee,{key:t},e))))}const ne=e.div`
  font-size: 1rem;
  font-weight: 500;
`,re=e.div`
  font-weight: 500;
  font-size: 0.8rem;
  line-height: inherit;
`,ie=e.div`
  font-style: italic;
  font-size: 0.6rem;
`;function le(e){return a.createElement(a.Fragment,null,a.createElement(D,{jc:"space-between",ai:"flex-end",style:{lineHeight:"initial"}},a.createElement(ne,null,e.company.name),a.createElement(ie,null,e.company.years)),a.createElement(D,{jc:"space-between",ai:"flex-end"},a.createElement(re,null,e.company.role),a.createElement(ie,null,e.company.expYears)))}function oe({items:e}){return a.createElement("ul",{style:{paddingLeft:"16px",marginBottom:"0",fontSize:"0.8rem"}},e.map(((e,t)=>a.createElement("li",{key:t,dangerouslySetInnerHTML:{__html:e}}))))}const ae=e(z)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  height: 100%;
  padding-top: 15px;
  color: ${e=>e.theme.fontColor};
`,ce=e(ae.Item)`
  padding-bottom: 0;
  flex-grow: 1;
  padding-bottom: 20px;

  :last-child {
    flex-grow: 0;
    padding-bottom: 0;
  }
`;function se({styles:e,companies:t}){return a.createElement(ae,{style:e},t.map(((e,t)=>a.createElement(ce,{key:t},a.createElement(le,{company:e}),a.createElement(oe,{items:e.description})))))}const me=e.div`
  font-weight: 500;
  font-size: 0.8rem;
`,pe=e.div`
  font-weight: 400;
  font-size: 0.7rem;
`;function de({items:e}){return e.map(((e,t)=>a.createElement("div",{key:t},a.createElement(D,{jc:"space-between"},a.createElement(me,null,e.degree),a.createElement("em",null,e.years)),a.createElement(pe,null,e.specialization),a.createElement(D,{jc:"space-between"},a.createElement("div",null,e.institution),a.createElement("em",null,e.grade)))))}function ue({items:e}){return a.createElement(oe,{items:e})}const ge={name:"John Doe",role:"Frontend Developer",mobile:"+91 9876543210",email:"johndoe@email.com",location:"Bengaluru",experience:[{type:"Frontend experience",years:"4 years"},{type:"Total Experience",years:"6 years"}],social:[["linkedin","https://www.linkedin.com/in/johndoe/"],["github","https://github.com/johndoe/"]],photo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZX_8ysYZc9rt-uLU-Q8i28t51DXQMIJ66-A&usqp=CAU",about:{title:"About me",description:"I am a web developer having expertise in frontend development and exposure to back- end development. I design and develop web applications using the latest technologies to deliver the product with quality code.\nI am very good at UI fundamentals & Technologies and can adapt to most of the front-end frameworks quickly."},objective:{title:"Career Objective",description:"Eager to expand my skill set through external trainings to help boost all major front desk KPIs. Hoping to leverage organizational skills to help ABC Corp introduce time-saving schemes for all executives."}},he={technical:{title:"Technical Expertise",items:[{name:"JavaScript",rating:5},{name:"HTML5",rating:5},{name:"CSS",rating:5},{name:"React",rating:4},{name:"Angular",rating:4}]},exposure:{title:"Skills / Expsoure",items:["Algorithms","Data Structures","SQL","Progressive Web Apps","jQuery","Redux","Firebase"]},methodology:{title:"Methodology / Approach",items:["Component based architecture","Agile methodology","Design Patterns","Test Driven Development","MVC","RESTful architecture"]},tools:{title:"Tools",items:["Git","VS Code","Jira","Webpack","Eclipse","Bitbucket"]}},fe={title:"Experience",companies:[{name:"Dummy Corporation 1",role:"Senior Software Developer",years:"Apr 2021 - present",expYears:"2.5 years",description:["Use my extensive experience with front end development to <u>define the structure and components</u> for the project, making sure they are reusable","Keep the code quality high reviewing code from other developers and suggesting improvements","Interact with the designer to suggest changes and to make sure the view he has about the design is translated into actual functionality","E-commerce maintenance <i>with Fastcommerce</i>, a Brazilian e-commerce platform"]},{name:"Dummy Corporation 2",role:"Software Developer",years:"Jun 2015 - Dec 2017",expYears:"2.5 years",description:["Develop web applications based on Sharepoint, Drupal 8 and Episerver","Lead a team of <strong>10 front end developers</strong>, giving support to the client's multi-cultural team, providing feedback, clarifying requirements and helping with technical questions","Keep the Project Manager and the IT Leads updated on the overall progress of the projects and manage the tasks distributed to the team","Keep the code and the features implemented by the other developers in accordance to the requirements"]},{name:"Dummy Corporation 3",role:"Trainee Developer",years:"Aug 2011 - May 2015",expYears:"1 year",description:["Design easy user interfaces and great user experiences for the digital platforms of small companies","Wordpress development, including themes creation or customization, custom plugins development and training","E-commerce maintenance <i>with Fastcommerce</i>, a Brazilian e-commerce platform","E-commerce development with Magento, customizing preexisting themes ","Integrate external services such as payment services, delivery, etc into Magento solutions","VPS configuration and optimization (Apache & Nginx)"]}]},Ee={keyProjects:{title:"Key Projects / Involvements",items:["Prevented millions of dollars in state sales tax undercharges by initiating tests that revealed a bug in a new release of shopping cart software.","Isolated previously undiscovered flaw in price checking tool resulting in more competitive pricing and a 20 percent increase in revenue.","Implemented automated testing tools spawning more diligent levels of regression testing, negative testing, error/bug retests and usability.","Prevented millions of dollars in state sales tax undercharges by initiating tests that revealed a bug in a new release of shopping cart software."]},certificates:{title:"Certificates and Awards",items:["<strong>React</strong> and redux - A complete guide 2020 from Udemy","Agile and Scrum Master Certificate from Udacity","Best performer award for consistently exceeding the performance","Certificate of exceptional bug finder by XYZ client","Recorgnition zero defect delivery","Best performer award for consistently exceeding the performance"]}},ye={title:"Education",items:[{institution:"XIV, University",years:"2010 - 2014",grade:"8.3 CGPA",degree:"B.Tech",specialization:"Masters in Cloud Technology"}]},xe=o((e=>({intro:ge}))),be=o((e=>({experience:fe}))),ve=o((e=>({keyProjects:Ee.keyProjects,certificates:Ee.certificates}))),we=o((e=>({technical:he.technical,exposure:he.exposure,methodology:he.methodology,tools:he.tools}))),ke=o((e=>({education:ye}))),Ce=e(G)`
  flex-basis: 66%;
  row-gap: 20px;
  height: 100%;
`,je=e(G)`
  flex-basis: 34%;
  row-gap: 20px;
  height: 100%;
  justify-content: space-between;
`;const Ie=e.div`
  width: 15ch;
  font-weight: 600;
`,$e=e.span`
  width: 16px;
  height: 8px;
  border-radius: 25%;
  display: inline-block;
  border: 0.5px solid ${e=>e.theme.secondaryColor};
  margin: 0px 4px;
  background-color: ${e=>e.filled?e.theme.secondaryColor:"transparent"};
`;function ze({itemLabel:e,itemRating:t,index:n}){const r=[];for(let i=1;i<=5;i++)r.push(a.createElement($e,{"data-index":n,"data-rating":i,filled:i<=t,key:i}));return a.createElement(M,null,a.createElement(Ie,null,e),r)}function Te({items:e}){return a.createElement(G,{rGap:"8px"},e.map(((e,t)=>a.createElement(ze,{itemLabel:e.name,itemRating:e.rating,key:e.name,index:t}))))}const Se=e.div`
  width: 80%;
  margin: 10px auto 4px auto;
  min-height: 1px;
  background-color: ${e=>e.theme.secondaryColor};
`,Ae=e.div`
  font-size: 0.8rem;
  font-weight: 500;
  color: #007bff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 4px;
  column-gap: 5px;

  svg {
    vertical-align: middle;
  }
`;function De({title:e,Icon:t}){return a.createElement(Ae,null,t,e)}const Ge=e.div`
  padding: 10px;
  border-top: 2px solid #007bff;
  border-bottom: 2px solid #007bff;
  margin: 12px 0px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 0.7rem;

  svg{
    height: 1rem;
    width: 1rem;
    vertical-align: top;
  }
`;function Pe({items:e}){return a.createElement(Ge,null,e.map(((e,t)=>a.createElement("a",{href:e[1],key:t},_(e[0])," ",a.createElement("span",null,e[1].split("/").slice(-2))))))}const Me=e.div`
  margin: auto;
  display: grid;
  grid-template-columns: 68% 10px 1fr;;
`,Le=e.div`
  height: 100%;
  width: 2px;
  background-color: #007bff;
`,Be=e.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:first-child{
    padding-right: 10px;
  }
`,Re=e.div`
  margin: 0;
  color: ${e=>e.theme.primaryColor};
  font-size: 1.5rem;
`;const Fe=[function(){const e=xe((e=>e.intro)),t=ke((e=>e.education)),n=be((e=>e.experience)),[r,i]=ve((e=>[e.keyProjects,e.certificates]),T),[l,o,c,s]=we((e=>[e.technical,e.exposure,e.methodology,e.tools]),T),m=[{title:n.title,component:a.createElement(se,{companies:n.companies}),styles:{flexGrow:1}},{title:r.title,component:a.createElement(ue,{items:r.items})},{title:i.title,component:a.createElement(ue,{items:i.items})}],p=[{title:e.about.title,component:a.createElement(W,{photo:e.photo,description:e.about.description})},{title:e.objective.title,component:a.createElement(W,{description:e.objective.description})},{title:l.title,component:a.createElement(O,{items:l.items})},{title:o.title,component:a.createElement(te,{items:o.items})},{title:c.title,component:a.createElement(te,{items:c.items})},{title:s.title,component:a.createElement(te,{items:s.items})},{title:t.title,component:a.createElement(de,{items:t.items})}];return a.createElement(a.Fragment,null,a.createElement(Ce,null,a.createElement(Y,{title:e.name,icons:e.social},a.createElement(H,{data:e})),m.map((({title:e,component:t,styles:n})=>a.createElement(J,{icon:_(e),title:e,styles:n,key:e},t)))),a.createElement(je,null,p.map((({title:e,component:t})=>a.createElement(J,{icon:_(e),title:e,key:e},t)))))},function(){const e=xe((e=>e.intro)),t=ke((e=>e.education)),n=be((e=>e.experience)),[r,i]=ve((e=>[e.keyProjects,e.certificates]),T),[l,o,c,s]=we((e=>[e.technical,e.exposure,e.methodology,e.tools]),T);return a.createElement(Me,null,a.createElement(Be,null,a.createElement(Re,null,e.name),a.createElement(H,{data:e}),a.createElement(Pe,{items:e.social}),a.createElement(De,{Icon:_(n.title),title:n.title}),a.createElement(se,{companies:n.companies}),a.createElement(Se,null),a.createElement(De,{Icon:_(r.title),title:r.title}),a.createElement(ue,{items:r.items}),a.createElement(Se,null),a.createElement(De,{Icon:_(i.title),title:i.title}),a.createElement(ue,{items:i.items})),a.createElement(Le,null),a.createElement(Be,null,a.createElement(De,{Icon:_(e.about.title),title:e.about.title}),a.createElement(W,{description:e.about.description}),a.createElement(Se,null),a.createElement(De,{Icon:_(e.objective.title),title:e.objective.title}),a.createElement(W,{description:e.objective.description}),a.createElement(Se,null),a.createElement(De,{Icon:_(l.title),title:l.title}),a.createElement(Te,{items:l.items}),a.createElement(Se,null),a.createElement(De,{Icon:_(o.title),title:o.title}),a.createElement(te,{items:o.items}),a.createElement(Se,null),a.createElement(De,{Icon:_(c.title),title:c.title}),a.createElement(te,{items:c.items}),a.createElement(Se,null),a.createElement(De,{Icon:_(s.title),title:s.title}),a.createElement(te,{items:s.items}),a.createElement(Se,null),a.createElement(De,{Icon:_(t.title),title:t.title}),a.createElement(de,{items:t.items})))}],qe=o((e=>({template:Fe[0],setTemplate:t=>e({template:Fe[t]})})));function _e(){const e=qe((e=>e.setTemplate)),t=a.createElement("div",null,a.createElement(s,{onClick:()=>e(0)},"0"),a.createElement(s,{onClick:()=>e(1)},"1"));return a.createElement(c,{content:t,title:"Templates",trigger:"click"},a.createElement(s,null,"Templates"))}const Ne=e(P)`
    @media print{
        display: none;
    }
`;function Ue(){return a.createElement(Ne,null,a.createElement(_e,null),a.createElement(F,null))}const Je=e(D)`
  width: 210mm;
  height: 297mm;
  border: 1px solid ${e=>e.theme.fontColor};
  margin: auto;
  padding: 40px 25px;
  align-items: flex-start;
  column-gap: 10px;
  color: ${e=>e.theme.fontColor};
  background-color: ${e=>e.theme.backgroundColor};
`;function Ye(){const e=qe((e=>e.template));return a.createElement(Je,{className:"resume"},a.createElement(e,null))}function Ke(){const e=R((e=>e.theme));return a.createElement(a.Fragment,null,a.createElement(Ue,null),a.createElement(S,{theme:e},a.createElement(Ye,null)))}A.render(a.createElement(a.StrictMode,null,a.createElement(Ke,null)),document.getElementById("root"));
