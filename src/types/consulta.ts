export interface ConsultaRequestDTO {
    dataConsulta: string // YYYY-MM-DD
    horarioConsulta: string // HH:mm
    medicoID: number
    pacienteID: number
    nomePaciente: string
    especialidade: string
  }
  
  export interface ConsultaResponseDTO {
    id: number
    dataConsulta: string
    horarioConsulta: string
    medico: string
    paciente: string
    especialidade: string
    status: string
  }
  