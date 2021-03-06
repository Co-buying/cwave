import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { dbService } from "../fbase";

const BuyingForm = ({ userObj }) => {
  const [name, setName] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [count, setCount] = useState("");
  const [size, setSize] = useState("");
  const [address, setAddress] = useState("");
  const [account_name, setAccount_name] = useState("");
  const [account_date, setAccount_date] = useState("");
  const [account_re, setAccount_re] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // const { detailObj, id } = location.state; // 입력 폼 정보 받아오기
  const { detailObj, itemId } = location.state;

  const onSubmit = async (event) => {
    event.preventDefault();
    const BuyingObj = {
      randomidx: detailObj.randomidx,
      name: name,
      phonenumber: phonenumber,
      count: count,
      size: size,
      address: address,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      account_date: account_date,
      account_name: account_name,
      account_re: account_re,
      deposit_complete: false,
      deleted: false,
    };
    await dbService.collection("joinlist").add(BuyingObj);
    setName("");
    setPhonenumber("");
    setCount("");
    setSize("");
    setAddress("");
    setAccount_name("");
    setAccount_date("");
    setAccount_re("");

    navigate("/buying/done", {
      replace: false,
      state: { link: detailObj.link },
    });
  };

  const onCancel = (event) => {
    console.log(detailObj);
    event.preventDefault();
    navigate(`/selling/detail/${itemId}`, {
      replace: false,
      state: { detailObj: detailObj },
    });
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    if (event.target.id === "nameform") {
      setName(value);
    } else if (event.target.id === "phonenumberform") {
      setPhonenumber(value);
    } else if (event.target.id === "countform") {
      setCount(value);
    } else if (event.target.id === "sizeform") {
      setSize(value);
    } else if (event.target.id === "addressform") {
      setAddress(value);
    } else if (event.target.id === "accountnameform") {
      setAccount_name(value);
    } else if (event.target.id === "accountdateform") {
      setAccount_date(value);
    } else if (event.target.id === "accountreform") {
      setAccount_re(value);
    }
  };

  return (
    <form className="openjoin_container">
      <p>공구 참여하기</p>
      <p className="openjoin_que">
        <span>✔️ 이름: </span>
        <input
          className="openjoin_input"
          id="nameform"
          type="text"
          placeholder="이름"
          onChange={onChange}
          value={name}
          required
        />
      </p>
      <p className="openjoin_que">
        <span>✔️ 전화번호: </span>
        <input
          className="openjoin_input"
          id="phonenumberform"
          type="tel"
          placeholder="000-0000-0000"
          onChange={onChange}
          value={phonenumber}
          required
        />
      </p>
      <p className="openjoin_que">
        <span>✔️ 수량: </span>
        <input
          className="openjoin_input"
          id="countform"
          type="number"
          placeholder="수량"
          onChange={onChange}
          value={count}
          required
        />
      </p>
      <p className="openjoin_que">
        <span>✔️ 사이즈: </span>
        <input
          className="openjoin_input"
          id="sizeform"
          type="text"
          placeholder="사이즈"
          onChange={onChange}
          value={size}
          required
        />
      </p>
      <p className="openjoin_que">
        <span>✔️ 주소:</span>
        <input
          className="openjoin_input"
          id="addressform"
          type="text"
          placeholder="상세주소로 입력(동/호수까지)"
          onChange={onChange}
          value={address}
        />
      </p>
      <p className="openjoin_que">
        <span>✔️ 입금자명: </span>
        <input
          className="openjoin_input"
          id="accountnameform"
          type="text"
          placeholder="입금자명"
          onChange={onChange}
          value={account_name}
          required
        />
      </p>
      <p className="openjoin_que">
        <span>✔️ 입금일자: </span>
        <input
          className="openjoin_input"
          id="accountdateform"
          type="date"
          placeholder="입금일자"
          onChange={onChange}
          value={account_date}
          required
        />
      </p>
      <p className="openjoin_que">
        <span className="openjoin_long">
          ✔️ 환불계좌(은행/계좌번호/입금주명):{" "}
        </span>
        <input
          className="openjoin_input"
          id="accountreform"
          type="text"
          placeholder="환불계좌(은행/계좌번호/입금주명)"
          onChange={onChange}
          value={account_re}
          required
        />
      </p>
      <div>
        <button className="default_Btn_Right" onClick={onCancel}>
          취소
        </button>
        <button className="default_Btn_Right" type="submit" onClick={onSubmit}>
          제출
        </button>
      </div>
    </form>
  );
};

export default BuyingForm;
