import React from "react";
import { dbService, storageService } from "../fbase";
import { useNavigate } from "react-router-dom";
const Nweet = ({ listObj, isOwner }) => {
  let navigate = useNavigate();
  const onDetaillistClick = () => {
    // const detailObj = "init";
    navigate("/selling/detail", {
      replace: false,
      state: { detailObj: listObj },
    });
  };

  return (
    // className 뭐라 할까 css할때 헷갈릴까봐 아직 안바꿨어
    <div className="nweet">
      <>
        <div
          className="dfddfa"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justify: "center",
          }}
        >
          <div onClick={onDetaillistClick}>
            {listObj.attachmentUrl ? (
              <img
                style={{
                  width: "80%",
                  height: "80px",
                  marginBottom: 5,
                  borderRadius: 10,
                }}
                src={listObj.attachmentUrl}
              />
            ) : (
              <>
                <img
                  style={{ width: "100%", height: "40%", marginBottom: 5 }}
                  src="img/transparent.png"
                />
              </>
            )}
            <div className="name">
              {
                <>
                  상품명: {listObj.itemname}
                  <br />
                  분류: {listObj.item}
                </>
              }
            </div>
            <div className="deadline">{`${listObj.deadline}까지`}</div>
          </div>
        </div>
      </>
    </div>
  );
};
export default Nweet;
