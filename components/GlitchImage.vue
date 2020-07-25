<template>
    <div 
        class="glitch__wrapper" 
        :id="`glitchContainer-${this._uid}`" 
        ref="glitchContainer"
        v-observe-visibility="visibilityChanged"
    >
        <div 
            :class="`glitch glitch__${glitchStyle} glitch__${glitchStatus} glitch__${ratio} glitch__${changeClass}`"
            :data-glitch-w="`${glitchSize}vmax`"
            :data-glitch-h="`calc(${glitchSize}vmax * 1.25)`"
            :style="`--time-anim:${timeAnim}; --change-speed:${changeSpeed / 1000}s;`"
        >   
            <div 
                v-for="(slice, i) in totalSlices"
                :key="i"
                class="glitch__img"
                :style="style(slice)"
            />
        </div>
    </div>
</template>
<script>
export default {
    props: {
        src: {
            type: String,
            default: ''
        },
        srcMobile: {
            type: String,
            default: ''
        },
        srcDark: {
            type: String,
            default: ''
        },
        srcDarkMobile: {
            type: String,
            default: ''
        },
        slices: {
            type: Number,
            default: 5
        },
        glitchStyle: {
            type: String,
            default: 'style-1'
        },
        glitchSize: {
            type: Number,
            default: 40
        },
        animationTime: {
            type: Number,
            default: 2250
        },
        ratio: {
            type: String,
            default: '16x9'
        },
        changeSpeed: {
            type: Number,
            default: 400
        }
    },
    data() {
        return {
            glitchStatus: 'no-glitch',
            timeAnim: `${this.animationTime / 1000}s`,
            onAnimation: false,
            isVisible: false,
            appScheme: 'light',
            changeClass: 'no-change',
            windowW: window.innerWidth
        }
    },
    computed: {
        totalSlices() {
            return this.slices > 2 ? this.slices : 3
        },
        imgSrc() {
            if (this.windowW > 767) {
                return this.appScheme == 'light' ? this.src : this.srcDark ? this.srcDark : this.src
            } else {
                return this.appScheme == 'light' ? this.srcMobile : this.srcDarkMobile ? this.srcDarkMobile : this.srcMobile
            }
        }
    },  
    methods: {
        style(slice) {
            let transforms = [
                'translate3d(var(--gap-horizontal),0,0)',
                'translate3d(calc(-1 * var(--gap-horizontal)),0,0)',
                'translate3d(0, calc(-1 * var(--gap-vertical)), 0)'
            ]
            return {
                backgroundImage: `url(${this.imgSrc})`,
                backgroundColor: `var(--blend-color-${slice})`,
                backgroundBlendMode: `var(--blend-color-${slice})`,
                transform: slice > 1 && slice < this.totalSlices ? transforms[Math.floor(Math.random() * transforms.length)] : 'translate3d(0, 0, 0)'
            }
        },
        visibilityChanged(isVisible, entry) {
            this.isVisible = isVisible
            if (!isVisible) 
            this.onAnimation = false
            this.glitchStatus = 'no-glitch'
        }
    },
    mounted() {
        setInterval(() => {
            if (!this.isVisible) return
            this.glitchStatus = this.glitchStatus == 'no-glitch' ? 'on-glitch' : 'no-glitch'
            this.onAnimation = !this.onAnimation
        }, Math.floor(Math.random() * (this.onAnimation ? 500 : 7000)) + (this.onAnimation  ? 0 : 2000))
        setInterval(() => {
            if (!this.onAnimation) return
            let time = Math.floor(Math.random() * this.animationTime) + 500
            this.timeAnim = `${time / 1000}s`
        }, 1000)

        // Check theme switch
        this.appScheme = this.$cookies.get('color-scheme') || 'light'
        this.$root.$on('scheme', scheme => {
            this.changeClass = 'bg-change'
            setTimeout(() => {
                this.appScheme = scheme
            }, this.changeSpeed / 2)
            setTimeout(() => {
                this.changeClass = 'no-change'
            }, this.changeSpeed)
        })

        // resize watch
        window.onresize = ev => {
            this.windowW = window.innerWidth
        }
    }
}
</script>