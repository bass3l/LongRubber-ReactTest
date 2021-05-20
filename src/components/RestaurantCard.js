import React from "react";
import Rate from "./Rate";
import { Link } from "react-router-dom";

export default function RestaurantCard(restaurant) {
  let rest = restaurant.restaurant;

  return (
    <div style={styles.container}>
      <Link
        style={styles.link}
        to={{
          pathname: `/menu/${rest.id}`,
          state: { restaurantId: rest.id },
        }}
      >
        <img
          alt={"restaurant-image" + rest.id}
          src={rest.images[0]}
          style={styles.image}
        />

        <p style={{ ...styles.title }}>{rest.name}</p>
        <p style={styles.noMargin}>{rest.cuisine}</p>
        <div style={styles.footer}>
          <div style={styles.footer}>
            <Rate key={rest.id} style={styles.rate} rate={rest.rate} />
            <p style={styles.reviews}>88</p>
          </div>

          <p>{rest.status}</p>
        </div>
      </Link>
    </div>
  );
}

const styles = {
  container: {
    background: "#FFFFFF",
    boxShadow: "0px 8px 7px #00000012",
    borderRadius: "5px",
    padding: "10px",
    width: "16rem",
  },
  image: {
    width: "16rem",
    height: "10rem",
    objectFit: "cover",
    borderRadius: "5px",
  },
  link: {
    textDecoration: "none",
    lineHeight: "1.5rem",
  },
  title: {
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: "#1F1F1F",
    fontSize: "14px",
  },
  noMargin: {
    margin: 0,
    fontSize: "12px",
    color: "#1F1F1F",
    fontWeight: "400",
  },
  reviews: {
    margin: 0,
    fontSize: "12px",
    color: "#1F1F1F",
    fontWeight: "600",
    paddingLeft: "5px",
  },
  footer: {
    fontWeight: "bold",
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    color: "#FF7010",
  },
  rate: {},
};
