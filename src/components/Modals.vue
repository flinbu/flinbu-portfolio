<template>
    <div>
        <RequestCV />
        <ContactForm />
    </div>
</template>
<script>
import RequestCV from '~/components/modals/RequestCV'
import ContactForm from '~/components/modals/Contact'
export default {
    components: {
        RequestCV,
        ContactForm
    }
}
</script>