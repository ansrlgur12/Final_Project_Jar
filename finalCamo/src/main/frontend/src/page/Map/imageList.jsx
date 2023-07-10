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

const ImageList = () => {

    const context = useContext(MarkerContext);
    const {contentId} = context;
    const [imageUrl, setImageUrl] = useState([]);

    useEffect(()=>{
        if(contentId === ""){
            return;
        }else{
            console.log(contentId.contentId);
            const getImageData = async() => {
                const rsp = await AxiosApi.getImage(contentId.contentId);
                if(rsp.status === 200) {
                console.log(rsp.data);
                setImageUrl(rsp.data);
                }
            }
            getImageData();
        }
    },[contentId])
    return(
        <ImageBox>
        {imageUrl && imageUrl.map((image)=>(
            <div key={image.serialnum} className="imageContainer" style={{ backgroundImage: `url(${image.imageUrl})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}></div>
        ))}
        </ImageBox>
    )
}

export default ImageList;