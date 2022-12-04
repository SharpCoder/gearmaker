<script type="ts">
    export let N = 24
    export let P = 20
    export let pA = 14.5
    export let bore = 5
    export let thickness = 6

    let canvas: HTMLCanvasElement

    const parametric_points = (fx, fy, t0 = 0, t1 = 10, delta = 0.01) => {
        const results = []
        for (let i = t0; i < t1; i += delta) {
            results.push([fx(i), fy(i)])
        }
        return results
    }

    const reverse = (vector: Array<any>) => {
        return vector.reverse()
    }

    const PI = Math.PI
    const in_to_mm = 65.4
    const rad_to_deg = 180 / PI
    const deg_to_rad = PI / 180
    const pa = pA * deg_to_rad

    const calc_module = (P) => in_to_mm / P
    const calc_addendum = (P) => (1 / P) * in_to_mm
    const calc_dedendum = (P) => (1.25 / P) * in_to_mm
    const calc_dp = (N, P) => (N / P) * in_to_mm
    const calc_db = (N, P, pa) => calc_dp(N, P) * Math.cos(pa)
    const calc_dr = (N, P) => calc_dp(N, P) - 2 * calc_dedendum(P)
    const calc_circular_pitch = (P) => (PI / P) * in_to_mm
    const calc_thickness = (P) => (1.5708 / P) * in_to_mm
    const calc_alpha = (dp, db, pa) =>
        Math.sqrt(Math.pow(dp, 2) - Math.pow(db, 2)) / db - pa
    const calc_clearance = (P) => calc_dedendum(P) - calc_addendum(P)
    const calc_center_distance = (N1, N2, P) => (in_to_mm * (N1 + N2)) / (2 * P)

    $: {
        if (canvas) {
            const ctx = canvas.getContext('2d')
            ctx.clearRect(-1000, -1000, 2000, 2000)

            const dp = calc_dp(N, P)
            const db = calc_db(N, P, pa)
            const dr = calc_dr(N, P)
            const a = calc_addendum(P)
            const b = calc_dedendum(P)
            const c = calc_clearance(P)
            const p = calc_circular_pitch(P)
            // Undercut adjustment
            // NOTE: this might not be great? IDK
            const undercut = 1 * c

            // Calculate radius to begin the involute calculations
            const r = db - undercut
            const alpha = calc_alpha(dp, db, pa)
            const beta = (360 / (4 * N) - alpha) * 2 * deg_to_rad

            const x = (t) => r * (Math.cos(t) + t * Math.sin(t))
            const y = (t) => r * (Math.sin(t) - t * Math.cos(t))
            const x2 = (t) =>
                r * (Math.cos(-t - beta) - t * Math.sin(-t - beta))
            const y2 = (t) =>
                r * (Math.sin(-t - beta) + t * Math.cos(-t - beta))

            function involute_tooth() {
                const ox = 0,
                    oy = 0

                ctx.fillStyle = '#eee'
                // ctx.translate(dp, dp)
                // ctx.rotate(Math.PI)
                ctx.beginPath()
                ctx.moveTo(ox, oy)
                for (const point of parametric_points(x, y, 0, 0.68, 0.01)) {
                    ctx.lineTo(point[0], point[1])
                }
                for (const point of reverse(
                    parametric_points(x2, y2, 0, 0.68, 0.01)
                )) {
                    ctx.lineTo(point[0], point[1])
                }

                ctx.moveTo(0, 0)
                ctx.closePath()
                ctx.fill()
            }

            ctx.save()
            ctx.translate(canvas.width / 2, canvas.height / 2)

            ctx.fillStyle = '#000'
            ctx.arc(0, 0, dp + a, 0, 2 * Math.PI)
            ctx.fill()

            for (let i = 0; i < N; i++) {
                const aps = (2 * Math.PI) / N
                const current_angle = i * aps

                // const r = 1
                ctx.save()
                ctx.rotate(current_angle)
                involute_tooth()

                ctx.restore()
            }

            ctx.beginPath()
            ctx.arc(0, 0, dp - a - b, 0, 2 * Math.PI)
            ctx.fillStyle = '#000'
            ctx.fill()

            ctx.beginPath()
            ctx.arc(0, 0, bore, 0, 2 * Math.PI)
            ctx.fillStyle = '#eee'
            ctx.fill()
            ctx.restore()
        }
    }
</script>

<canvas width={250} height={250} bind:this={canvas} />
