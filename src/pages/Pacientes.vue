<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-blue-900">Pacientes</h2>
      <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" @click="abrirModalNovo">
        Novo Paciente
      </button>
    </div>

    <LoadingSpinner v-if="isLoading" />

    <table class="min-w-full bg-white shadow rounded overflow-hidden">
      <thead class="bg-blue-900 text-white">
        <tr>
          <th class="text-left px-4 py-2">Nome</th>
          <th class="text-left px-4 py-2">CPF</th>
          <th class="text-left px-4 py-2">Email</th>
          <th class="text-left px-4 py-2">Telefone</th>
          <th class="text-left px-4 py-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="paciente in pacientes" :key="paciente.cpf" class="border-t">
          <td class="px-4 py-2">{{ paciente.nome }}</td>
          <td class="px-4 py-2">{{ paciente.cpf }}</td>
          <td class="px-4 py-2">{{ paciente.email }}</td>
          <td class="px-4 py-2">{{ paciente.telefonePrimario }}</td>
          <td class="px-4 py-2">
            <button class="text-sm text-blue-600 hover:underline" @click="abrirModalEditar(paciente)">
              Editar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Cadastro/Edição -->
    <PacienteModal v-if="modalVisivel" :modo="modoModal" :paciente="pacienteSelecionado" @fechar="fecharModal"
      @salvo="carregarPacientes" />

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { buscarPacientes } from '../service/pacienteService'
import type { PacienteResponseDTO } from '../types/paciente'
import PacienteModal from '../components/PacienteModal.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'


const pacientes = ref<PacienteResponseDTO[]>([])
const modalVisivel = ref(false)
const pacienteSelecionado = ref<PacienteResponseDTO | null>(null)
const modoModal = ref<'novo' | 'editar'>('novo')

const abrirModalNovo = () => {
  modoModal.value = 'novo'
  pacienteSelecionado.value = null
  modalVisivel.value = true
}

const abrirModalEditar = (paciente: PacienteResponseDTO) => {
  modoModal.value = 'editar'
  pacienteSelecionado.value = paciente
  modalVisivel.value = true
}

const fecharModal = () => {
  modalVisivel.value = false
}

const isLoading = ref(false)

const carregarPacientes = async () => {
  isLoading.value = true
  try {
    const data = await buscarPacientes()
    pacientes.value = data
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  carregarPacientes()
})


</script>
