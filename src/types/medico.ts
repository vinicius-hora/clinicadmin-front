export interface MedicoRequestDTO {
    nome: string
    cpf: string
    email: string
    telefone: string
    especialidade: string
    registro: string
    username: string
    password: string
}

export interface MedicoResponseDTO {
    id: number
    nome: string
    cpf: string
    email: string
    telefone: string
    especialidade: string
    registro: string
}