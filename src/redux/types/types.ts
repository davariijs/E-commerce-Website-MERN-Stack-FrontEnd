import { IAddressInfo } from "src/pages/Account/MyInfo";
import { TCartItem } from "../cart/cartSlice";

    export interface TProduct  {
        id?: string;
        webID: number;
        productTitle: string;
        prices: Array<{ // Changed to an array of price objects
            regularPrice: {
              minPrice: number;
            };
          }>;
        image: { url: string };
        }
  
    export interface TPayload {
        products: TProduct[];
    }

    export interface TProducts {
        payload: TPayload;
      }
    
    export type ProductCategory = TProducts;


    export interface TPayment {
      cardNumber: string,
      nameCard: string,
      expirationDate: string,
      securityCode: string, 
    }

    export interface TOrder  {
            orderDate?: string, // Default to current date
            deliveryDate: string,
            orderStatus: string, // Default to "Pending"
            paymentMethod: string,
            totalPrice: number, // Price should be a number
            cartItems: TCartItem[],
            address: IAddressInfo[],
            payment: TPayment[],
            _id: string,
      }

  export interface TCheckOut {
    orders: TOrder[] | null,
    uid:string | null,
  }