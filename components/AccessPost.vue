<template>
    <b-col cols="12" md="6" class="access-post__wrapper mx-auto d-flex align-items-center justify-content-center flex-wrap">
        <b-row>
            <b-col cols="12" class="mb-5">
                <h3 class="access-post__title text-center">{{ $t('components.access_post.title') }}</h3>
                <div class="access-post__disclaimer text-center" v-html="$t('components.access_post.disclaimer')" />
            </b-col>
            <b-col cols="12">
                <b-overlay :show="loading" rounded="sm" class="w-100" variant="transparent" spinnet-type="grow" spinner-variant="primary">
                    <b-form class="access-post__form contact-form center-label" @submit.prevent="unlock" autocomplete="off">
                        <input type="hidden" autocomplete="off"/>
                        <b-form-group
                            :label="$t('components.access_post.email')"
                            label-for="unlock-email"
                        >
                            <b-form-input
                                v-model="email"
                                id="unlock-email"
                                type="email"
                            />
                        </b-form-group>
                        <b-form-group
                            :label="$t('components.access_post.password')"
                            label-for="unlock-password"
                        >
                            <b-form-input
                                v-model="password"
                                id="unlock-password"
                                type="password"
                            />
                        </b-form-group>
                        <b-form-group>
                            <b-button 
                                type="submit"
                                variant="primary"
                                size="lg"
                                class="contact-form__submit access-post__submit d-block mx-auto"
                                v-html="buttonLabel"
                                :disabled="loading && !email && !password"
                            />
                        </b-form-group>
                    </b-form>
                </b-overlay>
            </b-col>
        </b-row>
    </b-col>
</template>
<script>
import CockpitSDK from 'cockpit-sdk'

const cockpitClient = new CockpitSDK({
    host: process.env.API_HOST,
    accessToken: process.env.API_TOKEN
})

const singleton = 'portfoliopass'
export default {
    data() {
        return {
            email: '',
            password: '',
            loading: false
        }
    },
    computed: {
        buttonLabel() {
            return this.loading ? '<i class="bx bx-loader-alt bx-spin"></i>' : `<i class="bx bx-lock-open"></i> ${this.$t('components.access_post.cta')}`
        }
    },
    methods: {
        async unlock() {
            this.loading = true
            const getPass = await cockpitClient.singletonGet(singleton)
            const password = getPass.passwords.find( pass => {
                return pass.value.email == this.email
            })
            if (password) {
                if (password.value.pass !== this.password) {
                    this.toast(this.$t('components.access_post.bad_password'), 'danger')
                } else {
                    this.$emit('success', true)
                }
            } else {
                this.toast(this.$t('components.access_post.no_password'), 'danger')
            }
            this.loading = false
        },
        toast(message = '', variant = 'success', append = false) {
            this.$bvToast.toast(message, {
                variant: variant,
                noCloseButton: false,
                solid: false,
                appendToast: append,
                toaster: 'b-toaster-bottom-center',
                toastClass: 'toast',
                bodyClass: 'toast__body text-center'
            })
        }
    }
}
</script>