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
            labels: {
                title: ["Work", 'Together'],
                subtitle: "Let's create.",
                description: '<p>Tell me about your needs and let’s start working together on the best solution for users and business.</p><p>I’m not a freelancer, I will be part of your team.</p>',
                socialTitle: [`Let's`, 'Connect'],
                socialSubtitle: "My digital print."
            },
            formLabels: {
                name: `Let's meet. What's your name?`,
                email: 'And your email...',
                help: 'How can I help?',
                priority: `What's the priority?`,
                message: 'Tell me more about your project',
                messagePlaceholder: 'Budget, extra details, deadlines, special features...',
                submit: `Let's work!`
            },
            contactEmail: process.env.GRIDSOME_CONTACT_EMAIL
        }
    }
}
</script>
