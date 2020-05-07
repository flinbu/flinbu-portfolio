<template>
    <b-container fluid id="contact" class="module module__contact content content__middle pt-0 pt-lg-10">
        <b-container fluid class="module__wrapper">
            <b-row class="module__content" align-v="start">
                <b-col class="module__data pr-md-5 mb-6" cols="12" md="5" offset-md="1">
                    <module-title
                        :strongText="labels.title[0]"
                        :lightText="labels.title[1]"
                        :supText="labels.subtitle"
                    />
                    <div class="module__description mb-6" v-html="labels.description"/>
                    <module-title
                        :strongText="labels.socialTitle[0]"
                        :lightText="labels.socialTitle[1]"
                        :supText="labels.socialSubtitle"
                        size="md"
                    />
                    <social-menu iconSize="lg" scheme="black" class="px-0 mb-4"/>
                    <a :href="`mailto:${contactEmail}`" class="module__contact--email d-inline-flex align-items-center"><i class="bx bx-envelope mr-2"></i> {{ contactEmail }}</a>
                </b-col>
                <b-col cols="12" md="5" class="mb-6">
                    <contact-form
                        :label-name="formLabels.name"
                        :label-email="formLabels.email"
                        :label-help="formLabels.help"
                        :label-priority="formLabels.priority"
                        :label-message="formLabels.message"
                        :label-submit="formLabels.submit"
                        :placeholder-message="formLabels.messagePlaceholder"
                    />
                </b-col>
            </b-row>
        </b-container>
    </b-container>
</template>
<script>
export default {
    data() {
        return {
            formLabels: {
                name: this.$t('components.contact_form.name'),
                email: this.$t('components.contact_form.email'),
                help: this.$t('components.contact_form.help'),
                priority: this.$t('components.contact_form.priority'),
                message: this.$t('components.contact_form.message'),
                messagePlaceholder: this.$t('components.contact_form.placeholder.message'),
                submit: this.$t('components.contact_form.cta')
            },
            contactEmail: process.env.GRIDSOME_CONTACT_EMAIL
        }
    },
    computed: {
        labels() {
            return {
                title: this.$t('pages.home.contact_title').split(' '),
                subtitle: this.$t('pages.home.contact_subtitle'),
                description: this.$t('pages.home.contact_description'),
                socialTitle: this.$t('pages.home.social_title').split(' '),
                socialSubtitle: this.$t('pages.home.social_subtitle')
            }
        }
    }
}
</script>
