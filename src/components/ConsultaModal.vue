<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg w-full max-w-2xl">
        <h2 class="text-xl font-semibold text-blue-900 mb-4">
          {{ modo === 'novo' ? 'Nova Consulta' : 'Editar Consulta' }}
        </h2>
        <form @submit.prevent="salvar">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input v-model="form.dataConsulta" type="date" class="input" required />
            <input v-model="form.horarioConsulta" type="time" class="input" required />
  
            <div>
              <input v-model="buscaMedico" type="text" placeholder="Buscar médico" class="input" @input="dispararBuscaMedico" />
              <div class="text-sm text-gray-500 mt-1 space-x-4">
                <label><input type="radio" v-model="tipoBuscaMedico" value="especialidade" /> Especialidade</label>
                <label><input type="radio" v-model="tipoBuscaMedico" value="nome" /> Nome</label>
                <label><input type="radio" v-model="tipoBuscaMedico" value="cpf" /> CPF</label>
              </div>
              <ul v-if="medicosFiltrados.length" class="border rounded bg-white mt-1 max-h-32 overflow-y-auto">
                <li v-for="med in medicosFiltrados" :key="med.id" class="p-2 hover:bg-gray-100 cursor-pointer" @click="selecionarMedico(med)">
                  {{ med.nome }} ({{ med.cpf }})
                </li>
              </ul>
            </div>
  
            <div>
              <input v-model="buscaPaciente" type="text" placeholder="Buscar paciente" class="input" @input="dispararBuscaPaciente" />
              <div class="text-sm text-gray-500 mt-1 space-x-4">
                <label><input type="radio" v-model="tipoBuscaPaciente" value="nome" /> Nome</label>
                <label><input type="radio" v-model="tipoBuscaPaciente" value="cpf" /> CPF</label>
              </div>
              <ul v-if="pacientesFiltrados.length" class="border rounded bg-white mt-1 max-h-32 overflow-y-auto">
                <li v-for="pac in pacientesFiltrados" :key="pac.id" class="p-2 hover:bg-gray-100 cursor-pointer" @click="selecionarPaciente(pac)">
                  {{ pac.nome }} ({{ pac.cpf }})
                </li>
              </ul>
            </div>
  
            <input v-model="form.especialidade" type="text" placeholder="Especialidade" class="input" required />
            <input v-model="form.nomePaciente" type="text" placeholder="Nome do paciente avulso (opcional)" class="input" />
          </div>
  
          <div class="flex justify-end mt-6 gap-4">
            <button type="button" class="text-sm text-gray-600 hover:underline" @click="cancelar">Cancelar</button>
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, watch, computed } from 'vue'
  import type { ConsultaRequestDTO, ConsultaResponseDTO } from '../types/consulta'
  import type { PacienteResponseDTO } from '../types/paciente'
  import { salvarConsulta, atualizarConsulta } from '../service/consultaService'
  import { buscarMedicosPorEspecialidade, buscarMedicosPorNome, buscarMedicosPorCpf } from '../service/medicoService'
  import { buscarPacientesPorNome, buscarPacientesPorCpf } from '../service/pacienteService'
  
  const props = defineProps<{
    modo: 'novo' | 'editar'
    consulta: ConsultaResponseDTO | null
  }>()
  
  const emit = defineEmits(['fechar', 'salvo'])
  
  const form = reactive<ConsultaRequestDTO>({
    dataConsulta: '',
    horarioConsulta: '',
    medicoID: 0,
    pacienteID: 0,
    nomePaciente: '',
    especialidade: ''
  })
  
  const tipoBuscaMedico = ref<'especialidade' | 'nome' | 'cpf'>('especialidade')
  const buscaMedico = ref('')
  const medicos = ref<any[]>([])
  
  const tipoBuscaPaciente = ref<'nome' | 'cpf'>('nome')
  const buscaPaciente = ref('')
  const pacientes = ref<PacienteResponseDTO[]>([])
  
  const dispararBuscaMedico = async () => {
    if (buscaMedico.value.length < 3) return
    try {
      if (tipoBuscaMedico.value === 'especialidade') {
        medicos.value = await buscarMedicosPorEspecialidade(buscaMedico.value)
      } else if (tipoBuscaMedico.value === 'nome') {
        medicos.value = await buscarMedicosPorNome(buscaMedico.value)
      } else if (tipoBuscaMedico.value === 'cpf') {
        medicos.value = await buscarMedicosPorCpf(buscaMedico.value)
      }
    } catch (err) {
      medicos.value = []
    }
  }
  
  const dispararBuscaPaciente = async () => {
    if (buscaPaciente.value.length < 3) return
    try {
      if (tipoBuscaPaciente.value === 'nome') {
        pacientes.value = await buscarPacientesPorNome(buscaPaciente.value)
      } else if (tipoBuscaPaciente.value === 'cpf') {
        pacientes.value = await buscarPacientesPorCpf(buscaPaciente.value)
      }
    } catch (err) {
      pacientes.value = []
    }
  }
  
  const medicosFiltrados = computed(() => medicos.value)
  const pacientesFiltrados = computed(() => pacientes.value)
  
  const selecionarMedico = (med: { id: number, nome: string }) => {
    form.medicoID = med.id
    buscaMedico.value = med.nome
  }
  
  const selecionarPaciente = (pac: { id: number, nome: string }) => {
    form.pacienteID = pac.id
    buscaPaciente.value = pac.nome
  }
  
  watch(() => props.consulta, (value) => {
    if (value && props.modo === 'editar') {
      Object.assign(form, {
        dataConsulta: value.dataConsulta,
        horarioConsulta: value.horarioConsulta,
        especialidade: value.especialidade,
        nomePaciente: value.paciente,
      })
    }
  }, { immediate: true })
  
  const limparCampos = () => {
    form.dataConsulta = ''
    form.horarioConsulta = ''
    form.medicoID = 0
    form.pacienteID = 0
    form.nomePaciente = ''
    form.especialidade = ''
    buscaMedico.value = ''
    buscaPaciente.value = ''
    medicos.value = []
    pacientes.value = []
  }
  
  const cancelar = () => {
    limparCampos()
    emit('fechar')
  }
  
  const salvar = async () => {
    if (!form.medicoID || !form.pacienteID) {
      alert('Selecione um médico e um paciente antes de salvar.')
      return
    }
    try {
      if (props.modo === 'novo') {
        await salvarConsulta(form)
      } else if (props.consulta) {
        await atualizarConsulta(props.consulta.id, form)
      }
      emit('salvo')
      limparCampos()
      emit('fechar')
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Erro ao salvar consulta')
    }
  }
  </script>
  
  <style scoped>
  .input {
    @apply w-full px-4 py-2 border border-gray-300 rounded;
  }
  </style>
  