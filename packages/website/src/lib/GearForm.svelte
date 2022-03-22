<script type="ts">
    import NumberInput from "./NumberInput.svelte";

    // The attributes
    let T = 24;
    let P = 20;
    let pA = 14.5;
    let bore = 5;
    let thickness = 6;
    
    function reset() {
        T = 24;
        P = 20;
        pA = 14.5;
        bore = 5;
        thickness = 6;
    }

    function viewCode() {
        window.location.assign(`https://api.3dgearmaker.com/gearmaker/spur/code?teeth=${T}&pitch=${P}&pa=${pA}&bore=${bore}&thickness=${thickness}`);
    }

</script>

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
        min-width:  200px;
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

<form action="https://api.3dgearmaker.com/gearmaker/spur/stl" method="GET">
    <div class="form">    
        <div class="gear-parameters">
            <NumberInput bind:value={T} label='Teeth' name='teeth' step='1' min={15} />
            <NumberInput bind:value={P} label='Pitch' name='pitch' step='1'  />
            <NumberInput bind:value={pA} label='Pressure Angle' name='pa' step='0.1' />
            <NumberInput bind:value={bore} label='Bore' name='bore' step='0.1' />
            <NumberInput bind:value={thickness} label='Thickness' name='thickness' step='1' />

        </div>
            
        <div class="gear-preview">
            <img alt="preview of the gear" src={`https://api.3dgearmaker.com/gearmaker/spur/preview?teeth=${T}&pitch=${P}&pa=${pA}&bore=${bore}&thickness=${thickness}`} />
        </div>
            
    </div>
    <div class="actions">
        <input class="button" type="button" value="Reset" on:click={reset} />
        <input class="button" type="button" value="View OpenSCAD Code" on:click={viewCode} />
        <input class="button" type="submit" value="Download STL" />
    </div>
</form>
    