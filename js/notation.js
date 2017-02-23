if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var stats;
var camera, controls, scene, renderer;
var notes;
var axes_on = false;
var grid_on = false;

// notes = [{"x":-470, "y":120, "z":-150, "d_x":15, "d_y":15, "d_z":10, "rot_x": 0.16, "rot_y": -0.48, "rot_z": -0.15}, // 1
// 		 {"x":0, "y":0, "z":0, "d_x":15, "d_y":15, "d_z":10, "rot_x": 0.16, "rot_y": -0.48, "rot_z": -0.15},];
var scale = 0.45;
notes = [{"x":-1160, "y":284, "z":-1100, "d_x":23, "d_y":23, "d_z":23, "rot_x": 0., "rot_y": 0., "rot_z": 0.}, // 1
		 {"x":-930, "y":500, "z":-400, "d_x":20, "d_y":110, "d_z":180, "rot_x": 0., "rot_y": 0., "rot_z": 0.}, // 2
		 {"x":-82, "y":568, "z":-2200, "d_x":72, "d_y":23, "d_z":410, "rot_x": 0., "rot_y": 0., "rot_z": 0.}, // 3
		 {"x":560, "y":720, "z":-1400, "d_x":125, "d_y":5, "d_z":380, "rot_x": 0., "rot_y": 0., "rot_z": 0.}, // 4
		 {"x":1007, "y":725, "z":-1100, "d_x":66, "d_y":28, "d_z":200, "rot_x": 0., "rot_y": 0., "rot_z": 0.}, // 5
		 {"x":-720, "y":-20, "z":-1500, "d_x":190, "d_y":5, "d_z":190, "rot_x": 0., "rot_y": 0., "rot_z": 0.}, // 6
		 {"x":-300, "y":210, "z":-800, "d_x":8, "d_y":75, "d_z":405, "rot_x": 0., "rot_y": 0., "rot_z": 0.}, // 7
		 {"x":800, "y":187, "z":-1300, "d_x":100, "d_y":13, "d_z":210, "rot_x": 0., "rot_y": 0., "rot_z": 0.}, // 8
		 {"x":1186, "y":445, "z":-1200, "d_x":126, "d_y":15, "d_z":450, "rot_x": 0., "rot_y": 0., "rot_z": 0.}, // 9
		 {"x":100, "y":20, "z":-1000, "d_x":35, "d_y":100, "d_z":30, "rot_x": 0., "rot_y": 0., "rot_z": 0.}, // 10
		 {"x":423, "y":18, "z":-20, "d_x":14, "d_y":47, "d_z":215, "rot_x": 0., "rot_y": 0., "rot_z": 0.}, // 11 
		 {"x":-1265, "y":-290, "z":-1800, "d_x":220, "d_y":8, "d_z":30, "rot_x": 0., "rot_y": 0., "rot_z": 0.}, // 12
		 {"x":-859, "y":-415, "z":-2300, "d_x":21, "d_y":100, "d_z":400, "rot_x": 0., "rot_y": 0., "rot_z": 0.}, // 13
		 {"x":-142, "y":-390, "z":-1000, "d_x":160, "d_y":16, "d_z":150, "rot_x": 0., "rot_y": 0., "rot_z": 0.}, // 14
		 {"x":65, "y":-508, "z":-1900, "d_x":8, "d_y":160, "d_z":400, "rot_x": 0., "rot_y": 0., "rot_z": 0.}, // 15
		 {"x":525, "y":-328, "z":-500, "d_x":114, "d_y":35, "d_z":200, "rot_x": 0., "rot_y": 0., "rot_z": 0.}, // 16
		 {"x":1055, "y":-360, "z":-10, "d_x":204, "d_y":6, "d_z":400, "rot_x": 0., "rot_y": 0., "rot_z": 0.}, // 17
		 {"x":880, "y":-640, "z":-2800, "d_x":38, "d_y":165, "d_z":430, "rot_x": 0., "rot_y": 0., "rot_z": 0.}, // 18
		 {"x":-900, "y":-800, "z":-250, "d_x":115, "d_y":20, "d_z":425, "rot_x": 0., "rot_y": 0., "rot_z": 0.}, // 19
		 {"x":-377, "y":-819, "z":-500, "d_x":113, "d_y":8, "d_z":200, "rot_x": 0., "rot_y": 0., "rot_z": 0.}, // 20
		 {"x":595, "y":-860, "z":-1000, "d_x":170, "d_y":14, "d_z":40, "rot_x": 0., "rot_y": 0., "rot_z": 0.}, // 21
		 {"x":704, "y":-898, "z":-90, "d_x":120, "d_y":15, "d_z":500, "rot_x": 0., "rot_y": 0., "rot_z": 0.}, // 22
		 {"x":-562, "y":-1204, "z":-1400, "d_x":8, "d_y":104, "d_z":44, "rot_x": 0., "rot_y": 0., "rot_z": 0.}, // 23
		 {"x":-1090, "y":-1450, "z":-350, "d_x":180, "d_y":12, "d_z":350, "rot_x": 0., "rot_y": 0., "rot_z": 0.}, // 24
		 {"x":-960, "y":-1480, "z":-650, "d_x":50, "d_y":11, "d_z":28, "rot_x": 0., "rot_y": 0., "rot_z": 0.}, // 25
		 {"x":-808, "y":-1490, "z":-20, "d_x":80, "d_y":7, "d_z":300, "rot_x": 0., "rot_y": 0., "rot_z": 0.}, // 26
		 {"x":-200, "y":-1583, "z":-350, "d_x":182, "d_y":10, "d_z":800, "rot_x": 0., "rot_y": 0., "rot_z": 0.}, // 27
		 {"x":470, "y":-1380, "z":-1200, "d_x":8, "d_y":110, "d_z":435, "rot_x": 0., "rot_y": 0., "rot_z": 0.}, // 28
		 ];

var n_notes = notes.length;
var i;

scene = new THREE.Scene();
var gridScene = new THREE.Scene();

var n_params = 6; // angles, checkboxes

var gui = new dat.GUI({
    height : n_params * 32 - 1
});

var gui_params = {
    rotation_x: 0,
    rotation_y: 0,
    rotation_z: 0,
    zoom: 1.0,
    grid_on: false,
    axes_on: false
};

renderer = new THREE.WebGLRenderer();
renderer.autoClear = false;
// renderer.setClearColor( scene.fog.color );
renderer.setClearColor( 0xffffff );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
var container = document.getElementById( 'container' );
container.appendChild( renderer.domElement );
camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2,  window.innerHeight / 2,  window.innerHeight / - 2, -1000.1, 6000 );
//camera = new THREE.OrthographicCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
//PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.z = 2500;
controls = new THREE.OrbitControls( camera, renderer.domElement );
//controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = false;
// camera.rotation.order = "YXZ";

var rot_x = 0;
var rot_y = 0;
var rot_z = 0;

gui.add(gui_params, 'rotation_x').min(-360).max(360).onFinishChange(function(e){
	axes.rotation.x = e * Math.PI / 180;
	notes_ojb.rotation.x = e * Math.PI / 180;
	rot_x = e;
});
gui.add(gui_params, 'rotation_y').min(-360).max(360).onFinishChange(function(e){
	axes.rotation.y = e * Math.PI / 180;
	notes_ojb.rotation.y = e * Math.PI / 180;
	rot_y = e;
});
gui.add(gui_params, 'rotation_z').min(-360).max(360).onFinishChange(function(e){
	notes_ojb.rotation.z = e * Math.PI / 180;
	axes.rotation.z = e * Math.PI / 180;
	rot_z = e;
});

gui.add(gui_params, 'grid_on').name('Grid').onFinishChange(function(){
	if (grid_on == false) {
		grid_on = true;
		bg_gridx.visible = true;
		bg_gridy.visible = true;
	}
	else {
		grid_on = false;
		bg_gridx.visible = false;
		bg_gridy.visible = false;
	}
});
gui.add(gui_params, 'axes_on').name('Axes').onFinishChange(function(){
	if (axes_on == false) {
		axes_on = true;
		axes.visible = true;
	}
	else {
		axes_on = false;
		axes.visible = false;
	}
});


// world
notes_ojb = new THREE.Object3D();
for ( i = 0; i < n_notes; i ++ ) {
	var geometry = new THREE.BoxGeometry( notes[i]["d_x"] * scale, notes[i]["d_y"] * scale, notes[i]["d_z"] * scale );

	var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
	var mesh = new THREE.Mesh( geometry, material );
	mesh.position.x = notes[i]["x"] * scale;
	mesh.position.y = notes[i]["y"] * scale + 200;
	mesh.position.z = notes[i]["z"] * scale + 750;

	mesh.updateMatrix();
	mesh.matrixAutoUpdate = false;
	notes_ojb.add(mesh);
}
scene.add( notes_ojb );

axes = buildAxes( 1000 );
axes.visible = false;
scene.add(axes);

bg_gridx = buildGridx();
bg_gridy = buildGridy();
scene.add(camera);
camera.add(bg_gridx);
camera.add(bg_gridy);
bg_gridx.position.set( 0, 0, - 10 );
bg_gridx.visible = false;
bg_gridy.position.set( 0, 0, - 10 );
bg_gridy.visible = false;

var rotation_step = 1;

// stats = new Stats();
// container.appendChild( stats.dom );

window.addEventListener( 'resize', onWindowResize, false );
document.addEventListener('keydown', function(event) {
	// console.log('a');
	// console.log( gui );
	switch ( event.keyCode ) {
			// full reset
			case 82:
				axes.rotation.x = 0;
				notes_ojb.rotation.x = 0;
				axes.rotation.y = 0;
				notes_ojb.rotation.y = 0;
				axes.rotation.z = 0;
				notes_ojb.rotation.z = 0;
				rot_x = 0;
				rot_y = 0;
				rot_z = 0;
				gui.__controllers[0].setValue(rot_x);
				gui.__controllers[1].setValue(rot_y);
				gui.__controllers[2].setValue(rot_z);
				break;

			// X-axis rotation:
			case 90: // z
				if (rot_x + rotation_step <= 360) {
					axes.rotation.x += rotation_step * Math.PI / 180;
					notes_ojb.rotation.x += rotation_step * Math.PI / 180;
					rot_x += rotation_step;
					gui.__controllers[0].setValue(rot_x);
				}
				break;
			case 88: // x
				if (rot_x - rotation_step >= -360) {	
					axes.rotation.x -= rotation_step * Math.PI / 180;
					notes_ojb.rotation.x -= rotation_step * Math.PI / 180;
					rot_x -= rotation_step;
					gui.__controllers[0].setValue(rot_x);
				}
				break;

			// Y-axis rotation:
			case 67: // c
				if (rot_y + rotation_step <= 360) {
					axes.rotation.y += rotation_step * Math.PI / 180;
					notes_ojb.rotation.y += rotation_step * Math.PI / 180;
					rot_y += rotation_step;
					gui.__controllers[1].setValue(rot_y);
				}
				break;
			case 86: // v
				if (rot_y - rotation_step >= -360) {
					axes.rotation.y -= rotation_step * Math.PI / 180;
					notes_ojb.rotation.y -= rotation_step * Math.PI / 180;
					rot_y -= rotation_step;
					gui.__controllers[1].setValue(rot_y);
				}
				break;

			// Z-axis rotation:
			case 66: // c
				if (rot_z + rotation_step <= 360) {
					axes.rotation.z += rotation_step * Math.PI / 180;
					notes_ojb.rotation.z += rotation_step * Math.PI / 180;
					rot_z += rotation_step;
					gui.__controllers[2].setValue(rot_z);
				}
				break;
			case 78: // v
				if (rot_z - rotation_step >= -360) {
					axes.rotation.z -= rotation_step * Math.PI / 180;
					notes_ojb.rotation.z -= rotation_step * Math.PI / 180;
					rot_z -= rotation_step;
					gui.__controllers[2].setValue(rot_z);
				}
				break;
	}
}); 
animate();


function buildAxis( src, dst, colorHex, dashed ) {
        var geom = new THREE.Geometry(),
            mat;

        if(dashed) {
                mat = new THREE.LineDashedMaterial({ linewidth: 3, color: colorHex, dashSize: 3, gapSize: 3 });
        } else {
                mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex });
        }

        geom.vertices.push( src.clone() );
        geom.vertices.push( dst.clone() );
        geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

        var axis = new THREE.Line( geom, mat, THREE.LinePieces );

        return axis;

}


function buildAxes( length ) {
    var axes = new THREE.Object3D();

    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), 0xFF0000, false ) ); // +X
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), 0x00FF00, false ) ); // +Y
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), 0x0000FF, false ) ); // +Z

    return axes;
}

function buildGridx() {

	var grid = new THREE.Object3D();

	var material = new THREE.LineBasicMaterial({
		color: 0x333333
	});
	var dashedmaterial = new THREE.LineBasicMaterial({ linewidth: 2, color: 0x333333 });
	var geometry, line;
	for (i = 0; i <= 30; i++) {
		if (i % 2 == 0) {
			mm = material;
		}
		else {
			mm = dashedmaterial;
		}
		geometry = new THREE.Geometry();
		geometry.vertices.push(
			new THREE.Vector3( 0, -2000, 0 ),
			new THREE.Vector3( 0, 2000, 0 )
			// new THREE.Vector3( 100, 0, 0 )
		);
		line = new THREE.Line( geometry, mm );
		line.position.setX((-15+i) * 100);
		grid.add(line);

	}
	
	return grid;
}

function buildGridy() {

	var grid = new THREE.Object3D();

	var material = new THREE.LineBasicMaterial({
		color: 0x333333
	});
	var dashedmaterial = new THREE.LineBasicMaterial({ linewidth: 2, color: 0x333333 });
	var geometry, line;
	for (i = 0; i <= 30; i++) {
		if (i % 2 == 0) {
			mm = material;
		}
		else {
			mm = dashedmaterial;
		}
		geometry = new THREE.Geometry();
		geometry.vertices.push(
			new THREE.Vector3(-2000,  0, 0 ),
			new THREE.Vector3(2000,  0, 0 )
			// new THREE.Vector3( 100, 0, 0 )
		);
		line = new THREE.Line( geometry, mm );
		line.position.setY((-15+i) * 100);
		grid.add(line);
	}
	
	return grid;
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
	requestAnimationFrame( animate );
	// controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true
	// stats.update();
	render();
}

function render() {
	renderer.clear();
	renderer.render( scene, camera );
	// renderer.clearDepth();
	// renderer.render( gridScene, camera );
}