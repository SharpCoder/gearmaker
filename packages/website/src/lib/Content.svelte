<script type="ts">
    import Description from "./Description.svelte";
    import GearForm from "./GearForm.svelte";
</script>

<style>
    content {
        padding: var(--padding);
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
        height: 100%;
    }
</style>

<content>
    <Description />
    <GearForm />
</content>