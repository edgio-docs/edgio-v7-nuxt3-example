<template>
  <div class="flex w-full flex-col">
    <h2 class="font-light text-[#FFFFFF75] text-md">Relevance</h2>
    <a
      :key="item.filter"
      v-for="item in relevance"
      @click="pushFilter(item.filter)"
      class="text-md mt-2 cursor-pointer"
      :class="{
        'font-medium text-[#FFFFFF]': $route.query.filter === item.filter,
        'font-light text-[#FFFFFF75]': $route.query.filter !== item.filter,
      }"
    >
      {{ item.name }}
    </a>
    <NuxtLink
      to="/commerce"
      class="text-md mt-7"
      :class="{ 'font-medium text-[#FFFFFF]': $route.path === '/commerce', 'font-light text-[#FFFFFF75]': $route.path !== '/commerce' }"
    >
      Shop All
    </NuxtLink>
    <NuxtLink
      :key="item.slug"
      class="text-md mt-2"
      v-for="item in listingItems"
      :to="`/commerce/${item.slug}`"
      :class="{
        'font-medium text-[#FFFFFF]': $route.path === `/commerce/${item.slug}`,
        'font-light text-[#FFFFFF75]': $route.path !== `/commerce/${item.slug}`,
      }"
    >
      {{ item.name }}
    </NuxtLink>
    <NuxtLink
      :key="index"
      to="/commerce"
      v-for="(item, index) in fallbackListingItems"
      class="mt-2 text-md px-10 animate-pulse bg-white/50 py-1.5 w-[10px]"
    ></NuxtLink>
  </div>
</template>

<script>
export default {
  methods: {
    pushFilter(filter) {
      this.$router.push({ path: this.$route.path, query: { filter } })
    },
  },
  data: () => {
    return {
      relevance: [
        {
          name: 'Trending',
          filter: 'trending',
        },
        {
          name: 'Price: Low to High',
          filter: 'price-low-to-high',
        },
        {
          name: 'Price: High to Low',
          filter: 'price-high-to-low',
        },
      ],
      listingItems: [],
      fallbackListingItems: new Array(9).fill(0),
    }
  },
  async mounted() {
    let resp = await fetch('/edgio-api/categories/all')
    if (resp.ok) {
      let data = await resp.json()
      this.listingItems = data
      this.fallbackListingItems = []
    }
  },
}
</script>