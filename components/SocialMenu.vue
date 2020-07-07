<template>
    <b-nav 
        :class="`social-menu social-menu__${scheme} social-menu__${location}`"
        :align="alignment"
        :vertical="vertical"
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
        // Create social menu items array
        socialMenu() {
            return [
                {
                    network: "dribbble",
                    icon: "dribbble",
                    url: "https://dribbble.com/flinbu",
                    label: "Dribbble"
                },
                {
                    network: "behance",
                    icon: "behance",
                    url: "https://behance.net/flinbu",
                    label: "Behance"
                },
                {
                    network: "github",
                    icon: "github",
                    url: "https://github.com/flinbu",
                    label: "GitHub"
                },
                {
                    network: "instagram",
                    icon: "instagram",
                    url: "https://instagram.com/flinbu",
                    label: "Instagram"
                },
                {
                    network: "linkedin",
                    icon: "linkedin",
                    url: "https://www.linkedin.com/in/flinbu/",
                    label: "LinkedIn"
                }
            ]
        }
    }
}
</script>
