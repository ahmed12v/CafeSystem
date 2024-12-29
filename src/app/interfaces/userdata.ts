export interface userdata {
    data: Data
  }
  
  export interface Data {
    _id: string
    name: string
    email: string
    password: string
    role: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  export interface UpdatUserD {
    
    name: string;
    email: string;
   
  }
  export interface UpdatUserPass {
    
    currentPassword:string;
    password:string;
    passwordConfirm:string;
}
   
  
  
