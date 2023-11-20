import React, { useEffect, useRef, useState } from "react";
import "./Main.css";

const Main = () => {
  const [myLevel, setMyLevel] = useState(1);
  const [message, setMessage] = useState("");
  const [coin, setCoin] = useState(0);
  const [secondsGold, setSecondsGold] = useState(0);
  const percentage = [80, 70, 60, 50, 40, 30, 20, 10, 5, 3, 2, 1, 0.5, 0.1];
  const levelupMoney = new Array(14).fill(0).map((_, idx) => idx * 4000);
  const [userName, setUserName] = useState("");

  function levelUp() {
    const ranNum = Math.random() * 100;
    if (levelupMoney[myLevel] < coin) {
      setCoin(coin - levelupMoney[myLevel]);
    } else {
      setMessage("소지금이 부족합니다.");
      return;
    }
    if (percentage[myLevel - 1] > ranNum) {
      setMyLevel(myLevel + 1);
      setMessage("강화에 성공하였습니다.");
    } else {
      setMessage("강화에 실패하였습니다.");
      const downRanNum = Math.random() * 100;
      if (10 > downRanNum) {
        setMyLevel(myLevel - 1 < 1 ? 1 : myLevel - 1);
        setMessage("강화에 실패하였습니다. (강화등급 하락)");
      }
    }
  }

  function autoGoldMine() {
    if (coin > secondsGold * 1000) {
      let secondGold = secondsGold + 1;
      setSecondsGold(secondGold);
      setCoin((coin) => coin - secondGold * 1000);
    } else {
      setMessage("광부 구입 금액이 부족합니다.");
    }
  }

  function plusGoldMine() {
    setCoin(coin + secondsGold * 100);
  }

  function UseInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }
  UseInterval(plusGoldMine, 1000);

  useEffect(() => {
    if(localStorage.getItem('info')) {
      const {coin, userName, myLevel, secondsGold} = JSON.parse(localStorage.getItem('info'));
      setCoin(coin);
      setUserName(userName);
      setMyLevel(myLevel);
      setSecondsGold(secondsGold);
    } else {
      setUserName(prompt("이름을 입력해주세요."));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("info", JSON.stringify({
      coin,
      userName,
      myLevel,
      secondsGold,
    }));
  }, [coin, userName, myLevel, secondsGold]);

  return (
    <div className="main">
      <h1>내 무기 레벨 {myLevel}</h1>
      <h2>{message}</h2>
      <h3>확률 ({percentage[myLevel]}%)</h3>
      <h3>등급하락확률 ({percentage[myLevel] * 0.1}%)</h3>

      <div
        className="zone"
        onClick={() => setCoin((coin) => coin + myLevel * 100)}
      >
        사냥터
        <div>클릭당 {myLevel * 100}원</div>
      </div>

      <div className="info">
        <h3>{userName}님.</h3>
        <div>소지금: {coin}</div>
        <div>강화비용: {levelupMoney[myLevel]}</div>
        <button onClick={() => levelUp()}>강화하기</button>
      </div>

      <div className="second-gold-mine">
        <h1>광부</h1>
        <h2>현재 초당 수익: {secondsGold * 100}원</h2>
        <button onClick={() => autoGoldMine()}>
          {(secondsGold + 1) * 1000}원
        </button>
      </div>
    </div>
  );
};

export default Main;
