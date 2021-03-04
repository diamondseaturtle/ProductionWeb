import React from "react";

export default function GridComponent(props) {
  const { image, header, description } = props;
  return (
    <div className="col-md-4 col-sm-12 p-5">
      <a target="_blank" rel="noopener noreferrer" href={image}>
        <img src={image} alt="Default Grey Box" className="mb-3"/>
      </a>
      <h3>{header}</h3>
      <p>{description}</p>
    </div>
  );
}
