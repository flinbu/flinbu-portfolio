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
                    label: this.$t('components.menu.ux_design'),
                    type: 'anchor'
                },
                {
                    link: '#data-visualization',
                    label: this.$t('components.menu.data_visualization'),
                    type: 'anchor'
                },
                {
                    link: '#frontend-development',
                    label: this.$t('components.menu.front_development'),
                    type: 'anchor'
                },
                {
                    link: '#creation-process',
                    label: this.$t('components.menu.process'),
                    type: 'anchor'
                },
                {
                    link: '#contact',
                    label: this.$t('components.menu.contact'),
                    type: 'anchor'
                }
            ]
        }
    },
    methods: {
        openLink(item) {
            let current = this.$route
            let currentLang = this.$i18n.locale.toString()
            switch (item.type) {
                case 'anchor':
                    if (current.path != '/' && current.path != `/${currentLang}/`) {
                        this.$router.push({
                            path: `/${item.link}`
                        })
                    } else {
                        this.$scrollTo(item.link, {
                            offset: -60
                        })
                    }
                    break
            }
            this.$emit('clicked')
        }
    }
}
</script>