import React from "react";
import "./resume.css";

import Separator from "../../atoms/Separator";
import ShortDescription from "../../molecules/ShortDescription";
import ListDescription from "../../molecules/ListDescription";
import RatedDescription from "../../organisms/RatedDescription";
import NonRatedDescription from "../../organisms/NonRatedDescription";
import Education from "../../organisms/Education";
import Introduction from "../../organisms/Introduction";
import Experience from "../../organisms/Experience";

export default function Resume({ data }) {
  return (
    <div className="grid-container">
      <div className="flex-container-column justify-content-between">
        <Introduction name={data.name} role={data.role} personalDetails={data.personal_details} />
        <Experience
          title={data.companyDetails.title}
          companyList={data.companyDetails.companyList}
        />
        <Separator />
        <ListDescription
          title={data.key_projects.title}
          description={data.key_projects.description}
        />
        <Separator />
        <ListDescription
          title={data.certificates.title}
          description={data.certificates.description}
        />
      </div>

      <div className="divider"></div>

      <div className="flex-container-column justify-content-between margin-10-left">
        <ShortDescription
          title={data.summary.title}
          description={data.summary.description}
          icon="summary"
        />
        <Separator />
        <ShortDescription
          title={data.career.title}
          description={data.career.description}
          icon="career"
        />
        <Separator />
        <RatedDescription
          title={data.skills.title}
          description={data.skills.description}
          icon="summary"
        />
        <Separator />
        <NonRatedDescription
          title={data.expertise.title}
          description={data.expertise.description}
          icon="summary"
        />
        <Separator />
        <NonRatedDescription
          title={data.methodology.title}
          description={data.methodology.description}
          icon="summary"
        />
        <Separator />
        <NonRatedDescription
          title={data.tools.title}
          description={data.tools.description}
          icon="summary"
        />
        <Separator />
        <Education
          title={data.education.title}
          description={data.education.description}
          icon="summary"
        />
      </div>
    </div>
  );
}
