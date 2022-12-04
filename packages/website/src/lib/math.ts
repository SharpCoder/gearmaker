const in_to_mm = 25.4;
const calc_module = (P) => in_to_mm / P;
const calc_addendum = (P) => (1 / P) * in_to_mm;
const calc_dedendum = (P) => (1.25 / P) * in_to_mm;
const calc_dp = (N, P, extra_padding = 0) => extra_padding + (N / P) * in_to_mm;
const calc_db = (N, P, pa, extra_padding = 0) => calc_dp(N, P, extra_padding) * Math.cos(pa);
const calc_dr = (N, P) => calc_dp(N, P) - 2 * calc_dedendum(P);
const calc_circular_pitch = (P) => (PI / P) * in_to_mm;
const calc_thickness = (P) => (1.5708 / P) * in_to_mm;
const calc_alpha = (dp, db, pa) => ((sqrt(pow(dp, 2) - pow(db, 2)) / db) * rad_to_deg - pa);
const calc_beta = (N, alpha) => ((360 / (4 * N)) - alpha) * 2;
const calc_clearance = (P) => calc_dedendum(P) - calc_addendum(P);
const calc_center_distance = (N1, N2, P) => in_to_mm * (N1 + N2) / (2 * P);
const calc_internal_center_distance = (N1, N2, P) => in_to_mm * (N2 - N1) / (2 * P);

export {
    in_to_mm,
    calc_center_distance,
}