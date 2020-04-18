<template>
    <CleanLayout>
        <transition name="fade" appear>
            <b-col 
                cols="12" 
                md="10"
                offset-md="1"
                lg="8"
                offset-lg="2"
                xl="6"
                offset-xl="3"
                class="module module__links py-6"
            >
                <b-row align-h="center" class="mb-5 mt-5">
                    <b-col cols="12" class="text-center">
                        <module-title
                            :strongText="labels.sectionName[0]"
                            :lightText="labels.sectionName[1]"
                            justify="center"
                        />
                        <h5 class="font-weight-light text-gray">{{ labels.sectionSubName }}</h5>
                    </b-col>
                </b-row>
                <b-row align-h="center" align-v="stretch" class="px-4">
                    <b-col 
                        v-for="(link, index) in $static.posts.edges"
                        :key="index"
                        cols="12" md="6"
                        class="link__wrapper d-inline-flex align-items-center mb-3 mb-md-5 px-0 px-md-2"
                    >
                        <g-link
                            v-if="getDomain(link.node.url) == 'flinbu.co'"
                            to="/"
                            class="link d-flex align-items-center justify-content-start py-3 px-3"
                        >
                            <i 
                                v-if="link.node.icon"
                                :class="`link__icon bx bx-sm ${link.node.icon} mr-3 text-${snakeCase(link.node.title)}`"
                            />
                            <div>
                                <h3 class="link__title">{{ link.node.title }}</h3>
                                <h6 class="link__domain font-weight-light">{{ getDomain(link.node.url) }}</h6>
                            </div>
                        </g-link>
                        <a
                            v-else
                            :href="link.node.url"
                            target="_blank"
                            class="link d-flex align-items-center justify-content-start py-3 px-3"
                        >
                            <i 
                                v-if="link.node.icon"
                                :class="`link__icon bx bx-sm ${link.node.icon} mr-3 text-${snakeCase(link.node.title)}`"
                            />
                            <div>
                                <h3 class="link__title">{{ link.node.title }}</h3>
                                <h6 class="link__domain font-weight-light">{{ getDomain(link.node.url) }}</h6>
                            </div>
                        </a>
                    </b-col>
                </b-row>
                <b-row align-h="center" class="mt-5">
                    <b-col cols="12" class="text-center">
                        <scheme-switch location="header"/>
                    </b-col>
                </b-row>
            </b-col>
        </transition>
    </CleanLayout>
</template>
<script>
import { snakeCase } from 'lodash'
export default {
    layout: 'clean',
    metaInfo: {
        title: `${process.env.GRIDSOME_SITE_NAME} - My favourite links`
    },
    data() {
        return {
            labels: {
                title: 'Felipe Linares',
                subtitle: 'Hello there!',
                sectionName: ['Favourite', 'Links'],
                sectionSubName: 'sharing is caring 😌'
            }
        }
    },
    methods: {
        visitItem(url) {
            window.open(url, '_blank')
        },
        getDomain(url) {
            let urlX = url.split('/')
            urlX = urlX[2].replace('www.', '')
            return urlX
        },
        snakeCase(str) {
            return snakeCase(str)
        }
    }
}
</script>
<static-query>
    query BioLink {
        posts: allBioLink {
            edges {
                node {
                    title
                    url
                    icon
                }
            }
        }
    }
</static-query>