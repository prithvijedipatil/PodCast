import React from "react";
import Header from "./components/common/header/Header";
import CreateAPodcastForm from "./components/CreateAPodcastForm";

function CreateAPodcastPage() {
  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>Create A Podcast</h1>
        <CreateAPodcastForm />
      </div>
    </div>
  );
}

export default CreateAPodcastPage;