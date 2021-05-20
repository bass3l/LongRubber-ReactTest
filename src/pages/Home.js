import React from "react";
import RestaurantCard from "../components/RestaurantCard";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchRestaurant,
  selectRestaurant,
} from "../features/restaurant/restaurantSlice";
import logo from "./../assets/images/logo.png";

export default function Home() {
  const data = useSelector(selectRestaurant);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRestaurant());
  }, []);

  if (!data) {
    return <div>Loading</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.column}>
        <img src={logo} alt="logo" width="60" />
        <h2>Best classic Dubai restaurants</h2>
      </div>
      <div style={styles.products}>
        {data.map((restaurant, index) => (
          <RestaurantCard key={index} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    justifyItems: "center",
    alignContent: "cneter",
    alignItems: "center",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    justifyItems: "center",
    alignContent: "cneter",
    alignItems: "center",
    margin: "10px 0",
    fontFamily: "Poppins",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    textAlign: "left",
    font: "normal normal normal 12px/27px Poppins",
    letterSpacing: "0px",
    color: "#707070",
    textAlign: "center",
  },
  products: {
    margin: "0rem 2rem",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridGap: "2rem",
    justifyContent: "center",
    justifyItems: "center",
  },
};
