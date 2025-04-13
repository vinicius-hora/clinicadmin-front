<template>
    <div class="flex h-screen">
      <Sidebar />
  
      <div class="flex-1 flex flex-col">
        <header class="bg-white shadow px-6 py-4 flex items-center justify-between">
          <h1 class="text-xl font-semibold text-blue-900">clinicAdmin</h1>
          <button @click="logout" class="text-sm text-red-600 hover:underline">Sair</button>
        </header>
  
        <main class="flex-1 bg-gray-50 p-6 overflow-y-auto">
          <router-view />
        </main>
      </div>
    </div>
  </template>
  
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router'
  import Sidebar from '../components/Sidebar.vue'
  
  const router = useRouter()
  
  const logout = () => {
    localStorage.removeItem('token')
    router.push('/')
  }
  </script>
  