<template>
    <div>
        <RequestCV />
        <contact-form/>
        <menu-modal/>
    </div>
</template>
<script>
import RequestCV from '~/components/modals/RequestCV'
import ContactForm from '~/components/modals/Contact'
import MenuModal from '~/components/modals/Menu'
export default {
    components: {
        RequestCV,
        ContactForm,
        MenuModal
    }
}
</script>