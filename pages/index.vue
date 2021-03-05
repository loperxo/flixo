<template>
  <div>
    <div id="scrollTo"></div>
    <!-- Header -->
    <h1 class="mt-16 text-5xl font-bold text-center">FLIXO</h1>
    <!-- Content -->
    <div class="w-full px-24 mt-16">
      <!-- Filter & Sort -->
      <div class="flex justify-center w-full">
        <div class="w-full max-w-2xl">
          <div class="flex w-full">
            <div class="relative w-4/6">
              <input
                v-model="filter"
                type="text"
                name="filter"
                placeholder="filter by title or name of director"
                class="block w-full px-4 py-2 pl-8 leading-tight text-gray-700 border border-gray-400 rounded appearance-none focus:outline-none input focus:border-gray-500"
              />
              <span class="absolute w-4 h-4" style="top: 0.7em; left: 0.5em">
                <IconSearch class="text-gray-600 fill-current" />
              </span>
              <button
                v-if="filter"
                type="button"
                class="absolute w-4 h-4 focus:outline-none hover:bg-gray-300"
                style="top: 0.7em; right: 0.5em"
                @click="filter = ''"
              >
                <IconClose class="text-gray-600 fill-current" />
              </button>
            </div>
            <div class="w-2/6 ml-4">
              <Select
                :show-label="false"
                :options="['movie', 'tv show']"
                first-option="all types"
                class="flex-auto"
                @optionchanged="type = $event"
              ></Select>
            </div>
          </div>

          <div class="w-full mt-10">
            <client-only>
              <vue-slider
                v-model="release_year"
                :min="1900"
                :max="2021"
                :dot-options="[
                  {
                    tooltip: 'always',
                  },
                  {
                    tooltip: 'always',
                  },
                ]"
              >
              </vue-slider>
            </client-only>
            <div class="flex justify-between text-sm text-gray-700">
              <span>1900</span>
              <span>filter by release date</span>
              <span>2021</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Data -->
      <div class="flex justify-between w-full mt-16 bg-gray-100 border">
        <div
          class="w-40 px-2 py-3 overflow-hidden font-semibold text-center border-r"
        >
          S/N
        </div>
        <div class="w-full px-6 py-3 font-semibold border-r">Type</div>
        <div class="w-full px-6 py-3 font-semibold border-r">Title</div>
        <div class="w-full px-6 py-3 font-semibold border-r">Director</div>
        <div class="flex justify-between w-full px-6 py-3 font-semibold">
          <div>Release Date</div>
          <div class="flex">
            <button
              v-for="(item, index) in ['ascd', 'desc']"
              :key="index"
              class="inline-block mr-4 focus:outline-none"
              type="button"
              @click="release_year_sort = item"
            >
              <IconArrow
                :class="[
                  release_year_sort === item
                    ? 'text-gray-700'
                    : 'text-gray-400',
                  item === 'desc' ? 'rotate-90' : '-rotate-90',
                ]"
                class="w-5 h-5 transform fill-current hover:text-gray-700"
              />
            </button>
          </div>
        </div>
      </div>
      <div v-if="moviesFiltered.length > 0">
        <div
          v-for="(item, index) in moviesFiltered.slice(
            paginationStartCursor,
            paginationEndCursor
          )"
          :key="index"
          class="flex justify-between w-full border border-t-0 cursor-pointer hover:text-blue-600"
        >
          <div class="w-40 px-2 py-3 text-center truncate border-r">
            {{ perPage * (currentPage - 1) + (index + 1) }}
          </div>
          <div class="w-full px-6 py-3 border-r">
            {{ item.type || '-----' }}
          </div>
          <div class="w-full px-6 py-3 border-r">
            {{ item.title || '-----' }}
          </div>
          <div class="w-full px-6 py-3 border-r">
            {{ item.director || '-----' }}
          </div>
          <div class="w-full px-6 py-3">{{ item.release_year || '-----' }}</div>
        </div>
      </div>
      <div
        v-else
        class="w-full py-24 text-2xl text-center text-red-500 border border-t-0"
      >
        No Match Found
      </div>
    </div>
    <!-- Pagination Bar  -->
    <div class="sticky bottom-0 flex justify-center w-full mt-16">
      <div class="z-10 w-full max-w-md py-8 bg-white">
        <Paginate
          :total-pages="totalPages"
          :total="moviesFiltered.length"
          :per-page="perPage"
          :current-page="currentPage"
          @pagechanged="onPageChange"
        ></Paginate>
      </div>
    </div>
  </div>
</template>

<script>
import data from '@/utils/data.json'
import IconSearch from '@/components/icons/IconSearch'
import IconArrow from '@/components/icons/IconArrow'
import IconClose from '@/components/icons/IconClose'
import Select from '@/components/form/Select'
import Paginate from '@/components/Paginate'

export default {
  components: {
    IconSearch,
    IconArrow,
    IconClose,
    Select,
    Paginate,
  },
  data() {
    return {
      filter: '',
      type: '',
      movies: [],
      release_year: [1900, 2021],
      release_year_sort: 'desc',
      perPage: 30,
      currentPage: 1,
    }
  },
  computed: {
    paginationStartCursor() {
      let currentPage = 1
      if (!this.filter) currentPage = this.currentPage
      return (currentPage - 1) * this.perPage
    },
    paginationEndCursor() {
      return this.paginationStartCursor + this.perPage
    },
    totalPages() {
      const totalLength = this.moviesFiltered.length
      const remainder = totalLength % this.perPage
      let totalPages = parseInt(totalLength / this.perPage)
      if (remainder) totalPages = totalPages + 1
      return totalPages
    },
    moviesFiltered() {
      const movies = data
      const filteredMovies = movies
        .filter((item) => {
          if (this.filter) {
            return (item.director + ' ' + item.title)
              .toLowerCase()
              .includes(this.filter.toLowerCase())
          } else return item
        })
        .filter((item) => {
          if (this.type)
            return item.type.toLowerCase() === this.type.toLowerCase()
          else return item
        })
        .filter((item) => {
          return (
            this.release_year[0] <= item.release_year &&
            item.release_year <= this.release_year[1]
          )
        })
        .sort((a, b) => {
          if (this.release_year_sort === 'desc')
            return b.release_year - a.release_year
          else return a.release_year - b.release_year
        })

      return filteredMovies
    },
  },
  methods: {
    onPageChange(page) {
      this.currentPage = page

      document.getElementById('scrollTo').scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    },
  },
}
</script>
