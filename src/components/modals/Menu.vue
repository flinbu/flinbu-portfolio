<template>
    <b-modal 
        v-model="showModal" 
        modal-class="modal modal__menu"
        hide-footer
        hide-header
        size="xl"
        centered
        @hidden="showModal = false"
    >
        <b-container class="modal__menu--content p-2 p-lg-10 fluid">
            <b-row>
                <b-col cols="12">
                    <div class="menu__brand mb-5">
                        <module-title
                            :strongText="labels.title[0]"
                            :lightText="labels.title[1]"
                        />
                        <p class="module__subtitle">{{ labels.subtitle }}</p>
                    </div>
                </b-col>
                <b-col cols="12" md="6">
                    <social-menu 
                        vertical 
                        labels 
                        scheme="dark"
                    />
                </b-col>
                <b-col cols="12" md="6">
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
                        <scheme-switch class="text-white"/>
                    </div>
                </b-col>
                <b-col cols="12" class="mt-5">
                    <p class="menu__copyright mb-0 text-white" v-html="labels.copyright"/>
                </b-col>
            </b-row>
        </b-container>
    </b-modal>
</template>
<script>
const year = new Date().getFullYear()
export default {
    data() {
        return {
            showModal: false,
            labels: {
                title: ['Felipe', 'Linares'],
                subtitle: 'UX Designer, Developer & Consultant',
                copyright: `&copy; ${year}. Felipe Linares. All rights reserved.`
            },
            menu: [
                {
                    label: "My work",
                    link: process.env.GRIDSOME_PORTFOLIO_URL,
                    target: '_blank'
                }
            ]
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
    }
}
</script>