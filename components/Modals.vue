<template>
    <div>
        <menu-modal/>
        <process-modal/>
        <contact-modal/>
    </div>
</template>
<script>
import MenuModal from '~/components/modals/BigMenu'
import ProcessModal from '~/components/modals/Process'
import ContactModal from '~/components/modals/ContactModal'
export default {
    components: {
        MenuModal,
        ProcessModal,
        ContactModal
    }
}
</script>