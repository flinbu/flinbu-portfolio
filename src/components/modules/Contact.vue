<template>
    <b-container id="contact" class="module module__contact content content__middle py-8 py-lg-12">
        <b-row>
            <b-col class="module__wrapper">
                <b-row class="module__content" align-v="center">
                    <b-col class="module__data order-2 order-lg-1" cols="12" lg="6" offset-xl="1">
                        <h3 class="module__subtitle mb-2 text-center text-lg-left" v-html="labels.subtitle"/>
                        <h2 class="module__title mb-5 text-center text-lg-left" v-html="labels.title"/>
                        <contact-form/>
                    </b-col>
                    <b-col class="module__image--wrapper mb-6 mb-lg-0 order-1 order-lg-2 text-center text-lg-left d-none d-lg-block" cols="12" lg="5">
                        <g-image :src="imagePath('contact.svg')" class="module__image img-fluid"/>
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
                title: "Send me a quote",
                subtitle: "Let's talk. Together."
            }
        }
    }
}
</script>
