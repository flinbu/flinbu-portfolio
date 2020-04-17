<template>
    <b-container class="module module__frontend content content__middle py-8 py-lg-12">
        <b-row>
            <b-col class="module__wrapper">
                <b-row class="module__content" align-v="center">
                    <b-col class="module__data order-2 order-lg-1" cols="12" lg="6" xl="5" offset-xl="1">
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
                    <b-col class="module__image--wrapper mb-6 mb-lg-0 order-1 order-lg-2" cols="12" md="6" offset-md="3" offset-lg="0">
                        <g-image :src="imagePath('frontend-development.svg')" class="module__image img-fluid"/>
                    </b-col>
                </b-row>
            </b-col>
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
                    type: "modal",
                    label: "Let's create",
                    target: "ContactModal",
                    theme: "main",
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
            ]
        }
    }
}
</script>
