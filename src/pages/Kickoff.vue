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
                            :strongText="labels.title[0]"
                            :lightText="labels.title[1]"
                            justify="center"
                        />
                        <p 
                            v-if="inStep('init')"
                            class="font-weight-light text-gray" 
                            v-html="labels.description[language.toLowerCase()]"
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
                                        <b-form-group :label="labels.company_name[language.toLowerCase()]">
                                            <b-form-input
                                                v-model="form.client"
                                                required
                                                :disabled="loading"
                                                @focus="onFocus"
                                            />
                                        </b-form-group>
                                    </b-col>
                                    <b-col cols="12" md="4">
                                        <b-form-group :label="labels.language[language]">
                                            <b-dropdown 
                                                :text="labels[language][language]" 
                                                class="contact-form__select"
                                                lazy
                                            >
                                                <b-dropdown-item
                                                    v-for="lang in languages"
                                                    :key="lang"
                                                    :active="lang == language"
                                                    @click="language = lang"
                                                >{{ labels[lang][language] }}</b-dropdown-item>
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
                                        v-html="buttonBackLabel"
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
                                        <h2 class="contact-form__header borderless text-center">{{ labels.sending[language] }}</h2>
                                    </b-col>
                                </b-form-row>
                                <b-form-row
                                    v-if="inStep('success')"
                                    class="my-6"
                                >
                                    <b-col class="d-flex flex-wrap align-items-center justify-content-center h-100">
                                        <h1 class="mb-7 display-1">🚀</h1>
                                        <h2 class="contact-form__header borderless text-center mb-7">{{ labels.success[language] }}</h2>
                                        <b-button 
                                            type="button"
                                            variant="primary"
                                            class="contact-form__submit"
                                            size="lg"
                                            to="/"
                                        >Check flinbu.co</b-button>
                                    </b-col>
                                </b-form-row>
                            </transition>
                        </b-form>
                    </b-col>
                </b-row>
                <div class="module__kickoff--helper">{{ labels.help[language] }}</div>
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
            language: 'en',
            languages: ['es', 'en'],
            step: 'init',
            labels: {
                title: ['💪 Kick Off&nbsp;', 'and discovery'],
                description: {
                    es: 'Aquí conoceremos más de la marca, sus expectativas y como se perciben. No se deben responder todas pero entre más respuestas tengamos mejor el descubrimiento.',
                    en: 'Here we will learn more about the brand, its expectations and how they are perceived. Not all must be answered, but the more answers we have the better the discovery.'
                },
                company_name: {
                    es: 'Empecemos, ¿Cuál es el nombre de la marca?',
                    en: "Let's begin, what is the brand name?"
                },
                language: {
                    es: 'Idioma',
                    en: 'Language'
                },
                es: {
                    es: 'Español',
                    en: 'Spanish'
                },
                en: {
                    es: 'Inglés',
                    en: 'English'
                },
                sending: {
                    es: '¡Gracias! Se está procesando y enviando las respuestas...',
                    en: 'Thanks! Answers are being processed and sent...'
                },
                success: {
                    es: '¡Gracias! Se han enviando las respuestas, estaremos en contacto para continuar con el proyecto.',
                    en: 'Thank you! Answers have been sent, we will be in contact to continue with the project.'
                },
                help: {
                    es: '¿Necesitas ayuda? 👉',
                    en: 'Need help? 👉'
                }
            },
            sections: [],
            form: {},
            classes: {},
            loading: false
        }
    },
    computed: {
        buttonLabel() {
            let labels = {
                send: {
                    es: 'Enviar',
                    en: 'Send'
                },
                continue: {
                    es: 'Continuar',
                    en: 'Continue'
                }
            }
            return this.loading ? '<i class="bx bx-loader-alt bx-spin"></i>' : this.step == 'end' ? labels.send[this.language.toLowerCase()] : labels.continue[this.language.toLowerCase()]
        },
        buttonBackLabel() {
            let labels = {
                es: 'Atrás',
                en: 'Back'
            }
            return labels[this.language.toLowerCase()]
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
                    data.append('action', 'send_kickoff')
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

                    data.append('form', message)

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