<template>
  <aside class="w-64 bg-blue-900 text-white p-4 space-y-4 h-screen">
    <h1 class="text-xl font-bold">clinicAdmin</h1>
    <nav>
      <ul class="space-y-2">
        <li v-if="role !== 'MEDICO'">
          <router-link to="/dashboard" class="block hover:underline">Dashboard</router-link>
        </li>
        <li v-if="role !== 'MEDICO'">
          <router-link to="/pacientes" class="block hover:underline">Pacientes</router-link>
        </li>
        <li v-if="role !== 'MEDICO'">
          <router-link to="/medicos" class="block hover:underline">Medicos</router-link>
        </li>
        <li v-if="role !== 'MEDICO'">
          <router-link to="/consultas" class="block hover:underline">Consultas</router-link>
        </li>
        <li v-if="role === 'MEDICO'">
          <router-link to="/consultas-medico" class="block hover:underline">Minhas Consultas</router-link>
        </li>
        <li>
          <router-link to="/" class="block hover:underline">Sair</router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { UsuarioLogadoDTO } from '../types/auth'

const rawUser = localStorage.getItem('usuario')
const usuario: UsuarioLogadoDTO = rawUser ? JSON.parse(rawUser) : {} as UsuarioLogadoDTO
const role = computed(() => usuario?.role)
</script>