import React from 'react';
import styled from "styled-components";

const ModalStyle = styled.div`

.modalBackground{
  position: fixed;
  top:0; left: 0; bottom: 0; right: 0;
  background: rgba(0, 0, 0, 0.8);
}
.modalBox{
  position: absolute;
  top: calc(50vh - 100px); left: calc(50vw - 200px);
  background-color: white;
  display: flex; justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  width: 400px;
  height: 200px;
}
 
`;

// 모달 컴포넌트
const Modal = ({ isOpen, children }) => {
    if (!isOpen) return null;
    
    return (
      <ModalStyle>
      <div className="modalBackground">
             <div className="modalBox">
          {children}
        </div>
      </div>
      </ModalStyle>
    );
  };


export default Modal;
