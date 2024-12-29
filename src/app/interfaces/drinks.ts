export interface drinks {
    result: number
    data: drinkRes[]
  }
  
  export interface drinkRes {
    _id: string
    name: string
    price: number
    __v: number
  }

  export interface postdrink{

    name:string;
    price:string;
  }
  
  export interface updatdrink{

    price:string;
  }
  
