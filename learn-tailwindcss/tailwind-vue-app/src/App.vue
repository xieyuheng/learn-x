<template>
  <div>
    <div class="flex m-3 text-2xl justify-evenly">
      <router-link to="/hello">Hello</router-link>
      <router-link to="/about">About</router-link>
    </div>

    <router-view />
  </div>
</template>
