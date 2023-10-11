import React from 'react'
import Input from './common/Input'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import FileInput from './FileInput';
import Button from './common/Button';
import { auth, db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

const CreateAPodcastForm = () => {
    const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlesubmit = async () => {
    if (title && desc && displayImage && bannerImage) {
      setLoading(true);
      // 1. Upload files -> get downloadable links
      try {
        const bannerImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(bannerImageRef, bannerImage);

        const bannerImageUrl = await getDownloadURL(bannerImageRef);

        const displayImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(displayImageRef, displayImage);

        const displayImageUrl = await getDownloadURL(displayImageRef);
        const podcastData = {
          title: title,
          description: desc,
          bannerImage: bannerImageUrl,
          displayImage: displayImageUrl,
          createdBy: auth.currentUser.uid,
        };

        const docRef = await addDoc(collection(db, "podcasts"), podcastData);
        setTitle("");
        setDesc("");
        setBannerImage(null);
        setDisplayImage(null);
        toast.success("Podcast Created!");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        console.log(e);
        setLoading(false);
      }

      navigate("/podcasts");
      // 2. create a new doc iin a new collection called podcasts
      // 3. save this new podcast episodes states in our podcasts
    } else {
      toast.error("Please Enter All Values");
      setLoading(false);
    }
  };

  const displayImageHandle = (file) => {
    setDisplayImage(file);
  };

  const bannerImageHandle = (file) => {
    setBannerImage(file);
  };

  return (
    <>
    <Input
      state={title}
      setState={setTitle}
      placeholder="Title"
      type="text"
      required={true}
    />
    <Input
      state={desc}
      setState={setDesc}
      placeholder="Description"
      type="text"
      required={true}
    />
    <FileInput
      accept={"image/*"}
      id="display-image-input"
      fileHandleFnc={displayImageHandle}
      text={"Display Image Upload"}
    />

    <FileInput
      accept={"image/*"}
      id="banner-image-input"
      fileHandleFnc={bannerImageHandle}
      text={"Banner Image Upload"}
    />

    <Button
      text={loading ? "Loading..." : "Create Podcast"}
      disabled={loading}
      onClick={handlesubmit}
    />
  </>
  )
}

export default CreateAPodcastForm