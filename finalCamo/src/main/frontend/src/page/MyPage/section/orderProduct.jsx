import React from 'react';
import { Table, Popconfirm } from 'antd';
import styled from 'styled-components';
import Header from '../../../main/header';
import Sidebar from '../sidebar';

const LayoutContainer = styled.div`
  display: flex;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 50px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

function handleDelete(key) {
  console.log(`취소: ${key}`);
}

const columns = [
  {
    title: '번호', 
    dataIndex: 'number', 
    key: 'number', 
    render: (text) => <a>{text}</a>, 
    width: 30, 
  },
  {
    title: '주문일',
    dataIndex: 'date',
    key: 'date',
    width: 80,
  },
  {
    title: '상품명',
    dataIndex: 'product',
    key: 'product',
    width: 120,
    ellipsis: true, // 길이가 길면 말줄임표 표시
  },
  {
    title: '결재 금액',
    dataIndex: 'paymentAmount',
    key: 'paymentAmount',
    width: 120,
    ellipsis: true,
  },
  {
    title: '주문 상세',
    dataIndex: 'orderDetails',
    key: 'orderDetails',
    width: 150,
    ellipsis: true,
  },
  {
    title: '배송 현황',
    dataIndex: 'shippingStatus',
    key: 'shippingStatus',
    width: 80,
    ellipsis: true,
  },
  {
    title: '',
    dataIndex: '',
    key: 'x',
    width: 80,
    ellipsis: true,
    render: (_, record) => 
    data.length >= 1 ? (
      <Popconfirm title="정말 취소하시겠습니까?" onConfirm={() => handleDelete(record.key)}>
        <a>취소하기</a>
      </Popconfirm>
    ) : null,
  },
];

const data = [
  {
    key: '1',
    number: '1',
    date: '2023-06-14',
    product: '상품 A',
    paymentAmount: '100,000원',
    orderDetails: '주문 상세 내용 A',
    shippingStatus: '배송준비중',
  },
  {
    key: '2',
    number: '2',
    date: '2023-06-13',
    product: '상품 B',
    paymentAmount: '50,000원',
    orderDetails: '주문 상세 내용 B',
    shippingStatus: '배송중',
  },
  {
    key: '3',
    number: '3',
    date: '2023-06-12',
    product: '상품 C',
    paymentAmount: '80,000원',
    orderDetails: '주문 상세 내용 C',
    shippingStatus: '배송완료',
  },
];

const OrderedProduct = () => {
  return (
    <>
      <Header />
      <LayoutContainer>
        <Sidebar />
        <ContentContainer>
          <Table columns={columns} dataSource={data} />
        </ContentContainer>
      </LayoutContainer>
    </>
  );
};

export default OrderedProduct;
