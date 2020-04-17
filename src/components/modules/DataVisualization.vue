<template>
    <b-container fluid class="module module__data module__red contet content__middle pt-8 pb-8">
        <b-row>
            <b-container>
                <b-row>
                    <b-col class="module__wrapper">
                        <b-row class="module__content align-items-center align-items-lg-start">
                            <b-col class="module__data order-2 order-md-1 pt-0 pt-md-8" cols="12" md="6" lg="5" xl="4" offset-xl="1">
                                <module-title
                                    :strongText="labels.title[0]"
                                    :lightText="labels.title[1]"
                                    :supText="labels.subtitle"
                                />
                                <div class="module__description mb-5" v-html="labels.description"/>
                                <button-group
                                    class="module__action d-flex align-items-center flex-wrap"
                                    :buttons="buttons"
                                    button-class="module__action"
                                />
                            </b-col>
                            <b-col 
                                class="module__image--wrapper mb-5 mb-md-0 order-1 order-md-2"
                                cols="12"
                                md="6"
                            >
                                <g-image :src="imagePath('data-visualization.svg')" class="module__image img-fluid"/>
                            </b-col>
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
                title: ['Data', 'Visualization'],
                subtitle: "Understand. Together.",
                description: "Create personalized infographics to bring your data to a very friendly level so that anyone can understand in the best way and without bias."
            },
            buttons: [
                {
                    type: "modal",
                    label: "Get in touch",
                    target: "ContactModal",
                    theme: "main",
                    shadow: true
                }
            ]
        }
    }
}
</script>
