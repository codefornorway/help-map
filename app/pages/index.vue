<template>
  <div class="flex flex-col lg:flex-row h-screen">
    <aside class="lg:w-1/5 w-full bg-white z-10 shadow-lg overflow-y-auto">
      <LocationList />
    </aside>
    <div class="flex-1 h-full relative">
      <MapView />
    </div>
  </div>
</template>
