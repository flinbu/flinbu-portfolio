<template>
    <div>
        <menu-modal/>
        <creation-modal/>
    </div>
</template>
<script>
import MenuModal from '~/components/modals/BigMenu'
import CreationModal from '~/components/modals/CreationStep'
export default {
    components: {
        MenuModal,
        CreationModal
    }
}
</script>