import React from "react";
import { styled } from "styled-components";
import itemp1 from "../images/itemp1.jpg";
import itemp2 from "../images/itemp2.jpg";
import itemp3 from "../images/itemp3.jpg";

const Section2 = styled.div`
    margin-top: 40px;
    align-items: center;
    display: flex;
    justify-content: center;
    
    .container2{
        width: 90vw;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
    }

    .item{
        margin: 0;
        padding: 0;
        cursor: pointer;
        position: relative;
    }

    .item:hover {
        background-color: black;
    }

    .item:hover::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 1;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }

    .item:hover .itemtext,
    .item:hover .itemBtn {
        transform: translateY(-20px);
        opacity: 1;
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    }

    .item1{
        width: 38vw;
        height: 500px;
        margin-right: 2vw;
        background-image: url(${itemp1});
        background-size: cover;
        background-repeat: no-repeat;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .item2{
        width: 50vw;
        background-image: url(${itemp2});
        background-size: cover;
        background-repeat: no-repeat;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .item3{
        width: 100vw;
        height: 500px;
        margin-top: 4vh;
        background-image: url(${itemp3});
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .itemtext {
        color: white;
        font-size: 2rem;
        margin-left: 40px;
        transform: translateY(20px);
        opacity: 0;
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    }

    .itemBtn {
        width: 100px;
        font-size: 1.2rem;
        margin: 10px 0 0 40px;
        transform: translateY(20px);
        opacity: 0;
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    }
`;

const MainSection2 = () => {
    return (
        <Section2>
            <div className="container2">
                <div className="item item1">
                    <div className="itemtext">무료로 이용할 수 있는<br /> 캠핑장을 공유해주세요!</div>
                    <button className="itemBtn">이동하기</button>
                </div>
                <div className="item item2">
                    <div className="itemtext">인기 제품을 만나러 가요!</div>
                    <button className="itemBtn">shop</button>
                </div>
                <div className="item item3">
                    <div className="itemtext">캠퍼들의 인기 캠핑장을 확인해 보세요!</div>
                    <button className="itemBtn">이동하기</button>
                </div>
            </div>
        </Section2>
    );
};

export default MainSection2;
