<template>
    <CleanLayout>
        <transition name="fade" appear>
            <b-container class="module module__links py-6">
                <b-row align-h="center" class="mb-5">
                    <b-col cols="12" class="text-center">
                        <h1 class="module__title">{{ labels.sectionName }}</h1>
                        <h5 class="font-weight-light">{{ labels.sectionSubName }}</h5>
                    </b-col>
                </b-row>
                <b-row align-h="center" align-v="stretch" class="px-4">
                    <b-col 
                        v-for="(link, index) in $static.posts.edges"
                        :key="index"
                        cols="12" md="6" lg="4" xl="3" 
                        class="link__wrapper"
                    >
                        <a
                            :href="link.node.url"
                            target="_blank"
                            class="link d-flex align-items-center justify-content-start mb-5"
                        >
                            <i 
                                v-if="link.node.icon"
                                :class="`link__icon bx bx-md ${link.node.icon} mr-2 text-${snakeCase(link.node.title)}`"
                            />
                            <div>
                                <h3 class="link__title">{{ link.node.title }}</h3>
                                <h6 class="link__domain font-weight-light">{{ getDomain(link.node.url) }}</h6>
                            </div>
                        </a>
                    </b-col>
                </b-row>
            </b-container>
        </transition>
    </CleanLayout>
</template>
<script>
import { snakeCase } from 'lodash'
export default {
    layout: 'clean',
    data() {
        return {
            labels: {
                title: 'Felipe Linares',
                subtitle: 'Hello there!',
                sectionName: 'My favorite links',
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