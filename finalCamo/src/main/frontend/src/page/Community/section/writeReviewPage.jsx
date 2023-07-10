import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, Modal, Layout, Input, Select } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import ReviewApi from '../../../API/ReviewAPI';
import Header from '../../../main/header';
import { Link } from 'react-router-dom';
import { storage } from '../../../firebase/firebaseConfig';

const { Content } = Layout;
const { Option } = Select;

const GlobalStyle = createGlobalStyle`
  .ck-editor__editable {
    height: 600px;
  }
`;

const ReviewContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid #DDDDDD;
`;

const WriteReviewPage = () => {
  const [data, setData] = useState('');
  const [title, setTitle] = useState('');
  const [postType, setPostType] = useState('카테고리를 선택해주세요');
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    try {
      const memberId = 1;
      const content = data;
      const date = new Date().toISOString();
      const viewCount = 0;
      const img = image ? await uploadImage(image) : null;
      await ReviewApi.createReview(memberId, title, content, date, postType, viewCount, img);
      setModalVisible(true);
    } catch (error) {
      console.log(error);
      setError('리뷰 작성에 실패하였습니다.');
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const uploadImage = async (file) => {
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      const downloadUrl = await fileRef.getDownloadURL();
      return downloadUrl;
    } catch (error) {
      console.log(error);
      throw new Error('이미지 업로드에 실패하였습니다.');
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  return (
    <Layout>
      <GlobalStyle />
      <Header />
      <Content style={{ padding: '120px', position: 'relative', backgroundColor: '#FFFFFF' }}>
        <ReviewContainer>
          <h2>작성하기</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title here"
          />
          <Select
            style={{ width: '50%' }}
            value={postType}
            onChange={(value) => setPostType(value)}
            placeholder="카테고리를 선택해주세요."
          >
            <Option value="1">유료캠핑장</Option>
            <Option value="2">오지캠핑장</Option>
          </Select>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <CKEditor
            editor={ClassicEditor}
            data="<p>Hello from CKEditor 5!</p>"
            config={{
              toolbar: [
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                'blockQuote',
                'uploadImage' // 이미지 업로드 버튼 추가
              ],
              ckfinder: {
                uploadUrl: 'https://example.com/upload',
              },
            }}
            onReady={(editor) => {
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
              setData(data);
            }}
          />
          <Button onClick={handleSubmit}>작성하기</Button>

          <Modal visible={modalVisible} onCancel={closeModal} footer={null}>
            <h3>작성 완료</h3>
            <p>글이 성공적으로 작성되었습니다.</p>
            <Link to="/community">확인</Link>
          </Modal>
        </ReviewContainer>
      </Content>
    </Layout>
  );
};

export default WriteReviewPage;
