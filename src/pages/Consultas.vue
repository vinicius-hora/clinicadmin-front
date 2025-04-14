<template>
    <div>
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-blue-900">Consultas</h2>
        <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" @click="abrirModalNova">
          Nova Consulta
        </button>
      </div>
  
      <LoadingSpinner v-if="isLoading" />
  
      <table class="min-w-full bg-white shadow rounded overflow-hidden">
        <thead class="bg-blue-900 text-white">
          <tr>
            <th class="text-left px-4 py-2">Data</th>
            <th class="text-left px-4 py-2">Horário</th>
            <th class="text-left px-4 py-2">Médico</th>
            <th class="text-left px-4 py-2">Paciente</th>
            <th class="text-left px-4 py-2">Especialidade</th>
            <th class="text-left px-4 py-2">Status</th>
            <th class="text-left px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="consulta in consultas" :key="consulta.id" class="border-t">
            <td class="px-4 py-2">{{ consulta.dataConsulta }}</td>
            <td class="px-4 py-2">{{ consulta.horarioConsulta }}</td>
            <td class="px-4 py-2">{{ consulta.medico }}</td>
            <td class="px-4 py-2">{{ consulta.paciente }}</td>
            <td class="px-4 py-2">{{ consulta.especialidade }}</td>
            <td class="px-4 py-2">{{ consulta.status }}</td>
            <td class="px-4 py-2 space-x-2">
              <button class="text-sm text-blue-600 hover:underline" @click="abrirModalEditar(consulta)">Editar</button>
              <button class="text-sm text-red-600 hover:underline" @click="excluirConsulta(consulta.id)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <ConsultaModal
        v-if="modalVisivel"
        :modo="modoModal"
        :consulta="consultaSelecionada"
        @fechar="fecharModal"
        @salvo="carregarConsultas"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import type { ConsultaResponseDTO } from '../types/consulta.ts'
  import { buscarConsultas, excluirConsultaPorId } from '../service/consultaService.js'
  import ConsultaModal from '../components/ConsultaModal.vue'
  import LoadingSpinner from '../components/LoadingSpinner.vue'
  
  const consultas = ref<ConsultaResponseDTO[]>([])
  const isLoading = ref(false)
  const modalVisivel = ref(false)
  const modoModal = ref<'novo' | 'editar'>('novo')
  const consultaSelecionada = ref<ConsultaResponseDTO | null>(null)
  
  const carregarConsultas = async () => {
    isLoading.value = true
    try {
      consultas.value = await buscarConsultas()
    } finally {
      isLoading.value = false
    }
  }
  
  const abrirModalNova = () => {
    modoModal.value = 'novo'
    consultaSelecionada.value = null
    modalVisivel.value = true
  }
  
  const abrirModalEditar = (consulta: ConsultaResponseDTO) => {
    modoModal.value = 'editar'
    consultaSelecionada.value = consulta
    modalVisivel.value = true
  }
  
  const fecharModal = () => {
    modalVisivel.value = false
  }
  
  const excluirConsulta = async (id: number) => {
    if (confirm('Deseja realmente excluir esta consulta?')) {
      await excluirConsultaPorId(id)
      await carregarConsultas()
    }
  }
  
  onMounted(carregarConsultas)
  </script>
  