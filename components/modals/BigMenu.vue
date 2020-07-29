<template>
    <b-modal 
        v-model="showModal" 
        :modal-class="`modal modal__menu modal__${theme}`"
        content-class="modal__menu--content"
        dialog-class="modal__menu--dialog"
        hide-footer
        hide-header
        size="xl"
        centered
        @hidden="showModal = false"
    >
        <button @click="closeModal" class="modal__close"><i class="bx bx-x"/></button>
        <b-container class="modal__menu--content fluid">
            <b-row>
                <b-col cols="12">
                    <div class="menu__brand mb-5">
                        <module-title
                            :strongText="labels.title[0]"
                            :lightText="labels.title[1]"
                        />
                        <p class="module__subtitle">{{ labels.subtitle }}</p>
                        <div class="divider"></div>
                    </div>
                </b-col>
                <b-col cols="12" md="6">
                    <social-menu 
                        vertical 
                        labels 
                        :scheme="theme"
                    />
                </b-col>
                <b-col cols="12" md="6">
                    <app-menu 
                        location="modal-menu"
                        @clicked="closeModal"
                    />
                    <b-nav 
                        vertical
                        class="menu__menu text-left text-md-right"
                    >
                        <b-nav-item
                            v-for="(item, i) in menu"
                            :key="i"
                            :href="item.link ? item.link : false"
                            :to="item.route ? item.route : ''"
                            :target="item.target ? item.target : '_self'"
                        >
                            {{ item.label }}
                        </b-nav-item>
                    </b-nav>
                    <div class="text-center text-md-right">
                        <scheme-switch/>
                    </div>
                </b-col>
                <b-col cols="12" class="mt-5">
                    <p class="menu__copyright mb-0 text-center text-lg-left" v-html="labels.copyright"/>
                </b-col>
            </b-row>
        </b-container>
    </b-modal>
</template>
<script>
const YEAR = new Date().getFullYear()
export default {
    data() {
        return {
            showModal: false,
            menu: [
                {
                    label: "XD Template",
                    link: 'https://dribbble.com/shots/11097348-Personal-website-flinbu-co',
                    target: '_blank'
                },
                {
                    label: "Source code",
                    link: 'https://gitlab.com/flinbu-dev/portfolio',
                    target: '_blank'
                }
            ],
            theme: 'dark'
        }
    },
    computed: {
        labels() {
            let title = this.$t('site.title').split(' ')
            return {
                title: title,
                subtitle: this.$t('site.subtitle'),
                copyright: this.$t('site.copyright', {year: YEAR})
            }
        }
    },
    methods: {
        closeModal() {
            this.showModal = false
        }
    },
    mounted() {
        this.$root.$on('openMenu', () => {
            this.showModal = true
        })

        let scheme = this.$cookies.get('color-scheme') 
        this.theme = scheme ? scheme : 'dark'

        this.$root.$on('scheme', scheme => {
            this.theme = scheme
        })
    }
}
</script>