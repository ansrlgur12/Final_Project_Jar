import React, {useState,useEffect, useCallback,useContext} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import{Keyboard,  Navigation, Pagination } from "swiper";
import { Tooltip } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../API/TestAxios";
import { useCart } from "../../context/CartContext";
import { useFavorite } from "../../context/FavoriteContext";
import FavoriteButton from "../../Commons/Buttons/favoriteButton";
import CartButton from "../../Commons/Buttons/cartButton";
import ArrowButton from "../../Commons/Buttons/arrowButton";
import Skeleton from "@mui/material/Skeleton";
import FavoriteButtonBorder from "../../Commons/Buttons/favoriteButtonBorder";
import { UserContext } from "../../API/UserInfo";


export const SwiperStyle = styled.div`


.swiper {
    width: 840px;
    height: 400px;
    padding-top: 50px;
    padding-bottom: 50px;
    border:none;

  }
  .swiper-slide{
    position: relative;
    background-position: center;
    background-size: cover;
    width: 200px;
    height: 200px;
    border: none;
  }
  .swiper-slide:before{
    content:"";
  position:absolute;
  width:100%;
  height:100%;
  
  background-color:rgba(0,0,0,0);
  }
  .swiper-slide:hover::before {
  
    border-radius: 8px;
  background-color:#ede5e5;
  opacity: 0.8;
    
    transition: all 0.4s ease-out;
}
  .swiper-slide:hover button{
  display: block;
}
  
  .swiper-slide button{
    position:absolute;
  transform: translate(-50%, -50%);
  display: none;
  }
  .swiper-slide button.btn{
    top:50%;
    right:50%;
  }
  .swiper-slide button.btn2{
    top:50%;
    right:10%;
    
  }
  .swiper-slide button.btn3{
    top:88%;
    right:-5%;
  }  
  .swiper-slide img{
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 1px 1px 1px #ccc;
    border: 1px solid #ccc;
     
  }
  
  .swiper-scrollbar{
    display: none;

  }
  .swiper-pagination-bullet{
    display: none;
  }
  .swiper-button-prev,
.swiper-button-next {
  background-color: #fff;
  opacity: 0.5;
  padding: 15px 3px;
  border-radius: 20px;
  color: black !important;
  margin-top:-130px;
  

}
.swiper-button-prev:after,
.swiper-button-next:after {
  font-size: 1.1rem !important;
  font-weight: 600 !important;
  margin-bottom: 10px;
}
  
 .brand{
  font-size: 0.5rem;
 } 
 .name{
  width:246px;
  height:35px;
  font-size: 0.8rem;
 }
 .price{
  font-size: 1rem;
  display: flex;
  justify-content: end;
  font-weight: bold;
 }
 .ModalWrapper{
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
 }

.modalBox{
  z-index: 1001;
  background-color: white;
  display: flex; 
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  width: 400px;
  height: 200px;
}

.ModalBackground{
  position: fixed;
  z-index: 999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.isOpen ? 'block' : 'none'};
}




 
 
  
  
  
  
 

`




const SliderContainer = ({ selectedCategory}) => {
   // 컴포넌트의 상단에 useState를 추가하여 로딩 상태를 관리합니다.
    const [products, setProducts] = useState([]);
    const nav = useNavigate();
    const [loading, setLoading] = useState(false);
    const [productCache, setProductCache] = useState({});
    
  

    const fetchProducts = useCallback(async () => {
      try {
        setLoading(true);
        if (productCache[selectedCategory]) {
          // 캐시에 데이터가 있으면 캐시의 데이터를 사용
          setProducts(productCache[selectedCategory]);
        } else {
          // 캐시에 데이터가 없으면 새로 요청
          const response = await AxiosApi.getItemList();
          if (response.status === 200) {
            setProducts(response.data);
            setProductCache({
              ...productCache,
              [selectedCategory]: response.data
            });
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, [selectedCategory, productCache]);
    
    // selectedCategory가 변경될 때마다 아이템 데이터를 가져옵니다.
    useEffect(() => {
      fetchProducts();
    }, [fetchProducts]);










     const IconButtons = ({productId,product}) =>{
      const { addToCart } = useCart(); // CartContext를 사용해서 addToCart 함수를 가져옴
      const { userEmail } = useContext(UserContext);
      const { addToFavorite,isProductInFavorite} = useFavorite(); // FavoriteContext를 사용해서 addToFavorite 함수를 가져옴
      const [tooltipCart, setTooltipCart] = useState('장바구니 담기');
      const [tooltipFavorite, setTooltipFavorite] = useState('찜하기')
      // 좋아요 서버구현 전까지 쓸 useState
  const [likeClicked, setLikeClicked]= useState(false);


 

    const handleAddToCart = async () => {
      try {
        console.log(product.id, userEmail);
        const response = await AxiosApi.addToCart(product.id, 1, userEmail);
        
        if(response.status === 200) {
          console.log('성공');
          
        
        // Context에 아이템 추가
        addToCart(product, 1); 
        setTooltipCart('장바구니에 담겼어요!');
        setTimeout(() => {
            setTooltipCart('장바구니 담기');
        }, 2000);  // 2초 후에 다시 '장바구니 담기'로 바뀜
        } else {
          console.log('오류'); 
        }
      } catch(error) {
        console.error( error);
      }
    };
    const handleAddToFavorite = async () => {
      try {
          console.log(product.id, userEmail);
          const response = await AxiosApi.addToFavorite(product.id,userEmail);
  
          if(response.status === 200) {
              console.log('성공');
              addToFavorite(product);
              setLikeClicked(true);
              setTooltipFavorite('찜 완료!');
          } else {
              console.log('오류'); 
              setTooltipFavorite('이미 찜하셨어요!');
          }
  
      } catch(error) {
          console.error(error);
      }
  
      setTimeout(() => {
          setTooltipFavorite('찜하기');
      }, 2000); // 2초 후에 다시 '찜하기'로 바뀜
  };
useEffect(() => {
  // 페이지 로딩시에 해당 상품이 찜 목록에 있는지 확인
  setLikeClicked(isProductInFavorite(product));
}, []);
   
  
    return(
      <>
      
     <Tooltip title={tooltipFavorite}>
     {likeClicked ?  <FavoriteButton className="btn" onClick={handleAddToFavorite}/> : <FavoriteButtonBorder className="btn" onClick={handleAddToFavorite} />}
  
  </Tooltip>
  <Tooltip title={tooltipCart}>
    <CartButton  className="btn2" onClick={handleAddToCart}/>
</Tooltip>

<Tooltip title="구매 페이지 이동" placement="top">
  <ArrowButton className="btn3" onClick={()=>nav(`/ProductDetailForm/${productId}`)}/>
</Tooltip>
</>
  )

  }
  return (
    
    <SwiperStyle>
      {(selectedCategory === '텐트' || !selectedCategory) &&
   <div className="tentCategory">
    <div className="cardSlide">
    <h3 className="cartegory4Name">1-2인용 텐트 </h3>
    <Swiper
      loop ={true}
      
      modules={[Navigation, Pagination, Keyboard]}
      spaceBetween={30}
      slidesPerView={3}
      navigation
      keyboard={{enable:true}}
      
      scrollbar={{ draggable: true }}
    >
      {
    loading ? // 로딩 상태에 따라서 Skeleton 혹은 실제 데이터를 보여줌
      Array.from(new Array(3)).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton variant="rectangular" animation="wave" width={260} height={200} />
        </SwiperSlide>
      ))
    : 
      products.filter(product => product.category4Name === '1-2인용').map(product => (
        <SwiperSlide key={product.id}>
          <img src={product.imageUrl} alt="" />
          <IconButtons product={product} productId={product.id}/>
          <div className="title">
            <div className="brand">{product.brand || 'brand'}</div>
            <div className="name">{product.productName}</div>
            <span className="price">{new Intl.NumberFormat('ko-KR').format(product.price) + "원"}</span>
          </div>
        </SwiperSlide>
      ))
  }
</Swiper>
    
    </div>
     <div className="cardSlide">
     <h3 className="cartegory4Name">3-4인용 텐트</h3>
     <Swiper
       loop ={true}
       
       modules={[Navigation, Pagination, Keyboard]}
       spaceBetween={30}
       slidesPerView={3}
       navigation
       keyboard={{enable:true}}
       
       scrollbar={{ draggable: true }}
     >
       
         {
    loading ? // 로딩 상태에 따라서 Skeleton 혹은 실제 데이터를 보여줌
      Array.from(new Array(3)).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton variant="rectangular" animation="wave" width={260} height={200} />
        </SwiperSlide>
      ))
    : products.filter(product => product.category4Name === '3-4인용').map(product => (
       <SwiperSlide key={product.id}> <img src={product.imageUrl} alt="" /><IconButtons product={product} productId={product.id}/><div className="title"><p className="brand">{product.brand || 'brand'}</p><div className="name">{product.productName}</div><span className="price">{new Intl.NumberFormat('ko-KR').format(product.price) + "원"}</span></div></SwiperSlide>
       ))}
       
     
  
     </Swiper>
     
     </div>
     <div className="cardSlide">
     <h3 className="cartegory4Name">5-6인용 텐트</h3>
     <Swiper
       loop ={true}
       
       modules={[Navigation, Pagination,Keyboard ]}
       spaceBetween={30}
       slidesPerView={3}
       navigation
       keyboard={{
        enabled: true,
      }}
       
       scrollbar={{ draggable: true }}
     >
       
         {
    loading ? // 로딩 상태에 따라서 Skeleton 혹은 실제 데이터를 보여줌
      Array.from(new Array(3)).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton variant="rectangular" animation="wave" width={260} height={200} />
        </SwiperSlide>
      ))
    : products.filter(product => product.category4Name === '5-6인용').map(product => (
       <SwiperSlide key={product.id}> <img src={product.imageUrl} alt="" /><IconButtons product={product} productId={product.id}/><div className="title"><p className="brand">{product.brand || 'brand'}</p><div className="name">{product.productName}</div><span className="price">{new Intl.NumberFormat('ko-KR').format(product.price) + "원"}</span></div></SwiperSlide>
       ))}
       
     
  
     </Swiper>
     </div>
     </div>
    }
     {selectedCategory === '취침장비' && 
     <div className="bedCategory">
    <div className="cardSlide">
    <h3 className="cartegory4Name">침낭</h3>
    <Swiper
      loop ={true}
      
      modules={[Navigation, Pagination, Keyboard]}
      spaceBetween={30}
      slidesPerView={3}
      navigation
      keyboard={{enable:true}}
      
      scrollbar={{ draggable: true }}
    >
         {
    loading ? // 로딩 상태에 따라서 Skeleton 혹은 실제 데이터를 보여줌
      Array.from(new Array(3)).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton variant="rectangular" animation="wave" width={260} height={200} />
        </SwiperSlide>
      ))
    : products.filter(product => product.category4Name === '침낭').map(product => (
       <SwiperSlide key={product.id}> <img src={product.imageUrl} alt="" /><IconButtons product={product} productId={product.id}/><div className="title"><p className="brand">{product.brand || 'brand'}</p><div className="name">{product.productName}</div><span className="price">{new Intl.NumberFormat('ko-KR').format(product.price) + "원"}</span></div></SwiperSlide>
       ))}
    
 
    </Swiper>
    
    </div>
     <div className="cardSlide">
     <h3 className="cartegory4Name">매트</h3>
     <Swiper
       loop ={true}
       
       modules={[Navigation, Pagination, Keyboard]}
       spaceBetween={30}
       slidesPerView={3}
       navigation
       keyboard={{enable:true}}
       
       scrollbar={{ draggable: true }}
     >
       
         {
    loading ? // 로딩 상태에 따라서 Skeleton 혹은 실제 데이터를 보여줌
      Array.from(new Array(3)).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton variant="rectangular" animation="wave" width={260} height={200} />
        </SwiperSlide>
      ))
    : products.filter(product => product.category4Name === '매트').map(product => (
       <SwiperSlide key={product.id}> <img src={product.imageUrl} alt="" /><IconButtons product={product} productId={product.id}/><div className="title"><p className="brand">{product.brand || 'brand'}</p><div className="name">{product.productName}</div><span className="price">{new Intl.NumberFormat('ko-KR').format(product.price) + "원"}</span></div></SwiperSlide>
       ))}
     
  
     </Swiper>
     
     </div>
     <div className="cardSlide">
     <h3 className="cartegory4Name">야전침대</h3>
     <Swiper
       loop ={true}
       
       modules={[Navigation, Pagination,Keyboard ]}
       spaceBetween={30}
       slidesPerView={3}
       navigation
       keyboard={{
        enabled: true,
      }}
       
       scrollbar={{ draggable: true }}
     >
       
         {
    loading ? // 로딩 상태에 따라서 Skeleton 혹은 실제 데이터를 보여줌
      Array.from(new Array(3)).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton variant="rectangular" animation="wave" width={260} height={200} />
        </SwiperSlide>
      ))
    : products.filter(product => product.category4Name === '야전침대').map(product => (
       <SwiperSlide key={product.id}> <img src={product.imageUrl} alt="" /><IconButtons product={product} productId={product.id}/><div className="title"><p className="brand">{product.brand || 'brand'}</p><div className="name">{product.productName}</div><span className="price">{new Intl.NumberFormat('ko-KR').format(product.price) + "원"}</span></div></SwiperSlide>
       ))}
     
  
     </Swiper>
     </div>
     </div>
}
{selectedCategory === '라이트' && 
   <div className="tentCategory">
    <div className="cardSlide">
    <h3 className="cartegory4Name">가스랜턴</h3>
    <Swiper
      loop ={true}
      
      modules={[Navigation, Pagination, Keyboard]}
      spaceBetween={30}
      slidesPerView={3}
      navigation
      keyboard={{enable:true}}
      
      scrollbar={{ draggable: true }}
    >
      
        {
    loading ? // 로딩 상태에 따라서 Skeleton 혹은 실제 데이터를 보여줌
      Array.from(new Array(3)).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton variant="rectangular" animation="wave" width={260} height={200} />
        </SwiperSlide>
      ))
    : products.filter(product => product.category4Name === '가스랜턴').map(product => (
       <SwiperSlide key={product.id}> <img src={product.imageUrl} alt="" /><IconButtons product={product} productId={product.id}/><div className="title"><p className="brand">{product.brand || 'brand'}</p><div className="name">{product.productName}</div><span className="price">{new Intl.NumberFormat('ko-KR').format(product.price) + "원"}</span></div></SwiperSlide>
       ))}
    
 
    </Swiper>
    
    </div>
     <div className="cardSlide">
     <h3 className="cartegory4Name">LED랜턴</h3>
     <Swiper
       loop ={true}
       
       modules={[Navigation, Pagination, Keyboard]}
       spaceBetween={30}
       slidesPerView={3}
       navigation
       keyboard={{enable:true}}
       
       scrollbar={{ draggable: true }}
     >
       
         {
    loading ? // 로딩 상태에 따라서 Skeleton 혹은 실제 데이터를 보여줌
      Array.from(new Array(3)).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton variant="rectangular" animation="wave" width={260} height={200} />
        </SwiperSlide>
      ))
    : products.filter(product => product.category4Name === 'led랜턴').map(product => (
       <SwiperSlide key={product.id}> <img src={product.imageUrl} alt="" /><IconButtons product={product} productId={product.id}/><div className="title"><p className="brand">{product.brand || 'brand'}</p><div className="name">{product.productName}</div><span className="price">{new Intl.NumberFormat('ko-KR').format(product.price) + "원"}</span></div></SwiperSlide>
       ))}
     
  
     </Swiper>
     
     </div>
     <div className="cardSlide">
     <h3 className="cartegory4Name">손전등</h3>
     <Swiper
       loop ={true}
       
       modules={[Navigation, Pagination,Keyboard ]}
       spaceBetween={30}
       slidesPerView={3}
       navigation
       keyboard={{
        enabled: true,
      }}
       
       scrollbar={{ draggable: true }}
     >
       
         {
    loading ? // 로딩 상태에 따라서 Skeleton 혹은 실제 데이터를 보여줌
      Array.from(new Array(3)).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton variant="rectangular" animation="wave" width={260} height={200} />
        </SwiperSlide>
      ))
    : products.filter(product => product.category4Name === '손전등').map(product => (
       <SwiperSlide key={product.id}> <img src={product.imageUrl} alt="" /><IconButtons product={product} productId={product.id}/><div className="title"><p className="brand">{product.brand || 'brand'}</p><div className="name">{product.productName}</div><span className="price">{new Intl.NumberFormat('ko-KR').format(product.price) + "원"}</span></div></SwiperSlide>
       ))}
     
  
     </Swiper>
     </div>
     </div>
    }
     {selectedCategory === '키친' && 
   <div className="tentCategory">
    <div className="cardSlide">
    <h3 className="cartegory4Name">후라이팬</h3>
    <Swiper
      loop ={true}
      
      modules={[Navigation, Pagination, Keyboard]}
      spaceBetween={30}
      slidesPerView={3}
      navigation
      keyboard={{enable:true}}
      
      scrollbar={{ draggable: true }}
    >
         {
    loading ? // 로딩 상태에 따라서 Skeleton 혹은 실제 데이터를 보여줌
      Array.from(new Array(3)).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton variant="rectangular" animation="wave" width={260} height={200} />
        </SwiperSlide>
      ))
    : products.filter(product => product.category4Name === '후라이팬').map(product => (
       <SwiperSlide key={product.id}> <img src={product.imageUrl} alt="" /><IconButtons product={product} productId={product.id}/><div className="title"><p className="brand">{product.brand || 'brand'}</p><div className="name">{product.productName}</div><span className="price">{new Intl.NumberFormat('ko-KR').format(product.price) + "원"}</span></div></SwiperSlide>
       ))}
    
 
    </Swiper>
    
    </div>
     <div className="cardSlide">
     <h3 className="cartegory4Name">조리도구</h3>
     <Swiper
       loop ={true}
       
       modules={[Navigation, Pagination, Keyboard]}
       spaceBetween={30}
       slidesPerView={3}
       navigation
       keyboard={{enable:true}}
       
       scrollbar={{ draggable: true }}
     >
       
         {
    loading ? // 로딩 상태에 따라서 Skeleton 혹은 실제 데이터를 보여줌
      Array.from(new Array(3)).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton variant="rectangular" animation="wave" width={260} height={200} />
        </SwiperSlide>
      ))
    : products.filter(product => product.category4Name === '조리도구').map(product => (
       <SwiperSlide key={product.id}> <img src={product.imageUrl} alt="" /><IconButtons product={product} productId={product.id}/><div className="title"><p className="brand">{product.brand || 'brand'}</p><div className="name">{product.productName}</div><span className="price">{new Intl.NumberFormat('ko-KR').format(product.price) + "원"}</span></div></SwiperSlide>
       ))}
     
  
     </Swiper>
     
     </div>
     <div className="cardSlide">
     <h3 className="cartegory4Name">주전자</h3>
     <Swiper
       loop ={true}
       
       modules={[Navigation, Pagination,Keyboard ]}
       spaceBetween={30}
       slidesPerView={3}
       navigation
       keyboard={{
        enabled: true,
      }}
       
       scrollbar={{ draggable: true }}
     >
       
         {
    loading ? // 로딩 상태에 따라서 Skeleton 혹은 실제 데이터를 보여줌
      Array.from(new Array(3)).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton variant="rectangular" animation="wave" width={260} height={200} />
        </SwiperSlide>
      ))
    : products.filter(product => product.category4Name === '주전자').map(product => (
       <SwiperSlide key={product.id}> <img src={product.imageUrl} alt="" /><IconButtons product={product} productId={product.id}/><div className="title"><p className="brand">{product.brand || 'brand'}</p><div className="name">{product.productName}</div><span className="price">{new Intl.NumberFormat('ko-KR').format(product.price) + "원"}</span></div></SwiperSlide>
       ))}
     
  
     </Swiper>
     </div>
     </div>
    }
     {selectedCategory === '캠핑가구' && 
   <div className="tentCategory">
    <div className="cardSlide">
    <h3 className="cartegory4Name">캠핑 의자</h3>
    <Swiper
      loop ={true}
      
      modules={[Navigation, Pagination, Keyboard]}
      spaceBetween={30}
      slidesPerView={3}
      navigation
      keyboard={{enable:true}}
      
      scrollbar={{ draggable: true }}
    >
      
        {
    loading ? // 로딩 상태에 따라서 Skeleton 혹은 실제 데이터를 보여줌
      Array.from(new Array(3)).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton variant="rectangular" animation="wave" width={260} height={200} />
        </SwiperSlide>
      ))
    : products.filter(product => product.category4Name === '캠핑의자').map(product => (
       <SwiperSlide key={product.id}> <img src={product.imageUrl} alt="" /><IconButtons product={product} productId={product.id}/><div className="title"><p className="brand">{product.brand || 'brand'}</p><div className="name">{product.productName}</div><span className="price">{new Intl.NumberFormat('ko-KR').format(product.price) + "원"}</span></div></SwiperSlide>
       ))}
    
 
    </Swiper>
    
    </div>
     <div className="cardSlide">
     <h3 className="cartegory4Name">캠핑 테이블</h3>
     <Swiper
       loop ={true}
       
       modules={[Navigation, Pagination, Keyboard]}
       spaceBetween={30}
       slidesPerView={3}
       navigation
       keyboard={{enable:true}}
       
       scrollbar={{ draggable: true }}
     >
       
         {
    loading ? // 로딩 상태에 따라서 Skeleton 혹은 실제 데이터를 보여줌
      Array.from(new Array(3)).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton variant="rectangular" animation="wave" width={260} height={200} />
        </SwiperSlide>
      ))
    : products.filter(product => product.category4Name === '캠핑테이블').map(product => (
       <SwiperSlide key={product.id}> <img src={product.imageUrl} alt="" /><IconButtons product={product} productId={product.id}/><div className="title"><p className="brand">{product.brand || 'brand'}</p><div className="name">{product.productName}</div><span className="price">{new Intl.NumberFormat('ko-KR').format(product.price) + "원"}</span></div></SwiperSlide>
       ))}
  
     </Swiper>
     
     </div>
     <div className="cardSlide">
     <h3 className="cartegory4Name">캠핑박스</h3>
     <Swiper
       loop ={true}
       
       modules={[Navigation, Pagination,Keyboard ]}
       spaceBetween={30}
       slidesPerView={3}
       navigation
       keyboard={{
        enabled: true,
      }}
       
       scrollbar={{ draggable: true }}
     >
       
         {
    loading ? // 로딩 상태에 따라서 Skeleton 혹은 실제 데이터를 보여줌
      Array.from(new Array(3)).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton variant="rectangular" animation="wave" width={260} height={200} />
        </SwiperSlide>
      ))
    : products.filter(product => product.category4Name === '캠핑박스').map(product => (
       <SwiperSlide key={product.id}> <img src={product.imageUrl} alt="" /><IconButtons product={product} productId={product.id}/><div className="title"><p className="brand">{product.brand || 'brand'}</p><div className="name">{product.productName}</div><span className="price">{new Intl.NumberFormat('ko-KR').format(product.price) + "원"}</span></div></SwiperSlide>
       ))}
     
  
     </Swiper>
     </div>
     </div>
    }
     {selectedCategory === '수납용품' && 
   <div className="tentCategory">
    <div className="cardSlide">
    <h3 className="cartegory4Name">웨건</h3>
    <Swiper
      loop ={true}
      
      modules={[Navigation, Pagination, Keyboard]}
      spaceBetween={30}
      slidesPerView={3}
      navigation
      keyboard={{enable:true}}
      
      scrollbar={{ draggable: true }}
    >
      
        {
    loading ? // 로딩 상태에 따라서 Skeleton 혹은 실제 데이터를 보여줌
      Array.from(new Array(3)).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton variant="rectangular" animation="wave" width={260} height={200} />
        </SwiperSlide>
      ))
    : products.filter(product => product.category4Name === '웨건').map(product => (
       <SwiperSlide key={product.id}> <img src={product.imageUrl} alt="" /><IconButtons product={product} productId={product.id}/><div className="title"><p className="brand">{product.brand || 'brand'}</p><div className="name">{product.productName}</div><span className="price">{new Intl.NumberFormat('ko-KR').format(product.price) + "원"}</span></div></SwiperSlide>
       ))}
    
 
    </Swiper>
    
    </div>
     <div className="cardSlide">
     <h3 className="cartegory4Name">루프백</h3>
     <Swiper
       loop ={true}
       
       modules={[Navigation, Pagination, Keyboard]}
       spaceBetween={30}
       slidesPerView={3}
       navigation
       keyboard={{enable:true}}
       
       scrollbar={{ draggable: true }}
     >
       
         {
    loading ? // 로딩 상태에 따라서 Skeleton 혹은 실제 데이터를 보여줌
      Array.from(new Array(3)).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton variant="rectangular" animation="wave" width={260} height={200} />
        </SwiperSlide>
      ))
    : products.filter(product => product.category4Name === '루프백').map(product => (
       <SwiperSlide key={product.id}> <img src={product.imageUrl} alt="" /><IconButtons product={product} productId={product.id}/><div className="title"><p className="brand">{product.brand || 'brand'}</p><div className="name">{product.productName}</div><span className="price">{new Intl.NumberFormat('ko-KR').format(product.price) + "원"}</span></div></SwiperSlide>
       ))}
     </Swiper>
     
     </div>
     <div className="cardSlide">
     <h3 className="cartegory4Name">토일레트리</h3>
     <Swiper
       loop ={true}
       
       modules={[Navigation, Pagination,Keyboard ]}
       spaceBetween={30}
       slidesPerView={3}
       navigation
       keyboard={{
        enabled: true,
      }}
       
       scrollbar={{ draggable: true }}
     >   {
    loading ? // 로딩 상태에 따라서 Skeleton 혹은 실제 데이터를 보여줌
      Array.from(new Array(3)).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton variant="rectangular" animation="wave" width={260} height={200} />
        </SwiperSlide>
      ))
    : products.filter(product => product.category4Name === '토일레트리').map(product => (
      <SwiperSlide key={product.id}> <img src={product.imageUrl} alt="" /><IconButtons product={product} productId={product.id}/><div className="title"><p className="brand">{product.brand || 'brand'}</p><div className="name">{product.productName}</div><span className="price">{new Intl.NumberFormat('ko-KR').format(product.price) + "원"}</span></div></SwiperSlide>
      ))}
     
  
     </Swiper>
     </div>
     </div>
    }
     {selectedCategory === '공구' && 
   <div className="tentCategory">
    <div className="cardSlide">
    <h3 className="cartegory4Name">멀티백</h3>
    <Swiper
      loop ={true}
      
      modules={[Navigation, Pagination, Keyboard]}
      spaceBetween={30}
      slidesPerView={3}
      navigation
      keyboard={{enable:true}}
      
      scrollbar={{ draggable: true }}
    >
         {
    loading ? // 로딩 상태에 따라서 Skeleton 혹은 실제 데이터를 보여줌
      Array.from(new Array(3)).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton variant="rectangular" animation="wave" width={260} height={200} />
        </SwiperSlide>
      ))
    : products.filter(product => product.category4Name === '멀티백').map(product => (
       <SwiperSlide key={product.id}> <img src={product.imageUrl} alt="" /><IconButtons product={product} productId={product.id}/><div className="title"><p className="brand">{product.brand || 'brand'}</p><div className="name">{product.productName}</div><span className="price">{new Intl.NumberFormat('ko-KR').format(product.price) + "원"}</span></div></SwiperSlide>
       ))}
    
 
    </Swiper>
    
    </div>
     <div className="cardSlide">
     <h3 className="cartegory4Name">팩 망치</h3>
     <Swiper
       loop ={true}
       
       modules={[Navigation, Pagination, Keyboard]}
       spaceBetween={30}
       slidesPerView={3}
       navigation
       keyboard={{enable:true}}
       
       scrollbar={{ draggable: true }}
     >
      {
    loading ? // 로딩 상태에 따라서 Skeleton 혹은 실제 데이터를 보여줌
      Array.from(new Array(3)).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton variant="rectangular" animation="wave" width={260} height={200} />
        </SwiperSlide>
      ))
    : products.filter(product => product.category4Name === '팩망치').map(product => (
       <SwiperSlide key={product.id}> <img src={product.imageUrl} alt="" /><IconButtons product={product} productId={product.id}/><div className="title"><p className="brand">{product.brand || 'brand'}</p><div className="name">{product.productName}</div><span className="price">{new Intl.NumberFormat('ko-KR').format(product.price) + "원"}</span></div></SwiperSlide>
       ))}
  
     </Swiper>
     
     </div>
     <div className="cardSlide">
     <h3 className="cartegory4Name">다용도 칼</h3>
     <Swiper
       loop ={true}
       
       modules={[Navigation, Pagination,Keyboard ]}
       spaceBetween={30}
       slidesPerView={3}
       navigation
       keyboard={{
        enabled: true,
      }}
       
       scrollbar={{ draggable: true }}
     >
       
         {
    loading ? // 로딩 상태에 따라서 Skeleton 혹은 실제 데이터를 보여줌
      Array.from(new Array(3)).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton variant="rectangular" animation="wave" width={260} height={200} />
        </SwiperSlide>
      ))
    : products.filter(product => product.category4Name === '다용도칼').map(product => (
       <SwiperSlide key={product.id}> <img src={product.imageUrl} alt="" /><IconButtons product={product} productId={product.id}/><div className="title"><p className="brand">{product.brand || 'brand'}</p><div className="name">{product.productName}</div><span className="price">{new Intl.NumberFormat('ko-KR').format(product.price) + "원"}</span></div></SwiperSlide>
       ))}
     
  
     </Swiper>
     </div>
     </div>
    }
     {selectedCategory === 'bbq' && 
   <div className="tentCategory">
    <div className="cardSlide">
    <h3 className="cartegory4Name">화로</h3>
    <Swiper
      loop ={true}
      
      modules={[Navigation, Pagination, Keyboard]}
      spaceBetween={30}
      slidesPerView={3}
      navigation
      keyboard={{enable:true}}
      
      scrollbar={{ draggable: true }}
    >
   {
    loading ? // 로딩 상태에 따라서 Skeleton 혹은 실제 데이터를 보여줌
      Array.from(new Array(3)).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton variant="rectangular" animation="wave" width={260} height={200} />
        </SwiperSlide>
      ))
    : products.filter(product => product.category4Name === '화로').map(product => (
       <SwiperSlide key={product.id}> <img src={product.imageUrl} alt="" /><IconButtons product={product} productId={product.id}/><div className="title"><p className="brand">{product.brand || 'brand'}</p><div className="name">{product.productName}</div><span className="price">{new Intl.NumberFormat('ko-KR').format(product.price) + "원"}</span></div></SwiperSlide>
       ))}
    
 
    </Swiper>
    
    </div>
     <div className="cardSlide">
     <h3 className="cartegory4Name">스토브</h3>
     <Swiper
       loop ={true}
       
       modules={[Navigation, Pagination, Keyboard]}
       spaceBetween={30}
       slidesPerView={3}
       navigation
       keyboard={{enable:true}}
       
       scrollbar={{ draggable: true }}
     >
       
         {
    loading ? // 로딩 상태에 따라서 Skeleton 혹은 실제 데이터를 보여줌
      Array.from(new Array(3)).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton variant="rectangular" animation="wave" width={260} height={200} />
        </SwiperSlide>
      ))
    : products.filter(product => product.category4Name === '스토브').map(product => (
       <SwiperSlide key={product.id}> <img src={product.imageUrl} alt="" /><IconButtons product={product} productId={product.id}/><div className="title"><p className="brand">{product.brand || 'brand'}</p><div className="name">{product.productName}</div><span className="price">{new Intl.NumberFormat('ko-KR').format(product.price) + "원"}</span></div></SwiperSlide>
       ))}
     
  
     </Swiper>
     
     </div>
     <div className="cardSlide">
     <h3 className="cartegory4Name">연료</h3>
     <Swiper
       loop ={true}
       
       modules={[Navigation, Pagination,Keyboard ]}
       spaceBetween={30}
       slidesPerView={3}
       navigation
       keyboard={{
        enabled: true,
      }}
       
       scrollbar={{ draggable: true }}
     >
       
         {
    loading ? // 로딩 상태에 따라서 Skeleton 혹은 실제 데이터를 보여줌
      Array.from(new Array(3)).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton variant="rectangular" animation="wave" width={260} height={200} />
        </SwiperSlide>
      ))
    : products.filter(product => product.category4Name === '연료').map(product => (
       <SwiperSlide key={product.id}> <img src={product.imageUrl} alt="" /><IconButtons product={product} productId={product.id}/><div className="title"><p className="brand">{product.brand || 'brand'}</p><div className="name">{product.productName}</div><span className="price">{new Intl.NumberFormat('ko-KR').format(product.price) + "원"}</span></div></SwiperSlide>
       ))}
     
  
     </Swiper>
     </div>
     </div>
    }
     {selectedCategory === '계절용품' && 
   <div className="tentCategory">
    <div className="cardSlide">
    <h3 className="cartegory4Name">전기요</h3>
    <Swiper
      loop ={true}
      
      modules={[Navigation, Pagination, Keyboard]}
      spaceBetween={30}
      slidesPerView={3}
      navigation
      keyboard={{enable:true}}
      
      scrollbar={{ draggable: true }}
    >
      
        {
    loading ? // 로딩 상태에 따라서 Skeleton 혹은 실제 데이터를 보여줌
      Array.from(new Array(3)).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton variant="rectangular" animation="wave" width={260} height={200} />
        </SwiperSlide>
      ))
    : products.filter(product => product.category4Name === '전기요').map(product => (
       <SwiperSlide key={product.id}> <img src={product.imageUrl} alt="" /><IconButtons product={product} productId={product.id}/><div className="title"><p className="brand">{product.brand || 'brand'}</p><div className="name">{product.productName}</div><span className="price">{new Intl.NumberFormat('ko-KR').format(product.price) + "원"}</span></div></SwiperSlide>
       ))}
    
 
    </Swiper>
    
    </div>
     <div className="cardSlide">
     <h3 className="cartegory4Name">선풍기</h3>
     <Swiper
       loop ={true}
       
       modules={[Navigation, Pagination, Keyboard]}
       spaceBetween={30}
       slidesPerView={3}
       navigation
       keyboard={{enable:true}}
       
       scrollbar={{ draggable: true }}
     >
       
         {
    loading ? // 로딩 상태에 따라서 Skeleton 혹은 실제 데이터를 보여줌
      Array.from(new Array(3)).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton variant="rectangular" animation="wave" width={260} height={200} />
        </SwiperSlide>
      ))
    : products.filter(product => product.category4Name === '선풍기').map(product => (
       <SwiperSlide key={product.id}> <img src={product.imageUrl} alt="" /><IconButtons product={product} productId={product.id}/><div className="title"><p className="brand">{product.brand || 'brand'}</p><div className="name">{product.productName}</div><span className="price">{new Intl.NumberFormat('ko-KR').format(product.price) + "원"}</span></div></SwiperSlide>
       ))}
  
     </Swiper>
     
     </div>
     <div className="cardSlide">
     <h3 className="cartegory4Name">팬 히터</h3>
     <Swiper
       loop ={true}
       
       modules={[Navigation, Pagination,Keyboard ]}
       spaceBetween={30}
       slidesPerView={3}
       navigation
       keyboard={{
        enabled: true,
      }}
       
       scrollbar={{ draggable: true }}
     >
       
         {
    loading ? // 로딩 상태에 따라서 Skeleton 혹은 실제 데이터를 보여줌
      Array.from(new Array(3)).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton variant="rectangular" animation="wave" width={260} height={200} />
        </SwiperSlide>
      ))
    : products.filter(product => product.category4Name === '팬히터').map(product => (
       <SwiperSlide key={product.id}> <img src={product.imageUrl} alt="" /><IconButtons product={product} productId={product.id}/><div className="title"><p className="brand">{product.brand || 'brand'}</p><div className="name">{product.productName}</div><span className="price">{new Intl.NumberFormat('ko-KR').format(product.price) + "원"}</span></div></SwiperSlide>
       ))}
  
     </Swiper>
     </div>
     </div>
    }
     {selectedCategory === 'rv용품' && 
   <div className="tentCategory">
    <div className="cardSlide">
    <h3 className="cartegory4Name">차박 텐트</h3>
    <Swiper
      loop ={true}
      
      modules={[Navigation, Pagination, Keyboard]}
      spaceBetween={30}
      slidesPerView={3}
      navigation
      keyboard={{enable:true}}
      
      scrollbar={{ draggable: true }}
    >
      
        {
    loading ? // 로딩 상태에 따라서 Skeleton 혹은 실제 데이터를 보여줌
      Array.from(new Array(3)).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton variant="rectangular" animation="wave" width={260} height={200} />
        </SwiperSlide>
      ))
    : products.filter(product => product.category4Name === '차박텐트').map(product => (
       <SwiperSlide key={product.id}> <img src={product.imageUrl} alt="" /><IconButtons product={product} productId={product.id}/><div className="title"><p className="brand">{product.brand || 'brand'}</p><div className="name">{product.productName}</div><span className="price">{new Intl.NumberFormat('ko-KR').format(product.price) + "원"}</span></div></SwiperSlide>
       ))}
    
 
    </Swiper>
    
    </div>
     <div className="cardSlide">
     <h3 className="cartegory4Name">루프백</h3>
     <Swiper
       loop ={true}
       
       modules={[Navigation, Pagination, Keyboard]}
       spaceBetween={30}
       slidesPerView={3}
       navigation
       keyboard={{enable:true}}
       
       scrollbar={{ draggable: true }}
     >
       
         {
    loading ? // 로딩 상태에 따라서 Skeleton 혹은 실제 데이터를 보여줌
      Array.from(new Array(3)).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton variant="rectangular" animation="wave" width={260} height={200} />
        </SwiperSlide>
      ))
    : products.filter(product => product.category4Name === '루프백').map(product => (
       <SwiperSlide key={product.id}> <img src={product.imageUrl} alt="" /><IconButtons product={product} productId={product.id}/><div className="title"><p className="brand">{product.brand || 'brand'}</p><div className="name">{product.productName}</div><span className="price">{new Intl.NumberFormat('ko-KR').format(product.price) + "원"}</span></div></SwiperSlide>
       ))}
     
  
     </Swiper>
     
     </div>
     <div className="cardSlide">
     <h3 className="cartegory4Name">보온/보냉병</h3>
     <Swiper
       loop ={true}
       
       modules={[Navigation, Pagination,Keyboard ]}
       spaceBetween={30}
       slidesPerView={3}
       navigation
       keyboard={{
        enabled: true,
      }}
       
       scrollbar={{ draggable: true }}
     >
       
         {
    loading ? // 로딩 상태에 따라서 Skeleton 혹은 실제 데이터를 보여줌
      Array.from(new Array(3)).map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton variant="rectangular" animation="wave" width={260} height={200} />
        </SwiperSlide>
      ))
    : products.filter(product => product.category4Name === '보온/보냉병').map(product => (
       <SwiperSlide key={product.id}> <img src={product.imageUrl} alt="" /><IconButtons product={product} productId={product.id}/><div className="title"><p className="brand">{product.brand || 'brand'}</p><div className="name">{product.productName}</div><span className="price">{new Intl.NumberFormat('ko-KR').format(product.price) + "원"}</span></div></SwiperSlide>
       ))}
  
     </Swiper>
     </div>
     </div>
    }
     </SwiperStyle>
     
     
   
  );
  };

export default SliderContainer;