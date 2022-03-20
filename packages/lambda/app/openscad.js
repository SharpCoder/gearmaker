const fs = require('fs');
const { spawn } = require('child_process');
const uuid = require('uuid');

/// Given some openscad code, generate an stl file
function convert_scad(code, filetype) {
    return new Promise((resolve) => {
        const id = uuid.v4();
        const input_file = `request-${id}.scad`;
        const output_file = `response-${id}.${filetype}`;
        fs.writeFileSync(`./request-${id}.scad`, code);
        const proc = spawn('openscad', ['-o', output_file, input_file]);
        proc.on('exit', () => {
            const contents = fs.readFileSync('./' + output_file);
            fs.rmSync('./' + input_file);
            fs.rmSync('./' + output_file);
            resolve(contents);
        });
    });
}

function generate_gear_code({ teeth, pitch, bore, pa, thickness }) {
    const N = parseInt(teeth);
    const P = parseInt(pitch);
    const pressureAngle = parseFloat(pa);
    const b = parseFloat(bore);
    const depth = parseFloat(thickness);
    return `
        include <gears.scad>

        linear_extrude(6)
        difference() {
            spur_gear(N=${N}, P=${P}, pa=${pressureAngle});
            circle(d=${b}, $fn=100);
        }
    `;
}

module.exports = function(app) {
    app.get('/spur/preview', (req, res) => {
        const { teeth, pitch, bore = 6, pa = 14.5, thickness = 6 } = req.query;
        const code = generate_gear_code({
            teeth, 
            pitch, 
            bore, 
            pa, 
            thickness,
        });
        
        convert_scad(code, 'png').then(img => {
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': img.length
            });
            res.end(img);
        });
    });

    app.get('/spur/stl', (req, res) => {
        const { teeth, pitch, bore = 6, pa = 14.5, thickness = 6 } = req.query;
        const code = generate_gear_code({
            teeth, 
            pitch, 
            bore, 
            pa, 
            thickness,
        });

        convert_scad(code, 'stl').then(stl => {
            res.writeHead(200, {
                'Content-Type': 'application/stl',
                'Content-Length': stl.length,
            });
            res.end(stl);
        });
    });

    app.get('/spur/code', (req, res) => {
        const { teeth, pitch, bore = 6, pa = 14.5, thickness = 6 } = req.query;
        const code = generate_gear_code({
            teeth, 
            pitch, 
            bore, 
            pa, 
            thickness,
        });

        res.writeHead(200);
        res.end(code);
    });
};