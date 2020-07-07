<template>
    <b-form class="contact-form" @submit.prevent="send">
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
                <b-row>
                    <b-col class="col-lg-auto mb-2 mb-lg-0">
                        <b-button 
                            type="submit"
                            variant="primary"
                            size="lg"
                            class="contact-form__submit"
                            v-html="buttonLabel"
                            :disabled="loading"
                        />
                    </b-col>
                    <b-col cols="12" class="mt-4" v-if="response">
                        <span
                            :class="`font-weight-light text-${responseColor}`"
                            v-html="response"
                        />
                    </b-col>
                </b-row>
            </b-col>
        </b-form-row>
    </b-form>
</template>
<script>
const initialForm = {
    name: "",
    email: "",
    help: "",
    priority: "",
    message: ""
}
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
            form: initialForm,
            response: false,
            responseColor: "gray"
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
            this.loading = true

            let data = new URLSearchParams()
            data.append('action', 'send_mail')
            data.append('email', process.env.API_EMAIL)
            data.append('key', process.env.API_KEY)
            data.append('to', process.env.API_EMAIL)
            data.append('name', this.form.name)
            data.append('subject', 'Message from webpage')
            data.append('replyto', this.form.email)

            let message = ''
            message += `<strong>${this.labelName}:</strong> ${this.form.name}</br></br>`
            message += `<strong>${this.labelEmail}:</strong> ${this.form.email}</br></br>`
            message += `<strong>${this.labelHelp}:</strong> ${this.form.help}</br></br>`
            message += `<strong>${this.labelPriority}:</strong> ${this.form.priority}</br></br>`
            message += `<strong>${this.labelMessage}:</strong> ${this.form.message}`

            data.append('body', message)
            
            let actionURL = process.env.API

            await this.$axios
                    .post(actionURL, data)
                    .then(response => {
                        this.loading = false
                        let success = response.data.success ? true : false
                        if (success) {
                            event.target.reset()
                            this.clearForm()
                            this.response = this.$t('components.contact_form.messages.success')
                            this.responseColor = "green"
                        } else {
                            console.log(response)
                            this.response = this.$t('components.contact_form.messages.error')
                            this.responseColor = "red"
                        }
                    })
                    .catch(err => {
                        this.loading = false
                        console.log(err)
                        this.response = this.$t('components.contact_form.messages.error')
                        this.responseColor = "red"
                    })
        },
        clearForm() {
            this.form = initialForm
        },
        onFocus() {
            this.response = false
        }
    },
    mounted() {
        this.form.help = this.helpOptions[0]
        this.form.priority = this.priorityOptions[0]
    }
}
</script>
