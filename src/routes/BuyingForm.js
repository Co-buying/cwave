import React, { useEffect, useState } from "react";
import { dbService, storageService } from "../fbase";

const BuyingForm = ({userObj}) => {
    const [name, setName] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [count, setCount] = useState("");
    const [size, setSize] = useState("");
    const [address, setAddress] = useState("");
    const [account_name, setAccount_name] = useState("");
    const [account_date, setAccount_date] = useState("");
    const [account_re, setAccount_re] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();

        const BuyingObj = {
            name: name,
            phonenumber: phonenumber,
            count : count,
            size : size,
            address : address,
            createdAt: Date.now(),
            account_date : account_date,
            account_name : account_name,
            account_re : account_re,
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
    }

    const onChange = (event) => {
        console.log(event.target.id);
        if(event.target.id == "nameform"){
            const {
                target: { value },
              } = event;
              setName(value);
        }
        else if(event.target.id == "phonenumberform"){
            const {
                target: { value },
              } = event;
              setPhonenumber(value);
        }
        else if(event.target.id == "countform"){
            const {
                target: { value },
              } = event;
              setCount(value);
        }
        else if(event.target.id == "sizeform"){
            const {
                target: { value },
              } = event;
              setSize(value);
        }
        else if(event.target.id == "addressform"){
            const {
                target: { value },
              } = event;
              setAddress(value);
        }
        else if(event.target.id == "accountnameform"){
            const {
                target: { value },
              } = event;
              setAccount_name(value);
        }
        else if(event.target.id == "accountdateform"){
            const {
                target: { value },
              } = event;
              setAccount_date(value);
        }
        else if(event.target.id == "accountreform"){
            const {
                target: { value },
              } = event;
              setAccount_re(value);
        }
      };


    return (
        <div className="container">
            <h1>Buying Form</h1>
            <form onSubmit={onSubmit} >
                <span>이름: </span>
                <input 
                    id="nameform"
                    type="text"
                    placeholder="Write name"
                    onChange={onChange}
                    value={name}
                />
                <br></br>
                <span>전화번호: </span>
                <input
                    id="phonenumberform"
                    type="tel"
                    placeholder="Write phone number"
                    onChange={onChange}
                    value={phonenumber}
                />
                <br></br>
                <span>수량: </span>
                <input
                    id="countform"
                    type="number"
                    placeholder="수량을 입력하세요"
                    onChange={onChange}
                    value={count}
                />
                <br></br>
                <span>사이즈: </span>
                <input
                    id="sizeform"
                    type="text"
                    placeholder="사이즈를 입력하세요"
                    onChange={onChange}
                    value={size}
                />
                <br></br>
                <span>주소:</span>
                <input
                    id="addressform"
                    type="text"
                    placeholder="배송을 원하시면 주소를 입력해주세요"
                    onChange={onChange}
                    value={address}
                />
                <br></br>
                <span>입금자명: </span>
                <input
                    id="accountnameform"
                    type="text"
                    placeholder="입금자명을 입력해주세요"
                    onChange={onChange}
                    value={account_name}
                />
                <br></br>
                <span>입금일자: </span>
                <input
                    id="accountdateform"
                    type="date"
                    placeholder="입금일자를 입력해주세요"
                    onChange={onChange}
                    value={account_date}
                />
                <br></br>
                <span>환불계좌(은행/계좌번호/입금주명): </span>
                <input
                    id="accountreform"
                    type="text"
                    placeholder="환불계좌(은행/계좌번호/입금주명)을 입력해주세요"
                    onChange={onChange}
                    value={account_re}
                />
                <br></br>
                <input type="submit" />
            </form>
        </div>
    );
}

export default BuyingForm;