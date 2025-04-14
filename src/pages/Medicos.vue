<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-blue-900">Médicos</h2>
      <button
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        @click="abrirModalNovo"
      >
        Novo Médico
      </button>
    </div>

    <LoadingSpinner v-if="isLoading" />

    <table class="min-w-full bg-white shadow rounded overflow-hidden">
      <thead class="bg-blue-900 text-white">
        <tr>
          <th class="text-left px-4 py-2">Nome</th>
          <th class="text-left px-4 py-2">CPF</th>
          <th class="text-left px-4 py-2">Email</th>
          <th class="text-left px-4 py-2">Especialidade</th>
          <th class="text-left px-4 py-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="medico in medicos" :key="medico.cpf" class="border-t">
          <td class="px-4 py-2">{{ medico.nome }}</td>
          <td class="px-4 py-2">{{ medico.cpf }}</td>
          <td class="px-4 py-2">{{ medico.email }}</td>
          <td class="px-4 py-2">{{ medico.especialidade }}</td>
          <td class="px-4 py-2">
            <button
              class="text-sm text-blue-600 hover:underline"
              @click="abrirModalEditar(medico)"
            >
              Editar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <MedicoModal
      v-if="modalVisivel"
      :modo="modoModal"
      :medico="medicoSelecionado"
      @fechar="fecharModal"
      @salvo="carregarMedicos"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { buscarMedicos } from '../service/medicoService.js'
import type { MedicoResponseDTO } from '../types/medico.ts'
import MedicoModal from '../components/MedicoModal.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const medicos = ref<MedicoResponseDTO[]>([])
const modalVisivel = ref(false)
const modoModal = ref<'novo' | 'editar'>('novo')
const medicoSelecionado = ref<MedicoResponseDTO | null>(null)
const isLoading = ref(false)

const carregarMedicos = async () => {
  isLoading.value = true
  try {
    const data = await buscarMedicos()
    medicos.value = data
  } finally {
    isLoading.value = false
  }
}

const abrirModalNovo = () => {
  modoModal.value = 'novo'
  medicoSelecionado.value = null
  modalVisivel.value = true
}

const abrirModalEditar = (medico: MedicoResponseDTO) => {
  modoModal.value = 'editar'
  medicoSelecionado.value = medico
  modalVisivel.value = true
}

const fecharModal = () => {
  modalVisivel.value = false
}

onMounted(carregarMedicos)
</script>