import React, { useEffect, useState } from "react";
import Rate from "../components/Rate";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRestaurantById } from "../features/restaurant/restaurantSlice";
import { getMenuRequest } from "../services/api";
import { Link } from "react-router-dom";
import logo from "./../assets/images/logo.png";
import back from "./../assets/images/back.svg";
import "./style.css";
export default function Menu(props) {
  const [menu, setMenu] = useState([]);
  const { restId } = useParams();

  useEffect(async () => {
    let response = await getMenuRequest(restId);
    if (response) {
      setMenu(response);
    }
  }, [restId]);

  const restaurant = useSelector(getRestaurantById(parseInt(restId)));

  const AddToCart = () => {
    // TODO: add item to the cart
  };
  return (
    <div style={styles.main}>
      {restaurant && (
        <>
          <div style={styles.container}>
            <Link to={"/"} style={styles.back}>
              <img src={back} alt="back" width="8" />
            </Link>
            <img src={logo} alt="logo" width="30" height="30" />
            <h1 style={styles.header}>
              Best classic New York City restourants
            </h1>
          </div>

          <div style={styles.card}>
            <div style={styles.firstsec}>
              <p style={{ ...styles.title, ...styles.noMargin }}>
                {restaurant.name}
              </p>
              <p style={styles.noMargin}>{restaurant.cuisine}</p>
              <div style={styles.footer}>
                <Rate style={styles.rate} rate={restaurant.rate} />
                <p style={styles.status}>{restaurant.status}</p>
              </div>
            </div>
            <div style={styles.secondsec}>
              <img
                alt="restaurant-image"
                src={restaurant.images[0]}
                style={styles.image}
              />
            </div>
          </div>
        </>
      )}
      {menu.map((element, index) => (
        <div key={index} style={styles.appetizers}>
          <h3 style={styles.head}>{element.menu}</h3>
          <div style={styles.package}>
            {element.items.map((item, idx) => (
              <div key={idx} style={styles.items}>
                <div style={styles.group}>
                  <img
                    alt="meal-image"
                    src={item.image}
                    style={styles.innerImage}
                  />
                  <div style={styles.desc}>
                    <p>{item.name}</p>
                    <p style={styles.price}>{item.price}</p>
                  </div>
                </div>
                <div style={styles.addbtn}>
                  <button
                    id="Addbtn"
                    style={styles.btn}
                    onClick={() => AddToCart()}
                  >
                    {" "}
                    Add+
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: "2rem 0",
    alignItems: "center",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  back: {
    paddingRight: "15px",
  },
  image: {
    width: "14rem",
    objectFit: "cover",
    margin: "auto",
    borderRadius: "0.5rem",
  },
  status: {
    // paddingLeft:"270px",
    fontWeight: "bold",
    fontSize: "12px",
    color: "#FF7010",
  },
  innerImage: {
    width: "4rem",
    height: "4rem",
    objectFit: "cover",
    borderRadius: "0.5rem",
  },
  title: {
    fontWeight: "bold",
  },
  price: {
    color: "#FF7010",
    fontWeight: "bold",
  },
  items: {
    display: "grid",
    gridTemplateColumns: "1fr 1.5fr",
    borderBottom: "1px solid #e1e1e1",
    padding: "10px",
    alignItems: "center",
  },
  package: {
    background: "white",
    borderBottom: "1px solid #e1e1e1",
    borderRadius: "0.5rem",
  },

  group: {
    display: "flex",
    fontSize: "12px",
    alignContent: "center",
    alignItems: "center",
  },
  desc: {
    paddingLeft: "10px",
  },
  card: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    background: "white",
    padding: "10px",
    borderRadius: "0.5rem",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  firstsec: {
    margin: "0px 20px",
  },
  secondsec: {
    marginLeft: "20px",
    borderRadius: "0.5rem",
  },
  appetizers: {
    width: "55%",
  },
  addbtn: {
    textAlign: "right",
  },
  btn: {
    color: "#FF7010",
    padding: " 15px 20px",
    border: "1px solid #FF7010",
    borderRadius: "0.5rem",
    background: "white",
    cursor: "pointer",
  },
  head: {
    margin: "0px",
    padding: "15px 0px",
    textAlign: "left",
    color: "#6A6A6A",
    fontSize: "14px",
  },
  header: {
    color: "#1F1F1F",
    fontSize: "16px",
    fontFamily: "Poppins",
    paddingLeft: "5px",
  },
  noMargin: {
    margin: 0,
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
  },
  rate: {},
};
