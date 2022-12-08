import os
import subprocess
import boto3

def generate_code(teeth, pitch, pa, bore, thickness):
    obj = { 
        "N": teeth, 
        "P": pitch, 
        "pressureAngle": pa, 
        "b": bore, 
        "depth": thickness 
    }
    
    return """
/**
Constants
**/
in_to_mm = 25.4;
rad_to_deg = 180 / PI;
deg_to_rad = PI / 180;

/**
    Functions
**/
function parametric_points(fx, fy, t0=0, t1=10, delta=0.01) 
= [for(i = [t0:delta:t1]) [fx(i), fy(i)]];

function reverse(vector)
= [for(i = [1:len(vector)]) vector[len(vector) - i]];

/**
    Maths
**/
function calc_module(P) = in_to_mm / P;
function calc_addendum(P) = (1/P) * in_to_mm;
function calc_dedendum(P) = (1.25/P) * in_to_mm;
function calc_dp(N, P) = (N/P) * in_to_mm;
function calc_db(N, P, pa) = calc_dp(N,P) * cos(pa);
function calc_dr(N, P) = calc_dp(N,P) - 2 * calc_dedendum(P);
function calc_circular_pitch(P) = (PI / P) * in_to_mm;
function calc_thickness(P) = (1.5708 / P) * in_to_mm;
function calc_alpha(dp, db, pa) = ((sqrt(pow(dp,2) - pow(db,2))/db) * rad_to_deg - pa);
function calc_clearance(P) = calc_dedendum(P) - calc_addendum(P);
function calc_center_distance(N1, N2, P) = in_to_mm * (N1 + N2) /(2 * P);


module spur_gear(N, P = 12, pa = 14.5) {{
    dp = calc_dp(N, P);
    db = calc_db(N, P, pa);
    dr = calc_dr(N, P);
    a = calc_addendum(P);
    b = calc_dedendum(P);
    c = calc_clearance(P);
    p = calc_circular_pitch(P);

    // Undercut adjustment
    // NOTE: this might not be great? IDK
    undercut = 1 * c;

    // Calculate radius to begin the involute calculations
    r = (db - undercut) * .5;
    alpha = calc_alpha(dp, db, pa);
    beta = ((360 / (4*N)) - alpha) * 2;

    module involute_tooth() {{
        x = function(t) (r * (cos(t*rad_to_deg) + t * sin(t*rad_to_deg)));
        y = function(t) (r * (sin(t * rad_to_deg) - t * cos(t * rad_to_deg)));
        x2 = function(t) r * (cos(-t*rad_to_deg - beta) - t * sin(-t * rad_to_deg - beta));
        y2 = function(t) r * (sin(-t*rad_to_deg - beta) + t * cos(-t * rad_to_deg - beta));
        
        involute_1_points = parametric_points(fx=x, fy=y, t1=.68);
        involute_2_points = parametric_points(fx=x2, fy=y2, t1=.68);

        difference() {{
            union() {{
                polygon(
                    concat(
                        [[ 0, 0 ]],
                        involute_1_points,
                        reverse(involute_2_points),
                        [[ 0, 0]]
                    )
                );        
            }}
            
            // Use subtraction to extend the invlute curve towards the base
            // circle and then stop it at that point. This will
            // add some square-shaped space at the base of the tooth
            // NOTE: usage of undercut might be overkill.
            circle(d=(dp - 2*b));
        }}
    }}

    difference() {{
        circle(d=(dp + 2*a));
        circular_mirror(d=0, steps=N) involute_tooth();
    }}
}}

module circular_mirror(x=0, y=0, d, steps) {{
    aps = 360 / steps;
    for (step=[0:steps]) {{
        current_angle = step * aps;
        unit_x = cos(current_angle);
        unit_y = sin(current_angle);
        translate([x, y, 0]) {{
            translate([unit_x * d, unit_y * d, 0]) {{
                rotate(current_angle) children();
            }}
        }}
    }}
}}

linear_extrude({depth})
difference() {{
    spur_gear(N={N}, P={P}, pa={pressureAngle});
    circle(d={b}, $fn=100);
}}
""".format(**obj)
        

def handler(event, context):
    qs = event['queryStringParameters']
    try:
        teeth = int(qs['teeth'])
        pitch = float(qs['pitch'])
        pitch_display = round(pitch * 100)
        bore = float(qs['bore'])
        bore_display = round(bore * 100)
        pa = float(qs['pa'])
        pa_display = round(pa * 100)
        
        s3 = boto3.client(
            's3',
            aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
            aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
            region_name="us-west-2"
        )

        # Do some sanity checks
        if teeth < 0 or teeth > 300:
            return "Invalid tooths"

        if pitch < 0 or pitch > 100:
            return "Invalid pitch"

        if bore < 0 or bore > 300:
            return "Invalid bore"

        if pa < 0 or pa > 1000:
            return "Invalid pressure angle"

        thickness = qs['thickness']
        base_file_name = f"SpurGear-T{teeth}-P{pitch_display}-pA{pa_display}-b{bore_display}-{thickness}mm";
        scad_file_name = f"{base_file_name}.scad"
        png_file_name = f"{base_file_name}.png"
        stl_file_name = f"{base_file_name}.stl"
        scad_file_path = f"/tmp/{scad_file_name}"
        png_file_path = f"/tmp/{png_file_name}"
        stl_file_path = f"/tmp/{stl_file_name}"


        # First, check if it exists in s3 already
        try:
            s3.get_object_attributes(
                Bucket="3dgearmaker",
                Key=f"assets/files/{scad_file_name}",
                ObjectAttributes=['ETag']
            )
            # If it does exist, then we can just do a fast (success) exit
            return "hello, world!"
        except:
            pass

        print("Writing code file")

        with open(scad_file_path, "w") as f:
            f.write(generate_code(teeth, pitch, pa, bore, thickness))

        print("Generating preview")
        subprocess.run([
            "openscad",
            "-o",
            png_file_path,
            "--colorscheme",
            "DeepOcean",
            scad_file_path
        ])

        print("Generating STL")
        subprocess.run([
            "openscad",
            "-o",
            stl_file_path,
            "--colorscheme",
            "DeepOcean",
            scad_file_path
        ])

        print("uploading scad")
        s3.upload_file(scad_file_path, "3dgearmaker", f"assets/files/{scad_file_name}")
        print("uploading preview")
        s3.upload_file(png_file_path, "3dgearmaker", f"assets/files/{png_file_name}")
        print("uploading stl")
        s3.upload_file(stl_file_path, "3dgearmaker", f"assets/files/{stl_file_name}")

    except:
        return "generic error"

    return "hello, world!"
