import React from "react";

export default function Education() {
  var style = {
    display: "inline-block",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    position: "absolute",
    backgroundColor: "black",
    top: "-3.5px"
  };

  var styleLeft = {
    ...style,
    left: "-2px"
  };

  var styleRight = {
    ...style,
    right: "-2px"
  };

  var sectionSeperator = {
    width: '80%',
    margin: '18px auto 18px auto',
    height: '3px',
    backgroundColor: 'brown',
    position: 'relative'
  }
  

  return (
    <div style={sectionSeperator}>
      <div style={styleLeft}></div>
      <div style={styleRight}></div>
    </div>
  );
}
