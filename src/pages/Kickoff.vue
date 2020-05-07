<template>
    <Layout hide-footer>
        <transition name="fade" appear>
            <b-container class="module module__kickoff py-6">
                <b-row>
                    <b-col 
                        v-if="!inStep('success')"
                        cols="12" 
                        md="8" 
                        lg="6" 
                        offset-md-="2" 
                        offset-lg="3" 
                        class="text-center mb-5 mt-3 mt-lg-5"
                    >
                        <module-title
                            :strongText="title[0]"
                            :lightText="title[1]"
                            justify="center"
                        />
                        <p 
                            v-if="inStep('init')"
                            class="font-weight-light text-gray" 
                            v-html="$t('pages.kickoff.description')"
                        />
                    </b-col>
                    <b-col cols="12" lg="8" xl="6" offset-lg="4" offset-xl="3" class="mb-5">
                        <b-form class="kickoff-form contact-form" @submit.prevent="send">
                            <transition name="fade" appear>
                                <b-form-row
                                    v-if="inStep('init')"
                                    key="init"
                                    class="fade-in-down"
                                    :id="`fields-init`"
                                >
                                    <b-col cols="12" md="8">
                                        <b-form-group :label="$t('pages.kickoff.company_name')">
                                            <b-form-input
                                                v-model="form.client"
                                                required
                                                :disabled="loading"
                                                @focus="onFocus"
                                            />
                                        </b-form-group>
                                    </b-col>
                                    <b-col cols="12" md="4">
                                        <b-form-group :label="$t('pages.kickoff.language')">
                                            <b-dropdown 
                                                :text="$t(`pages.kickoff.${language}`)" 
                                                class="contact-form__select"
                                                lazy
                                            >
                                                <b-dropdown-item
                                                    v-for="lang in languages"
                                                    :key="lang"
                                                    :active="lang == language"
                                                    @click="changeLanguage(lang)"
                                                >{{ $t(`pages.kickoff.${lang}`) }}</b-dropdown-item>
                                            </b-dropdown>
                                        </b-form-group>
                                    </b-col>
                                </b-form-row>
                            </transition>
                            <b-form-row
                                v-for="section in fields"
                                :key="section.name"
                            >
                                <transition name="fade" appear>
                                    <b-col 
                                        v-if="inStep(section.name)"
                                        class="fade-in-down"
                                        cols="12"
                                        :id="`fields-${section.name}`"
                                    >
                                        <b-form-row>
                                            <b-col 
                                                v-for="field in section.fields"
                                                :key="field.name"
                                                cols="12"
                                                :md="section.name == 'fast_round' && field.type != 'header' ? 6 : 12"
                                                :class="`mb-3 field__${field.name} field__${field.type}`"
                                            >

                                                <!-- Header -->
                                                <h2 class="contact-form__header mb-4"
                                                    v-if="field.type == 'header'"
                                                    v-html="fieldLabel(field)"
                                                />

                                                <b-form-group v-else :label="fieldLabel(field)">

                                                    <!-- Type text -->
                                                    <b-form-input
                                                        v-if="field.type == 'text'"
                                                        v-model="form[field.name]"
                                                        :disabled="loading"
                                                    />

                                                    <!-- Textarea -->
                                                    <b-form-textarea
                                                        v-if="field.type == 'textarea'"
                                                        v-model="form[field.name]"
                                                        rows="5"
                                                        :disabled="loading"
                                                    />

                                                    <!-- Check group -->
                                                    <b-form-radio-group
                                                        v-if="field.type == 'check_group'"
                                                        v-model="form[field.name]"
                                                        :options="parseOptions(field[`options${capitalize(language)}`])"
                                                        :name="field.name"
                                                        class="text-center"
                                                    />

                                                </b-form-group>
                                            </b-col>
                                        </b-form-row>
                                    </b-col>
                                </transition>
                            </b-form-row>
                            <b-form-row 
                                v-if="!inStep('success') && !inStep('sending')"
                                :class="`mt-0 mt-md-5 contact-form__submit--${!inStep('init') ? 'special' : 'normal'}`"
                            >
                                <b-col cols="12" v-if="!inStep('init') && !inStep('sending') && !inStep('success')" class="mt-2 mt-md-0 mb-3 mb-md-5">
                                    <b-progress max="100" height="10px">
                                        <b-progress-bar
                                            variant="primary"
                                            :value="stepValue()"
                                        />
                                    </b-progress>
                                </b-col>
                                <b-col
                                    class="d-flex aign-items-center justify-content-between"
                                >
                                    <b-button 
                                        v-if="!inStep('init')"
                                        type="button"
                                        variant="link"
                                        size="lg"
                                        v-html="$t('labels.back')"
                                        :disabled="loading"
                                        @click="back"
                                    />
                                    <b-button 
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        :class="`contact-form__submit ${inStep('init') ? 'mx-auto mx-md-0 ml-md-auto' : 'ml-auto'}`"
                                        v-html="buttonLabel"
                                        :disabled="loading"
                                    />
                                </b-col>
                            </b-form-row>
                            <transition name="fade" appear>
                                <b-form-row
                                    v-if="inStep('sending')"
                                    class="my-6"
                                >
                                    <b-col class="d-flex flex-wrap align-items-center justify-content-center h-100">
                                        <b-spinner
                                            variant="primary"
                                            class="mb-7"
                                        />
                                        <h2 class="contact-form__header borderless text-center">{{ $t('pages.kickoff.sending') }}</h2>
                                    </b-col>
                                </b-form-row>
                                <b-form-row
                                    v-if="inStep('success')"
                                    class="my-6"
                                >
                                    <b-col class="d-flex flex-wrap align-items-center justify-content-center h-100">
                                        <h1 class="mb-7 display-1">🚀</h1>
                                        <h2 class="contact-form__header borderless text-center mb-7">{{ $t('pages.kickoff.success') }}</h2>
                                        <b-button 
                                            type="button"
                                            variant="primary"
                                            class="contact-form__submit"
                                            size="lg"
                                            to="/"
                                        >{{ $t('pages.kickoff.end_cta') }}</b-button>
                                    </b-col>
                                </b-form-row>
                            </transition>
                        </b-form>
                    </b-col>
                </b-row>
                <div class="module__kickoff--helper">{{ $t('pages.kickoff.help') }}</div>
            </b-container>
        </transition>
    </Layout>    
</template>
<script>
import axios from "axios"
export default {
    metaInfo: {
        title: `💪 Kick Off and discovery`
    },
    data() {
        return {
            fields: null,
            language: this.$i18n.locale.toString(),
            languages: this.$i18n.availableLocales,
            step: 'init',
            title: ['💪 Kick Off&nbsp;', 'and discovery'],
            sections: [],
            form: {},
            classes: {},
            loading: false
        }
    },
    computed: {
        buttonLabel() {
            let labels = {
                send: this.$t('labels.send'),
                continue: this.$t('labels.continue')
            }
            return this.loading ? '<i class="bx bx-loader-alt bx-spin"></i>' : this.step == 'end' ? labels.send : labels.continue
        }
    },
    methods: {
        inStep(step) {
            return this.step == step
        },
        goTo(step) {
            this.step = step
        },
        setupForm() {
            let form = this.$static.fields.edges
            let sections = []
            let formData = {}
            let classes = {}
            let index = 0
            form.forEach(element => {
                let node = element.node

                // Sections definitions
                let nodeSection = sections.find( section => section.name == node.section)
                if (nodeSection) {
                    nodeSection.fields.push(node)
                    formData[node.name] = ''
                    classes[node.name] = 'normal'
                } else {
                    sections.push({
                        name: node.section,
                        fields: [],
                        index: index
                    })
                    sections[index].fields.push(node)
                    index++
                }
            })
            this.fields = sections
            this.form = formData
            this.classes = classes
            this.classes.init = 'normal'
            this.form.client = ''
            this.sections = sections.map(section => {
                return section.name
            })
        },
        fieldLabel(field) {
            let name = field[`label${this.capitalize(this.language)}`]
            return name.replace('{client}', field.type == 'header' ? `<strong>${this.form.client}</strong>` : this.form.client)
        },
        async send() {
            let nextSection = ''
            switch (this.step) {
                case 'init':
                    if (!this.form.client) {
                        this.classes.init = 'error'
                    } else {
                        this.classes.init = 'normal'
                        nextSection = this.fields[0].name
                        this.goTo(nextSection)
                    }
                    break;
                case 'end':
                    this.step = 'sending'
                    this.loading = true
                    let form = this.$static.fields.edges

                    let data = new URLSearchParams()
                    data.append('action', 'send_mail')
                    data.append('email', process.env.GRIDSOME_API_EMAIL)
                    data.append('key', process.env.GRIDSOME_API_KEY)
                    data.append('to', process.env.GRIDSOME_API_EMAIL)
                    data.append('name', this.form.client)
                    data.append('subject', 'Kickoff submitted!')

                    let message = ''
                    form.forEach(element => {
                        let node = element.node

                        if (node.type != 'header') {
                            let label = this.fieldLabel(node)

                            message += `<strong>${label}:</strong><br/>`
                            message += `${this.form[node.name] ? this.form[node.name] : 'N/A'}<br/><br/>`
                        }

                        message.replace('{client}', this.form.client)
                    })

                    data.append('body', message)

                    await axios
                        .post(process.env.GRIDSOME_API, data)
                        .then(response => {
                            this.loading = false
                            console.log(response)
                            if (response.data.success) {
                                this.step = 'success'
                            } else {
                                this.step = 'end'
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    
                    break;
                default:
                    let currentStep = this.fields.find(field => field.name == this.step)
                    let nextStep = this.fields[currentStep.index + 1]
                    this.step = nextStep.name
                    nextSection = this.step
                    break;
            }
            setTimeout(() => {
                this.$scrollTo(`#fields-${nextSection}`, 1000, {
                    offset: -100
                })
            }, 100)
        },
        back() {
            let currentStep = this.step
            let currentIndex = this.fields.find(field => field.name == currentStep)
            if (currentStep == this.fields[0].name) {
                this.step = 'init'
            } else {
                this.step = this.fields[currentIndex.index - 1].name
            }
            setTimeout(() => {
                this.$scrollTo(`#fields-${this.step}`, 1000, {
                    offset: -100
                })
            }, 100)
        },
        onFocus() {
            this.response = false
        },
        capitalize(value) {
            if (!value) return ""
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        },
        parseOptions(options) {
            return options.split(',')
        },
        stepValue() {
            let current = this.fields.find(section => section.name == this.step)
            let value = (current.index + 1) * 100 / this.fields.length
            return value
        },
        changeLanguage(lang) {
            if (lang !== this.language) {
                this.language = lang
                this.$router.push({
                    path: this.$tp(this.$route.path, lang, true)
                })
            }
        }
    },
    mounted() {
        this.setupForm()
    }
}
</script>
<static-query>
    query KickForm {
        fields: allKickForm {
            edges {
                node {
                    name
                    section
                    labelEs
                    labelEn
                    type
                    optionsEs
                    optionsEn
                }
            }
        }
    }
</static-query>