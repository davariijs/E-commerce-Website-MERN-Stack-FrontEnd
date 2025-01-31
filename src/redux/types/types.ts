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