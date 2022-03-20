const fs = require('fs');
const { spawn } = require('child_process');
const uuid = require('uuid');

/// Given some openscad code, generate an stl file
function generate_stl(code) {
    return new Promise((resolve) => {
        const id = uuid.v4();
        const input_file = `request-${id}.scad`;
        const output_file = `response-${id}.stl`;
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

module.exports = function(app) {
    app.get('/output.stl', (req, res) => {
        generate_stl(`
            linear_extrude(10)
            circle(r=10, $fn=100);
        `).then((stl) => {
            res.send(stl);
        });
    });
};