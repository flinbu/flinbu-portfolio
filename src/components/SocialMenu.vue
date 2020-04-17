<template>
    <b-nav 
        :class="`social-menu social-menu__${scheme} social-menu__${location}`"
        :align="alignment"
        :vertical="vertical"
    >
        <b-nav-item
            v-for="(social, index) in $static.posts.edges"
            :key="index"
            :href="social.node.url"
            target="_blank"
            :class="`social-menu__item social-menu__${social.node.network} social-menu__${iconSize}`"
        >
            <icon
                :name="social.node.icon"
                type="logo"
            />
            <span class="ml-1 social-menu__item--label" v-if="labels">{{ social.node.label }}</span>
        </b-nav-item>
    </b-nav>
</template>
<static-query>
 query Social {
     posts: allSocial(order: ASC) {
         edges {
             node {
                 network
                 icon
                 url
                 label
             }
         }
     }
 }
</static-query>
<script>
export default {
    props: {
        scheme: {
            type: String,
            default: "light"
        },
        iconSize: {
            type: String,
            default: "md"
        },
        location: {
            type: String,
            default: 'header'
        },
        alignment: {
            type: String,
            default: "left"
        },
        vertical: {
            type: Boolean,
            default: false
        },
        labels: {
            type: Boolean,
            default: false
        }
    }
}
</script>
