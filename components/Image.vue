<template>
    <div classs="progressive">
        <img :src="imagePath()"/>
    </div>
</template>
<script>
export default {
    props: {
        image: {
            type: String,
            default: ''
        },
        svg: {
            type: Boolean, 
            default: false
        },
        include: {
            type: Boolean, 
            default: false
        },
        webp: {
            type: Boolean, 
            default: false
        },
        inline: {
            type: Boolean, 
            default: false
        },
        url: {
            type: Boolean, 
            default: false
        },
        original: {
            type: Boolean, 
            default: false
        }
    },
    computed: {
        parameters() {
            if (this.svg || this.webp || this.inline || this.url || this.original) {
                let params = '?'
                if (this.svg || this.include) {
                    params += 'include'
                } else if (this.webp) {
                    params += 'webp'
                } else if (this.inline) {
                    params += 'inline'
                } else if (this.url) {
                    params += 'url'
                } else if (this.original) {
                    params += 'original'
                } else {
                    params = ''
                }
                return params
            } else {
                return ''
            }
        }
    },
    methods: {
        imagePath() {
            return require(`@/assets/images/${this.image}${this.parameters}`)
        },
        lqipPath() {
            // return require(`@/assets/images/${this.image}?lqip`)
        }
    }
}
</script>