import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBjQzkpWSXtu0wRxf1pxsugGYLksMMrF2s",
  authDomain: "cake-shop-2c6c5.firebaseapp.com",
  projectId: "cake-shop-2c6c5",
  storageBucket: "cake-shop-2c6c5.appspot.com",
  messagingSenderId: "570706637861",
  appId: "1:570706637861:web:7d9b2788f3414e9c24fbcc"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)