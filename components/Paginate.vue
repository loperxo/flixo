<template>
  <ul class="flex items-center justify-center">
    <li :class="{ 'cursor-pointer': !isInFirstPage }" class="mr-2">
      <a
        :class="[
          isInFirstPage
            ? 'text-gray-400 cursor-not-allowed'
            : '  cursor-pointer hover:bg-blue-100',
        ]"
        class="px-3 py-1 rounded"
        @click="onClickPreviousPage"
      >
        «
        <span class="capitalize">Back</span>
      </a>
    </li>

    <li v-for="(page, index) in pages" :key="index" class="mx-1 cursor-pointer">
      <a
        :class="[
          isPageActive(page.name)
            ? '  bg-blue-500 text-white '
            : 'bg-white  hover:bg-blue-100 ',
        ]"
        class="px-3 py-1 rounded"
        @click="onClickPage(page.name)"
      >
        {{ page.name }}
      </a>
    </li>

    <li :class="{ 'cursor-pointer': !isInLastPage }" class="ml-2">
      <a
        :class="[
          isInLastPage
            ? 'text-gray-400 cursor-not-allowed'
            : '  cursor-pointer hover:bg-blue-100 ',
        ]"
        class="px-3 py-1 rounded"
        @click="onClickNextPage"
      >
        <span class="capitalize">Next</span>
        »
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 5,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },

  computed: {
    startPage() {
      return 1
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      )
    },
    pages() {
      const range = []
      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        })
      }

      if (this.currentPage > 5) {
        const rangeLastEle = range.length - 1
        range[rangeLastEle] = {
          name: this.currentPage,
          isDisabled: false,
        }
      }
      return range
    },
    isInFirstPage() {
      return this.currentPage === 1
    },
    isInLastPage() {
      return this.currentPage === this.totalPages
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1)
    },
    onClickPreviousPage() {
      if (this.isInFirstPage) return
      this.$emit('pagechanged', this.currentPage - 1)
    },
    onClickPage(page) {
      this.$emit('pagechanged', page)
    },
    onClickNextPage() {
      if (this.isInLastPage) return
      this.$emit('pagechanged', this.currentPage + 1)
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages)
    },
    isPageActive(page) {
      return this.currentPage === page
    },
  },
}
</script>
