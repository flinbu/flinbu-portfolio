<template>

    <div 
        v-if="images && images.length > 0" 
        class="image-slider__wrapper"
    >
        <hooper
            :class="`image-slider image-slider__${ratio}`"
            :settings="hooperSettings"
            @slide="onSlide"
            ref="slider"
        >
            <slide
                v-for="(image, i) in images"
                :key="`image-slider-${location}-${i}`"
                class="image-slider__item--wrapper"
            >
                <div 
                    class="image-slider__item" 
                    @click="itemClick(image)"
                >
                    <b-img-lazy
                        v-if="lazy"
                        fluid-grow
                        class="image-slider__image"
                        :src="image.image"
                    />
                    <b-img
                        v-else
                        fluid-grow
                        class="image-slider__image"
                        :src="image.image"
                    />
                    <div 
                        v-if="itemCaption(image)"
                        class="image-slider__caption" 
                        v-html="itemCaption(image)"
                    />
                </div>
            </slide>
        </hooper>

        <!-- Controls -->
        <div 
            v-if="controls"
            class="image-slider__controls"
        >
            <b-button 
                class="image-slider__control image-slider__control--prev"
                @click="prev()"
            >
                <i class="bx bx-chevron-left"/>
            </b-button>
            <b-button 
                class="image-slider__control image-slider__control--next"
                @click="next()"
            >
                <i class="bx bx-chevron-right"/>
            </b-button>
        </div>

        <!-- Pagination -->
        <ul 
            v-if="pagination"
            class="image-slider__pagination"
        >
            <li 
                v-for="pag in images.length"
                :key="pag"
                :class="`image-slider__pagination--item ${inSlide(pag - 1) ? 'active' : ''}`"
                @click="slide(pag - 1)"
            />
        </ul>

    </div>

</template>
<script>
import { 
    Hooper, 
    Slide
} from 'hooper'
export default {
    components: {
        Hooper,
        Slide
    },
    props: {
        items: {
            type: [Array, Boolean],
            default: false
        },
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
        pagination: {
            type: Boolean,
            default: true
        },
        ratio: {
            type: String,
            default: '16x9'
        },
        itemsToShow: {
            type: Number,
            default: 1
        },
        itemsToSlide: {
            type: Number,
            default: 1
        },
        autoPlay: {
            type: Boolean,
            default: true
        },
        centerMode: {
            type: Boolean,
            default: true
        },
        playSpeed: {
            type: Number,
            default: 3000
        },
        infiniteScroll: {
            type: Boolean,
            default: false
        },
        hoverPause: {
            type: Boolean,
            default: false
        },
        wheelControl: {
            type: Boolean,
            default: false
        }, 
        lazy: {
            type: Boolean,
            default: false
        },
        caption: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            slider: null,
            currentSlide: 0
        }
    },
    computed: {
        hooperSettings() {
            return {
                itemsToShow: this.itemsToShow,
                itemsToSlide: this.itemsToSlide,
                infiniteScroll: this.infiniteScroll,
                autoPlay: this.autoPlay,
                hoverPause: this.hoverPause,
                centerMode: this.centerMode,
                playSpeed: this.playSpeed,
                transition: this.interval,
                wheelControl: this.wheelControl
            }
        },
        images() {
            return this.items
        }
    },
    methods: {
        onSlide({ currentSlide, slideFrom }) {
            this.currentSlide = currentSlide
        },
        itemCaption(item) {
            if (!this.caption) return false
            return item.url ? `<a href="${item.url}" target="_blank" title="${item.title}">${item.title}</a>` : item.title
        },
        itemClick(item) {
            return item.url ? window.open(item.url) : false
        },
        next() {
            this.slider.slideNext()
        },
        prev() {
            this.slider.slidePrev()
        },
        slide(index) {
            this.slider.slideTo(index)
        },
        inSlide(slide) {
            if (this.infiniteScroll) {
                let current = this.currentSlide == this.images.length ? 0 : this.currentSlide
                return slide === current
            } else {
                return slide === current
            }
        }
    },
    mounted() {
        this.slider = this.$refs.slider
    }
}
</script>