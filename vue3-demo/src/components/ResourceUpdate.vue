<template>
  <ResourceForm
    @onSubmitForm="handleUpdate($event)"
    :currentResource="currentRes"
  ></ResourceForm>
</template>

<script>
import ResourceForm from "@/components/ResourceForm.vue";
import { updateResource } from "@/actions";
export default {
  props: {
    currentRes: Object,
  },
  components: {
    ResourceForm,
  },
  setup(props, context) {
    const handleUpdate = async (uResource) => {
      try {
        const updatedResource = await updateResource(
          uResource.value._id,
          uResource.value
        );

        context.emit("onupdateresource", updatedResource);
      } catch (errorMessage) {
        console.log(errorMessage);
      }
    };

    return {
      handleUpdate,
    };
  },
};
</script>

<style lang="" scoped>
</style>
