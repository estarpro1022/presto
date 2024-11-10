import { SERVER_ENDPOINT } from "./config";

export const getStore = async (setData) => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    return;
  }
  return fetch(SERVER_ENDPOINT + "/store", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to connect to server");
      }
      return response.json();
    })
    .then((res) => {
      const pres = res.store.pres;
      if (pres) {
        console.log("presentations:", pres);
        setData(pres);
      } else {
        console.log("no pres:", res);
      }
    })
    .catch((error) => {
      console.log("Error when getting pres:", error);
    });
};

export const putStore = async (data) => {
  const token = localStorage.getItem("userToken");
  return fetch(SERVER_ENDPOINT + "/store", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      store: {
        pres: data
      }
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to connect to server");
      }
      return response.json();
    })
    .catch((error) => { 
      console.log("Error when putting pres:", error);
    });
}