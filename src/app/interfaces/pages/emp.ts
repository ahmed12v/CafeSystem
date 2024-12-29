/////////////// get ////////////////////
export interface Emp {
    result: number
    data: EmpData[]
  }
  
  export interface EmpData {
    _id: string
    name: string
    role: string
    __v: number
  }

  ///////////////// add /////////////////
  export interface Addemp {
    date: add
  }
  
  export interface add {
    name: string
    role: string
    _id: string
    __v: number
  }

  export interface postEmp{

    name: string
    role: string
  } 
///////////////////////////////////////////  
  
