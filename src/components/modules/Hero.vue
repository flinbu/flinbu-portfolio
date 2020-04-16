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
                title: "UX Designer, Developer & Consultant",
                subtitle: "Let's create. Innovate. Together.",
                description: "<p>I'm a UX Designer, developer & consultant based in Colombia.</p><p>I take into account both sides of the project, users and business to meet the needs of both. Applying analytical thinking, user research and evaluation of the best method and solution, resulting in functional UI designs and 100% sure of its implementation, this thanks to the experience in development acquired in all these years.</p>"
            },
            buttons: [
                {
                    type: "modal",
                    label: "Get in touch",
                    target: "ContactModal",
                    theme: "main",
                    shadow: true
                },
                {
                    type: "link",
                    label: "Resume",
                    target: 'https://www.notion.so/flinbu/Felipe-Linares-dcd2cfa766714e6e8e0f692ac3264c24',
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
