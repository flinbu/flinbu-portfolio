<template>
    <div
        class="module module__hero content content__middl pt-3 pb-6"
        style="background-image: url('assets/images/hero-bg.svg');"
    >
        <b-container>
            <b-row class="h-100" align-v="center">
                <b-col cols="12" lg="6" order="2" order-lg="1">
                    <module-title
                        tag="h1"
                        :strongText="labels.title[0]"
                        :lightText="labels.title[1]"
                    />
                    <p class="module__subtitle">{{ labels.subtitle }}</p>
                    <div class="divider mb-5"/>
                    <div class="module__description mb-5" v-html="labels.description"/>
                    <button-group
                        class="module__actions d-flex align-items-center justify-content-flex-start flex-wrap"
                        :buttons="buttons"
                        button-class="module__action"
                    />
                </b-col>
                <b-col cols="12" lg="6" class="text-center mb-3 mb-lg-0" order="1" order-lg="2">
                    <g-image
                        class="img-fluid"
                        src="~/assets/images/flinbu.png"
                        quality="100"
                        width="500"
                    />
                    <social-menu 
                        class="module__hero--social"
                        icon-size="lg"
                        alignment="center"
                    />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            labels: {
                title: [],
                subtitle: process.env.GRIDSOME_SITE_DESCRIPTION,
                description: "<p>I'm a UX Designer, developer & consultant based in Colombia.</p><p>I take into account both sides of the project, users and business to meet the needs of both. Applying analytical thinking, user research and evaluation of the best method and solution, resulting in functional UI designs and 100% sure of its implementation, this thanks to the experience in development acquired in all these years.</p>"
            }
        }
    },
    computed: {
        buttons() {
            return [
                {
                    type: "anchor",
                    label: "Work together",
                    target: "#contact",
                    theme: "main",
                    shadow: true
                },
                {
                    type: "link",
                    label: "Resume",
                    target: process.env.GRIDSOME_RESUME_URL,
                    theme: "white",
                    color: "red",
                    shadow: true
                }
            ]
        }
    },
    mounted() {
        let title = process.env.GRIDSOME_SITE_NAME
        let titleArr = title.split(' ')
        for(let i = 0; i < titleArr.length; i++) {
            this.labels.title.push(titleArr[i])
        }
    }
}
</script>
