<template>
  <div>
    <div class="relative inline-block w-full cursor-pointer">
      <div class="">
        <select
          class="flex w-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-400 rounded appearance-none cursor-pointer hover:border-gray-500 focus:outline-none"
          @change="onSelectChange($event)"
        >
          <option v-if="firstOption" value="" selected>
            {{ firstOption }}
          </option>
          <option
            v-for="(option, index) in options"
            :key="index"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
        <div
          class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none"
        >
          <svg
            class="w-4 h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      required: false,
      type: Array,
      default: () => [],
    },
    firstOption: {
      required: false,
      type: String,
      default: '',
    },
  },

  methods: {
    onSelectChange(event) {
      this.$emit('optionchanged', event.target.value)
    },
  },
}
</script>
