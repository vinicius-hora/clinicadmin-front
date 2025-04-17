export interface LoginRequestDTO {
  userName: string
  passWord: string
  clinicaId: number
}

export interface LoginResponseDTO {
  token: string
}

export interface UsuarioLogadoDTO {
  loginID: number
  username: string
  clinicaID: number
  role: string
}