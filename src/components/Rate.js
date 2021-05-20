import React from "react";
const MAX_RATE = 5;

export default function Rate({ style, rate }) {
  return (
    <div style={{ ...style, ...styles.container }}>
      {[...Array(rate)].map((v, idx) => (
        <div
          key={idx}
          style={{ ...styles.circle, ...styles.filledCircle }}
        ></div>
      ))}
      {[...Array(MAX_RATE - rate)].map((v, idx) => (
        <div key={idx} style={styles.circle}></div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
  },
  circle: {
    borderRadius: "50%",
    width: 15,
    height: 15,
    border: "2px solid #232323",
    margin: "0px 1px",
  },
  filledCircle: {
    backgroundColor: "#FFCD3F",
  },
};
