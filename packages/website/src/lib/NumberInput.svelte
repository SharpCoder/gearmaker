<script type="ts">
    export let label: string;
    export let name: string;
    export let value: number;
    export let step: string = "1";
    export let min: number = 0;
    export let max: number = 1000;
</script>

<style>
    .label {
        display: flex;
        flex-direction: row;
        padding: 4px;
        padding-right: 20px;
    }

    .label span {
        min-width: 200px;
        padding-right: 5px;;
    }

    input {
        padding: 4px;
        font-size: 1.25rem;
        width: 100%;
        max-width: 200px;
    }
</style>

<div class="label">
    <span>{label}</span>
    <input type="number" step={step} bind:value={value} name={name} min={min} max={max} />
</div>