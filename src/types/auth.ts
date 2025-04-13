export interface LoginRequestDTO {
    userName: string
    passWord: string
    clinicaId: number
  }
  
  export interface LoginResponseDTO {
    token: string
  }