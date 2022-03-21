
const express = require('express');
const app = express();
const port = 9006;

// Configure the routes
const { generate_gear_code, convert_scad } = require('./openscad.js');

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
    const params = {
        teeth: parseInt(teeth), 
        pitch: parseFloat(pitch), 
        bore: parseFloat(bore), 
        pa: parseFloat(pa), 
        thickness: parseFloat(thickness),
    };

    const code = generate_gear_code(params);

    // Create the file name
    const fileName = `SpurGear-T${params.teeth}-P${params.pitch}-pA${params.pa}-b${params.bore}-${params.thickness}mm.stl`;

    convert_scad(code, 'stl').then(stl => {
        res.writeHead(200, {
            'Content-Type': 'application/stl',
            'Content-disposition': 'attachment; filename=' + fileName,
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});