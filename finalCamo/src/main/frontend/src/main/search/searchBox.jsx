import { Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledSearch = styled(Input.Search)`
  .ant-input {
    border-color: #2E2E2E;
    border-radius: 5px;
    height: 32px;

    &:focus {
      border-color: #2E2E2E;
    }
  }

  .ant-input-search-button {
    background-color: #FFFFFF;
    border-color: #2E2E2E;
    border-radius: 5px;

    &:hover {
      background-color: #2D6247;
      border-color: #2E2E2E;

      .anticon {
        svg {
          fill: #FFFFFF;
        }
      }
    }
  }
`;

const SearchBox = () => {
  const navigate = useNavigate();

  const onSearchHandler = (value) => {
    // 검색어가 비어있는지 확인
    if (!value.trim()) {
      message.error('검색어를 입력해주세요.');
      return;
    }

    console.log(value);
    navigate(`/search?query=${value}`);
  }

  return (
    <StyledSearch
      placeholder="검색어를 입력해주세요.."
      onSearch={onSearchHandler}
      style={{ width: 300 }}
    />
  );
};

export default SearchBox;
