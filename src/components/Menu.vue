<template>
    <div :class="`menu menu__${location}`">
        <div 
            class="menu__item--wrapper"
            v-for="(item, i) in menu"
            :key="`menu-item-${i}`"
        >
            <!-- Anchor -->
            <a 
                v-if="item.type == 'anchor'"
                :href="item.link" 
                @click.prevent="openLink(item)" 
                class="menu__item menu__item--anchor"
            >{{ item.label }}</a>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        location: {
            type: String,
            default: 'global'
        }
    },
    computed: {
        menu() {
            return [
                {
                    link: '#ux-design',
                    label: 'UX Design',
                    type: 'anchor'
                },
                {
                    link: '#data-visualization',
                    label:'Data Visualization',
                    type: 'anchor'
                },
                {
                    link: '#frontend-development',
                    label: 'Front Dev.',
                    type: 'anchor'
                },
                {
                    link: '#creation-process',
                    label: 'My Process',
                    type: 'anchor'
                },
                {
                    link: '#contact',
                    label: `Let's Work!`,
                    type: 'anchor'
                }
            ]
        }
    },
    methods: {
        openLink(item) {
            switch (item.type) {
                case 'anchor':
                    this.$scrollTo(item.link, {
                        offset: -60
                    })
                    break
            }
            this.$emit('clicked')
        }
    }
}
</script>