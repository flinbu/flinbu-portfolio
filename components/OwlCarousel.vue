<template>
    <client-only>
        <carousel 
            v-if="content && content.length > 0" 
            class="owl-carousel__wrapper carousel"
            :items="items"
            :margin="margin"
            :loop="loop"
            :center="center"
            :nav="nav"
            :autoplay="autoplay"
            :autoplay-speed="autoplaySpeed"
            :rewind="rewind"
            :mouse-drag="mouseDrag"
            :touch-drag="touchDrag"
            :pull-drag="pullDrag"
            :free-drag="freeDrag"
            :stage-padding="stagePadding"
            :auto-width="autoWidth"
            :auto-height="lazy ? lazy : autoHeight"
            :dots="dots"
            :autoplay-timeout="autoplayTimeout"
            :autoplay-hover-pause="autoplayHoverPause"
            :responsive="responsive"
        >
            <div v-for="(item, i) in content" :key="`item-${i}`" @click="itemClick ? goTo(item.url) : ''">
                <lazy-image
                    v-if="lazy"
                    :src="item.image"
                    :placeholder="item.placeholder ? item.placeholder : ''"
                    fluid-grow
                /> 
                <b-img
                    v-else
                    :src="item.image"
                    fluid-grow
                /> 
            </div>

            <!-- Nav -->
            <template v-if="showNav" slot="prev">
                <span class="carousel__nav carousel__nav--prev">
                    <icon name="chevron-left" size="md"/>
                </span>
            </template>o
            <template v-if="showNav" slot="next">
                <span class="carousel__nav carousel__nav--next">
                    <icon name="chevron-right" size="md"/>
                </span>
            </template>
        </carousel>
    </client-only>
</template>
<script>
import carousel from 'vue-owl-carousel'
export default {
    components: {
        carousel
    },
    props: {
        content: {
            type: Array,
            default: () => []
        },
        items: {
            type: Number,
            default: 1
        },
        margin: {
            type: Number,
            default: 0
        },
        loop: {
            type: Boolean,
            default: false
        },
        center: {
            type: Boolean,
            default: false
        },
        nav: {
            type: Boolean,
            default: false
        },
        autoplay: {
            type: Boolean,
            default: false
        },
        autoplaySpeed: {
            type: [Number, Boolean],
            default: false
        },
        rewind: {
            type: Boolean,
            default: false
        },
        mouseDrag: {
            type: Boolean,
            default: true
        },
        touchDrag: {
            type: Boolean,
            default: true
        },
        pullDrag: {
            type: Boolean,
            default: true
        },
        freeDrag: {
            type: Boolean,
            default: false
        },
        stagePadding: {
            type: Number,
            default: 0
        },
        autoWidth: {
            type: Boolean,
            default: false
        },
        autoHeight: {
            type: Boolean,
            default: false
        },
        dots: {
            type: Boolean,
            default: true
        },
        autoplayTimeout: {
            type: Number,
            default: 5000
        },
        autoplayHoverPause: {
            type: Boolean,
            default: false
        },
        showNav: {
            type: Boolean,
            default: false
        },
        lazy: {
            type: Boolean,
            default: false
        },
        itemClick: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        responsive() {
            return {}
        }
    },
    methods: {
        goTo(link) {
            if(link) this.$router.push(link)
        }
    }
}
</script>