import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import ViewModal from './ViewModal';

const DiaryItem = () => {
  return (
    <>
      <div className="col">
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

export const StTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-top: -5px;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
`;

export const StArtist = styled.div`
  font-style: italic;
  color: #969696;
`;

export const StContent = styled.p`
  margin: 15px auto;
  font-size: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
`;

export const StUsername = styled.span`
  /* color: #969696; */
  font-weight: 500;
`;
