<template>
    <b-carousel 
        v-if="location" 
        class="image-slider"
        :interval="interval"
        :background="background"
        :controls="controls"
        :indicators="indicators"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
    >
        <b-carousel-slide
            v-for="(item, i) in images"
            :key="i"
            :img-src="item.image"
            :caption-html="itemCaption(item)"
        />
    </b-carousel>
</template>
<script>
export default {
    props: {
        location: {
            type: String,
            default: ''
        },
        interval: {
            type: Number,
            default: 4000
        },
        controls: {
            type: Boolean,
            default: true
        },
        indicators: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            slide: 0,
            sliding: null,
            background: '#F8F8F9',
            imgProps: {
                center: true,
                fluidGrow: true
            }
        }
    },
    computed: {
        images() {
            let images = []
            switch (this.location) {
                case 'ux':
                    images = this.$static.posts.edges.slice(0, 4).map( edge => {
                        return edge.node
                    })
            }
            return images
        }
    },
    methods: {
        onSlideStart(slide) {
            this.sliding = true
        },
        onSlideEnd(slide) {
            this.sliding = false
        },
        itemCaption(item) {
            return `<a href="${item.url}" target="_blank" title="${item.title}">${item.title}</a>`
        }
    },
    mounted() {
        let schemeCookie = this.$cookies.get('color-scheme')
        this.background = schemeCookie ? schemeCookie == 'dark' ? '#181818' : '#F8F8F9' : '#F8F8F9'
        this.$root.$on('scheme', scheme => {
            this.background = scheme == 'dark' ? '#181818' : '#F8F8F9'
        })
    }
}
</script>
<static-query>
query Dribbble {
    posts: allDribbble(order: ASC) {
        edges {
            node {
                title
                image
                description
                url
            }
        }
    }
}
</static-query>