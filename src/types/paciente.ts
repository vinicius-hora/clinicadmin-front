// DTOs para uso no frontend

export interface PacienteResponseDTO {
    id: number
    nome: string
    cpf: string
    email: string
    telefonePrimario: string
    telefoneSecundario: string
  }
  
  export interface PacienteRequestDTO {
    nome: string
    cpf: string
    email: string
    telefonePrimario: string
    telefoneSecundario: string
    logradouro: string
    numero: string
    complemento: string
    bairro: string
    cidade: string
    estado: string
    cep: string
  }
  