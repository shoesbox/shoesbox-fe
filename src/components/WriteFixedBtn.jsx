import './css/writefixedbtn.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BsPencil } from 'react-icons/bs';

const WriteFixedBtn = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        className="writeBtn"
        onClick={() => {
          navigate('/write');
        }}
      >
        <h4>
          <BsPencil />
        </h4>
      </Button>
    </div>
  );
};

export default WriteFixedBtn;
