import React from "react";
import styled from "styled-components"
import AxiosApi from "../../API/TestAxios";
import { useEffect, useContext, useState } from "react";
import { MarkerContext } from "../../context/MarkerInfo";

const ImageBox = styled.div`

display: flex;
position: relative;
left: 4vw;
background-color: white;
    .imageContainer{
    margin-left: 1em;
    width: 100px;
    height: 10vh;
    background-color: #ccc;
    border-radius: 15px;
    
}
`;

const OjiImageList = () => {

    const context = useContext(MarkerContext);
    const { contentId } = context;
    const [imageUrls, setImageUrls] = useState([]);
  
    useEffect(() => {
      if (contentId === "") {
        return;
      } else {
        const urls = contentId.url ? contentId.url.split(",") : [];
        setImageUrls(urls);
      }
    }, [contentId]);
  
    return (
      <ImageBox>
        {imageUrls.map((imageUrl, index) => (
          <div
            key={index}
            className="imageContainer"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></div>
        ))}
      </ImageBox>
    );
  };
  
  export default OjiImageList;