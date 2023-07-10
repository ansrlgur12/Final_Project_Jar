import React, { useState } from "react";
import styled from "styled-components";
import Header from "../header";
import { useNavigate, useSearchParams } from 'react-router-dom';
import 검색1header from '../../images/검색1header.jpg';

const SearchStyle = styled.div`
    .totalContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .title {
        font-size: 1.5rem;
    }

    .searchCategory {
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
        width: 100%;
        border-bottom: 1px solid #000;
    }

    .category {
        cursor: pointer;
        font-size: 1.5rem;
        padding: 10px;
        transition: all 0.3s;
    }

    .category:hover {
        background-color: #f1f1f1;
    }

    .selected {
        color: #2E2E2E;
        font-weight: bold;
    }

    .noSelected {
        display: none;
    }

    .category1List,
    .category2List,
    .category3List {
        margin-top: 10px;
        padding: 10px;
    }

    .category1List p,
    .category2List p,
    .category3List p {
        font-size: 1.2rem;
    }
`;

const Search = () => {
    const [searchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState(searchParams.get('query')); 
    const [isSearched, setIsSearched] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };


    const onClickSearch = () => {
        setIsSearched(true);
    }

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
          onClickSearch();
        }
    };

    return(
        <>
        <Header />
        <img
                  src={검색1header}
                  alt="대표이미지"
                  style={{ width: '100%', height: '150px', objectFit: 'cover',
                 }}
                />
        <SearchStyle>
            <div className="totalContainer">
            <div className="title"><h3>통합검색</h3></div>
            <div className={isSearched ? "searchResult" : "noSearched"}>
                <div className="searchCategory">
                    <p className={`category ${selectedCategory === 'category1' ? 'selected' : ''}`} onClick={() => handleCategoryClick('category1')}>캠핑장</p>
                    <p className={`category ${selectedCategory === 'category2' ? 'selected' : ''}`} onClick={() => handleCategoryClick('category2')}>캠핑정보</p>
                    <p className={`category ${selectedCategory === 'category3' ? 'selected' : ''}`} onClick={() => handleCategoryClick('category3')}>쇼핑</p>
                </div>
                <div className={selectedCategory === 'category1' ?  "category1List" : 'noSelected'}>
                    <hr />
                    <p>"category1 검색 결과"</p>
                    {/*  */}
                </div>
                <div className={selectedCategory === 'category2' ?  "category2List" : 'noSelected'}>
                    <hr />
                    <p>"category2 검색 결과"</p>
                    {/* */}
                </div>
                <div className={selectedCategory === 'category3' ?  "category3List" : 'noSelected'}>
                    <hr />
                    <p>"category3 검색 결과"</p>
                    {/*  */}
                </div>
            </div>
            </div>
        </SearchStyle>
        </>
    );
}

export default Search;
