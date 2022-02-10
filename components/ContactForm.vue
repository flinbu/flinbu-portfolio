<template>
    <b-overlay :show="loading" rounded="sm" class="w-100" variant="transparent" spinnet-type="grow" spinner-variant="primary">
        <b-form class="contact-form" @submit.prevent="send" ref="form">
            <b-form-row>
                <b-col cols="12">
                    <b-form-group :label="labelName">
                        <b-form-input
                            v-model="form.name"
                            required
                            :disabled="loading"
                            @focus="onFocus"
                        />
                    </b-form-group>
                </b-col>
                <b-col cols="12">
                    <b-form-group :label="labelEmail">
                        <b-form-input
                            type="email"
                            v-model="form.email"
                            required
                            :disabled="loading"
                            @focus="onFocus"
                        />
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                    <b-form-group :label="labelHelp">
                        <b-dropdown 
                            :text="form.help" 
                            class="contact-form__select"
                            lazy
                        >
                            <b-dropdown-item
                                v-for="(item, i) in helpOptions"
                                :key="i"
                                :active="form.help == item"
                                @click="form.help = item"
                            >{{ item }}</b-dropdown-item>
                        </b-dropdown>
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                    <b-form-group :label="labelPriority">
                        <b-dropdown 
                            :text="form.priority" 
                            class="contact-form__select"
                            lazy
                        >
                            <b-dropdown-item
                                v-for="(item, i) in priorityOptions"
                                :key="i"
                                :active="form.priority == item"
                                @click="form.priority = item"
                            >{{ item }}</b-dropdown-item>
                        </b-dropdown>
                    </b-form-group>
                </b-col>
                <b-col cols="12">
                    <b-form-group :label="labelMessage">
                        <b-form-textarea
                            v-model="form.message"
                            rows="10"
                            required
                            :disabled="loading"
                            @focus="onFocus"
                            :placeholder="placeholderMessage"
                        />
                    </b-form-group>
                </b-col>
                <b-col cols="12">
                    <b-row align-v="center">
                        <b-col cols="12" md="7">
                            <b-form-group :label="$t('components.contact_form.captcha')">
                                <b-form-input
                                    v-model="form.captcha"
                                    :placeholder="captcha.sum"
                                    required
                                    :disabled="loading"
                                    :state="form.captcha == captcha.result"
                                    ref="captcha"
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="5" class="mb-2 mb-lg-0 d-flex justify-content-end">
                            <b-button 
                                type="submit"
                                variant="primary"
                                size="lg"
                                class="contact-form__submit"
                                v-html="buttonLabel"
                                :disabled="loading"
                            />
                        </b-col>
                    </b-row>
                </b-col>
            </b-form-row>
        </b-form>
    </b-overlay>
</template>
<script>
import { mathCaptcha } from '~/plugins/mathCaptcha'

export default {
    props: {
        labelName: {
            type: String,
            default: "Name"
        },
        labelEmail: {
            type: String,
            default: "Email"
        },
        labelHelp: {
            type: String,
            default: "What do you need?"
        },
        labelPriority: {
            type: String,
            default: "Priority"
        },
        labelMessage: {
            type: String,
            default: "What's about?"
        },
        labelSubmit: {
            type: String,
            default: "Send"
        },
        placeholderMessage: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            loading: false,
            captcha: {sum: '', result: ''},
            form: {
                name: "",
                email: "",
                help: "",
                priority: "",
                message: "",
                captcha: ""
            },
            response: false,
            responseColor: "gray",
            dismissSec: 5,
            dismissCountDown: 0
        }
    },
    computed: {
        buttonLabel() {
            return this.loading ? '<i class="bx bx-loader-alt bx-spin"></i>' : this.labelSubmit
        },
        helpOptions() {
            return [
                this.$t('components.contact_form.help_options.app_design'),
                this.$t('components.contact_form.help_options.web_design'),
                this.$t('components.contact_form.help_options.frontend'),
                this.$t('components.contact_form.help_options.ux_advisory'),
                this.$t('components.contact_form.help_options.greetings'),
                this.$t('components.contact_form.help_options.general')
            ]
        },
        priorityOptions() {
            return [
                this.$t('components.contact_form.priority_options.we_have_time'),
                this.$t('components.contact_form.priority_options.urgent'),
                this.$t('components.contact_form.priority_options.asap'),
                this.$t('components.contact_form.priority_options.not_apply')
            ]
        }
    },
    methods: {
        async send(event) {
            if (this.form.captcha != this.captcha.result) {
                return this.toast(this.$t('components.contact_form.messages.captcha_error', { sum: this.captcha.sum, answer: this.form.captcha}), 'danger', true)
            }
            this.loading = true
            try {
                const msgBody = `<strong>Name:</strong> ${this.form.name}<br/><strong>Email:</strong> ${this.form.email}<br/><strong>Help:</strong> ${this.form.help}<br/><strong>Priority:</strong> ${this.form.priority}<br/><strong>Message:</strong> ${this.form.message}`
                await this.$mail({
                    to: process.env.CONTACT_EMAIL,
                    from: process.env.SMTP_FROM,
                    subject: `Contact: ${this.form.help} - ${this.form.priority}`,
                    text: this.form.message,
                    html: msgBody
                })
                this.loading = false
                this.toast(this.$t('components.contact_form.messages.success'), 'success', true)
                this.clearForm()
            } catch (err) {
                console.error(err)
                this.loading = false
                this.toast(this.$t('components.contact_form.messages.error'), 'danger', true)
                this.clearForm()
            }
        },
        toast(message = '', variant = 'success', append = false) {
            this.$bvToast.toast(message, {
                autoHideDelay: this.dismissSec * 1000,
                noCloseButton: true,
                solid: false,
                appendToast: append,
                toaster: 'b-toaster-bottom-center',
                toastClass: 'toast',
                bodyClass: 'toast__body text-center'
            })
        },
        clearForm() {
            this.form = {
                name: "",
                email: "",
                help: this.helpOptions[0],
                priority: this.priorityOptions[0],
                message: ""
            }
            this.$refs.form.reset()
            this.resetCaptcha()
            console.log(this.form)
        },
        onFocus() {
            this.response = false
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
            this.clearForm()
        },
        resetCaptcha() {
            this.captcha = mathCaptcha.generate({lower: 5, upper: 20})
        }
    },
    mounted() {
        this.form.help = this.helpOptions[0]
        this.form.priority = this.priorityOptions[0]
        this.resetCaptcha()
    }
}
</script>
