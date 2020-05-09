<template>
    <div class="instagram-wall__wrapper">
        <hooper 
            class="instagram-wall"
            :settings="hooperSettings"
            :style="{opacity: opacity}"
        >
            <slide 
                v-for="(post, i) in wall"
                :key="`instagram-${i}`"
                class="instagram-wall__item--wrapper"
            >
                <div class="instagram-wall__item">
                    <b-img
                        class="instagram-wall__image"
                        :src="post.image"
                    />
                </div>
            </slide>
        </hooper>
        <div class="instagram-wall__tag">
            <i class="instagram-wall__tag--icon bx bxl-instagram"/>
        </div>
    </div>
</template>
<script>
import { Hooper, Slide } from 'hooper'
export default {
    components: {
        Hooper,
        Slide
    },
    props: {
        opacity: {
            type: [String, Number],
            default: 1
        },
        tag: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            hooperSettings: {
                itemsToShow: 2,
                itemsToSlide: 1,
                infiniteScroll: true,
                autoPlay: true,
                hoverPause: true,
                centerMode: true,
                playSpeed: 3000,
                transition: 1000,
                breakpoints: {
                    577: {
                        itemsToShow: 3
                    },
                    767: {
                        itemsToShow: 4
                    },
                    993: {
                        itemsToShow: 5
                    },
                    1200: {
                        itemsToShow: 7
                    }
                }
            }
        }
    },
    computed: {
        wall() {
            return this.$static.posts.edges.map( edge => {
                return {
                    image: edge.node.display_url,
                    text: edge.node.edge_media_to_caption.edges[0].node.text
                }
            })
        }
    }
}
</script>
<static-query>
query Instagram {
    posts: allInstagram(order: ASC) {
        edges {
            node {
                display_url
                edge_media_to_caption {
                    edges {
                        node {
                            text
                        }
                    }
                }
            }
        }
    }
}
</static-query>