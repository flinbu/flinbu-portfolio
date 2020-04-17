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
        >
            <template v-slot:img>
                <img 
                    class="d-block img-fluid w-100"
                    :src="`assets/images/${item}.jpg`"
                    :srcset="`assets/images/${item}.jpg 1x, assets/images/${item}@2x.jpg 2x`"
                />
            </template>
        </b-carousel-slide>
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
            sliding: null
        }
    },
    computed: {
        background() {
            let scheme = this.$cookies.get('color-scheme')
            let bgColor = scheme ? scheme == 'dark' ? '#181818' : '#F9F9F9' : '#F9F9F9'
            return bgColor
        },
        images() {
            let images = []
            switch (this.location) {
                case 'ux':
                    images = [
                        'mon-1',
                        'referrals',
                        'marketplace',
                        'flinbu',
                        'wesend',
                        'payment',
                    ]
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
        }
    }
}
</script>