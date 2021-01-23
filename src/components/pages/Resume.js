import React from "react";
import ResumeTemplate from "../templates/ResumeTemplate";
import data from "../../data.json";

export default function Resume() {
  return <ResumeTemplate data={data} />;
}
