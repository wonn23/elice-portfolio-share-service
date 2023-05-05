/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import ModalSearch from './ModalSearch';

function SearchComponent() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const [isSearched, setIsSearched] = useState(false);

  const onChange = (event) => {
    setSearchValue(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get('https://dapi.kakao.com/v2/search/web', {
        headers: {
          Authorization: 'KakaoAK a15b67bc3958c3a502cf0d1905aa8e44',
        },
        params: {
          query: searchValue,
        },
      });
      setSearchResult(response.data.documents);
    } catch (error) {
      console.error(error);
    }
  };

  const onClick = () => {
    setIsSearched(true);
  };

  return (
    <div>
      <form onSubmit={onSubmit} style={{ margin:'0px' }}>
        <Container style={{ padding: '4px' }}>
          <Row style={{ margin: '12px 0px', padding: '0 0 0 16px' }}>
            <Col sm="auto">
              <ButtonSearch type="submit" onClick={onClick}>
                검색
              </ButtonSearch>
            </Col>
            <Col sm="auto">
              <input
                type="text"
                value={searchValue}
                onChange={onChange}
                style={{ borderRadius: '4px', paddingLeft: '4px' }}
              />
            </Col>
          </Row>
        </Container>
      </form>
      <ModalSearch
        searchResult={searchResult}
        isSearched={isSearched}
        setIsSearched={setIsSearched}
        searchValue={searchValue}
      />
    </div>
  );
}

export default SearchComponent;

const ButtonSearch = styled.button`
  background-color: #1e1f20;
  color: #ffffff;

  border-radius: 8px;
`;
