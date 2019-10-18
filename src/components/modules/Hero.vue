<template>
    <b-container
        class="module module__hero content content__middle pt-6 pb-6"
    >
        <b-row>
            <b-col class="module__wrapper">
                <b-row class="module__content mb-5" align-v="center">
                    <b-col class="module__data mb-5 mb-md-0" cols="12" md="6" lg="5" offset-lg="1">
                        <h3 class="module__subtitle mb-2 text-center text-md-left" v-html="labels.subtitle"/>
                        <h2 class="module__title mb-5 text-center text-md-left" v-html="labels.title"/>
                        <div class="module__description mb-5 text-center text-md-left" v-html="labels.description"/>
                        <button-group
                            class="module__actions d-flex align-items-center justify-content-center justify-content-md-start flex-wrap"
                            :buttons="buttons"
                            button-class="module__action"
                        />
                    </b-col>
                    <b-col class="module__image--wrapper" cols="12" md="6">
                        <g-image :src="imagePath('hero-image.svg')" class="img-fluid"/>
                    </b-col>
                </b-row>
                <b-row align-h="center">
                    <b-col>
                        <logo-list
                            :logos="logos"
                        />
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
                title: "Digital products designer",
                subtitle: "Let's create. Innovate. Together.",
                description: "My name is Felipe Linares. I'm a designer with over 8 years of experience. I work with you to design effective interfaces and user experiences based in \"personas\", in order to innovate and grow better."
            },
            buttons: [
                {
                    type: "anchor",
                    label: "Get in touch",
                    target: "#contact",
                    theme: "main",
                    shadow: true
                },
                {
                    type: "modal",
                    label: "Request CV",
                    target: 'RequestModal',
                    theme: "text",
                    color: "red"
                }
            ],
            logos: [
                {
                    name: "Send",
                    image: "logos/send.svg"
                },
                {
                    name: "WeSend",
                    image: "logos/wesend.svg"
                },
                {
                    name: "Connectas",
                    image: "logos/connectas.png"
                },
                {
                    name: "Johnson Controls",
                    image: "logos/johnson-controls.svg"
                },
                {
                    name: "Energiteca",
                    image: "logos/energiteca.png"
                },
                {
                    name: "Plan Ciudad",
                    image: "logos/plan-ciudad.svg"
                },
                {
                    name: "El País",
                    image: "logos/el-pais.svg"
                }
            ]
        }
    }
}
</script>
