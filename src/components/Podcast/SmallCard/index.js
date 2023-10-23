import React from "react";
import { Link } from "react-router-dom";
import "./smallcardstyles.css";
import {BsPlayCircle} from "react-icons/bs"

function SmallCard({ id, title, displayImage }) {
  return (
    <Link to={`/podcast/${id}`}>
      <div className="podcast-card-smallcard">
        <img className="display-image-podcast-smallcard" src={displayImage} alt={title} />
        <p className="title-podcast-smallcard">{title}</p>
        <BsPlayCircle color="white"/>
        
      </div>
    </Link>
  );
}

export default SmallCard;
