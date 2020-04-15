<template>
    <b-container class="module module__ui content content__middle pt-10 pb-10">
        <b-row>
            <b-col class="module__wrapper">
                <b-row class="module__content mb-5 mb-md-7 mb-lg-8" align-v="center">
                    <b-col class="module__image--wrapper mb-5 mb-md-0" cols="12" md="6">
                        <g-image :src="imagePath('ui-design.svg')" class="img-fluid"/>
                    </b-col>
                    <b-col class="module__data" cols="12" md="6">
                        <h3 class="module__subtitle mb-2 text-center text-md-left" v-html="labels.subtitle"/>
                        <h2 class="module__title mb-5 text-center text-md-left" v-html="labels.title"/>
                        <div class="module__description mb-5 text-center text-md-left" v-html="labels.description"/>
                        <button-group
                            class="module__action d-flex align-items-center justify-content-center justify-content-md-start flex-wrap"
                            :buttons="buttons"
                            button-class="module__action"
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
                title: "UX Design",
                subtitle: "Innovate. Together.",
                description: "Together we investigate, we create, we approach, we test and innovate with the solution to that challenge you hav with yout digital products."
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
                    type: "link",
                    label: "Check my work",
                    target: "https://dribbble.com/flinbu",
                    theme: "text"
                }
            ]
        }
    }
}
</script>
