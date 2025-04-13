<template>
  <aside class="w-64 bg-blue-900 text-white p-4 space-y-4 h-screen">
    <h1 class="text-xl font-bold">clinicAdmin</h1>
    <nav>
      <ul class="space-y-2">
        <li><router-link to="/dashboard" class="block hover:underline">Dashboard</router-link></li>
        <li><router-link to="/pacientes" class="block hover:underline">Pacientes</router-link></li>
        <li><router-link to="/" class="block hover:underline">Sair</router-link></li>
      </ul>
    </nav>
  </aside>
</template>