<script type="ts">
    import Description from './Description.svelte'
    import GearForm from './GearForm.svelte'
</script>

<content>
    <Description />
    <GearForm />
</content>

<style>
    content {
        padding: var(--padding);
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
        height: 100%;
        min-height: 80vh;
    }
</style>
