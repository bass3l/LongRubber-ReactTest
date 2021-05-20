/**
 * This function is responsible for send post request to deticated api in order to
 * register the phone number.
 * @param {Number}  phoneNumber The phone number entered by user.
 * @return {Object} response: the response from thedeticated api.
 */

export const signUpRequest = async (phoneNumber) => {
  let requestBody = {
    phone_number: phoneNumber,
  };

  const response = await fetch(
    "https://long-rubber.herokuapp.com/api/v1/login",
    {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        // Authorization: 'Bearer ' + this.context.token
      },
    }
  );

  return response;
};

/**
 * This function is responsible for send post request which contains OTP verfication code
 * to deticated api in order to verify user.
 * @param {Number}  phoneNumber The phone number entered by user.
 * @param {Number}  otp OTP verfication code.
 * @return {Object} data: the response's body (access-token).
 */

export const loginRequest = async (phoneNumber, otp) => {
  let requestBody = {
    phone_number: phoneNumber,
    otp: otp,
  };

  const response = await fetch(
    "https://long-rubber.herokuapp.com/api/v1/login/otp",
    {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        // Authorization: 'Bearer ' + this.context.token
      },
    }
  );
  return await response.json();
};

/**
 * This function is responsible for send get request in order to get restaurants list
 * @return {Object} data: the response's body (restaurants list).
 */
export const getRestaurantRequest = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    "https://long-rubber.herokuapp.com/api/v1/restaurants",
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  return await response.json();
};

/**
 * This function is responsible for send get request to get the menu of specific restaurant
 * @param {Number}  restaurantId The ID of the restuarant.
 * @return {Object} data: the response's body (restaurant's menu).
 */
export const getMenuRequest = async (restaurantId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `https://long-rubber.herokuapp.com/api/v1/menus/restaurant/${restaurantId}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  return await response.json();
};
