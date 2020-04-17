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
                'App design',
                'Web design',
                'Frontend development',
                'UX Advisory',
                'Greetings',
                'General'
            ]
        },
        priorityOptions() {
            return [
                'We have time',
                'Urgent',
                'ASAP',
                'Does not apply'
            ]
        }
    },
    methods: {
        async send(event) {
            this.loading = true

            let data = this.form
            
            let actionURL = process.env.GRIDSOME_CONTACT_ACTION

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
