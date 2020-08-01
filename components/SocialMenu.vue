<template>
    <b-nav 
        :class="`social-menu social-menu__${scheme} social-menu__${location} animated fadeIn`"
        :align="alignment"
        :vertical="vertical"
        v-if="socialMenu && socialMenu.length > 0"
    >
        <b-nav-item
            v-for="(social, index) in socialMenu"
            :key="index"
            :href="social.url"
            target="_blank"
            :class="`social-menu__item social-menu__${social.network} social-menu__${iconSize}`"
        >
            <icon
                :name="social.icon"
                type="logo"
            />
            <span class="ml-1 social-menu__item--label" v-if="labels">{{ social.label }}</span>
        </b-nav-item>
    </b-nav>
</template>
<script>
import { mapGetters } from 'vuex'
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
    },
    computed: {
        ...mapGetters({
            socialMenu: 'cockpit/getSocial'
        })
    }
}
</script>
