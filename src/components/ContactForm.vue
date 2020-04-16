<template>
    <b-form class="contact-form" @submit.prevent="send">
        <b-form-row>
            <b-col cols="12" md="6">
                <b-form-group :label="labelName">
                    <b-form-input
                        v-model="form.name"
                        required
                        :disabled="loading"
                        @focus="onFocus"
                    />
                </b-form-group>
            </b-col>
            <b-col cols="12" md="6">
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
            <b-col cols="12">
                <b-form-group :label="labelMessage">
                    <b-form-textarea
                        v-model="form.message"
                        rows="4"
                        required
                        :disabled="loading"
                        @focus="onFocus"
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
                    <b-col cols="12" lg="6" v-if="response">
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
import axios from "axios"
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
        labelMessage: {
            type: String,
            default: "What's about?"
        },
        labelSubmit: {
            type: String,
            default: "Send"
        }
    },
    data() {
        return {
            loading: false,
            form: {
                name: "",
                email: "",
                message: ""
            },
            response: false,
            responseColor: "gray"
        }
    },
    computed: {
        buttonLabel() {
            return this.loading ? '<i class="bx bx-loader-alt bx-spin"></i>' : this.labelSubmit
        }
    },
    methods: {
        async send(event) {
            this.loading = true

            let data = {
                name: this.form.name,
                email: this.form.email,
                message: this.form.message
            }
            
            let actionURL = 'https://getform.io/f/bc4077af-db2a-438a-8236-59e7504aff44'

            await axios
                    .post(actionURL, data, {
                        headers: {
                            Accept: 'application/json'
                        }
                    })
                    .then(response => {
                        this.loading = false
                        let success = response.data.success ? true : false
                        if (success) {
                            event.target.reset()
                            this.clearForm()
                            this.response = "Thank you for the message! I will contact you ASAP."
                            this.responseColor = "green"
                        } else {
                            console.log(response)
                            this.response = "Something has gone wrong! Your message could not be sent, please try again, thank you!"
                            this.responseColor = "red"
                        }
                    })
                    .catch(err => {
                        this.loading = false
                        console.log(err)
                        this.response = "Something has gone wrong! Your message could not be sent, please try again, thank you!"
                        this.responseColor = "red"
                    })
        },
        clearForm() {
            this.form.name = ""
            this.form.email = ""
            this.form.message = ""
        },
        onFocus() {
            this.response = false
        }
    }
}
</script>
