export interface Bill {
 employeeName: string
  startDate: string
  endDate: string
}

export interface Root {
    employee: string
    totalBill: number
    orders: Order[]
  }
  
  export interface Order {
    _id: string
    employee: Employee
    drinks: Drink[]
    date: string
    paid: boolean
    __v: number
  }
  
  export interface Employee {
    _id: string
    role: string
  }
  
  export interface Drink {
    drinkId: DrinkId
    quantity: number
    price: number
    _id: string
  }
  
  export interface DrinkId {
    _id: string
    name: string
  }



///////////// response//////////////////

export interface respon {
  employee: string
  totalBill: number
  orders: Order[]
}

export interface Order {
  _id: string
  employee: Employee
  drinks: Drink[]
  date: string
  paid: boolean
  __v: number
}

export interface Employee {
  _id: string
  role: string
}

export interface Drink {
  drinkId: DrinkId
  quantity: number
  price: number
  _id: string
}

export interface DrinkId {
  _id: string
  name: string
}

/////////////////////order//////////
export interface Order {
  employeeName: string
  drinks: Drink[]
  date: string
}

export interface Drink {
  DrinkId: string;
  quantity: number
}


  
