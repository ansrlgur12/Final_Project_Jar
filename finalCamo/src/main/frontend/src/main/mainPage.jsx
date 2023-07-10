import React, { useState, useEffect, useContext } from 'react';
import styled from "styled-components";
import MainSection1 from './mainSection1';
import Header from './header';
import { UserContext } from '../API/UserInfo';
import { useNavigate } from 'react-router-dom';
import MainSection3 from './mainSection3';
import Footer from './footer';
import MainSection2 from './mainSection2';
import CampCard from './CampCard';


export const MainPageStyle = styled.div`

`;


const MainPage = () => {
    const context = useContext(UserContext);
    const { isLogin } = context;
    const nav = useNavigate();

    useEffect( () => {
        // if(!isLogin) {
        //     nav('/intro');
        // }
    }, [isLogin, nav]);
   
    return (
        <>
            <MainPageStyle>
                <Header/>
                <MainSection1/>
                <MainSection2/>
                <MainSection3/>
                <Footer />
            </MainPageStyle>

        </>
    );
};

export default MainPage;
