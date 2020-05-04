<template>
    <b-container fluid class="module module__frontend content content__middle">
        <b-row>
            <b-container fluid class="module__wrapper">
                <b-row class="module__content" align-v="center">
                    <b-col class="module__data order-2 order-md-1 mb-5 mb-md-0" cols="12" md="5" offset-md="1">
                        <module-title
                            :strongText="labels.title[0]"
                            :lightText="labels.title[1]"
                            :supText="labels.subtitle"
                        />
                        <div class="module__description mb-5" v-html="labels.description"/>
                        <button-group
                            class="module__action d-flex align-items-center flex-wrap mb-6"
                            :buttons="buttons"
                            button-class="module__action"
                        />
                        <logo-list
                            :logos="logos"
                            align="left" 
                            logo-width="30"
                            breakpoint="lg"
                        />
                    </b-col>
                    <b-col class="module__image--wrapper mb-6 mb-lg-0 order-1 order-md-2 mb-5 mb-md-0" cols="12" md="6">
                        <b-row>
                            <g-image 
                                src="~/assets/images/front-dev@2x.png" 
                                class="module__image img-fluid"
                                quality="100"
                            />
                        </b-row>
                    </b-col>
                </b-row>
            </b-container>
        </b-row>
    </b-container>
</template>
<script>
export default {
    data() {
        return {
            labels: {
                title: ['Front','Dev'],
                subtitle: "Create. Together.",
                description: "I can help you develop your digital product, thanks to the experience gained in HTML 5, VUE, JS, WordPress and more. I create and turn that idea into reality."
            },
            buttons: [
                {
                    type: "anchor",
                    label: "Let's create",
                    target: "#contact",
                    theme: "main",
                    shadow: true
                },
                {
                    type: 'link',
                    label: 'Explore this page code',
                    target: 'https://gitlab.com/flinbu-dev/portfolio',
                    theme: 'white',
                    shadow: true
                }
            ],
            logos: [
                {
                    name: "NativeScript",
                    image: "logos/ns.svg"
                },
                {
                    name: "VUE",
                    image: "logos/vue.svg"
                },
                {
                    name: "JavaScript",
                    image: "logos/js.svg"
                },
                {
                    name: "HTML5",
                    image: "logos/html5.svg"
                },
                {
                    name: "WordPress",
                    image: "logos/wordpress.svg"
                },
                {
                    name: "SASS",
                    image: "logos/sass.svg"
                }
            ],
            scheme: 'light'
        }
    },
    mounted() {
        let schemeCookie = this.$cookies.get('color-scheme')
        this.scheme = schemeCookie ? schemeCookie : 'light'
        this.$root.$on('scheme', scheme => {
            this.scheme = scheme
        })
    }
}
</script>
