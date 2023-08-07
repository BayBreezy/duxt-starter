<template>
  <div>
    <header class="z-20 border-b bg-background/80">
      <div class="container flex h-16 items-center justify-between">
        <NuxtLink to="/" class="text-lg font-bold">My UI</NuxtLink>
        <div class="flex items-center">
          <!-- Dropdown used to switch themes -->
          <UIDropdown :items="themes" placement="bottom-end" width="w-[140px]">
            <UIButton size="icon-sm" variant="outline"
              ><Icon :name="themeIcon" class="h-[18px] w-[18px]"
            /></UIButton>
          </UIDropdown>
        </div>
      </div>
    </header>
    <main class="container grid lg:grid-cols-5">
      <!-- Side nav  -->
      <aside
        class="hidden h-[calc(100dvh-65px)] shrink-0 overflow-y-auto border-r bg-background pb-12 scrollbar-thin scrollbar-thumb-accent scrollbar-thumb-rounded-full lg:block"
      >
        <!-- Loop over nav items -->
        <div class="px-3 py-2">
          <template v-for="(item, i) in nav" :key="i">
            <h3 v-if="item.heading" class="mb-3 mt-5 text-lg font-semibold first:mt-3">
              {{ item.heading }}
            </h3>
            <div v-else class="flex flex-col">
              <UIButton class="mb-2 h-9 justify-start gap-3 px-3" variant="ghost">
                <Icon class="h-5 w-5 text-muted-foreground" :name="item.icon" v-if="item.icon" />
                <span>{{ item.text }}</span>
              </UIButton>
            </div>
          </template>
        </div>
      </aside>
      <div class="lg:col-span-4">
        <section class="container py-5">
          <div class="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <!-- Tabs used to switch current section -->
            <UITabs @change="sectionIndex = $event">
              <template #tab>
                <div class="flex items-center rounded-md bg-muted p-1">
                  <UITab type="fill">Music</UITab>
                  <UITab type="fill">Podcasts</UITab>
                  <UITab type="fill" disabled>Live</UITab>
                </div>
              </template>
            </UITabs>
            <!-- Add music button -->
            <UITooltip content="Add new music to listen to!" :arrow="5">
              <UIButton><Icon name="heroicons:plus-circle" class="h-5 w-5" /> Add music</UIButton>
            </UITooltip>
          </div>

          <!-- Fade transition for sections- Note the key for group transitions -->
          <TransitionFade group mode="out-in">
            <section key="section-1" v-if="sectionIndex == 0">
              <h1 class="text-2xl font-semibold">Listen Now</h1>
              <p class="mt-2 text-sm text-muted-foreground">Top picks for you. Updated daily.</p>
            </section>
            <section key="section-2" v-if="sectionIndex == 1">
              <h1 class="text-2xl font-semibold">New Episodes</h1>
              <p class="mt-2 text-sm text-muted-foreground">
                Your favorite podcasts. Updated daily.
              </p>
            </section>
          </TransitionFade>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
  const mode = useColorMode();

  const themes = [
    {
      label: "Light",
      icon: "heroicons:sun",
      onClick: () => {
        mode.value = "light";
      },
    },
    {
      label: "Dark",
      icon: "heroicons:moon",
      onClick: () => {
        mode.value = "dark";
      },
    },
    {
      label: "System",
      icon: "heroicons:computer-desktop",
      onClick: () => {
        mode.value = "auto";
      },
    },
  ];

  const themeIcon = computed(() => {
    switch (mode.value) {
      case "light":
        return "heroicons:sun";
      case "dark":
        return "heroicons:moon";
      case "auto":
        return "heroicons:computer-desktop";
    }
  });

  const sectionIndex = ref(0);

  const nav = [
    { heading: "Discover" },
    { text: "Listen Now", icon: "heroicons:play-circle" },
    { text: "Browse", icon: "heroicons:squares-2x2" },
    { text: "Radio", icon: "heroicons:radio" },
    { heading: "Library" },
    { text: "Playlist", icon: "heroicons:list-bullet" },
    { text: "Songs", icon: "heroicons:musical-note" },
    { text: "Made for You", icon: "heroicons:user" },
    { text: "Artists", icon: "heroicons:microphone" },
    { text: "Albums", icon: "heroicons:book-open" },
    { heading: "Playlists" },
    { text: "Recently Added", icon: "heroicons:musical-note" },
    { text: "Bedtime Beats", icon: "heroicons:musical-note" },
    { text: "Feeling Happy", icon: "heroicons:musical-note" },
    { text: "Mellow Days", icon: "heroicons:musical-note" },
    { text: "Slim Shady", icon: "heroicons:musical-note" },
  ];
</script>
