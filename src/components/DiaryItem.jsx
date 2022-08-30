import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import ViewModal from './ViewModal';

const DiaryItem = () => {
  return (
    <>
      <div
        // className="col"
        style={{ cursor: 'pointer', border: '1px solid blue' }}
      >
        <img
          src="https://i.pinimg.com/474x/51/1b/1c/511b1cbbc78f45680ff80f34bd162b93.jpg"
          className="card-img-top"
          alt="앨범 이미지 설명글"
        />
      </div>
    </>
  );
};

export default DiaryItem;
