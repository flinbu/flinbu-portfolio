<template>
    <div
        v-if="filters"
        class="portfolio__filters--wrapper"
    >
        <div 
            v-for="(filter, i) in filterOptions"
            :key="`portfolio-filter-${i}`" 
            @click="filterBy(filter)" 
            :class="`portfolio__filters--item ${value == filter ? 'active' : ''}`"
        >
            {{ filter }}
        </div>
    </div>
</template>
<script>
export default {
    props: {
        value: {
            type: String,
            default: ''
        },
        filters: {
            type: [Array, Boolean],
            default: false
        }
    },
    computed: {
        filterOptions() {
            // return this.filters.slice().reverse()
            return this.filters
        }
    },
    methods: {
        filterBy(filter) {
            this.$emit('filterBy', filter)
        }
    }
}
</script>