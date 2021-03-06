import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { dbService } from "../fbase";
import Item from "../components/Item";
import Excel from "../components/Excel";

const Itemlist = () => {
  const location = useLocation();
  const { buyerindex, filename } = location.state;
  const [lists, setLists] = useState([]);
  const [excellist, setExcelList] = useState([]);
  useEffect(() => {
    dbService.collection("joinlist").onSnapshot((snapshot) => {
      setLists([]);
      setExcelList([]);
      snapshot.docs.map((doc) => {
        if (doc.data().randomidx == buyerindex) {
          const myobj = {
            ...doc.data(),
            id: doc.id,
          };
          const excelobj = {
            name: doc.data().name,
            phone: doc.data().phonenumber,
            address:doc.data().address,
            size: doc.data().size,
            count: doc.data().count,
            accountname: doc.data().account_name,
            accountdate: doc.data().account_date,
            accountre:doc.data().account_re,

          };
          setLists((prev) => [myobj, ...prev]);
          setExcelList((prev) => [excelobj, ...prev]);
        }
      });
    });
  }, []);

  return (
    <>
      {lists.length > 0 ? (
        <div className="container">
          <div className="joinerlist">
            <div className="my_title">πμ°Έμ¬μ λͺ©λ‘π</div>
            <hr />
            <Excel exceldata={excellist} name={filename} />
            <br />
            <div style={{ marginBottom: "15px", fontSize: 12 }}>
              <span style={{ width: "10%", float: "right", textAlign: "center" }}>μ­μ </span>
              <span style={{ width: "10%", float: "right", textAlign: "center" }}>νμΈ</span>
              <span style={{ width: "20%", float: "right" }}>κ΅¬λ§€μλͺ</span>
              <span style={{ width: "20%", float: "right" }}>μκΈμλͺ</span>
              <span style={{ width: "24%", float: "right" }}>μκΈλ μ§</span>
              <span style={{ width: "16%", float: "right" }}>κ΅¬λ§€κΈμ‘</span>{" "}
            </div>
            <br />
            <div className="joiner_context">
              {lists.map((list) => (
                <Item
                  key={list.id}
                  listObj={list}
                  isBuyer={list.randomidx === buyerindex}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "90%",
            height: "fit-content",
            padding: "10px",
            backgroundColor: " rgb(255, 255, 255)",
            borderRadius: "10px",
            marginTop: "120px",
          }}
        >
          <img width="100%" src="img/no_participation.png"></img>
        </div>
      )}
    </>
  );
};
export default Itemlist;
