<script type="ts">
    import NumberInput from './NumberInput.svelte'
    import axios from 'axios'
    import GearPreview from './GearPreview.svelte'

    // The attributes
    let T = 24
    let P = 20
    let pitchDisplay = Math.round(P * 100)
    let pA = 14.5
    let pADisplay = Math.round(pA * 100)
    let bore = 5
    let boreDisplay = Math.round(bore * 100)
    let thickness = 6
    let disabled = false
    let failed = false
    let ts = new Date().getTime()

    $: {
        pADisplay = Math.round(pA * 100)
        pitchDisplay = Math.round(P * 100)
        boreDisplay = Math.round(bore * 100)
    }

    function reset() {
        T = 24
        P = 20
        pA = 14.5
        bore = 5
        thickness = 6
    }

    function viewCode() {
        window.location.assign(
            `https://3dgearmaker.com/assets/files/SpurGear-T${T}-P${pitchDisplay}-pA${pADisplay}-b${boreDisplay}-${thickness}mm.scad`
        )
    }

    function downloadStl() {
        window.location.assign(
            `https://3dgearmaker.com/assets/files/SpurGear-T${T}-P${pitchDisplay}-pA${pADisplay}-b${boreDisplay}-${thickness}mm.stl`
        )
    }
</script>

{#if failed}
    <h4>Failed to generate gear with those parameters</h4>
{:else if disabled}
    <h4>Generating preview...</h4>
{:else}
    <h4>&nbsp;</h4>
{/if}

<form action="https://api.3dgearmaker.com/gearmaker/spur/stl" method="GET">
    <div class="form">
        <div class="gear-parameters">
            <NumberInput
                bind:value={T}
                label="Teeth"
                name="teeth"
                step="1"
                min={15}
            />
            <NumberInput bind:value={P} label="Pitch" name="pitch" step="1" />
            <NumberInput
                bind:value={pA}
                label="Pressure Angle"
                name="pa"
                step="0.1"
            />
            <NumberInput bind:value={bore} label="Bore" name="bore" step="1" />
            <NumberInput
                bind:value={thickness}
                label="Thickness"
                name="thickness"
                step="1"
            />
        </div>

        <div class="gear-preview">
            <!-- <GearPreview {P} N={T} {bore} {pA} {thickness} /> -->

            <img
                alt="Gear preview"
                on:load={() => {
                    failed = false
                }}
                on:error={() => {
                    disabled = true
                    failed = false
                    axios
                        .get(
                            `https://tn7aauwobu7fsyqtlrph7yinhy0hmyzx.lambda-url.us-west-2.on.aws/?teeth=${T}&pitch=${P}&pa=${pA}&bore=${bore}&thickness=${thickness}`,
                            {
                                withCredentials: false,
                            }
                        )
                        .then((resp) => {
                            const { data } = resp
                            if (data === 'hello, world!') {
                                ts = new Date().getTime()
                                failed = false
                            } else {
                                failed = true
                            }
                        })
                        .catch((ex) => {
                            console.error(ex)
                        })
                        .finally(() => {
                            disabled = false
                        })
                }}
                src={`https://3dgearmaker.com/assets/files/SpurGear-T${T}-P${pitchDisplay}-pA${pADisplay}-b${boreDisplay}-${thickness}mm.png?invalidation=${ts}`}
            />
        </div>
    </div>
    <div class="actions">
        <input class="button" type="button" value="Reset" on:click={reset} />
        <input
            class="button"
            type="button"
            value="View OpenSCAD Code"
            on:click={viewCode}
            {disabled}
        />
        <input
            class="button"
            type="button"
            value="Download STL"
            on:click={downloadStl}
            {disabled}
        />
    </div>
</form>

<style>
    form {
        flex-grow: 1;
    }

    .form {
        display: flex;
        width: 100%;
        flex-grow: 1;
        padding: 20px 0px;
    }

    .gear-preview {
        min-width: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .gear-preview img {
        width: 200px;
        height: 200px;
    }

    .button {
        margin-top: 10px;
        cursor: pointer;
        padding: 6px;
    }

    .actions {
        display: flex;
        padding-right: 20px;
    }

    .actions input {
        margin: 4px;
    }

    @media (max-width: 700px) {
        .form {
            flex-direction: column-reverse;
        }

        .gear-preview {
            padding-bottom: 20px;
        }
    }
</style>
